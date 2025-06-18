import clsx from "clsx";
import React from "react";
import styles from "./DiscordButton.module.css";

export type DiscordButtonType = "primary" | "success" | "secondary" | "destructive" | "link";

interface DiscordButtonProps {
  type?: DiscordButtonType;
  color?: string;
  emoji?: string;
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const LINK_ICON = (
  <svg className={styles.linkIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true" width="1em" height="1em">
    <path
      d="M7.5 10a2.5 2.5 0 0 1 2.5-2.5h4A2.5 2.5 0 0 1 16.5 10v4A2.5 2.5 0 0 1 14 16.5h-4A2.5 2.5 0 0 1 7.5 14v-1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 10A2.5 2.5 0 0 0 10 7.5V6A2.5 2.5 0 0 0 7.5 3.5h-4A2.5 2.5 0 0 0 1 6v4A2.5 2.5 0 0 0 3.5 12.5H5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function DiscordButton({ type = "primary", color, emoji, href, disabled = false, children }: DiscordButtonProps) {
  const style: React.CSSProperties = color ? ({ "--discord-btn-custom-bg": color } as React.CSSProperties) : {};

  const className = clsx(styles.discordButton, styles[type], color && styles.colorOverride, disabled && styles.disabled);

  const content = (
    <>
      {emoji && <span className={styles.emoji}>{emoji}</span>}
      <span>{children}</span>
      {type === "link" && LINK_ICON}
    </>
  );

  if (type === "link" && href) {
    return (
      <a
        className={className}
        style={style}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={className} style={style} disabled={disabled}>
      {content}
    </button>
  );
}
