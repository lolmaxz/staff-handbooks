import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./StepTimeline.module.css";

export interface StepTimelineStep {
  label: string;
  detail?: string;
  /** Optional recap shown in a click/tap popover. Steps without this stay plain text. */
  recap?: string;
}

interface Props {
  steps: StepTimelineStep[];
  title?: string;
  direction?: "horizontal" | "vertical";
  size?: "sm" | "md";
  accentColor?: string;
  className?: string;
  ariaLabel?: string;
}

type PopoverAlign = "center" | "left" | "right";

interface PopoverPos {
  top: number;
  left: number;
  align: PopoverAlign;
  viewportFit?: boolean;
}

const VIEWPORT_EDGE_MARGIN = 16;
const MOBILE_BREAKPOINT = 640;
const POPOVER_MAX_WIDTH = 352;

function ArrowHorizontal({ size }: { size: "sm" | "md" }) {
  return (
    <span
      className={clsx(
        styles.arrowHorizontal,
        size === "sm" ? styles.headSm : styles.headMd,
      )}
      aria-hidden
    >
      <span className={styles.arrowHorizontalLine} />
    </span>
  );
}

function ArrowVertical({ size }: { size: "sm" | "md" }) {
  return (
    <span className={styles.arrowVertical} aria-hidden>
      <span className={styles.arrowVerticalLine} />
    </span>
  );
}

function StepCopy({
  step,
  size,
  vertical,
}: {
  step: StepTimelineStep;
  size: "sm" | "md";
  vertical: boolean;
}) {
  return (
    <div className={clsx(styles.copy, vertical && styles.copyVertical)}>
      <span className={clsx(styles.label, size === "sm" && styles.labelSm)}>{step.label}</span>
      {step.detail ? (
        <span className={clsx(styles.detail, size === "sm" && styles.detailSm)}>{step.detail}</span>
      ) : null}
    </div>
  );
}

function StepBubble({ index, size }: { index: number; size: "sm" | "md" }) {
  return (
    <span
      className={clsx(styles.bubble, size === "sm" ? styles.bubbleSm : styles.bubbleMd)}
      aria-hidden
    >
      {index + 1}
    </span>
  );
}

function StepRecapPopover({
  recap,
  anchorRef,
  open,
  popoverId,
  onClose,
}: {
  recap: string;
  anchorRef: React.RefObject<HTMLElement | null>;
  open: boolean;
  popoverId: string;
  onClose: () => void;
}) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<PopoverPos>({ top: 0, left: 0, align: "center" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const vw = window.innerWidth;

    if (vw <= MOBILE_BREAKPOINT) {
      setPos({
        top: rect.bottom,
        left: VIEWPORT_EDGE_MARGIN,
        align: "center",
        viewportFit: true,
      });
      return;
    }

    const bw = bubbleRef.current?.offsetWidth ?? 0;

    let align: PopoverAlign = "center";
    if (bw > 0) {
      if (rect.left + rect.width / 2 < bw * 0.55) align = "left";
      else if (vw - rect.left - rect.width / 2 < bw * 0.55) align = "right";
    }

    let left = rect.left + rect.width / 2;
    if (align === "left") left = rect.left;
    if (align === "right") left = rect.right;

    setPos({
      top: rect.bottom,
      left,
      align,
      viewportFit: false,
    });
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const id = requestAnimationFrame(updatePosition);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <>
      <button type="button" className={styles.popoverBackdrop} aria-label="Close step recap" onClick={onClose} />
      <div
        ref={bubbleRef}
        id={popoverId}
        role="tooltip"
        className={clsx(
          styles.popover,
          styles.popoverVisible,
          pos.viewportFit && styles.popoverViewportFit,
        )}
        data-align={pos.viewportFit ? undefined : pos.align}
        style={{
          top: pos.top,
          left: pos.left,
          ...(pos.viewportFit
            ? {
                right: VIEWPORT_EDGE_MARGIN,
                maxWidth: `min(${POPOVER_MAX_WIDTH}px, calc(100vw - ${VIEWPORT_EDGE_MARGIN * 2}px))`,
              }
            : {}),
        }}
      >
        <p className={styles.popoverText}>{recap}</p>
      </div>
    </>,
    document.body,
  );
}

