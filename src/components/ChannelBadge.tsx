import Link from "@docusaurus/Link";
import clsx from "clsx";
import React from "react";
import styles from "./ChannelBadge.module.css";

type Variant = "channel" | "thread" | "post" | "vc";

interface Props {
  /** Visible name — e.g. "staff-applications" or "ticket‑1234" */
  label: string;
  /** Destination URL / path */
  link: string;
  /** "channel" (default), "thread", or "post" */
  variant?: Variant;
  /** Optional tint (HEX or CSS var). Default = Discord blurple */
  color?: string;
}

/* ───── ICONS ───── */
const HashIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Channel" role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84Zm3.16 10.84.67-4H9.85l-.67 4h4.97Z"
    />
  </svg>
);

const ThreadIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Thread" role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1 1 0 0 1 1.41 0l9.2 9.2a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.3.13l-9.54-6.72a1 1 0 0 1-.08-1.58l1-1L12 2.8ZM12 21.2a1 1 0 0 1 0 1.41l-.35.35a1 1 0 0 1-1.41 0l-9.2-9.19a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.3-.12l9.54 6.72a1 1 0 0 1 .07 1.58l-1 1 .35.36ZM15.66 16.8a1 1 0 0 1-1.38.28l-8.49-5.66A1 1 0 1 1 6.9 9.76l8.49 5.65a1 1 0 0 1 .27 1.39ZM17.1 14.25a1 1 0 1 0 1.11-1.66L9.73 6.93a1 1 0 0 0-1.11 1.66l8.49 5.66Z" />
  </svg>
);

const PostIcon = ({ className }: { className?: string }) => (
  <svg aria-label="Forum Channel" role="img" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.91 12.98a5.45 5.45 0 0 1 2.18 6.2c-.1.33-.09.68.1.96l.83 1.32a1 1 0 0 1-.84 1.54h-5.5A5.6 5.6 0 0 1 10 17.5a5.6 5.6 0 0 1 5.68-5.5c1.2 0 2.32.36 3.23.98Z" />
    <path d="M19.24 10.86c.32.16.72-.02.74-.38L20 10c0-4.42-4.03-8-9-8s-9 3.58-9 8c0 1.5.47 2.91 1.28 4.11.14.21.12.49-.06.67l-1.51 1.51A1 1 0 0 0 2.4 18h5.1a.5.5 0 0 0 .49-.5c0-4.2 3.5-7.5 7.68-7.5 1.28 0 2.5.3 3.56.86Z" />
  </svg>
);

const VCIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    aria-label="Voice Channel"
    aria-hidden="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"
    />
    <path
      fill="currentColor"
      d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"
    />
  </svg>
);
/* ─────────────────────────────────────────── */

export default function ChannelBadge({ label, link, variant = "channel", color = "#5865F2" }: Props) {
  let Icon = HashIcon;
  if (variant === "thread") Icon = ThreadIcon;
  else if (variant === "post") Icon = PostIcon;
  else if (variant === "vc") Icon = VCIcon;

  return (
    <Link to={link} className={clsx(styles.badge, "clean-btn")} style={{ "--badge-tint": color } as React.CSSProperties}>
      <Icon className={styles.icon} />
      {label}
    </Link>
  );
}
