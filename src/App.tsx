import AppRoutes from "./routes/Router";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";
import { Atmosphere } from "@/components/layout/Atmosphere";
import { CustomCursor } from "@/components/motion/CustomCursor";

function App() {
  return (
    <div className="grain relative min-h-screen w-full overflow-x-hidden bg-[color:var(--bg)]">
      <Atmosphere />
      <CustomCursor />
      <Header />
      <div className="relative z-10">
        <AppRoutes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
