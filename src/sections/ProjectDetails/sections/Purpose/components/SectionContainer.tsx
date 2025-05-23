import React from "react";
import { SectionFactory } from "../../../components/SectionFactory";
import { SectionProps } from "../../Types/SectionTypes";

export const SectionContainer: React.FC<SectionProps> = ({ text }) => {
  const PurposeSection = SectionFactory.createSection({
    type: "primary",
    text,
  });
  return <>{PurposeSection.render()}</>;
};
