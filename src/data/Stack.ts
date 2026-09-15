/**
 * The stack as text.
 *
 * The previous build rendered this as a grid of brand logos, which is the most
 * interchangeable thing a portfolio can put on a page — every one of them has
 * the same twenty icons in the same six colours. Set as type it says exactly
 * as much, reads faster, weighs nothing, and belongs to this site instead of
 * to the vendors.
 *
 * The tool names are proper nouns and stay here untranslated. The group titles
 * and their notes are copy, so they live in the dictionaries keyed by `id`.
 */
export type StackGroupId =
  | "frontend"
  | "backend"
  | "native"
  | "testing"
  | "cloud"
  | "tools";

export type StackGroup = { id: StackGroupId; items: string[] };

export const STACK: StackGroup[] = [
  {
    id: "frontend",
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
    id: "backend",
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
    id: "native",
    items: ["React Native", "Expo", "NativeWind"],
  },
  {
    id: "testing",
    items: ["Vitest", "React Testing Library"],
  },
  {
    id: "cloud",
    items: ["AWS", "Azure DevOps"],
  },
  {
    id: "tools",
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
