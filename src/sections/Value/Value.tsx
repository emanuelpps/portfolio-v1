import { Link } from "react-router-dom";
import { BpSection } from "@/components/blueprint/Section";
import { Cell, CellGrid } from "@/components/blueprint/Cell";
import { WipeText } from "@/components/blueprint/WipeText";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";
import { fill, useT } from "@/i18n";

const projects = rawProjects as ProjectTypes[];
const epic = projects.find((p) => p.id === 11);

const inlineLink =
  "border-b border-ink/40 pb-0.5 text-ink transition-colors duration-300 hover:border-ink";

/**
 * The claim gets said once, at size.
 *
 * This used to be two cells of body copy sitting at exactly the scale of every
 * other paragraph on the page, which meant the one sentence explaining what
 * makes him different was doing no more work than a caption. It is a pull
 * quote now — the second largest thing on the site after the cover.
 */
const Value = () => {
  const t = useT();

  /**
   * Counted off the index on this same page rather than typed in by hand, so
   * the section cannot drift out of step with the work it summarises — and
   * there is no figure here a visitor cannot verify by scrolling down.
   */
  const record = [
    { key: t.approach.record.digitalKey, value: t.approach.record.digitalValue },
    { key: t.approach.record.reactKey, value: t.approach.record.reactValue },
    {
      key: t.approach.record.indexedKey,
      value: fill(t.approach.record.indexedValue, {
        projects: projects.length,
        libraries: projects.filter((p) => p.type === "Library").length,
      }),
    },
  ];

  return (
    <BpSection id="approach" label={t.nav.sections.approach}>
      <div className="inset-stem pt-8 sm:pt-10">
        <blockquote className="display max-w-5xl text-[clamp(2rem,6vw,4.75rem)] text-ink">
          {t.approach.quoteLines.map((line, i) => (
            <WipeText key={line} delay={i * 0.1}>
              {line}
            </WipeText>
          ))}
        </blockquote>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          {t.approach.lead}
        </p>
      </div>

      <div className="mt-12 from-stem">
        <CellGrid cols="grid-cols-1 lg:grid-cols-2">
          <Cell>
            <p className="note text-ink-dim">{t.approach.indieLabel}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              {t.approach.indieBefore}
              <Link
                to="/project/11"
                state={epic}
                data-cursor="hover"
                className={inlineLink}
              >
                Epic Sound Studio
              </Link>
              {t.approach.indieAfter}
            </p>
          </Cell>

          <Cell>
            <p className="note text-ink-dim">{t.approach.recordLabel}</p>
            <dl className="mt-4 flex flex-col">
              {record.map(({ key, value }) => (
                <div
                  key={key}
                  className="flex flex-col gap-1 border-b border-rule-soft py-3.5 last:border-b-0 sm:flex-row sm:gap-6"
                >
                  <dt className="note w-28 shrink-0 text-ink-dim">{key}</dt>
                  <dd className="text-ink-2">{value}</dd>
                </div>
              ))}
            </dl>
          </Cell>
        </CellGrid>
      </div>
    </BpSection>
  );
};

export default Value;
