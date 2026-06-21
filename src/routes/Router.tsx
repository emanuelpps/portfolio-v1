import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import Home from "../pages/Home";
import { ProjectTypes } from "../types/ProjectTypes";

// Code-split the project detail view — it's only needed once a project is opened.
const ProjectDetails = lazy(() => import("../pages/ProjectDetails"));

const AppRoutes = () => {
  const location = useLocation();
  const isProjectPage = useMatch("/project/:projectId");
  const project = location.state as ProjectTypes;

  return (
    <>
      <Home />
      <AnimatePresence>
        {isProjectPage && (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden overscroll-contain bg-[color:var(--bg)]"
          >
            <Suspense fallback={null}>
              <ProjectDetails project={project} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
