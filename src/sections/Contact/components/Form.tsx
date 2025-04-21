import { InputFactory } from "../../../components/Form/InputFactory";
export const Form = () => {
  const NameInput = InputFactory.createInput({
    type: "primary",
    label: "name",
    category: "text",
  });
  const EmailInput = InputFactory.createInput({
    type: "primary",
    label: "email",
    category: "email",
  });
  const MessageInput = InputFactory.createInput({
    type: "primary",
    label: "message",
  });
  return (
    <div className="flex flex-col w-full justify-center items-center gap-10">
      {NameInput.render()}
      {EmailInput.render()}
      {MessageInput.render()}
    </div>
  );
};
