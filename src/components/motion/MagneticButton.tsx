import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useEnvironment } from "@/hooks/useEnvironment";

/** A button that subtly follows the cursor (desktop, motion-allowed only). */
export function MagneticButton({
  children,
  onClick,
  className,
  strength = 0.4,
  "data-cursor": dataCursor,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
  "data-cursor"?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const move = (e: React.MouseEvent) => {
    if (!hasFinePointer || reducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
      data-cursor={dataCursor}
    >
      {children}
    </motion.button>
  );
}
