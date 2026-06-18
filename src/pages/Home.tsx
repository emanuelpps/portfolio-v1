import { Contact } from "@/sections/Contact/Contact";
import Experience from "@/sections/Experience/Experience";
import { Hero } from "@/sections/Hero/Hero";
import Projects from "@/sections/Projects/Projects";
import Skills from "@/sections/Skills/Skills";
import Value from "@/sections/Value/Value";

const Home = () => {
  return (
    <main id="main-content" className="flex w-full flex-col items-center">
      <Hero />
      <Value />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
};

export default Home;
