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
import { SpecList } from "@/components/blueprint/SpecList";
import { BowlButton } from "@/components/blueprint/BowlButton";
import { Rule } from "@/components/blueprint/Rule";
import { EASE } from "@/lib/motion";

const SPECS = [
  { key: "Role", value: "Frontend Developer" },
  { key: "Based", value: "Buenos Aires, AR" },
  { key: "Focus", value: "React · TypeScript · Performance" },
  { key: "Status", value: "Open to roles and freelance" },
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
      className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden pb-20 pt-32"
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

      {/* Sheet corners and edge annotation — the frame of a drawing. */}
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
        <span className="mono-sm absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-ink-faint">
          Sheet 00 — Index
        </span>
        <span className="mono-sm absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 whitespace-nowrap text-ink-faint">
          Rev. 2026
        </span>
      </div>

      <div className="relative z-10 inset-stem">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mono flex items-baseline gap-3 text-ink-dim"
        >
          <span className="text-ink">00</span>
          <span aria-hidden className="text-rule">
            /
          </span>
          <span>Index</span>
        </motion.div>

        {/* The name at drawing scale, in the mark's own thin monoline voice. */}
        <h1 className="display mt-8 text-[clamp(3.25rem,15vw,12rem)] text-ink">
          <span className="text-mask block">
            <WipeText as="span" delay={0.15}>
              Emanuel
            </WipeText>
          </span>
          <span className="text-mask block">
            <WipeText as="span" delay={0.35}>
              Pagés
            </WipeText>
          </span>
        </h1>

        {/* The bowl at architectural scale: the P's counter, holding the line
            that says what this page is. Square left, closed right. */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.94 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          style={{ transformOrigin: "left" }}
          className="bowl mt-10 flex h-14 max-w-3xl items-center border border-rule pl-6 pr-12 sm:h-16"
        >
          <p className="mono truncate text-ink-dim">
            Frontend Developer — Buenos Aires
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
          className="mt-10 max-w-xl text-lg font-light leading-relaxed text-ink-dim sm:text-xl"
        >
          I build production React interfaces. Ten years running growth, SEO and
          paid campaigns came first — which is why I start from what a page has
          to do, then decide how it should look.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1 }}
          className="mt-12 flex flex-wrap items-center gap-4"
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

      {/* Title block, bottom right — where a drawing keeps its facts. */}
      <div className="relative z-10 mt-20">
        <Rule soft />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          className="inset-stem pt-6"
        >
          <SpecList items={SPECS} className="max-w-md lg:ml-auto lg:max-w-lg" />
        </motion.div>
      </div>
    </section>
  );
};
