import { motion, useScroll, useSpring } from "framer-motion";

/**
 * The spine the whole document hangs from — the vertical the E and the P share
 * in the mark.
 *
 * It doubles as the scroll indicator: the read portion of the page is drawn on
 * the stem in solid ink, growing from the top. That is deliberate. A separate
 * progress bar would be a second vertical line competing with this one, and
 * the mark only has one.
 */
export function Stem() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.4,
  });

  return (
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
  );
}
