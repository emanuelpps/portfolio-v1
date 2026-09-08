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

/**
 * Everything he has actually built, which the index below is a selection from.
 *
 * The index is ten entries because ten is what a stranger will read. The
 * account is bigger than that, and leaving it out made the work look thinner
 * than it is — so the header says "8 of 34" and the number has to be one he
 * can stand behind when someone opens the profile and starts counting.
 *
 * Counted by hand from github.com/emanuelpps on 2026-09-07, from all 91 repos
 * on the account, public and private. What counts is a built application, site
 * or shipped library. What does not: forks (11), repos with nothing in them
 * (12), technical challenges for a hiring process (4), course drills and
 * language exercises, scaffolds and `test-`/`prueba-` spikes, GitHub's own
 * tutorial repos, and second repos of an app already counted once.
 *
 * The rule is written out rather than the number alone because the number goes
 * stale, and a number nobody can re-derive gets rounded up the next time it is
 * touched. Re-run the rule, don't guess. Libraries are counted separately and
 * come from the index, which holds both of them.
 */
export const BUILT_PROJECTS = 34;

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

/**
 * The sheet is reached by URL, not by handoff.
 *
 * `/project/11` used to work only if you had clicked your way there from the
 * index: the route read the project out of the router's `location.state`, so a
 * reload, a shared link or a new tab all landed on "Project not found". A case
 * study whose link cannot be sent to anyone is not a case study, so the id in
 * the address is the source of truth now.
 */
export const findProject = (id: string | undefined) =>
  id === undefined ? undefined : projects.find((p) => String(p.id) === id);

/** Wraps, so the last sheet leads back to the first rather than dead-ending. */
export const nextProject = (current: ProjectTypes) => {
  const i = projects.findIndex((p) => p.id === current.id);
  return projects[(i + 1) % projects.length];
};
