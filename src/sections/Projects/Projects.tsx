import { ProjectsContainer } from "./components/ProjectsContainer";
import { useScroll } from "@/hooks/UseScroll";

const Projects = () => {
  const { refs } = useScroll();
  return (
    <section
      ref={refs.refProjects}
      id="work"
      className="w-full px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto w-full max-w-[80rem]">
        <ProjectsContainer />
      </div>
    </section>
  );
};

export default Projects;
