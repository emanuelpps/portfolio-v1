import { useEffect, useState } from "react";

/**
 * Which section the reader is currently in, for the nav index.
 *
 * The band is deliberately narrow — a strip across the upper third of the
 * viewport — so exactly one section qualifies at a time. Watching the whole
 * viewport instead makes two sections match during every transition and the
 * index flickers between them.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -70% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
