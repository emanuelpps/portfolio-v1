import { motion, useScroll, useTransform } from "framer-motion";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import { useState, useRef } from "react";
import ExperienceItem from "./ExperienceItem";
import { ItemTypes } from "./ExperienceItem";

const ExperienceContainer = () => {
  const [experiences] = useState([
    {
      CompanyName: "EPAM Systems",
      JobTitle: "Associate Project Administrator",
      Period: "2025 - Present",
      ItemType: ItemTypes.Primary,
    },
    {
      CompanyName: "The CodeMaker Lab",
      JobTitle: "Frontend Developer",
      Period: "2024 - Present",
      ItemType: ItemTypes.Primary,
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

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const ExperienceTitle = TitlesFactory.createTitle(
    "secondary",
    "Experience",
    "My journey so far"
  );

  return (
    <>
      <div className="text-center">{ExperienceTitle.render()}</div>
      <div ref={ref} className="relative flex md:block w-[95vw] md:w-[70%]">
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-[300px]"
          style={{
            height: lineHeight,
            backgroundImage:
              "repeating-linear-gradient(to bottom, #4B5563 0px, #4B5563 6px, transparent 6px, transparent 12px)",
          }}
        ></motion.div>
        <div className="relative flex flex-col gap-10 mt-8 md:gap-12">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              CompanyName={exp.CompanyName}
              JobTitle={exp.JobTitle}
              ItemType={exp.ItemType}
              Period={exp.Period}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ExperienceContainer;
