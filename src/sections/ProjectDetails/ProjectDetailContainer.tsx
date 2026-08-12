import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { RiArrowLeftLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { ProjectTypes } from "../../types/ProjectTypes";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedText } from "@/components/motion/AnimatedText";
import { GoUp } from "./components/GoUp";

interface ProjectDetailContainerProps {
  project: ProjectTypes;
}

/**
 * Screenshots are wide and detail-heavy, so they run the full width of the
 * case study instead of sitting in a narrow column — at half width the UI
 * inside them is unreadable.
 */
const Gallery = ({ images, title }: { images?: string[]; title: string }) => {
  if (!images || images.length === 0) return null;
  return (
    <div className="mt-12 flex flex-col gap-6 sm:gap-8">
      {images.map((src, i) => (
        <Reveal key={i} delay={i * 0.06}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--bg-soft)] shadow-2xl transition-colors duration-500 hover:border-[color:var(--accent)]/40">
            <img
              src={src}
              alt={`${title} — view ${i + 1}`}
              loading="lazy"
              className="block max-h-[85vh] w-full object-contain"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
};

const CaseBlock = ({
  index,
  label,
  text,
  images,
  title,
}: {
  index: string;
  label: string;
  text: string;
  images?: string[];
  title: string;
}) => (
  <section className="border-t border-white/10 pt-16">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <Reveal className="eyebrow flex items-center gap-3">
          <span className="text-[color:var(--accent)]">({index})</span>
          <span>{label}</span>
        </Reveal>
      </div>
      <div className="lg:col-span-8">
        <Reveal delay={0.05}>
          <p className="text-lg font-light leading-relaxed text-gray-400">
            {text}
          </p>
        </Reveal>
      </div>
    </div>
    <Gallery images={images} title={title} />
  </section>
);

const ProjectDetailContainer: React.FC<ProjectDetailContainerProps> = ({
  project,
}) => {
  if (!project)
    return (
      <div className="flex h-dvh items-center justify-center text-white">
        Project not found
      </div>
    );

  const { purpose, designApproach, challenges } = project.insights;
  const inDev = project.status === "in-development";
  const paragraphs = project.longDescription
    .split("\n")
    .filter((p) => p.trim() !== "");

  return (
    <div className="relative w-full">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,77,125,0.10),transparent_60%)]" />

      {/* Sticky top bar */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[color:var(--bg)]/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            to="/"
            data-cursor="hover"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
          >
            <RiArrowLeftLine className="transition-transform duration-300 group-hover:-translate-x-1" />
            Back to work
          </Link>
          <span className="eyebrow hidden sm:block">{project.type}</span>
          <Link
            to="/"
            aria-label="Close case study"
            data-cursor="hover"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          >
            ✕
          </Link>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-32 sm:px-8">
        {/* Hero */}
        <header className="pt-16 sm:pt-24">
          <Reveal className="eyebrow text-[color:var(--accent)]">
            {project.type} — Case study
          </Reveal>
          <AnimatedText
            el="h1"
            text={project.title}
            className="mt-4 flex flex-wrap text-4xl font-black leading-[1.02] tracking-tighter text-white sm:text-6xl md:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-gray-400 sm:text-xl">
              {project.description}
            </p>
          </Reveal>

          {inDev && (
            <Reveal delay={0.12}>
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-300/25 bg-amber-400/[0.06] px-5 py-4">
                <span className="mt-1.5 h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-amber-400" />
                <p className="text-sm font-light leading-relaxed text-amber-200/90">
                  <span className="font-bold uppercase tracking-wider text-amber-300">
                    Work in progress
                  </span>{" "}
                  — {project.title} is still under active development and isn&apos;t
                  live yet, so there are no screenshots to show. The write-up below
                  explains what it is and how it works.
                </p>
              </div>
            </Reveal>
          )}

          {/* Meta: stack + links */}
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-col gap-6 border-y border-white/10 py-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-6">
                {project.code && (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-300 transition-colors hover:text-white"
                  >
                    <FaGithub className="text-base" /> Repository
                  </a>
                )}
                {project.deploy && (
                  <a
                    href={project.deploy}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group flex items-center gap-1.5 rounded-full bg-[color:var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_24px_rgba(255,77,125,0.35)]"
                  >
                    {project.buttonText || "Live"}
                    <GoArrowUpRight className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* Hero showcase image */}
          {project.image2 && (
            <Reveal variant="blurIn" delay={0.1} className="mt-12">
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[color:var(--bg-soft)] shadow-2xl">
                <img
                  src={project.image2}
                  alt={`${project.title} showcase`}
                  loading="lazy"
                  className="aspect-video w-full object-cover"
                />
              </div>
            </Reveal>
          )}
        </header>

        {/* Overview */}
        <section className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal className="eyebrow flex items-center gap-3 lg:sticky lg:top-28">
              <span className="text-[color:var(--accent)]">(01)</span>
              <span>Overview</span>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="flex flex-col gap-6">
              {paragraphs.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-xl font-light leading-relaxed text-gray-200 sm:text-2xl">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-24 flex flex-col gap-24">
          {purpose?.text && (
            <CaseBlock
              index="02"
              label="Purpose"
              text={purpose.text}
              images={purpose.images}
              title={project.title}
            />
          )}
          {designApproach?.text && (
            <CaseBlock
              index="03"
              label="Design approach"
              text={designApproach.text}
              images={designApproach.images}
              title={project.title}
            />
          )}
          {challenges?.text && (
            <CaseBlock
              index="04"
              label="Challenges"
              text={challenges.text}
              images={challenges.images}
              title={project.title}
            />
          )}
        </div>

        {/* Footer CTA */}
        <section className="mt-28 flex flex-col items-center gap-6 border-t border-white/10 pt-16 text-center">
          <span className="eyebrow">End of case study</span>
          <AnimatedText
            el="h2"
            text="Like what you see?"
            className="flex flex-wrap justify-center text-3xl font-black tracking-tight text-white sm:text-5xl"
          />
          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              to="/"
              data-cursor="hover"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white/40"
            >
              ← Back to all work
            </Link>
            <motion.a
              href="mailto:emanuelpages.ps@gmail.com"
              data-cursor="hover"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-[color:var(--accent)] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,77,125,0.4)]"
            >
              Get in touch
            </motion.a>
          </div>
        </section>
      </div>

      <GoUp />
    </div>
  );
};

export default ProjectDetailContainer;
