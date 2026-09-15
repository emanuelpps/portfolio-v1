import { useEffect, useState } from "react";
import {
  applyTheme,
  currentTheme,
  readStoredTheme,
  systemTheme,
  type Theme,
} from "@/lib/theme";
import { useT } from "@/i18n";

/**
 * The mode switch.
 *
 * A sun and a moon would be the two roundest icons available on a site whose
 * only permitted curve is the bowl of the P — so the icon is a square split
 * down the middle, one half ink and one half ground. It is not decoration:
 * that square is literally what the button does, since the whole system is one
 * palette inverted.
 *
 * The label is the action, not the state ("Light", meaning: this takes you
 * there), because a button named after where you already are is the classic
 * way to make a theme switch ambiguous. On narrow screens the word is dropped
 * and the same string carries on as the accessible name.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const t = useT();

  // Read once on mount rather than during render: the value lives on the DOM
  // element the inline script wrote to, which does not exist on the server and
  // must not be touched while rendering.
  useEffect(() => setTheme(currentTheme()), []);

  // A visitor who never made a choice keeps following the OS, including when
  // it flips at sunset while the tab is open. Once they choose, we stop.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const sync = () => {
      if (readStoredTheme()) return;
      const next = systemTheme();
      applyTheme(next, false);
      setTheme(next);
    };
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? t.theme.light : t.theme.dark;

  return (
    <button
      type="button"
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      aria-label={next === "light" ? t.theme.toLight : t.theme.toDark}
      data-cursor="hover"
      className={`invertible group inline-flex h-11 min-w-11 items-center gap-2.5 border-2 border-edge px-2.5 text-ink-2 sm:px-3.5 ${className}`}
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
        fill="none"
      >
        {/* Left half solid, right half open, inside one square outline: ink and
            ground sharing a frame, which is the state change itself. */}
        <path d="M1 1h7v14H1z" fill="currentColor" />
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <span className="note hidden sm:inline">{label}</span>
    </button>
  );
}
