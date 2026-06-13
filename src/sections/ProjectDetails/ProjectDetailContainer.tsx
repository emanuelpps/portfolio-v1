import React from "react";
import Header from "./sections/Header/Header";
import { ProjectTypes } from "../../types/ProjectTypes";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { GoUp } from "./components/GoUp";
import { TitlesFactory } from "@/components/Titles/TitlesFactory";
import { CloseButton } from "./sections/Header/components/CloseButton";
import { motion } from "framer-motion";

interface ProjectDetailContainerProps {
  project: ProjectTypes;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const ProjectDetailContainer: React.FC<ProjectDetailContainerProps> = ({
  project,
  scrollContainerRef,
}) => {
  if (!project)
    return (
      <p className="h-screen flex items-center justify-center">
        Project Not Found
      </p>
    );

  return (
    // CAMBIO CLAVE: fixed inset-0 para cubrir toda la pantalla y z-index superior
    <div
      ref={scrollContainerRef} // El scroll ahora sucede aquí adentro
      className="fixed inset-0 z-[9999] w-full h-screen bg-[color:var(--bg)] overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      {/* Fondo sutil para no perder la estética del portfolio */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,77,125,0.05)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative w-full max-w-[1400px] mx-auto px-4 md:px-10 pb-32 space-y-32">
        <CloseButton />

        <Header
          title={project.title}
          subtitle={project.description}
          stack={project.stack}
          deploy={project.deploy}
          code={project.code}
          buttonText={project.buttonText}
        />

        <HeroSection
          mainImage={project.image}
          mainImageTwo={project.image2}
          longDescription={project.longDescription}
          type={project.type}
        />
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            {TitlesFactory.createTitle("tertiary", "Design Approach").render()}
            <p className="text-gray-400 font-light leading-relaxed text-balance italic">
              {project.insights.designApproach.text}
            </p>
          </div>
          <div className="lg:col-span-8 space-y-20">
            {project.insights.designApproach.images?.map((img, i) => (
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={i}
                src={img}
                alt={`${project.title} detail ${i + 1}`}
                loading="lazy"
                className="w-full rounded-[2.5rem] border border-white/5 shadow-2xl hover:border-white/10 transition-colors duration-500"
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            {TitlesFactory.createTitle("tertiary", "Challenges").render()}
            <p className="text-gray-400 font-light leading-relaxed text-balance italic">
              {project.insights.challenges.text}
            </p>
          </div>
          <div className="lg:col-span-8 space-y-20">
            {project.insights.challenges.images?.map((img, i) => (
              <motion.img
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={i}
                src={img}
                alt={`${project.title} detail ${i + 1}`}
                loading="lazy"
                className="w-full rounded-[2.5rem] border border-white/5 shadow-2xl hover:border-white/10 transition-colors duration-500"
              />
            ))}
          </div>
        </section>

        <GoUp scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
  );
};

export default ProjectDetailContainer;
