import React from "react";
import { MainImageTwo } from "./components/MainImageTwo";
import { MainImage } from "./components/MainImage";
import { Description } from "./components/Description";

interface HeroSectionProps {
  longDescription: string;
  mainImage: string;
  mainImageTwo: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  longDescription,
  mainImage,
  mainImageTwo,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-20 text-lg leading-8 text-white">
      <MainImageTwo image={mainImageTwo} />
      <Description description={longDescription} />
      <MainImage image={mainImage} />
    </div>
  );
};
