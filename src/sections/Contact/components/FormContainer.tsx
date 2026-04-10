import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import { Form } from "./Form";

export const FormContainer = () => {
  const ContactTitle = TitlesFactory.createTitle(
    "secondary",
    "Get in Touch",
    "Let’s Build Something Meaningful",
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 items-start bg-white/[0.02] border border-white/10 backdrop-blur-2xl p-6 sm:p-8 md:p-16 rounded-[2rem] sm:rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
      <div className="space-y-8">
        <div className="text-left">{ContactTitle.render()}</div>
        <p className="max-w-md text-base sm:text-lg font-light leading-relaxed text-left text-gray-400">
          I’m always open to meaningful conversations — whether it’s about new
          opportunities, collaborations, or simply exchanging ideas about
          technology and design.
        </p>
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center gap-4 group"></div>
        </div>
      </div>
      <div className="relative">
        <Form />
      </div>
    </div>
  );
};
