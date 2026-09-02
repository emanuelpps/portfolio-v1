import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProjectTypes } from "../../types/ProjectTypes";
import { Rule } from "@/components/blueprint/Rule";
import { WipeText } from "@/components/blueprint/WipeText";
import { SpecList } from "@/components/blueprint/SpecList";
import { BowlLink } from "@/components/blueprint/BowlButton";
import { GoUp } from "./components/GoUp";
import { EASE } from "@/lib/motion";

interface ProjectDetailContainerProps {
  project: ProjectTypes;
}

/**
 * Screenshots are framed, not shaped.
 *
 * The bowl is the system's one radius, but at the width of a full-bleed UI
 * screenshot its curve would eat a quarter of the image, so here the frame is
 * a plain hairline. The language steps back rather than damaging the content.
 */
const Plate = ({
  src,
  title,
  index,
}: {
  src: string;
  title: string;
  index: number;
}) => (
  <motion.figure
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, ease: EASE }}
    className="overflow-hidden border border-rule bg-ground-2"
  >
    <img
      src={src}
      alt={`${title} — view ${index + 1}`}
      loading="lazy"
      className="block max-h-[85vh] w-full object-contain"
    />
  </motion.figure>
);

const Gallery = ({ images, title }: { images?: string[]; title: string }) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="mt-12 flex flex-col gap-10">
      {images.map((src, i) => (
        <Plate key={src} src={src} title={title} index={i} />
      ))}
    </div>
  );
};

const CaseBlock = ({
  label,
  text,
  images,
  title,
}: {
  label: string;
  text: string;
  images?: string[];
  title: string;
}) => (
  <section className="pt-20">
    <Rule tick />
    <div className="inset-stem pt-10">
      <h2 className="display-md text-3xl text-ink sm:text-4xl">{label}</h2>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-2">
        {text}
      </p>
      <Gallery images={images} title={title} />
    </div>
  </section>
);

const ProjectDetailContainer: React.FC<ProjectDetailContainerProps> = ({
  project,
}) => {
  if (!project)
    return (
      <div className="flex h-dvh items-center justify-center">
        <p className="note text-ink-dim">Project not found</p>
      </div>
    );

  const { purpose, designApproach, challenges } = project.insights;
  const inDev = project.status === "in-development";
  const paragraphs = project.longDescription
    .split("\n")
    .filter((p) => p.trim() !== "");

  const specs = [
    { key: "Type", value: project.type },
    { key: "Stack", value: project.stack.join(" · ") },
    ...(inDev ? [{ key: "Status", value: "In development" }] : []),
  ];

  return (
    <div className="relative w-full pb-32">
      <div className="sticky top-0 z-30 border-b border-rule bg-ground">
        <div className="inset-stem flex h-16 items-center justify-between gap-6">
          <Link
            to="/"
            data-cursor="hover"
            className="note group flex min-h-11 items-center gap-3 text-ink-dim transition-colors hover:text-ink"
          >
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to index
          </Link>

          <span className="note hidden text-ink-faint sm:block">
            {project.type}
          </span>

          <Link
            to="/"
            aria-label="Close case study"
            data-cursor="hover"
            className="note inline-flex min-h-11 items-center text-ink-dim transition-colors hover:text-ink"
          >
            Close ✕
          </Link>
        </div>
      </div>

      <header className="relative z-10 pt-20">
        <div className="inset-stem">
          <h1 className="display mt-6 text-[clamp(2.5rem,9vw,6.5rem)] text-ink">
            <WipeText trigger="mount">{project.title}</WipeText>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
            {project.description}
          </p>

          {inDev && (
            <div className="bowl mt-10 flex max-w-2xl items-start gap-4 border border-ink/40 py-4 pl-5 pr-10">
              <span className="note mt-1 shrink-0 text-ink">In progress</span>
              <p className="text-sm leading-relaxed text-ink-2">
                {project.title} is still under active development and isn&apos;t
                live yet, so there are no screenshots to show. The write-up
                below explains what it is and how it works.
              </p>
            </div>
          )}
        </div>

        <div className="mt-12">
          <Rule />
          <div className="inset-stem flex flex-col gap-8 py-8 lg:flex-row lg:items-start lg:justify-between">
            <SpecList items={specs} className="max-w-xl" />

            <div className="flex shrink-0 flex-wrap items-center gap-4">
              {project.code && (
                <BowlLink
                  href={project.code}
                  target="_blank"
                  rel="noreferrer"
                  className="border-rule text-ink-dim"
                >
                  Repository
                </BowlLink>
              )}
              {project.deploy && (
                <BowlLink href={project.deploy} target="_blank" rel="noreferrer">
                  {project.buttonText || "Live"}
                </BowlLink>
              )}
            </div>
          </div>
          <Rule />
        </div>

        {project.image2 && (
          <div className="inset-stem pt-12">
            <Plate src={project.image2} title={project.title} index={0} />
          </div>
        )}
      </header>

      <section className="relative z-10 pt-20">
        <Rule tick />
        <div className="inset-stem pt-10">
          <h2 className="display-md text-3xl text-ink sm:text-4xl">Overview</h2>
          <div className="mt-6 flex max-w-3xl flex-col gap-6">
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                className="text-xl font-light leading-relaxed text-ink sm:text-2xl"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        {purpose?.text && (
          <CaseBlock
            label="Purpose"
            text={purpose.text}
            images={purpose.images}
            title={project.title}
          />
        )}
        {designApproach?.text && (
          <CaseBlock
            label="Design approach"
            text={designApproach.text}
            images={designApproach.images}
            title={project.title}
          />
        )}
        {challenges?.text && (
          <CaseBlock
            label="Challenges"
            text={challenges.text}
            images={challenges.images}
            title={project.title}
          />
        )}
      </div>

      <section className="relative z-10 pt-24">
        <Rule tick />
        <div className="inset-stem flex flex-col gap-8 pt-8">
          <span className="note text-ink-faint">End of case study</span>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/"
              data-cursor="hover"
              className="note border-b border-rule pb-1 text-ink-dim transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              ← Back to all work
            </Link>
            <BowlLink href="mailto:emanuelpages.ps@gmail.com">
              Get in touch
            </BowlLink>
          </div>
        </div>
      </section>

      <GoUp />
    </div>
  );
};

export default ProjectDetailContainer;
