import { TitlesFactory } from "../../../components/Titles/TitlesFactory";
import { Form } from "./Form";

export const FormContainer = () => {
  const ContactTitle = TitlesFactory.createTitle(
    "secondary",
    "Contact me",
    "Have an Awsome Project Idea?"
  );
  return (
    <div className="flex flex-col justify-center items-center w-full text-center">
      {ContactTitle.render()}
      <Form />
    </div>
  );
};
