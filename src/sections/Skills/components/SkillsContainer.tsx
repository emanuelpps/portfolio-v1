import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import SkillsTabs from "./SkillsTabs";
import icons from "../../../components/Icons/IconsConfig";
import SkillCard from "./SkillCard";

export const SkillsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>("Frontend");
  const SkillsTitle = TitlesFactory.createTitle(
    "secondary",
    "Skills",
    "What I can do"
  );

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <SkillsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <motion.div
        ref={ref}
        className="backdrop-blur-lg shadow-lg w-full max-w-7xl h-[700px] flex flex-col items-center rounded-2xl px-6 py-3 gap-8 p-8 shadow-gray-900 border border-gray-800 [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pb-10 bg-gray-900/50"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center flex flex-col md:flex-row md:w-[80%] justify-center md:justify-between items-center h-[100px]">
          <div className="flex items-center justify-center md:justify-start w-full md:text-start">
            {SkillsTitle.render()}
          </div>
          <div className="flex justify-center md:items-end md:justify-end w-full">
            <h3 className="mt-4 text-4xl font-semibold text-white drop-shadow-lg">
              {activeTab}
            </h3>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 place-items-center justify-items-center">
            {icons[activeTab].map(({ name, icon }) => (
              <SkillCard key={name} name={name} icon={icon} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
