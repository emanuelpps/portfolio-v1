import { motion } from "framer-motion";
import { FC } from "react";
import { GoArrowUpRight } from "react-icons/go";

type ProjectCardProps = {
  title: string;
  image: string;
  link: string;
  buttonText: string;
  stack: string[];
};

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  image,
  link,
  buttonText,
  stack,
}) => {
  return (
    <div className="relative w-85 h-[420px] rounded-[40px] border-[1px] border-r-transparent border-t-white/10 border-b-transparent border-l-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md shadow-xl hover:bg-[#FF4D7D] transition-colors duration-500 cursor-pointer">
      <div className="absolute top-4 pl-4 z-20 border-b-[1px] w-full border-white pb-3">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex gap-2 text-white text-[0.7rem] font-extralight">
          {stack.map((lang) => (
            <p>{lang}</p>
          ))}
        </div>
      </div>
      <motion.div
        className="relative w-85 h-[420px] overflow-hidden rounded-[40px]"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="absolute bottom-0 w-[75%] h-[325px] bg-[#31343a79] rounded-t-[40px] left-1/2 -translate-x-1/2 z-10" />
        <div className="absolute bottom-0 w-[85%] h-[315px] bg-[#31343ad0] rounded-t-[40px] left-1/2 -translate-x-1/2 z-20" />
        <img
          src={image}
          alt={title}
          className="absolute bottom-0 left-0 w-full h-[300px] object-cover rounded-[40px] z-[30]"
        />
        <div className="absolute right-[0px] top-[298px] w-[40px] h-[40px] z-[95] bg-transparent rounded-br-[40px] shadow-[8px_12px_0px_4px_#0F1724]" />
        <div className="absolute left-[166px] bottom-[1px] w-[40px] h-[40px] z-[95] bg-transparent rounded-br-[40px] shadow-[8px_12px_0px_4px_#0F1724]" />
      </motion.div>
      <div
        id="tab-curve"
        className="absolute overflow-visible bottom-0 right-0 z-50 flex items-center justify-center after:bg-[#0F1724] rounded-l-[50px] p-[1rem] after:w-[240px] after:h-[127px] after:content-[''] after:absolute after:top-[-5] after:rounded-tl-[40px] after:rounded-r-none"
      >
        <p>
          <span></span>
        </p>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group absolute bottom-0 right-0 z-[90] w-30 h-16 rounded-[20px] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md text-white flex items-center justify-center transition hover:bg-[#1f2937] text-[0.8rem] gap-2 border border-gray-800"
      >
        {buttonText}
        <GoArrowUpRight className="transition-transform duration-300 ease-in-out group-hover:rotate-45" />
      </a>
      <div
        id="curve-one"
        className="absolute bottom-[-12px] right-37 z-50 flex after:content-[''] w-8 h-10 rounded-br-[50px] after:bg-[#0F1724]"
      ></div>
    </div>
  );
};

export default ProjectCard;
