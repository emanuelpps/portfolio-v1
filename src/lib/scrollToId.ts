import type { MouseEvent } from "react";
import { getLenis } from "@/lib/SmoothScroll";

/**
 * In-page navigation, done once.
 *
 * Every link that points at a section is a real `<a href="#id">`, so it can be
 * copied, middle-clicked and restored on reload. This only upgrades the jump
 * to a smooth one and keeps the hash in the address bar — and if the target is
 * not on the page it does nothing at all, letting the browser handle it.
 *
 * The offset clears the fixed masthead. Without it a section lands with its
 * own heading hidden behind the bar, which is the most common way a one-page
 * site quietly breaks its own navigation.
 */
export const NAV_OFFSET = -88;

export function jumpTo(e: MouseEvent, id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  e.preventDefault();
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
  else el.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
}

export function jumpToTop(e: MouseEvent) {
  e.preventDefault();
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", window.location.pathname);
}
