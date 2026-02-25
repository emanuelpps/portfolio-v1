import { FC } from "react";
import { motion } from "framer-motion";
import { CircleSeparator } from "./CircleSeparator";

export enum ItemTypes {
  Primary = "primary",
  Secondary = "secondary",
}

interface ExperienceTypeProps {
  CompanyName: string;
  ItemType: ItemTypes;
  Period: string;
  JobTitle: string;
  index: number;
}


const ExperienceItem: FC<ExperienceTypeProps> = ({
  CompanyName,
  ItemType,
  JobTitle,
  Period,
  index
}) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className="relative flex flex-col md:flex-row items-center justify-center w-full mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Lado Izquierdo - Desktop */}
      <div className={`hidden md:flex w-1/2 px-8 justify-end text-right ${!isEven ? "md:order-3 md:justify-start md:text-left" : ""}`}>
        <div className="max-w-sm">
          <h3 className="text-xl font-bold text-white group-hover:text-[#FF4D7D] transition-colors">
            {isEven ? CompanyName : JobTitle}
          </h3>
          <p className="text-[#FF4D7D] font-mono text-sm font-medium mt-1 uppercase tracking-widest">
            {isEven ? Period : CompanyName}
          </p>
        </div>
      </div>

      {/* Nodo Central */}
      <div className="relative z-20 md:order-2">
        <CircleSeparator itemType={ItemType} />
      </div>

      {/* Lado Derecho - Desktop / Contenido Principal - Mobile */}
      <div className={`w-full md:w-1/2 px-8 flex justify-start text-left ${!isEven ? "md:order-1 md:justify-end md:text-right" : ""}`}>
        <div className="bg-gray-900/40 border border-white/5 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:border-[#FF4D7D]/30 transition-all duration-300 group">
          <h3 className="text-lg md:text-xl font-bold text-white">
            {isEven ? JobTitle : CompanyName}
          </h3>
          <p className="text-gray-400 text-sm mt-2 block md:hidden">{Period}</p>
          <p className={`hidden md:block text-gray-400 text-sm mt-2 font-light leading-relaxed ${!isEven ? "text-right" : "text-left"}`}>
             {isEven ? "Focusing on building scalable interfaces and high-performance web applications." : Period}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;