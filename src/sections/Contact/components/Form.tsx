import { useState, useRef, JSX } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { LoadingDots } from "./LoadingDots";
import PopUp from "./PopUp";

const inputBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-colors focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)]/40";

export const Form = () => {
  const [buttonText, setButtonText] = useState<JSX.Element | string>(
    "Send message",
  );
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
        () => {
          setErrorManagement(errorManager.formDeliverOk);
          setEmail("");
          setFullName("");
          setMessage("");
          setButtonText("Send message");
          setFormErrors(true);
          setTimeout(() => setFormErrors(false), 4000);
        },
        (error) => {
          console.log("Error:", error.status, "description:", error.text);
          setErrorManagement(errorManager.formDeliverError);
          setFormErrors(true);
          setTimeout(() => setFormErrors(false), 4000);
          setButtonText("Send message");
        },
      );
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-5">
      {formErrors && errorManagement && (
        <PopUp
          message={errorManagement}
          type={
            errorManagement === errorManager.formDeliverOk ? "success" : "error"
          }
        />
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <input
          name="from_name"
          type="text"
          placeholder="Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputBase}
        />
        <input
          name="reply_to"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
        />
      </div>
      <textarea
        name="message"
        rows={5}
        placeholder="Tell me about your project…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={`${inputBase} resize-none`}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-cursor="hover"
        className="self-stretch rounded-full bg-[color:var(--accent)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,77,125,0.35)] sm:self-start"
      >
        {buttonText}
      </motion.button>
    </form>
  );
};
