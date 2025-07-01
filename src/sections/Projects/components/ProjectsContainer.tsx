import { useState } from "react";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import ProjectCard from "./ProjectCard";
import Projects from "../../../../public/data/Projects.json";
import { RiArrowRightSFill, RiArrowLeftSFill } from "react-icons/ri";
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
    <div className="flex flex-col items-center md:w-full">
      <div className="bg-gray-900/50 backdrop-blur-lg shadow-lg max-w-[95vw] md:w-full md:max-w-7xl h-full md:min-h-[80vh] flex flex-col justify-center items-center rounded-2xl px-6 py-3 gap-8 p-8 shadow-gray-900 border border-gray-800 [mask-image:linear-gradient(to_bottom,white_80%,transparent)] pb-10">
        <div className="text-center flex md:w-[80%] justify-between items-center h-full md:h-[200px]">
          <div className="flex w-full md:items-start md:justify-start md:text-start">
            {ProjectsTitle.render()}
          </div>
          <div className="items-center justify-center hidden max-w-md text-sm text-gray-300 md:flex text-end">
            {hoveredProject ? hoveredProject.description : ""}
          </div>
        </div>

        {/* DESKTOP VIEW - 3 cards por slide */}
        <div className="relative items-center justify-center hidden w-full overflow-hidden md:flex">
          <div className="flex transition-transform duration-500 ease-in-out">
            {currentProjects.map((project) => (
              <AnimatePresence mode="wait" key={project.id}>
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
                  <ProjectCard project={project} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW - scroll horizontal de una en una */}
        <div className="flex w-[95vw] min-h-full gap-20 overflow-x-auto overflow-y-hidden md:hidden scroll-smooth snap-x snap-mandatory">
          {Projects.map((project) => (
            <div
              key={project.id}
              className="min-w-full px-2 snap-start"
              onMouseEnter={() => ProjectHoverFilter(project.id)}
              onMouseLeave={() => ProjectHoverFilter(null)}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* DESKTOP NAVIGATION ONLY */}
        <div className="items-center justify-center hidden gap-2 mt-4 md:flex">
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
