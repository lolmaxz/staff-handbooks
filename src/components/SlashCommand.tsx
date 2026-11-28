import React, { useEffect, useRef, useState } from "react";
import styles from "./SlashCommand.module.css";
import SlashCommandLive from "./SlashCommandLive";

export interface SlashCommandOption {
  name: string;
  description?: string;
  /** Puts this option in the chat bar. */
  selected?: boolean;
  /** The option waiting for a value. Its choices replace the list, and the dark bar uses its name. */
  active?: boolean;
  /** Required. While it is empty and has no choices, the other options stay hidden. */
  required?: boolean;
  /** Red border on this option's pill instead of blue. */
  requiredWarning?: boolean;
  /** Blue border. Only a focused option gets it. */
  focused?: boolean;
  /** Text already in the grey zone on the right of this option. */
  value?: string;
  /** Text the animation types into this option. Options with this set play in list order. */
  input?: string;
  /** Values listed while this option is active. */
  choices?: string[];
  /** Interactive picker. `choices` and `boolean` list values. `user`, `role`, and `attachment` list up to three suggestions. */
  type?: "string" | "user" | "role" | "boolean" | "attachment";
  /** Replaces the built-in member, role, or file suggestions. */
  suggestions?: string[];
}

export interface SlashCommandProps {
  /** Command name. The leading slash is added for you. */
  command: string;
  /** Subcommand group. Discord allows one, between the command and the subcommand. */
  group?: string;
  /** Subcommand under the command, or under the group. */
  subcommand?: string;
  /** Shown under the command, and on the dark bar when options are open. */
  description?: string;
  /** Bot name on the right of the command row. */
  bot: string;
  /** Bot profile picture. `"placeholder"` is Discord’s blue default. A missing picture uses that too. */
  avatar?: string;
  /** Non-functional + on the left of the chat bar. Command layout only. */
  plus?: boolean;
  /** Switches to the Options layout. The chat bar counts these. */
  options?: SlashCommandOption[];
  /** Plays the typing animation on hover, or as soon as the page loads. */
  animate?: "hover" | "load";
  /** Dimmed “Message #name” in the chat bar before the command is typed. */
  channel?: string;
  /** Small pill at the top left. Defaults to “Example”, or “Try it” when interactive. An empty string hides it. */
  demoLabel?: string;
  /** Lets the reader type in the chat bar. Options, members, roles, and choices update as they type. */
  interactive?: boolean;
  /** Interactive only. `"command"` starts with the slash command written. `"empty"` starts from a blank chat bar. */
  start?: "empty" | "command";
}

