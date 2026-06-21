import { TfiArrowCircleUp } from "react-icons/tfi";
import { motion } from "framer-motion";

export const GoUp = () => {
  const scrollToTop = () => {
    document
      .querySelector("[data-lenis-prevent]")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      className="fixed bottom-6 right-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur-md transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] md:right-8"
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <TfiArrowCircleUp className="text-2xl" />
    </motion.button>
  );
};
