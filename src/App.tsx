import AppRoutes from "./routes/Router";
import Footer from "./sections/Footer/Footer";
import { Header } from "./sections/Header/Header";

function App() {
  return (
    <>
      <div className="container w-[100%] flex flex-col justify-center items-center">
        <Header />
        <main className="gap-10 flex flex-col justify-center items-center">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
