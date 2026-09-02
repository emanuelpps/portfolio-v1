import { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ProjectTypes } from "@/types/ProjectTypes";
import { useEnvironment } from "@/hooks/useEnvironment";
import { useT } from "@/i18n";
import { EASE } from "@/lib/motion";
import {
  FILTERS,
  counts,
  featured,
  matches,
  projects,
  type Filter,
} from "../work";

/**
 * The featured piece, as a split rather than a banner.
 *
 * It used to be a full-bleed 16:9 image with every word stacked underneath —
 * which is the shape of a hero image, and it made the section open on a picture
 * with no claim attached. Seven columns of image against five of type, divided
 * by the same 3px rule that separates sections, reads as a cover: the picture
 * and the argument for it arrive together.
 *
 * The whole block is one link, so the call to action is a `span` wearing the
 * bowl rather than a control nested inside another control. One tab stop, one
 * target, and the fill still inverts on hover because the group carries it.
 */
const Featured = ({ project }: { project: ProjectTypes }) => {
  const t = useT();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <Link
        to={`/project/${project.id}`}
        state={project}
        data-cursor="hover"
        className="group grid grid-cols-1 border-b-[3px] border-ink lg:grid-cols-12"
      >
        {/* aspect-ratio rather than a bare lazy image: the box is reserved
            before the file lands, so nothing below it jumps when it does.

            The cap is what keeps the split honest on a wide screen. Seven
            columns at 16:10 grow with the viewport while five columns of type
            do not, so past about 1400px the picture was setting a row height
            the words could not reach and the panel opened a 200px hole in its
            own middle. Measured, the ratio holds untouched to 1400 and the
            block simply stops getting taller after that. */}
        <div className="aspect-[16/10] overflow-hidden border-b-[3px] border-ink bg-ground-2 lg:col-span-7 lg:max-h-[28.5rem] lg:border-b-0 lg:border-r-[3px]">
          <img
            src={project.frontImage}
            alt={`${project.title} — cover`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-bp group-hover:scale-[1.02]"
          />
        </div>

        {/* Top-aligned, not spread. Pinning the footer to the bottom of a
            column taller than its content puts the air in the middle, where it
            reads as a mistake; letting the column simply end puts the same air
            underneath, where it reads as margin. */}
        <div className="flex flex-col gap-8 px-[var(--pad)] py-9 lg:col-span-5 lg:py-10">
          <div>
            {/* Caps and wide tracking, which the rest of the page avoids: this
                is a field name sitting directly above the thing it names, and
                it has to read as a label rather than as the first line of the
                content. */}
            <p className="label text-ink-dim">{t.work.featuredLabel}</p>
            <h3 className="display mt-4 text-[clamp(1.875rem,4.2vw,2.875rem)] text-ink">
              {project.title}
            </h3>
            {/* The one project blurb that lives in the dictionary rather than in
                Projects.json. The detail sheets are still English-only, but this
                paragraph sits on the home page under a Spanish heading, and a
                single English sentence there reads as a bug rather than as
                scope. */}
            <p className="mt-4 text-[1.0625rem] leading-[1.5] text-ink-2 sm:text-lg">
              {t.work.featuredDescription}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5">
            <p className="note text-ink-dim">
              {project.stack.slice(0, 4).join(" · ")}
            </p>
            <span className="bowl inline-flex min-h-12 items-center border-2 border-ink bg-ink py-3 pl-7 pr-9 text-[0.9375rem] font-semibold text-ground transition-colors duration-300 ease-bp group-hover:bg-ground group-hover:text-ink">
              {t.work.featuredCta}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* The index arrives as one gesture rather than as ten. Staggering from the
   parent instead of delaying each row by its own position matters once a filter
   is applied: with a per-row delay, the ninth surviving row still waits out
   eight rows that are no longer on the page. */
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const row: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * The rest of the work, as an index rather than a gallery.
 *
 * A grid of cards asks you to look at ten pictures at once and shows you the
 * screenshots instead of the work. An index gives you the facts in one scan —
 * name, kind, stack — and hands over the image only for the line you are
 * actually reading. So the images live on the pointer: one preview, masked
 * into the P's bowl, riding just off the cursor.
 *
 * On touch there is no pointer to ride, so the preview is not faked. Each row
 * simply carries its own thumbnail.
 */
export const ProjectsContainer = () => {
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const floats = hasFinePointer && !reducedMotion;
  const t = useT();

  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<ProjectTypes | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 320, damping: 34, mass: 0.5 });
  const py = useSpring(y, { stiffness: 320, damping: 34, mass: 0.5 });

  const filtered = projects.filter((p) => matches(p, filter));

  const track = (e: React.MouseEvent) => {
    if (!floats) return;
    x.set(e.clientX + 28);
    y.set(e.clientY - 96);
  };

  return (
    <div className="w-full" onMouseMove={track}>
      {featured && <Featured project={featured} />}

      {/* Filter — the only place a bowl is allowed to carry state. The idle chip
          is outlined in --edge rather than in the hairline the rules are drawn
          in: this is the boundary of a control, and WCAG 1.4.11 asks it to hold
          3:1 where a divider is free to whisper. */}
      <div
        role="tablist"
        aria-label={t.work.filterLabel}
        className="gut flex flex-wrap gap-3 py-6"
      >
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={active}
              data-active={active}
              data-cursor="hover"
              onClick={() => setFilter(f)}
              className="bowl invertible note inline-flex min-h-11 items-center border-2 border-edge pl-5 pr-7 text-ink-2"
            >
              {t.work.filters[f]}
              <span className="ml-2 opacity-60">{counts[f]}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="border-t border-rule"
      >
        {filtered.map((p) => (
          <motion.div key={p.id} variants={row} className="border-b border-rule">
            <Link
              to={`/project/${p.id}`}
              state={p}
              data-cursor="hover"
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              className="invertible group flex min-h-[5.5rem] flex-col justify-center gap-4 px-[var(--pad)] py-7 md:grid md:grid-cols-[minmax(0,1fr)_7.5rem_minmax(0,20rem)_2rem] md:items-baseline md:gap-8 md:py-8"
            >
              <span className="display-md text-[clamp(1.625rem,4vw,1.875rem)] text-ink transition-colors group-hover:text-ground">
                {p.title}
              </span>

              {/* Both annotations sit at the same value and separate by weight,
                  the way the artboard does. They were split across --ink-dim
                  and --ink-faint, and --ink-faint is 30% — fine for a rule,
                  not for a word someone is meant to read. */}
              <span className="note text-ink-dim transition-colors group-hover:text-ground/70">
                {/* Falls back to the raw value: the kind is data, and a project
                    typed something the dictionary has never heard of should
                    still show what it is rather than nothing. */}
                {t.work.types[p.type as keyof typeof t.work.types] ?? p.type}
              </span>

              {/* Three names, not four. The fourth pushed the longest stacks onto
                  a second line, and one wrapped cell in a row whose other three
                  sit on a single baseline is what stops an index reading as an
                  index. */}
              <span className="note font-medium text-ink-dim transition-colors group-hover:text-ground/70">
                {p.stack.slice(0, 3).join(" · ")}
              </span>

              <span
                aria-hidden
                className="note hidden justify-self-end text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-ground md:block"
              >
                ↗
              </span>

              {/* No pointer to ride, so the image comes to the row instead. */}
              {!floats && (
                <img
                  src={p.frontImage}
                  alt=""
                  loading="lazy"
                  className="bowl mt-2 h-40 w-full object-cover opacity-70 md:hidden"
                />
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {floats && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              style={{ x: px, y: py }}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="bowl pointer-events-none fixed left-0 top-0 z-[150] h-48 w-80 overflow-hidden border border-ink/30 bg-ground-2"
            >
              <img
                src={hovered.frontImage}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
