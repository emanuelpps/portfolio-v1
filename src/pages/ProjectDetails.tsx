import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectDetailContainer from "@/sections/ProjectDetails/ProjectDetailContainer";
import { findProject } from "@/sections/Projects/work";
import { getLenis } from "@/lib/SmoothScroll";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { fill, useT } from "@/i18n";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const project = findProject(projectId);
  const t = useT();

  // A new sheet opens at its own top. The router keeps the scroll position
  // across a navigation, so without this you arrive at a project two thirds of
  // the way down it.
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [projectId]);

  useDocumentMeta(
    project ? fill(t.project.metaTitle, { title: project.title }) : t.meta.title,
    project?.description ?? t.meta.description,
  );

  return <ProjectDetailContainer project={project} />;
};

export default ProjectDetails;
