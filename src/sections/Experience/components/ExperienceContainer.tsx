import { motion } from "framer-motion";
import ExperienceItem, { ItemTypes } from "./ExperienceItem";
import { SectionLabel, SectionHeading } from "@/components/ui/Section";

const EXPERIENCES = [
  {
    CompanyName: "Dizizid",
    JobTitle: "Frontend Developer",
    Period: "2026 — Present",
    ItemType: ItemTypes.Primary,
    description:
      "Rebuilt the platform to be fully responsive across devices, hardening React + Tailwind components against edge cases and breakpoints. Partnered with design and product to ship a more consistent, scalable UI. Currently refining the ticketing platform.",
  },
  {
    CompanyName: "The CodeMaker Lab",
    JobTitle: "Frontend Developer",
    Period: "2024 — Present",
    ItemType: ItemTypes.Primary,
    description:
      "Turn designs into production-ready interfaces, ship them, and keep them fast. Maintain and optimize client sites for performance, usability, and SEO — and present solutions directly to clients. Also build automations alongside the frontend work.",
  },
  {
    CompanyName: "EPAM Systems",
    JobTitle: "Associate Project Administrator",
    Period: "2025",
    ItemType: ItemTypes.Secondary,
    description:
      "Owned data integrity for a client platform: validated JSON flows in Retool, debugged GraphQL queries, and coordinated with US teams to keep backoffice and mobile data in sync.",
  },
  {
    CompanyName: "Justina.io — Hackathon",
    JobTitle: "Frontend Developer",
    Period: "2024",
    ItemType: ItemTypes.Secondary,
    description:
      "Shipped a working web product end-to-end under hackathon time pressure.",
  },
  {
    CompanyName: "NoCountry",
    JobTitle: "Frontend Developer",
    Period: "2023 — 2024",
    ItemType: ItemTypes.Secondary,
    description:
      "Built React/Next.js interfaces from design, integrated APIs for dynamic data, and drove code reviews and best practices across a cross-functional team.",
  },
  {
    CompanyName: "Duo Digital",
    JobTitle: "Digital Marketing Manager",
    Period: "2022 — 2024",
    ItemType: ItemTypes.Secondary,
    description:
      "Generated leads and ran the full growth stack — email, content, paid media, SEO, and Google Ads — while building and managing the WordPress sites behind the campaigns.",
  },
  {
    CompanyName: "Vital Servicios",
    JobTitle: "Marketing Manager",
    Period: "2021 — 2022",
    ItemType: ItemTypes.Secondary,
    description:
      "Led the marketing team and SEM/SEO strategy, managed budgets, and optimized the e-commerce funnel to generate new leads.",
  },
  {
    CompanyName: "Dafiti Argentina",
    JobTitle: "Marketing Analyst",
    Period: "2014 — 2018",
    ItemType: ItemTypes.Secondary,
    description:
      "Planned and optimized email and on-site campaigns at scale, segmenting audiences and reporting performance daily to hit business goals.",
  },
];

const ExperienceContainer = () => {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
      <div className="mb-16">
        <SectionLabel index="04">Experience</SectionLabel>
        <SectionHeading>Ten years building for outcomes.</SectionHeading>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-white/10 md:block" />
        <motion.div
          className="absolute left-1/2 top-0 z-10 hidden h-full w-[2px] -translate-x-1/2 origin-top bg-gradient-to-b from-[color:var(--accent)] to-purple-600 shadow-[0_0_15px_rgba(255,77,125,0.5)] md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute left-3.5 top-0 h-full w-[2px] bg-white/10 md:hidden" />
        <div className="relative flex flex-col">
          {EXPERIENCES.map((exp, index) => (
            <ExperienceItem
              key={index}
              index={index}
              CompanyName={exp.CompanyName}
              JobTitle={exp.JobTitle}
              ItemType={exp.ItemType}
              Period={exp.Period}
              Description={exp.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceContainer;
