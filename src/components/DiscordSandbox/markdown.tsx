import React, { createContext, useContext, useState } from "react";
import styles from "./DiscordSandbox.module.css";

export interface MarkdownResolver {
  user(id: string): { name: string; color?: string } | null;
  role(id: string): { name: string; color?: string } | null;
  channel(id: string): string | null;
  now: number;
  onUserClick?(id: string): void;
}

export const MarkdownContext = createContext<MarkdownResolver | null>(null);

type TimestampStyle = "t" | "T" | "d" | "D" | "f" | "F" | "R";

export function formatDiscordTimestamp(unix: number, style: TimestampStyle, now: number) {
  const date = new Date(unix * 1000);
  if (style === "R") {
    const diffSec = Math.round((date.getTime() - now) / 1000);
    const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
      ["year", 31_536_000],
      ["month", 2_592_000],
      ["day", 86_400],
      ["hour", 3_600],
      ["minute", 60],
      ["second", 1],
    ];
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    for (const [unit, seconds] of units) {
      if (Math.abs(diffSec) >= seconds || unit === "second") return rtf.format(Math.round(diffSec / seconds), unit);
    }
  }
  const options: Record<Exclude<TimestampStyle, "R">, Intl.DateTimeFormatOptions> = {
    t: { hour: "numeric", minute: "2-digit" },
    T: { hour: "numeric", minute: "2-digit", second: "2-digit" },
    d: { month: "2-digit", day: "2-digit", year: "numeric" },
    D: { month: "long", day: "numeric", year: "numeric" },
    f: { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" },
    F: { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" },
  };
  return new Intl.DateTimeFormat("en-US", options[style as Exclude<TimestampStyle, "R">]).format(date);
}

function Spoiler({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className={open ? styles.spoilerOpen : styles.spoiler} role="button" tabIndex={0} onClick={() => setOpen(true)}>
      {children}
    </span>
  );
}

export function CustomEmoji({ name, id, animated }: { name: string; id: string; animated?: boolean }) {
  const [broken, setBroken] = useState(false);
  if (broken) return <span className={styles.emojiFallback}>:{name}:</span>;
  return (
    <img
      className={styles.customEmoji}
      src={`https://cdn.discordapp.com/emojis/${id}.${animated ? "gif" : "png"}?size=48`}
      alt={`:${name}:`}
      title={`:${name}:`}
      onError={() => setBroken(true)}
    />
  );
}

/** Renders a button/select emoji: unicode text or `<:name:id>` markup. */
export function EmojiText({ value }: { value: string }) {
  const custom = /^<(a?):([\w~]+):(\d+)>$/.exec(value.trim());
  if (custom) return <CustomEmoji animated={custom[1] === "a"} name={custom[2]} id={custom[3]} />;
  return <>{value}</>;
}

function isWordChar(char: string | undefined) {
  return !!char && /[\p{L}\p{N}]/u.test(char);
}

function safeHref(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") return url;
  } catch {
    return undefined;
  }
  return undefined;
}

type Keys = { n: number };

