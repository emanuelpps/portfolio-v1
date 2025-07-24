import { SkillsContainer } from "./components/SkillsContainer";
import { useScroll } from "@/hooks/UseScroll";

const Skills = () => {
  const { refs } = useScroll();
  return (
    <section
      ref={refs.refSkills}
      id="skills"
      className="w-[100vw] mt-20 md:mt-0 md:w-full min-h-screen flex justify-center items-center bg-[#0F1621] text-white"
    >
      <SkillsContainer />
    </section>
  );
};

export default Skills;
