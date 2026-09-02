import { useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";
import { useEnvironment } from "@/hooks/useEnvironment";
import { useT } from "@/i18n";
import { EASE } from "@/lib/motion";

const FILTERS = ["All", "Projects", "Libraries"] as const;
type Filter = (typeof FILTERS)[number];

const matches = (p: ProjectTypes, f: Filter) =>
  f === "All"
    ? true
    : f === "Libraries"
      ? p.type === "Library"
      : p.type !== "Library";

const projects = rawProjects as ProjectTypes[];

/**
 * One project is shown rather than listed.
 *
 * Before this, a visitor could scroll the entire home page and never see a
 * single piece of work — an index is efficient, but a portfolio that shows no
 * work is not a portfolio. Named by id so the choice is deliberate, with a
 * positional fallback so removing that entry degrades instead of breaking.
 */
const FEATURED_ID = 11;
const featured =
  projects.find((p) => p.id === FEATURED_ID) ??
  projects.find((p) => p.type !== "Library");

const Featured = ({ project }: { project: ProjectTypes }) => {
  const t = useT();

  return (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, ease: EASE }}
    className="mb-14"
  >
    <Link
      to={`/project/${project.id}`}
      state={project}
      data-cursor="hover"
      className="group block"
    >
      {/* aspect-ratio rather than a bare lazy image: the box is reserved before
          the file lands, so nothing below it jumps when it does. */}
      <div className="aspect-[16/9] overflow-hidden border-y border-rule bg-ground-2">
        <img
          src={project.frontImage}
          alt={`${project.title} — cover`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-bp group-hover:scale-[1.02]"
        />
      </div>

      <div className="gut flex flex-col gap-6 py-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="note text-ink-dim">{t.work.featuredLabel}</p>
          <h3 className="display-md mt-3 text-[clamp(2rem,5vw,3.5rem)] text-ink">
            {project.title}
          </h3>
          {/* The one project blurb that lives in the dictionary rather than in
              Projects.json. The detail sheets are still English-only, but this
              paragraph sits on the home page under a Spanish heading, and a
              single English sentence there reads as a bug rather than as scope. */}
          <p className="mt-3 text-lg leading-relaxed text-ink-2">
            {t.work.featuredDescription}
          </p>
        </div>
        <p className="note shrink-0 text-ink-dim lg:text-right">
          {project.stack.slice(0, 4).join(" · ")}
        </p>
      </div>
    </Link>
  </motion.div>
  );
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

  const counts = useMemo(
    () => ({
      All: projects.length,
      Projects: projects.filter((p) => p.type !== "Library").length,
      Libraries: projects.filter((p) => p.type === "Library").length,
    }),
    [],
  );

  const filtered = projects.filter((p) => matches(p, filter));

  const track = (e: React.MouseEvent) => {
    if (!floats) return;
    x.set(e.clientX + 28);
    y.set(e.clientY - 96);
  };

  return (
    <div className="w-full" onMouseMove={track}>
      {featured && <Featured project={featured} />}

      {/* Filter — the only place a bowl is allowed to carry state. */}
      <div
        role="tablist"
        aria-label={t.work.filterLabel}
        className="gut mb-8 flex flex-wrap gap-3"
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
              className="bowl invertible note inline-flex min-h-11 items-center border border-rule pl-5 pr-7 text-ink-dim data-[active=true]:border-ink"
            >
              {t.work.filters[f]}
              <span className="ml-2 opacity-50">{counts[f]}</span>
            </button>
          );
        })}
      </div>

      <div className="border-t border-rule">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.045 }}
            className="border-b border-rule"
          >
            <Link
              to={`/project/${p.id}`}
              state={p}
              data-cursor="hover"
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              className="invertible group flex min-h-[5.5rem] flex-col justify-center gap-4 px-[var(--gutter)] py-7 md:grid md:grid-cols-[1fr_7rem_minmax(0,15rem)_2rem] md:items-baseline md:gap-8 md:py-10"
            >
              <span className="display-md text-[clamp(1.75rem,4.5vw,3.25rem)] text-ink transition-colors group-hover:text-ground">
                {p.title}
              </span>

              <span className="note text-ink-faint transition-colors group-hover:text-ground/60">
                {/* Falls back to the raw value: the kind is data, and a project
                    typed something the dictionary has never heard of should
                    still show what it is rather than nothing. */}
                {t.work.types[p.type as keyof typeof t.work.types] ?? p.type}
              </span>

              <span className="note text-ink-dim transition-colors group-hover:text-ground/70">
                {p.stack.slice(0, 4).join(" · ")}
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
      </div>

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
