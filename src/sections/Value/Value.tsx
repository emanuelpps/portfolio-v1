import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Section, SectionLabel, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { fadeUp, stagger } from "@/lib/motion";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";

const STATS: { to: number; suffix: string; label: string }[] = [
  { to: 10, suffix: "+", label: "Years in digital & product" },
  { to: 3, suffix: "+", label: "Years building with React & TypeScript" },
  { to: 2, suffix: "", label: "Open-source npm libraries" },
  { to: 9, suffix: "+", label: "Shipped projects" },
];

const projects = rawProjects as ProjectTypes[];
const epic = projects.find((p) => p.id === 11);

const productLink =
  "font-medium text-white underline decoration-[color:var(--accent)]/40 underline-offset-4 transition-colors hover:decoration-[color:var(--accent)]";

const Value = () => {
  return (
    <Section className="py-24 sm:py-32">
      <SectionLabel index="01">The edge</SectionLabel>
      <SectionHeading>A developer who thinks like a marketer.</SectionHeading>

      <Reveal variant="blurIn" className="mt-8 max-w-3xl">
        <p className="text-lg font-light leading-relaxed text-gray-400">
          Most frontend devs ship what&apos;s in the Figma. I ship what
          performs. A decade running growth, SEO, and paid campaigns taught me
          how real users actually behave — so the interfaces I build are
          engineered for clarity, speed, and conversion, not just
          pixel-perfection.
        </p>
      </Reveal>

      <div className="mt-8 max-w-3xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Also an indie hacker
          </span>
          <p className="mt-3 text-base font-light leading-relaxed text-gray-300 sm:text-lg">
            Beyond client work, I design and ship my own products — like{" "}
            <Link
              to="/project/11"
              state={epic}
              data-cursor="hover"
              className={productLink}
            >
              Epic Sound Studio
            </Link>
            , a music-streaming app built on the open Audius network.
          </p>
        </div>
      </div>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-white/10"
      >
        {STATS.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="lg:px-8">
            <Counter
              to={s.to}
              suffix={s.suffix}
              className="block text-5xl font-black tracking-tight text-white sm:text-6xl"
            />
            <p className="mt-3 text-xs uppercase tracking-[0.15em] text-gray-500">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default Value;
