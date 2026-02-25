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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{
        backgroundColor: "rgba(255, 77, 125, 0.1)",
        borderColor: "rgba(255, 77, 125, 0.5)",
      }}
      className="relative group flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-900/40 border border-white/5 backdrop-blur-sm transition-all duration-300"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl bg-[#FF4D7D] rounded-full" />
      <div className="relative z-10 text-[#FF4D7D] mb-3 group-hover:scale-110 transition-transform duration-300">
        <Icon size={40} />
      </div>
      <h4 className="relative z-10 text-sm font-medium tracking-wide text-gray-300 group-hover:text-white transition-colors">
        {name}
      </h4>
    </motion.div>
  );
};

export default SkillCard;
