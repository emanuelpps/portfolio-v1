import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useScroll as useAppScroll } from "@/hooks/UseScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Counter } from "@/components/motion/Counter";
import { useEnvironment } from "@/hooks/useEnvironment";
import { EASE } from "@/lib/motion";

const HEADLINE_LEAD = ["I", "build", "frontends", "that"];

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
  const spotlight = useMotionTemplate`radial-gradient(45rem circle at ${spotX} ${spotY}, rgba(255,77,125,0.18), transparent 55%)`;

  // Parallax depth layers.
  const headX = useTransform(sX, [0, 1], [10, -10]);
  const headY = useTransform(sY, [0, 1], [7, -7]);
  const cardAX = useTransform(sX, [0, 1], [-34, 34]);
  const cardAY = useTransform(sY, [0, 1], [-26, 26]);
  const cardBX = useTransform(sX, [0, 1], [34, -34]);
  const cardBY = useTransform(sY, [0, 1], [26, -26]);

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

  const float = (d: number) =>
    reducedMotion
      ? {}
      : {
          y: [0, -10, 0],
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const, delay: d },
        };

  return (
    <section
      ref={refs.refHome}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 text-center sm:px-8"
    >
      {/* Cursor-reactive aurora spotlight */}
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* Editorial viewfinder frame + metadata */}
      <div className="pointer-events-none absolute bottom-6 left-4 right-4 top-24 z-[1] hidden md:block">
        <div className="absolute inset-0 rounded-2xl border border-white/[0.06]" />
        {[
          "left-0 top-0",
          "right-0 top-0",
          "left-0 bottom-0",
          "right-0 bottom-0",
        ].map((pos) => (
          <span
            key={pos}
            className={`absolute ${pos} -m-[7px] text-sm leading-none text-[color:var(--accent)]/70`}
          >
            +
          </span>
        ))}
        <span className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.35em] text-white/25">
          Portfolio — 2026
        </span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.35em] text-white/25">
          Frontend / Engineer
        </span>
      </div>

      {/* Floating metric — Conversion */}
      <motion.div
        style={{ x: cardAX, y: cardAY }}
        className="absolute right-[3%] top-[15%] z-20 hidden lg:block xl:right-[6%]"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7, ease: EASE }}
      >
        <motion.div
          animate={float(0)}
          className="w-56 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Conversion
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400">
              Live
            </span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <Counter
              to={42}
              suffix="%"
              className="text-4xl font-black leading-none text-white"
            />
            <span className="mb-1 text-xs font-bold text-emerald-400">
              ▲ 18%
            </span>
          </div>
          <svg viewBox="0 0 120 36" className="mt-3 h-9 w-full overflow-visible">
            <motion.path
              d="M2,30 L20,26 L38,28 L56,18 L74,21 L92,9 L118,4"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.7, duration: 1.4, ease: EASE }}
            />
            <motion.circle
              cx="118"
              cy="4"
              r="3"
              fill="var(--accent)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3, duration: 0.4, ease: EASE }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating metric — Lighthouse */}
      <motion.div
        style={{ x: cardBX, y: cardBY }}
        className="absolute bottom-[16%] left-[3%] z-20 hidden lg:block xl:left-[6%]"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.7, ease: EASE }}
      >
        <motion.div
          animate={float(1.2)}
          className="w-52 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
            Lighthouse
          </span>
          <div className="mt-2 flex items-end gap-1.5">
            <Counter
              to={100}
              className="text-4xl font-black leading-none text-white"
            />
            <span className="mb-1 text-xs text-gray-500">/100</span>
          </div>
          <div className="mt-3 flex h-10 items-end gap-1.5">
            {[60, 82, 70, 100].map((h, i) => (
              <motion.div
                key={i}
                className="w-3 rounded-sm bg-gradient-to-t from-[color:var(--accent)] to-purple-400"
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 1.7 + i * 0.12, duration: 0.6, ease: EASE }}
              />
            ))}
          </div>
          <span className="mt-3 block text-[9px] uppercase tracking-[0.18em] text-gray-500">
            Perf · A11y · SEO
          </span>
        </motion.div>
      </motion.div>

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

        {/* Name */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="eyebrow mb-5"
        >
          Emanuel Pagés
        </motion.span>

        {/* Kinetic headline */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
          }}
          style={{ fontSize: "clamp(2.9rem, 11vw, 8.5rem)" }}
          className="relative flex flex-wrap justify-center font-black leading-[0.92] tracking-tighter text-white"
        >
          {HEADLINE_LEAD.map((w, i) => (
            <span
              key={i}
              className="mx-[0.16em] inline-block overflow-hidden py-[0.08em] align-bottom"
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "115%" },
                  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
                }}
              >
                {w}
              </motion.span>
            </span>
          ))}

          {/* Accent word — serif italic with animated sheen + drawn underline */}
          <span className="relative mx-[0.14em] inline-block py-[0.08em]">
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="hero-shimmer font-editorial inline-block pr-[0.08em] italic"
                variants={{
                  hidden: { y: "115%" },
                  show: { y: 0, transition: { duration: 0.85, ease: EASE } },
                }}
              >
                convert.
              </motion.span>
            </span>
            <svg
              viewBox="0 0 220 14"
              preserveAspectRatio="none"
              className="absolute -bottom-1 left-0 h-3 w-full overflow-visible"
            >
              <motion.path
                d="M3,9 C45,3 85,12 125,6 C158,1 192,8 217,4"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
          className="mt-9 max-w-2xl text-base font-light leading-relaxed text-gray-400 sm:text-lg md:text-xl"
        >
          Frontend engineer with{" "}
          <span className="font-medium text-white">
            10 years in digital marketing
          </span>
          . I turn designs into fast, accessible interfaces that don&apos;t just
          look good — they move the metrics that matter.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
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
        transition={{ delay: 1.8, duration: 0.8 }}
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
