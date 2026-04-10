import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ExperienceItem, { ItemTypes } from "./ExperienceItem";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";

const ExperienceContainer = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const ExperienceTitle = TitlesFactory.createTitle(
    "secondary",
    "Experience",
    "My professional path",
  );

  const [experiences] = useState([
    {
      CompanyName: "The CodeMaker Lab",
      JobTitle: "Frontend Developer",
      Period: "2024 - Present",
      ItemType: ItemTypes.Primary,
      description:
        "Translated designs into functional components and delivered them to production, collaborating with backend and design teams, presenting solutions and supporting clients, maintaining and optimizing websites for performance and usability, and creating documentation while implementing SEO strategies.",
    },
    {
      CompanyName: "EPAM Systems",
      JobTitle: "Associate Project Administrator",
      Period: "jan 2025 - dic 2025",
      ItemType: ItemTypes.Secondary,
      description:
        "Managed data flows by uploading and validating JSON files in Retool to optimize backoffice and mobile app synchronization, debugged GraphQL queries to resolve data inconsistencies, reported and tracked platform bugs, and coordinated with US-based client teams to validate endpoints and ensure accurate data propagation.",
    },
    {
      CompanyName: "Hackathon - Justina.io",
      JobTitle: "Frontend Developer",
      Period: "July 2024",
      ItemType: ItemTypes.Secondary,
      description:
        "Developed the frontend of a web platform during a hackathon, building and delivering a functional product within a limited timeframe.",
    },
    {
      CompanyName: "NoCountry",
      JobTitle: "Frontend Developer",
      Period: "2023 - 2024",
      ItemType: ItemTypes.Secondary,
      description:
        "Developed and reviewed frontend components using React and Next.js, translated designs into functional user interfaces, collaborated with cross-functional teams, integrated APIs for dynamic data handling, maintained and refactored existing code, and actively contributed to code reviews and best development practices.",
    },
    {
      CompanyName: "Duo Digital",
      JobTitle: "Digital Marketing Manager",
      Period: "2022 - 2024",
      ItemType: ItemTypes.Secondary,
      description:
        "Generated leads, created and managed email marketing campaigns, handled content, community, and paid media management, tracked KPIs through detailed reporting, built and managed WordPress websites, planned and optimized Google Ads campaigns, developed marketing strategies for clients, and implemented SEO improvements.",
    },
    {
      CompanyName: "Vital Servicios",
      JobTitle: "Marketing Manager",
      Period: "2021 - 2022",
      ItemType: ItemTypes.Secondary,
      description:
        "Led the marketing team, driving SEM and SEO strategies, developing and executing comprehensive online and offline marketing plans, managing budgets, overseeing communication campaigns, conducting competitive benchmarking, optimizing Tienda Nube, leading email marketing initiatives, and managing social media and paid advertising to generate new leads.",
    },
    {
      CompanyName: "Dafiti Argentina",
      JobTitle: "Marketing Analyst",
      Period: "2014 - 2018",
      ItemType: ItemTypes.Secondary,
      description:
        "Planned and managed email marketing campaigns in collaboration with cross-functional teams, developed and optimized newsletters, implemented communication strategies, analyzed performance by segments and content, continuously improved campaigns based on results, launched and optimized website campaigns, and delivered daily, weekly, and monthly performance reports to support business goals.",
    },
  ]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-24" ref={containerRef}>
      <div className="mb-20">{ExperienceTitle.render()}</div>
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-gray-800/50 hidden md:block" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-[#FF4D7D] to-purple-600 shadow-[0_0_15px_rgba(255,77,125,0.5)] z-10 hidden md:block"
          style={{ height: pathHeight }}
        />
        <div className="absolute left-6 top-0 w-[2px] h-full bg-gray-800 md:hidden" />

        <div className="relative flex flex-col">
          {experiences.map((exp, index) => (
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
