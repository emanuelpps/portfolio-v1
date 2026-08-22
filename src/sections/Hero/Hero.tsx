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

  // A few pixels of drift against the pointer. The mark has its own space now,
  // so this is life rather than the thing that was scrambling the letterform.
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const sX = useSpring(rawX, { stiffness: 45, damping: 22 });
  const sY = useSpring(rawY, { stiffness: 45, damping: 22 });
  const markX = useTransform(sX, [0, 1], [10, -10]);
  const markY = useTransform(sY, [0, 1], [8, -8]);

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
      <div className="inset-stem flex flex-1 flex-col justify-center">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
          {/*
            The mark gets its own column, drawn whole.

            The previous pass blew it up to forty rem, bled it off the right
            edge and held its stroke to a hairline. That cropped away the bowl —
            the one feature that makes the shape a P rather than an E — and left
            the rest as faint scattered lines crossing the name. Complete, at
            the stroke ratio the real mark is drawn with, and with nothing
            overlapping it, it reads as the letterform it is.
          */}
          <motion.div
            style={interactive ? { x: markX, y: markY } : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="order-first lg:order-last lg:justify-self-end"
          >
            <EPMark
              size="clamp(7rem, 26vw, 17rem)"
              traced
              trigger="mount"
              className="text-ink"
              title="Emanuel Pagés"
            />
          </motion.div>

          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="note flex items-center gap-2.5 text-ink-dim"
            >
              {/* A dot would be the one circle on a site whose only curve is
                  the P's bowl, so the status light is a square. */}
              <span
                aria-hidden
                className="block h-1.5 w-1.5 animate-pulse bg-ink"
              />
              Available — remote
            </motion.p>

            <h1 className="display mt-7 text-[clamp(3rem,11vw,8.5rem)] text-ink">
              <WipeText trigger="mount" delay={0.15}>
                Emanuel
              </WipeText>

              {/* The P's bowl at architectural scale, filled rather than drawn.
                  An outlined pill at this size reads as nothing; solid, it is
                  the mark's own counter inverted. */}
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
              className="mt-8 text-xl text-ink-2 sm:text-2xl"
            >
              Frontend Developer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.95 }}
              className="mt-10 flex flex-wrap items-center gap-7"
            >
              <BowlButton onClick={() => scrollTo("projects")}>
                Selected work
              </BowlButton>
              <button
                onClick={() => scrollTo("contact")}
                data-cursor="hover"
                className="note inline-flex min-h-11 items-center border-b border-rule text-ink-dim transition-colors duration-300 hover:border-ink hover:text-ink"
              >
                Get in touch
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* The E's counters at the foot of the screen: three cells sharing their
          dividing strokes, carrying the facts at full contrast. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
        className="mt-14 from-stem sm:mt-20"
      >
        <CellGrid cols="grid-cols-1 sm:grid-cols-3">
          {FACTS.map(({ key, value }) => (
            <Cell key={key} pad="px-[var(--gutter)] py-5 sm:py-6">
              <p className="note text-ink-dim">{key}</p>
              <p className="note mt-2 text-ink">{value}</p>
            </Cell>
          ))}
        </CellGrid>
      </motion.div>
    </section>
  );
};
