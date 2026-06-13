import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { EASE } from "@/lib/motion";
import { useEnvironment } from "@/hooks/useEnvironment";

/** Counts up to `to` when scrolled into view; jumps to final value if reduced-motion. */
export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reducedMotion } = useEnvironment();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration: 1.4, ease: EASE });
    return controls.stop;
  }, [inView, to, reducedMotion, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
