import Experience from "./sections/Experience/Experience";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import Projects from "./sections/Projects/Projects";
import Skills from "./sections/Skills/Skills";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Footer />
    </>
  );
}

export default App;
