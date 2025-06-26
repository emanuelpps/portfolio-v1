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
      className="relative flex flex-row text-white md:items-center md:justify-between"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="w-full text-left">
        <h3 className="text-lg font-semibold md:text-xl">{CompanyName}</h3>
        <p className="text-gray-400 text-md">{Period}</p>
      </div>
      <div className="relative z-10 flex justify-center w-[50%] md:w-full">
        <CircleSeparator itemType={ItemType} />
      </div>
      <div className="w-full text-right md:text-left">
        <h3 className="text-lg font-semibold md:text-xl">{JobTitle}</h3>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;
