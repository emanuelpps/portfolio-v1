import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Routes, Route, useMatch } from "react-router-dom";
import Home from "../pages/Home";
import ProjectDetails from "../pages/ProjectDetails";

const AppRoutes = () => {
  const location = useLocation();
  const isProjectPage = useMatch("/project/:projectId");

  return (
    <>
      <Home />
      <AnimatePresence>
        {isProjectPage && (
          <motion.div
            key={location.pathname}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[#0F1724]"
          >
            <ProjectDetails />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
