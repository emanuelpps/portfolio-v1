import React from "react";
import Header from "./sections/Header/Header";
import { ProjectTypes } from "../../types/ProjectTypes";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { Purpose } from "./sections/Purpose/Purpose";
import { DesignApproach } from "./sections/DesignApproach/DesignApproach";
import Challenges from "./sections/Challenges/Challenges";
import { GoUp } from "./components/GoUp";
interface ProjectDetailContainerProps {
  project: ProjectTypes;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const ProjectDetailContainer: React.FC<ProjectDetailContainerProps> = ({
  project,
  scrollContainerRef,
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
      <DesignApproach
        text={project.insights.designApproach.text}
        images={project.insights.designApproach.images}
      />
      <Challenges
        text={project.insights.challenges.text}
        images={project.insights.challenges.images}
      />
      <GoUp scrollContainerRef={scrollContainerRef} />
    </div>
  );
};

export default ProjectDetailContainer;
