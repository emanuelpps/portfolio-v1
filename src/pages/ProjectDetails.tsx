import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import ProjectDetailContainer from "../sections/ProjectDetails/ProjectDetailContainer";
import { ProjectTypes } from "../types/ProjectTypes";

interface ProjectDetailsProps {
  project: ProjectTypes;
}
const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#0F1724] overflow-x-hidden overflow-y-auto"
    >
      <ProjectDetailContainer
        project={project}
        scrollContainerRef={containerRef}
      />
    </motion.div>
  );
};

export default ProjectDetails;
