import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ProjectTypes } from "@/types/ProjectTypes";
import { nextProject } from "@/sections/Projects/work";
import { useProjectCopy } from "@/data/projectCopy";
import { PLATE_SIZES, plateRatio } from "@/data/plateSizes";
import { fill, useT } from "@/i18n";
import { EASE } from "@/lib/motion";

/**
 * The project sheet.
 *
 * It is built out of the same three moves as the rest of the site and nothing
 * else: a 3px rule where one part ends and the next begins, a 1px rule to
 * divide inside one, and inversion for every state. What it dropped along the
 * way was the Blueprint shell — the hairline drawn on scroll, the heading wiped
 * in a mask, the stem the content used to hang off — which is what made a
 * project read as a different site from the index that sent you to it.
 *
 * The headings are written the way someone would say them out loud. They read
 * Overview / Purpose / Design approach / Challenges before, which is the
 * vocabulary of an agency case study; these are a developer's own projects,
 * and the paragraph under "Design approach" was about React Query.
 */

/**
 * Screenshots are framed by the page, not by a box.
 *
 * The bowl is the system's one radius, but at the width of a full-bleed UI
 * screenshot its curve would eat a quarter of the image, so a plate is simply
 * ruled off above and below and bled to the edges. Nothing is cropped: these
 * are screenshots of different shapes, and cutting a UI to fit a box cuts off
 * the very thing the picture is there to show.
 *
 * It used to be `max-h-[82vh] object-contain`, which made every plate the same
 * 1.91-wide box no matter what shape the picture was — and not one screenshot
 * on this site is that shape. Everything narrower was letterboxed inside it:
 * 104px of dead ground down each side of an Epic Sound plate, 344px down each
 * side of CodeMaker's services page. The picture was being framed by the box
 * after all, and the box was wrong.
 *
 * Now the image fills the width it is given and its height simply follows. The
 * intrinsic size comes from the generated map so the browser can reserve the
 * right space before the file arrives, instead of laying the page out twice.
 */
const Plate = ({
  src,
  title,
  index,
  grow,
}: {
  src: string;
  title: string;
  index: number;
  /** This plate's share of its row, as a fraction of 1. */
  grow: number;
}) => {
  const t = useT();
  const [w, h] = PLATE_SIZES[src] ?? [1600, 1000];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE }}
      /* Grow by this plate's share of the row, from a basis of zero: that is
         the whole of the row arithmetic. Two plates divide the page between
         them in proportion to how wide each picture is, and land on the same
         height.

         The shares are normalised to sum to 1 rather than passed as the raw
         ratios, because flexbox treats a line whose grow factors add up to
         less than 1 as a request for only that fraction of the free space. A
         lone plate at ratio 0.87 asked for 87% of the page and got it —
         CodeMaker's services shot came out 1098px wide inside a 1262px row,
         with the missing 164px reappearing as exactly the gap this layout
         exists to remove. */
      style={{ flexGrow: grow, flexBasis: 0 }}
      className="min-w-0 border-y border-rule bg-ground-2"
    >
      <img
        src={src}
        alt={fill(t.project.viewAlt, { title, n: index + 1 })}
        loading="lazy"
        width={w}
        height={h}
        className="block h-auto w-full"
      />
    </motion.figure>
  );
};

/**
 * How wide a row is allowed to get before it stops being worth pairing.
 *
 * Two pictures in a row share a height, and that height is the page width
 * divided by the sum of their ratios — so the wider the pair, the shorter the
 * row. Past 3.0 the pair starts reading as a strip rather than as two
 * screenshots: Eckers' `process` plate is 3.41 wide on its own, and beside
 * anything at all it would be 185px tall. At the limit a row is around 420px,
 * which is the shortest a screenshot can be and still show what it is of.
 */
const PAIR_LIMIT = 3.0;

