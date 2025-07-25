import React from "react";
import { MainImageTwo } from "./components/MainImageTwo";
import { MainImage } from "./components/MainImage";
import { Description } from "./components/Description";

interface HeroSectionProps {
  longDescription: string;
  mainImage: string;
  mainImageTwo: string;
  type: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  longDescription,
  mainImage,
  mainImageTwo,
  type,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-20 text-lg leading-8 text-white">
      <div
        className={`flex flex-col gap-20 items-center justify-center w-[90%] h-full text-lg leading-8 text-white
    ${
      type === "Project"
        ? "md:flex-col md:gap-20"
        : "md:flex-row md:gap-0"
    }`}
      >
        <MainImageTwo image={mainImageTwo} type={type} />
        <Description description={longDescription} />
      </div>
      <MainImage image={mainImage} />
    </div>
  );
};
