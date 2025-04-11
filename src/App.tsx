import Experience from "./sections/Experience/Experience";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";
import { Hero } from "./sections/Hero/Hero";
import Projects from "./sections/Projects/Projects";
import Skills from "./sections/Skills/Skills";

function App() {
  return (
    <>
      <div className="container w-[100%] flex flex-col justify-center items-center">
        <Header />
        <main className="gap-10 flex flex-col justify-center items-center w-[100%]">
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
