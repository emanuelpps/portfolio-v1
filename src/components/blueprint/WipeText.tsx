import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE, MASK_HIDDEN_Y } from "@/lib/motion";

/**
 * Text revealed by sliding up out of a hard-edged mask.
 *
 * As in DrawIn, the observed element is the mask and the animated element is
 * its child. The child starts translated fully below the mask's clip, so its
 * own intersection rect is empty — a viewport trigger sitting on it would wait
 * forever for an animation only that trigger could start. The mask itself
 * never moves, so it is always measurable.
 *
 * `trigger="mount"` is for anything above the fold, where a viewport trigger
 * buys nothing and only adds a way for the reveal not to fire.
 */
export function WipeText({
  as: Tag = "span",
  trigger = "view",
  delay = 0,
  duration = 0.9,
  className = "",
  children,
}: {
  as?: ElementType;
  trigger?: "mount" | "view";
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const show = trigger === "mount" || inView;

  return (
    <Tag ref={ref} className={`text-mask block ${className}`}>
      <motion.span
        className="block"
        initial={{ y: MASK_HIDDEN_Y }}
        animate={{ y: show ? "0%" : MASK_HIDDEN_Y }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
