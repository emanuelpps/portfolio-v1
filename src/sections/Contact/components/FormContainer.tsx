import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import { Form } from "./Form";

export const FormContainer = () => {
  const ContactTitle = TitlesFactory.createTitle(
    "secondary",
    "Contact me",
    "Let’s Build Something Iconic",
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-8 md:p-16 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
      <div className="space-y-8">
        <div className="text-left">{ContactTitle.render()}</div>
        <p className="max-w-md text-lg font-light leading-relaxed text-left text-gray-400">
          Tengo mi bandeja de entrada abierta para nuevas oportunidades,
          colaboraciones o simplemente para charlar sobre tecnología y diseño.
        </p>
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FF4D7D]/50 transition-all">
              <span className="text-[#FF4D7D]">@</span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                Email
              </p>
              <p className="font-medium text-white">tu-email@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <Form />
      </div>
    </div>
  );
};
