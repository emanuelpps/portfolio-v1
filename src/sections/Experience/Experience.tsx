import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScroll } from "@/hooks/UseScroll";
import { BpSection } from "@/components/blueprint/Section";
import { EASE } from "@/lib/motion";

type Role = {
  company: string;
  title: string;
  period: string;
  /** Current work opens by default; history stays folded until asked for. */
  current?: boolean;
  description: string;
};

const ROLES: Role[] = [
  {
    company: "Dizizid",
    title: "Frontend Developer",
    period: "2026 — Present",
    current: true,
    description:
      "Rebuilt the platform to be fully responsive across devices, hardening React + Tailwind components against edge cases and breakpoints. Partnered with design and product to ship a more consistent, scalable UI. Now working on the ticketing platform itself — refining the path from browsing an event to completing a purchase, and keeping every step of it dependable on any screen.",
  },
  {
    company: "The CodeMaker Lab",
    title: "Frontend Developer",
    period: "2024 — Present",
    current: true,
    description:
      "Turn designs into production-ready interfaces, ship them, and keep them fast. Maintain and optimize client sites for performance, usability, and SEO — and present solutions directly to clients. Beyond the frontend, build automations with n8n: workflows that move data between apps and APIs, lead capture wired into the CRM, and internal processes that used to be done by hand.",
  },
  {
    company: "EPAM Systems",
    title: "Associate Project Administrator",
    period: "2025",
    description:
      "Owned data integrity for a client platform: validated JSON flows in Retool, debugged GraphQL queries, and coordinated with US teams to keep backoffice and mobile data in sync.",
  },
  {
    company: "Justina.io — Hackathon",
    title: "Frontend Developer",
    period: "2024",
    description:
      "Shipped a working web product end-to-end under hackathon time pressure.",
  },
  {
    company: "NoCountry",
    title: "Frontend Developer",
    period: "2023 — 2024",
    description:
      "Built React/Next.js interfaces from design, integrated APIs for dynamic data, and drove code reviews and best practices across a cross-functional team.",
  },
  {
    company: "Duo Digital",
    title: "Digital Marketing Manager",
    period: "2022 — 2024",
    description:
      "Generated leads and ran the full growth stack — email, content, paid media, SEO, and Google Ads — while building and managing the WordPress sites behind the campaigns.",
  },
  {
    company: "Vital Servicios",
    title: "Marketing Manager",
    period: "2021 — 2022",
    description:
      "Led the marketing team and SEM/SEO strategy, managed budgets, and optimized the e-commerce funnel to generate new leads.",
  },
  {
    company: "Dafiti Argentina",
    title: "Marketing Analyst",
    period: "2014 — 2018",
    description:
      "Planned and optimized email and on-site campaigns at scale, segmenting audiences and reporting performance daily to hit business goals.",
  },
];

/**
 * The record, hung off the stem.
 *
 * The previous build drew a gradient spine down the middle of the page to act
 * as a timeline. There is already a spine on every screen of this site, so a
 * second one was competing with the first. Each role is a bar coming off it —
 * which is what the E is: one vertical, and everything else attached to it.
 *
 * Rows start folded so ten years read as a list rather than a wall. Current
 * work is open on arrival, because that is the part anyone came to check.
 */
function RoleRow({ role, n }: { role: Role; n: string }) {
  const [open, setOpen] = useState(!!role.current);
  const id = `role-${n}`;

  return (
    <div className="relative border-b border-rule">
      {/* The bar's tick, crossing the stem the way the E's arms cross it. */}
      <span aria-hidden className="absolute -left-2 top-0 h-px w-2 bg-rule" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        data-cursor="hover"
        className="invertible group flex w-full items-baseline gap-4 px-[var(--gutter)] py-6 text-left md:grid md:grid-cols-[9rem_1fr_minmax(0,14rem)_1.5rem] md:gap-6 md:py-7"
      >
        <span className="mono-sm shrink-0 text-ink-faint transition-colors group-hover:text-ground/60">
          {role.period}
        </span>

        <span className="display-md text-xl text-ink transition-colors group-hover:text-ground sm:text-2xl">
          {role.company}
        </span>

        <span className="note hidden text-ink-dim transition-colors group-hover:text-ground/70 md:block">
          {role.title}
        </span>

        <span
          aria-hidden
          className="note ml-auto shrink-0 text-ink-faint transition-colors group-hover:text-ground md:ml-0 md:justify-self-end"
        >
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-[var(--gutter)] pb-8 md:pl-[calc(var(--gutter)_+_10.5rem)]">
              <p className="note mb-4 text-ink-faint md:hidden">
                {role.title}
              </p>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
                {role.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Experience = () => {
  const { refs } = useScroll();

  return (
    <BpSection
      id="experience"
      label="Record"
      title="Ten years building for outcomes."
      sectionRef={refs.refExperience}
    >
      <div className="mt-10 from-stem border-t border-rule">
        {ROLES.map((role, i) => (
          <RoleRow
            key={role.company}
            role={role}
            n={String(i + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </BpSection>
  );
};

export default Experience;
