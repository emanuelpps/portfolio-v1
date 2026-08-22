import { Link } from "react-router-dom";
import { BpSection } from "@/components/blueprint/Section";
import { Cell, CellGrid } from "@/components/blueprint/Cell";
import { SpecList } from "@/components/blueprint/SpecList";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";

const projects = rawProjects as ProjectTypes[];
const epic = projects.find((p) => p.id === 11);

/**
 * Figures are stated, not performed.
 *
 * These are counted off the index on this same page rather than typed in by
 * hand, so the section cannot drift out of step with the work it summarises —
 * and there is no number here a visitor cannot verify by scrolling down.
 */
const RECORD = [
  {
    key: "In digital",
    value: "10 years — marketing, growth and SEO before frontend",
  },
  { key: "In React", value: "3 years shipping production TypeScript" },
  {
    key: "Indexed",
    value: `${projects.length} projects, ${
      projects.filter((p) => p.type === "Library").length
    } of them open-source libraries`,
  },
  { key: "Latest", value: "Ticketing platform — Dizizid, 2026" },
];

const inlineLink =
  "border-b border-ink/40 pb-0.5 text-ink transition-colors duration-300 hover:border-ink";

const Value = () => {
  return (
    <BpSection
      id="approach"
      label="Approach"
      title="A developer who thinks like a marketer."
    >
      <div className="mt-16 from-stem">
        <CellGrid cols="grid-cols-1 lg:grid-cols-2">
          <Cell pad="px-[var(--gutter)] py-8 sm:py-12">
            <p className="note text-ink-faint">The edge</p>
            <p className="mt-6 text-lg font-light leading-relaxed text-ink-dim">
              Most frontend developers ship what is in the Figma. I ship what
              performs. A decade running growth, SEO and paid campaigns taught
              me how people actually behave on a page — so the interfaces I
              build are engineered for clarity, speed and conversion, not only
              for pixel fidelity.
            </p>
          </Cell>

          <Cell pad="px-[var(--gutter)] py-8 sm:py-12">
            <p className="note text-ink-faint">Also an indie hacker</p>
            <p className="mt-6 text-lg font-light leading-relaxed text-ink-dim">
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
        </CellGrid>

        <div className="gut py-10">
          <SpecList items={RECORD} className="max-w-3xl" />
        </div>
      </div>
    </BpSection>
  );
};

export default Value;
