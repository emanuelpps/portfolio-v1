import { createContext, useRef, RefObject, ReactNode } from "react";
import { getLenis } from "@/lib/SmoothScroll";

type ScrollContextType = {
  refs: {
    refHome: RefObject<HTMLDivElement | null>;
    refSkills: RefObject<HTMLDivElement | null>;
    refExperience: RefObject<HTMLDivElement | null>;
    refProjects: RefObject<HTMLDivElement | null>;
    refContact: RefObject<HTMLDivElement | null>;
  };
  scrollTo: (
    section: "home" | "skills" | "experience" | "projects" | "contact"
  ) => void;
};

export const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const refHome = useRef<HTMLDivElement | null>(null);
  const refSkills = useRef<HTMLDivElement | null>(null);
  const refExperience = useRef<HTMLDivElement | null>(null);
  const refProjects = useRef<HTMLDivElement | null>(null);
  const refContact = useRef<HTMLDivElement | null>(null);

  const scrollTo = (
    section: "home" | "skills" | "experience" | "projects" | "contact"
  ) => {
    const sectionMap = {
      home: refHome,
      skills: refSkills,
      experience: refExperience,
      projects: refProjects,
      contact: refContact,
    };

    const el = sectionMap[section]?.current;
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -80 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider
      value={{
        refs: {
          refHome,
          refSkills,
          refExperience,
          refProjects,
          refContact,
        },
        scrollTo,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
