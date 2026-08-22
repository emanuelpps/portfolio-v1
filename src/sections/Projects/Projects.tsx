import { ProjectsContainer } from "./components/ProjectsContainer";
import { useScroll } from "@/hooks/UseScroll";
import { BpSection } from "@/components/blueprint/Section";

const Projects = () => {
  const { refs } = useScroll();

  return (
    <BpSection
      id="work"
      label="Work"
      title="Things I've designed, built and shipped."
      sectionRef={refs.refProjects}
    >
      <div className="mt-16 from-stem">
        <ProjectsContainer />
      </div>
    </BpSection>
  );
};

export default Projects;
