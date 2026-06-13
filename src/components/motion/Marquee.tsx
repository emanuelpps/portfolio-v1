import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Infinite horizontal marquee. Duplicates children once for a seamless loop. */
export function Marquee({
  children,
  speed = 30,
  reverse = false,
  className,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 gap-12 pr-12">{children}</div>
        <div className="flex shrink-0 gap-12 pr-12" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
