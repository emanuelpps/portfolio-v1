import { useLangStore, useT, type Lang } from "@/i18n";

/**
 * The language switch.
 *
 * It shows the language it takes you TO, not the one you are on — the single
 * most common way a switcher goes wrong is showing "EN" on an English page,
 * leaving the visitor to guess whether that is a label or a button. Two
 * letters, because a flag would claim that Spanish belongs to one country and
 * that English belongs to another.
 *
 * The accessible name is written in the target language and the button carries
 * a matching `lang`, so a screen reader announces "Ver en español" in Spanish
 * instead of reading it aloud with English phonemes.
 */
export function LangToggle({ className = "" }: { className?: string }) {
  const t = useT();
  const lang = useLangStore((s) => s.lang);
  const setLang = useLangStore((s) => s.setLang);

  const next: Lang = lang === "en" ? "es" : "en";

  return (
    <button
      type="button"
      lang={next}
      onClick={() => setLang(next)}
      aria-label={t.language.switch}
      data-cursor="hover"
      className={`invertible note inline-flex h-11 min-w-11 items-center justify-center border-2 border-edge px-2.5 text-ink-2 ${className}`}
    >
      <span aria-hidden>{t.language.code}</span>
    </button>
  );
}
