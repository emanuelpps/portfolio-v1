import { ButtonFactory } from "../../../components/Buttons/ButtonFactory";
import { InputFactory } from "../../../components/Form/InputFactory";
import { useState, useRef, JSX } from "react";
import emailjs from "@emailjs/browser";
import { LoadingDots } from "./LoadingDots";
import PopUp from "./PopUp";
import { motion } from "framer-motion";

export const Form = () => {
  const [buttonText, setButtonText] = useState<JSX.Element | string>("Send");
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
    "from_name",
    fullName,
    (e) => setFullName(e.target.value),
  );

  const EmailInput = InputFactory.createInput(
    "primary",
    "Email",
    "email",
    "reply_to",
    email,
    (e) => setEmail(e.target.value),
  );

  const MessageInput = InputFactory.createInput(
    "secondary",
    "Message",
    "text",
    "message",
    message,
    (e) => setMessage(e.target.value),
  );

  const SubmitButton = ButtonFactory.createButton({
    type: "primary",
    label: buttonText,
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
      }, 3500);
      return;
    }

    setFormErrors(false);
    setButtonText(<LoadingDots />);
    sendEmail();
  };

  const sendEmail = () => {
    if (!form.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_PORTFOLIO_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_API_KEY,
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
        },
      );
  };

  return (
    <form
      className="flex flex-col w-full gap-5 sm:gap-6"
      ref={form}
      onSubmit={handleSubmit}
    >
      {formErrors && errorManagement && (
        <PopUp
          message={errorManagement}
          type={
            errorManagement === errorManager.formDeliverOk ? "success" : "error"
          }
        />
      )}
      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
        <div className="text-left">{NameInput.render()}</div>
        <div className="text-left">{EmailInput.render()}</div>
      </div>
      <div className="w-full text-left">{MessageInput.render()}</div>
      <div className="flex justify-stretch sm:justify-end mt-6 sm:mt-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto"
        >
          {SubmitButton.render()}
        </motion.div>
      </div>
    </form>
  );
};
