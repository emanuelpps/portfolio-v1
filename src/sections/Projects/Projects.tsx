import { ProjectsContainer } from "./components/ProjectsContainer";
import { useScroll } from "@/hooks/UseScroll";
import { BpSection } from "@/components/blueprint/Section";
import { useT } from "@/i18n";

const Projects = () => {
  const { refs } = useScroll();
  const t = useT();

  return (
    <BpSection
      id="work"
      label={t.nav.sections.work}
      pace="loose"
      title={t.work.title}
      sectionRef={refs.refProjects}
    >
      <div className="mt-10 from-stem">
        <ProjectsContainer />
      </div>
    </BpSection>
  );
};

export default Projects;
