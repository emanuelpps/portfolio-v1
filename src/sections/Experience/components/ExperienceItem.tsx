import { FC } from "react";
import { motion } from "framer-motion";
import { CircleSeparator } from "./CircleSeparator";

interface ExperienceTypeProps {
  CompanyName: string;
  ItemType: ItemTypes;
  Period: string;
  JobTitle: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export enum ItemTypes {
  Primary = "primary",
  Secondary = "secondary",
}

const ExperienceItem: FC<ExperienceTypeProps> = ({
  CompanyName,
  ItemType,
  JobTitle,
  Period,
}) => {
  return (
    <motion.div
      className="flex items-center gap-4 text-white justify-between relative"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="text-left w-full">
        <h3 className="font-semibold text-xl">{CompanyName}</h3>
        <p className="text-gray-400 text-lg">{Period}</p>
      </div>
      <div className="relative z-10 w-full flex justify-center">
        <CircleSeparator itemType={ItemType} />
      </div>
      <div className="text-left w-full">
        <h3 className="font-semibold text-xl">{JobTitle}</h3>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;
