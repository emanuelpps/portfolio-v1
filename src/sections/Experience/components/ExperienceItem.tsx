import { FC } from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line react-refresh/only-export-components
export enum ItemTypes {
  Primary = "primary",
  Secondary = "secondary",
}

interface ExperienceTypeProps {
  CompanyName: string;
  ItemType: ItemTypes;
  Period: string;
  JobTitle: string;
  Description: string;
  Technologies?: string[];
  index: number;
}

const ExperienceItem: FC<ExperienceTypeProps> = ({
  CompanyName,
  JobTitle,
  Period,
  Description,
  Technologies,
  index,
  
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center w-full mb-12 md:mb-10 px-4 md:px-0">
      <motion.div
        className={`flex w-full md:w-1/2 px-2 sm:px-4 md:px-12 mb-6 md:mb-0 ${
          isEven
            ? "md:justify-end md:text-right"
            : "md:order-last md:justify-start md:text-left"
        }`}
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "circOut" }}
      >
        <div className="flex flex-col gap-1">
          <span className="text-[#FF4D7D] font-mono text-xs font-bold tracking-[0.3em] uppercase">
            {Period}
          </span>
          <h4 className="text-white/50 text-lg font-medium tracking-tight group-hover:text-white transition-colors">
            {CompanyName}
          </h4>
        </div>
      </motion.div>
      <div className="absolute left-2 sm:left-4 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
        <motion.div
          whileInView={{ scale: [0, 1.2, 1] }}
          className="w-4 h-4 rounded-full bg-[#FF4D7D] shadow-[0_0_15px_rgba(255,77,125,0.6)] border-4 border-[#0a0f18]"
        />
      </div>
      <motion.div
        className={`w-full md:w-1/2 px-2 sm:px-4 md:px-12 ${
          isEven ? "md:justify-start" : "md:justify-end"
        }`}
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "circOut" }}
      >
        <div className="group relative bg-white/[0.04] border border-white/10 p-5 sm:p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] hover:bg-white/[0.05] hover:border-[#FF4D7D]/40 transition-all duration-500 shadow-2xl">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF4D7D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-none mb-4">
              {JobTitle}
            </h3>
            <p className="text-gray-400 text-sm sm:text-sm md:text-base leading-relaxed font-light mb-6">
              {Description}
            </p>
            {Technologies && (
              <div
                className={`flex flex-wrap gap-2 mt-2 ${!isEven && "md:justify-start"}`}
              >
                {Technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-gray-400 uppercase tracking-tighter group-hover:border-[#FF4D7D]/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceItem;
