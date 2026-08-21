/**
 * The stack as text.
 *
 * The previous build rendered this as a grid of brand logos, which is the most
 * interchangeable thing a portfolio can put on a page — every one of them has
 * the same twenty icons in the same six colours. Set as type it says exactly
 * as much, reads faster, weighs nothing, and belongs to this site instead of
 * to the vendors.
 */
export type StackGroup = { title: string; note: string; items: string[] };

export const STACK: StackGroup[] = [
  {
    title: "Frontend",
    note: "Daily",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "JavaScript",
      "HTML 5",
      "CSS 3",
      "TailwindCSS",
      "Sass",
      "CSS Modules",
      "Styled Components",
      "Redux",
      "Zustand",
      "Framer Motion",
      "Bootstrap",
    ],
  },
  {
    title: "Backend & data",
    note: "Working knowledge",
    items: [
      "Node.js",
      "Express.js",
      "GraphQL",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Python",
    ],
  },
  {
    title: "Native",
    note: "Mobile",
    items: ["React Native", "Expo", "NativeWind"],
  },
  {
    title: "Testing",
    note: "Coverage",
    items: ["Vitest", "React Testing Library"],
  },
  {
    title: "Cloud & ops",
    note: "Delivery",
    items: ["AWS", "Azure DevOps"],
  },
  {
    title: "Tools & automation",
    note: "Everything else",
    items: [
      "n8n",
      "Claude Code",
      "OpenCode",
      "Codex",
      "Figma",
      "Retool",
      "Jira",
      "Notion",
      "Trello",
    ],
  },
];

export const STUDYING = "Python Diploma — UTN";