/**
 * Group a block's plates into rows of one or two.
 *
 * Pairing is what closes the gap the old layout left at the sides, but it is
 * not the lever it first looks like: most blocks on this site carry a single
 * screenshot, and a single plate now fills the width on its own. So this is
 * greedy and unclever on purpose — take two when two fit, otherwise take one —
 * and the three tall singles it leaves behind (CodeMaker's services page is the
 * worst, at 1450px) are left to run as tall as they are. A picture that runs
 * past the fold costs a scroll; a picture cropped to fit costs the picture.
 */
function rows(images: string[]): string[][] {
  const out: string[][] = [];
  for (let i = 0; i < images.length; ) {
    const pair =
      i + 1 < images.length &&
      plateRatio(images[i]) + plateRatio(images[i + 1]) <= PAIR_LIMIT;
    out.push(pair ? [images[i], images[i + 1]] : [images[i]]);
    i += pair ? 2 : 1;
  }
  return out;
}

/**
 * The plates of one block, as rows.
 *
 * Stacked on a phone, where half of 390px is not a screenshot of anything.
 */
const Plates = ({
  images,
  title,
  firstPlate,
}: {
  images: string[];
  title: string;
  firstPlate: number;
}) => {
  const grouped = rows(images);

  /* Where each row starts in the sheet's numbering, worked out up front rather
     than by a counter the render increments. Same reason the image lists are
     deduped in one pass before anything draws: a render that mutates as it
     goes is a render that means something different the second time. */
  const starts = grouped.map((_, i) =>
    grouped.slice(0, i).reduce((n, row) => n + row.length, firstPlate),
  );

  return (
    <div className="mt-12 flex flex-col gap-px sm:mt-16">
      {grouped.map((row, i) => {
        const total = row.reduce((sum, src) => sum + plateRatio(src), 0);

        return (
          <div key={row.join()} className="flex flex-col gap-px sm:flex-row">
            {row.map((src, j) => (
              <Plate
                key={src}
                src={src}
                title={title}
                index={starts[i] + j}
                grow={plateRatio(src) / total}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

/**
 * Each screenshot is drawn once per sheet, first appearance wins.
 *
 * Epic Sound Studio carries five image slots across three distinct files, so
 * the same player screenshot arrived three times on the way down the page.
 *
 * Every list is resolved in one pass, before anything renders. The first
 * attempt at this threaded a shared `Set` down into each block and let the
 * block mutate it while rendering, which quietly broke under StrictMode: React
 * invokes a render twice in development, and the second pass found every image
 * already in the set and filtered all of them out. One image survived on the
 * whole page. Mutating during render is the bug, not StrictMode.
 */
function dedupe(lists: (string[] | undefined)[]): string[][] {
  const seen = new Set<string>();
  return lists.map((list) =>
    (list ?? []).filter((src) => {
      if (seen.has(src)) return false;
      seen.add(src);
      return true;
    }),
  );
}

/**
 * A block of the sheet, set as a ledger row: the heading in a narrow column on
 * the left, the prose in the wide one on the right. It is the same grammar as
 * a row of the Work index, which is the point — the sheet should read as the
 * page the index opens into, not as a second template.
 */
const Block = ({
  label,
  children,
  images = [],
  title,
  firstPlate = 0,
}: {
  label: string;
  children: ReactNode;
  images?: string[];
  title: string;
  /** Where this block's plates fall in the sheet, so alt text counts the page
   *  rather than the block — two images both described as "view 1" tell a
   *  screen reader nothing about which is which. */
  firstPlate?: number;
}) => {
  return (
    <section className="border-t border-rule pt-10 sm:pt-14">
      <div className="gut grid gap-x-8 gap-y-5 lg:grid-cols-12">
        <h2 className="display-md text-[clamp(1.25rem,2.4vw,1.75rem)] text-ink lg:col-span-3">
          {label}
        </h2>
        <div className="flex max-w-[68ch] flex-col gap-6 lg:col-span-9 lg:col-start-4">
          {children}
        </div>
      </div>

      {images.length > 0 && (
        <Plates images={images} title={title} firstPlate={firstPlate} />
      )}
    </section>
  );
};

const Prose = ({ children }: { children: ReactNode }) => (
  <p className="text-[1.0625rem] leading-[1.6] text-ink-2 sm:text-lg">
    {children}
  </p>
);

const ProjectDetailContainer = ({ project }: { project?: ProjectTypes }) => {
  const t = useT();
  // Hooks run before the early return, so this asks for id 0 when there is no
  // project — a lookup that simply misses, rather than a conditional hook.
  const copy = useProjectCopy(project?.id ?? 0);

  if (!project) {
    return (
      <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-8 px-[var(--pad)] pt-16 text-center lg:pt-20">
        <p className="display-md text-[clamp(1.5rem,4vw,2.25rem)] text-ink">
          {t.project.notFound}
        </p>
        <Link
          to="/#work"
          data-cursor="hover"
          className="bowl inline-flex min-h-12 items-center border-2 border-ink bg-ink py-3 pl-7 pr-9 text-[0.9375rem] font-semibold text-ground transition-colors duration-300 ease-bp hover:bg-ground hover:text-ink"
        >
          {t.project.back}
        </Link>
      </div>
    );
  }

  const inDev = project.status === "in-development";
  const next = nextProject(project);

  /* The lead plate is part of the same pass: on Epic Sound Studio `image2` and
     the first image of "How it's built" are the same file, so without this the
     sheet opens on a screenshot and then shows it again two blocks later. */
  const [leadImages, whyImages, buildImages, hardImages] = dedupe([
    [project.image2].filter(Boolean),
    project.plates.why,
    project.plates.build,
    project.plates.hard,
  ]);

  /* Plates are numbered across the whole sheet, so the alt text of the second
     one reads "view 2" rather than restarting inside its own block. */
  const plateStart = [leadImages, whyImages, buildImages, hardImages].reduce<
    number[]
  >((acc, list) => [...acc, acc[acc.length - 1] + list.length], [0]);

  const paragraphs = (copy?.overview ?? "")
    .split("\n")
    .filter((para) => para.trim() !== "");

  /* The facts, as cells of one strip divided by hairlines — the same row that
     closes the cover of the site. Built from what the project actually has, so
     a project with no repository does not get an empty cell announcing it. */
  const links = [
    project.code && { key: t.project.repository, href: project.code },
    project.deploy && { key: t.project.live, href: project.deploy },
  ].filter(Boolean) as { key: string; href: string }[];

  const facts: { key: string; value: ReactNode }[] = [
    {
      key: t.project.specs.type,
      value:
        t.work.types[project.type as keyof typeof t.work.types] ?? project.type,
    },
    { key: t.project.specs.stack, value: project.stack.join(" · ") },
    ...(inDev
      ? [{ key: t.project.specs.status, value: t.project.inDevelopment }]
      : []),
    ...(links.length > 0
      ? [
          {
            key: t.project.specs.links,
            value: (
              <span className="flex flex-wrap gap-3">
                {links.map(({ key, href }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="bowl invertible inline-flex min-h-11 items-center border-2 border-edge py-2 pl-5 pr-7 text-ink"
                  >
                    {key}
                  </a>
                ))}
              </span>
            ),
          },
        ]
      : []),
  ];

  return (
    <article className="w-full pt-16 lg:pt-20">
      <header className="pt-16 sm:pt-24">
        <div className="gut">
          <h1 className="display text-[clamp(2.25rem,7vw,5.5rem)] text-ink">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[46ch] text-[clamp(1.0625rem,1.7vw,1.5rem)] leading-[1.4] text-ink-2 sm:mt-8">
            {copy?.blurb}
          </p>

          {inDev && (
            <p className="bowl mt-8 max-w-[60ch] border border-edge py-4 pl-5 pr-10 text-[0.9375rem] leading-[1.6] text-ink-2">
              {fill(t.project.inDevelopmentNote, { title: project.title })}
            </p>
          )}
        </div>

        <div className="mt-10 h-[3px] w-full bg-ink sm:mt-14" />

        {/* The strip is divided into as many cells as this project actually
            has. A fixed four-column grid left a quarter of the rule hanging
            empty on every project without a live URL, which reads as a cell
            whose contents failed to load rather than as a fact that does not
            exist. */}
        <dl
          style={{ "--facts": facts.length } as React.CSSProperties}
          className="grid grid-cols-1 lg:[grid-template-columns:repeat(var(--facts),minmax(0,1fr))]"
        >
          {facts.map(({ key, value }, i) => (
            <div
              key={key}
              className={`flex flex-col gap-2.5 px-[var(--pad)] py-6 sm:py-7 ${
                i < facts.length - 1
                  ? "border-b border-rule lg:border-b-0 lg:border-r"
                  : ""
              }`}
            >
              <dt className="label text-ink-dim">{key}</dt>
              <dd className="note text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="h-[3px] w-full bg-ink" />

        {leadImages.length > 0 && (
          <Plates images={leadImages} title={project.title} firstPlate={0} />
        )}
      </header>

      <div className="pt-20 sm:pt-28">
        <Block label={t.project.whatItIs} title={project.title}>
          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              className="text-[1.0625rem] leading-[1.6] text-ink-2 sm:text-lg"
            >
              {para}
            </motion.p>
          ))}
        </Block>

        {copy?.why && (
          <div className="pt-20 sm:pt-24">
            <Block
              label={t.project.whyIBuiltIt}
              images={whyImages}
              firstPlate={plateStart[1]}
              title={project.title}
            >
              <Prose>{copy.why}</Prose>
            </Block>
          </div>
        )}

        {copy?.build && (
          <div className="pt-20 sm:pt-24">
            <Block
              label={t.project.howItsBuilt}
              images={buildImages}
              firstPlate={plateStart[2]}
              title={project.title}
            >
              <Prose>{copy.build}</Prose>
            </Block>
          </div>
        )}

        {copy?.hard && (
          <div className="pt-20 sm:pt-24">
            <Block
              label={t.project.whatWasHard}
              images={hardImages}
              firstPlate={plateStart[3]}
              title={project.title}
            >
              <Prose>{copy.hard}</Prose>
            </Block>
          </div>
        )}
      </div>

      {/* The sheet closes on the next project rather than on the words "end of
          case study". Someone who read to the bottom of one of these has told
          you what they want; a full stop is the one thing they did not ask
          for. The row is the Work index's row, so it is recognisably the same
          list, continued. */}
      <nav aria-label={t.project.nextLabel} className="mt-24 sm:mt-32">
        <div className="h-[3px] w-full bg-ink" />
        <p className="gut label pt-7 text-ink-dim">{t.project.next}</p>
        <div className="mt-5 border-t border-rule">
          <Link
            to={`/project/${next.id}`}
            data-cursor="hover"
            className="invertible group flex min-h-[5.5rem] flex-col justify-center gap-4 border-b border-rule px-[var(--pad)] py-7 md:grid md:grid-cols-[minmax(0,1fr)_7.5rem_minmax(0,20rem)_2rem] md:items-baseline md:gap-8 md:py-8"
          >
            <span className="display-md text-[clamp(1.625rem,4vw,1.875rem)] text-ink transition-colors group-hover:text-ground">
              {next.title}
            </span>
            <span className="note text-ink-dim transition-colors group-hover:text-ground/70">
              {t.work.types[next.type as keyof typeof t.work.types] ?? next.type}
            </span>
            <span className="note font-medium text-ink-dim transition-colors group-hover:text-ground/70">
              {next.stack.slice(0, 3).join(" · ")}
            </span>
            <span
              aria-hidden
              className="note hidden justify-self-end text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-ground md:block"
            >
              ↗
            </span>
          </Link>
        </div>
      </nav>
    </article>
  );
};

export default ProjectDetailContainer;
