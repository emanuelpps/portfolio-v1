
import { useScroll } from "@/hooks/UseScroll";
import SkillsContainer from "./components/SkillsContainer";

const Skills = () => {
  const { refs } = useScroll();
  return (
    <section
      ref={refs.refSkills}
      id="skills"
      className="w-[100vw] mt-20 md:mt-0 md:w-full min-h-screen lg:min-h-min flex justify-center items-center text-white"
    >
      <SkillsContainer />
    </section>
  );
};

export default Skills;
