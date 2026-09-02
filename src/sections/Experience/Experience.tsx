import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROLES, type Role } from "@/data/roles";
import { fill, useT, type Dict } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * Record — a ledger, not a timeline.
 *
 * The previous build drew a gradient spine down the middle of the page with
 * dots on it. A ledger says the same thing and says it faster: years in one
 * column, the company in the next, the title in the third. No spine, no dots,
 * no glow.
 *
 * Rows start folded so ten years read as a list rather than a wall, and
 * current work is open on arrival, because that is the part anyone came here
 * to check.
 */

/** Aligns a description with the company column above it, rather than with the
 *  page margin — the indent is the years column plus the grid gap. */
const INDENT = "md:pl-[calc(var(--pad)+13.25rem)]";

function RoleRow({
  role,
  copy,
  n,
}: {
  role: Role;
  copy: Dict["record"]["roles"][keyof Dict["record"]["roles"]];
  n: string;
}) {
  const [open, setOpen] = useState(!!role.current);
  const id = `role-${n}`;

  return (
    <div className="border-b border-rule">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        data-cursor="hover"
        className="invertible group flex w-full items-baseline gap-4 px-[var(--pad)] py-6 text-left md:grid md:grid-cols-[11.5rem_minmax(0,1fr)_minmax(0,16rem)_1.875rem] md:gap-7 md:py-7"
      >
        {/* Tabular figures, because the whole point of a year column is that
            the years line up. Held at --ink-dim rather than --ink-faint: 30%
            is a value for a rule, not for a date someone is reading. */}
        <span className="mono-sm shrink-0 text-ink-dim transition-colors group-hover:text-ground/70">
          {copy.period}
        </span>

        <span className="display-md text-[clamp(1.25rem,2.6vw,1.6875rem)] text-ink transition-colors group-hover:text-ground">
          {role.company}
        </span>

        <span className="note hidden text-ink-dim transition-colors group-hover:text-ground/70 md:block">
          {copy.title}
        </span>

        {/* The one place a glyph carries state. It is a sign, not an icon, and
            it changes rather than rotating. */}
        <span
          aria-hidden
          className="ml-auto shrink-0 text-[1.375rem] font-semibold leading-none text-ink-dim transition-colors group-hover:text-ground md:ml-0 md:justify-self-end"
        >
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className={`px-[var(--pad)] pb-7 ${INDENT}`}>
              {/* The title has its own column on a desktop and nowhere to sit
                  on a phone, so on a phone it opens with the description. */}
              <p className="note mb-3 text-ink-dim md:hidden">{copy.title}</p>
              <p className="max-w-[62ch] text-[1.0625rem] leading-[1.55] text-ink-2">
                {copy.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Experience = () => {
  const t = useT();

  return (
    <section
      id="experience"
      aria-labelledby="record-title"
      className="w-full pt-24 sm:pt-32"
    >
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="gut flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 pb-6 sm:pb-7"
      >
        <h2
          id="record-title"
          className="poster text-[clamp(2.5rem,9vw,4rem)] text-ink"
        >
          {t.nav.sections.experience}
        </h2>
        <p className="note text-ink-dim">
          {fill(t.record.note, { roles: ROLES.length })}
        </p>
      </motion.header>

      <div className="h-[3px] w-full bg-ink" />

      <div>
        {ROLES.map((role, i) => (
          <RoleRow
            key={role.id}
            role={role}
            copy={t.record.roles[role.id]}
            n={String(i + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
