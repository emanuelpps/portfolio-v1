import { useScroll } from "@/hooks/UseScroll";
import SkillsContainer from "./components/SkillsContainer";

const Skills = () => {
  const { refs } = useScroll();
  return (
    <section
      ref={refs.refSkills}
      id="skills"
      className="flex items-center justify-center min-h-screen mt-16 sm:mt-20 text-white md:mt-0 md:w-full lg:min-h-min px-2 sm:px-0"
    >
      <SkillsContainer />
    </section>
  );
};

export default Skills;
