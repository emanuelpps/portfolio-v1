import { Contact } from "@/sections/Contact/Contact";
import Experience from "@/sections/Experience/Experience";
import { Hero } from "@/sections/Hero/Hero";
import Projects from "@/sections/Projects/Projects";
import Skills from "@/sections/Skills/Skills";

const Home = () => {
  return (
    <main className="md:gap-20 flex flex-col justify-center items-center w-[100%]">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;
