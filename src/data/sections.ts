/**
 * The sections, in document order.
 *
 * Only the ids live here now. An id is an anchor — it is in the URL, it is
 * what a shared link points at, and it must not change when the language does.
 * The visible names are copy, so they come from the dictionary keyed by id
 * (`t.nav.sections`), which is also what stops the nav and the section
 * headings from ever disagreeing about what a section is called.
 */
export const SECTION_IDS = [
  "work",
  "approach",
  "stack",
  "experience",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
