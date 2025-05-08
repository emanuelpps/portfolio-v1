import React from "react";
import Header from "./components/Header";
import { ProjectTypes } from "../../types/ProjectTypes";
import { HeroSection } from "./components/HeroSection";

const ProjectDetailContainer: React.FC<{ project: ProjectTypes }> = ({
  project,
}) => {
  if (!project) {
    return (
      <p className="flex items-center justify-center w-full h-screen text-center">
        Project Not Found
      </p>
    );
  }
  return (
    <div className="flex flex-col w-[100%] min-h-screen gap-10">
      <Header
        title={project.title}
        subtitle={project.description}
        code={project.code}
        deploy={project.deploy}
        stack={project.stack}
        buttonText={project.buttonText}
      />
      <HeroSection
        longDescription={project.longDescription}
        mainImage={project.image}
        mainImageTwo={project.image2}
      />
    </div>
  );
};

export default ProjectDetailContainer;
