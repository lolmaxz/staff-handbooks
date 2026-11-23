import clsx from "clsx";
import React from "react";
import { parseDiscordMarkdown } from "./discordMarkdown";
import styles from "./DiscordMessage.module.css";

const BLURPLE = "#5865f2";

const LINK_ICON = (
  <svg className={styles.linkIcon} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M15 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V4.41l-4.3 4.3a1 1 0 1 1-1.4-1.42L19.58 3H16a1 1 0 0 1-1-1Z"
    />
    <path
      fill="currentColor"
      d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z"
    />
  </svg>
);

const CHEVRON = (
  <svg className={styles.chevron} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z" />
  </svg>
);

export type DiscordRowButtonType = "primary" | "secondary" | "success" | "danger" | "link" | "error";

export interface DiscordMessageProps {
  /** Display name shown above the embed. */
  username: string;
  /** Profile picture shown to the left of the message. */
  avatar?: string;
  /** Time shown next to the display name. Pass the exact text to show. */
  timestamp?: string;
  /** Shows Discord's APP badge beside the display name. */
  app?: boolean;
  /** Optional channel name shown in a Discord-style header bar above the message, e.g. "🪄｜events-attendees". */
  channel?: string;
  children?: React.ReactNode;
}

export interface DiscordEmbedProps {
  /** Left accent. Defaults to Discord blurple. */
  color?: string;
  /** Set false to draw the embed with no left accent. */
  accent?: boolean;
  authorName?: string;
  authorUrl?: string;
  authorIcon?: string;
  title?: string;
  titleUrl?: string;
  /** Discord markdown: bold, italic, underline, strike, code, quotes, spoilers, links, and mentions. */
  description?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

export interface DiscordFieldProps {
  name: string;
  /** Markdown shown under the field name. Line breaks stay on their own lines. */
  value?: string;
  /** Places this field in a half column. Two inline fields sit on one row. */
  inline?: boolean;
}

export interface DiscordRowButtonProps {
  type?: DiscordRowButtonType;
  emoji?: string;
  href?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface DiscordSelectOption {
  label: string;
  emoji?: string;
  description?: string;
}

export interface DiscordSelectProps {
  placeholder?: string;
  disabled?: boolean;
  /** Options shown when the menu is clicked. Display only: picking one does nothing. */
  options?: DiscordSelectOption[];
}

function safeHref(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") return url;
  } catch {
    return undefined;
  }
  return undefined;
}

function descriptionFromChildren(children: React.ReactNode) {
  const text = React.Children.toArray(children)
    .filter((child) => typeof child === "string" || typeof child === "number")
    .join("");
  return text.trim() ? text : undefined;
}

export function DiscordField({ name, value = "", inline = false }: DiscordFieldProps) {
  return (
    <div className={inline ? styles.fieldInline : styles.fieldBlock}>
      <div className={styles.fieldName}>{name}</div>
      {value ? <div className={styles.fieldValue}>{parseDiscordMarkdown(value)}</div> : null}
    </div>
  );
}

export function DiscordEmbed({
  color,
  accent = true,
  authorName,
  authorUrl,
  authorIcon,
  title,
  titleUrl,
  description,
  thumbnail,
  thumbnailAlt = "",
  image,
  imageAlt = "",
  children,
}: DiscordEmbedProps) {
  const childList = React.Children.toArray(children);
  const fields = childList.filter((child) => React.isValidElement(child) && child.type === DiscordField);
  const rows = childList.filter((child) => React.isValidElement(child) && child.type === DiscordActionRow).slice(0, 5);
  const body = description ?? descriptionFromChildren(children);
  const showAccent = accent && color !== "none";
  const accentColor = !color || color === "none" ? BLURPLE : color;
  const authorHref = safeHref(authorUrl);
  const titleHref = safeHref(titleUrl);
  const hasText = Boolean(authorName || authorIcon || title || body || fields.length);

  const author = authorName ? (
    authorHref ? (
      <a href={authorHref} target="_blank" rel="noopener noreferrer">
        {authorName}
      </a>
    ) : (
      <span>{authorName}</span>
    )
  ) : null;

  const heading = title ? (
    titleHref ? (
      <a href={titleHref} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    ) : (
      title
    )
  ) : null;

  return (
    <div
      className={clsx(styles.embed, !showAccent && styles.embedPlain)}
      style={showAccent ? ({ ["--embed-accent" as string]: accentColor } as React.CSSProperties) : undefined}
    >
      <div className={styles.embedPad}>
        {(hasText || thumbnail) && (
          <div className={styles.embedMain}>
            {hasText && (
              <div className={styles.embedText}>
                {(author || authorIcon) && (
                  <div className={styles.embedAuthor}>
                    {authorIcon ? <img className={styles.embedAuthorIcon} src={authorIcon} alt="" /> : null}
                    {author}
                  </div>
                )}
                {heading ? <div className={styles.embedTitle}>{heading}</div> : null}
                {body ? <div>{parseDiscordMarkdown(body)}</div> : null}
                {fields.length > 0 ? <div className={styles.fields}>{fields}</div> : null}
              </div>
            )}
            {thumbnail ? <img className={styles.thumbnail} src={thumbnail} alt={thumbnailAlt} /> : null}
          </div>
        )}
        {image ? (
          <img className={hasText || thumbnail ? styles.embedImage : styles.embedImageOnly} src={image} alt={imageAlt} />
        ) : null}
        {rows.length > 0 ? <div className={styles.embedComponents}>{rows}</div> : null}
      </div>
    </div>
  );
}

export function DiscordRowButton({ type = "primary", emoji, href, disabled = false, children }: DiscordRowButtonProps) {
  const resolved = type === "error" ? "danger" : type;
  const className = clsx(styles.btn, styles[resolved], disabled && styles.disabled);
  const content = (
    <>
      {emoji ? <span className={styles.btnEmoji}>{emoji}</span> : null}
      {children ? <span>{children}</span> : null}
      {resolved === "link" ? LINK_ICON : null}
    </>
  );
  const link = resolved === "link" ? safeHref(href) : undefined;

  if (link) {
    return (
      <a className={className} href={link} target="_blank" rel="noopener noreferrer" aria-disabled={disabled}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} disabled={disabled}>
      {content}
    </button>
  );
}

export function DiscordSelect({ placeholder = "Make a selection", disabled = false, options }: DiscordSelectProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const hasOptions = Boolean(options?.length) && !disabled;

  React.useEffect(() => {
    if (!open) return undefined;
    const close = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!hasOptions) {
    return (
      <div className={clsx(styles.select, disabled && styles.disabled)} aria-disabled={disabled}>
        <span className={styles.placeholder}>{placeholder}</span>
        {CHEVRON}
      </div>
    );
  }

  return (
    <div className={styles.selectRoot} ref={rootRef}>
      <button
        type="button"
        className={clsx(styles.select, styles.selectClickable, open && styles.selectOpen)}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.placeholder}>{placeholder}</span>
        {CHEVRON}
      </button>
      {open ? (
        <div className={styles.selectMenu} role="listbox">
          {options!.map((option) => (
            <div key={option.label} className={styles.selectOption} role="option" aria-selected={false}>
              {option.emoji ? <span className={styles.selectEmoji}>{option.emoji}</span> : null}
              <span className={styles.selectText}>
                <span className={styles.selectLabel}>{option.label}</span>
                {option.description ? <span className={styles.selectDesc}>{option.description}</span> : null}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function DiscordActionRow({ children }: { children?: React.ReactNode }) {
  const items = React.Children.toArray(children);
  const select = items.find((child) => React.isValidElement(child) && child.type === DiscordSelect);
  if (select) return <div className={styles.actionRow}>{select}</div>;

  const buttons = items
    .filter((child) => React.isValidElement(child) && child.type === DiscordRowButton)
    .slice(0, 5);
  if (!buttons.length) return null;
  return <div className={styles.actionRow}>{buttons}</div>;
}

const CHANNEL_HASH = (
  <svg className={styles.channelHash} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84Zm3.16 10.84.67-4H9.85l-.67 4h4.97Z"
    />
  </svg>
);

export default function DiscordMessage({ username, avatar, timestamp, app = false, channel, children }: DiscordMessageProps) {
  let rows = 0;
  const content = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === DiscordActionRow) {
      rows += 1;
      if (rows > 5) return null;
    }
    return child;
  });

  const message = (
    <div className={clsx(styles.message, channel && styles.messageInFrame)}>
      {avatar ? <img className={styles.avatar} src={avatar} alt="" /> : null}
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.username}>{username}</span>
          {app ? <span className={styles.appBadge}>APP</span> : null}
          {timestamp ? <span className={styles.timestamp}>{timestamp}</span> : null}
        </div>
        {content}
      </div>
    </div>
  );

  const channelName = channel?.trim().replace(/^#\s*/, "");
  if (!channelName) return message;

  return (
    <div className={styles.frame}>
      <div className={styles.channelBar}>
        {CHANNEL_HASH}
        <span className={styles.channelName}>{channelName}</span>
      </div>
      {message}
    </div>
  );
}
