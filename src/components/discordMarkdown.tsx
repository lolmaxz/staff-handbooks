import React from "react";
import styles from "./DiscordMessage.module.css";

function Spoiler({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <span
      className={open ? styles.spoilerOpen : styles.spoiler}
      role="button"
      tabIndex={0}
      onClick={() => setOpen(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setOpen(true);
        }
      }}
    >
      {children}
    </span>
  );
}

/** Server roles that are always shown in their Discord color, so examples don't have to repeat it. */
const KNOWN_ROLE_COLORS: Record<string, string> = {
  "Event Participant Group #1": "#1abc9c",
  "Event Participant Group #2": "#3498db",
  "General Event Ping": "#9b59b6",
};

function roleMentionStyle(hex: string): React.CSSProperties {
  const value = parseInt(hex.slice(1), 16);
  const rgb = `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
  return { color: hex, background: `rgba(${rgb}, 0.1)` };
}

function isWordChar(char: string | undefined) {
  return !!char && /[\p{L}\p{N}]/u.test(char);
}

function findClosing(text: string, from: number, marker: string) {
  for (let index = from; index < text.length; index += 1) {
    if (text[index] !== marker) continue;
    if (text[index + 1] === marker) {
      index += 1;
      continue;
    }
    // A closing underscore must not be followed by a letter (snake_case stays literal).
    if (marker === "_" && isWordChar(text[index + 1])) continue;
    return index;
  }
  return -1;
}

function safeHref(url: string) {
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") return url;
  } catch {
    return undefined;
  }
  return undefined;
}

type KeyCounter = { n: number };

/**
 * Discord timestamp. The text depends on the viewer's clock and time zone, so it is only filled in
 * once the page runs in the browser. This keeps the server-built page and the browser in sync.
 */
function DiscordTime({ unix, style }: { unix: number; style: TimestampStyle }) {
  const [now, setNow] = React.useState<number | null>(null);
  React.useEffect(() => {
    setNow(Date.now());
    if (style !== "R") return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, [style]);
  return (
    <span className={styles.discordTime} title={now === null ? undefined : formatDiscordTime(unix, "F")}>
      {now === null ? " " : formatDiscordTime(unix, style)}
    </span>
  );
}
type TimestampStyle = "t" | "T" | "d" | "D" | "f" | "F" | "R";

function formatDiscordTime(unix: number, style: TimestampStyle) {
  const date = new Date(unix * 1000);
  if (style === "R") {
    const diffSec = Math.round((date.getTime() - Date.now()) / 1000);
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

function parseInline(text: string, keys: KeyCounter): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let index = 0;

  const pushPlain = (value: string) => {
    if (value) nodes.push(value);
  };

  while (index < text.length) {
    const rest = text.slice(index);

    if (text[index] === "\\" && index + 1 < text.length) {
      pushPlain(text[index + 1]);
      index += 2;
      continue;
    }

    if (text[index] === "`") {
      const end = text.indexOf("`", index + 1);
      if (end > index) {
        nodes.push(
          <code key={keys.n++} className={styles.code}>
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
        nodes.push(<Spoiler key={keys.n++}>{parseInline(text.slice(index + 2, end), keys)}</Spoiler>);
        index = end + 2;
        continue;
      }
    }

    const link = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]+)\)/.exec(rest);
    if (link && safeHref(link[2])) {
      nodes.push(
        <a key={keys.n++} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>,
      );
      index += link[0].length;
      continue;
    }

    const stamp = /^<t:(-?\d{1,13})(?::([tTdDfFR]))?>/.exec(rest);
    if (stamp) {
      const unix = Number(stamp[1]);
      const style = (stamp[2] ?? "f") as TimestampStyle;
      nodes.push(
        <DiscordTime key={keys.n++} unix={unix} style={style} />,
      );
      index += stamp[0].length;
      continue;
    }

    const emoji = /^<(a?):([A-Za-z0-9_~]+):(\d+)>/.exec(rest);
    if (emoji) {
      nodes.push(
        <img
          key={keys.n++}
          className={styles.customEmoji}
          src={`https://cdn.discordapp.com/emojis/${emoji[3]}.${emoji[1] ? "gif" : "png"}?size=48`}
          alt={`:${emoji[2]}:`}
          title={`:${emoji[2]}:`}
        />,
      );
      index += emoji[0].length;
      continue;
    }

    const role = /^<@&([^>\n]+)>/.exec(rest);
    if (role) {
      // `<@&Role Name|#1abc9c>` colors the mention like Discord does for colored roles.
      const [, rawName, rawColor] = /^(.*?)(?:\|(#[0-9a-fA-F]{6}))?$/.exec(role[1]) ?? [];
      const name = (rawName ?? role[1]).trim();
      const color = rawColor ?? KNOWN_ROLE_COLORS[name];
      nodes.push(
        <span key={keys.n++} className={styles.mention} style={color ? roleMentionStyle(color) : undefined}>
          @{name}
        </span>,
      );
      index += role[0].length;
      continue;
    }

    const channel = /^<#([^>\n]+)>/.exec(rest);
    if (channel) {
      nodes.push(
        <span key={keys.n++} className={styles.mention}>
          #{channel[1]}
        </span>,
      );
      index += channel[0].length;
      continue;
    }

    const user = /^<@([^&>\n]+)>/.exec(rest);
    if (user) {
      nodes.push(
        <span key={keys.n++} className={styles.mention}>
          @{user[1]}
        </span>,
      );
      index += user[0].length;
      continue;
    }

    const specialMention = /^@(everyone|here)\b/.exec(rest);
    if (specialMention) {
      nodes.push(
        <span key={keys.n++} className={styles.mention}>
          @{specialMention[1]}
        </span>,
      );
      index += specialMention[0].length;
      continue;
    }

    if (rest.startsWith("***")) {
      const end = text.indexOf("***", index + 3);
      if (end !== -1) {
        nodes.push(
          <strong key={keys.n++}>
            <em>{parseInline(text.slice(index + 3, end), keys)}</em>
          </strong>,
        );
        index = end + 3;
        continue;
      }
    }

    if (rest.startsWith("**")) {
      const end = text.indexOf("**", index + 2);
      if (end !== -1) {
        nodes.push(<strong key={keys.n++}>{parseInline(text.slice(index + 2, end), keys)}</strong>);
        index = end + 2;
        continue;
      }
    }

    if (rest.startsWith("__")) {
      const end = text.indexOf("__", index + 2);
      if (end !== -1) {
        nodes.push(<u key={keys.n++}>{parseInline(text.slice(index + 2, end), keys)}</u>);
        index = end + 2;
        continue;
      }
    }

    if (rest.startsWith("~~")) {
      const end = text.indexOf("~~", index + 2);
      if (end !== -1) {
        nodes.push(<s key={keys.n++}>{parseInline(text.slice(index + 2, end), keys)}</s>);
        index = end + 2;
        continue;
      }
    }

    if ((text[index] === "*" || text[index] === "_") && !(text[index] === "_" && isWordChar(text[index - 1]))) {
      const end = findClosing(text, index + 1, text[index]);
      if (end !== -1) {
        nodes.push(<em key={keys.n++}>{parseInline(text.slice(index + 1, end), keys)}</em>);
        index = end + 1;
        continue;
      }
    }

    let next = index + 1;
    while (next < text.length && !"*_~|[<@\\`".includes(text[next])) next += 1;
    if (next === index) next += 1;
    pushPlain(text.slice(index, next));
    index = next;
  }

  return nodes;
}

