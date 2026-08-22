import React from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface PopUpProps {
  message: string;
  type: "error" | "success";
}

/**
 * Monochrome status, so the two outcomes still read apart without colour:
 * success arrives inverted — solid ink, the same fill every completed control
 * on this site uses — while a failure stays an unfilled outline. The state is
 * also written out in the label, since shape alone is not something a screen
 * reader or a colour-blind visitor should have to interpret.
 */
const PopUp: React.FC<PopUpProps> = ({ message, type }) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`bowl fixed bottom-8 right-6 z-[180] flex max-w-sm items-start gap-4 border py-4 pl-5 pr-8 ${
        isSuccess
          ? "border-ink bg-ink text-ground"
          : "border-ink/60 bg-ground text-ink"
      }`}
    >
      <span className="note mt-1 shrink-0 opacity-60">
        {isSuccess ? "Sent" : "Error"}
      </span>
      <span className="text-sm font-light leading-snug">{message}</span>
    </motion.div>
  );
};

export default PopUp;