function parseInline(text: string, keys: Keys, ctx: MarkdownResolver | null): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let index = 0;
  const push = (value: string) => {
    if (value) nodes.push(value);
  };

  while (index < text.length) {
    const rest = text.slice(index);
    const char = text[index];

    if (char === "\\" && index + 1 < text.length && /[*_~`|<>#\-\\[\]]/.test(text[index + 1])) {
      push(text[index + 1]);
      index += 2;
      continue;
    }

    if (char === "`") {
      const end = text.indexOf("`", index + 1);
      if (end > index) {
        nodes.push(
          <code key={keys.n++} className={styles.inlineCode}>
            {text.slice(index + 1, end)}
          </code>,
        );
        index = end + 1;
        continue;
      }
    }

    if (rest.startsWith("||")) {
      const end = text.indexOf("||", index + 2);
      if (end !== -1) {
        nodes.push(<Spoiler key={keys.n++}>{parseInline(text.slice(index + 2, end), keys, ctx)}</Spoiler>);
        index = end + 2;
        continue;
      }
    }

    if (char === "[") {
      const link = /^\[([^\]]+)\]\(<?(https?:\/\/[^\s)>]+)>?\)/.exec(rest);
      if (link && safeHref(link[2])) {
        nodes.push(
          <a key={keys.n++} className={styles.link} href={link[2]} target="_blank" rel="noopener noreferrer">
            {parseInline(link[1], keys, ctx)}
          </a>,
        );
        index += link[0].length;
        continue;
      }
    }

    if (char === "<") {
      const stamp = /^<t:(-?\d{1,13})(?::([tTdDfFR]))?>/.exec(rest);
      if (stamp) {
        const unix = Number(stamp[1]);
        const style = (stamp[2] ?? "f") as TimestampStyle;
        const now = ctx?.now ?? Date.now();
        nodes.push(
          <span key={keys.n++} className={styles.timestamp} title={formatDiscordTimestamp(unix, "F", now)}>
            {formatDiscordTimestamp(unix, style, now)}
          </span>,
        );
        index += stamp[0].length;
        continue;
      }

      const emoji = /^<(a?):([\w~]+):(\d+)>/.exec(rest);
      if (emoji) {
        nodes.push(<CustomEmoji key={keys.n++} animated={emoji[1] === "a"} name={emoji[2]} id={emoji[3]} />);
        index += emoji[0].length;
        continue;
      }

      const role = /^<@&([^>\s]+)>/.exec(rest);
      if (role) {
        const resolved = ctx?.role(role[1]);
        const color = resolved?.color;
        nodes.push(
          <span
            key={keys.n++}
            className={styles.mention}
            style={color ? ({ ["--mention-color" as string]: color } as React.CSSProperties) : undefined}
            data-role={color ? "true" : undefined}
          >
            @{resolved?.name ?? "deleted-role"}
          </span>,
        );
        index += role[0].length;
        continue;
      }

      const channel = /^<#([^>\s]+)>/.exec(rest);
      if (channel) {
        nodes.push(
          <span key={keys.n++} className={styles.mention}>
            #{ctx?.channel(channel[1]) ?? channel[1]}
          </span>,
        );
        index += channel[0].length;
        continue;
      }

      const user = /^<@!?([^&>\s]+)>/.exec(rest);
      if (user) {
        const resolved = ctx?.user(user[1]);
        const id = user[1];
        nodes.push(
          <span
            key={keys.n++}
            className={`${styles.mention} ${styles.mentionClickable}`}
            role="button"
            tabIndex={0}
            onClick={() => ctx?.onUserClick?.(id)}
          >
            @{resolved?.name ?? "unknown-user"}
          </span>,
        );
        index += user[0].length;
        continue;
      }

      const bareLink = /^<(https?:\/\/[^\s>]+)>/.exec(rest);
      if (bareLink) {
        nodes.push(
          <a key={keys.n++} className={styles.link} href={bareLink[1]} target="_blank" rel="noopener noreferrer">
            {bareLink[1]}
          </a>,
        );
        index += bareLink[0].length;
        continue;
      }
    }

    if (char === "h") {
      const url = /^https?:\/\/[^\s<>)]+/.exec(rest);
      if (url) {
        nodes.push(
          <a key={keys.n++} className={styles.link} href={url[0]} target="_blank" rel="noopener noreferrer">
            {url[0]}
          </a>,
        );
        index += url[0].length;
        continue;
      }
    }

    const special = /^@(everyone|here)\b/.exec(rest);
    if (special) {
      nodes.push(
        <span key={keys.n++} className={styles.mention}>
          @{special[1]}
        </span>,
      );
      index += special[0].length;
      continue;
    }

    if (rest.startsWith("***")) {
      const end = text.indexOf("***", index + 3);
      if (end !== -1) {
        nodes.push(
          <strong key={keys.n++}>
            <em>{parseInline(text.slice(index + 3, end), keys, ctx)}</em>
          </strong>,
        );
        index = end + 3;
        continue;
      }
    }

    if (rest.startsWith("**")) {
      const end = text.indexOf("**", index + 2);
      if (end !== -1) {
        nodes.push(<strong key={keys.n++}>{parseInline(text.slice(index + 2, end), keys, ctx)}</strong>);
        index = end + 2;
        continue;
      }
    }

    if (rest.startsWith("__")) {
      const end = text.indexOf("__", index + 2);
      if (end !== -1) {
        nodes.push(<u key={keys.n++}>{parseInline(text.slice(index + 2, end), keys, ctx)}</u>);
        index = end + 2;
        continue;
      }
    }

    if (rest.startsWith("~~")) {
      const end = text.indexOf("~~", index + 2);
      if (end !== -1) {
        nodes.push(<s key={keys.n++}>{parseInline(text.slice(index + 2, end), keys, ctx)}</s>);
        index = end + 2;
        continue;
      }
    }

    if ((char === "*" || char === "_") && !(char === "_" && isWordChar(text[index - 1])) && text[index + 1] !== " ") {
      let end = -1;
      for (let cursor = index + 1; cursor < text.length; cursor += 1) {
        if (text[cursor] !== char) continue;
        if (text[cursor + 1] === char) {
          cursor += 1;
          continue;
        }
        if (char === "_" && isWordChar(text[cursor + 1])) continue;
        end = cursor;
        break;
      }
      if (end > index + 1) {
        nodes.push(<em key={keys.n++}>{parseInline(text.slice(index + 1, end), keys, ctx)}</em>);
        index = end + 1;
        continue;
      }
    }

    let next = index + 1;
    while (next < text.length && !"*_~|[<@\\`h".includes(text[next])) next += 1;
    push(text.slice(index, next));
    index = next;
  }

  return nodes;
}

