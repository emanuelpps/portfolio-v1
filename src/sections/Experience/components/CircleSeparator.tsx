import { motion } from "framer-motion";
import { ItemTypes } from "./ExperienceItem";

export const CircleSeparator = ({ itemType }: { itemType: ItemTypes }) => {
  const primaryColor = "#FF4D7D";
  const secondaryColor = "#9CA3AF";
  const borderColor = "#FFFFFF";

  const fillColor =
    itemType === ItemTypes.Primary ? primaryColor : secondaryColor;

  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <circle cx="20" cy="20" r="10" fill={fillColor} />
      <motion.circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke={borderColor}
        strokeWidth="1"
        strokeDasharray="5,5"
        initial={{ strokeDashoffset: 20 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </motion.svg>
  );
};
