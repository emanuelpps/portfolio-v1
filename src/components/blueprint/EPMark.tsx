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

export function EPMark({
  size = 40,
  traced = false,
  className = "",
  title = "Emanuel Pagés",
}: {
  size?: number;
  /** Draw the strokes on entering the viewport instead of appearing whole. */
  traced?: boolean;
  className?: string;
  title?: string;
}) {
  // The svg is observed, not the paths. An undrawn path renders nothing, and
  // hanging the trigger off it invites the same deadlock as DrawIn.
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 160"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={9}
      strokeLinecap="square"
    >
      {PATHS.map((d, i) =>
        traced ? (
          <motion.path
            key={d}
            d={d}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: i * 0.22 }}
          />
        ) : (
          <path key={d} d={d} />
        ),
      )}
    </svg>
  );
}
