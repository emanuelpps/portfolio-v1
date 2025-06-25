import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";

interface SkillCardProp {
  name: string;
  Icon: (props: { size: number }) => JSX.Element;
}

const SkillCard = ({ name, Icon }: SkillCardProp) => {
  const [iconSize, setIconSize] = useState(32);

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerWidth < 768 ? 24 : 32);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="bg-gray-900 w-full max-w-[250px] flex justify-center items-center gap-2 md:gap-5 p-2 md:p-6 rounded-3xl text-white shadow-md hover:shadow-lg transition-all"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-[#FF4D7D]">
        <Icon size={iconSize} />
      </div>
      <h4 className="text-xs font-normal md:text-md drop-shadow-sm">{name}</h4>
    </motion.div>
  );
};

export default SkillCard;
