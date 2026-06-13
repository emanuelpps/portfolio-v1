import { motion } from "framer-motion";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";
import ProjectCard from "./ProjectCard";
import { SectionLabel, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { fadeUp, stagger } from "@/lib/motion";

export const ProjectsContainer = () => {
  const projects = rawProjects as ProjectTypes[];

  return (
    <div className="w-full">
      <SectionLabel index="02">Selected work</SectionLabel>
      <SectionHeading>Things I&apos;ve designed, built, and shipped.</SectionHeading>
      <Reveal className="mt-5 max-w-2xl">
        <p className="text-base font-light text-gray-400">
          A mix of client products, experiments, and open-source tools.
        </p>
      </Reveal>

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {projects.map((p, i) => (
          <motion.div key={p.id} variants={fadeUp}>
            <ProjectCard project={p} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
