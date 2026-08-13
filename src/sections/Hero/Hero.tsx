import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useScroll as useAppScroll } from "@/hooks/UseScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useEnvironment } from "@/hooks/useEnvironment";
import { EASE, MASK_HIDDEN_Y } from "@/lib/motion";

export const Hero = () => {
  const { refs, scrollTo } = useAppScroll();
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const interactive = hasFinePointer && !reducedMotion;

  // Pointer position, normalized 0..1, smoothed.
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const sX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const sY = useSpring(rawY, { stiffness: 60, damping: 20 });

  // Cursor spotlight that follows the pointer.
  const spotX = useTransform(sX, (v) => `${v * 100}%`);
  const spotY = useTransform(sY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(42rem circle at ${spotX} ${spotY}, rgba(255,77,125,0.14), transparent 55%)`;

  // Subtle parallax on the headline group.
  const headX = useTransform(sX, [0, 1], [6, -6]);
  const headY = useTransform(sY, [0, 1], [4, -4]);

  const onMove = (e: React.MouseEvent) => {
    if (!interactive || !refs.refHome.current) return;
    const r = refs.refHome.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  return (
    <section
      ref={refs.refHome}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-8"
    >
      {/* Cursor-reactive aurora spotlight */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* Editorial viewfinder frame + metadata */}
      <div className="pointer-events-none absolute bottom-6 left-4 right-4 top-28 z-[1] hidden md:block">
        <div className="absolute inset-0 rounded-2xl border border-white/[0.05]" />
        {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map(
          (pos) => (
            <span
              key={pos}
              className={`absolute ${pos} -m-[7px] text-sm leading-none text-[color:var(--accent)]/60`}
            >
              +
            </span>
          ),
        )}
        <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.35em] text-white/20">
          Portfolio — 2026
        </span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.35em] text-white/20">
          Frontend / Engineer
        </span>
      </div>

      {/* Center content */}
      <motion.div
        style={{ x: headX, y: headY }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="mb-8 flex items-center gap-2 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--accent)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Available for work — Remote / Frontend
          </span>
        </motion.div>

        {/* Role */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="eyebrow mb-5"
        >
          Design-focused Frontend Developer
        </motion.span>

        {/* Name — kinetic headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } },
          }}
          style={{ fontSize: "clamp(3.2rem, 12vw, 9rem)" }}
          className="relative flex flex-wrap justify-center font-black leading-[0.92] tracking-tighter text-white"
        >
          <span className="text-mask mx-[0.16em] inline-block align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: MASK_HIDDEN_Y },
                show: { y: 0, transition: { duration: 0.85, ease: EASE } },
              }}
            >
              Emanuel
            </motion.span>
          </span>

          {/* Last name — animated sheen */}
          <span className="text-mask mx-[0.14em] inline-block align-bottom">
            <motion.span
              className="hero-shimmer inline-block pr-[0.06em]"
              variants={{
                hidden: { y: MASK_HIDDEN_Y },
                show: { y: 0, transition: { duration: 0.9, ease: EASE } },
              }}
            >
              Pagés
            </motion.span>
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="mt-9 max-w-2xl text-base font-light leading-relaxed text-gray-400 sm:text-lg md:text-xl"
        >
          Blending{" "}
          <span className="font-medium text-white">
            10 years in digital marketing
          </span>{" "}
          with 3+ years of modern frontend development. I turn ideas into clean,
          intuitive interfaces with a genuine eye for design and user
          experience.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row"
        >
          <MagneticButton
            onClick={() => scrollTo("contact")}
            data-cursor="hover"
            className="rounded-full bg-[color:var(--accent)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_30px_rgba(255,77,125,0.4)]"
          >
            Let&apos;s talk
          </MagneticButton>
          <button
            onClick={() => scrollTo("projects")}
            data-cursor="hover"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-300 transition-colors hover:text-white"
          >
            View work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-9 w-5 justify-center rounded-full border-2 border-white/20 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-[color:var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
