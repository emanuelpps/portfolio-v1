import { motion } from "framer-motion";
import { FC } from "react";
import { GoArrowUpRight } from "react-icons/go";

type ProjectCardProps = {
  title: string;
  image: string;
  link: string;
};

const ProjectCard: FC<ProjectCardProps> = ({ title, image, link }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative w-80 h-[420px] rounded-[24px] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md shadow-xl overflow-hidden group"
    >
      <div className="absolute top-4 pl-4 z-20 border-b-[1px] w-full border-white pb-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="absolute w-full h-[320px] bottom-0 bg-amber-100 rounded-t-[40px]"></div>
      <div className="absolute w-full h-[310px] bottom-0 bg-amber-500 rounded-t-[40px]"></div>
      <img
        src={image}
        alt={title}
        className="absolute bottom-0 left-0 w-full h-[300px] object-cover rounded-t-[40px]"
      />
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-20 w-11 h-11 rounded-full bg-[#111827] text-white flex items-center justify-center transition hover:bg-[#1f2937]"
      >
        <GoArrowUpRight className="w-5 h-5" />
      </a>
    </motion.div>
  );
};

export default ProjectCard;
