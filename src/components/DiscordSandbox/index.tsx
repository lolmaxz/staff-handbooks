import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { MessageView, ModalView, type ComponentHandlers } from "./components";
import { DiscordMarkdown, MarkdownContext, type MarkdownResolver } from "./markdown";
import SlashComposer from "./SlashComposer";
import { SandboxStore } from "./store";
import type { SandboxButton, SandboxMember, SandboxMessage, SandboxScenario, SandboxSelect } from "./types";
import styles from "./DiscordSandbox.module.css";

export type { SandboxScenario } from "./types";

type Theme = "default" | "chroma" | "strawberry";
type Layout = "compact" | "full";

const THEME_KEY = "discordSandboxTheme";
const LAYOUT_KEY = "discordSandboxLayout";

function readStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

export interface DiscordSandboxProps {
  /** One or more scenarios. With several, a picker appears in the header. */
  scenarios: SandboxScenario[];
  /** `compact` fits inside a page with other content. `full` uses most of the screen. */
  layout?: Layout;
  /** Hides the compact/full toggle. */
  lockLayout?: boolean;
  /** Scrolls the page so the sandbox sits in the middle of the screen once it loads. For a page that is mostly the sandbox. */
  centerOnLoad?: boolean;
}

function formatClock(ms: number) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(ms));
}

