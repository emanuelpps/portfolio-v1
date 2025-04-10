import { useState } from "react";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import ProjectCard from "./ProjectCard";
import Projects from "../../../../public/data/Projects.json";
import { RiArrowRightSFill } from "react-icons/ri";
import { RiArrowLeftSFill } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";

export const ProjectsContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCardHover, setCurrentCardHover] = useState<number | null>(null);

  const ProjectsTitle = TitlesFactory.createTitle(
    "secondary",
    "Projects",
    "I've been working on these"
  );

  const projectsPerPage = 3;
  const totalSlides = Math.ceil(Projects.length / projectsPerPage);

  const currentProjects = Projects.slice(
    currentIndex * projectsPerPage,
    (currentIndex + 1) * projectsPerPage
  );

  const goToSlide = (index: number) => {
    const lastIndex = totalSlides - 1;
    if (index < 0) setCurrentIndex(lastIndex);
    else if (index > lastIndex) setCurrentIndex(0);
    else setCurrentIndex(index);
  };

  const ProjectHoverFilter = (id: number | null) => {
    setCurrentCardHover(id);
  };

  const hoveredProject = Projects.find(
    (project) => project.id === currentCardHover
  );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-gray-900/50 backdrop-blur-lg shadow-lg w-full max-w-7xl min-h-[80vh] flex flex-col justify-center items-center rounded-2xl px-6 py-3 gap-8 p-8 shadow-gray-900 border border-gray-800 [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pb-10">
        <div className="text-center flex w-[80%] justify-between items-center h-[200px]">
          <div className="flex items-start justify-start w-full text-start">
            {ProjectsTitle.render()}
          </div>
          <div className="flex items-center justify-center max-w-md text-sm text-gray-300 text-end">
            {hoveredProject ? hoveredProject.description : ""}
          </div>
        </div>
        <div className="relative flex items-center justify-center w-full overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            {currentProjects.map((project) => (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  key={project.id}
                  className="w-full px-4"
                  onMouseEnter={() => ProjectHoverFilter(project.id)}
                  onMouseLeave={() => ProjectHoverFilter(null)}
                >
                  <ProjectCard
                    title={project.title}
                    image={project.image}
                    link={project.deploy}
                    buttonText={project.buttonText}
                    stack={project.stack}
                  />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4 justify-center items-center">
          <button
            onClick={() => goToSlide(currentIndex - 1)}
            className="text-white p-2 rounded-full transition hover:scale-110 hover:text-[#FF4D7D] cursor-pointer"
            aria-label="Anterior"
          >
            <RiArrowLeftSFill className="text-4xl" />
          </button>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-[#FF4D7D] scale-150"
                  : "bg-gray-500"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
          <button
            onClick={() => goToSlide(currentIndex + 1)}
            className="text-white p-2 rounded-full transition hover:scale-110 hover:text-[#FF4D7D] cursor-pointer"
            aria-label="Siguiente"
          >
            <RiArrowRightSFill className="text-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
