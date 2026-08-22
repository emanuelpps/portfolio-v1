import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useScroll as useAppScroll } from "@/hooks/UseScroll";
import { useEnvironment } from "@/hooks/useEnvironment";
import { WipeText } from "@/components/blueprint/WipeText";
import { Cell, CellGrid } from "@/components/blueprint/Cell";
import { BowlButton } from "@/components/blueprint/BowlButton";
import { EPMark } from "@/components/blueprint/EPMark";
import { EASE } from "@/lib/motion";

/**
 * Role is missing on purpose — it is the line directly under the name, and
 * repeating it in a cell is the sort of filler that left this screen anonymous.
 * Location is missing too: the work is remote, so where the desk sits is not a
 * fact about the job.
 */
const FACTS = [
  { key: "Focus", value: "React · TypeScript · Performance" },
  { key: "Currently", value: "Dizizid · The CodeMaker Lab" },
  { key: "Available", value: "Open to roles and freelance, remote" },
];

export const Hero = () => {
  const { refs, scrollTo } = useAppScroll();
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const interactive = hasFinePointer && !reducedMotion;

  // The drawing drifts a few pixels against the pointer — just enough parallax
  // to separate the mark from the name sitting on top of it.
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const sX = useSpring(rawX, { stiffness: 45, damping: 22 });
  const sY = useSpring(rawY, { stiffness: 45, damping: 22 });
  const markX = useTransform(sX, [0, 1], [22, -22]);
  const markY = useTransform(sY, [0, 1], [16, -16]);

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
      aria-label="Introduction"
      className="relative flex min-h-dvh w-full flex-col overflow-hidden pt-24 sm:pt-28"
    >
      {/*
        The mark at poster scale, bleeding off the right edge and running under
        the name rather than politely beside it. Its stroke is held to a
        constant device width, so blowing it up to forty rem keeps it a
        monoline instead of turning it into a slab — and letting the two
        overlap is what stops the screen from being a tidy stack of blocks.
      */}
      <motion.div
        aria-hidden
        style={interactive ? { x: markX, y: markY } : undefined}
        className="pointer-events-none absolute right-0 top-1/2 z-0 -translate-y-1/2 translate-x-[16%] text-ink/30 sm:translate-x-[10%]"
      >
        <EPMark
          size="clamp(19rem, 46vw, 44rem)"
          traced
          trigger="mount"
          hairline
          weight={1.5}
          title="Emanuel Pagés"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="note relative z-10 inset-stem flex items-center gap-2.5 self-end text-ink-dim"
      >
        {/* A dot would be the one circle on a site whose only curve is the P's
            bowl, so the status light is a square. */}
        <span aria-hidden className="block h-1.5 w-1.5 animate-pulse bg-ink" />
        Available — remote
      </motion.p>

      <div className="relative z-10 flex flex-1 flex-col justify-center inset-stem">
        <h1 className="display text-[clamp(3.5rem,13vw,10rem)] text-ink">
          <WipeText trigger="mount" delay={0.15}>
            Emanuel
          </WipeText>

          {/* The P's bowl at architectural scale, filled rather than drawn. An
              outlined pill at this size reads as nothing; solid, it is the
              mark's own counter inverted, and it carries the screen's weight. */}
          <motion.span
            initial={{ scaleX: 0.88, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
            style={{ transformOrigin: "left" }}
            className="bowl mt-2 inline-block bg-ink pb-[0.12em] pl-[0.1em] pr-[0.62em] pt-[0.02em] text-ground"
          >
            Pagés
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
          className="mt-8 text-xl font-light text-ink-dim sm:text-2xl"
        >
          Frontend Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.95 }}
          className="mt-12 flex flex-wrap items-center gap-7"
        >
          <BowlButton onClick={() => scrollTo("projects")}>
            Selected work
          </BowlButton>
          <button
            onClick={() => scrollTo("contact")}
            data-cursor="hover"
            className="note border-b border-rule pb-1 text-ink-dim transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* The E's counters at the foot of the screen: three cells sharing their
          dividing strokes, carrying the facts at full contrast. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
        className="relative z-10 mt-12 from-stem sm:mt-16"
      >
        <CellGrid cols="grid-cols-1 sm:grid-cols-3">
          {FACTS.map(({ key, value }) => (
            <Cell key={key} pad="px-[var(--gutter)] py-5 sm:py-6">
              <p className="note text-ink-faint">{key}</p>
              <p className="note mt-2 text-ink">{value}</p>
            </Cell>
          ))}
        </CellGrid>
      </motion.div>
    </section>
  );
};
