import AppRoutes from "./routes/Router";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";
import { Stem } from "@/components/blueprint/Stem";
import { Crosshair } from "@/components/blueprint/Crosshair";

function App() {
  return (
    <div className="grain relative min-h-screen w-full overflow-x-hidden bg-ground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {/* The spine the whole document hangs from. Behind everything, always. */}
      <Stem />
      <Crosshair />
      <Header />
      <div className="relative z-10">
        <AppRoutes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
