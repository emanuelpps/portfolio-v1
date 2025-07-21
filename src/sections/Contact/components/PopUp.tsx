import React from "react";
import { motion } from "framer-motion";

interface PopUpProps {
  message: string;
  type: "error" | "success";
}

const PopUp: React.FC<PopUpProps> = ({ message, type }) => {
  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";
  const borderColor = type === "error" ? "border-red-400" : "border-green-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-xl border-2 ${bgColor} ${borderColor} text-white font-semibold`}
    >
      {message}
    </motion.div>
  );
};

export default PopUp;
