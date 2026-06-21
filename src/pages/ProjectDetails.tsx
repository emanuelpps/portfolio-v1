import { useEffect } from "react";
import ProjectDetailContainer from "../sections/ProjectDetails/ProjectDetailContainer";
import { ProjectTypes } from "../types/ProjectTypes";
import { getLenis } from "@/lib/SmoothScroll";

interface ProjectDetailsProps {
  project: ProjectTypes;
}
const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  useEffect(() => {
    // Pause Lenis so the overlay's own scroll container handles the wheel.
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, []);

  return <ProjectDetailContainer project={project} />;
};

export default ProjectDetails;
