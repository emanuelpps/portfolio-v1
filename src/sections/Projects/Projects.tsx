import { ProjectsContainer } from "./components/ProjectsContainer";
import { useScroll } from "@/hooks/UseScroll";
const Projects = () => {
  const { refs } = useScroll();
  return (
    <section ref={refs.refProjects} className="w-full flex justify-center">
      <ProjectsContainer />
    </section>
  );
};

export default Projects;