export function DiscordMarkdown({ text }: { text: string }) {
  const ctx = useContext(MarkdownContext);
  return <>{renderMarkdown(text, ctx)}</>;
}

export function renderMarkdown(input: string, ctx: MarkdownResolver | null): React.ReactNode {
  if (!input) return null;
  const keys: Keys = { n: 0 };
  const lines = input.replace(/\r\n/g, "\n").split("\n");
  const nodes: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("```")) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      nodes.push(
        <pre key={keys.n++} className={styles.codeBlock}>
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (line.startsWith("> ") || line === ">") {
      const quoted: string[] = [];
      while (index < lines.length && (lines[index].startsWith("> ") || lines[index] === ">")) {
        quoted.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }
      nodes.push(
        <div key={keys.n++} className={styles.quote}>
          {renderMarkdown(quoted.join("\n"), ctx)}
        </div>,
      );
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      nodes.push(
        <div key={keys.n++} className={level === 1 ? styles.h1 : level === 2 ? styles.h2 : styles.h3}>
          {parseInline(heading[2], keys, ctx)}
        </div>,
      );
      index += 1;
      continue;
    }

    const subtext = /^-#\s+(.*)$/.exec(line);
    if (subtext) {
      nodes.push(
        <div key={keys.n++} className={styles.subtext}>
          {parseInline(subtext[1], keys, ctx)}
        </div>,
      );
      index += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: Array<{ depth: number; text: string }> = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        const raw = lines[index];
        const indent = raw.length - raw.trimStart().length;
        items.push({ depth: Math.min(2, Math.floor(indent / 2)), text: raw.trimStart().replace(/^[-*]\s+/, "") });
        index += 1;
      }
      nodes.push(
        <div key={keys.n++} className={styles.list}>
          {items.map((item, itemIndex) => (
            <div key={itemIndex} className={styles.listItem} style={{ paddingLeft: `${item.depth * 18}px` }}>
              <span className={styles.bullet}>{item.depth > 0 ? "◦" : "•"}</span>
              <span>{parseInline(item.text, keys, ctx)}</span>
            </div>
          ))}
        </div>,
      );
      continue;
    }

    const ordered = /^(\d+)\.\s+(.*)$/.exec(line);
    if (ordered) {
      const items: Array<{ n: string; text: string }> = [];
      while (index < lines.length && /^(\d+)\.\s+/.test(lines[index])) {
        const match = /^(\d+)\.\s+(.*)$/.exec(lines[index])!;
        items.push({ n: match[1], text: match[2] });
        index += 1;
      }
      nodes.push(
        <div key={keys.n++} className={styles.list}>
          {items.map((item, itemIndex) => (
            <div key={itemIndex} className={styles.listItem}>
              <span className={styles.bullet}>{item.n}.</span>
              <span>{parseInline(item.text, keys, ctx)}</span>
            </div>
          ))}
        </div>,
      );
      continue;
    }

    nodes.push(
      <div key={keys.n++} className={styles.line}>
        {line ? parseInline(line, keys, ctx) : null}
      </div>,
    );
    index += 1;
  }

  return nodes;
}
