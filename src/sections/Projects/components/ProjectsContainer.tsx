import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import ProjectCard from "./ProjectCard";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";
import { TitlesFactory } from "@/components/Titles/TitlesFactory";

export const ProjectsContainer = () => {
  const Projects = rawProjects as ProjectTypes[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const ProjectsTitle = TitlesFactory.createTitle(
    "secondary",
    "Projects",
    "I've been working on these",
  );

  const projectsPerPage = 3;
  const totalSlides = Math.ceil(Projects.length / projectsPerPage);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    const nextIndex = currentIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < totalSlides) {
      setCurrentIndex(nextIndex);
    } else if (nextIndex < 0) {
      setCurrentIndex(totalSlides - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentProjects = Projects.slice(
    currentIndex * projectsPerPage,
    (currentIndex + 1) * projectsPerPage,
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
        <div className="space-y-2">
          <div className="flex w-full md:items-start md:justify-start md:text-start">
            {ProjectsTitle.render()}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right mr-4">
            <span className="text-white text-xl font-bold">
              0{currentIndex + 1}
            </span>
            <span className="text-gray-500 text-xs uppercase tracking-widest">
              de 0{totalSlides}
            </span>
          </div>
          <button
            onClick={() => paginate(-1)}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#FF4D7D] hover:border-[#FF4D7D] transition-all group cursor-pointer"
          >
            <RiArrowLeftLine
              size={24}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={() => paginate(1)}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#FF4D7D] hover:border-[#FF4D7D] transition-all group cursor-pointer"
          >
            <RiArrowRightLine
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden min-h-[500px]">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
