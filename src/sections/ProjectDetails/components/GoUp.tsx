import { TfiArrowCircleUp } from "react-icons/tfi";
import { motion } from "framer-motion";

interface GoUpProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export const GoUp: React.FC<GoUpProps> = ({ scrollContainerRef }) => {
  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      className="fixed bottom-5 right-5 z-[9999] cursor-pointer"
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      onClick={scrollToTop}
    >
      <TfiArrowCircleUp className="text-white/90 text-3xl" />
    </motion.div>
  );
};
