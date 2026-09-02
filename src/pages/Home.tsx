import { Contact } from "@/sections/Contact/Contact";
import Experience from "@/sections/Experience/Experience";
import { Hero } from "@/sections/Hero/Hero";
import Projects from "@/sections/Projects/Projects";
import Skills from "@/sections/Skills/Skills";
import Value from "@/sections/Value/Value";

const Home = () => {
  return (
    <main id="main-content" className="flex w-full flex-col items-center">
      {/* The approved order: the cover, then the work, then the argument for
          it. Approach used to run second, which asked a visitor to read a
          paragraph about how someone builds before being shown a single thing
          they built. */}
      <Hero />
      <Projects />
      <Value />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
};

export default Home;
