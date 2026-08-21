import { ProjectsContainer } from "./components/ProjectsContainer";
import { useScroll } from "@/hooks/UseScroll";
import { BpSection } from "@/components/blueprint/Section";

const Projects = () => {
  const { refs } = useScroll();

  return (
    <BpSection
      id="work"
      index="02"
      label="Work"
      title="Things I've designed, built and shipped."
      aside="Sheet 02"
      sectionRef={refs.refProjects}
    >
      <div className="mt-16 from-stem">
        <ProjectsContainer />
      </div>
    </BpSection>
  );
};

export default Projects;
