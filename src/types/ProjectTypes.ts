/**
 * A project, minus its words.
 *
 * Everything here is language-neutral — the id, the name, the kind, the stack,
 * the links and the images — which is the same split `roles.ts` and `Stack.ts`
 * already use. The prose lives in `src/data/projectCopy.{en,es}.ts`, keyed by
 * the same id and typed so a missing translation fails the build.
 */
export interface ProjectTypes {
  id: number;
  title: string;
  type: string;
  status?: "in-development";
  stack: string[];
  code: string;
  deploy: string;
  /** The cover, used by the index and the home page. */
  frontImage: string;
  /** Neither of these is rendered anywhere today. They hold screenshots the
   *  sheets do not show; kept rather than deleted, because deleting them would
   *  throw away images nothing else has a copy of. */
  image: string;
  gallery: string[];
  /** The lead plate at the top of a sheet. */
  image2: string;
  /** Screenshots for the sheet's blocks, keyed the way the blocks are named. */
  plates: {
    why?: string[];
    build?: string[];
    hard?: string[];
  };
}
