import { motion } from "framer-motion";
import { useScroll } from "@/hooks/UseScroll";
import { BpSection } from "@/components/blueprint/Section";
import { Cell, CellGrid } from "@/components/blueprint/Cell";
import { STACK } from "@/data/Stack";
import { useT } from "@/i18n";
import { EASE } from "@/lib/motion";

const Skills = () => {
  const { refs } = useScroll();
  const t = useT();

  return (
    <BpSection
      id="stack"
      label={t.nav.sections.stack}
      pace="tight"
      title={t.stack.title}
      sectionRef={refs.refSkills}
    >
      <div className="mt-10 from-stem">
        <CellGrid cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((group, gi) => {
            const copy = t.stack.groups[group.id];
            return (
              <Cell key={group.id}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display-md text-2xl text-ink">{copy.title}</h3>
                  <span className="note text-ink-faint">{copy.note}</span>
                </div>

                <ul className="mt-5 flex flex-col">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -6 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.4,
                        ease: EASE,
                        delay: gi * 0.05 + i * 0.02,
                      }}
                      className="flex items-baseline gap-4 border-b border-rule-soft py-2.5 last:border-b-0"
                    >
                      <span className="note text-ink-2">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Cell>
            );
          })}
        </CellGrid>

        <p className="gut note py-6 text-ink-faint">
          {t.stack.inProgress}
          <span className="text-ink-dim">{t.stack.studying}</span>
        </p>
      </div>
    </BpSection>
  );
};

export default Skills;
