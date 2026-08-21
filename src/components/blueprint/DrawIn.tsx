import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type Axis = "x" | "y";

/**
 * The system's one entrance gesture: a line drawing itself from its origin.
 *
 * Everything structural in Blueprint arrives this way rather than fading up —
 * a drafting table builds a page out of strokes, and a stroke has a direction.
 * Scale is the only property animated, so this stays on the compositor.
 */
export function DrawIn({
  axis = "x",
  origin,
  delay = 0,
  duration = 0.9,
  className,
  children,
}: {
  axis?: Axis;
  /** Where the stroke starts from. Defaults to left for x, top for y. */
  origin?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number;
  className?: string;
  children?: ReactNode;
}) {
  const from = origin ?? (axis === "x" ? "left" : "top");
  const hidden = axis === "x" ? { scaleX: 0 } : { scaleY: 0 };
  const shown = axis === "x" ? { scaleX: 1 } : { scaleY: 1 };

  return (
    <motion.div
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration, ease: EASE, delay }}
      style={{ transformOrigin: from }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
