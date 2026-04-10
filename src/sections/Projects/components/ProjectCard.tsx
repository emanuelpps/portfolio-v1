import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { ProjectTypes } from "@/types/ProjectTypes";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: ProjectTypes;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className="relative group w-full h-[360px] sm:h-[440px] lg:h-[540px] rounded-[1.75rem] overflow-hidden cursor-pointer"
    >
      <Link
        to={`/project/${project.id}`}
        state={project}
        className="block h-full"
      >
        {/* Imagen con zoom en hover */}
        <motion.div
          variants={{ initial: { scale: 1 }, hover: { scale: 1.07 } }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <img
            src={project.frontImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradiente base siempre visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Overlay oscuro en hover */}
        <motion.div
          variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-black/30"
        />

        {/* Borde accent animado */}
        <motion.div
          variants={{ initial: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-[1.75rem] border border-[#FF4D7D]/50 pointer-events-none"
        />

        {/* Número top-right */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.3em] text-white/20 group-hover:text-[#FF4D7D]/60 transition-colors duration-500 font-mono">
            {num}
          </span>
        </div>

        {/* Stack chips top-left */}
        <div className="absolute top-5 left-5 sm:top-6 sm:left-6 flex flex-wrap gap-1.5 max-w-[70%]">
          {project.stack.slice(0, 3).map((lang) => (
            <motion.span
              key={lang}
              variants={{
                initial: { opacity: 0.5, y: 0 },
                hover: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
              className="px-2 py-0.5 text-[7px] sm:text-[8px] uppercase tracking-[0.2em] font-black bg-black/70 text-white/60 group-hover:text-white/90 border border-white/10 group-hover:border-white/20 rounded-full backdrop-blur-md transition-colors duration-300"
            >
              {lang}
            </motion.span>
          ))}
        </div>

        {/* Footer: título + CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          {/* Descripción — solo visible en hover, oculta en mobile donde siempre se ve */}
          <motion.p
            variants={{
              initial: { opacity: 0, y: 8 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="hidden lg:block text-[11px] text-white/50 mb-3 leading-relaxed line-clamp-2"
          >
            {project.description}
          </motion.p>

          <div className="flex items-end justify-between gap-3">
            <h3 className="text-xl sm:text-2xl lg:text-[1.6rem] font-black leading-tight text-white tracking-tight">
              {project.title}
            </h3>

            {/* Botón CTA */}
            <motion.div
              variants={{
                initial: { scale: 0.85, opacity: 0.4, rotate: -10 },
                hover: { scale: 1, opacity: 1, rotate: 0 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="hidden lg:flex flex-shrink-0 w-11 h-11 rounded-full bg-[#FF4D7D] items-center justify-center text-white shadow-[0_0_24px_rgba(255,77,125,0.5)]"
            >
              <GoArrowUpRight size={20} />
            </motion.div>

            {/* Mobile CTA siempre visible */}
            <div className="flex lg:hidden flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FF4D7D] items-center justify-center text-white">
              <GoArrowUpRight size={17} />
            </div>
          </div>

          {/* Línea accent */}
          <motion.div
            variants={{ initial: { scaleX: 0 }, hover: { scaleX: 1 } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden lg:block mt-4 h-[1px] bg-[#FF4D7D]/40 origin-left"
          />

          {/* Mobile: descripción siempre visible pero corta */}
          <p className="lg:hidden mt-2 text-[10px] sm:text-[11px] text-white/40 leading-relaxed line-clamp-1">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
