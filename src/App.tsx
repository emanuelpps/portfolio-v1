import { useEffect } from "react";
import AppRoutes from "./routes/Router";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";
import { useT } from "@/i18n";

/**
 * The stem and the crosshairs that used to sit behind everything are gone.
 * They belonged to the blueprint system the redesign replaced — a faint
 * vertical and four registration marks reading as leftover scaffolding under a
 * poster whose whole structure is now carried by the rules themselves.
 */
function App() {
  const t = useT();

  /**
   * The tab title and the search snippet follow the language too — a page that
   * is entirely in Spanish but announces itself as "Frontend Developer" in the
   * tab strip is still half in English where it is most visible.
   *
   * The `og:` tags are deliberately left alone: they are read by scrapers that
   * do not run JavaScript, so changing them here would only make the markup
   * disagree with what actually gets shared.
   */
  useEffect(() => {
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
  }, [t]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-ground">
      <a href="#main-content" className="skip-link">
        {t.nav.skip}
      </a>
      <Header />
      <div className="relative z-10">
        <AppRoutes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
