import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";
import ProjectCard from "./ProjectCard";
import { SectionLabel, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { EASE } from "@/lib/motion";

const FILTERS = ["All", "Projects", "Libraries"] as const;
type Filter = (typeof FILTERS)[number];

const matches = (p: ProjectTypes, f: Filter) =>
  f === "All" ? true : f === "Libraries" ? p.type === "Library" : p.type !== "Library";

export const ProjectsContainer = () => {
  const projects = rawProjects as ProjectTypes[];
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(
    () => ({
      All: projects.length,
      Projects: projects.filter((p) => p.type !== "Library").length,
      Libraries: projects.filter((p) => p.type === "Library").length,
    }),
    [projects],
  );

  const filtered = projects.filter((p) => matches(p, filter));

  return (
    <div className="w-full">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionLabel index="02">Selected work</SectionLabel>
          <SectionHeading>Things I&apos;ve designed, built, and shipped.</SectionHeading>
          <Reveal className="mt-5 max-w-2xl">
            <p className="text-base font-light text-gray-400">
              A mix of client products, experiments, and open-source tools.
            </p>
          </Reveal>
        </div>

        {/* Filter tabs */}
        <Reveal>
          <div
            role="tablist"
            aria-label="Filter projects"
            className="inline-flex gap-1 rounded-2xl border border-white/10 bg-black/40 p-1 backdrop-blur-xl"
          >
            {FILTERS.map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  data-cursor="hover"
                  className={`relative rounded-xl px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
                    active ? "text-white" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="projectFilterPill"
                      className="absolute inset-0 rounded-xl bg-[color:var(--accent)] shadow-[0_0_20px_rgba(255,77,125,0.35)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">
                    {f}{" "}
                    <span className={active ? "text-white/70" : "text-gray-600"}>
                      {counts[f]}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-14">
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </motion.div>
      </Reveal>
    </div>
  );
};
