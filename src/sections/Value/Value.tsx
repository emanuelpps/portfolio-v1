import { Link } from "react-router-dom";
import { BpSection } from "@/components/blueprint/Section";
import { Cell, CellGrid } from "@/components/blueprint/Cell";
import { WipeText } from "@/components/blueprint/WipeText";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";

const projects = rawProjects as ProjectTypes[];
const epic = projects.find((p) => p.id === 11);

/**
 * Counted off the index on this same page rather than typed in by hand, so the
 * section cannot drift out of step with the work it summarises — and there is
 * no figure here a visitor cannot verify by scrolling down.
 */
const RECORD = [
  { key: "In digital", value: "10 years — marketing, growth and SEO" },
  { key: "In React", value: "3 years shipping production TypeScript" },
  {
    key: "Indexed",
    value: `${projects.length} projects · ${
      projects.filter((p) => p.type === "Library").length
    } open-source libraries`,
  },
];

const inlineLink =
  "border-b border-ink/40 pb-0.5 text-ink transition-colors duration-300 hover:border-ink";

/**
 * The claim gets said once, at size.
 *
 * This used to be two cells of body copy sitting at exactly the scale of every
 * other paragraph on the page, which meant the one sentence explaining what
 * makes him different was doing no more work than a caption. It is a pull
 * quote now — the second largest thing on the site after his name.
 */
const Value = () => {
  return (
    <BpSection id="approach" label="Approach">
      <div className="inset-stem pt-8 sm:pt-10">
        <blockquote className="display max-w-5xl text-[clamp(2rem,6vw,4.75rem)] text-ink">
          <WipeText>A developer who</WipeText>
          <WipeText delay={0.1}>thinks like a marketer.</WipeText>
        </blockquote>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          Most frontend developers ship what is in the Figma. I ship what
          performs. A decade running growth, SEO and paid campaigns taught me
          how people actually behave on a page — so the interfaces I build are
          engineered for clarity, speed and conversion, not only for pixel
          fidelity.
        </p>
      </div>

      <div className="mt-12 from-stem">
        <CellGrid cols="grid-cols-1 lg:grid-cols-2">
          <Cell>
            <p className="note text-ink-dim">Also an indie hacker</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              Beyond client work I design and ship my own products — like{" "}
              <Link
                to="/project/11"
                state={epic}
                data-cursor="hover"
                className={inlineLink}
              >
                Epic Sound Studio
              </Link>
              , a music-streaming app built on the open Audius network. Same
              stack, no brief, every decision mine.
            </p>
          </Cell>

          <Cell>
            <p className="note text-ink-dim">The record</p>
            <dl className="mt-4 flex flex-col">
              {RECORD.map(({ key, value }) => (
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
