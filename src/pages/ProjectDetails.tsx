import ProjectDetailContainer from "../sections/ProjectDetails/ProjectDetailContainer";
import { motion } from "framer-motion";
import { useEffect } from "react";
const ProjectDetails = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#0F1724] overflow-y-auto"
    >
      <ProjectDetailContainer />
    </motion.div>
  );
};

export default ProjectDetails;
