import { useMemo } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTIONS } from "@/data/sections";
import { EASE } from "@/lib/motion";

/**
 * The spine the whole document hangs from — the vertical the E and the P share
 * in the mark.
 *
 * It carries two things nothing else has to repeat. The read portion of the
 * page is drawn on it in solid ink, which is why there is no progress bar: a
 * second vertical would be competing with this one, and the mark only has one.
 * And the name of the section you are in runs up it, which is why the sections
 * themselves no longer wear a number and a label. Numbering every heading
 * `01 /`, `02 /` is a costume; a spine that tells you where you are is the
 * building actually doing the work.
 */
export function Stem() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.4,
  });

  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);
  const label = SECTIONS.find((s) => s.id === active)?.label;

  return (
    <>
      <div
        aria-hidden
        className="stem-x pointer-events-none fixed inset-y-0 z-0 w-px"
      >
        <div className="absolute inset-0 bg-rule" />
        <motion.div
          style={{ scaleY: progress, transformOrigin: "top" }}
          className="absolute inset-0 bg-ink/60"
        />
      </div>

      {/* Reading up the spine, set in the display serif so it belongs to the
          headings it replaced rather than to the interface. */}
      <div
        aria-hidden
        className="stem-x pointer-events-none fixed bottom-10 z-[5] hidden md:block"
      >
        <AnimatePresence mode="wait">
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ writingMode: "vertical-rl" }}
              className="display-md block rotate-180 pl-2 text-sm text-ink-faint"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
