import React from "react";
import Header from "./components/Header";
import { useProjectStore } from "../../store/useProjectStore";

const ProjectDetailContainer: React.FC = () => {
  const project = useProjectStore((state) => state.selectedProject);

/// refactorizar y cambiar el uso de store en zustand a transpaso de props entre componentes

  if (!project) {
    return (
      <p className="text-center flex w-full h-screen justify-center items-center">
        Project Not Found
      </p>
    );
  }
  return (
    <div className="flex w-full min-h-screen justify-center items-center">
      <Header
        title={project.title}
        subtitle={project.description}
        code={project.code}
        deploy={project.deploy}
        stack={project.stack}
      />
    </div>
  );
};

export default ProjectDetailContainer;
