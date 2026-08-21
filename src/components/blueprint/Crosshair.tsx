import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEnvironment } from "@/hooks/useEnvironment";

/**
 * A registration mark for a cursor.
 *
 * The hero already corners itself with `+` marks the way a drafting sheet
 * does; this makes the pointer one of them. Over anything interactive the
 * crosshair opens into a target — the same idea as the bowl filling, applied
 * to the pointer instead of the control.
 *
 * Fine pointers only, and never under reduced motion: in both of those cases
 * the native cursor is left exactly where the OS put it.
 */
export function Crosshair() {
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const active = hasFinePointer && !reducedMotion;

  const [over, setOver] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 45, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 900, damping: 45, mass: 0.25 });

  useEffect(() => {
    if (!active) return;

    document.documentElement.style.cursor = "none";

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setOver(
        !!el?.closest?.(
          "a, button, input, textarea, select, [data-cursor='hover']",
        ),
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [active, x, y]);

  if (!active) return null;

  const arm = over ? 18 : 9;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
    >
      <motion.span
        className="absolute block h-px bg-white"
        animate={{ width: arm * 2, x: -arm }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute block w-px bg-white"
        animate={{ height: arm * 2, y: -arm }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="absolute block border border-white"
        animate={{
          width: over ? 30 : 0,
          height: over ? 30 : 0,
          x: over ? -15 : 0,
          y: over ? -15 : 0,
          opacity: over ? 0.6 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
