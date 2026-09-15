import { useLang } from "@/i18n";
import { projectCopyEn } from "./projectCopy.en";
import { projectCopyEs } from "./projectCopy.es";

/**
 * The words of a project sheet, in the reader's language.
 *
 * Split the way the rest of the bilingual data is split: `Projects.json` keeps
 * what has no language — the id, the name, the kind, the stack, the links, the
 * images — and the prose lives in two sibling files keyed by the same id.
 *
 * `projectCopy.es.ts` is typed as `ProjectCopyMap`, so a project or a field
 * that exists in English and is forgotten in Spanish fails the build instead
 * of falling back to an English paragraph nobody notices for a month. That is
 * the same guarantee `es.ts` has against `en.ts` in the dictionaries, and it
 * is the reason this prose could not stay in a JSON file: JSON has no type and
 * no language, so there was nowhere for a translation to go.
 */
export type ProjectCopy = {
  /** One sentence. The sheet's lead, the meta description, and the blurb under
   *  the featured project on the home page. */
  blurb: string;
  /** Split on newlines into paragraphs by the sheet. */
  overview: string;
  why?: string;
  build?: string;
  hard?: string;
};

export type ProjectCopyMap = Record<number, ProjectCopy>;

const COPY = { en: projectCopyEn, es: projectCopyEs };

export function useProjectCopy(id: number): ProjectCopy | undefined {
  return COPY[useLang()][id];
}
