import { Contact } from "../sections/Contact/Contact";
import Experience from "../sections/Experience/Experience";
import { Hero } from "../sections/Hero/Hero";
import Projects from "../sections/Projects/Projects";
import Skills from "../sections/Skills/Skills";

const Home = () => {
  return (
    <main className="gap-10 flex flex-col justify-center items-center w-[100%] bg-amber-300">
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
};

export default Home;
