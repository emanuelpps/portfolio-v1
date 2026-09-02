import { motion, type Variants } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * Poster lines that rise into place from behind their own mask.
 *
 * This exists to make one bug unrepeatable. A line is revealed by translating
 * it out from under an `overflow: hidden` mask, so in its initial state the
 * line is clipped to nothing — and an element with a zero-area intersection
 * rect is never reported visible by IntersectionObserver. Hang `whileInView`
 * on that element and the animation that would reveal it waits on itself
 * forever: the line never appears at all.
 *
 * It has now happened twice on this site. The first time it ate the hero's
 * headline and every section rule (see 46ccaa4, which set the rule: the
 * observed element and the animated element must be different ones). The
 * second time it ate the whole claim in Approach, and screenshots did not
 * catch it because the screenshot harness forces animations to their settled
 * state — which is exactly the state a deadlocked reveal never reaches.
 *
 * So the observer lives here, on the wrapper, which is never clipped. The
 * lines inside it only carry variants and cannot be given a trigger of their
 * own.
 *
 * `trigger="mount"` is required wherever the lines sit above the fold or bleed
 * off an edge: a viewport trigger needs a share of the element on screen, and
 * something already in view on the first paint may never cross the threshold
 * again.
 */
export function MaskedLines({
  lines,
  trigger = "view",
  delay = 0,
  stagger = 0.09,
}: {
  lines: string[];
  trigger?: "mount" | "view";
  delay?: number;
  stagger?: number;
}) {
  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  /* The mask allows room above the cap line for the rise to clear, and takes
     it straight back out as negative margin — see `.line-mask` in index.css. */
  const line: Variants = {
    hidden: { y: "115%" },
    show: { y: 0, transition: { duration: 1, ease: EASE } },
  };

  return (
    <motion.span
      className="block"
      variants={group}
      initial="hidden"
      {...(trigger === "mount"
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, amount: 0.3 } })}
    >
      {lines.map((text) => (
        <span key={text} className="line-mask">
          <motion.span className="block" variants={line}>
            {text}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
