import type { MouseEvent } from "react";

/** Stop in-progress smooth scrolling (e.g. Docusaurus back-to-top polyfill). */
function stopOngoingScroll() {
  window.scrollTo({ top: window.scrollY, left: 0, behavior: "auto" });
}

function clearFocusScrollJump() {
  const active = document.activeElement;
  if (active instanceof HTMLElement && active !== document.body && active !== document.documentElement) {
    active.blur();
  }
}

/** Scroll to an in-page heading id, accounting for the fixed navbar. */
export function scrollToPageAnchor(href: string) {
  const id = href.replace(/^#/, "");
  if (!id) {
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    window.location.hash = id;
    return;
  }

  clearFocusScrollJump();
  stopOngoingScroll();

  const navbar = document.querySelector<HTMLElement>(".navbar");
  const offset = (navbar?.offsetHeight ?? 60) + 16;
  const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset);

  window.history.replaceState(null, "", `#${id}`);

  requestAnimationFrame(() => {
    stopOngoingScroll();
    window.scrollTo({ top, left: 0, behavior: "auto" });
  });
}

export function handlePageAnchorClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
  event.preventDefault();
  scrollToPageAnchor(href);
}

/** Drop stale section hashes when Docusaurus scroll-to-top is used. */
export function installBackToTopHashReset() {
  if (typeof document === "undefined") {
    return () => {};
  }

  const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (!target.closest(".theme-back-to-top-button")) {
      return;
    }

    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}`);
  };

  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
