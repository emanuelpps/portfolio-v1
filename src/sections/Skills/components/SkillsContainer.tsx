import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import icons from "../../../components/Icons/IconsConfig";
import SkillCard from "./SkillCard";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import SkillsTabs from "./SkillsTabs";
const SkillsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>("Frontend");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const SkillsTitle = TitlesFactory.createTitle(
    "secondary",
    "Skills",
    "My Tech Stack",
  );

  return (
    <div className="w-full max-w-6xl px-4 py-20 mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111827]/50 backdrop-blur-xl p-8 md:p-16"
      >
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF4D7D]/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="relative z-10 flex flex-col gap-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex-1">{SkillsTitle.render()}</div>
            <div className="flex-shrink-0">
              <SkillsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {icons[activeTab].map(({ name, Icon }) => (
                <SkillCard key={name} name={name} Icon={Icon} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsContainer;
