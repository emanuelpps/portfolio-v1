import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { ProjectTypes } from "@/types/ProjectTypes";

interface ProjectCardProps {
  project: ProjectTypes;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="relative w-[90vw] lg:w-85 h-full lg:h-[420px] rounded-[40px] border-[1px] border-r-transparent border-t-white/10 border-b-transparent border-l-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md shadow-xl hover:bg-[#FF4D7D] transition-colors duration-500 cursor-pointer overflow-visible">
      {/* HEADER */}
      <div className="absolute top-4 pl-4 z-30 border-b-[1px] w-full border-white pb-3">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <div className="flex gap-2 text-white text-[0.7rem] font-extralight">
          {project.stack.map((lang: string) => (
            <p key={lang}>{lang}</p>
          ))}
        </div>
      </div>

      {/* CONTENIDO + IMAGEN */}
      <motion.div
        className="relative w-full lg:w-85 h-[420px] rounded-[40px] overflow-visible"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Link to={`/project/${project.id}`} state={project}>
          <div className="absolute bottom-0 lg:w-[75%] lg:h-[325px] bg-[#31343a79] rounded-t-[40px] left-1/2 -translate-x-1/2 z-10" />
          <div className="absolute bottom-0 lg:w-[85%] lg:h-[315px] bg-[#31343ad0] rounded-t-[40px] left-1/2 -translate-x-1/2 z-20" />
          <img
            src={project.frontImage}
            alt={project.title}
            className="absolute bottom-0 left-0 w-full h-[300px] object-cover rounded-[40px] z-[25]"
          />
        </Link>

        {/* CURVAS + BOTÓN EN ORDEN CORRECTO */}
        <div
          id="tab-curve"
          className="absolute overflow-visible bottom-0 right-0 z-[90] flex items-center justify-center after:bg-[#0F1724] rounded-l-[50px] p-[1rem] after:w-[240px] after:h-[127px] after:content-[''] after:absolute after:top-[-45px] after:rounded-tl-[40px] after:rounded-r-none"
        />
        <div
          id="curve-one"
          className="absolute bottom-[-12px] right-37 z-[90] flex after:content-[''] w-8 h-10 rounded-br-[50px] after:bg-[#0F1724]"
        />
        <button
          onClick={() =>
            window.open(project.deploy, "_blank", "noopener,noreferrer")
          }
          className="group absolute bottom-0 right-0 z-[100] w-30 h-16 rounded-[20px] bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md text-white flex items-center justify-center transition hover:bg-[#1f2937] text-[0.8rem] gap-2 border border-gray-800 cursor-pointer"
        >
          {project.buttonText}
          <GoArrowUpRight className="transition-transform duration-300 ease-in-out group-hover:rotate-45" />
        </button>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
