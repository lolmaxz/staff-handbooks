import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import styles from "./Tooltip.module.css";

interface Props {
  tip: React.ReactNode;
  children: React.ReactNode;
  bubbleColor?: string;
  labelColor?: string;
  width?: string | number;
  minWidth?: string | number;
  color?: string;
  noDecoration?: boolean;
  useLineBreaks?: boolean;
}

type Align = "center" | "left" | "right";

export default function Tooltip({
  tip,
  children,
  bubbleColor,
  labelColor,
  width = "12rem",
  minWidth,
  color,
  noDecoration = false,
  useLineBreaks = false,
}: Props) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const [align, setAlign] = useState<Align>("center");

  const computeAlign = useCallback(() => {
    const wrap = wrapperRef.current;
    const bub = bubbleRef.current;
    if (!wrap || !bub) return;

    const vw = window.innerWidth;
    const rect = wrap.getBoundingClientRect();
    const bw = bub.offsetWidth;

    if (rect.left < bw * 0.5) setAlign("left");
    else if (vw - rect.right < bw * 0.5) setAlign("right");
    else setAlign("center");
  }, []);

  /* re‑evaluate on mount, hover, focus, and resize */
  useLayoutEffect(() => {
    computeAlign();
    window.addEventListener("resize", computeAlign);
    return () => window.removeEventListener("resize", computeAlign);
  }, [computeAlign]);

  const cssVars: React.CSSProperties = {
    "--bubble-bg": color || bubbleColor || "rgba(88,101,242,.85)",
    "--label-clr": color || labelColor || "#8e9bff",
  } as React.CSSProperties;

  const cssVars2: React.CSSProperties = {
    "--border-bottom": "1px dotted CurrentColor",
  } as React.CSSProperties;

  if (noDecoration) cssVars2["--border-bottom"] = "none";

  if (width) cssVars["--bubble-w"] = typeof width === "number" ? `${width}px` : width;
  if (minWidth) cssVars["--bubble-min"] = typeof minWidth === "number" ? `${minWidth}px` : minWidth;

  const bubbleStyle: React.CSSProperties = useLineBreaks
    ? {
        whiteSpace: "pre-line",
      }
    : {};

  return (
    <span
      ref={wrapperRef}
      className={styles.wrapper}
      data-align={align} /* ← CSS hook */
      style={cssVars}
      onMouseEnter={computeAlign}
      onFocus={computeAlign}
    >
      <span className={styles.label} style={cssVars2}>
        {children}
      </span>
      {!noDecoration && <span className={styles.badge}>i</span>}
      <span ref={bubbleRef} className={styles.bubble} style={bubbleStyle}>
        {tip}
      </span>
    </span>
  );
}
