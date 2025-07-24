import { ProjectsContainer } from "./components/ProjectsContainer";
import { useScroll } from "@/hooks/UseScroll";
const Projects = () => {
  const { refs } = useScroll();
  return (
    <section ref={refs.refProjects} className="mt-20 md:mt-0">
      <ProjectsContainer />
    </section>
  );
};

export default Projects;
