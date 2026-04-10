import { motion } from "framer-motion";
import { ItemTypes } from "./ExperienceItem";

export const CircleSeparator = ({ itemType }: { itemType: ItemTypes }) => {
  const isPrimary = itemType === ItemTypes.Primary;

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      {/* Aura de pulso para el item primario (trabajo actual) */}
      {isPrimary && (
        <motion.div
          className="absolute inset-0 rounded-full bg-[#FF4D7D]/20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      <motion.div
        className={`relative z-10 w-4 h-4 rounded-full border-2 ${
          isPrimary ? "bg-[#FF4D7D] border-white" : "bg-gray-800 border-gray-500"
        }`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
      />
      
      {/* Brillo sutil detrás del nodo */}
      <div className={`absolute w-8 h-8 blur-md rounded-full ${isPrimary ? "bg-[#FF4D7D]/40" : "bg-transparent"}`} />
    </div>
  );
};