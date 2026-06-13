import { useScroll } from "@/hooks/UseScroll";
import SkillsContainer from "./components/SkillsContainer";

const Skills = () => {
  const { refs } = useScroll();
  return (
    <section
      ref={refs.refSkills}
      id="stack"
      className="w-full py-24 text-white sm:py-32"
    >
      <SkillsContainer />
    </section>
  );
};

export default Skills;
