import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * The system's one entrance gesture: a stroke drawing itself from its origin.
 *
 * The observed box and the animated box are deliberately not the same element.
 * A stroke starts at `scale: 0`, which collapses its intersection rect to zero
 * area — so a viewport trigger placed on that element can never fire, because
 * it is waiting to become visible before running the animation that would make
 * it visible. The wrapper never transforms, so it is always measurable; only
 * its child scales.
 */
export function DrawIn({
  axis = "x",
  origin,
  delay = 0,
  duration = 0.9,
  className = "",
  stroke = "",
}: {
  axis?: "x" | "y";
  /** Where the stroke starts from. Defaults to left for x, top for y. */
  origin?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number;
  /** Layout of the stroke's box. Carries no paint — the wrapper must stay invisible. */
  className?: string;
  /** What the stroke is painted with, e.g. "bg-rule". */
  stroke?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const from = origin ?? (axis === "x" ? "left" : "top");
  const hidden = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const shown = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };

  return (
    <div ref={ref} className={className}>
      <motion.div
        className={`h-full w-full ${stroke}`}
        style={{ transformOrigin: from }}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{ duration, ease: EASE, delay }}
      />
    </div>
  );
}
