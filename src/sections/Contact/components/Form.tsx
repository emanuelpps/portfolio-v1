import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";
import { InputFactory } from "../../../components/Form/InputFactory";
export const Form = () => {
  const NameInput = InputFactory.createInput("primary", "Name", "text");
  const EmailInput = InputFactory.createInput("primary", "Email", "email");
  const MessageInput = InputFactory.createInput("secondary", "Message");
  const SubmitButton = ButtonFactory.createButton({
    type: "primary",
    label: "Send",
  });
  return (
    <form className="flex flex-col w-[95vw] md:w-[40%] justify-center items-center gap-10">
      {NameInput.render()}
      {EmailInput.render()}
      {MessageInput.render()}
      <div className="w-[100%] flex justify-end items-center">
        {SubmitButton.render()}
      </div>
    </form>
  );
};
