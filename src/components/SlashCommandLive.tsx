import React, { useLayoutEffect, useRef, useState } from "react";
import type { SlashCommandOption, SlashCommandProps } from "./SlashCommand";
import styles from "./SlashCommand.module.css";

const PLACEHOLDER_SRC = require("@site/static/img/discord-bot-placeholder.png").default as string;

const MEMBERS = [
  { name: "Nova", user: "nova", color: "#5865f2" },
  { name: "Juniper", user: "juniper", color: "#3ba55d" },
  { name: "Cass", user: "cass", color: "#eb459e" },
];

const ROLES = [
  { name: "Moderator", color: "#e68027" },
  { name: "Senior Event Team", color: "#ffc857" },
  { name: "Event Host", color: "#a259f7" },
  { name: "Event Security", color: "#ff5e5b" },
  { name: "Cutie Helper", color: "#38c8e8" },
  { name: "Event Committee", color: "#00e6c3" },
  { name: "Restricted Access", color: "#e87878" },
];

const FILES = ["screenshot.png", "clip.mp4", "notes.txt"];

type Row = { label: string; detail?: string; color?: string };

type Filled = { name: string; value: string };

const RESET = (
  <svg className={styles.resetIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 5a7 7 0 0 1 6.32 4H16a1 1 0 1 0 0 2h5a1 1 0 0 0 1-1V5a1 1 0 1 0-2 0v1.67A9 9 0 1 0 21 13a1 1 0 1 0-2 0 7 7 0 1 1-7-8Z"
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

function useSlashView() {
  const [view, setView] = useState<"desktop" | "mobile">("desktop");
  const [picked, setPicked] = useState(false);
  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    if (!picked) setView(media.matches ? "mobile" : "desktop");
    const onChange = (event: MediaQueryListEvent) => {
      if (!picked) setView(event.matches ? "mobile" : "desktop");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [picked]);
  return {
    view,
    choose: (next: "desktop" | "mobile") => {
      setPicked(true);
      setView(next);
    },
  };
}

function SlashAvatar({ src, broken, onError }: { src?: string; broken: boolean; onError?: () => void }) {
  if (src === "placeholder" || (src && broken)) {
    return <img className={`${styles.avatar} ${styles.avatarPlaceholder}`} src={PLACEHOLDER_SRC} alt="" />;
  }
  if (!src) return <span className={`${styles.avatar} ${styles.avatarFallback}`} />;
  return <img className={styles.avatar} src={src} alt="" onError={onError} />;
}

function rowsFor(option: SlashCommandOption): Row[] {
  if (option.type === "user") {
    if (option.suggestions?.length) return option.suggestions.map((label) => ({ label }));
    return MEMBERS.map((member) => ({ label: member.name, detail: member.user, color: member.color }));
  }
  if (option.type === "role") {
    const source = option.suggestions?.length
      ? option.suggestions.map((label) => ({ label, color: ROLES.find((role) => role.name === label)?.color }))
      : ROLES.map((role) => ({ label: role.name, color: role.color }));
    return source;
  }
  if (option.type === "attachment") {
    return (option.suggestions?.length ? option.suggestions : FILES).map((label) => ({ label }));
  }
  if (option.type === "boolean" || option.choices?.length) {
    const labels = option.choices?.length ? option.choices : ["True", "False"];
    return labels.map((label) => ({ label }));
  }
  return [];
}

function limited(option: SlashCommandOption, rows: Row[]) {
  if (option.type === "boolean") return rows;
  if (option.choices?.length && option.type !== "user" && option.type !== "role" && option.type !== "attachment") return rows;
  return rows.slice(0, 3);
}

function matchingRows(option: SlashCommandOption, draft: string) {
  const query = draft.trim().toLowerCase();
  const rows = rowsFor(option).filter((row) => {
    if (!query) return true;
    return row.label.toLowerCase().includes(query) || row.detail?.toLowerCase().includes(query);
  });
  return limited(option, rows);
}

export default function SlashCommandLive({
  command,
  group,
  subcommand,
  description,
  bot,
  avatar,
  options,
  channel,
  demoLabel,
  start = "command",
}: SlashCommandProps) {
  const slash = commandPath(command, group, subcommand);
  const optionList = options ?? [];
  const label = demoLabel === undefined ? "Try it" : demoLabel;
  const { view, choose } = useSlashView();
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingFocus = useRef(false);
  const [avatarBroken, setAvatarBroken] = useState(false);
  const [focused, setFocused] = useState(false);
  const [committed, setCommitted] = useState(start !== "empty");
  const [draft, setDraft] = useState("");
  const [filled, setFilled] = useState<Filled[]>([]);
  const [activeName, setActiveName] = useState<string | null>(null);
  const [highlight, setHighlight] = useState(0);

  const active = optionList.find((option) => option.name === activeName) ?? null;
  const openOptions = optionList.filter((option) => !filled.some((item) => item.name === option.name) && option.name !== activeName);
  const optionMatches = openOptions.filter((option) => option.name.toLowerCase().includes(draft.trim().toLowerCase()));
  const chipOptions = active ? openOptions : optionMatches;
  const valueRows = active ? matchingRows(active, draft) : [];
  const listCount = !committed ? 1 : active ? valueRows.length : optionMatches.length;
  const highlighted = Math.min(highlight, Math.max(listCount - 1, 0));
  const commandQuery = draft.trim().replace(/^\//, "").toLowerCase();
  const commandVisible = !committed && commandQuery.length > 0 && slash.slice(1).toLowerCase().startsWith(commandQuery);
  const remaining = optionList.length - filled.length - (active ? 1 : 0);
  const channelName = channel?.trim().replace(/^#/, "");

  const keepFocus = () => {
    pendingFocus.current = true;
    setFocused(true);
  };

  useLayoutEffect(() => {
    if (!pendingFocus.current) return;
    const field = inputRef.current;
    if (!field) return;
    field.focus({ preventScroll: true });
    const end = field.value.length;
    field.setSelectionRange(end, end);
    pendingFocus.current = false;
  });

  const reset = () => {
    keepFocus();
    setCommitted(start !== "empty");
    setDraft("");
    setFilled([]);
    setActiveName(null);
    setHighlight(0);
  };

  const commitCommand = () => {
    keepFocus();
    setCommitted(true);
    setDraft("");
    setHighlight(0);
  };

  const pickOption = (option: SlashCommandOption) => {
    keepFocus();
    setActiveName(option.name);
    setDraft("");
    setHighlight(0);
  };

  const pickValue = (value: string) => {
    if (!active) return;
    keepFocus();
    setFilled((current) => [...current.filter((item) => item.name !== active.name), { name: active.name, value }]);
    setActiveName(null);
    setDraft("");
    setHighlight(0);
  };

  const pop = () => {
    keepFocus();
    if (active) {
      setActiveName(null);
      setDraft("");
      setHighlight(0);
      return;
    }
    if (filled.length) {
      setFilled((current) => current.slice(0, -1));
      setHighlight(0);
      return;
    }
    if (start === "empty") {
      setCommitted(false);
      setDraft("");
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((current) => {
        const index = Math.min(current, Math.max(listCount - 1, 0));
        if (event.key === "ArrowDown") return Math.min(index + 1, Math.max(listCount - 1, 0));
        return Math.max(index - 1, 0);
      });
      return;
    }
    if (event.key === "Escape") {
      if (active || draft) {
        event.preventDefault();
        setActiveName(null);
        setDraft("");
        setHighlight(0);
      }
      return;
    }
    if (event.key === "Backspace" && draft === "") {
      event.preventDefault();
      pop();
      return;
    }
    if (event.key !== "Enter" && event.key !== "Tab" && event.key !== " ") return;
    if (!committed) {
      if (commandVisible && (event.key === "Enter" || event.key === "Tab" || (event.key === " " && commandQuery === slash.slice(1).toLowerCase()))) {
        event.preventDefault();
        commitCommand();
      }
      return;
    }
    if (event.key === " " && !active) {
      const exact = optionMatches.find((option) => option.name.toLowerCase() === draft.trim().toLowerCase());
      if (exact) {
        event.preventDefault();
        pickOption(exact);
      }
      return;
    }
    if (event.key === " ") return;
    event.preventDefault();
    if (active) {
      if (valueRows.length) {
        pickValue(valueRows[highlighted].label);
        return;
      }
      if (draft.trim() && !rowsFor(active).length) pickValue(draft.trim());
      return;
    }
    if (optionMatches[highlighted]) pickOption(optionMatches[highlighted]);
  };

  const input = (
    <input
      ref={inputRef}
      className={styles.liveInput}
      style={{ width: `${Math.max(draft.length, 1)}ch` }}
      value={draft}
      aria-label={active ? active.name : slash}
      autoComplete="off"
      spellCheck={false}
      placeholder={!committed && !draft && channelName ? `Message #${channelName}` : ""}
      onChange={(event) => {
        setDraft(event.target.value);
        setHighlight(0);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        window.requestAnimationFrame(() => {
          if (inputRef.current && document.activeElement === inputRef.current) return;
          setFocused(false);
        });
      }}
      onKeyDown={onKeyDown}
    />
  );

  const resetButton = (
    <button type="button" className={styles.resetBtn} aria-label="Reset" title="Reset" onMouseDown={(event) => event.preventDefault()} onClick={reset}>
      {RESET}
    </button>
  );

  const filledTokens = filled.map((item) => (
    <span className={styles.token} key={item.name}>
      <span className={styles.tokenName}>{item.name}</span>
      <span className={styles.tokenValue}>{item.value}</span>
    </span>
  ));

  const showCommand = focused && !committed && commandVisible;
  const showValues = focused && Boolean(active) && valueRows.length > 0;
  const showOptions = focused && committed && !active && optionMatches.length > 0;

  useLayoutEffect(() => {
    const field = inputRef.current;
    const root = field?.closest(`.${styles.root}`);
    const selected = root?.querySelector<HTMLElement>(`.${styles.optionSelected}, .${styles.mChoiceOn}`);
    const scroller = selected?.closest(`.${styles.optionScroll}, .${styles.mChoiceScroll}`);
    if (!selected || !(scroller instanceof HTMLElement)) return;
    const row = selected.getBoundingClientRect();
    const box = scroller.getBoundingClientRect();
    if (row.top < box.top) scroller.scrollTop -= box.top - row.top;
    else if (row.bottom > box.bottom) scroller.scrollTop += row.bottom - box.bottom;
  }, [highlighted, activeName, showValues, showOptions]);

  const desktopList = showCommand ? (
      <div className={styles.panel}>
        <div className={styles.header}>Commands matching {draft.trim() || slash}</div>
        <button type="button" className={`${styles.commandRow} ${styles.optionSelected}`} onMouseDown={(event) => event.preventDefault()} onClick={commitCommand}>
          <SlashAvatar src={avatar} broken={avatarBroken} onError={() => setAvatarBroken(true)} />
          <div className={styles.commandText}>
            <div className={styles.commandName}>{slash}</div>
            {description ? <div className={styles.commandDesc}>{description}</div> : null}
          </div>
          <div className={styles.botName}>{bot}</div>
        </button>
      </div>
  ) : showValues ? (
    <div className={styles.optionsPanel}>
      <div className={styles.header}>Options</div>
      <div className={styles.optionScroll}>
        {valueRows.map((row, index) => (
          <button
            type="button"
            className={index === highlighted ? styles.optionSelected : styles.option}
            key={row.label}
            onMouseEnter={() => setHighlight(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => pickValue(row.label)}
          >
            <span className={styles.optionLead}>
              {row.color && row.detail ? <span className={styles.person} style={{ background: row.color }}>{row.label.slice(0, 1)}</span> : null}
              {row.color && !row.detail ? <span className={styles.roleDot} style={{ background: row.color }} /> : null}
              <span className={styles.optionName}>{row.label}</span>
            </span>
            {row.detail ? <span className={styles.optionDesc}>{row.detail}</span> : null}
          </button>
        ))}
      </div>
    </div>
  ) : showOptions ? (
    <div className={styles.optionsPanel}>
      <div className={styles.header}>Options</div>
      <div className={styles.optionScroll}>
        {optionMatches.map((option, index) => (
          <button
            type="button"
            className={index === highlighted ? styles.optionSelected : styles.option}
            key={option.name}
            onMouseEnter={() => setHighlight(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => pickOption(option)}
          >
            <span className={styles.optionName}>{option.name}</span>
            {option.description ? <span className={styles.optionDesc}>{option.description}</span> : null}
          </button>
        ))}
      </div>
    </div>
  ) : null;

  const stripName = active ? active.name : slash;
  const stripDesc = active ? active.description : description;

  return (
    <div className={styles.root} aria-label={`Try ${slash}`}>
      {label ? <span className={styles.demoLabel}>{label}</span> : null}
      <div className={styles.viewToggle} role="group" aria-label="Command demo device">
        <button type="button" className={view === "desktop" ? styles.viewToggleOn : styles.viewToggleBtn} aria-pressed={view === "desktop"} onClick={() => choose("desktop")}>
          Desktop
        </button>
        <button type="button" className={view === "mobile" ? styles.viewToggleOn : styles.viewToggleBtn} aria-pressed={view === "mobile"} onClick={() => choose("mobile")}>
          Mobile
        </button>
      </div>
      {view === "mobile" ? (
        <div className={styles.mobileFrame}>
          <div className={focused ? styles.liveList : undefined}>
          {showCommand ? (
            <button type="button" className={styles.mCommand} onMouseDown={(event) => event.preventDefault()} onClick={commitCommand}>
              <SlashAvatar src={avatar} broken={avatarBroken} onError={() => setAvatarBroken(true)} />
              <div className={styles.mCommandBody}>
                <div className={styles.mCommandTop}>
                  <span className={styles.mCommandName}>{slash}</span>
                  <span className={styles.mBot}>{bot}</span>
                </div>
                {description ? <div className={styles.mCommandDesc}>{description}</div> : null}
              </div>
            </button>
          ) : null}
          {showValues ? (
            <div className={styles.mChoices}>
              <div className={styles.mChoiceScroll}>
                {valueRows.map((row, index) => (
                  <button
                    type="button"
                    className={index === highlighted ? styles.mChoiceOn : styles.mChoice}
                    key={row.label}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => pickValue(row.label)}
                  >
                    <span className={styles.mChoiceName}>{row.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {showOptions ? (
            <div className={styles.mOptionCard}>
              {chipOptions.length ? (
                <div className={styles.mOptionBar}>
                  {chipOptions.filter((option) => option.required).map((option) => (
                    <button type="button" className={option.name === activeName ? styles.mPillOn : styles.mPill} key={option.name} onMouseDown={(event) => event.preventDefault()} onClick={() => pickOption(option)}>
                      {option.name}
                    </button>
                  ))}
                  {chipOptions.some((option) => !option.required) ? <span className={styles.mOptional}>Optional</span> : null}
                  {chipOptions.filter((option) => !option.required).map((option) => (
                    <button type="button" className={option.name === activeName ? styles.mPillOn : styles.mPill} key={option.name} onMouseDown={(event) => event.preventDefault()} onClick={() => pickOption(option)}>
                      {option.name}
                    </button>
                  ))}
                </div>
              ) : null}
              <div className={styles.mDesc}>{stripDesc}</div>
            </div>
          ) : null}
          </div>
          <div className={styles.mChat} onClick={() => { if (document.activeElement !== inputRef.current) inputRef.current?.focus(); }}>
            <div className={styles.mInput}>
              {committed ? <span className={styles.mTyped}>{slash}</span> : null}
              {filled.map((item) => (
                <span className={styles.mToken} key={item.name}>
                  <span className={styles.mLabel}>{item.name}:</span>
                  <span className={styles.mValue}>{item.value}</span>
                </span>
              ))}
              {active ? (
                <span className={styles.mToken}>
                  <span className={styles.mLabel}>{active.name}:</span>
                  <span className={styles.mValue}>{input}</span>
                </span>
              ) : (
                input
              )}
            </div>
            {resetButton}
          </div>
        </div>
      ) : (
        <>
          <div className={focused ? styles.liveList : undefined}>{desktopList}</div>
          <div className={styles.chat} onClick={() => { if (document.activeElement !== inputRef.current) inputRef.current?.focus(); }}>
            {committed ? (
              <div className={styles.commandStrip}>
                <span className={styles.stripName}>{stripName}</span>
                {stripDesc ? <span className={styles.stripDesc}>{stripDesc}</span> : null}
              </div>
            ) : null}
            <div className={styles.composer}>
              {committed && avatar ? (
                <img
                  className={styles.composerAvatar}
                  src={avatar === "placeholder" || avatarBroken ? PLACEHOLDER_SRC : avatar}
                  alt=""
                  onError={() => setAvatarBroken(true)}
                />
              ) : null}
              <div className={styles.inputLine}>
                {committed ? <span className={styles.typed}>{slash}</span> : null}
                {filledTokens}
                {active ? (
                  <span className={`${styles.token} ${styles.tokenFocused}`}>
                    <span className={styles.tokenName}>{active.name}</span>
                    <span className={styles.tokenWait}>{input}</span>
                  </span>
                ) : (
                  input
                )}
                {committed && !active && remaining > 0 ? <span className={styles.extra}>{`+${remaining} more`}</span> : null}
              </div>
              {resetButton}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
