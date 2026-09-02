import { create } from "zustand";
import { en } from "./en";
import { es } from "./es";

/**
 * Language, kept deliberately symmetrical with `lib/theme.ts`.
 *
 * Both are one preference the visitor can set, both have to be right before the
 * first paint, and both persist. So both are decided by the same inline script
 * in index.html and only *synced* from here — React boots long after the first
 * paint, and a page that renders in English for 200ms before switching to
 * Spanish is worse than one that never offered Spanish at all.
 *
 * Zustand is doing the one job it is good at here: letting a dozen components
 * read the current language without threading a prop or a provider through the
 * whole tree. The persistence is plain localStorage rather than the `persist`
 * middleware, because the inline script has to read the same key and coupling
 * a hand-written script to the middleware's storage envelope is a trap.
 */
export type Lang = "en" | "es";

export type Dict = typeof en;

export const LANG_KEY = "ep-lang";

const DICTS: Record<Lang, Dict> = { en, es };

/** Spanish for a Spanish-speaking browser, English for everyone else. */
export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "en";
  const tags = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  return tags.some((tag) => tag?.toLowerCase().startsWith("es")) ? "es" : "en";
}

export function readStoredLang(): Lang | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "en" || v === "es" ? v : null;
  } catch {
    // Private mode, or storage disabled. Not a reason to fail.
    return null;
  }
}

/** What the inline script put on the element, falling back to detection. */
function initialLang(): Lang {
  if (typeof document === "undefined") return "en";
  const attr = document.documentElement.lang;
  return attr === "es" || attr === "en" ? attr : detectLang();
}

export function applyLang(lang: Lang, persist = true) {
  // `<html lang>` is not decoration: it tells the screen reader which voice to
  // use, the browser which hyphenation and quote rules apply, and the
  // translate prompt to stay out of the way.
  document.documentElement.lang = lang;

  if (!persist) return;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // See above — a visitor who cannot store a preference still gets to use it
    // for this visit.
  }
}

type LangState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

export const useLangStore = create<LangState>((set) => ({
  lang: initialLang(),
  setLang: (lang) => {
    applyLang(lang);
    set({ lang });
  },
}));

/** The dictionary for the current language. */
export function useT(): Dict {
  return DICTS[useLangStore((s) => s.lang)];
}

export function useLang(): Lang {
  return useLangStore((s) => s.lang);
}

/**
 * Fills `{name}` placeholders. Two strings in the whole dictionary need this,
 * which is exactly why it is six lines rather than a dependency.
 */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}
