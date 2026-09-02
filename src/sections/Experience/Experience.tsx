import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useScroll } from "@/hooks/UseScroll";
import { BpSection } from "@/components/blueprint/Section";
import { ROLES, type Role } from "@/data/roles";
import { useT, type Dict } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * The record.
 *
 * The previous build drew a gradient spine down the middle of the page to act
 * as a timeline. A ledger says the same thing without it: years in one column,
 * the role in the next.
 *
 * Rows start folded so ten years read as a list rather than a wall. Current
 * work is open on arrival, because that is the part anyone came to check.
 */
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
    <div className="relative border-b border-rule">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        data-cursor="hover"
        className="invertible group flex w-full items-baseline gap-4 px-[var(--gutter)] py-6 text-left md:grid md:grid-cols-[9rem_1fr_minmax(0,14rem)_1.5rem] md:gap-6 md:py-7"
      >
        <span className="mono-sm shrink-0 text-ink-faint transition-colors group-hover:text-ground/60">
          {copy.period}
        </span>

        <span className="display-md text-xl text-ink transition-colors group-hover:text-ground sm:text-2xl">
          {role.company}
        </span>

        <span className="note hidden text-ink-dim transition-colors group-hover:text-ground/70 md:block">
          {copy.title}
        </span>

        <span
          aria-hidden
          className="note ml-auto shrink-0 text-ink-faint transition-colors group-hover:text-ground md:ml-0 md:justify-self-end"
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
            <div className="px-[var(--gutter)] pb-8 md:pl-[calc(var(--gutter)_+_10.5rem)]">
              <p className="note mb-4 text-ink-faint md:hidden">{copy.title}</p>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
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
  const { refs } = useScroll();
  const t = useT();

  return (
    <BpSection
      id="experience"
      label={t.nav.sections.experience}
      title={t.record.title}
      sectionRef={refs.refExperience}
    >
      <div className="mt-10 from-stem border-t border-rule">
        {ROLES.map((role, i) => (
          <RoleRow
            key={role.id}
            role={role}
            copy={t.record.roles[role.id]}
            n={String(i + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </BpSection>
  );
};

export default Experience;
