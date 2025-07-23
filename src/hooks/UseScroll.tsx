import { useRef } from "react";

export const useScroll = () => {
  const refHome = useRef<HTMLElement | null>(null);
  const refSkills = useRef<HTMLElement | null>(null);
  const refExperience = useRef<HTMLElement | null>(null);
  const refProjects = useRef<HTMLElement | null>(null);
  const refContact = useRef<HTMLElement | null>(null);

  return {
    refHome,
    refSkills,
    refExperience,
    refProjects,
    refContact,
  };
};
