import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useScroll as useAppScroll } from "@/hooks/UseScroll";
import { useEnvironment } from "@/hooks/useEnvironment";
import { WipeText } from "@/components/blueprint/WipeText";
import { Cell, CellGrid } from "@/components/blueprint/Cell";
import { BowlButton } from "@/components/blueprint/BowlButton";
import { EASE } from "@/lib/motion";

/**
 * The facts, at full ink rather than as a grey footnote.
 *
 * Location is deliberately absent: the work is remote, so where the desk sits
 * is not a fact about the job. Availability says the thing a visitor is
 * actually checking for.
 */
const FACTS = [
  { key: "Role", value: "Frontend Developer" },
  { key: "Focus", value: "React · TypeScript · Performance" },
  { key: "Available", value: "Open to roles and freelance — remote" },
];

export const Hero = () => {
  const { refs, scrollTo } = useAppScroll();
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const interactive = hasFinePointer && !reducedMotion;

  // Pointer position, normalised and smoothed.
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const sX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const sY = useSpring(rawY, { stiffness: 60, damping: 20 });

  // The construction grid is always drawn but almost entirely masked out; only
  // the patch under the pointer is let through. Nothing glows and nothing is
  // tinted — the page simply shows more of its own scaffolding where you look.
  const spotX = useTransform(sX, (v) => `${v * 100}%`);
  const spotY = useTransform(sY, (v) => `${v * 100}%`);
  const reveal = useMotionTemplate`radial-gradient(26rem circle at ${spotX} ${spotY}, #000 0%, transparent 68%)`;

  const onMove = (e: React.MouseEvent) => {
    if (!interactive || !refs.refHome.current) return;
    const r = refs.refHome.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top) / r.height);
  };

  return (
    <section
      ref={refs.refHome}
      onMouseMove={onMove}
      className="relative flex min-h-dvh w-full flex-col overflow-hidden pt-24 sm:pt-28"
    >
      {/* Construction grid, revealed only under the pointer. */}
      <motion.div
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-rule-soft) 1px, transparent 1px), linear-gradient(to bottom, var(--color-rule-soft) 1px, transparent 1px)",
          backgroundSize: "5rem 5rem",
          ...(interactive
            ? { WebkitMaskImage: reveal, maskImage: reveal }
            : { opacity: 0.5 }),
        }}
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* Sheet corners — the frame of a drawing. */}
      <div className="pointer-events-none absolute inset-x-4 bottom-6 top-24 z-[1] hidden md:block">
        {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map(
          (pos) => (
            <span
              key={pos}
              className={`absolute ${pos} -m-[7px] font-mono text-sm leading-none text-ink-faint`}
            >
              +
            </span>
          ),
        )}
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center inset-stem">
        {/* The name is annotation. What he does is the headline — the other way
            round is a hero that takes a full screen to say nothing. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <p className="mono flex items-baseline gap-3">
            <span className="text-ink-faint">00</span>
            <span aria-hidden className="text-rule">
              /
            </span>
            <span className="text-ink">Emanuel Pagés</span>
          </p>

          <p className="mono flex items-center gap-2.5 text-ink-dim">
            {/* A dot would be the one circle on a site whose only curve is the
                P's bowl, so the status light is a square. */}
            <span aria-hidden className="block h-1.5 w-1.5 animate-pulse bg-ink" />
            Available — Remote
          </p>
        </motion.div>

        {/*
          The headline reads as one sentence in three registers: two thin
          monoline lines with a solid one wedged between them. That middle line
          is the P's bowl at architectural scale and filled rather than drawn —
          the mark's own counter, inverted. It is what gives the screen mass;
          an outlined pill here reads as nothing at all.
        */}
        <h1 className="display mt-8 text-[clamp(2.25rem,7.5vw,5.5rem)] text-ink sm:mt-10">
          <WipeText trigger="mount" delay={0.1}>I build</WipeText>

          <motion.span
            initial={{ scaleX: 0.9, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="bowl my-1 inline-block bg-ink py-[0.06em] pl-[0.12em] pr-[0.7em] text-ground"
          >
            interfaces
          </motion.span>

          <WipeText trigger="mount" delay={0.5}>around what the</WipeText>
          <WipeText trigger="mount" delay={0.65}>page has to do.</WipeText>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <BowlButton onClick={() => scrollTo("projects")}>
            Selected work
          </BowlButton>
          <button
            onClick={() => scrollTo("contact")}
            data-cursor="hover"
            className="mono border-b border-rule pb-1 text-ink-dim transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* The E's counters, at the foot of the sheet: three cells sharing their
          dividing strokes, carrying the facts at full contrast. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
        className="relative z-10 mt-12 from-stem sm:mt-16"
      >
        <CellGrid cols="grid-cols-1 sm:grid-cols-3">
          {FACTS.map(({ key, value }) => (
            <Cell key={key} pad="px-[var(--gutter)] py-5 sm:py-6">
              <p className="mono-sm text-ink-faint">{key}</p>
              <p className="mt-3 font-mono text-[0.8125rem] leading-snug text-ink">
                {value}
              </p>
            </Cell>
          ))}
        </CellGrid>
      </motion.div>
    </section>
  );
};
