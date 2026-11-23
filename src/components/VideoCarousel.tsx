import React, { useCallback, useEffect, useRef, useState } from "react";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";
import styles from "./VideoCarousel.module.css";

export interface CarouselVideo {
  /** Shown on the tab and above the player. */
  title: string;
  /** Path under `static/` (e.g. "/videos/intro.mp4") or a full URL. */
  src: string;
  /** Optional still image shown before the video plays. */
  poster?: string;
}

export interface VideoCarouselProps {
  videos: CarouselVideo[];
  /** Optional heading at the top of the card. */
  heading?: string;
}

type Slide = { index: number; role: "current" | "leaving" };

const ARROW = (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.arrowIcon}>
    <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
  </svg>
);

/**
 * A full-width card with one video at a time. Tabs at the top pick a video, the side arrows go back
 * and forward, and videos slide in and out. Only the video in view is mounted: the others are
 * unloaded so they never download or keep playing in the background.
 */
export default function VideoCarousel({ videos, heading }: VideoCarouselProps) {
  const { withBaseUrl } = useBaseUrlUtils();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animationKey, setAnimationKey] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef(new Map<number, HTMLVideoElement>());
  const count = videos.length;

  const goTo = useCallback(
    (target: number) => {
      if (target === index || target < 0 || target >= count) return;
      setDirection(target > index ? "next" : "prev");
      setLeaving(index);
      setIndex(target);
      setAnimationKey((key) => key + 1);
    },
    [index, count],
  );

  // Pause the outgoing video right away, then drop it once its slide-out animation is done.
  useEffect(() => {
    if (leaving === null) return undefined;
    videoRefs.current.get(leaving)?.pause();
    const timer = window.setTimeout(() => setLeaving(null), 380);
    return () => window.clearTimeout(timer);
  }, [leaving, animationKey]);

  // Keep the active tab visible when the tab row scrolls.
  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>(`[data-tab="${index}"]`);
    tab?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [index]);

  if (!count) return null;

  const resolve = (src: string) => (/^(https?:)?\/\//.test(src) ? src : withBaseUrl(src));
  const slides: Slide[] = [{ index, role: "current" }];
  if (leaving !== null && leaving !== index) slides.unshift({ index: leaving, role: "leaving" });

  const onKeyDown = (event: React.KeyboardEvent) => {
    if ((event.target as HTMLElement).tagName === "VIDEO") return;
    if (event.key === "ArrowRight") goTo(index + 1);
    if (event.key === "ArrowLeft") goTo(index - 1);
  };

  return (
    <section className={styles.card} onKeyDown={onKeyDown} aria-roledescription="carousel" aria-label={heading ?? "Videos"}>
      {heading ? <div className={styles.heading}>{heading}</div> : null}

      <div className={styles.tabs} ref={tabsRef} role="tablist">
        {videos.map((video, videoIndex) => (
          <button
            key={video.src}
            type="button"
            role="tab"
            data-tab={videoIndex}
            aria-selected={videoIndex === index}
            className={videoIndex === index ? styles.tabOn : styles.tab}
            onClick={() => goTo(videoIndex)}
          >
            <span className={styles.tabNumber}>{videoIndex + 1}</span>
            {video.title}
          </button>
        ))}
      </div>

      <div className={styles.titleRow}>
        <span className={styles.counter}>
          {index + 1} / {count}
        </span>
        <span className={styles.title}>{videos[index].title}</span>
      </div>

      <div className={styles.stage}>
        <button type="button" className={`${styles.arrow} ${styles.arrowPrev}`} onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous video">
          {ARROW}
        </button>

        <div className={styles.viewport}>
          {slides.map((slide) => {
            const video = videos[slide.index];
            const animation =
              slide.role === "current"
                ? leaving === null
                  ? ""
                  : direction === "next"
                    ? styles.enterFromRight
                    : styles.enterFromLeft
                : direction === "next"
                  ? styles.leaveToLeft
                  : styles.leaveToRight;
            return (
              <div key={slide.index} className={`${styles.slide} ${animation}`} aria-hidden={slide.role === "leaving"}>
                <video
                  ref={(node) => {
                    if (node) videoRefs.current.set(slide.index, node);
                    else videoRefs.current.delete(slide.index);
                  }}
                  className={styles.video}
                  src={resolve(video.src)}
                  poster={video.poster ? resolve(video.poster) : undefined}
                  controls={slide.role === "current"}
                  preload="metadata"
                  playsInline
                />
              </div>
            );
          })}
        </div>

        <button type="button" className={`${styles.arrow} ${styles.arrowNext}`} onClick={() => goTo(index + 1)} disabled={index === count - 1} aria-label="Next video">
          {ARROW}
        </button>
      </div>
    </section>
  );
}
