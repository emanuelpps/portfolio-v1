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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  return (
    <div
      className="w-full px-4 sm:px-6 py-16 sm:py-24 mx-auto max-w-7xl"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-[2px] p-6 sm:p-8 md:p-20"
      >
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#FF4D7D]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-16">
          <div className="flex flex-col items-center justify-between gap-8 sm:gap-10 lg:flex-row lg:items-end">
            <div className="flex-1 text-center lg:text-left">
              {SkillsTitle.render()}
            </div>
            <div className="flex-shrink-0">
              <SkillsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
          <div className="relative min-h-[320px] sm:min-h-[400px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid w-full grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-8"
              >
                {icons[activeTab].map(({ name, Icon }) => (
                  <SkillCard key={name} name={name} Icon={Icon} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsContainer;
