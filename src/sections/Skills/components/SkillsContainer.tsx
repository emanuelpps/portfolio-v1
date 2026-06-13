import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import icons from "@/components/Icons/IconsConfig";
import SkillCard from "./SkillCard";
import SkillsTabs from "./SkillsTabs";
import { Marquee } from "@/components/motion/Marquee";
import { SectionLabel, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const SkillsContainer = () => {
  const [activeTab, setActiveTab] = useState<string>("Frontend");
  const marqueeItems = icons["Frontend"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[80rem] px-5 sm:px-8">
        <SectionLabel index="03">Stack</SectionLabel>
        <SectionHeading>The tools I reach for.</SectionHeading>
      </div>

      {/* Full-bleed marquee band */}
      <Reveal className="mt-12">
        <Marquee speed={28} className="border-y border-white/10 py-6">
          {marqueeItems.map(({ name, Icon }) => (
            <div key={name} className="flex items-center gap-3 text-white/40">
              <Icon size={26} />
              <span className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.15em]">
                {name}
              </span>
            </div>
          ))}
        </Marquee>
      </Reveal>

      <div className="mx-auto mt-14 w-full max-w-[80rem] px-5 sm:px-8">
        <div className="mb-10 flex justify-center lg:justify-end">
          <SkillsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-6"
            >
              {icons[activeTab].map(({ name, Icon }) => (
                <SkillCard key={name} name={name} Icon={Icon} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SkillsContainer;
