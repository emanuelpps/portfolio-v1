import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useActiveSection } from "@/hooks/useActiveSection";
import { getLenis } from "@/lib/SmoothScroll";
import { jumpTo, jumpToTop } from "@/lib/scrollToId";
import { EPMark } from "@/components/blueprint/EPMark";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LangToggle } from "@/components/LangToggle";
import { SECTION_IDS } from "@/data/sections";
import { useT } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * The masthead.
 *
 * It carries the name, because the cover's headline is the role — someone has
 * to say who this is, and top left at reading size is where a poster says it.
 * The mark rides in front of it so the pair works as the one thing every
 * visitor already knows how to use: the logo in the corner that takes you home.
 *
 * It is opaque and ruled from the first pixel rather than fading in on scroll.
 * A bar that materialises when you move is a bar you have to discover twice,
 * and the 3px rule under it is the same weight that separates every section
 * below, so the page reads as one ruled document from the top down.
 *
 * Below 360px the wordmark steps aside and the mark carries the corner alone.
 * Measured: name, language, mode and menu together need more room than a 320px
 * phone has, and of the four the name is the one the cover repeats anyway.
 */
const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const onProjectPage = useMatch("/project/:projectId");
  const t = useT();

  // SECTION_IDS is a module constant, so the reference is stable and the
  // observer is not torn down and rebuilt on every render.
  const active = useActiveSection(SECTION_IDS);

  // Lock the page while the mobile index is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape — a full-screen overlay needs a way out that is not a
  // second trip to the same corner.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * Entries are real `#` links, so they can be copied, opened in a tab and
   * restored on reload; `jumpTo` only upgrades the jump to a smooth one. From
   * the mobile index the scroll waits for the overlay to finish leaving —
   * scrolling a page that is still fading out is what makes the two read as
   * one broken movement instead of two.
   */
  const go = (e: React.MouseEvent, id: string) => {
    if (!document.getElementById(id)) return;
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    const fire = () => jumpTo(e, id);
    if (wasOpen) setTimeout(fire, 240);
    else fire();
  };

  const toTop = (e: React.MouseEvent) => {
    setOpen(false);
    jumpToTop(e);
  };

  /**
   * On a project sheet the masthead stays, but the index goes.
   *
   * It used to disappear entirely, because the sheet was an overlay carrying
   * its own back link, close button and "Top ↑". The sheet is a page now, so
   * the bar belongs to it too — minus the section links, which point at
   * anchors that do not exist on this page and would take a visitor somewhere
   * without saying so. One way out, named.
   */
  if (onProjectPage) {
    return (
      <nav
        aria-label={t.nav.label}
        className="fixed left-0 top-0 z-[100] h-16 w-full border-b-[3px] border-ink bg-ground lg:h-20"
      >
        <div className="flex h-full items-center justify-between gap-4 px-[var(--pad)]">
          <Link
            to="/"
            data-cursor="hover"
            className="group -ml-1 flex min-h-11 items-center gap-3 px-1"
          >
            <EPMark
              size={20}
              className="shrink-0 text-ink transition-opacity duration-300 group-hover:opacity-70"
              title=""
            />
            <span className="display-md hidden text-[0.9375rem] uppercase tracking-[-0.01em] text-ink transition-opacity duration-300 group-hover:opacity-70 min-[360px]:inline">
              Emanuel Pagés
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <LangToggle />
            <ThemeToggle />
            <Link
              to="/#work"
              data-cursor="hover"
              className="note group ml-1 inline-flex min-h-11 items-center gap-2.5 text-ink-dim transition-colors duration-300 hover:text-ink sm:ml-2"
            >
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              <span className="hidden sm:inline">{t.project.back}</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        aria-label={t.nav.label}
        className="fixed left-0 top-0 z-[100] h-16 w-full border-b-[3px] border-ink bg-ground lg:h-20"
      >
        <div className="flex h-full items-center justify-between gap-4 px-[var(--pad)]">
          <a
            href="#top"
            onClick={toTop}
            aria-label={t.nav.backToTop}
            data-cursor="hover"
            className="group -ml-1 flex min-h-11 items-center gap-3 px-1"
          >
            <EPMark
              size={20}
              className="shrink-0 text-ink transition-opacity duration-300 group-hover:opacity-70"
              title=""
            />
            <span className="display-md hidden text-[0.9375rem] uppercase tracking-[-0.01em] text-ink transition-opacity duration-300 group-hover:opacity-70 min-[360px]:inline">
              Emanuel Pagés
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {SECTION_IDS.map((id) => {
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  data-cursor="hover"
                  aria-current={isActive ? "location" : undefined}
                  className="note group relative inline-flex min-h-11 items-center"
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-ink-dim group-hover:text-ink"
                    }`}
                  >
                    {t.nav.sections[id]}
                  </span>
                  {/* Where you are is a stroke under the word — the same gesture
                      every other state on the site uses. */}
                  <span
                    aria-hidden
                    className={`absolute bottom-2.5 left-0 h-[2px] w-full bg-ink transition-transform duration-500 ease-bp ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ transformOrigin: "left" }}
                  />
                </a>
              );
            })}
            <div className="flex items-center gap-2">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LangToggle />
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-index"
              data-cursor="hover"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[7px]"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="block h-[2px] w-6 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="block h-[2px] w-6 bg-ink"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* The index sheet sits BELOW the masthead, not above it. The bar creates
          its own stacking context at z-100, so a close button inside it could
          never climb over a sheet at z-110 however high its own z-index was —
          verified in the browser: the X was rendering underneath, leaving a
          phone with no way out of the menu. Under the bar, the name, the mode
          switch and the X all stay on top of it and reachable. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-index"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-ground pt-16 lg:hidden"
          >
            <div className="border-t border-rule">
              {SECTION_IDS.map((id, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{
                    delay: 0.05 + i * 0.045,
                    duration: 0.35,
                    ease: EASE,
                  }}
                  className="invertible group flex w-full items-center border-b border-rule px-[var(--pad)] py-5 text-left"
                >
                  <span className="poster text-[clamp(1.5rem,8vw,2.75rem)] text-ink transition-colors duration-300 group-hover:text-ground">
                    {t.nav.sections[id]}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
