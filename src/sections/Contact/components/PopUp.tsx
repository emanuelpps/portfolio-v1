import React from "react";
import { motion } from "framer-motion";

interface PopUpProps {
  message: string;
  type: "error" | "success";
}

const PopUp: React.FC<PopUpProps> = ({ message, type }) => {
  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed bottom-10 right-10 z-[100] px-8 py-4 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center gap-4 ${
        isSuccess
          ? "bg-green-500/10 border-green-500/50 text-green-200"
          : "bg-red-500/10 border-red-500/50 text-red-200"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full animate-pulse ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
      />
      <span className="text-sm font-medium tracking-wide">{message}</span>
    </motion.div>
  );
};

export default PopUp;
