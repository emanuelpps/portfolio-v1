import ExperienceContainer from "./components/ExperienceContainer";
import { useScroll } from "@/hooks/UseScroll";

const Experience = () => {
  const { refs } = useScroll();
  return (
    <section
      ref={refs.refExperience}
      id="experience"
      className="max-w-[100vw] md:w-full flex justify-center items-center text-white flex-col"
    >
      <ExperienceContainer />
    </section>
  );
};

export default Experience;
