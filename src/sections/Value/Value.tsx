import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { MaskedLines } from "@/components/blueprint/MaskedLines";
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
            shared and left to break.

            The reveal goes through MaskedLines because the first version hung
            whileInView on each line inside its own mask, where the line starts
            clipped to nothing and is therefore never reported visible. The
            claim never appeared at all: between the rule and "The edge" there
            was blank page. */}
        <p className="poster max-w-[68rem] text-[length:var(--claim-size)] text-ink">
          <MaskedLines lines={t.approach.quoteLines} />
        </p>
      </blockquote>

      <div className="h-[3px] w-full bg-ink" />

      {/* The argument runs the full width, and the three cells sit under it.
          It was a side-by-side split — 7/5 first, then 6/6 — and both were
          hostage to how long the paragraph happened to be: one paragraph is
          never the height of three stacked cells, so the short column ended
          in a rectangle of nothing with a rule down one side. The paragraph
          then got rewritten shorter, for good reasons that have nothing to do
          with layout, and the hole came straight back.

          Stacked, the copy can be any length it wants. That is the point: text
          is not written to fill a box. */}
      <motion.div
        variants={rise}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="gut flex flex-col gap-5 border-b border-rule py-9 lg:py-11"
      >
        <p className="label text-ink-dim">{t.approach.edgeLabel}</p>
        <p className="max-w-[54ch] text-[clamp(1.0625rem,1.72vw,1.375rem)] leading-[1.5] text-ink-2">
          {t.approach.lead}
        </p>
      </motion.div>

      {/* Three across, divided the way Stack's grid is. The closing rule is on
          the wrapper so the section ends on an edge like every other one. */}
      <div className="grid grid-cols-1 border-b border-rule sm:grid-cols-3">
        {record.map(({ key, figure, note }) => (
          <div
            key={key}
            className="border-b border-rule px-[var(--pad)] py-6 sm:border-b-0 sm:border-r sm:py-7"
          >
            <p className="label text-ink-dim">{key}</p>
            <p className="display-md mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] text-ink">
              {figure}
            </p>
            <p className="note mt-1.5 text-ink-dim">{note}</p>
          </div>
        ))}

        <div className="px-[var(--pad)] py-6 sm:py-7">
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
    </section>
  );
};

export default Value;
