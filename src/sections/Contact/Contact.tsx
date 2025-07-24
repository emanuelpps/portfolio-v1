import { useScroll } from "@/hooks/UseScroll";
import { FormContainer } from "./components/FormContainer";

export const Contact = () => {
  const { refs } = useScroll();
  return (
    <div
      ref={refs.refContact}
      id="contact"
      className="flex items-center justify-center w-full mt-20 md:mt-0"
    >
      <FormContainer />
    </div>
  );
};
