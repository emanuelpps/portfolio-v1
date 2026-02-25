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
    },
    {
      CompanyName: "EPAM Systems",
      JobTitle: "Associate Project Administrator",
      Period: "jan 2025 - dic 2025",
      ItemType: ItemTypes.Secondary,
    },
    {
      CompanyName: "Hackathon - Justina.io",
      JobTitle: "Frontend Developer",
      Period: "July 2024",
      ItemType: ItemTypes.Secondary,
    },
    {
      CompanyName: "NoCountry",
      JobTitle: "Frontend Developer",
      Period: "2023 - 2024",
      ItemType: ItemTypes.Secondary,
    },
    {
      CompanyName: "Duo Digital",
      JobTitle: "Digital Marketing Manager",
      Period: "2022 - 2024",
      ItemType: ItemTypes.Secondary,
    },
  ]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-24" ref={containerRef}>
      <div className="mb-20">{ExperienceTitle.render()}</div>

      <div className="relative">
        {/* Línea de fondo (Vía muerta) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-gray-800/50 hidden md:block" />

        {/* Línea de progreso (Vía activa con Glow) */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-[#FF4D7D] to-purple-600 shadow-[0_0_15px_rgba(255,77,125,0.5)] z-10 hidden md:block"
          style={{ height: pathHeight }}
        />

        {/* Línea Mobile (Ajustada a la izquierda) */}
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceContainer;
