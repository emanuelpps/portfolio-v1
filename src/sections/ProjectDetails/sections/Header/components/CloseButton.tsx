import { Link } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { TfiArrowCircleUp } from "react-icons/tfi";

import { RefObject } from "react";

export interface GoUpProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}
export const CloseButton = () => {
  return (
    <Link
      to="/"
      className="fixed top-8 right-8 z-[100] w-14 h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-[#FF4D7D] hover:border-[#FF4D7D] transition-all duration-500 group"
    >
      <RiCloseLargeLine size={20} className="group-rotate-90 transition-transform" />
    </Link>
  );
};

export const GoUp: React.FC<GoUpProps> = ({ scrollContainerRef }) => {
  return (
    <motion.button
      onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-110 transition-transform z-[100]"
      whileHover={{ y: -5 }}
    >
      <TfiArrowCircleUp size={24} />
    </motion.button>
  );
};