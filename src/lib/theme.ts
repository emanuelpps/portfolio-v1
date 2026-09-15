/**
 * Light and dark are the same design with six values traded, so the only thing
 * this module owns is which of the two is on `<html data-theme>`.
 *
 * The first paint is decided by an inline script in index.html, not here —
 * React boots too late, and a dark page flashing white before hydration is the
 * single most jarring thing a theme switch can do. This module only keeps the
 * runtime in sync with what that script already decided.
 */
export type Theme = "dark" | "light";

export const THEME_KEY = "ep-theme";

/** Kept in step with the ground colour so the mobile browser chrome matches. */
const CHROME = { dark: "#0F1621", light: "#ECEEF1" } as const;

export function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === "dark" || v === "light" ? v : null;
  } catch {
    // Private mode, or storage disabled. Not a reason to fail.
    return null;
  }
}

export function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

/** What the inline script put on the element, falling back to the system. */
export function currentTheme(): Theme {
  const attr = document.documentElement.dataset.theme;
  return attr === "light" || attr === "dark" ? attr : systemTheme();
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", CHROME[theme]);

  if (!persist) return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // See above — a visitor who cannot store a preference still gets to use it
    // for this visit.
  }
}
