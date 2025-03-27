import Available from "./components/Available";
import Title from "./components/Title";

export const Hero = () => {
  return (
    <section className="flex justify-center items-center w-[100%] min-h-screen">
      <div className="w-[100%] flex justify-center items-center min-h-screen pt-10">
        <div className="bg-circle-bg-image w-[100%] min-h-screen flex justify-center items-center bg-cover bg-no-repeat bg-top flex-col gap-10">
          <Available />
          <Title />
          <button>boton</button>
          <button>boton</button>
        </div>
      </div>
    </section>
  );
};
