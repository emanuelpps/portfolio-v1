import { motion } from "framer-motion";
import { JSX } from "react";

interface SkillCardProp {
  name: string;
  Icon: (props: { size: number }) => JSX.Element;
}

const SkillCard = ({ name, Icon }: SkillCardProp) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="relative group flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md transition-all duration-500 hover:border-[#FF4D7D]/30"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl bg-[#FF4D7D] rounded-full" />
      <div className="relative scale-90 sm:scale-100 z-10 text-white/50 group-hover:text-[#FF4D7D] mb-2 sm:mb-3 transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,77,125,0.5)]">
        <Icon size={28} />
      </div>
      <h4 className="relative z-10 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-bold text-gray-500 group-hover:text-white transition-colors duration-500 text-center">
        {name}
      </h4>
    </motion.div>
  );
};

export default SkillCard;