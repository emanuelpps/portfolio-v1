import { useState } from "react";
import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import ProjectCard from "./ProjectCard";
import Projects from "../../../../public/data/Projects.json";

export const ProjectsContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="bg-gray-900/50 backdrop-blur-lg shadow-lg w-full max-w-7xl min-h-[80vh] flex flex-col justify-center items-center rounded-2xl px-6 py-3 gap-8 p-8 shadow-gray-900 border border-gray-800">
        <div className="text-center flex w-[80%] justify-between items-center">
          <div className="flex w-full justify-start text-start items-center">
            {ProjectsTitle.render()}
          </div>
        </div>
        <div className="relative w-full flex justify-center items-center overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            {currentProjects.map((project) => (
              <div key={project.title} className="w-full px-4">
                <ProjectCard
                  title={project.title}
                  image={project.image}
                  link={project.deploy}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-orange-500 scale-110"
                  : "bg-gray-500"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
