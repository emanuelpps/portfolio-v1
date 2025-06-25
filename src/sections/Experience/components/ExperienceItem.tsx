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
      className="relative flex text-white md:items-center md:justify-between"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="w-full text-left">
        <h3 className="text-xl font-semibold">{CompanyName}</h3>
        <p className="text-lg text-gray-400">{Period}</p>
      </div>
      <div className="relative z-10 justify-center hidden w-full md:flex">
        <CircleSeparator itemType={ItemType} />
      </div>
      <div className="w-full text-left">
        <h3 className="text-xl font-semibold">{JobTitle}</h3>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;
