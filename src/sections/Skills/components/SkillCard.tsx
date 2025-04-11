import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SkillCardProp {
  name: string;
  icon: ReactNode;
}

const SkillCard = ({ name, icon }: SkillCardProp) => {
  return (
    <motion.div
      className="bg-gray-900 w-full max-w-[250px] flex justify-center items-center gap-5 p-6 rounded-3xl text-white shadow-md hover:shadow-lg transition-all"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-4xl text-[#FF4D7D]">{icon}</div>
      <h4 className="font-normal text-md drop-shadow-sm">{name}</h4>
    </motion.div>
  );
};

export default SkillCard;
