import { getLenis } from "@/lib/SmoothScroll";
import { useT } from "@/i18n";

const META = [
  { key: "GitHub", href: "https://github.com/emanuelpps" },
  { key: "LinkedIn", href: "https://www.linkedin.com/in/emanuel-ps" },
  { key: "Email", href: "mailto:emanuelpages.ps@gmail.com" },
];

/**
 * The colophon.
 *
 * Contact already closed the page with the mark on its block of ink, so there
 * is nothing left for this to do but state the facts and offer the way back
 * up. It used to invert the whole strip to paper and open on a hairline drawn
 * on scroll; both belonged to the discarded system. The ink block above it is
 * the divider — a rule under a block of solid ink is a rule nobody can see.
 */
const Footer = () => {
  const t = useT();

  const toTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full">
      <div className="gut flex flex-col items-start gap-4 py-6 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="text-[0.8125rem] font-medium text-ink-dim">
          {t.footer.copyright}
        </p>

        <p className="text-[0.8125rem] font-medium text-ink-dim">
          {t.footer.builtWith}
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {META.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor="hover"
              className="inline-flex min-h-11 items-center text-[0.8125rem] font-medium text-ink-dim transition-colors duration-300 hover:text-ink"
            >
              {key} ↗
            </a>
          ))}
          <button
            onClick={toTop}
            data-cursor="hover"
            className="inline-flex min-h-11 items-center text-[0.8125rem] font-semibold text-ink transition-opacity duration-300 hover:opacity-70"
          >
            {t.footer.top}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
