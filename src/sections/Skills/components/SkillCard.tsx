import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SkillCardProp {
  name: string;
  icon: ReactNode;
}

const SkillCard = ({ name, icon }: SkillCardProp) => {
  return (
    <motion.div
      className="bg-gray-900 w-full max-w-[250px] flex justify-center items-center gap-5 p-6 rounded-3xl text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
      initial={{ opacity: 0, scale: 0.5, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-4xl text-[#FF4D7D]">{icon}</div>
      <h4 className="font-normal text-md drop-shadow-sm">{name}</h4>
    </motion.div>
  );
};

export default SkillCard;
