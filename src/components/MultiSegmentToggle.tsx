import React, { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./SegmentToggle.module.css";
import type { SegmentToggleIcon, SegmentToggleVisualBox } from "./SegmentToggle";
import { segmentToggleIcons } from "./SegmentToggle";
import {
  handlePageAnchorClick,
  installBackToTopHashReset,
} from "@site/src/utils/scrollToPageAnchor";

export interface MultiSegmentToggleSegment {
  label: string;
  activeBackground?: string;
  activeColor?: string;
  inactiveColor?: string;
  icon?: SegmentToggleIcon;
  iconColor?: string;
  /** In-page anchor (e.g. `#day-view`) — renders as a link instead of a button. */
  href?: string;
}

interface Props {
  segments: MultiSegmentToggleSegment[];
  value?: number;
  defaultValue?: number;
  interactive?: boolean;
  semiInteractive?: boolean;
  inactiveColor?: string;
  trackBackground?: string;
  trackBorder?: string;
  visualBox?: SegmentToggleVisualBox;
  fullWidth?: boolean;
  /** Wider visual box and toggle track (use with `fullWidth`). */
  wide?: boolean;
  size?: "sm" | "md";
  className?: string;
  ariaLabel?: string;
  onChange?: (index: number) => void;
}

function resolveLabelColor(
  isActive: boolean,
  config: MultiSegmentToggleSegment,
  fallbackInactive?: string,
): string | undefined {
  if (isActive) {
    return config.activeColor;
  }
  return config.inactiveColor ?? fallbackInactive;
}

function resolveIconColor(
  isActive: boolean,
  config: MultiSegmentToggleSegment,
): string | undefined {
  if (isActive) {
    return config.activeColor ?? config.iconColor;
  }
  return config.iconColor;
}

export default function MultiSegmentToggle({
  segments,
  value,
  defaultValue = 0,
  interactive = false,
  semiInteractive = false,
  inactiveColor,
  trackBackground,
  trackBorder,
  visualBox,
  fullWidth = false,
  wide = false,
  size = "md",
  className,
  ariaLabel = "Multi-way toggle",
  onChange,
}: Props) {
  const hasLinks = segments.some((segment) => Boolean(segment.href));
  const selectable = interactive && !semiInteractive && !hasLinks;
  const hoverable = interactive || semiInteractive || hasLinks;

  useEffect(() => {
    if (!hasLinks) {
      return undefined;
    }
    return installBackToTopHashReset();
  }, [hasLinks]);

  const [internalIndex, setInternalIndex] = useState<number | null>(
    semiInteractive || hasLinks ? null : defaultValue,
  );

  const activeIndex: number | null =
    semiInteractive || (hasLinks && value === undefined) ? null : value ?? internalIndex;
  const iconSize = size === "sm" ? 14 : 16;

  const handleSelect = (index: number) => {
    if (!selectable) return;
    if (value === undefined) {
      setInternalIndex(index);
    }
    onChange?.(index);
  };

  const toggle = (
    <div
      className={clsx(
        styles.wrapper,
        (fullWidth || wide) && styles.wrapperFullWidth,
        !visualBox && className,
      )}
      role={hoverable && !hasLinks ? "group" : visualBox ? undefined : "presentation"}
      aria-label={hoverable && !hasLinks ? ariaLabel : visualBox ? undefined : undefined}
      aria-hidden={visualBox && !hoverable ? true : undefined}
      style={{
        ...(trackBackground ? { backgroundColor: trackBackground } : {}),
        ...(trackBorder ? { borderColor: trackBorder } : {}),
      }}
    >
      {segments.map((config, index) => {
        const isActive = activeIndex === index;
        const Icon = config.icon ? segmentToggleIcons[config.icon] : null;
        const labelColor = resolveLabelColor(isActive, config, inactiveColor);
        const iconColor = resolveIconColor(isActive, config);
        const segmentClassName = clsx(
          styles.segment,
          size === "sm" && styles.segmentSm,
          (fullWidth || wide) && styles.segmentFullWidth,
          hoverable && styles.segmentInteractive,
          semiInteractive && styles.segmentSemiInteractive,
          config.href && styles.segmentLink,
          index > 0 && styles.segmentRight,
          isActive && styles.segmentActive,
          !hoverable && styles.segmentStatic,
        );
        const segmentStyle = {
          ...(labelColor ? ({ ["--segment-label-color" as string]: labelColor } as React.CSSProperties) : {}),
          ...(isActive && config.activeBackground ? { backgroundColor: config.activeBackground } : {}),
        };
        const segmentContent = (
          <span className={styles.segmentInner}>
            {Icon ? (
              <Icon
                className={styles.segmentIcon}
                size={iconSize}
                strokeWidth={2.2}
                aria-hidden
                style={iconColor ? { color: iconColor } : undefined}
              />
            ) : null}
            <span className={styles.segmentLabel}>{config.label}</span>
          </span>
        );

        if (config.href) {
          return (
            <a
              key={`${config.label}-${index}`}
              href={config.href}
              className={segmentClassName}
              style={segmentStyle}
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => handlePageAnchorClick(event, config.href!)}
            >
              {segmentContent}
            </a>
          );
        }

        return (
          <button
            key={`${config.label}-${index}`}
            type="button"
            className={segmentClassName}
            aria-pressed={selectable ? isActive : undefined}
            tabIndex={hoverable ? 0 : -1}
            disabled={!hoverable}
            onClick={() => handleSelect(index)}
            style={segmentStyle}
          >
            {segmentContent}
          </button>
        );
      })}
    </div>
  );

  if (!visualBox) {
    return toggle;
  }

  const selectedLabel =
    activeIndex !== null && segments[activeIndex]
      ? `${visualBox.label}. ${segments[activeIndex].label} selected.`
      : visualBox.label;

  return (
    <figure
      className={clsx(
        styles.visualBox,
        fullWidth && styles.visualBoxFullWidth,
        wide && styles.visualBoxWide,
        className,
      )}
      role="figure"
      aria-label={selectedLabel}
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
      <div
        className={clsx(
          styles.visualBoxToggle,
          (fullWidth || wide) && styles.visualBoxToggleFullWidth,
        )}
      >
        {toggle}
      </div>
    </figure>
  );
}
