/**
 * The record, split the way a bilingual site has to split it.
 *
 * What lives here is what does not translate: the order of the roles, the
 * company names, and which ones are still current. The period, the job title
 * and the description are copy, so they live in the dictionaries keyed by
 * `id` — "2026 — Present" is not the same string as "2026 — Actualidad", and a
 * job title in Spanish is a translation, not a proper noun.
 *
 * Keeping the company name in one place rather than in both dictionaries is
 * the point: a name repeated per language is a name that can drift.
 */
export type RoleId =
  | "dizizid"
  | "codemakerlab"
  | "epam"
  | "justina"
  | "nocountry"
  | "duodigital"
  | "vital"
  | "dafiti";

export type Role = {
  id: RoleId;
  company: string;
  /** Current work opens by default; history stays folded until asked for. */
  current?: boolean;
};

export const ROLES: Role[] = [
  { id: "dizizid", company: "Dizizid", current: true },
  { id: "codemakerlab", company: "The CodeMaker Lab", current: true },
  { id: "epam", company: "EPAM Systems" },
  { id: "justina", company: "Justina.io — Hackathon" },
  { id: "nocountry", company: "NoCountry" },
  { id: "duodigital", company: "Duo Digital" },
  { id: "vital", company: "Vital Servicios" },
  { id: "dafiti", company: "Dafiti Argentina" },
];
