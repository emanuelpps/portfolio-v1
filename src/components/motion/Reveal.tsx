import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, blurIn } from "@/lib/motion";

/** Reveals its children once they scroll into view. */
export function Reveal({
  children,
  variant = "fadeUp",
  className,
  amount = 0.3,
  delay = 0,
}: {
  children: ReactNode;
  variant?: "fadeUp" | "blurIn";
  className?: string;
  amount?: number;
  delay?: number;
}) {
  const v = variant === "blurIn" ? blurIn : fadeUp;
  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
