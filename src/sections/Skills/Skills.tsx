import { motion } from "framer-motion";
import { useScroll } from "@/hooks/UseScroll";
import { BpSection } from "@/components/blueprint/Section";
import { Cell, CellGrid } from "@/components/blueprint/Cell";
import { STACK, STUDYING } from "@/data/Stack";
import { EASE } from "@/lib/motion";


const Skills = () => {
  const { refs } = useScroll();

  return (
    <BpSection
      id="stack"
      label="Stack"
      title="The tools I reach for."
      sectionRef={refs.refSkills}
    >
      <div className="mt-16 from-stem">
        <CellGrid cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((group, gi) => (
            <Cell key={group.title}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-md text-2xl text-ink">{group.title}</h3>
                <span className="note text-ink-faint">{group.note}</span>
              </div>

              <ul className="mt-6 flex flex-col">
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
                    <span className="note text-ink-dim">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Cell>
          ))}
        </CellGrid>

        <p className="gut note py-8 text-ink-faint">
          In progress — <span className="text-ink-dim">{STUDYING}</span>
        </p>
      </div>
    </BpSection>
  );
};

export default Skills;
