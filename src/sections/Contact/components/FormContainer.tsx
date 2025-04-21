import { TitlesFactory } from "../../../components/Titles/TitlesFactory";

export const FormContainer = () => {
  const ContactTitle = TitlesFactory.createTitle(
    "secondary",
    "Contact me",
    "Have an Awsome Project Idea?"
  );
  return (
    <div className="flex justify-center items-center w-full text-center">
      {ContactTitle.render()}
    </div>
  );
};