export function parseDiscordMarkdown(input: string): React.ReactNode {
  if (!input) return null;
  const keys: KeyCounter = { n: 0 };
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
      if (index < lines.length) index += 1;
      nodes.push(
        <pre key={keys.n++} className={styles.pre}>
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
          {quoted.map((quotedLine, quotedIndex) => (
            <div key={quotedIndex} className={styles.line}>
              {parseInline(quotedLine, keys)}
            </div>
          ))}
        </div>,
      );
      continue;
    }

    const subtext = /^-#\s+(.*)$/.exec(line);
    if (subtext) {
      nodes.push(
        <div key={keys.n++} className={styles.subtext}>
          {parseInline(subtext[1], keys)}
        </div>,
      );
      index += 1;
      continue;
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const className = level === 1 ? styles.h1 : level === 2 ? styles.h2 : styles.h3;
      nodes.push(
        <div key={keys.n++} className={className}>
          {parseInline(heading[2], keys)}
        </div>,
      );
      index += 1;
      // Like Discord, a heading swallows one blank line right after it.
      if (index < lines.length && lines[index].trim() === "") index += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[][] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
        const item = [lines[index].replace(/^[-*]\s+/, "")];
        index += 1;
        // Indented lines right after a bullet continue that bullet (like Discord).
        while (index < lines.length && /^\s{2,}\S/.test(lines[index]) && !/^\s*[-*]\s+/.test(lines[index])) {
          item.push(lines[index].trim());
          index += 1;
        }
        items.push(item);
      }
      nodes.push(
        <div key={keys.n++} className={styles.list}>
          {items.map((item, itemIndex) => (
            <div key={itemIndex} className={styles.listItem}>
              <span>•</span>
              <span>
                {item.map((part, partIndex) => (
                  <React.Fragment key={partIndex}>
                    {partIndex > 0 ? <br /> : null}
                    {parseInline(part, keys)}
                  </React.Fragment>
                ))}
              </span>
            </div>
          ))}
        </div>,
      );
      continue;
    }

    nodes.push(
      <div key={keys.n++} className={styles.line}>
        {line ? parseInline(line, keys) : null}
      </div>,
    );
    index += 1;
  }

  return nodes;
}
