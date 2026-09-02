import { getLenis } from "@/lib/SmoothScroll";
import { Rule } from "@/components/blueprint/Rule";
import { useT } from "@/i18n";

const META = [
  { key: "GitHub", href: "https://github.com/emanuelpps" },
  { key: "LinkedIn", href: "https://www.linkedin.com/in/emanuel-ps" },
  { key: "Email", href: "mailto:emanuelpages.ps@gmail.com" },
];

/**
 * The title block at the foot of the sheet. Contact already closed the page
 * with the mark drawing itself, so there is nothing left for a footer to do
 * but state the facts in the annotation voice and offer a way back up.
 */
const Footer = () => {
  const t = useT();

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer data-invert className="relative z-10 w-full pt-10">
      {/* The page ends on paper: Contact inverts and the colophon stays there
          rather than snapping back to the dark ground for four lines. */}
      <Rule tick />
      <div className="inset-stem flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
        <p className="note text-ink-faint">{t.footer.copyright}</p>

        <p className="note text-ink-faint">{t.footer.builtWith}</p>

        <div className="flex flex-wrap items-center gap-6">
          {META.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="hover"
              className="note inline-flex min-h-11 items-center text-ink-dim transition-colors duration-300 hover:text-ink"
            >
              {key} ↗
            </a>
          ))}
          <button
            onClick={toTop}
            data-cursor="hover"
            className="note inline-flex min-h-11 items-center text-ink-dim transition-colors duration-300 hover:text-ink"
          >
            {t.footer.top}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
