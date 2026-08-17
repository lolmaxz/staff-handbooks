import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

interface BubblePos {
  top: number;
  left: number;
  align: Align;
}

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
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<BubblePos>({ top: 0, left: 0, align: "center" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const bw = bubbleRef.current?.offsetWidth || 0;
    const vw = window.innerWidth;

    let align: Align = "center";
    if (bw > 0) {
      if (rect.left < bw * 0.5) align = "left";
      else if (vw - rect.right < bw * 0.5) align = "right";
    }

    let left = rect.left + rect.width / 2;
    if (align === "left") left = rect.left;
    if (align === "right") left = rect.right;

    setPos({
      top: rect.top,
      left,
      align,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    // Re-measure after paint once bubble width is known
    const id = requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  const cssVars: React.CSSProperties = {
    "--bubble-bg": color || bubbleColor || "rgba(88,101,242,.85)",
    "--label-clr": color || labelColor || "#8e9bff",
  } as React.CSSProperties;

  const labelStyle: React.CSSProperties = {
    "--border-bottom": noDecoration ? "none" : "1px dotted CurrentColor",
  } as React.CSSProperties;

  if (width) cssVars["--bubble-w"] = typeof width === "number" ? `${width}px` : width;
  if (minWidth) cssVars["--bubble-min"] = typeof minWidth === "number" ? `${minWidth}px` : minWidth;

  const bubbleStyle: React.CSSProperties = {
    top: pos.top,
    left: pos.left,
    ...(useLineBreaks ? { whiteSpace: "pre-line" as const } : {}),
  };

  const show = () => {
    setOpen(true);
  };
  const hide = () => setOpen(false);

  const bubble =
    mounted &&
    createPortal(
      <span
        ref={bubbleRef}
        className={`${styles.bubble} ${open ? styles.bubbleVisible : ""}`}
        data-align={pos.align}
        style={{ ...cssVars, ...bubbleStyle }}
        role="tooltip"
      >
        {tip}
      </span>,
      document.body,
    );

  return (
    <span
      ref={wrapperRef}
      className={styles.wrapper}
      style={cssVars}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span className={styles.label} style={labelStyle}>
        {children}
      </span>
      {!noDecoration && <span className={styles.badge}>i</span>}
      {bubble}
    </span>
  );
}
