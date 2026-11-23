/**
 * Data model for the Discord sandbox.
 *
 * A scenario describes a tiny fake server (roles, members, channels) and the
 * bot behaviour to simulate. The store keeps every message and role change in
 * memory only, so nothing ever reaches Discord.
 */

export type ButtonStyle = "primary" | "secondary" | "success" | "danger" | "link";

export interface SandboxButton {
  type: "button";
  customId?: string;
  label?: string;
  /** Unicode emoji, or custom emoji markup like `<:name:id>`. */
  emoji?: string;
  style: ButtonStyle;
  url?: string;
  disabled?: boolean;
}

export interface SandboxSelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
}

export interface SandboxSelect {
  type: "select";
  customId: string;
  placeholder?: string;
  options: SandboxSelectOption[];
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
}

export interface SandboxActionRow {
  type: "row";
  components: Array<SandboxButton | SandboxSelect>;
}

export interface SandboxText {
  type: "text";
  content: string;
}

export interface SandboxSeparator {
  type: "separator";
  spacing?: "small" | "large";
  divider?: boolean;
}

export interface SandboxSection {
  type: "section";
  texts: string[];
  thumbnail?: string;
  button?: SandboxButton;
}

export interface SandboxGallery {
  type: "gallery";
  urls: string[];
}

export type SandboxContainerChild = SandboxText | SandboxSeparator | SandboxSection | SandboxGallery | SandboxActionRow;

export interface SandboxContainer {
  type: "container";
  /** CSS colour for the left accent bar. */
  accentColor?: string;
  children: SandboxContainerChild[];
}

export interface SandboxEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

/** Classic (non Components V2) embed. */
export interface SandboxEmbed {
  color?: string;
  title?: string;
  description?: string;
  fields?: SandboxEmbedField[];
  thumbnail?: string;
  image?: string;
  footer?: string;
}

export type SandboxTopComponent = SandboxContainer | SandboxActionRow | SandboxText | SandboxSeparator | SandboxSection;

export interface SandboxPings {
  users?: string[];
  roles?: string[];
}

export interface SandboxPayload {
  content?: string;
  embeds?: SandboxEmbed[];
  components?: SandboxTopComponent[];
  /** Who this message notifies (the red mention badge). Mirrors Discord's allowedMentions. */
  pings?: SandboxPings;
}

export interface SandboxMessage extends SandboxPayload {
  id: string;
  seq: number;
  channelId: string;
  authorId: string;
  /** Simulated time in ms. */
  createdAt: number;
  editedAt?: number;
  /** Set when only this member can see the message. */
  ephemeralFor?: string;
  /** "<member> used /command" header above an interaction reply. */
  interaction?: { userId: string; commandName: string };
  /** Bot "is thinking…" placeholder (a deferred reply). */
  thinking?: boolean;
}

export interface SandboxRole {
  id: string;
  name: string;
  color?: string;
  /** Role icon shown after the member's name. Like Discord, only the highest role with an icon shows. */
  icon?: string;
  /** Hidden from the role picker (managed roles, like the attendee group roles). */
  managed?: boolean;
  description?: string;
}

export interface SandboxMember {
  id: string;
  displayName: string;
  username: string;
  avatar: string;
  roles: string[];
  bot?: boolean;
  /** Extra info for the profile card (VRChat name, Patreon tier, volunteer…). */
  vrcName?: string;
  badges?: string[];
  note?: string;
}

export interface SandboxChannel {
  id: string;
  name: string;
  topic?: string;
  category?: string;
  /** Roles that can see the channel. Empty or missing = everyone. */
  viewRoles?: string[];
  /** Roles that can send messages and use commands. Empty or missing = everyone who can view. */
  sendRoles?: string[];
}

/* ------------------------------------------------------------------ */
/* Modals                                                              */
/* ------------------------------------------------------------------ */

export type SandboxModalComponent =
  | { type: "text"; content: string }
  | {
      type: "input";
      customId: string;
      label: string;
      description?: string;
      style: "short" | "paragraph";
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      placeholder?: string;
      value?: string;
    }
  | {
      type: "radio";
      customId: string;
      label: string;
      description?: string;
      required?: boolean;
      options: Array<{ label: string; value: string }>;
    }
  | { type: "file"; customId: string; label: string; description?: string; required?: boolean };

export interface SandboxModal {
  customId: string;
  title: string;
  components: SandboxModalComponent[];
}

/* ------------------------------------------------------------------ */
/* Slash commands                                                      */
/* ------------------------------------------------------------------ */