const PLUS = (
  <svg className={styles.plusIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1Z"
    />
  </svg>
);

const SEND = (
  <svg className={styles.sendIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M2.07 2.07a1 1 0 0 1 1.06-.22l18 7a1 1 0 0 1 0 1.86l-7.72 3.01-3.01 7.72a1 1 0 0 1-1.86 0l-7-18a1 1 0 0 1 .22-1.06l.31-.31Z"
    />
  </svg>
);

const CLOSE = (
  <svg className={styles.closeIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.3 5.7a1 1 0 0 1 0 1.4L13.4 12l4.9 4.9a1 1 0 0 1-1.4 1.4L12 13.4l-4.9 4.9a1 1 0 0 1-1.4-1.4l4.9-4.9-4.9-4.9a1 1 0 0 1 1.4-1.4L12 10.6l4.9-4.9a1 1 0 0 1 1.4 0Z"
    />
  </svg>
);

function bareName(value: string) {
  return value.trim().replace(/^\/+/, "");
}

function commandPath(command: string, group?: string, subcommand?: string) {
  const parts = [bareName(command)];
  for (const part of [group, subcommand]) {
    if (!part) continue;
    const name = bareName(part);
    if (name) parts.push(name);
  }
  return `/${parts.join(" ")}`;
}

function optionCount(count: number) {
  return `+${count} ${count === 1 ? "option" : "options"}`;
}

function inChatBar(option: SlashCommandOption) {
  return Boolean(option.selected || option.active || option.focused || option.value);
}

function shownOnMobileBar(options: SlashCommandOption[], tokens: MobileToken[]) {
  const byName = new Map(tokens.map((token) => [token.name, token]));
  return options.filter((option) => {
    const token = byName.get(option.name);
    if (!token || token.caret) return true;
    return !token.value;
  });
}

function tokenClass(option: Pick<SlashCommandOption, "requiredWarning" | "focused">) {
  if (option.requiredWarning) return `${styles.token} ${styles.tokenWarning}`;
  if (option.focused) return `${styles.token} ${styles.tokenFocused}`;
  return styles.token;
}

const TYPE_MS = 52;
const PATH_PAUSE_MS = 800;
const AFTER_SPACE_MS = 400;
const OPTION_GAP_MS = 700;
const FIELD_PAUSE_MS = 320;
const HOLD_MS = 10000;
const PLACEHOLDER_SRC = require("@site/static/img/discord-bot-placeholder.png").default as string;

function SlashAvatar({
  src,
  broken,
  onError,
  variant,
}: {
  src?: string;
  broken: boolean;
  onError?: () => void;
  variant: "row" | "composer";
}) {
  const className = variant === "row" ? styles.avatar : styles.composerAvatar;
  if (src === "placeholder" || (src && broken)) {
    return <img className={`${className} ${styles.avatarPlaceholder}`} src={PLACEHOLDER_SRC} alt="" />;
  }
  if (!src) return variant === "row" ? <span className={`${styles.avatar} ${styles.avatarFallback}`} /> : null;
  return <img className={className} src={src} alt="" onError={onError} />;
}

interface Playback {
  phase: "idle" | "type" | "fill" | "hold";
  typed: string;
  step: number;
  count: number;
}

const IDLE: Playback = { phase: "idle", typed: "", step: 0, count: 0 };

function channelPrompt(channel?: string) {
  const name = channel?.trim().replace(/^#/, "");
  return name ? `Message #${name}` : "";
}

interface PlayToken {
  option: SlashCommandOption;
  value: string;
  focused: boolean;
  caret: boolean;
}

function playTokens(list: SlashCommandOption[], script: SlashCommandOption[], playback: Playback) {
  const tokens: PlayToken[] = [];
  list.forEach((option) => {
    const index = script.indexOf(option);
    const done = index >= 0 && (playback.phase === "hold" || index < playback.step);
    const current = playback.phase === "fill" && index === playback.step;
    if (!option.required && !done && !current) return;
    const value = done ? option.input ?? "" : current ? (option.input ?? "").slice(0, playback.count) : "";
    tokens.push({ option, value, focused: current, caret: current });
  });
  return tokens;
}

type SlashView = "desktop" | "mobile";

function useSlashView() {
  const [view, setView] = useState<SlashView>("desktop");
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    if (!picked) setView(media.matches ? "mobile" : "desktop");
    const onChange = (event: MediaQueryListEvent) => {
      if (!picked) setView(event.matches ? "mobile" : "desktop");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [picked]);
  const choose = (next: SlashView) => {
    setPicked(true);
    setView(next);
  };
  return { view, choose };
}

function DemoChrome({ label, view, onChange }: { label: string; view: SlashView; onChange: (next: SlashView) => void }) {
  return (
    <>
      {label ? <span className={styles.demoLabel}>{label}</span> : null}
      <div className={styles.viewToggle} role="group" aria-label="Command demo device">
        <button
          type="button"
          className={view === "desktop" ? styles.viewToggleOn : styles.viewToggleBtn}
          aria-pressed={view === "desktop"}
          onClick={() => onChange("desktop")}
        >
          Desktop
        </button>
        <button
          type="button"
          className={view === "mobile" ? styles.viewToggleOn : styles.viewToggleBtn}
          aria-pressed={view === "mobile"}
          onClick={() => onChange("mobile")}
        >
          Mobile
        </button>
      </div>
    </>
  );
}

interface MobileToken {
  name: string;
  value: string;
  caret: boolean;
  warning: boolean;
}

function MobileCommandCard({
  slash,
  description,
  bot,
  avatar,
  avatarBroken,
  onError,
}: {
  slash: string;
  description?: string;
  bot: string;
  avatar?: string;
  avatarBroken: boolean;
  onError?: () => void;
}) {
  return (
    <div className={styles.mCommand}>
      <SlashAvatar src={avatar} broken={avatarBroken} onError={onError} variant="row" />
      <div className={styles.mCommandBody}>
        <div className={styles.mCommandTop}>
          <span className={styles.mCommandName}>{slash}</span>
          <span className={styles.mBot}>{bot}</span>
        </div>
        {description ? <div className={styles.mCommandDesc}>{description}</div> : null}
      </div>
    </div>
  );
}

function MobileOptionsStack({
  options,
  activeName,
  description,
  choices,
  highlightedChoice,
}: {
  options: SlashCommandOption[];
  activeName?: string;
  description?: string;
  choices: string[];
  highlightedChoice?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || !activeName) return;
    const pill = [...bar.querySelectorAll<HTMLElement>("[data-pill]")].find((el) => el.dataset.pill === activeName);
    if (!pill) return;
    const edge = pill.offsetLeft - 8;
    const hiddenLeft = edge < bar.scrollLeft;
    const hiddenRight = edge + pill.offsetWidth > bar.scrollLeft + bar.clientWidth - 8;
    if (hiddenLeft || hiddenRight) bar.scrollLeft = Math.max(0, edge - 16);
  }, [activeName]);
  const required = options.filter((option) => option.required);
  const optional = options.filter((option) => !option.required);
  const hasBar = required.length > 0 || optional.length > 0;
  const pill = (option: SlashCommandOption) => (
    <span
      className={option.name === activeName ? styles.mPillOn : styles.mPill}
      data-pill={option.name}
      key={option.name}
    >
      {option.name}
    </span>
  );
  return (
    <div className={styles.mStack}>
      {choices.length > 0 ? (
        <div className={styles.mChoices}>
          <div className={styles.mChoiceScroll}>
            {choices.map((choice) => (
              <div className={choice === highlightedChoice ? styles.mChoiceOn : styles.mChoice} key={choice}>
                <span className={styles.mChoiceName}>{choice}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {hasBar || description ? (
      <div className={styles.mOptionCard}>
        {hasBar ? (
        <div className={styles.mOptionBar} ref={barRef}>
          {required.map(pill)}
          {optional.length > 0 ? <span className={styles.mOptional}>Optional</span> : null}
          {optional.map(pill)}
        </div>
        ) : null}
        {description ? <div className={styles.mDesc}>{description}</div> : null}
      </div>
      ) : null}
    </div>
  );
}

function MobileChat({
  plus,
  typed,
  prompt,
  tokens,
  showRestart,
  cycle,
}: {
  plus: boolean;
  typed: string;
  prompt: string;
  tokens: MobileToken[];
  showRestart: boolean;
  cycle: number;
}) {
  const showCaret = tokens.length === 0 && Boolean(typed);
  return (
    <div className={styles.mChat}>
      {plus ? (
        <span className={styles.plus} aria-hidden="true">
          {PLUS}
        </span>
      ) : null}
      <div className={styles.mInput}>
        {typed ? <span className={styles.mTyped}>{typed}</span> : prompt ? <span className={styles.channelPrompt}>{prompt}</span> : null}
        {tokens.map((token) => (
          <span className={styles.mToken} key={token.name}>
            <span className={token.warning ? `${styles.mLabel} ${styles.mLabelWarn}` : styles.mLabel}>{token.name}:</span>
            {token.value || token.caret ? (
              <span className={styles.mValue}>
                {token.value}
                {token.caret ? <span className={styles.caret} aria-hidden="true" /> : null}
              </span>
            ) : null}
          </span>
        ))}
        {showCaret ? <span className={styles.caret} aria-hidden="true" /> : null}
      </div>
      {showRestart ? (
        <svg key={cycle} className={styles.restart} viewBox="0 0 12 12" aria-hidden="true">
          <circle className={styles.restartTrack} cx="6" cy="6" r="4" />
          <circle className={styles.restartCircle} cx="6" cy="6" r="4" />
        </svg>
      ) : null}
      <span className={styles.send} aria-hidden="true">
        {SEND}
      </span>
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

function SlashCommandStatic({
  command,
  group,
  subcommand,
  description,
  bot,
  avatar,
  plus = false,
  options,
  animate,
  channel,
  demoLabel = "Example",
}: SlashCommandProps) {
  const slash = commandPath(command, group, subcommand);
  const { view, choose } = useSlashView();
  const optionList = options ?? [];
  const optionsRef = useRef(optionList);
  optionsRef.current = optionList;
  const reduced = usePrefersReducedMotion();
  const [started, setStarted] = useState(animate === "load");
  const [cycle, setCycle] = useState(0);
  const [playback, setPlayback] = useState<Playback>(IDLE);
  const [avatarBroken, setAvatarBroken] = useState(false);
  const scriptKey = optionList.map((option) => `${option.name}:${option.required ? 1 : 0}:${option.input ?? ""}`).join("|");

  useEffect(() => {
    setAvatarBroken(false);
  }, [avatar]);

  useEffect(() => {
    if (!animate || !started || reduced) return;
    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(() => resolve(), ms));
      });

    const run = async () => {
      const list = optionsRef.current;
      const path = commandPath(command, group, subcommand);
      const script = list.filter((option) => option.input != null);
      for (let index = 1; index <= path.length; index += 1) {
        if (cancelled) return;
        setPlayback({ phase: "type", typed: path.slice(0, index), step: 0, count: 0 });
        await wait(TYPE_MS);
      }
      if (cancelled) return;
      await wait(PATH_PAUSE_MS);
      if (cancelled) return;
      setPlayback({ phase: "fill", typed: path, step: 0, count: 0 });
      await wait(AFTER_SPACE_MS);
      for (let step = 0; step < script.length; step += 1) {
        const text = script[step].input ?? "";
        for (let count = 1; count <= text.length; count += 1) {
          if (cancelled) return;
          setPlayback({ phase: "fill", typed: path, step, count });
          await wait(TYPE_MS);
        }
        if (cancelled) return;
        if (step < script.length - 1) {
          await wait(OPTION_GAP_MS);
          if (cancelled) return;
          setPlayback({ phase: "fill", typed: path, step: step + 1, count: 0 });
          await wait(FIELD_PAUSE_MS);
        }
      }
      if (cancelled) return;
      setPlayback({ phase: "hold", typed: path, step: script.length, count: 0 });
      await wait(HOLD_MS);
      if (cancelled) return;
      setCycle((value) => value + 1);
    };

    void run();
    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [animate, started, reduced, cycle, command, group, subcommand, scriptKey]);

  if (animate) {
    const script = optionList.filter((option) => option.input != null);
    const frame = reduced ? { phase: "hold" as const, typed: slash, step: script.length, count: 0 } : playback;
    const typing = frame.phase === "type";
    const filling = frame.phase === "fill" || frame.phase === "hold";
    const tokens = filling ? playTokens(optionList, script, frame) : [];
    const inBar = new Set(tokens.map((token) => token.option.name));
    const current = frame.phase === "fill" ? script[frame.step] : undefined;
    const choiceList = current?.choices ?? [];
    const available = optionList.filter((option) => !inBar.has(option.name));
    const listKind = choiceList.length ? "choices" : frame.phase === "fill" && available.length ? "options" : typing ? "command" : "none";
    const remaining = optionList.length - tokens.length;
    const prompt = channelPrompt(channel);
    const inBarAtStart = new Set(optionList.filter((option) => option.required).map((option) => option.name));
    if (script[0]) inBarAtStart.add(script[0].name);
    const peakOptions = optionList.filter((option) => !inBarAtStart.has(option.name));
    const peakChoices = script.reduce<string[]>((best, option) => ((option.choices?.length ?? 0) > best.length ? option.choices ?? [] : best), []);
    const reserveList = !reduced;
    const mobileTokens: MobileToken[] = tokens.map((token) => ({
      name: token.option.name,
      value: token.value,
      caret: token.caret,
      warning: Boolean(token.option.requiredWarning),
    }));
    const mobileBarOptions = shownOnMobileBar(optionList, mobileTokens);
    const longestDesc = [description ?? "", ...optionList.map((option) => option.description ?? "")].reduce(
      (best, text) => (text.length > best.length ? text : best),
      "",
    );
    const peakMobileTokens: MobileToken[] = script.map((option) => ({
      name: option.name,
      value: option.input ?? "",
      caret: false,
      warning: false,
    }));

    return (
      <div
        className={styles.root}
        onMouseEnter={animate === "hover" ? () => setStarted(true) : undefined}
        aria-label={typing ? `Commands matching ${frame.typed}` : `Playing ${slash}`}
      >
        <DemoChrome label={demoLabel} view={view} onChange={choose} />
        {view === "mobile" ? (
          <div className={styles.mobileFrame}>
            <div className={styles.stage}>
              {reserveList ? (
                <div className={`${styles.stageSizer} ${styles.sizer}`} aria-hidden="true">
                  <div className={styles.listSlot}>
                    <MobileCommandCard slash={slash} description={description} bot={bot} avatar={avatar} avatarBroken={avatarBroken} />
                    <MobileOptionsStack options={optionList} description={longestDesc} choices={peakChoices.slice(0, 4)} />
                  </div>
                  <MobileChat plus={plus} typed={slash} prompt="" tokens={peakMobileTokens} showRestart={false} cycle={0} />
                </div>
              ) : null}
              <div className={styles.stageLive}>
                {filling ? (
                  <MobileOptionsStack
                    options={mobileBarOptions}
                    activeName={current?.name}
                    description={current?.description ?? description}
                    choices={choiceList}
                    highlightedChoice={choiceList.includes((current?.input ?? "").slice(0, frame.count)) ? (current?.input ?? "").slice(0, frame.count) : choiceList[0]}
                  />
                ) : (
                  <MobileCommandCard
                    slash={slash}
                    description={description}
                    bot={bot}
                    avatar={avatar}
                    avatarBroken={avatarBroken}
                    onError={() => setAvatarBroken(true)}
                  />
                )}
                <MobileChat
                  plus={plus}
                  typed={frame.typed}
                  prompt={prompt}
                  tokens={mobileTokens}
                  showRestart={frame.phase === "hold" && !reduced}
                  cycle={cycle}
                />
              </div>
            </div>
          </div>
        ) : (
        <div className={styles.stage}>
        {reserveList ? (
          <div className={`${styles.stageSizer} ${styles.sizer}`} aria-hidden="true">
            <div className={styles.listSlot}>
              <div className={styles.panel}>
                <div className={styles.header}>Commands matching {slash}</div>
                <div className={styles.commandRow}>
                  <SlashAvatar src={avatar} broken={avatarBroken} variant="row" />
                  <div className={styles.commandText}>
                    <div className={styles.commandName}>{slash}</div>
                    {description ? <div className={styles.commandDesc}>{description}</div> : null}
                  </div>
                  <div className={styles.botName}>{bot}</div>
                </div>
              </div>
              {peakOptions.length > 0 ? (
                <div className={styles.optionsPanel}>
                  <div className={styles.header}>Options</div>
                  <div className={styles.optionScroll}>
                    {peakOptions.map((option) => (
                      <div className={styles.option} key={option.name}>
                        <span className={styles.optionName}>{option.name}</span>
                        {option.description ? <span className={styles.optionDesc}>{option.description}</span> : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {peakChoices.length > 0 ? (
                <div className={styles.optionsPanel}>
                  <div className={styles.header}>Options</div>
                  <div className={styles.optionScroll}>
                    {peakChoices.map((choice) => (
                      <div className={styles.option} key={choice}>
                        <span className={styles.optionName}>{choice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className={styles.chat}>
              <div className={styles.commandStrip}>
                <span className={styles.stripName}>{slash}</span>
                {longestDesc ? <span className={styles.stripDesc}>{longestDesc}</span> : null}
                <span className={styles.close} aria-hidden="true">
                  {CLOSE}
                </span>
              </div>
              <div className={styles.composer} />
            </div>
          </div>
        ) : null}
        <div className={styles.stageLive}>
          {listKind !== "none" ? (
            <div className={listKind === "command" ? styles.panel : styles.optionsPanel}>
              <div className={styles.header}>{listKind === "command" ? <>Commands matching {frame.typed}</> : "Options"}</div>
              {listKind === "choices" ? (
                <div className={styles.optionScroll}>
                  {choiceList.map((choice, index) => {
                    const typedNow = (current?.input ?? "").slice(0, frame.count);
                    const highlighted = choiceList.includes(typedNow) ? typedNow : choiceList[0];
                    return (
                      <div className={choice === highlighted ? styles.optionSelected : styles.option} key={`${choice}-${index}`}>
                        <span className={styles.optionName}>{choice}</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {listKind === "options" ? (
                <div className={styles.optionScroll}>
                  {available.map((option, index) => (
                    <div className={styles.option} key={`${option.name}-${index}`}>
                      <span className={styles.optionName}>{option.name}</span>
                      {option.description ? <span className={styles.optionDesc}>{option.description}</span> : null}
                    </div>
                  ))}
                </div>
              ) : null}
              {listKind === "command" ? (
                <div className={styles.commandRow}>
                  <SlashAvatar src={avatar} broken={avatarBroken} onError={() => setAvatarBroken(true)} variant="row" />
                  <div className={styles.commandText}>
                    <div className={styles.commandName}>{slash}</div>
                    {description ? <div className={styles.commandDesc}>{description}</div> : null}
                  </div>
                  <div className={styles.botName}>{bot}</div>
                </div>
              ) : null}
            </div>
          ) : null}
        <div className={styles.chat}>
          {filling ? (
            <div className={styles.commandStrip}>
              <span className={styles.stripName}>{current ? current.name : slash}</span>
              {(current ? current.description : description) ? (
                <span className={styles.stripDesc}>{current ? current.description : description}</span>
              ) : null}
              <span className={styles.close} aria-hidden="true">
                {CLOSE}
              </span>
            </div>
          ) : null}
          <div className={styles.composer}>
            {filling ? <SlashAvatar src={avatar} broken={avatarBroken} onError={() => setAvatarBroken(true)} variant="composer" /> : null}
            {!filling && plus ? (
              <span className={styles.plus} aria-hidden="true">
                {PLUS}
              </span>
            ) : null}
            <div className={styles.inputLine}>
              {frame.typed ? <span className={styles.typed}>{frame.typed}</span> : prompt ? <span className={styles.channelPrompt}>{prompt}</span> : null}
              {tokens.length > 0 ? (
                tokens.map((token) => (
                  <span className={tokenClass({ ...token.option, focused: token.focused })} key={token.option.name}>
                    <span className={styles.tokenName}>{token.option.name}</span>
                    <span className={token.value ? styles.tokenValue : styles.tokenWait}>
                      {token.value}
                      {token.caret ? <span className={styles.caret} aria-hidden="true" /> : null}
                    </span>
                  </span>
                ))
              ) : frame.typed ? (
                <span className={styles.caret} aria-hidden="true" />
              ) : null}
              {filling && remaining > 0 ? <span className={styles.extra}>{`+${remaining} more`}</span> : null}
            </div>
            {frame.phase === "hold" && !reduced ? (
              <svg key={cycle} className={styles.restart} viewBox="0 0 12 12" aria-hidden="true">
                <circle className={styles.restartTrack} cx="6" cy="6" r="4" />
                <circle className={styles.restartCircle} cx="6" cy="6" r="4" />
              </svg>
            ) : null}
          </div>
        </div>
        </div>
        </div>
        )}
      </div>
    );
  }
  const showingOptions = optionList.length > 0;
  const tokens = optionList.filter(inChatBar);
  const active =
    optionList.find((option) => option.focused) ??
    optionList.find((option) => option.active) ??
    tokens.find((option) => !option.value) ??
    null;
  const choiceList = active?.choices ?? [];
  const showingChoices = choiceList.length > 0;
  const highlightedChoice = active?.value && choiceList.includes(active.value) ? active.value : choiceList[0];
  const remaining = optionList.length - tokens.length;
  const extra = tokens.length > 0 ? (remaining > 0 ? `+${remaining} more` : "") : showingOptions ? optionCount(optionList.length) : "";
  const stripName = active ? active.name : slash;
  const stripDesc = active ? active.description : description;
  const waitingOnRequired = Boolean(active?.required && !active.value && choiceList.length === 0);
  const listedOptions = optionList.filter((option) => !inChatBar(option));
  const showList = !waitingOnRequired && (!showingOptions || showingChoices || listedOptions.length > 0);
  const mobileTokens: MobileToken[] = tokens.map((option) => ({
    name: option.name,
    value: option.value ?? "",
    caret: option === active,
    warning: Boolean(option.requiredWarning),
  }));
  const mobileBarOptions = shownOnMobileBar(optionList, mobileTokens);

  return (
    <div
      className={styles.root}
      aria-label={active ? `Filling ${active.name} for ${slash}` : showingOptions ? `Options for ${slash}` : `Commands matching ${slash}`}
    >
      <DemoChrome label={demoLabel} view={view} onChange={choose} />
      {view === "mobile" ? (
        <div className={styles.mobileFrame}>
          {showingOptions ? (
            <MobileOptionsStack
              options={mobileBarOptions}
              activeName={active?.name}
              description={active?.description ?? description}
              choices={showingChoices ? choiceList : []}
              highlightedChoice={highlightedChoice}
            />
          ) : (
            <MobileCommandCard
              slash={slash}
              description={description}
              bot={bot}
              avatar={avatar}
              avatarBroken={avatarBroken}
              onError={() => setAvatarBroken(true)}
            />
          )}
          <MobileChat
            plus={plus}
            typed={slash}
            prompt=""
            tokens={mobileTokens}
            showRestart={false}
            cycle={0}
          />
        </div>
      ) : (
      <>
      {showList ? (
      <div className={showingOptions ? styles.optionsPanel : styles.panel}>
        <div className={styles.header}>{showingOptions ? "Options" : <>Commands matching {slash}</>}</div>
        {showingChoices ? (
          <div className={styles.optionScroll}>
            {choiceList.map((choice, index) => (
              <div className={choice === highlightedChoice ? styles.optionSelected : styles.option} key={`${choice}-${index}`}>
                <span className={styles.optionName}>{choice}</span>
              </div>
            ))}
          </div>
        ) : showingOptions ? (
          <div className={styles.optionScroll}>
            {listedOptions.map((option, index) => (
              <div className={styles.option} key={`${option.name}-${index}`}>
                <span className={styles.optionName}>{option.name}</span>
                {option.description ? <span className={styles.optionDesc}>{option.description}</span> : null}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.commandRow}>
            <SlashAvatar src={avatar} broken={avatarBroken} onError={() => setAvatarBroken(true)} variant="row" />
            <div className={styles.commandText}>
              <div className={styles.commandName}>{slash}</div>
              {description ? <div className={styles.commandDesc}>{description}</div> : null}
            </div>
            <div className={styles.botName}>{bot}</div>
          </div>
        )}
      </div>
      ) : null}

      <div className={styles.chat}>
      {showingOptions ? (
        <div className={styles.commandStrip}>
          <span className={styles.stripName}>{stripName}</span>
          {stripDesc ? <span className={styles.stripDesc}>{stripDesc}</span> : null}
          <span className={styles.close} aria-hidden="true">
            {CLOSE}
          </span>
        </div>
      ) : null}

      <div className={styles.composer}>
        {showingOptions ? <SlashAvatar src={avatar} broken={avatarBroken} onError={() => setAvatarBroken(true)} variant="composer" /> : null}
        {!showingOptions && plus ? (
          <span className={styles.plus} aria-hidden="true">
            {PLUS}
          </span>
        ) : null}
        <div className={styles.inputLine}>
          <span className={styles.typed}>{slash}</span>
          {tokens.length > 0 ? (
            tokens.map((option, index) => (
              <span className={tokenClass(option)} key={`${option.name}-${index}`}>
                <span className={styles.tokenName}>{option.name}</span>
                <span className={option.value ? styles.tokenValue : styles.tokenWait}>
                  {option.value}
                  {option === active ? <span className={styles.caret} aria-hidden="true" /> : null}
                </span>
              </span>
            ))
          ) : (
            <span className={styles.caret} aria-hidden="true" />
          )}
          {extra ? <span className={styles.extra}>{extra}</span> : null}
        </div>
      </div>
      </div>
      </>
      )}
    </div>
  );
}

export default function SlashCommand(props: SlashCommandProps) {
  if (props.interactive) return <SlashCommandLive {...props} />;
  return <SlashCommandStatic {...props} />;
}
