import { motion } from "framer-motion";
import { useScroll as useAppScroll } from "@/hooks/UseScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { EASE } from "@/lib/motion";

const HEADLINE: { t: string; accent?: boolean }[] = [
  { t: "I" },
  { t: "build" },
  { t: "frontends" },
  { t: "that" },
  { t: "convert.", accent: true },
];

export const Hero = () => {
  const { refs, scrollTo } = useAppScroll();

  return (
    <section
      ref={refs.refHome}
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-5 text-center sm:px-8"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
        }}
        className="flex w-full max-w-5xl flex-col items-center"
      >
        {/* Availability badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
          }}
          className="mb-8 flex items-center gap-2 rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/10 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--accent)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Available for work — Remote / Frontend
          </span>
        </motion.div>

        {/* Name */}
        <motion.span
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { duration: 0.6 } },
          }}
          className="eyebrow mb-5"
        >
          Emanuel Pagés
        </motion.span>

        {/* Kinetic headline */}
        <h1 className="flex flex-wrap justify-center text-5xl font-black leading-[0.95] tracking-tighter text-white sm:text-7xl md:text-[6.5rem]">
          {HEADLINE.map((w, i) => (
            <span
              key={i}
              className="mx-[0.18em] inline-block overflow-hidden py-1 align-bottom"
            >
              <motion.span
                className={`inline-block ${
                  w.accent
                    ? "bg-gradient-to-r from-[color:var(--accent)] to-purple-400 bg-clip-text text-transparent"
                    : ""
                }`}
                variants={{
                  hidden: { y: "115%" },
                  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
                }}
              >
                {w.t}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subhead */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.8, ease: EASE },
            },
          }}
          className="mt-8 max-w-2xl text-base font-light leading-relaxed text-gray-400 sm:text-lg md:text-xl"
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
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
          }}
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
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 hidden h-10 w-6 justify-center rounded-full border-2 border-white/20 p-1 md:flex"
      >
        <div className="mx-auto h-2 w-1 rounded-full bg-[color:var(--accent)]" />
      </motion.div>
    </section>
  );
};
