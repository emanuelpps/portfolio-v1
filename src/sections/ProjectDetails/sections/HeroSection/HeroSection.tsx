import React from "react";

interface HeroSectionProps {
  longDescription: string;
  mainImage: string;
  mainImageTwo: string;
  type: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  longDescription,
  mainImageTwo,
}) => {
  const paragraphs = longDescription.split("\n").filter((p) => p.trim() !== "");

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#1a1c20] shadow-2xl">
        <img
          src={mainImageTwo}
          alt="Project Showcase"
          className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#FF4D7D] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-mono text-gray-500">
              Overview
            </span>
          </div>
        </div>
        <div className="lg:col-span-8 lg:col-start-4">
          <div className="flex flex-col gap-8">
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-xl md:text-3xl font-light leading-relaxed text-gray-200 text-pretty"
              >
                {para}
              </p>
            ))}
          </div>
          <div className="mt-12 w-20 h-[1px] bg-gradient-to-r from-[#FF4D7D] to-transparent" />
        </div>
      </div>
    </div>
  );
};
