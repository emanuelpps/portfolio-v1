/**
 * The sections, in document order.
 *
 * Shared so the nav and the stem's running label can never disagree about what
 * exists or what it is called.
 */
export type SectionMeta = { id: string; label: string };

export const SECTIONS: SectionMeta[] = [
  { id: "approach", label: "Approach" },
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Record" },
  { id: "contact", label: "Contact" },
];
