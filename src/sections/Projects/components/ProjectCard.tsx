import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { ProjectTypes } from "@/types/ProjectTypes";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: ProjectTypes;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className="relative group w-full max-w-[400px] h-[480px] rounded-[32px] overflow-hidden border border-white/10 bg-gray-950/40 backdrop-blur-md"
    >
      <Link to={`/project/${project.id}`} state={project}>
        <motion.div
          variants={{ hover: { scale: 1.1 } }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={project.frontImage}
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
        </motion.div>
        <div className="relative z-10 p-8 flex flex-col h-full justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.stack.map((lang) => (
                <span
                  key={lang}
                  className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-[#FF4D7D]/50 text-[#000D0D] border border-[#FF4D7D]/20 rounded-full backdrop-blur-md"
                >
                  {lang}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-bold text-white leading-tight drop-shadow-md">
              {project.title}
            </h3>
          </div>
          <div className="flex items-end justify-between">
            <motion.button
              onClick={() => window.open(project.deploy, "_blank")}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-[#FF4D7D] hover:text-white transition-colors duration-300"
            >
              {project.buttonText}
              <GoArrowUpRight className="text-lg" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
