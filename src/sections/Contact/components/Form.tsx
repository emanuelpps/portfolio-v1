import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";
import { InputFactory } from "../../../components/Form/InputFactory";
import { useState, useRef } from "react";
//import { checkForm } from "../../../utils/FormValidation";
import emailjs from "@emailjs/browser";

export const Form = () => {
  const [buttonText, setButtonText] = useState<string>("Send");
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [formErrors, setFormErrors] = useState<boolean>(false);
  const [errorManagement, setErrorManagement] = useState<string>();
  const form = useRef<HTMLFormElement>(null);

  const errorManager = {
    formError: "Please check the information in the form.",
    formDeliverError: "There was a problem, and the form could not be sent.",
    formDeliverOk:
      "The message has been successfully sent. I will get in touch with you shortly.",
  };
  const NameInput = InputFactory.createInput(
    "primary",
    "Name",
    "text",
    fullName,
    (e) => setFullName(e.target.value)
  );
  const EmailInput = InputFactory.createInput(
    "primary",
    "Email",
    "email",
    email,
    (e) => setEmail(e.target.value)
  );
  const MessageInput = InputFactory.createInput(
    "secondary",
    "Message",
    "text",
    message,
    (e) => setMessage(e.target.value)
  );
  const SubmitButton = ButtonFactory.createButton({
    type: "primary",
    label: `${buttonText}`,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkForm();
  };

  const checkForm = () => {
    if (!fullName || !email || !message) {
      setFormErrors(true);
      setErrorManagement(errorManager.formError);
      setTimeout(() => {
        setFormErrors(false);
        setErrorManagement(undefined);
      }, 3000);
      return;
    }

    setFormErrors(false);
    setButtonText("Sending...");
    sendEmail();
  };

  const sendEmail = () => {
    if (!form.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_PORTFOLIO_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_API_KEY
      )
      .then(
        (response) => {
          console.log("Email enviado:", response);
          setErrorManagement(errorManager.formDeliverOk);
          setEmail("");
          setFullName("");
          setMessage("");
          setButtonText("Send");
          setFormErrors(true);
          setTimeout(() => {
            setFormErrors(false);
          }, 4000);
        },
        (error) => {
          console.log("Error:", error.status, "description:", error.text);
          setErrorManagement(errorManager.formDeliverError);
          setFormErrors(true);
          setTimeout(() => {
            setFormErrors(false);
          }, 4000);
          setButtonText("Send");
        }
      );
  };

  return (
    <form
      className="flex flex-col w-[95vw] md:w-[40%] justify-center items-center gap-10"
      ref={form}
      onSubmit={handleSubmit}
    >
      {NameInput.render()}
      {EmailInput.render()}
      {MessageInput.render()}
      <div className="w-[100%] flex justify-end items-center">
        {SubmitButton.render()}
      </div>
    </form>
  );
};
