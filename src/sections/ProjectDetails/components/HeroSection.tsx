import React from "react";

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
  const description = longDescription.split("\n");

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-20 text-lg leading-8 text-white">
      <div className="flex items-center justify-center w-full">
        <img src={mainImageTwo} className="w-[80%] rounded-2xl" />
      </div>
      <div className="flex items-center justify-center w-full">
        <p className="w-[80%] text-balance">
          {description.map((line, i) => <p key={i}>{line}</p>) ||
            "No description available"}
        </p>
      </div>
      <div className="flex items-center justify-center w-full">
        <img src={mainImage} className="w-[80%]" />
      </div>
    </div>
  );
};
