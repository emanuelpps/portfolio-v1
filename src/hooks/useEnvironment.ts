import { useEffect, useState } from "react";

/** matchMedia guarded for any render that happens without a window. */
const query = (q: string) =>
  typeof window !== "undefined" && window.matchMedia(q).matches;

/**
 * Detects the user's reduced-motion preference and whether the device has a
 * fine pointer (mouse). Used to gracefully degrade animations on touch devices
 * and for visitors who prefer reduced motion.
 */
export function useEnvironment() {
  // Read synchronously, not in the effect. Seeded to the desktop answer, a
  // phone spent its first paint believing it had a mouse: the rows in Work
  // render their own thumbnail only when there is no pointer to hang a preview
  // on, so the images were absent on the first frame and dropped in a tick
  // later, shoving every row below them down the page. The queries are
  // available before paint, so there is no reason to guess first and correct
  // afterwards. The effect below still runs — it is what keeps this honest
  // when the answer changes mid-visit.
  const [reducedMotion, setReducedMotion] = useState(
    () => query("(prefers-reduced-motion: reduce)"),
  );
  const [hasFinePointer, setHasFinePointer] = useState(() =>
    query("(pointer: fine)"),
  );

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
