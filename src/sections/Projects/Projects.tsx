import { motion } from "framer-motion";
import { ProjectsContainer } from "./components/ProjectsContainer";
import { counts } from "./work";
import { useScroll } from "@/hooks/UseScroll";
import { fill, useT } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * Work — the tallest section, and the loudest.
 *
 * It no longer goes through `BpSection`. That shell belongs to the discarded
 * Blueprint system: a 1px hairline drawn on scroll, a section name running up a
 * stem that no longer exists, and a heading wiped in a mask. The cover was
 * rebuilt without any of it, and a page where one section opens like a poster
 * and the next opens like a blueprint is two designs, not one.
 *
 * So the head is the cover's head: the section name at poster scale on the
 * left, the facts on the right, and the 3px rule underneath — the weight that
 * separates sections, against the 1px that divides inside one.
 *
 * The name is read from the masthead's own index rather than from a second
 * string. The link in the nav and the heading it lands on have to say the same
 * word, and two strings drift.
 */
const Projects = () => {
  const { refs } = useScroll();
  const t = useT();

  return (
    <section
      id="work"
      ref={refs.refProjects}
      aria-labelledby="work-title"
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
          id="work-title"
          className="poster text-[clamp(2.5rem,9vw,4rem)] text-ink"
        >
          {t.nav.sections.work}
        </h2>
        {/* Counted from the data. The one number on this page a visitor can
            check by scrolling it. */}
        <p className="note text-ink-dim">
          {fill(t.work.count, {
            projects: counts.Projects,
            libraries: counts.Libraries,
          })}
        </p>
      </motion.header>

      <div className="h-[3px] w-full bg-ink" />

      <ProjectsContainer />
    </section>
  );
};

export default Projects;
