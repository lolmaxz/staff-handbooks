import type {
  CommandInteraction,
  ComponentInteraction,
  ModalInteraction,
  ReplyOptions,
  SandboxChannel,
  SandboxMember,
  SandboxMessage,
  SandboxModal,
  SandboxPayload,
  SandboxRole,
  SandboxScenario,
  ScenarioContext,
  ScenarioRuntime,
  SlashValue,
} from "./types";

/** Thrown inside scenario code once the simulation was reset, to stop stale async work. */
export class SandboxResetError extends Error {
  constructor() {
    super("Sandbox was reset");
  }
}

interface ActivityEntry {
  seq: number;
  channelId: string;
  authorId: string;
  ephemeralFor?: string;
  users: string[];
  roles: string[];
}

export interface OpenModal {
  modal: SandboxModal;
  ownerId: string;
  channelId: string;
  sourceMessageId: string | null;
}

const MENTION_USER = /<@!?(\d+|[a-z0-9_-]+)>/gi;

function randomBetween(min: number, max: number) {
  return Math.round(min + Math.random() * (max - min));
}

function cloneMembers(members: SandboxMember[]) {
  return members.map((member) => ({ ...member, roles: [...member.roles], badges: member.badges ? [...member.badges] : undefined }));
}

export class SandboxStore {
  scenario!: SandboxScenario;
  runtime!: ScenarioRuntime;
  generation = 0;
  version = 0;

  members: SandboxMember[] = [];
  messages: SandboxMessage[] = [];
  viewerId = "";
  activeChannelId = "";
  clockOffset = 0;
  modal: OpenModal | null = null;
  toastText: string | null = null;
  loading = new Set<string>();

  private seq = 0;
  private lastRead = new Map<string, number>();
  private activity: ActivityEntry[] = [];
  private listeners = new Set<() => void>();
  private toastTimer: number | undefined;
  private emitQueued = false;

  constructor(scenario: SandboxScenario) {
    this.load(scenario);
  }

  /* ---------------------------------------------------------------- */
  /* Subscription                                                      */
  /* ---------------------------------------------------------------- */

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getVersion = () => this.version;

  private emit() {
    if (this.emitQueued) return;
    this.emitQueued = true;
    queueMicrotask(() => {
      this.emitQueued = false;
      this.version += 1;
      this.listeners.forEach((listener) => listener());
    });
  }

  /* ---------------------------------------------------------------- */
  /* Lifecycle                                                         */
  /* ---------------------------------------------------------------- */

  load(scenario: SandboxScenario) {
    this.generation += 1;
    this.scenario = scenario;
    this.members = [...cloneMembers(scenario.members), { ...scenario.bot, roles: [...scenario.bot.roles] }];
    this.messages = [];
    this.activity = [];
    this.lastRead.clear();
    this.loading.clear();
    this.modal = null;
    this.seq = 0;
    this.clockOffset = 0;
    this.viewerId = scenario.members[0]?.id ?? "";
    this.activeChannelId = scenario.defaultChannelId;
    this.runtime = scenario.setup(this.createContext(this.generation));
    this.markRead(this.activeChannelId);
    this.emit();
  }

  reset() {
    this.load(this.scenario);
  }

  private guard(gen: number) {
    if (gen !== this.generation) throw new SandboxResetError();
  }

  /** Runs scenario code, swallowing errors caused by a reset. */
  private async runSafely(gen: number, task: () => Promise<void>) {
    try {
      await task();
    } catch (error) {
      if (error instanceof SandboxResetError || gen !== this.generation) return;
      console.error("[DiscordSandbox] Scenario error:", error);
      this.toast("Something went wrong in the simulation. Check the console.");
    }
  }

  /* ---------------------------------------------------------------- */
  /* Clock                                                             */
  /* ---------------------------------------------------------------- */

  now = () => Date.now() + this.clockOffset;

  jumpTo(at: number) {
    const target = at - Date.now();
    if (target > this.clockOffset) this.clockOffset = target;
    this.tick();
    this.emit();
  }

