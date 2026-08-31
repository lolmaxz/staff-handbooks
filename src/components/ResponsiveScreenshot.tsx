import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "./ResponsiveScreenshot.module.css";

type ViewMode = "desktop" | "mobile";

interface Props {
  /**
   * Path to the desktop image, relative to `static/img/` (no extension).
   * Use slashes for subfolders, e.g. `scheduler/11-host-availability-add-slot`.
   */
  src: string;
  /**
   * Optional mobile image path (same rules as `src`).
   * When omitted, mobile is auto-resolved as `{src}_mobile` when that file exists.
   */
  mobileSrc?: string;
  alt: string;
  caption?: string;
  className?: string;
  /** TestPage demos only — overrides auto-detect and toggle */
  forceView?: ViewMode;
}

const webpImages = require.context("../../static/img", true, /\.webp$/);

function resolveWebpImage(relativePath: string): string | null {
  const normalized = relativePath.replace(/^\/+/, "").replace(/\.webp$/i, "");
  const key = `./${normalized}.webp`;

  if (!webpImages.keys().includes(key)) {
    return null;
  }

  const mod = webpImages(key) as string | { default: string };
  return typeof mod === "string" ? mod : mod.default;
}

function pickInitialView(
  hasDesktop: boolean,
  hasMobile: boolean,
  prefersMobile: boolean,
  forced?: ViewMode,
): ViewMode {
  if (forced === "mobile" && hasMobile) return "mobile";
  if (forced === "desktop" && hasDesktop) return "desktop";
  if (prefersMobile && hasMobile) return "mobile";
  if (hasDesktop) return "desktop";
  if (hasMobile) return "mobile";
  return "desktop";
}

function clampView(view: ViewMode, hasDesktop: boolean, hasMobile: boolean): ViewMode {
  if (view === "mobile" && hasMobile) return "mobile";
  if (view === "desktop" && hasDesktop) return "desktop";
  if (hasDesktop) return "desktop";
  if (hasMobile) return "mobile";
  return "desktop";
}

export default function ResponsiveScreenshot({
  src,
  mobileSrc,
  alt,
  caption,
  className,
  forceView,
}: Props) {
  const normalizedSrc = src.replace(/^\/+/, "").replace(/\.webp$/i, "");
  const resolvedMobilePath = mobileSrc?.replace(/^\/+/, "").replace(/\.webp$/i, "") ?? `${normalizedSrc}_mobile`;

  const desktopImage = useMemo(() => resolveWebpImage(normalizedSrc), [normalizedSrc]);
  const mobileImage = useMemo(() => resolveWebpImage(resolvedMobilePath), [resolvedMobilePath]);

  const hasDesktop = desktopImage !== null;
  const hasMobile = mobileImage !== null;

  const [view, setView] = useState<ViewMode>(() =>
    pickInitialView(hasDesktop, hasMobile, false, forceView),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (forceView) {
      setView(pickInitialView(hasDesktop, hasMobile, false, forceView));
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setView(pickInitialView(hasDesktop, hasMobile, mediaQuery.matches));

    const handleChange = (event: MediaQueryListEvent) => {
      setView(pickInitialView(hasDesktop, hasMobile, event.matches));
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [forceView, hasDesktop, hasMobile]);

  const effectiveView = forceView
    ? clampView(pickInitialView(hasDesktop, hasMobile, false, forceView), hasDesktop, hasMobile)
    : clampView(view, hasDesktop, hasMobile);

  const imageSrc = effectiveView === "mobile" ? mobileImage : desktopImage;

  const handleToggle = (target: ViewMode) => {
    if (target === "desktop" && !hasDesktop) return;
    if (target === "mobile" && !hasMobile) return;
    setView(target);
  };

  const showToggle = mounted && !forceView && (hasDesktop || hasMobile);

  return (
    <figure className={clsx(styles.figure, className)}>
      {showToggle && (
        <div className={styles.toggle} role="group" aria-label="Screenshot viewport">
          <button
            type="button"
            className={clsx(
              styles.toggleButton,
              effectiveView === "desktop" && hasDesktop && styles.toggleButtonActive,
              !hasDesktop && styles.toggleButtonUnavailable,
            )}
            aria-pressed={effectiveView === "desktop" && hasDesktop}
            disabled={!hasDesktop}
            onClick={() => handleToggle("desktop")}
          >
            Desktop
          </button>
          <button
            type="button"
            className={clsx(
              styles.toggleButton,
              effectiveView === "mobile" && hasMobile && styles.toggleButtonActive,
              !hasMobile && styles.toggleButtonUnavailable,
            )}
            aria-pressed={effectiveView === "mobile" && hasMobile}
            disabled={!hasMobile}
            onClick={() => handleToggle("mobile")}
          >
            Mobile
          </button>
        </div>
      )}
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          className={clsx(styles.image, effectiveView === "mobile" && styles.imageMobile)}
          loading="lazy"
        />
      ) : (
        <p className={styles.missing}>Screenshot not found: `{normalizedSrc}`</p>
      )}
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
