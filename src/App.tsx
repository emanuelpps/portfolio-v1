import AppRoutes from "./routes/Router";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";

function App() {
  return (
    <>
      <div className="container max-w-[100vw] md:w-[100%] flex flex-col justify-center items-center overflow-x-hidden">
        <Header />
        <main className="flex flex-col items-center justify-center gap-10">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
