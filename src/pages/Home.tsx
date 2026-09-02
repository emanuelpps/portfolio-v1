import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Contact } from "@/sections/Contact/Contact";
import Experience from "@/sections/Experience/Experience";
import { Hero } from "@/sections/Hero/Hero";
import Projects from "@/sections/Projects/Projects";
import Skills from "@/sections/Skills/Skills";
import Value from "@/sections/Value/Value";
import { NAV_OFFSET } from "@/lib/scrollToId";
import { getLenis } from "@/lib/SmoothScroll";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { useT } from "@/i18n";

const Home = () => {
  const t = useT();
  const { hash } = useLocation();

  /**
   * The tab title and the search snippet follow the language — a page entirely
   * in Spanish that announces itself as "Frontend Developer" in the tab strip
   * is still half in English where it is most visible.
   */
  useDocumentMeta(t.meta.title, t.meta.description);

  /**
   * Arriving with a hash — `/#work` from the sheet's way out, or a reload on a
   * link someone copied out of the masthead — has to land on the section. The
   * browser's own jump fires before React has rendered the section, so it hits
   * nothing; this runs after paint, when the element exists.
   */
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
      else el.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <main id="main-content" className="flex w-full flex-col items-center">
      {/* The approved order: the cover, then the work, then the argument for
          it. Approach used to run second, which asked a visitor to read a
          paragraph about how someone builds before being shown a single thing
          they built. */}
      <Hero />
      <Projects />
      <Value />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
};

export default Home;
