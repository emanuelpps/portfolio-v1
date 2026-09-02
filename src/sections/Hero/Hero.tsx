import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useScroll as useAppScroll } from "@/hooks/UseScroll";
import { EPMark } from "@/components/blueprint/EPMark";
import { jumpTo } from "@/lib/scrollToId";
import rawProjects from "@/data/Projects.json";
import type { ProjectTypes } from "@/types/ProjectTypes";
import { useT } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * The cover.
 *
 * What changed, and why:
 *
 *   The role is the headline now, not the name. A visitor arriving here is
 *   deciding in about two seconds whether this person does the thing they need
 *   done — and the previous cover answered "Emanuel Pagés" at 136px and
 *   "Frontend Developer" at 20px underneath, which is the wrong way round for
 *   everyone except people who already know him. The name is where a name
 *   belongs on a poster: top left, in the masthead, at reading size.
 *
 *   The screen ends on real work. Three named projects sit on the bottom edge
 *   of the fold, cut off just enough to say the page continues. They replaced
 *   three cells reading "Focus", "Currently", "Available" — labels that
 *   described the page instead of showing anything.
 *
 *   The right-hand block is the one piece of pure identity, and it appears
 *   exactly twice on the whole site: here, and signing off at the foot of
 *   Contact. Flat ink, mark knocked out of it in the ground colour, no accent —
 *   because the mark has no third colour to spend.
 */

const projects = rawProjects as ProjectTypes[];

/** Epic Sound Studio, Eckers, Coffee Roastery — by id, so the choice is
 *  deliberate, with a fill-in so a removed entry degrades instead of breaking. */
const COVER_IDS = [11, 13, 4];

const cover: ProjectTypes[] = (() => {
  const picked = COVER_IDS.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is ProjectTypes => Boolean(p),
  );
  if (picked.length === 3) return picked;
  const rest = projects.filter(
    (p) => p.type !== "Library" && !picked.includes(p),
  );
  return [...picked, ...rest].slice(0, 3);
})();

/* One load, staggered — rather than a dozen scattered micro-animations. Every
   element arrives on the same 16px rise so the screen assembles as one gesture.
   `MotionConfig reducedMotion="user"` in main.tsx drops the transform for
   anyone who asked for less motion; nothing here is load-bearing. */
const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const sequence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

export const Hero = () => {
  const { refs } = useAppScroll();
  const t = useT();

  return (
    <section
      ref={refs.refHome}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100dvh] w-full flex-col pt-16 lg:pt-20"
    >
      <div className="grid flex-1 grid-cols-1 lg:grid-cols-12">
        <motion.div
          variants={sequence}
          initial="hidden"
          animate="show"
          className="flex flex-col justify-between gap-10 px-[var(--pad)] py-10 sm:py-12 lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:py-14"
        >
          <div>
            {/* The longest word sets the ceiling, and it is a different word in
                each language: "DEVELOPER" is nine characters, "DESARROLLADOR"
                is thirteen. So the size lives in --hero-size, tuned per
                language in index.css, and both headlines fill their column
                edge to edge — which is what makes this read as a poster, more
                than any particular point size does. */}
            <h1
              id="hero-title"
              className="poster text-[length:var(--hero-size)] text-ink"
            >
              {/* The masthead carries the name visually; assistive tech should
                  still hear the whole claim from the page's one h1. */}
              <span className="sr-only">{t.hero.srName}</span>
              {t.hero.roleLines.map((line, i) => (
                <span key={line} className="line-mask">
                  <motion.span
                    className="block"
                    initial={{ y: "115%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.11 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* 3px: the weight that separates sections. 1px divides inside one. */}
            <motion.div
              variants={rise}
              className="mt-6 h-[3px] w-full bg-ink sm:mt-8"
            />

            <motion.p
              variants={rise}
              className="mt-6 max-w-[40ch] text-pretty text-[clamp(1.0625rem,1.75vw,1.5rem)] font-medium leading-[1.35] text-ink-2 sm:mt-7"
            >
              {t.hero.lead}
            </motion.p>
          </div>

          <motion.div
            variants={rise}
            className="flex flex-wrap items-center gap-4"
          >
            {/* One primary action per screen. It is the only thing on the cover
                wearing the bowl, so the hierarchy survives without colour —
                and both are real links, so both can be opened in a new tab and
                deep-linked to. */}
            <a
              href="#work"
              onClick={(e) => jumpTo(e, "work")}
              data-cursor="hover"
              className="bowl inline-flex min-h-12 items-center border-2 border-ink bg-ink py-3 pl-7 pr-9 text-[0.9375rem] font-semibold text-ground transition-colors duration-300 ease-bp hover:bg-ground hover:text-ink"
            >
              {t.hero.ctaWork}
            </a>
            <a
              href="#contact"
              onClick={(e) => jumpTo(e, "contact")}
              data-cursor="hover"
              className="invertible inline-flex min-h-12 items-center border-2 border-edge px-7 py-3 text-[0.9375rem] font-semibold text-ink-2"
            >
              {t.hero.ctaContact}
            </a>

            {/* Not colour-only: the square is the punctuation, the words are the
                information. A dot would be the one circle on a site whose only
                curve is the P's bowl. */}
            <p className="note flex w-full items-center gap-2.5 text-ink sm:ml-auto sm:w-auto">
              <span aria-hidden className="block h-2.5 w-2.5 shrink-0 bg-ink" />
              {t.hero.available}
            </p>
          </motion.div>
        </motion.div>

        {/* The block, bled to the edges of its cell. Full height beside the
            headline on a desktop; a band under it on a phone, where four
            columns of solid ink would eat the fold. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="on-ink grid h-[clamp(7.5rem,26vw,12rem)] place-items-center bg-ink lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:h-auto"
        >
          <EPMark
            size="clamp(4.5rem, 17vw, 15rem)"
            weight={11}
            traced
            trigger="mount"
            className="text-ground"
            title="Emanuel Pagés"
          />
        </motion.div>
      </div>

      {/* The fold closes on work, not on a scroll arrow. Cut by the viewport,
          the row is its own invitation to keep going. */}
      <motion.nav
        aria-label={t.hero.projectsLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
        className="border-t-[3px] border-ink"
      >
        <ul className="grid grid-cols-1 sm:grid-cols-3">
          {cover.map((project, i) => (
            <li
              key={project.id}
              className={
                i < 2 ? "border-b border-rule sm:border-b-0 sm:border-r" : ""
              }
            >
              <Link
                to={`/project/${project.id}`}
                data-cursor="hover"
                className="invertible group flex h-full flex-col justify-center px-[var(--pad)] py-5 sm:py-6"
              >
                <span className="display-md text-[1.3125rem] text-ink transition-colors duration-300 group-hover:text-ground">
                  {project.title}
                </span>
                <span className="note mt-1.5 text-ink-dim transition-colors duration-300 group-hover:text-ground">
                  {project.stack.slice(0, 2).join(" · ")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.nav>
    </section>
  );
};
