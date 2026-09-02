import { useState, useRef, ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence } from "framer-motion";
import { LoadingDots } from "./LoadingDots";
import PopUp from "./PopUp";
import { BowlButton } from "@/components/blueprint/BowlButton";
import { useT } from "@/i18n";

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
  "w-full border-0 border-b-2 border-rule bg-transparent py-3 text-[1.0625rem] text-ink " +
  "placeholder:text-ink-dim focus:outline-none";

/* Caps and wide tracking earn their keep here: a field name sitting directly
   above the thing it names has to read as a label, not as the first line of
   the content. It was set in the annotation voice at 30% opacity, which is a
   value for a rule rather than for a word. */
const labelBase = "label mb-2.5 block text-ink-dim";

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

/**
 * The status is held as a key, not as a sentence.
 *
 * Storing the resolved English string in state was fine while there was only
 * one language; with two it would freeze whatever was current when the message
 * fired, so a visitor who switched language mid-toast would be reading the
 * previous one. The key is resolved at render, which is also why the submit
 * button no longer keeps its own label in state.
 */
type Status = "errorFields" | "errorSend" | "ok" | null;

export const Form = () => {
  const t = useT();

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState<boolean>(false);
  const form = useRef<HTMLFormElement>(null);

  const flash = (next: Status, ms: number) => {
    setStatus(next);
    setTimeout(() => setStatus(null), ms);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !email || !message) {
      flash("errorFields", 3500);
      return;
    }

    setStatus(null);
    setSending(true);
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
          setEmail("");
          setFullName("");
          setMessage("");
          setSending(false);
          flash("ok", 4000);
        },
        (error) => {
          console.log("Error:", error.status, "description:", error.text);
          setSending(false);
          flash("errorSend", 4000);
        },
      );
  };

  const statusText = status
    ? {
        errorFields: t.contact.form.errorFields,
        errorSend: t.contact.form.errorSend,
        ok: t.contact.form.ok,
      }[status]
    : null;

  return (
    <form
      ref={form}
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
      noValidate
    >
      <div aria-live="polite" role="status">
        <AnimatePresence>
          {statusText && (
            <PopUp
              key="status"
              message={statusText}
              type={status === "ok" ? "success" : "error"}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <Field label={t.contact.form.name} htmlFor="from_name">
          <input
            id="from_name"
            name="from_name"
            type="text"
            autoComplete="name"
            required
            placeholder={t.contact.form.namePlaceholder}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`peer ${fieldBase}`}
          />
        </Field>

        <Field label={t.contact.form.email} htmlFor="reply_to">
          <input
            id="reply_to"
            name="reply_to"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder={t.contact.form.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`peer ${fieldBase}`}
          />
        </Field>
      </div>

      <Field label={t.contact.form.message} htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={t.contact.form.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`peer resize-none ${fieldBase}`}
        />
      </Field>

      {/* Filled, not outlined: it is the one primary action on the screen,
          and the outline is what every other control on the page already
          wears. */}
      <BowlButton
        type="submit"
        variant="filled"
        disabled={sending}
        aria-busy={sending}
        className="self-start"
      >
        {sending ? <LoadingDots /> : t.contact.form.send}
      </BowlButton>
    </form>
  );
};
