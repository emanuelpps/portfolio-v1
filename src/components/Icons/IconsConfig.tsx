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
  SiExpo,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiPython,
  SiVitest,
  SiJest,
  SiFigma,
  SiJirasoftware,
  SiNotion,
  SiTrello,
  SiRetool,
} from "react-icons/si";
import { TbBrandCss3 } from "react-icons/tb";
import { GiBearFace } from "react-icons/gi";

interface Skill {
  name: string;
  Icon: (props: { size: number }) => JSX.Element;
}

interface IconsConfig {
  [category: string]: Skill[];
}

const icons: IconsConfig = {
  Frontend: [
    {
      name: "HTML 5",
      Icon: ({ size }) => <SiHtml5 size={size} color="#E34F26" />,
    },
    {
      name: "CSS 3",
      Icon: ({ size }) => <SiCss3 size={size} color="#1572B6" />,
    },
    {
      name: "JavaScript",
      Icon: ({ size }) => <SiJavascript size={size} color="#F7DF1E" />,
    },
    {
      name: "React",
      Icon: ({ size }) => <SiReact size={size} color="#61DBFB" />,
    },
    {
      name: "Next.js",
      Icon: ({ size }) => <SiNextdotjs size={size} color="#FFFFFF" />,
    },
    {
      name: "Bootstrap",
      Icon: ({ size }) => <SiBootstrap size={size} color="#7952B3" />,
    },
    {
      name: "Redux",
      Icon: ({ size }) => <SiRedux size={size} color="#764ABC" />,
    },
    {
      name: "TailwindCSS",
      Icon: ({ size }) => <SiTailwindcss size={size} color="#06B6D4" />,
    },
    {
      name: "TypeScript",
      Icon: ({ size }) => <SiTypescript size={size} color="#3178C6" />,
    },
    {
      name: "CSS Modules",
      Icon: ({ size }) => <TbBrandCss3 size={size} color="#1572B6" />,
    },
    {
      name: "Styled Components",
      Icon: ({ size }) => <SiStyledcomponents size={size} color="#DB7093" />,
    },
    {
      name: "Sass",
      Icon: ({ size }) => <SiSass size={size} color="#CC6699" />,
    },
    {
      name: "Framer Motion",
      Icon: ({ size }) => <SiFramer size={size} color="#FFFFFF" />,
    },
    {
      name: "Zustand",
      Icon: ({ size }) => <GiBearFace size={size} color="#FFFFFF" />,
    },
  ],
  Native: [
    {
      name: "React Native",
      Icon: ({ size }) => <SiReact size={size} color="#61DBFB" />,
    },
    {
      name: "Expo",
      Icon: ({ size }) => <SiExpo size={size} color="#FFFFFF" />,
    },
    {
      name: "NativeWind",
      Icon: ({ size }) => <SiTailwindcss size={size} color="#06B6D4" />,
    },
  ],
  Backend: [
    {
      name: "Node.js",
      Icon: ({ size }) => <SiNodedotjs size={size} color="#339933" />,
    },
    {
      name: "Express.js",
      Icon: ({ size }) => <SiExpress size={size} color="#FFFFFF" />,
    },
    {
      name: "MongoDB",
      Icon: ({ size }) => <SiMongodb size={size} color="#47A248" />,
    },
    {
      name: "Firebase",
      Icon: ({ size }) => <SiFirebase size={size} color="#FFCA28" />,
    },
  ],
  Testing: [
    {
      name: "Vitest",
      Icon: ({ size }) => <SiVitest size={size} color="#6E9F18" />,
    },
    {
      name: "Jest",
      Icon: ({ size }) => <SiJest size={size} color="#C21325" />,
    },
  ],
  Tools: [
    {
      name: "Figma",
      Icon: ({ size }) => <SiFigma size={size} color="#F24E1E" />,
    },
    {
      name: "Notion",
      Icon: ({ size }) => <SiNotion size={size} color="#FFFFFF" />,
    },
    {
      name: "Jira",
      Icon: ({ size }) => <SiJirasoftware size={size} color="#0052CC" />,
    },
    {
      name: "Trello",
      Icon: ({ size }) => <SiTrello size={size} color="#0079BF" />,
    },
    {
      name: "Retool",
      Icon: ({ size }) => <SiRetool size={size} color="#FFFFFF" />,
    },
  ],
  progress: [
    {
      name: "Python Diploma (UTN)",
      Icon: ({ size }) => <SiPython size={size} color="#306998" />,
    },
  ],
};

export default icons;
