import { JSX } from "react";
import {
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiReact,
    SiNextdotjs,
    SiBootstrap,
    SiRedux,
    SiTailwindcss,
    SiTypescript,
    SiStyledcomponents,
    SiSass,
    SiFramer,
    SiZustand,
    SiReactnative,
    SiExpo,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiFirebase,
    SiPython,
    SiVitest,
    SiJest
  } from "react-icons/si";
  import { TbBrandCss3 } from "react-icons/tb";
  import { IconType } from "react-icons";
  
  interface Skill {
    name: string;
    icon: JSX.Element;
  }
  
  interface IconsConfig {
    [category: string]: Skill[];
  }
  
  const icons: IconsConfig = {
    frontend: [
      { name: "HTML 5", icon: <SiHtml5 size={32} color="#E34F26" /> },
      { name: "CSS 3", icon: <SiCss3 size={32} color="#1572B6" /> },
      { name: "JavaScript", icon: <SiJavascript size={32} color="#F7DF1E" /> },
      { name: "React", icon: <SiReact size={32} color="#61DBFB" /> },
      { name: "Next.js", icon: <SiNextdotjs size={32} color="#000000" /> },
      { name: "Bootstrap", icon: <SiBootstrap size={32} color="#7952B3" /> },
      { name: "Redux", icon: <SiRedux size={32} color="#764ABC" /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={32} color="#06B6D4" /> },
      { name: "TypeScript", icon: <SiTypescript size={32} color="#3178C6" /> },
      { name: "CSS Modules", icon: <TbBrandCss3 size={32} color="#1572B6" /> },
      { name: "Styled Components", icon: <SiStyledcomponents size={32} color="#DB7093" /> },
      { name: "Sass", icon: <SiSass size={32} color="#CC6699" /> },
      { name: "Framer Motion", icon: <SiFramer size={32} color="#0055FF" /> },
      { name: "Zustand", icon: <SiZustand size={32} color="#323330" /> },
    ],
    native: [
      { name: "React Native", icon: <SiReactnative size={32} color="#61DBFB" /> },
      { name: "Expo", icon: <SiExpo size={32} color="#000020" /> },
      { name: "NativeWind", icon: <SiTailwindcss size={32} color="#06B6D4" /> },
    ],
    backend: [
      { name: "Node.js", icon: <SiNodedotjs size={32} color="#339933" /> },
      { name: "Express.js", icon: <SiExpress size={32} color="#000000" /> },
      { name: "MongoDB", icon: <SiMongodb size={32} color="#47A248" /> },
      { name: "Firebase", icon: <SiFirebase size={32} color="#FFCA28" /> },
    ],
    testing: [
      { name: "Vitest", icon: <SiVitest size={32} color="#6E9F18" /> },
      { name: "Jest", icon: <SiJest size={32} color="#C21325" /> },
    ],
    progress: [
      { name: "Python Diploma (UTN)", icon: <SiPython size={32} color="#306998" /> },
    ],
  };
  
  export default icons;
  