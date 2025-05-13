import React from "react";
import Header from "./sections/Header/Header";
import { ProjectTypes } from "../../types/ProjectTypes";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { Purpose } from "./sections/Purpose/Purpose";

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
    <div className="flex flex-col w-[100%] min-h-screen gap-20">
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
      <Purpose
        text={project.insights.purpose.text}
        images={project.insights.purpose.images}
      />
    </div>
  );
};

export default ProjectDetailContainer;