function formatOffset(ms: number) {
  if (ms < 60_000) return "";
  const minutes = Math.round(ms / 60_000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  return `+${days ? `${days}d ` : ""}${hours ? `${hours}h ` : ""}${mins ? `${mins}m` : ""}`.trim();
}

function messageTimeLabel(createdAt: number, now: number) {
  const date = new Date(createdAt);
  const today = new Date(now);
  const time = formatClock(createdAt);
  const sameDay = date.toDateString() === today.toDateString();
  const yesterday = new Date(now - 86_400_000).toDateString() === date.toDateString();
  if (sameDay) return `Today at ${time}`;
  if (yesterday) return `Yesterday at ${time}`;
  return `${date.toLocaleDateString("en-US")} ${time}`;
}

function nameColor(member: SandboxMember | undefined, scenario: SandboxScenario) {
  if (!member || member.bot) return undefined;
  for (const role of scenario.roles) {
    if (role.color && member.roles.includes(role.id)) return role.color;
  }
  return undefined;
}

/** Discord shows one role icon: the highest role (top of the list) that has one. */
function roleIconFor(member: SandboxMember | undefined, scenario: SandboxScenario) {
  if (!member || member.bot) return undefined;
  const role = scenario.roles.find((item) => item.icon && member.roles.includes(item.id));
  return role?.icon ? { src: role.icon, name: role.name } : undefined;
}

function SandboxInner({ scenarios, layout: initialLayout = "compact", lockLayout = false, centerOnLoad = false }: DiscordSandboxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!centerOnLoad || window.location.hash) return;
    const timer = window.setTimeout(() => {
      const node = rootRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const navbar = (document.querySelector(".navbar") as HTMLElement | null)?.offsetHeight ?? 60;
      const free = window.innerHeight - navbar - rect.height;
      window.scrollTo({ top: window.scrollY + rect.top - navbar - Math.max(0, free / 2) });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [centerOnLoad]);
  const storeRef = useRef<SandboxStore | null>(null);
  if (!storeRef.current) storeRef.current = new SandboxStore(scenarios[0]);
  const store = storeRef.current;
  const version = useSyncExternalStore(store.subscribe, store.getVersion, store.getVersion);

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = readStorage(THEME_KEY);
    return saved === "chroma" || saved === "strawberry" ? saved : "default";
  });
  const [layout, setLayout] = useState<Layout>(() => {
    if (lockLayout) return initialLayout;
    const saved = readStorage(`${LAYOUT_KEY}:${scenarios[0].id}`);
    return saved === "compact" || saved === "full" ? saved : initialLayout;
  });
  const [pulse, setPulse] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cardMemberId, setCardMemberId] = useState<string | null>(null);
  const [clockOpen, setClockOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const toggleCategory = (name: string) =>
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  const clockRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!clockOpen) return;
    const onDown = (event: MouseEvent) => {
      if (clockRef.current && !clockRef.current.contains(event.target as Node)) setClockOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setClockOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [clockOpen]);
  const [confirmReset, setConfirmReset] = useState(false);
  const [rolePicker, setRolePicker] = useState<React.CSSProperties | null>(null);
  const rolePickerOpen = rolePicker !== null;
  const setRolePickerOpen = (open: boolean) => {
    if (!open) setRolePicker(null);
  };

  /** The picker is fixed to the viewport so the profile card's scroll area cannot clip it. */
  const openRolePicker = (anchor: HTMLElement) => {
    if (rolePicker) {
      setRolePicker(null);
      return;
    }
    const rect = anchor.getBoundingClientRect();
    const width = 250;
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
    const below = window.innerHeight - rect.bottom - 12;
    const above = rect.top - 12;
    const placeBelow = below >= 220 || below >= above;
    setRolePicker({
      position: "fixed",
      left,
      width,
      ...(placeBelow ? { top: rect.bottom + 4, maxHeight: Math.max(120, Math.min(300, below)) } : { top: "auto", bottom: window.innerHeight - rect.top + 4, maxHeight: Math.max(120, Math.min(300, above)) }),
    });
  };

  useEffect(() => {
    if (!rolePicker) return;
    const close = (event: Event) => {
      if (event.target instanceof Element && event.target.closest("[data-role-picker]")) return;
      setRolePicker(null);
    };
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [rolePicker]);
  const messagesRef = useRef<HTMLDivElement>(null);
  const stickToBottom = useRef(true);

  useEffect(() => writeStorage(THEME_KEY, theme), [theme]);
  useEffect(() => {
    if (!lockLayout) writeStorage(`${LAYOUT_KEY}:${scenarios[0].id}`, layout);
  }, [layout, lockLayout, scenarios]);

  useEffect(() => {
    const tick = window.setInterval(() => store.tick(), 1000);
    const repaint = window.setInterval(() => setPulse((value) => value + 1), 10_000);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(repaint);
    };
  }, [store]);

  useEffect(() => {
    if (!confirmReset) return;
    const timer = window.setTimeout(() => setConfirmReset(false), 3000);
    return () => window.clearTimeout(timer);
  }, [confirmReset]);

  const scenario = store.scenario;
  const viewer = store.viewer;
  const you = store.humans[0];
  const channel = store.channel(store.activeChannelId)!;
  const now = useMemo(() => store.now(), [store, version, pulse]);
  const messages = store.visibleMessages(store.activeChannelId);

  const resolver = useMemo<MarkdownResolver>(
    () => ({
      user: (id) => {
        const member = store.member(id);
        return member ? { name: member.displayName } : null;
      },
      role: (id) => {
        const role = store.role(id);
        return role ? { name: role.name, color: role.color } : null;
      },
      channel: (id) => store.channel(id)?.name ?? null,
      now,
      onUserClick: (id) => {
        if (store.member(id) && !store.member(id)?.bot) setCardMemberId(id);
      },
    }),
    [store, now],
  );

  const handlers = useMemo<ComponentHandlers>(
    () => ({
      isLoading: (messageId, customId) => store.loading.has(`${messageId}:${customId}`),
      onButton: (message: SandboxMessage, button: SandboxButton) => {
        if (button.disabled) return;
        if (button.style === "link") {
          store.toast("Link buttons are disabled in the sandbox.");
          return;
        }
        if (button.customId) store.clickComponent(message.id, button.customId);
      },
      onSelect: (message: SandboxMessage, select: SandboxSelect, values: string[]) => store.clickComponent(message.id, select.customId, values),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, version],
  );

  // Keep the chat pinned to the newest message unless the reader scrolled up.
  useLayoutEffect(() => {
    const node = messagesRef.current;
    if (node && stickToBottom.current) node.scrollTop = node.scrollHeight;
  });

  useEffect(() => {
    stickToBottom.current = true;
  }, [store.activeChannelId, store.viewerId]);

  const onScroll = () => {
    const node = messagesRef.current;
    if (!node) return;
    stickToBottom.current = node.scrollHeight - node.scrollTop - node.clientHeight < 80;
  };

  const switchScenario = (id: string) => {
    const next = scenarios.find((item) => item.id === id);
    if (!next) return;
    store.load(next);
    setCardMemberId(null);
  };

  const presets = store.runtime.clockPresets?.() ?? [];
  const offset = store.clockOffset;

  const categories = useMemo(() => {
    const groups = new Map<string, typeof scenario.channels>();
    for (const item of scenario.channels) {
      const key = item.category ?? "";
      groups.set(key, [...(groups.get(key) ?? []), item]);
    }
    return [...groups.entries()];
  }, [scenario]);

  const disabledReason = store.canSend(viewer.id, channel.id) ? null : "You do not have permission to send messages in this channel.";
  const cardMember = cardMemberId ? store.member(cardMemberId) : null;
  const botName = scenario.bot.displayName;

  const renderMessages = () => {
    let previous: SandboxMessage | null = null;
    return messages.map((message) => {
      const continuation = Boolean(
        previous &&
          previous.authorId === message.authorId &&
          !previous.interaction &&
          !message.interaction &&
          Boolean(previous.ephemeralFor) === Boolean(message.ephemeralFor) &&
          message.createdAt - previous.createdAt < 7 * 60_000,
      );
      previous = message;
      const author = store.member(message.authorId);
      return (
        <MessageView
          key={message.id}
          message={message}
          author={author}
          continuation={continuation}
          highlighted={message.authorId !== viewer.id && store.pingsMember(message, viewer.id)}
          timeLabel={messageTimeLabel(message.createdAt, now)}
          shortTime={formatClock(message.createdAt)}
          handlers={handlers}
          interactionUser={message.interaction ? store.member(message.interaction.userId) : undefined}
          onDismiss={() => store.dismiss(message.id)}
          onAuthorClick={() => author && !author.bot && setCardMemberId(author.id)}
          botName={botName}
          nameColor={nameColor(author, scenario)}
          roleIcon={roleIconFor(author, scenario)}
        />
      );
    });
  };

  return (
    <MarkdownContext.Provider value={resolver}>
      <div ref={rootRef} className={`${styles.root} ${styles[`theme_${theme}`]} ${layout === "full" ? styles.layoutFull : styles.layoutCompact}`}>
        <div className={styles.topbar}>
          <div className={styles.topTitle}>
            <span className={styles.sandboxPill}>Sandbox</span>
            {scenarios.length > 1 ? (
              <select className={styles.scenarioSelect} value={scenario.id} onChange={(event) => switchScenario(event.target.value)} aria-label="Scenario">
                {scenarios.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            ) : (
              <span className={styles.scenarioName}>{scenario.title}</span>
            )}
          </div>
          <div className={styles.topControls}>
            <div className={styles.clockWrap} ref={clockRef}>
              <button type="button" className={styles.topButton} onClick={() => setClockOpen((open) => !open)} title="Simulated clock">
                🕒 {formatClock(now)}
                {offset >= 60_000 ? <span className={styles.clockOffset}>{formatOffset(offset)}</span> : null}
              </button>
              {clockOpen ? (
                <div className={styles.clockMenu}>
                  <div className={styles.clockMenuTitle}>Skip ahead in time</div>
                  {presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      className={styles.clockItem}
                      disabled={preset.at <= now}
                      onClick={() => {
                        store.jumpTo(preset.at);
                        setClockOpen(false);
                      }}
                    >
                      {preset.label}
                    </button>
                  ))}
                  {[
                    { label: "+15 minutes", ms: 15 * 60_000 },
                    { label: "+1 hour", ms: 60 * 60_000 },
                    { label: "+1 day", ms: 24 * 60 * 60_000 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className={styles.clockItem}
                      onClick={() => {
                        store.advance(item.ms);
                        setClockOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className={styles.clockHint}>Time only moves forward. Reset to start over.</div>
                </div>
              ) : null}
            </div>
            {!lockLayout ? (
              <div className={styles.segment} role="group" aria-label="Size">
                <button type="button" className={layout === "compact" ? styles.segmentOn : styles.segmentBtn} onClick={() => setLayout("compact")}>
                  Compact
                </button>
                <button type="button" className={layout === "full" ? styles.segmentOn : styles.segmentBtn} onClick={() => setLayout("full")}>
                  Full
                </button>
              </div>
            ) : null}
            <button
              type="button"
              className={`${styles.topButton} ${confirmReset ? styles.resetConfirm : ""}`}
              onClick={() => {
                if (!confirmReset) {
                  setConfirmReset(true);
                  return;
                }
                setConfirmReset(false);
                setCardMemberId(null);
                store.reset();
              }}
            >
              {confirmReset ? "Click again to reset" : "↺ Reset"}
            </button>
            <div className={styles.themes} role="group" aria-label="Background">
              {(
                [
                  ["default", "#4e5058", "Default"],
                  ["chroma", "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", "Chroma glow"],
                  ["strawberry", "linear-gradient(135deg, #B84D7A 0%, #A02F2F 50%, #D4A03F 100%)", "Strawberry Lemonade"],
                ] as const
              ).map(([value, background, label]) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.themeDot} ${theme === value ? styles.themeDotOn : ""}`}
                  onClick={() => setTheme(value)}
                  title={label}
                  aria-label={label}
                  aria-pressed={theme === value}
                >
                  <span style={{ background }} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
            <div className={styles.serverName}>{scenario.serverName}</div>
            <div className={styles.channelList}>
              {categories.map(([category, list]) => {
                const visible = list.filter((item) => store.canView(viewer.id, item.id));
                if (!visible.length) return null;
                return (
                  <div key={category || "none"} className={styles.category}>
                    {category ? (
                      <button
                        type="button"
                        className={styles.categoryName}
                        aria-expanded={!collapsed.has(category)}
                        onClick={() => toggleCategory(category)}
                      >
                        <span className={styles.categoryLabel}>{category}</span>
                        <svg
                          className={`${styles.categoryChevron} ${collapsed.has(category) ? styles.categoryChevronClosed : ""}`}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z" />
                        </svg>
                      </button>
                    ) : null}
                    {visible.map((item) => {
                      const badge = store.channelBadge(item.id);
                      const isActive = item.id === channel.id;
                      // A folded category still shows the open channel and channels that pinged you.
                      if (category && collapsed.has(category) && !isActive && badge.mentions === 0) return null;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`${styles.channel} ${isActive ? styles.channelActive : ""} ${badge.unread && !isActive ? styles.channelUnread : ""}`}
                          onClick={() => {
                            store.setChannel(item.id);
                            setSidebarOpen(false);
                          }}
                        >
                          {badge.unread && !isActive ? <span className={styles.unreadPip} /> : null}
                          <span className={styles.hash}>#</span>
                          <span className={styles.channelName}>{item.name}</span>
                          {badge.mentions > 0 && !isActive ? <span className={styles.mentionBadge}>{badge.mentions}</span> : null}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className={styles.viewerPanel}>
              <img src={viewer.avatar} alt="" />
              <div>
                <div className={styles.viewerName}>{viewer.displayName}</div>
                <div className={styles.viewerSub}>{viewer.id === you.id ? "You" : "Acting as this member"}</div>
              </div>
            </div>
          </aside>
          {sidebarOpen ? <div className={styles.sidebarScrim} onClick={() => setSidebarOpen(false)} /> : null}

          <main className={styles.chat}>
            <div className={styles.chatHeader}>
              <button type="button" className={styles.menuButton} onClick={() => setSidebarOpen((open) => !open)} aria-label="Channels">
                ☰
              </button>
              <span className={styles.hash}>#</span>
              <span className={styles.chatTitle}>{channel.name}</span>
              {channel.topic ? (
                <span className={styles.chatTopic} title={channel.topic.replace(/<#([^>]+)>/g, "#$1")}>
                  <DiscordMarkdown text={channel.topic} />
                </span>
              ) : null}
            </div>
            <div className={styles.messages} ref={messagesRef} onScroll={onScroll}>
              <div className={styles.channelIntro}>
                <div className={styles.introIcon}>#</div>
                <div className={styles.introTitle}>Welcome to #{channel.name}!</div>
                <div className={styles.introText}>This is a sandbox copy of the channel. Nothing here reaches Discord.</div>
              </div>
              {renderMessages()}
            </div>
            {viewer.id !== you.id ? (
              <div className={styles.actingBanner}>
                <img src={viewer.avatar} alt="" />
                <span>
                  Acting as <strong>{viewer.displayName}</strong>. You see and click what they would.
                </span>
                <button type="button" onClick={() => store.setViewer(you.id)}>
                  Back to {you.displayName}
                </button>
              </div>
            ) : null}
            <SlashComposer
              commands={store.runtime.commands}
              botName={botName}
              botAvatar={scenario.bot.avatar}
              channelName={channel.name}
              viewerId={viewer.id}
              roles={scenario.roles}
              disabledReason={disabledReason}
              now={now}
              onSendText={(value) => store.sendUserMessage(value)}
              onCommand={(name, values) => store.runCommand(name, values)}
            />
          </main>
        </div>

        <div className={styles.memberBar}>
          {store.humans.map((member, index) => (
            <button
              key={member.id}
              type="button"
              className={`${styles.memberChip} ${member.id === viewer.id ? styles.memberChipActive : ""} ${index === 0 ? styles.memberChipYou : ""}`}
              onClick={() => {
                setRolePickerOpen(false);
                setCardMemberId(member.id);
              }}
            >
              <img src={member.avatar} alt="" />
              <span className={styles.memberChipName} style={{ color: nameColor(member, scenario) }}>
                {member.displayName}
              </span>
              {roleIconFor(member, scenario) ? <img className={styles.roleIcon} src={roleIconFor(member, scenario)!.src} alt="" /> : null}
              {index === 0 ? <span className={styles.youTag}>You</span> : null}
            </button>
          ))}
        </div>

        {cardMember ? (
          <div className={styles.cardBackdrop} onMouseDown={(event) => event.target === event.currentTarget && setCardMemberId(null)}>
            <div className={styles.card} role="dialog" aria-label={`${cardMember.displayName} profile`}>
              <div className={styles.cardBanner} style={{ background: nameColor(cardMember, scenario) ?? "#5865f2" }} />
              <img className={styles.cardAvatar} src={cardMember.avatar} alt="" />
              <button type="button" className={styles.cardClose} onClick={() => setCardMemberId(null)} aria-label="Close">
                ✕
              </button>
              <div className={styles.cardBody}>
                <div className={styles.cardName}>
                  {cardMember.displayName}
                  {roleIconFor(cardMember, scenario) ? <img className={styles.roleIcon} src={roleIconFor(cardMember, scenario)!.src} alt="" /> : null}
                </div>
                <div className={styles.cardUser}>
                  {cardMember.username}
                  {cardMember.id === you.id ? " · You" : ""}
                </div>
                {cardMember.badges?.length ? (
                  <div className={styles.cardBadges}>
                    {cardMember.badges.map((badge) => (
                      <span key={badge} className={styles.cardBadge}>
                        {badge}
                      </span>
                    ))}
                  </div>
                ) : null}
                {cardMember.vrcName ? (
                  <div className={styles.cardSection}>
                    <div className={styles.cardLabel}>VRChat name</div>
                    <div>{cardMember.vrcName}</div>
                  </div>
                ) : null}
                {cardMember.note ? <div className={styles.cardNote}>{cardMember.note}</div> : null}
                <div className={styles.cardSection}>
                  <div className={styles.cardLabel}>Roles</div>
                  <div className={styles.rolePills}>
                    {scenario.roles
                      .filter((role) => cardMember.roles.includes(role.id))
                      .map((role) => (
                        <span key={role.id} className={styles.rolePill} title={role.description}>
                          <button
                            type="button"
                            className={styles.roleDot}
                            style={{ background: role.color ?? "#99aab5" }}
                            onClick={() => store.toggleRole(cardMember.id, role.id)}
                            aria-label={`Remove ${role.name}`}
                            title="Remove role"
                          >
                            <span>✕</span>
                          </button>
                          {role.icon ? <img className={styles.roleIcon} src={role.icon} alt="" /> : null}
                          {role.name}
                        </span>
                      ))}
                    <span className={styles.rolePickerWrap}>
                      <button type="button" className={styles.roleAdd} onClick={(event) => openRolePicker(event.currentTarget)} aria-label="Add role" title="Add role">
                        +
                      </button>
                      {rolePickerOpen ? (
                        <div className={styles.rolePicker} style={rolePicker ?? undefined} data-role-picker="">
                          {scenario.roles
                            .filter((role) => !cardMember.roles.includes(role.id))
                            .map((role) => (
                              <button
                                key={role.id}
                                type="button"
                                className={styles.rolePickerItem}
                                onClick={() => {
                                  store.toggleRole(cardMember.id, role.id);
                                  setRolePickerOpen(false);
                                }}
                                title={role.description}
                              >
                                <span className={styles.roleSwatch} style={{ background: role.color ?? "#99aab5" }} />
                                {role.icon ? <img className={styles.roleIcon} src={role.icon} alt="" /> : null}
                                {role.name}
                                {role.managed ? <span className={styles.managed}>bot-managed</span> : null}
                              </button>
                            ))}
                        </div>
                      ) : null}
                    </span>
                  </div>
                  <div className={styles.cardHint}>Sandbox only: add or remove roles to test other setups.</div>
                </div>
                <div className={styles.cardActions}>
                  {cardMember.id === viewer.id ? (
                    <span className={styles.cardActing}>{cardMember.id === you.id ? "This is you." : "You are acting as this member."}</span>
                  ) : (
                    <button
                      type="button"
                      className={styles.cardPrimary}
                      onClick={() => {
                        store.setViewer(cardMember.id);
                        setCardMemberId(null);
                      }}
                    >
                      {cardMember.id === you.id ? `Back to ${you.displayName}` : `Act as ${cardMember.displayName}`}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {store.modal ? (
          <ModalView
            key={store.modal.modal.customId}
            modal={store.modal.modal}
            botAvatar={scenario.bot.avatar}
            botName={botName}
            onCancel={() => store.closeModal()}
            onSubmit={(values) => store.submitModal(values)}
          />
        ) : null}

        {store.toastText ? <div className={styles.toast}>{store.toastText}</div> : null}
      </div>
    </MarkdownContext.Provider>
  );
}

export default function DiscordSandbox(props: DiscordSandboxProps) {
  const fallback = useCallback(() => <div className={styles.loading}>Loading the sandbox…</div>, []);
  return <BrowserOnly fallback={fallback()}>{() => <SandboxInner {...props} />}</BrowserOnly>;
}
