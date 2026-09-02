import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { counts, findProject } from "@/sections/Projects/work";
import { fill, useT } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * Approach — the claim, said once and at size.
 *
 * It leaves `BpSection` like Work did, and for the same reason: that shell is
 * the discarded Blueprint system, and a page where one section opens like a
 * poster and the next opens like a blueprint is two designs. The head is the
 * head every section has now — the name at poster scale, the note on the
 * right, the 3px rule underneath.
 *
 * Below it the section is three bands: the claim, then a split with the
 * argument on the left and the record on the right. Nothing here is a card.
 * The divisions are rules, which is the only way this system has ever divided
 * anything.
 *
 * That split is 6/6, not the artboard's 7/5, and the left column centres its
 * content. One paragraph will never be as tall as three stacked cells, so at
 * 7/5 the argument ended 200px above the figures beside it and left a dark
 * rectangle with a rule down one side. Widening the right column pulls the
 * indie sentence onto two lines instead of three and narrowing the left one
 * pushes the paragraph onto more; between them the gap fell to about 100px,
 * and centring splits what is left evenly above and below, where it reads as
 * the padding of a column rather than as the end of one.
 */

const epic = findProject("11");

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const Value = () => {
  const t = useT();

  /**
   * Figures are stated, never counted up. A number that animates is asking to
   * be believed, and these are small enough and true enough to just say.
   *
   * The library count is the one figure derived rather than written, so it
   * cannot drift from the index two sections above it.
   */
  const record = [
    {
      key: t.approach.record.digitalKey,
      figure: t.approach.record.digitalFigure,
      note: t.approach.record.digitalNote,
    },
    {
      key: t.approach.record.reactKey,
      figure: t.approach.record.reactFigure,
      note: t.approach.record.reactNote,
    },
  ];

  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
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
          id="approach-title"
          className="poster text-[clamp(2.5rem,9vw,4rem)] text-ink"
        >
          {t.nav.sections.approach}
        </h2>
        <p className="note text-ink-dim">{t.approach.note}</p>
      </motion.header>

      <div className="h-[3px] w-full bg-ink" />

      {/* The one sentence that separates him from any other React developer,
          set as the second largest thing on the site. It used to be two cells
          of body copy at exactly the scale of every other paragraph, which
          meant it did no more work than a caption. */}
      <blockquote className="gut py-12 sm:py-16 lg:py-20">
        {/* See --claim-size in index.css: the longest line is a different word
            in each language, so the size is tuned per language rather than
            shared and left to break. */}
        <p className="poster max-w-[68rem] text-[length:var(--claim-size)] text-ink">
          {t.approach.quoteLines.map((line, i) => (
            <span key={line} className="line-mask">
              <motion.span
                className="block"
                initial={{ y: "115%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.09 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </p>
      </blockquote>

      <div className="h-[3px] w-full bg-ink" />

      {/* The block closes on a hairline, like every other section does. Without
          it Approach was the one section that simply stopped: Work ends on the
          last divider of its index, Stack on the last rule of its grid, Record
          on the last row of the ledger — and then the air belongs to whatever
          comes next. Here the air had nothing to belong to, so it read as a
          hole at the foot of Approach rather than as the opening of Stack.

          It sits on the wrapper rather than on the cells so that it is drawn at
          the true bottom of the row whichever column turns out to be taller. */}
      <div className="grid grid-cols-1 border-b border-rule lg:grid-cols-12">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col gap-5 border-b border-rule px-[var(--pad)] py-9 lg:col-span-6 lg:justify-center lg:border-b-0 lg:border-r lg:py-11"
        >
          <p className="label text-ink-dim">{t.approach.edgeLabel}</p>
          {/* 22px on a 44-character measure, which is the artboard's setting
              and not the one this had. At 19.8px across 52 characters the
              paragraph ran six short lines and the column ended 200px above
              the three cells beside it — a dark rectangle with a rule down one
              side, which is what a hole looks like. The same words set at the
              size they were drawn at, in a proper column, very nearly close
              it. */}
          <p className="max-w-[48ch] text-[clamp(1.0625rem,1.72vw,1.375rem)] leading-[1.5] text-ink-2">
            {t.approach.lead}
          </p>
        </motion.div>

        <div className="flex flex-col lg:col-span-6">
          {record.map(({ key, figure, note }) => (
            <div
              key={key}
              className="border-b border-rule px-[var(--pad)] py-5 sm:py-6"
            >
              <p className="label text-ink-dim">{key}</p>
              <p className="display-md mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">
                {figure}
              </p>
              <p className="note mt-1.5 text-ink-dim">{note}</p>
            </div>
          ))}

          <div className="px-[var(--pad)] py-5 sm:py-6">
            <p className="label text-ink-dim">{t.approach.indieLabel}</p>
            <p className="mt-2.5 text-[1.0625rem] leading-[1.5] text-ink-2">
              {t.approach.indieBefore}
              {/* The one inline link on the page. It goes to the sheet the
                  sentence is naming, so the claim can be checked in one click
                  rather than being taken on trust. */}
              <Link
                to="/project/11"
                data-cursor="hover"
                className="border-b border-ink/40 pb-0.5 text-ink transition-colors duration-300 hover:border-ink"
              >
                {epic?.title ?? "Epic Sound Studio"}
              </Link>
              {fill(t.approach.indieAfter, { libraries: counts.Libraries })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Value;
