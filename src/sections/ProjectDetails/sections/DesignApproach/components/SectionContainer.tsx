import React from "react";
import { SectionFactory } from "../../../components/SectionFactory";
import { SectionProps } from "../../Types/SectionTypes";

export const SectionContainer: React.FC<SectionProps> = ({ text, images }) => {
  const PurposeSection = SectionFactory.createSection({
    type: "primary",
    text,
    images,
  });
  return <>{PurposeSection.render()}</>;
};
