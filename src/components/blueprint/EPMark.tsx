import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * The mark, rebuilt as strokes so it can draw itself.
 *
 * Read as a path: up the shared stem, across the top, around the P's bowl and
 * back in to the middle bar — then the E's right edge and its foot. Three
 * strokes, one continuous idea. The geometry here is the same geometry the
 * rest of the site is built from: the bowl's radius is exactly half the height
 * it spans, which is the clamp `.bowl` reproduces in CSS.
 */
const PATHS = [
  // stem -> top bar -> bowl -> middle bar
  "M10 150 V10 H108 A35 35 0 0 1 108 80 H10",
  // the E's right edge, closing both counters
  "M72 10 V150",
  // the foot
  "M10 150 H72",
];

/*
 * Sized through CSS rather than the width/height attributes so a caller can
 * hand it a clamp() — the hero draws the mark at poster scale and has to scale
 * it with the viewport.
 */
export function EPMark({
  size = 40,
  traced = false,
  trigger = "view",
  hairline = false,
  weight = 9,
  className = "",
  title = "Emanuel Pagés",
}: {
  /** Any CSS length; numbers are treated as px. */
  size?: number | string;
  /** Draw the strokes on arrival instead of appearing whole. */
  traced?: boolean;
  /**
   * When a traced mark starts drawing. "mount" is required wherever the mark
   * bleeds off an edge — a viewport trigger needs a share of the element on
   * screen, and a mark half outside the viewport may never reach it.
   */
  trigger?: "mount" | "view";
  /**
   * Hold the stroke at a constant device width however large the mark is drawn.
   * The stroke is proportional by default, which is faithful to the mark at
   * badge size but turns it into a heavy slab at poster scale — and the mark is
   * a monoline. With this on, `weight` is read as device pixels.
   */
  hairline?: boolean;
  weight?: number;
  className?: string;
  title?: string;
}) {
  // The svg is observed, not the paths. An undrawn path renders nothing, and
  // hanging the trigger off it invites the same deadlock as DrawIn.
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const draw = trigger === "mount" || inView;

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 160"
      style={{ width: size, height: size }}
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="square"
      vectorEffect={hairline ? "non-scaling-stroke" : undefined}
    >
      {PATHS.map((d, i) =>
        traced ? (
          <motion.path
            key={d}
            d={d}
            vectorEffect={hairline ? "non-scaling-stroke" : undefined}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: draw ? 1 : 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.22 }}
          />
        ) : (
          <path
            key={d}
            d={d}
            vectorEffect={hairline ? "non-scaling-stroke" : undefined}
          />
        ),
      )}
    </svg>
  );
}
