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
    <div className="relative w-80 h-[420px] rounded-[24px] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md shadow-xl overflow-hidden group hover:bg-[#FF4D7D] transition-colors duration-300 cursor-pointer">
      <div className="absolute top-4 pl-4 z-20 border-b-[1px] w-full border-white pb-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-full rounded-t-[40px] overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="absolute bottom-0 w-[75%] h-[335px] bg-[#646a7781] rounded-t-[40px] left-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 w-[85%] h-[320px] bg-[#2e333d] rounded-t-[40px] left-1/2 -translate-x-1/2" />
        <img
          src={image}
          alt={title}
          className="absolute bottom-0 left-0 w-full h-[300px] object-cover rounded-t-[40px]"
        />
      </motion.div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-30 w-11 h-11 rounded-full bg-[#111827] text-white flex items-center justify-center transition hover:bg-[#1f2937]"
      >
        <GoArrowUpRight className="w-5 h-5" />
      </a>
    </div>
  );
};

export default ProjectCard;
