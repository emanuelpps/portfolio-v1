import { useScroll } from "@/hooks/UseScroll";
import { FormContainer } from "./components/FormContainer";

export const Contact = () => {
  const { refs } = useScroll();
  return (
    <section
      ref={refs.refContact}
      id="contact"
      className="relative flex w-full items-center justify-center px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--accent)]/10 blur-[150px] sm:h-[600px] sm:w-[600px]" />
      <div className="relative z-10 w-full max-w-[80rem]">
        <FormContainer />
      </div>
    </section>
  );
};
