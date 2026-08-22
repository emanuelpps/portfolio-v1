import { useState, useRef, JSX, ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence } from "framer-motion";
import { LoadingDots } from "./LoadingDots";
import PopUp from "./PopUp";
import { BowlButton } from "@/components/blueprint/BowlButton";

/**
 * Fields are underlines, not boxes. A bordered input is four strokes where the
 * form only needs one, and the extra three fight the hairline grid the rest of
 * the page is built from.
 *
 * Focus is drawn rather than ringed: a full-weight line sweeps in under the
 * active field, the same gesture every rule on this site enters with. That
 * replaces the global focus outline for these controls — see index.css.
 */
const fieldBase =
  "w-full border-0 border-b border-rule bg-transparent py-3 font-light text-ink " +
  "placeholder:text-ink-faint focus:outline-none";

const labelBase = "note mb-1 block text-ink-faint";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelBase}>
        {label} <span className="text-ink">*</span>
      </label>
      <div className="relative">
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-ink transition-transform duration-500 ease-bp peer-focus:scale-x-100"
        />
      </div>
    </div>
  );
}

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
    <form
      ref={form}
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
      noValidate
    >
      <div aria-live="polite" role="status">
        <AnimatePresence>
          {formErrors && errorManagement && (
            <PopUp
              key="status"
              message={errorManagement}
              type={
                errorManagement === errorManager.formDeliverOk
                  ? "success"
                  : "error"
              }
            />
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field label="Name" htmlFor="from_name">
          <input
            id="from_name"
            name="from_name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`peer ${fieldBase}`}
          />
        </Field>

        <Field label="Email" htmlFor="reply_to">
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
            className={`peer ${fieldBase}`}
          />
        </Field>
      </div>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`peer resize-none ${fieldBase}`}
        />
      </Field>

      <BowlButton
        type="submit"
        disabled={sending}
        aria-busy={sending}
        className="self-start"
      >
        {buttonText}
      </BowlButton>
    </form>
  );
};
