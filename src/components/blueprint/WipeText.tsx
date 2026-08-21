import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE } from "@/lib/motion";

/**
 * Text revealed by a hairline sweeping across it, leaving ink behind.
 *
 * The clip and the travelling edge run off identical timing, which is what
 * sells the illusion that the line is what draws the letters. The bottom inset
 * is negative so descenders sit outside the clip and survive the wipe.
 */
export function WipeText({
  as: Tag = "span",
  delay = 0,
  duration = 1.1,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const transition = { duration, ease: EASE, delay };

  return (
    <Tag className={`relative inline-block ${className}`}>
      <motion.span
        className="block"
        initial={{ clipPath: "inset(-20% 100% -30% 0)" }}
        whileInView={{ clipPath: "inset(-20% 0% -30% 0)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={transition}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -top-[0.1em] bottom-[-0.2em] w-px bg-ink"
        initial={{ left: "0%", opacity: 0 }}
        whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
        viewport={{ once: true, amount: 0.4 }}
        transition={transition}
      />
    </Tag>
  );
}