  advance(ms: number) {
    this.clockOffset += ms;
    this.tick();
    this.emit();
  }

  tick() {
    const gen = this.generation;
    try {
      this.runtime.onTick?.();
    } catch (error) {
      if (!(error instanceof SandboxResetError) && gen === this.generation) console.error("[DiscordSandbox] Tick error:", error);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Lookups                                                           */
  /* ---------------------------------------------------------------- */

  member(id: string) {
    return this.members.find((member) => member.id === id);
  }

  role(id: string): SandboxRole | undefined {
    return this.scenario.roles.find((role) => role.id === id);
  }

  channel(id: string): SandboxChannel | undefined {
    return this.scenario.channels.find((channel) => channel.id === id);
  }

  get viewer() {
    return this.member(this.viewerId)!;
  }

  get humans() {
    return this.members.filter((member) => !member.bot);
  }

  isAdmin(memberId: string) {
    const ids = this.scenario.adminRoleIds ?? [];
    return ids.some((id) => this.member(memberId)?.roles.includes(id));
  }

  canView(memberId: string, channelId: string) {
    const channel = this.channel(channelId);
    if (!channel) return false;
    if (!channel.viewRoles?.length || this.isAdmin(memberId)) return true;
    const roles = this.member(memberId)?.roles ?? [];
    return channel.viewRoles.some((id) => roles.includes(id));
  }

  canSend(memberId: string, channelId: string) {
    if (!this.canView(memberId, channelId)) return false;
    const channel = this.channel(channelId)!;
    if (!channel.sendRoles?.length || this.isAdmin(memberId)) return true;
    const roles = this.member(memberId)?.roles ?? [];
    return channel.sendRoles.some((id) => roles.includes(id));
  }

  visibleMessages(channelId: string, viewerId = this.viewerId) {
    return this.messages.filter((message) => message.channelId === channelId && (!message.ephemeralFor || message.ephemeralFor === viewerId));
  }

  /** True when the message pings this member (directly or through one of their roles). */
  pingsMember(message: Pick<SandboxMessage, "pings">, memberId: string) {
    const pings = message.pings;
    if (!pings) return false;
    if (pings.users?.includes(memberId)) return true;
    const roles = this.member(memberId)?.roles ?? [];
    return Boolean(pings.roles?.some((id) => roles.includes(id)));
  }

  private readKey(viewerId: string, channelId: string) {
    return `${viewerId}:${channelId}`;
  }

  markRead(channelId: string, viewerId = this.viewerId) {
    this.lastRead.set(this.readKey(viewerId, channelId), this.seq);
  }

  channelBadge(channelId: string, viewerId = this.viewerId) {
    const last = this.lastRead.get(this.readKey(viewerId, channelId)) ?? 0;
    const roles = this.member(viewerId)?.roles ?? [];
    let unread = false;
    let mentions = 0;
    for (const entry of this.activity) {
      if (entry.channelId !== channelId || entry.seq <= last || entry.authorId === viewerId) continue;
      if (entry.ephemeralFor && entry.ephemeralFor !== viewerId) continue;
      unread = true;
      if (entry.users.includes(viewerId) || entry.roles.some((id) => roles.includes(id))) mentions += 1;
    }
    return { unread, mentions };
  }

  /* ---------------------------------------------------------------- */
  /* Message primitives                                                */
  /* ---------------------------------------------------------------- */

  private post(channelId: string, authorId: string, payload: SandboxPayload, extra: Partial<SandboxMessage> = {}) {
    this.seq += 1;
    const message: SandboxMessage = {
      id: `m${this.seq}`,
      seq: this.seq,
      channelId,
      authorId,
      createdAt: this.now(),
      content: payload.content,
      embeds: payload.embeds,
      components: payload.components,
      pings: payload.pings,
      ...extra,
    };
    this.messages = [...this.messages, message];
    this.activity.push({
      seq: message.seq,
      channelId,
      authorId,
      ephemeralFor: message.ephemeralFor,
      users: payload.pings?.users ?? [],
      roles: payload.pings?.roles ?? [],
    });
    if (channelId === this.activeChannelId && (!message.ephemeralFor || message.ephemeralFor === this.viewerId)) {
      this.markRead(channelId);
    }
    this.emit();
    return message.id;
  }

  private patch(messageId: string, patch: Partial<SandboxMessage>) {
    let found = false;
    this.messages = this.messages.map((message) => {
      if (message.id !== messageId) return message;
      found = true;
      return { ...message, ...patch };
    });
    if (found) this.emit();
    return found;
  }

  private replacePayload(messageId: string, payload: SandboxPayload, extra: Partial<SandboxMessage> = {}) {
    return this.patch(messageId, {
      content: payload.content,
      embeds: payload.embeds,
      components: payload.components,
      thinking: false,
      ...extra,
    });
  }

  private deleteMessage(messageId: string) {
    const before = this.messages.length;
    this.messages = this.messages.filter((message) => message.id !== messageId);
    if (this.messages.length !== before) this.emit();
  }

  message(id: string) {
    return this.messages.find((message) => message.id === id);
  }

  toast(text: string) {
    this.toastText = text;
    if (this.toastTimer) window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      this.toastText = null;
      this.emit();
    }, 3200);
    this.emit();
  }

