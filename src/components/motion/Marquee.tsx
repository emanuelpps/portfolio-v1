import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEnvironment } from "@/hooks/useEnvironment";

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
  const { reducedMotion } = useEnvironment();
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max"
        animate={reducedMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: speed, ease: "linear", repeat: Infinity }
        }
      >
        <div className="flex shrink-0 gap-12 pr-12">{children}</div>
        <div className="flex shrink-0 gap-12 pr-12" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
