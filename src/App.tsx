import Home from "./pages/Home";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";

function App() {
  return (
    <>
      <div className="container w-[100%] flex flex-col justify-center items-center">
        <Header />
        <main className="gap-10 flex flex-col justify-center items-center w-[100%]">
          <Home />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
