import React, { useCallback, useMemo, useState } from "react";
import styles from "./Spoiler.module.css";

export interface SpoilerProps {
  children: React.ReactNode;
  /** Optional initial state (default false) */
  revealed?: boolean;
  /** Custom background when hidden */
  background?: string;
  /** Custom foreground when revealed */
  color?: string;
}

/**
 * Spoiler component that mimics Discord's spoiler behavior.
 * Text is hidden until clicked (or toggled via keyboard).
 */
export default function Spoiler({
  children,
  revealed = false,
  background,
  color,
}: SpoilerProps) {
  const [isRevealed, setIsRevealed] = useState<boolean>(revealed);

  const onToggle = useCallback(() => setIsRevealed((v) => !v), []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  }, [onToggle]);

  const styleVars = useMemo<React.CSSProperties>(() => {
    const vars: React.CSSProperties = {};
    if (background) vars["--spoiler-bg" as any] = background;
    if (color) vars["--spoiler-fg" as any] = color;
    return vars;
  }, [background, color]);

  const className = [styles.root, styles.focusRing, isRevealed ? styles.revealed : ""].filter(Boolean).join(" ");

  return (
    <span
      className={className}
      role="button"
      tabIndex={0}
      aria-pressed={isRevealed}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      style={styleVars}
    >
      {children}
    </span>
  );
}


