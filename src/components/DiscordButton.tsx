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
  <svg
    className={styles.linkIcon}
    aria-hidden="true"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
  >
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
