import { useScroll } from "@/hooks/UseScroll";
import { FormContainer } from "./components/FormContainer";
import { motion } from "framer-motion";

export const Contact = () => {
  const { refs } = useScroll();
  return (
    <section
      ref={refs.refContact}
      id="contact"
      className="relative flex items-center justify-center w-full min-h-screen px-4 py-24 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF4D7D]/10 blur-[150px] rounded-full pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-6xl"
      >
        <FormContainer />
      </motion.div>
    </section>
  );
};
