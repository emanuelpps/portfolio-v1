import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch } from "react-router-dom";
import { useActiveSection } from "@/hooks/useActiveSection";
import { getLenis } from "@/lib/SmoothScroll";
import { EPMark } from "@/components/blueprint/EPMark";
import { SECTIONS } from "@/data/sections";
import { EASE } from "@/lib/motion";

/**
 * The nav sits flush against the top edge on a single hairline and aligns its
 * mark to the stem, so the vertical running down the page appears to start
 * here. A rounded capsule floating over the content would be the one element
 * on the site with a radius that isn't the P's bowl.
 *
 * The entries are names, not numbered names. Where you are is marked by a
 * stroke under the word, the same gesture every other state on the site uses.
 */
const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onProjectPage = useMatch("/project/:projectId");

  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the mobile index is open.
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

  // Sections are addressed by id rather than through the scroll context: the
  // index lists Approach, which has no ref of its own, and an id works for
  // every entry without widening the context for one of them.
  const go = (id: string) => {
    setOpen(false);
    const jump = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: "smooth" });
    };
    setTimeout(jump, open ? 260 : 0);
  };

  const toTop = () => {
    setOpen(false);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The project sheet is a full-screen overlay with its own way out.
  if (onProjectPage) return null;

  return (
    <>
      <nav
        aria-label="Sections"
        className={`fixed left-0 top-0 z-[100] w-full transition-colors duration-500 ${
          scrolled
            ? "border-b border-rule bg-ground"
            : "border-b border-transparent"
        }`}
      >
        <div className="inset-stem flex h-16 items-center justify-between gap-6 md:h-20">
          <button
            onClick={toTop}
            data-cursor="hover"
            aria-label="Back to top"
            className="ml-[calc(var(--gutter)_*_-1)] flex h-10 items-center text-ink transition-opacity duration-300 hover:opacity-70"
          >
            <EPMark size={22} />
          </button>

          <div className="hidden items-center gap-9 lg:flex">
            {SECTIONS.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  data-cursor="hover"
                  aria-current={isActive ? "true" : undefined}
                  className="note group relative py-2 transition-colors duration-300"
                >
                  <span
                    className={
                      isActive ? "text-ink" : "text-ink-dim group-hover:text-ink"
                    }
                  >
                    {l.label}
                  </span>
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-0 h-px w-full bg-ink transition-transform duration-500 ease-bp ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ transformOrigin: "left" }}
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-cursor="hover"
            className="relative z-[120] flex h-10 w-10 flex-col items-end justify-center gap-2 lg:hidden"
          >
            <motion.span
              animate={
                open
                  ? { rotate: 45, y: 4.5, width: 24 }
                  : { rotate: 0, y: 0, width: 24 }
              }
              className="block h-px bg-ink"
            />
            <motion.span
              animate={
                open
                  ? { rotate: -45, y: -4.5, width: 24 }
                  : { rotate: 0, y: 0, width: 14 }
              }
              className="block h-px bg-ink"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-[110] flex flex-col justify-center bg-ground lg:hidden"
          >
            <div className="from-stem border-t border-rule">
              {SECTIONS.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => go(l.id)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{
                    delay: 0.06 + i * 0.05,
                    duration: 0.4,
                    ease: EASE,
                  }}
                  className="invertible group flex w-full items-baseline border-b border-rule px-[var(--gutter)] py-6 text-left"
                >
                  <span className="display-md text-4xl text-ink transition-colors group-hover:text-ground">
                    {l.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
