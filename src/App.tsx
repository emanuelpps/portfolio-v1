import { AnimatedBackground } from "./components/Background/AnimatedBackground";
import AppRoutes from "./routes/Router";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";

function App() {
  return (
    <>
      <div className="container flex flex-col items-center justify-center overflow-x-hidden">
        <Header />
        <main className="flex flex-col items-center justify-center gap-10 max-w-7xl w-full">
          <AnimatedBackground />
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
