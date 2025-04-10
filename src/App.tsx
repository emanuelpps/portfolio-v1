import Experience from "./sections/Experience/Experience";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import Projects from "./sections/Projects/Projects";
import Skills from "./sections/Skills/Skills";

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <main className="gap-10 flex flex-col">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
