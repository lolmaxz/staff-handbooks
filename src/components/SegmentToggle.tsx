import React, { useState } from "react";
import clsx from "clsx";
import { CalendarClock, CalendarDays, LayoutGrid, LayoutList, type LucideIcon } from "lucide-react";
import styles from "./SegmentToggle.module.css";

export type SegmentSide = "left" | "right";

export type SegmentToggleIcon =
  | "calendar-days"
  | "calendar-clock"
  | "layout-list"
  | "layout-grid";

export const segmentToggleIcons: Record<SegmentToggleIcon, LucideIcon> = {
  "calendar-days": CalendarDays,
  "calendar-clock": CalendarClock,
  "layout-list": LayoutList,
  "layout-grid": LayoutGrid,
};

const ICONS = segmentToggleIcons;

export interface SegmentToggleSideStyle {
  label: string;
  activeBackground?: string;
  activeColor?: string;
  /** Label color when inactive (defaults to muted handbook text). Icons keep `iconColor`. */
  inactiveColor?: string;
  /** Optional Lucide icon shown before the label. */
  icon?: SegmentToggleIcon;
  /** Icon color only — label stays muted unless active or hovered. */
  iconColor?: string;
}

export interface SegmentToggleVisualBox {
  label: string;
  background?: string;
  labelColor?: string;
  borderColor?: string;
}

interface Props {
  left: SegmentToggleSideStyle;
  right: SegmentToggleSideStyle;
  value?: SegmentSide;
  defaultValue?: SegmentSide;
  /** Click to select a side (default unselected only when used with `value` / `defaultValue`). */
  interactive?: boolean;
  /**
   * Hover-only mode: no side selected, clicks do not stick, hover brighten still works.
   * Good for “this is what the control looks like on Home” demos.
   */
  semiInteractive?: boolean;
  inactiveColor?: string;
  trackBackground?: string;
  trackBorder?: string;
  visualBox?: SegmentToggleVisualBox;
  fullWidth?: boolean;
  size?: "sm" | "md";
  className?: string;
  ariaLabel?: string;
  onChange?: (side: SegmentSide) => void;
}

function resolveLabelColor(
  isActive: boolean,
  config: SegmentToggleSideStyle,
  fallbackInactive?: string,
): string | undefined {
  if (isActive) {
    return config.activeColor;
  }
  return config.inactiveColor ?? fallbackInactive;
}

export default function SegmentToggle({
  left,
  right,
  value,
  defaultValue = "left",
  interactive = false,
  semiInteractive = false,
  inactiveColor,
  trackBackground,
  trackBorder,
  visualBox,
  fullWidth = false,
  size = "md",
  className,
  ariaLabel = "Two-way toggle",
  onChange,
}: Props) {
  const selectable = interactive && !semiInteractive;
  const hoverable = interactive || semiInteractive;

  const [internalSide, setInternalSide] = useState<SegmentSide | null>(
    semiInteractive ? null : defaultValue,
  );

  const activeSide: SegmentSide | null = semiInteractive ? null : value ?? internalSide;

  const handleSelect = (side: SegmentSide) => {
    if (!selectable) return;
    if (value === undefined) {
      setInternalSide(side);
    }
    onChange?.(side);
  };

  const sides: Array<{ side: SegmentSide; config: SegmentToggleSideStyle }> = [
    { side: "left", config: left },
    { side: "right", config: right },
  ];

  const iconSize = size === "sm" ? 14 : 16;

  const toggle = (
    <div
      className={clsx(styles.wrapper, fullWidth && styles.wrapperFullWidth, !visualBox && className)}
      role={hoverable ? "group" : visualBox ? undefined : "presentation"}
      aria-label={hoverable ? ariaLabel : visualBox ? undefined : undefined}
      aria-hidden={visualBox && !hoverable ? true : undefined}
      style={{
        ...(trackBackground ? { backgroundColor: trackBackground } : {}),
        ...(trackBorder ? { borderColor: trackBorder } : {}),
      }}
    >
      {sides.map(({ side, config }, index) => {
        const isActive = activeSide === side;
        const Icon = config.icon ? ICONS[config.icon] : null;
        const labelColor = resolveLabelColor(isActive, config, inactiveColor);

        return (
          <button
            key={side}
            type="button"
            className={clsx(
              styles.segment,
              size === "sm" && styles.segmentSm,
              fullWidth && styles.segmentFullWidth,
              hoverable && styles.segmentInteractive,
              semiInteractive && styles.segmentSemiInteractive,
              index === 1 && styles.segmentRight,
              isActive && styles.segmentActive,
              !hoverable && styles.segmentStatic,
            )}
            aria-pressed={selectable ? isActive : undefined}
            tabIndex={hoverable ? 0 : -1}
            disabled={!hoverable}
            onClick={() => handleSelect(side)}
            style={{
              ...(labelColor ? ({ ["--segment-label-color" as string]: labelColor } as React.CSSProperties) : {}),
              ...(isActive && config.activeBackground
                ? { backgroundColor: config.activeBackground }
                : {}),
            }}
          >
            <span className={styles.segmentInner}>
              {Icon ? (
                <Icon
                  className={styles.segmentIcon}
                  size={iconSize}
                  strokeWidth={2.2}
                  aria-hidden
                  style={
                    isActive
                      ? config.activeColor ?? config.iconColor
                        ? { color: config.activeColor ?? config.iconColor }
                        : undefined
                      : config.iconColor
                        ? { color: config.iconColor }
                        : undefined
                  }
                />
              ) : null}
              <span className={styles.segmentLabel}>{config.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );

  if (!visualBox) {
    return toggle;
  }

  const figureLabel =
    activeSide === "left"
      ? `${visualBox.label}. ${left.label} selected.`
      : activeSide === "right"
        ? `${visualBox.label}. ${right.label} selected.`
        : visualBox.label;

  return (
    <figure
      className={clsx(styles.visualBox, fullWidth && styles.visualBoxFullWidth, className)}
      role="figure"
      aria-label={figureLabel}
      style={{
        ...(visualBox.background ? { backgroundColor: visualBox.background } : {}),
        ...(visualBox.borderColor ? { borderColor: visualBox.borderColor } : {}),
      }}
    >
      <figcaption
        className={styles.visualBoxLabel}
        style={visualBox.labelColor ? { color: visualBox.labelColor } : undefined}
      >
        {visualBox.label}
      </figcaption>
      <div className={clsx(styles.visualBoxToggle, fullWidth && styles.visualBoxToggleFullWidth)}>{toggle}</div>
    </figure>
  );
}