function InteractiveStep({
  step,
  index,
  size,
  vertical,
  headSize,
  trackWidth,
  isLast,
  isOpen,
  onToggle,
  onClose,
  popoverId,
}: {
  step: StepTimelineStep;
  index: number;
  size: "sm" | "md";
  vertical: boolean;
  headSize: string;
  trackWidth?: string;
  isLast: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  popoverId: string;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const hasRecap = Boolean(step.recap);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!hasRecap) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  const interactiveProps = hasRecap
    ? {
        role: "button" as const,
        tabIndex: 0,
        "aria-expanded": isOpen,
        "aria-controls": popoverId,
        "aria-label": `${step.label}. Tap for step recap.`,
        onClick: onToggle,
        onKeyDown,
      }
    : {};

  if (vertical) {
    return (
      <>
        <div
          ref={anchorRef}
          className={clsx(
            styles.interactiveWrap,
            styles.interactiveWrapVertical,
            hasRecap && styles.interactive,
            hasRecap && styles.interactiveMobileHint,
            isOpen && styles.interactiveOpen,
          )}
          {...interactiveProps}
        >
          <div className={clsx(styles.verticalTrack, trackWidth)}>
            <div className={clsx(styles.stepHead, headSize)}>
              <StepBubble index={index} size={size} />
            </div>
            {!isLast ? <ArrowVertical size={size} /> : null}
          </div>
          <StepCopy step={step} size={size} vertical />
        </div>
        {hasRecap && step.recap ? (
          <StepRecapPopover
            recap={step.recap}
            anchorRef={anchorRef}
            open={isOpen}
            popoverId={popoverId}
            onClose={onClose}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <div
        ref={anchorRef}
        className={clsx(
          styles.step,
          hasRecap && styles.interactive,
          hasRecap && styles.interactiveMobileHint,
          isOpen && styles.interactiveOpen,
        )}
        {...interactiveProps}
      >
        <div className={clsx(styles.stepHead, headSize)}>
          <StepBubble index={index} size={size} />
        </div>
        <StepCopy step={step} size={size} vertical={false} />
      </div>
      {hasRecap && step.recap ? (
        <StepRecapPopover
          recap={step.recap}
          anchorRef={anchorRef}
          open={isOpen}
          popoverId={popoverId}
          onClose={onClose}
        />
      ) : null}
    </>
  );
}

export default function StepTimeline({
  steps,
  title,
  direction = "horizontal",
  size = "md",
  accentColor = "#a259f7",
  className,
  ariaLabel = "Workflow steps",
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  if (steps.length === 0) return null;

  const vertical = direction === "vertical";
  const headSize = size === "sm" ? styles.headSm : styles.headMd;
  const trackWidth = size === "sm" ? styles.trackSm : styles.trackMd;

  const toggleStep = (index: number, hasRecap: boolean) => {
    if (!hasRecap) return;
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div
      className={clsx(styles.wrapper, className)}
      style={{ ["--step-accent" as string]: accentColor }}
    >
      {title ? <p className={styles.title}>{title}</p> : null}
      <ol
        className={clsx(styles.list, vertical ? styles.listVertical : styles.listHorizontal)}
        aria-label={ariaLabel}
      >
        {vertical
          ? steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const popoverId = `${baseId}-step-${index}`;
              return (
                <li key={`${step.label}-${index}`} className={styles.verticalSegment}>
                  <InteractiveStep
                    step={step}
                    index={index}
                    size={size}
                    vertical
                    headSize={headSize}
                    trackWidth={trackWidth}
                    isLast={isLast}
                    isOpen={openIndex === index}
                    onToggle={() => toggleStep(index, Boolean(step.recap))}
                    onClose={() => setOpenIndex(null)}
                    popoverId={popoverId}
                  />
                </li>
              );
            })
          : steps.map((step, index) => {
              const isLast = index === steps.length - 1;
              const popoverId = `${baseId}-step-${index}`;
              return (
                <li
                  key={`${step.label}-${index}`}
                  className={clsx(styles.segment, isLast && styles.segmentLast)}
                >
                  <InteractiveStep
                    step={step}
                    index={index}
                    size={size}
                    vertical={false}
                    headSize={headSize}
                    isLast={isLast}
                    isOpen={openIndex === index}
                    onToggle={() => toggleStep(index, Boolean(step.recap))}
                    onClose={() => setOpenIndex(null)}
                    popoverId={popoverId}
                  />
                  {!isLast ? <ArrowHorizontal size={size} /> : null}
                </li>
              );
            })}
      </ol>
    </div>
  );
}
