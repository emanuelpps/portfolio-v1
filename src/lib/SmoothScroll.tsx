import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useEnvironment } from "@/hooks/useEnvironment";

let lenisInstance: Lenis | null = null;

/** Access the active Lenis instance (e.g. for programmatic scrollTo). */
export const getLenis = () => lenisInstance;

/**
 * Provides smooth, eased scrolling via Lenis. Disabled entirely when the user
 * prefers reduced motion, falling back to native scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const { reducedMotion } = useEnvironment();

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisInstance = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
