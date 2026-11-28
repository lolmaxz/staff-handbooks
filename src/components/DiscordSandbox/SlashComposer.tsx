import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import slash from "../SlashCommand.module.css";
import type { SandboxRole, SlashChoice, SlashCommandDef, SlashOptionDef, SlashValue } from "./types";
import styles from "./DiscordSandbox.module.css";

interface Token {
  def: SlashOptionDef;
  text: string;
  choice: SlashChoice | null;
}

export interface SlashComposerProps {
  commands: SlashCommandDef[];
  botName: string;
  botAvatar: string;
  channelName: string;
  viewerId: string;
  roles: SandboxRole[];
  disabledReason?: string | null;
  now: number;
  onSendText(text: string): void;
  onCommand(name: string, values: Record<string, SlashValue>): void;
}

const PLUS = (
  <svg className={slash.plusIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1Z" />
  </svg>
);

const CLOSE = (
  <svg className={slash.closeIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.3 5.7a1 1 0 0 1 0 1.4L13.4 12l4.9 4.9a1 1 0 0 1-1.4 1.4L12 13.4l-4.9 4.9a1 1 0 0 1-1.4-1.4l4.9-4.9-4.9-4.9a1 1 0 0 1 1.4-1.4L12 10.6l4.9-4.9a1 1 0 0 1 1.4 0Z"
    />
  </svg>
);

const SEND = (
  <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
    <path fill="currentColor" d="M2.07 2.07a1 1 0 0 1 1.06-.22l18 7a1 1 0 0 1 0 1.86l-7.72 3.01-3.01 7.72a1 1 0 0 1-1.86 0l-7-18a1 1 0 0 1 .22-1.06l.31-.31Z" />
  </svg>
);

function isTouchScreen() {
  return typeof window !== "undefined" && window.matchMedia("(hover: none), (max-width: 760px)").matches;
}

function hasFixedChoices(def: SlashOptionDef) {
  return Boolean(def.choices?.length) || def.type === "boolean" || def.type === "role";
}

function TokenInput({
  value,
  onChange,
  onKeyDown,
  onFocus,
  inputRef,
  maxLength,
}: {
  value: string;
  onChange(value: string): void;
  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;
  onFocus(): void;
  inputRef(node: HTMLInputElement | null): void;
  maxLength?: number;
}) {
  return (
    <input
      ref={inputRef}
      className={styles.tokenInput}
      value={value}
      size={Math.max(1, value.length + 1)}
      maxLength={maxLength}
      spellCheck={false}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    />
  );
}

export default function SlashComposer({
  commands,
  botName,
  botAvatar,
  channelName,
  viewerId,
  roles,
  disabledReason,
  now,
  onSendText,
  onCommand,
}: SlashComposerProps) {
  const [text, setText] = useState("");
  const [cmd, setCmd] = useState<SlashCommandDef | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [tail, setTail] = useState("");
  const [highlight, setHighlight] = useState(0);
  const [warn, setWarn] = useState<Set<string>>(new Set());
  const [stampOpen, setStampOpen] = useState(false);
  const stampRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!stampOpen) return;
    const onDown = (event: MouseEvent) => {
      if (stampRef.current && !stampRef.current.contains(event.target as Node)) setStampOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [stampOpen]);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const tailRef = useRef<HTMLInputElement>(null);
  const tokenRefs = useRef(new Map<string, HTMLInputElement>());
  const pendingFocus = useRef<string | null>(null);

  const mounted = useRef(false);

  const reset = (focus = true) => {
    setCmd(null);
    setTokens([]);
    setActive(null);
    setTail("");
    setText("");
    setWarn(new Set());
    setHighlight(0);
    if (focus) pendingFocus.current = "__text";
  };

  // Switching channel or member clears the bar. No autofocus on page load (it would scroll the page)
  // or on touch screens (it would pop the keyboard).
  useEffect(() => {
    const first = !mounted.current;
    mounted.current = true;
    reset(!first && !isTouchScreen());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName, viewerId]);

  useLayoutEffect(() => {
    const target = pendingFocus.current;
    if (!target) return;
    pendingFocus.current = null;
    const node = target === "__text" ? textRef.current : target === "__tail" ? tailRef.current : tokenRefs.current.get(target);
    node?.focus({ preventScroll: true });
  });

  useLayoutEffect(() => {
    const area = textRef.current;
    if (!area) return;
    area.style.height = "0px";
    area.style.height = `${Math.min(area.scrollHeight, 160)}px`;
  }, [text, cmd]);

  const activeToken = tokens.find((token) => token.def.name === active) ?? null;

  const choicesFor = (token: Token | null): SlashChoice[] | null => {
    if (!token) return null;
    const def = token.def;
    const query = token.choice ? "" : token.text.trim().toLowerCase();
    let list: SlashChoice[] | null = null;
    if (def.autocomplete) list = def.autocomplete(viewerId, token.text);
    else if (def.choices?.length) list = def.choices;
    else if (def.type === "boolean")
      list = [
        { name: "True", value: "true" },
        { name: "False", value: "false" },
      ];
    else if (def.type === "role") list = roles.filter((role) => !role.managed).map((role) => ({ name: `@${role.name}`, value: role.id }));
    if (!list) return null;
    if (def.autocomplete || !query) return list.slice(0, 25);
    return list.filter((choice) => choice.name.toLowerCase().includes(query.replace(/^@/, ""))).slice(0, 25);
  };

  const commandMatches = useMemo(() => {
    if (cmd || !text.startsWith("/") || /\s/.test(text)) return [];
    const query = text.slice(1).toLowerCase();
    return commands.filter((command) => command.name.startsWith(query));
  }, [cmd, text, commands]);

  const remainingOptions = cmd
    ? cmd.options.filter((option) => !tokens.some((token) => token.def.name === option.name) && option.name.startsWith(tail.trim().toLowerCase()))
    : [];

  const activeChoices = choicesFor(activeToken);
  const listMode: "commands" | "choices" | "options" | null = !cmd
    ? commandMatches.length
      ? "commands"
      : null
    : activeChoices
      ? "choices"
      : !activeToken && remainingOptions.length
        ? "options"
        : null;
  const listLength = listMode === "commands" ? commandMatches.length : listMode === "choices" ? activeChoices!.length : listMode === "options" ? remainingOptions.length : 0;

  useEffect(() => {
    setHighlight(0);
  }, [listMode, active, tail]);

  const startCommand = (def: SlashCommandDef) => {
    const required = def.options.filter((option) => option.required).map((option) => ({ def: option, text: "", choice: null }));
    setCmd(def);
    setTokens(required);
    setText("");
    setTail("");
    setWarn(new Set());
    const first = required[0]?.def.name ?? null;
    setActive(first);
    pendingFocus.current = first ?? "__tail";
  };

  const addOption = (def: SlashOptionDef) => {
    setTokens((current) => [...current, { def, text: "", choice: null }]);
    setActive(def.name);
    setTail("");
    pendingFocus.current = def.name;
  };

  const updateToken = (name: string, patch: Partial<Token>) => {
    setTokens((current) => current.map((token) => (token.def.name === name ? { ...token, ...patch } : token)));
    setWarn((current) => {
      if (!current.has(name)) return current;
      const next = new Set(current);
      next.delete(name);
      return next;
    });
  };

  const focusAfter = (name: string) => {
    const index = tokens.findIndex((token) => token.def.name === name);
    const nextEmpty = tokens.slice(index + 1).find((token) => token.def.required && !token.text);
    if (nextEmpty) {
      setActive(nextEmpty.def.name);
      pendingFocus.current = nextEmpty.def.name;
    } else {
      setActive(null);
      pendingFocus.current = "__tail";
    }
  };

  const chooseChoice = (choice: SlashChoice) => {
    if (!activeToken) return;
    updateToken(activeToken.def.name, { text: choice.name, choice });
    focusAfter(activeToken.def.name);
  };

  const submitCommand = () => {
    if (!cmd) return;
    const nextWarn = new Set<string>();
    const values: Record<string, SlashValue> = {};
    for (const token of tokens) {
      const raw = token.text.trim();
      if (!raw) {
        nextWarn.add(token.def.name);
        continue;
      }
      let choice = token.choice;
      if (!choice && hasFixedChoices(token.def)) {
        const list = choicesFor({ ...token, choice: null }) ?? [];
        choice = list.find((item) => item.name.toLowerCase() === raw.toLowerCase() || item.name.toLowerCase() === `@${raw.toLowerCase()}`) ?? null;
        if (!choice) {
          nextWarn.add(token.def.name);
          continue;
        }
      }
      switch (token.def.type) {
        case "boolean":
          values[token.def.name] = String(choice?.value) === "true";
          break;
        case "integer": {
          const number = Number(choice ? choice.value : raw);
          if (!Number.isInteger(number)) nextWarn.add(token.def.name);
          else values[token.def.name] = number;
          break;
        }
        case "role":
          values[token.def.name] = String(choice?.value ?? "");
          break;
        default:
          values[token.def.name] = choice ? String(choice.value) : raw;
      }
    }
    for (const option of cmd.options) {
      if (option.required && !tokens.some((token) => token.def.name === option.name)) nextWarn.add(option.name);
    }
    if (nextWarn.size) {
      setWarn(nextWarn);
      const first = tokens.find((token) => nextWarn.has(token.def.name));
      if (first) {
        setActive(first.def.name);
        pendingFocus.current = first.def.name;
      }
      return;
    }
    onCommand(cmd.name, values);
    reset();
  };

  const moveHighlight = (delta: number) => {
    if (!listLength) return;
    setHighlight((current) => (current + delta + listLength) % listLength);
  };

  const onTokenKey = (token: Token) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveHighlight(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      reset();
      return;
    }
    if (event.key === "Tab" || event.key === "Enter") {
      const choices = choicesFor(token);
      if (choices && !token.choice && choices.length) {
        event.preventDefault();
        if (event.key === "Enter" && !hasFixedChoices(token.def) && !token.text.trim()) return;
        chooseChoice(choices[Math.min(highlight, choices.length - 1)]);
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        focusAfter(token.def.name);
        return;
      }
      event.preventDefault();
      submitCommand();
      return;
    }
    if (event.key === "Backspace" && !token.text) {
      event.preventDefault();
      const index = tokens.indexOf(token);
      if (!token.def.required) {
        setTokens((current) => current.filter((item) => item !== token));
        const previous = tokens[index - 1];
        setActive(previous?.def.name ?? null);
        pendingFocus.current = previous?.def.name ?? "__tail";
        return;
      }
      const previous = tokens[index - 1];
      if (previous) {
        setActive(previous.def.name);
        pendingFocus.current = previous.def.name;
        return;
      }
      if (tokens.every((item) => !item.text)) {
        const name = cmd?.name ?? "";
        reset();
        setText(`/${name}`);
      }
    }
  };

  const onTailKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveHighlight(event.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      reset();
      return;
    }
    if ((event.key === "Tab" || (event.key === "Enter" && tail.trim())) && remainingOptions.length) {
      event.preventDefault();
      addOption(remainingOptions[Math.min(highlight, remainingOptions.length - 1)]);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      submitCommand();
      return;
    }
    if (event.key === "Backspace" && !tail) {
      event.preventDefault();
      const last = tokens[tokens.length - 1];
      if (last) {
        setActive(last.def.name);
        pendingFocus.current = last.def.name;
      } else {
        const name = cmd?.name ?? "";
        reset();
        setText(`/${name}`);
      }
    }
  };

  const onTextKey = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (listMode === "commands") {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        moveHighlight(event.key === "ArrowDown" ? 1 : -1);
        return;
      }
      if (event.key === "Tab" || event.key === "Enter") {
        event.preventDefault();
        startCommand(commandMatches[Math.min(highlight, commandMatches.length - 1)]);
        return;
      }
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (text.startsWith("/") && !commandMatches.length && !/\s/.test(text.trim())) return;
      if (!text.trim()) return;
      onSendText(text);
      setText("");
    }
  };

  const onTextChange = (value: string) => {
    const exact = /^\/([\w-]+)\s$/.exec(value);
    if (exact) {
      const def = commands.find((command) => command.name === exact[1].toLowerCase());
      if (def) {
        startCommand(def);
        return;
      }
    }
    setText(value);
  };

  const insertTimestamp = (offsetMinutes: number) => {
    const unix = Math.floor((now + offsetMinutes * 60_000) / 1000);
    setText((current) => `${current}${current && !current.endsWith(" ") ? " " : ""}<t:${unix}:F> (<t:${unix}:R>)`);
    setStampOpen(false);
    pendingFocus.current = "__text";
  };

  if (disabledReason) {
    return (
      <div className={styles.composerWrap}>
        <div className={`${slash.chat} ${styles.composerDisabled}`}>
          <div className={slash.composer}>
            <span className={styles.lockIcon} aria-hidden="true">
              🔒
            </span>
            <span className={slash.channelPrompt}>{disabledReason}</span>
          </div>
        </div>
      </div>
    );
  }

  const stripName = activeToken ? activeToken.def.name : cmd?.name ? `/${cmd.name}` : "";
  const stripDesc = activeToken ? activeToken.def.description : cmd?.description;

  return (
    <div className={styles.composerWrap}>
      {listMode ? (
        <div className={`${listMode === "commands" ? slash.panel : slash.optionsPanel} ${styles.slashList}`}>
          <div className={slash.header}>{listMode === "commands" ? <>Commands matching {text}</> : listMode === "choices" ? activeToken?.def.name : "Options"}</div>
          <div className={slash.optionScroll}>
            {listMode === "commands"
              ? commandMatches.map((command, index) => (
                  <div
                    key={command.name}
                    className={`${slash.commandRow} ${index === highlight ? "" : styles.commandRowIdle}`}
                    onMouseEnter={() => setHighlight(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => startCommand(command)}
                    role="option"
                    aria-selected={index === highlight}
                  >
                    <img className={slash.avatar} src={botAvatar} alt="" />
                    <div className={slash.commandText}>
                      <div className={slash.commandName}>/{command.name}</div>
                      <div className={slash.commandDesc}>{command.description}</div>
                    </div>
                    <div className={slash.botName}>{botName}</div>
                  </div>
                ))
              : null}
            {listMode === "choices"
              ? activeChoices!.length
                ? activeChoices!.map((choice, index) => (
                    <div
                      key={`${choice.value}-${index}`}
                      className={`${index === highlight ? slash.optionSelected : slash.option} ${styles.clickable}`}
                      onMouseEnter={() => setHighlight(index)}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => chooseChoice(choice)}
                    >
                      <span className={slash.optionName}>{choice.name}</span>
                    </div>
                  ))
                : (
                    <div className={slash.option}>
                      <span className={slash.optionDesc}>No matching choices</span>
                    </div>
                  )
              : null}
            {listMode === "options"
              ? remainingOptions.map((option, index) => (
                  <div
                    key={option.name}
                    className={`${index === highlight ? slash.optionSelected : slash.option} ${styles.clickable}`}
                    onMouseEnter={() => setHighlight(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => addOption(option)}
                  >
                    <span className={slash.optionName}>{option.name}</span>
                    <span className={slash.optionDesc}>{option.description}</span>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}

      <div className={slash.chat}>
        {cmd ? (
          <div className={slash.commandStrip}>
            <span className={slash.stripName}>{stripName}</span>
            {stripDesc ? <span className={slash.stripDesc}>{stripDesc}</span> : null}
            <button type="button" className={`${slash.close} ${styles.iconButton}`} onClick={() => reset()} aria-label="Cancel command">
              {CLOSE}
            </button>
          </div>
        ) : null}
        <div className={`${slash.composer} ${styles.composerRow}`}>
          {cmd ? (
            <img className={slash.composerAvatar} src={botAvatar} alt="" />
          ) : (
            <span className={slash.plus} aria-hidden="true">
              {PLUS}
            </span>
          )}
          {cmd ? (
            <div className={`${slash.inputLine} ${styles.commandLine}`} onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                event.preventDefault();
                setActive(null);
                pendingFocus.current = "__tail";
                tailRef.current?.focus();
              }
            }}>
              <span className={slash.typed}>/{cmd.name}</span>
              {tokens.map((token) => {
                const isActive = token.def.name === active;
                const warning = warn.has(token.def.name);
                return (
                  <span
                    key={token.def.name}
                    className={`${slash.token} ${warning ? slash.tokenWarning : isActive ? slash.tokenFocused : ""}`}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      setActive(token.def.name);
                      tokenRefs.current.get(token.def.name)?.focus();
                    }}
                  >
                    <span className={slash.tokenName}>{token.def.name}</span>
                    <span className={slash.tokenValue}>
                      <TokenInput
                        value={token.text}
                        maxLength={token.def.maxLength}
                        inputRef={(node) => {
                          if (node) tokenRefs.current.set(token.def.name, node);
                          else tokenRefs.current.delete(token.def.name);
                        }}
                        onFocus={() => setActive(token.def.name)}
                        onChange={(value) => updateToken(token.def.name, { text: value, choice: null })}
                        onKeyDown={onTokenKey(token)}
                      />
                    </span>
                  </span>
                );
              })}
              <input
                ref={tailRef}
                className={styles.tailInput}
                value={tail}
                spellCheck={false}
                onFocus={() => setActive(null)}
                onChange={(event) => setTail(event.target.value)}
                onKeyDown={onTailKey}
                aria-label="Add an option"
              />
              {remainingOptions.length && !active ? <span className={slash.extra}>+{cmd.options.length - tokens.length} optional</span> : null}
            </div>
          ) : (
            <textarea
              ref={textRef}
              className={styles.textInput}
              rows={1}
              value={text}
              placeholder={`Message #${channelName}`}
              onChange={(event) => onTextChange(event.target.value)}
              onKeyDown={onTextKey}
            />
          )}
          {!cmd ? (
            <div className={styles.stampWrap} ref={stampRef}>
              <button type="button" className={styles.iconButton} title="Insert a Discord timestamp" onClick={() => setStampOpen((open) => !open)}>
                🕒
              </button>
              {stampOpen ? (
                <div className={styles.stampMenu}>
                  <div className={styles.stampTitle}>Insert timestamp</div>
                  {[
                    { label: "In 1 hour", minutes: 60 },
                    { label: "In 3 hours", minutes: 180 },
                    { label: "In 6 hours", minutes: 360 },
                    { label: "Tomorrow (+24h)", minutes: 1440 },
                    { label: "Too far (+31h)", minutes: 1860 },
                    { label: "In the past (−1h)", minutes: -60 },
                  ].map((item) => (
                    <button key={item.label} type="button" className={styles.stampItem} onClick={() => insertTimestamp(item.minutes)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          <button
            type="button"
            className={styles.sendButton}
            aria-label="Send"
            onClick={() => {
              if (cmd) submitCommand();
              else if (text.trim() && !text.startsWith("/")) {
                onSendText(text);
                setText("");
              }
            }}
          >
            {SEND}
          </button>
        </div>
      </div>
    </div>
  );
}
