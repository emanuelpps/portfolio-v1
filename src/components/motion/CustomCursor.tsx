import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useEnvironment } from "@/hooks/useEnvironment";

/**
 * A small accent dot that trails the cursor and grows over interactive
 * elements marked with `data-cursor="hover"`. Renders nothing on touch
 * devices or when reduced motion is preferred.
 */
export function CustomCursor() {
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 28 });
  const ry = useSpring(y, { stiffness: 350, damping: 28 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hasFinePointer || reducedMotion) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) =>
      setHovering(!!(e.target as HTMLElement).closest('[data-cursor="hover"]'));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [hasFinePointer, reducedMotion, x, y]);

  if (!hasFinePointer || reducedMotion) return null;
  return (
    <motion.div
      style={{ x: rx, y: ry }}
      className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      animate={{ scale: hovering ? 2.4 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-3 w-3 rounded-full bg-white" />
    </motion.div>
  );
}
