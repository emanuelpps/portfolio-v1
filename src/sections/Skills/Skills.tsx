import { Fragment } from "react";
import { motion } from "framer-motion";
import { STACK } from "@/data/Stack";
import { fill, useT } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * Stack — the tightest section on the site, on purpose.
 *
 * Density is a composition tool. Work is the loosest thing on the page and
 * this sits immediately after it; the contrast between the two is what gives
 * the scroll a shape. So the groups are cells of one ruled grid rather than
 * cards with air around them, and the section carries no lead paragraph.
 *
 * The names are set as running type, not as a list with a hairline under every
 * entry. Thirty-seven rows of one word each is a column of stubs — the eye
 * reads a group, not a table, and a group reads faster as a sentence of names.
 */

/** Derived, never typed. A number standing next to the list it counts has to
 *  be that list, or it is just a claim with a digit in it. */
const ENTRIES = STACK.reduce((n, group) => n + group.items.length, 0);

const Skills = () => {
  const t = useT();

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="w-full pt-16 sm:pt-20"
    >
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="gut flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 pb-6 sm:pb-7"
      >
        <h2
          id="stack-title"
          className="poster text-[clamp(2.5rem,9vw,4rem)] text-ink"
        >
          {t.nav.sections.stack}
        </h2>
        {/* What is being studied used to be a paragraph of its own under the
            grid. It is one clause, and it belongs where every other section
            keeps its one clause: on the right of the head. */}
        <p className="note text-ink-dim">
          {fill(t.stack.note, { count: ENTRIES, studying: t.stack.studying })}
        </p>
      </motion.header>

      <div className="h-[3px] w-full bg-ink" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((group, i) => {
          const copy = t.stack.groups[group.id];
          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
              /* Every cell rules its right and bottom edge, then the cell that
                 ends a row gives its right rule back. Which cell that is
                 changes with the breakpoint, so the exception is declared per
                 breakpoint rather than baked into the markup. */
              className="flex flex-col gap-4 border-b border-rule px-[var(--pad)] py-7 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-md text-[1.375rem] text-ink">
                  {copy.title}
                </h3>
                <span className="note shrink-0 text-ink-dim">{copy.note}</span>
              </div>

              {/* Each name is one unbreakable unit and the separators carry
                  the line breaks. Joined into a single string the browser
                  wrapped inside a name — "HTML 5" came out as "HTML" on one
                  line and "5" on the next, which reads as two entries. */}
              <p className="text-pretty text-base font-medium leading-[1.75] text-ink-2">
                {group.items.map((item, i) => (
                  <Fragment key={item}>
                    {i > 0 && " · "}
                    <span className="whitespace-nowrap">{item}</span>
                  </Fragment>
                ))}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
