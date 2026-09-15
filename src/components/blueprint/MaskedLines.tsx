import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
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
 * The third time it ate the claim again, and only ever after a language
 * switch. The reveal used to be `whileInView`, which holds "show" in a
 * one-shot gesture: once the observer has fired it is disconnected, and the
 * state it set exists nowhere a component can read. Changing language changes
 * every line, so React unmounts all of them and mounts new ones — which
 * inherit `initial="hidden"` and then wait for a trigger that already fired
 * and will never fire again. They park at 115% under their own mask and stay
 * there. The Approach claim went blank; the hero, whose `animate` is a plain
 * prop, did not, and that is the whole difference.
 *
 * So the in-view state is held in `animate` rather than in a gesture. A prop
 * is inherited by whatever mounts later; a fired gesture is not.
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

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.span
      ref={ref}
      className="block"
      variants={group}
      initial="hidden"
      animate={trigger === "mount" || inView ? "show" : "hidden"}
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