  /* ---------------------------------------------------------------- */
  /* Scenario context                                                  */
  /* ---------------------------------------------------------------- */

  private createContext(gen: number): ScenarioContext {
    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        window.setTimeout(() => {
          if (gen !== this.generation) reject(new SandboxResetError());
          else resolve();
        }, ms);
      });
    return {
      botId: this.scenario.bot.id,
      now: this.now,
      sleep,
      work: () => sleep(randomBetween(550, 1100)),
      member: (id) => this.member(id),
      members: () => this.members,
      hasRole: (memberId, roleId) => Boolean(this.member(memberId)?.roles.includes(roleId)),
      hasAnyRole: (memberId, roleIds) => roleIds.some((id) => this.member(memberId)?.roles.includes(id)),
      isAdmin: (memberId) => this.isAdmin(memberId),
      addRole: (memberId, roleId) => {
        this.guard(gen);
        this.setRole(memberId, roleId, true);
      },
      removeRole: (memberId, roleId) => {
        this.guard(gen);
        this.setRole(memberId, roleId, false);
      },
      role: (id) => this.role(id),
      roles: () => this.scenario.roles,
      channel: (id) => this.channel(id),
      send: (channelId, payload, authorId, opts) => {
        this.guard(gen);
        return this.post(channelId, authorId ?? this.scenario.bot.id, payload, opts?.createdAt ? { createdAt: opts.createdAt } : {});
      },
      edit: (messageId, payload) => {
        this.guard(gen);
        this.replacePayload(messageId, payload);
      },
      remove: (messageId) => {
        this.guard(gen);
        this.deleteMessage(messageId);
      },
      message: (id) => this.message(id),
      channelMessages: (channelId) => this.messages.filter((message) => message.channelId === channelId && !message.ephemeralFor),
      toast: (text) => this.toast(text),
    };
  }

  private setRole(memberId: string, roleId: string, on: boolean) {
    this.members = this.members.map((member) => {
      if (member.id !== memberId) return member;
      const has = member.roles.includes(roleId);
      if (on === has) return member;
      return { ...member, roles: on ? [...member.roles, roleId] : member.roles.filter((id) => id !== roleId) };
    });
    this.emit();
  }

  /* ---------------------------------------------------------------- */
  /* UI actions                                                        */
  /* ---------------------------------------------------------------- */

  setViewer(memberId: string) {
    if (!this.member(memberId) || this.member(memberId)?.bot) return;
    this.viewerId = memberId;
    this.modal = null;
    if (!this.canView(memberId, this.activeChannelId)) {
      const fallback = this.scenario.channels.find((channel) => this.canView(memberId, channel.id));
      this.activeChannelId = fallback?.id ?? this.scenario.defaultChannelId;
    }
    this.markRead(this.activeChannelId);
    this.emit();
  }

  setChannel(channelId: string) {
    if (!this.canView(this.viewerId, channelId)) return;
    this.activeChannelId = channelId;
    this.markRead(channelId);
    this.emit();
  }

  /** Member-card role editing. */
  toggleRole(memberId: string, roleId: string) {
    const has = Boolean(this.member(memberId)?.roles.includes(roleId));
    this.setRole(memberId, roleId, !has);
    if (!this.canView(this.viewerId, this.activeChannelId)) this.setViewer(this.viewerId);
    try {
      this.runtime.onRolesChanged?.(memberId);
    } catch (error) {
      if (!(error instanceof SandboxResetError)) console.error("[DiscordSandbox] Role hook error:", error);
    }
  }

  dismiss(messageId: string) {
    const message = this.message(messageId);
    if (!message?.ephemeralFor) return;
    this.deleteMessage(messageId);
  }

  /** Converts typed `@Name` text into real mentions, then posts it as the viewer. */
  sendUserMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || !this.canSend(this.viewerId, this.activeChannelId)) return;
    const content = this.linkMentions(trimmed);
    const users = new Set<string>();
    const roles = new Set<string>();
    for (const match of content.matchAll(/<@&([^>\s]+)>/g)) roles.add(match[1]);
    for (const match of content.matchAll(MENTION_USER)) {
      if (!match[0].startsWith("<@&")) users.add(match[1]);
    }
    this.post(this.activeChannelId, this.viewerId, {
      content,
      pings: users.size || roles.size ? { users: [...users], roles: [...roles] } : undefined,
    });
  }

  private linkMentions(text: string) {
    const targets = [
      ...this.scenario.roles.map((role) => ({ name: role.name, token: `<@&${role.id}>` })),
      ...this.members.map((member) => ({ name: member.displayName, token: `<@${member.id}>` })),
      ...this.members.map((member) => ({ name: member.username, token: `<@${member.id}>` })),
    ].sort((a, b) => b.name.length - a.name.length);
    let out = "";
    let index = 0;
    while (index < text.length) {
      if (text[index] === "@" && (index === 0 || /\s|\(|\[/.test(text[index - 1]))) {
        const rest = text.slice(index + 1).toLowerCase();
        const hit = targets.find((target) => {
          const name = target.name.toLowerCase();
          if (!rest.startsWith(name)) return false;
          const after = rest[name.length];
          return after === undefined || !/[\p{L}\p{N}_]/u.test(after);
        });
        if (hit) {
          out += hit.token;
          index += hit.name.length + 1;
          continue;
        }
      }
      out += text[index];
      index += 1;
    }
    return out;
  }

  runCommand(commandName: string, options: Record<string, SlashValue>) {
    const gen = this.generation;
    const user = this.viewer;
    const channelId = this.activeChannelId;
    const thinkingId = this.post(channelId, this.scenario.bot.id, {}, {
      ephemeralFor: user.id,
      thinking: true,
      interaction: { userId: user.id, commandName },
    });
    const ix = new CommandIx(this, gen, user, channelId, commandName, options, thinkingId);
    void this.runSafely(gen, async () => {
      await wait(randomBetween(450, 800));
      this.guard(gen);
      await this.runtime.onCommand(ix);
      ix.finish();
    });
  }

  clickComponent(messageId: string, customId: string, values: string[] = []) {
    const message = this.message(messageId);
    if (!message) return;
    const gen = this.generation;
    const user = this.viewer;
    const key = `${messageId}:${customId}`;
    if (this.loading.has(key)) return;
    this.loading.add(key);
    this.emit();
    const ix = new ComponentIx(this, gen, user, message.channelId, message, customId, values, key);
    void this.runSafely(gen, async () => {
      await wait(randomBetween(300, 550));
      this.guard(gen);
      try {
        await this.runtime.onComponent(ix);
      } finally {
        ix.finish();
      }
    }).finally(() => {
      if (this.loading.delete(key)) this.emit();
    });
  }

  closeModal() {
    this.modal = null;
    this.emit();
  }

  submitModal(fields: Record<string, string>) {
    const open = this.modal;
    if (!open) return;
    this.modal = null;
    this.emit();
    const gen = this.generation;
    const user = this.member(open.ownerId)!;
    const source = open.sourceMessageId ? this.message(open.sourceMessageId) ?? null : null;
    const ix = new ModalIx(this, gen, user, open.channelId, open.modal.customId, fields, source);
    void this.runSafely(gen, async () => {
      await wait(randomBetween(350, 600));
      this.guard(gen);
      await this.runtime.onModalSubmit(ix);
      ix.finish();
    });
  }

  /* Internal hooks used by interaction classes. */
  _guard(gen: number) {
    this.guard(gen);
  }
  _post(channelId: string, payload: SandboxPayload, extra: Partial<SandboxMessage>) {
    return this.post(channelId, this.scenario.bot.id, payload, extra);
  }
  _patch(messageId: string, patch: Partial<SandboxMessage>) {
    return this.patch(messageId, patch);
  }
  _replace(messageId: string, payload: SandboxPayload, extra: Partial<SandboxMessage> = {}) {
    return this.replacePayload(messageId, payload, extra);
  }
  _delete(messageId: string) {
    this.deleteMessage(messageId);
  }
  _openModal(open: OpenModal) {
    this.modal = open;
    this.emit();
  }
  _clearLoading(key: string) {
    if (this.loading.delete(key)) this.emit();
  }
}

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

/* ------------------------------------------------------------------ */
/* Interaction implementations                                         */
/* ------------------------------------------------------------------ */

abstract class BaseIx {
  deferred = false;
  replied = false;
  protected replyId: string | null = null;

  constructor(
    protected store: SandboxStore,
    protected gen: number,
    public readonly user: SandboxMember,
    public readonly channelId: string,
  ) {}

  protected guard() {
    this.store._guard(this.gen);
  }

  get replyMessageId() {
    return this.replyId;
  }

  /** Called whenever the bot answers, so loading indicators can stop. */
  protected responded() {}

  /** Edit used when there is no reply message (component deferUpdate). */
  protected editWithoutReply(_payload: SandboxPayload): void {}
  protected deleteWithoutReply(): void {}

  async reply(payload: SandboxPayload, opts: ReplyOptions = {}) {
    this.guard();
    this.replyId = this.store._post(this.channelId, payload, { ephemeralFor: opts.ephemeral ? this.user.id : undefined });
    this.replied = true;
    this.responded();
  }

  async deferReply(opts: ReplyOptions = {}) {
    this.guard();
    this.replyId = this.store._post(this.channelId, {}, { ephemeralFor: opts.ephemeral ? this.user.id : undefined, thinking: true });
    this.deferred = true;
    this.responded();
  }

  async editReply(payload: SandboxPayload) {
    this.guard();
    if (this.replyId) this.store._replace(this.replyId, payload);
    else this.editWithoutReply(payload);
    this.responded();
  }

  async followUp(payload: SandboxPayload, opts: ReplyOptions = {}) {
    this.guard();
    this.store._post(this.channelId, payload, { ephemeralFor: opts.ephemeral ? this.user.id : undefined });
    this.responded();
  }

  async deleteReply() {
    this.guard();
    if (this.replyId) this.store._delete(this.replyId);
    else this.deleteWithoutReply();
    this.responded();
  }

  finish() {
    this.responded();
  }
}

class CommandIx extends BaseIx implements CommandInteraction {
  readonly kind = "command" as const;
  private adopted = false;

  constructor(
    store: SandboxStore,
    gen: number,
    user: SandboxMember,
    channelId: string,
    public readonly commandName: string,
    public readonly options: Record<string, SlashValue>,
    private thinkingId: string,
  ) {
    super(store, gen, user, channelId);
  }

  private header() {
    return { userId: this.user.id, commandName: this.commandName };
  }

  /** The first answer takes over the automatic "thinking" placeholder. */
  async reply(payload: SandboxPayload, opts: ReplyOptions = {}) {
    this.guard();
    if (!this.adopted) {
      this.adopted = true;
      this.replyId = this.thinkingId;
      this.store._replace(this.thinkingId, payload, {
        ephemeralFor: opts.ephemeral ? this.user.id : undefined,
        interaction: this.header(),
        pings: payload.pings,
      });
      this.replied = true;
      return;
    }
    await super.reply(payload, opts);
  }

  async deferReply(opts: ReplyOptions = {}) {
    this.guard();
    if (!this.adopted) {
      this.adopted = true;
      this.replyId = this.thinkingId;
      this.store._patch(this.thinkingId, { ephemeralFor: opts.ephemeral ? this.user.id : undefined, thinking: true });
      this.deferred = true;
      return;
    }
    await super.deferReply(opts);
  }

  async editReply(payload: SandboxPayload) {
    this.guard();
    if (!this.adopted) {
      await this.reply(payload, { ephemeral: true });
      return;
    }
    if (this.replyId) this.store._replace(this.replyId, payload, { pings: payload.pings });
  }

  finish() {
    // A command that never answered: drop the placeholder instead of thinking forever.
    if (!this.adopted && this.store.message(this.thinkingId)?.thinking) this.store._delete(this.thinkingId);
  }
}

class ComponentIx extends BaseIx implements ComponentInteraction {
  readonly kind = "component" as const;
  private updateDeferred = false;

  constructor(
    store: SandboxStore,
    gen: number,
    user: SandboxMember,
    channelId: string,
    public readonly message: SandboxMessage,
    public readonly customId: string,
    public readonly values: string[],
    private loadingKey: string,
  ) {
    super(store, gen, user, channelId);
  }

  get isEphemeralMessage() {
    return Boolean(this.message.ephemeralFor);
  }

  protected responded() {
    this.store._clearLoading(this.loadingKey);
  }

  protected editWithoutReply(payload: SandboxPayload) {
    this.store._replace(this.message.id, payload);
  }

  protected deleteWithoutReply() {
    this.store._delete(this.message.id);
  }

  async update(payload: SandboxPayload) {
    this.guard();
    this.store._replace(this.message.id, payload);
    this.replied = true;
    this.responded();
  }

  async deferUpdate() {
    this.guard();
    this.updateDeferred = true;
    this.deferred = true;
  }

  async editReply(payload: SandboxPayload) {
    this.guard();
    if (this.replyId) this.store._replace(this.replyId, payload);
    else this.store._replace(this.message.id, payload);
    this.responded();
  }

  async showModal(modal: SandboxModal) {
    this.guard();
    this.store._openModal({ modal, ownerId: this.user.id, channelId: this.channelId, sourceMessageId: this.message.id });
    this.replied = true;
    this.responded();
  }

  finish() {
    void this.updateDeferred;
    this.responded();
  }
}

class ModalIx extends BaseIx implements ModalInteraction {
  readonly kind = "modal" as const;

  constructor(
    store: SandboxStore,
    gen: number,
    user: SandboxMember,
    channelId: string,
    public readonly customId: string,
    public readonly fields: Record<string, string>,
    public readonly sourceMessage: SandboxMessage | null,
  ) {
    super(store, gen, user, channelId);
  }

  protected editWithoutReply(payload: SandboxPayload) {
    if (this.sourceMessage) this.store._replace(this.sourceMessage.id, payload);
  }

  protected deleteWithoutReply() {
    if (this.sourceMessage) this.store._delete(this.sourceMessage.id);
  }

  async deferUpdate() {
    this.guard();
    this.deferred = true;
  }
}
