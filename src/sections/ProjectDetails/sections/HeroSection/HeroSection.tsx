import React from "react";
import { MainImageTwo } from "./components/MainImageTwo";
import { MainImage } from "./components/MainImage";
import { Description } from "./components/Description";
import { TypeOfProject } from "../../../../types/ProjectTypes";

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
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-20 text-lg leading-8 text-white">
      <div
        className={`flex ${
          type == TypeOfProject.PROJECT && "flex-col gap-20"
        }  items-center justify-center w-[90%] h-full text-lg leading-8 text-white`}
      >
        <MainImageTwo image={mainImageTwo} type={type} />
        <Description description={longDescription} />
      </div>
      <MainImage image={mainImage} />
    </div>
  );
};
