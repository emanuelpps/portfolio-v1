import { createContext, useRef, RefObject, ReactNode } from "react";

type ScrollContextType = {
  refs: {
    refHome: RefObject<HTMLElement | null>;
    refSkills: RefObject<HTMLElement | null>;
    refExperience: RefObject<HTMLElement | null>;
    refProjects: RefObject<HTMLElement | null>;
    refContact: RefObject<HTMLElement | null>;
  };
  scrollTo: (
    section: "home" | "skills" | "experience" | "projects" | "contact"
  ) => void;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const refHome = useRef<HTMLElement | null>(null);
  const refSkills = useRef<HTMLElement | null>(null);
  const refExperience = useRef<HTMLElement | null>(null);
  const refProjects = useRef<HTMLElement | null>(null);
  const refContact = useRef<HTMLElement | null>(null);

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

    sectionMap[section]?.current?.scrollIntoView({ behavior: "smooth" });
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
