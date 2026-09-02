import rawProjects from "@/data/Projects.json";
import type { ProjectTypes } from "@/types/ProjectTypes";

/**
 * What the Work section is about, decided once.
 *
 * The heading needs the counts, the filters need the counts and the index needs
 * the list — and when each of those computed its own, the header could claim
 * ten projects while the filter chip beside it claimed something else. There is
 * one list and one count of it, derived from the data rather than typed into a
 * string.
 */
export const projects = rawProjects as ProjectTypes[];

export const FILTERS = ["All", "Projects", "Libraries"] as const;
export type Filter = (typeof FILTERS)[number];

const isLibrary = (p: ProjectTypes) => p.type === "Library";

export const matches = (p: ProjectTypes, f: Filter) =>
  f === "All" ? true : f === "Libraries" ? isLibrary(p) : !isLibrary(p);

export const counts: Record<Filter, number> = {
  All: projects.length,
  Projects: projects.filter((p) => !isLibrary(p)).length,
  Libraries: projects.filter(isLibrary).length,
};

/**
 * One project is shown rather than listed.
 *
 * Before this, a visitor could scroll the entire home page and never see a
 * single piece of work — an index is efficient, but a portfolio that shows no
 * work is not a portfolio. Named by id so the choice is deliberate, with a
 * positional fallback so removing that entry degrades instead of breaking.
 *
 * It stays in the index below as well. The counts say ten, so ten rows have to
 * be there; a table of contents does not skip the piece that got the spread.
 */
const FEATURED_ID = 11;

export const featured =
  projects.find((p) => p.id === FEATURED_ID) ?? projects.find((p) => !isLibrary(p));
