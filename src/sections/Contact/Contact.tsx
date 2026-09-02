import { motion } from "framer-motion";
import { Form } from "./components/Form";
import { EPMark } from "@/components/blueprint/EPMark";
import { useT } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * Contact — the close.
 *
 * It leaves `BpSection` like the rest, and it also drops the `invert` it used
 * to carry. Flipping the whole section to paper was a leftover from the
 * discarded system; in the approved design the page stays in its own mode to
 * the end and the only block of solid ink is the one the mark is knocked out
 * of. That block appears exactly twice on the site — the cover opens on it and
 * this closes on it — which is the whole reason it reads as a signature rather
 * than as decoration.
 *
 * The availability line is `hero.available`. The cover and the close make the
 * same claim, so they read from the same string rather than from two that can
 * drift apart.
 */

const LINKS = [
  {
    key: "Email",
    label: "emanuelpages.ps@gmail.com",
    href: "mailto:emanuelpages.ps@gmail.com",
  },
  {
    key: "GitHub",
    label: "github.com/emanuelpps",
    href: "https://github.com/emanuelpps",
  },
  {
    key: "LinkedIn",
    label: "linkedin.com/in/emanuel-ps",
    href: "https://www.linkedin.com/in/emanuel-ps",
  },
];

export const Contact = () => {
  const t = useT();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="w-full pt-24 sm:pt-32"
    >
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="gut flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 pb-6 sm:pb-7"
      >
        <h2
          id="contact-title"
          className="poster text-[clamp(2.5rem,9vw,4rem)] text-ink"
        >
          {t.nav.sections.contact}
        </h2>
        {/* Not colour-only: the square is the punctuation, the words are the
            information. A dot would be the one circle on a site whose only
            curve is the P's bowl. */}
        <p className="note flex items-center gap-2.5 text-ink">
          <span aria-hidden className="block h-2.5 w-2.5 shrink-0 bg-ink" />
          {t.hero.available}
        </p>
      </motion.header>

      <div className="h-[3px] w-full bg-ink" />

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="flex flex-col gap-7 border-b border-rule px-[var(--pad)] py-9 lg:col-span-5 lg:border-b-0 lg:border-r lg:py-10">
          <p className="poster text-[clamp(1.75rem,3.6vw,2.625rem)] leading-[0.94] text-ink">
            {t.contact.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <p className="max-w-[46ch] text-[1.0625rem] leading-[1.55] text-ink-2">
            {t.contact.lead}
          </p>

          <ul className="flex flex-col">
            {LINKS.map(({ key, label, href }) => (
              <li key={key} className="border-t border-rule">
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor="hover"
                  className="group flex min-h-11 items-center gap-5 py-3"
                >
                  <span className="label w-[4.875rem] shrink-0 text-ink-dim">
                    {key}
                  </span>
                  <span className="text-[0.9375rem] font-medium text-ink-2 transition-colors duration-300 group-hover:text-ink">
                    {label}
                  </span>
                  <span
                    aria-hidden
                    className="ml-auto text-[0.9375rem] font-semibold text-ink-dim transition-transform duration-300 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-[var(--pad)] py-9 lg:col-span-7 lg:py-10">
          <Form />
        </div>
      </div>

      <div className="h-[3px] w-full bg-ink" />

      {/* The document signs itself: the mark drawing its own three strokes, on
          the block it has occupied since the cover. */}
      <div className="on-ink grid place-items-center bg-ink py-16 sm:py-20">
        <EPMark
          size="clamp(6rem, 14vw, 9.375rem)"
          weight={11}
          traced
          className="text-ground"
          title="Emanuel Pagés"
        />
      </div>
    </section>
  );
};
