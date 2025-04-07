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
        className="bg-gray-900/50 backdrop-blur-lg shadow-lg w-full max-w-7xl min-h-[80vh] flex flex-col justify-center items-center rounded-2xl px-6 py-3 gap-8 p-8 shadow-gray-900 border border-gray-800 [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pb-10"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center flex w-[80%] justify-between items-center">
          <div className="flex w-full justify-start text-start items-center">
            {SkillsTitle.render()}
          </div>
          <div className="w-full flex justify-end items-end">
            <h3 className="text-white font-semibold text-4xl mt-4 drop-shadow-lg">
              {activeTab}
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
          {icons[activeTab].map(({ name, icon }) => (
            <SkillCard key={name} name={name} icon={icon} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
