import { useEffect, useState } from "react";

/**
 * Detects the user's reduced-motion preference and whether the device has a
 * fine pointer (mouse). Used to gracefully degrade animations on touch devices
 * and for visitors who prefer reduced motion.
 */
export function useEnvironment() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(true);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fp = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setReducedMotion(rm.matches);
      setHasFinePointer(fp.matches);
    };
    sync();
    rm.addEventListener("change", sync);
    fp.addEventListener("change", sync);
    return () => {
      rm.removeEventListener("change", sync);
      fp.removeEventListener("change", sync);
    };
  }, []);

  return { reducedMotion, hasFinePointer };
}
