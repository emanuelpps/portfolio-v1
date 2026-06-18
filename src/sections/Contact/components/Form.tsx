import { useState, useRef, JSX } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { LoadingDots } from "./LoadingDots";
import PopUp from "./PopUp";

const inputBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-colors focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)]/40";

const labelBase =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400";

export const Form = () => {
  const [buttonText, setButtonText] = useState<JSX.Element | string>(
    "Send message",
  );
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [formErrors, setFormErrors] = useState<boolean>(false);
  const [errorManagement, setErrorManagement] = useState<string>();
  const [sending, setSending] = useState<boolean>(false);
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
    setSending(true);
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
          setSending(false);
          setButtonText("Send message");
          setFormErrors(true);
          setTimeout(() => setFormErrors(false), 4000);
        },
        (error) => {
          console.log("Error:", error.status, "description:", error.text);
          setErrorManagement(errorManager.formDeliverError);
          setSending(false);
          setFormErrors(true);
          setTimeout(() => setFormErrors(false), 4000);
          setButtonText("Send message");
        },
      );
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div aria-live="polite" role="status">
        {formErrors && errorManagement && (
          <PopUp
            message={errorManagement}
            type={
              errorManagement === errorManager.formDeliverOk
                ? "success"
                : "error"
            }
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="from_name" className={labelBase}>
            Name <span className="text-[color:var(--accent)]">*</span>
          </label>
          <input
            id="from_name"
            name="from_name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="reply_to" className={labelBase}>
            Email <span className="text-[color:var(--accent)]">*</span>
          </label>
          <input
            id="reply_to"
            name="reply_to"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="jane@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          Message <span className="text-[color:var(--accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputBase} resize-none`}
        />
      </div>

      <motion.button
        type="submit"
        disabled={sending}
        aria-busy={sending}
        whileHover={sending ? undefined : { scale: 1.02 }}
        whileTap={sending ? undefined : { scale: 0.98 }}
        data-cursor="hover"
        className="self-stretch rounded-full bg-[color:var(--accent)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,77,125,0.35)] transition-opacity disabled:cursor-not-allowed disabled:opacity-60 sm:self-start"
      >
        {buttonText}
      </motion.button>
    </form>
  );
};
