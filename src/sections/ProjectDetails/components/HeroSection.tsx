import React from "react";
import { TypeOfProject } from "@/types/ProjectTypes";

interface HeroSectionProps {
  longDescription: string;
  mainImage: string;
  mainImageTwo: string;
  type: TypeOfProject;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  longDescription,
  mainImage,
  mainImageTwo,
  type,
}) => {
  const description = longDescription.split("\n");

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-20 text-lg leading-8 text-white">
      <div className="flex items-center justify-center w-full">
        <img src={mainImageTwo} className="w-[80%] rounded-2xl" />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-[80%] text-balance">
          {description.length > 0 ? (
            description.map((line, i) => <p key={i}>{line}</p>)
          ) : (
            <p>No description available</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <img
          src={mainImage}
          className={
            type === "Project"
              ? "w-[80%]"
              : "w-[10%] object-contain"
          }
          alt="Main visual"
        />
      </div>
    </div>
  );
};