export interface SlashChoice {
  name: string;
  value: string | number;
}

export interface SlashOptionDef {
  name: string;
  description: string;
  type: "string" | "integer" | "boolean" | "role";
  required?: boolean;
  maxLength?: number;
  choices?: SlashChoice[];
  /** Live suggestions, like Discord autocomplete. */
  autocomplete?: (userId: string, typed: string) => SlashChoice[];
}

export type SlashValue = string | number | boolean;

export interface SlashCommandDef {
  name: string;
  description: string;
  options: SlashOptionDef[];
}

/* ------------------------------------------------------------------ */
/* Interactions handed to scenarios                                    */
/* ------------------------------------------------------------------ */

export interface ReplyOptions {
  ephemeral?: boolean;
}

export interface SandboxInteraction {
  readonly kind: "command" | "component" | "modal";
  /** The member who triggered it. */
  readonly user: SandboxMember;
  readonly channelId: string;
  readonly deferred: boolean;
  readonly replied: boolean;
  /** Id of the reply message once the bot answered with reply/deferReply. */
  readonly replyMessageId: string | null;
  reply(payload: SandboxPayload, opts?: ReplyOptions): Promise<void>;
  deferReply(opts?: ReplyOptions): Promise<void>;
  editReply(payload: SandboxPayload): Promise<void>;
  followUp(payload: SandboxPayload, opts?: ReplyOptions): Promise<void>;
  deleteReply(): Promise<void>;
}

export interface CommandInteraction extends SandboxInteraction {
  readonly kind: "command";
  readonly commandName: string;
  readonly options: Record<string, SlashValue>;
}

export interface ComponentInteraction extends SandboxInteraction {
  readonly kind: "component";
  readonly customId: string;
  readonly values: string[];
  readonly message: SandboxMessage;
  readonly isEphemeralMessage: boolean;
  update(payload: SandboxPayload): Promise<void>;
  deferUpdate(): Promise<void>;
  showModal(modal: SandboxModal): Promise<void>;
}

export interface ModalInteraction extends SandboxInteraction {
  readonly kind: "modal";
  readonly customId: string;
  readonly fields: Record<string, string>;
  /** The message whose component opened the modal, if any. */
  readonly sourceMessage: SandboxMessage | null;
  deferUpdate(): Promise<void>;
}

/** Tools a scenario gets to drive the fake server. */
export interface ScenarioContext {
  now(): number;
  sleep(ms: number): Promise<void>;
  /** A short, slightly random pause that stands in for API calls. */
  work(): Promise<void>;
  member(id: string): SandboxMember | undefined;
  members(): SandboxMember[];
  hasRole(memberId: string, roleId: string): boolean;
  hasAnyRole(memberId: string, roleIds: readonly string[]): boolean;
  isAdmin(memberId: string): boolean;
  addRole(memberId: string, roleId: string): void;
  removeRole(memberId: string, roleId: string): void;
  role(id: string): SandboxRole | undefined;
  roles(): SandboxRole[];
  channel(id: string): SandboxChannel | undefined;
  /** Posts a message. `createdAt` lets setup code place messages in the past. */
  send(channelId: string, payload: SandboxPayload, authorId?: string, opts?: { createdAt?: number }): string;
  edit(messageId: string, payload: SandboxPayload): void;
  remove(messageId: string): void;
  message(id: string): SandboxMessage | undefined;
  /** Visible (non-ephemeral) messages, oldest first. */
  channelMessages(channelId: string): SandboxMessage[];
  toast(text: string): void;
  botId: string;
}

export interface ClockPreset {
  label: string;
  /** Absolute simulated time to jump to (ms). */
  at: number;
}

export interface ScenarioRuntime {
  commands: SlashCommandDef[];
  onCommand(ix: CommandInteraction): Promise<void>;
  onComponent(ix: ComponentInteraction): Promise<void>;
  onModalSubmit(ix: ModalInteraction): Promise<void>;
  /** Runs about once a second with the simulated clock. */
  onTick?(): void;
  /** Called after someone edits a member's roles from the member card. */
  onRolesChanged?(memberId: string): void;
  clockPresets?(): ClockPreset[];
}

export interface SandboxScenario {
  id: string;
  title: string;
  description?: string;
  serverName: string;
  roles: SandboxRole[];
  /** The first member is the person using the sandbox. */
  members: SandboxMember[];
  bot: SandboxMember;
  channels: SandboxChannel[];
  defaultChannelId: string;
  adminRoleIds?: string[];
  setup(ctx: ScenarioContext): ScenarioRuntime;
}
