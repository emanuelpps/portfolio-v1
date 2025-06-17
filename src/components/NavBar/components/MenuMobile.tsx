import React from "react";
import { motion } from "framer-motion";

const MenuMobile: React.FC = () => {
  return (
    <motion.div
      className="absolute z-50 text-white top-7"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 space-y-2 text-white border border-gray-800 shadow-lg bg-gray-900/50 backdrop-blur-lg rounded-2xl">
        <div>menu1</div>
        <div>menu1</div>
        <div>menu1</div>
        <div>menu1</div>
      </div>
    </motion.div>
  );
};

export default MenuMobile;
