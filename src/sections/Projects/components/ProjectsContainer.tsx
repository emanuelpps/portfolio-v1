import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import ProjectCard from "./ProjectCard";
import rawProjects from "@/data/Projects.json";
import { ProjectTypes } from "@/types/ProjectTypes";
import { TitlesFactory } from "@/components/Titles/TitlesFactory";

export const ProjectsContainer = () => {
  const Projects = rawProjects as ProjectTypes[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const ProjectsTitle = TitlesFactory.createTitle(
    "secondary",
    "Projects",
    "I've been working on these",
  );

  const projectsPerPage = 3;
  const totalSlides = Math.ceil(Projects.length / projectsPerPage);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return totalSlides - 1;
      if (next >= totalSlides) return 0;
      return next;
    });
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "5%" : "-5%", opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-5%" : "5%",
      opacity: 0,
      transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
    }),
  };

  const currentProjects = Projects.slice(
    currentIndex * projectsPerPage,
    (currentIndex + 1) * projectsPerPage,
  );

  const displayIndex = isDesktop ? currentIndex + 1 : mobileIndex + 1;
  const displayTotal = isDesktop ? totalSlides : Projects.length;

  return (
    <div className="flex flex-col w-full gap-8 sm:gap-14 py-14 sm:py-24">
      {/* Header — con padding lateral */}
      <div className="px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto w-full max-w-[1600px] flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex-1">{ProjectsTitle.render()}</div>

        <div className="flex items-center gap-5 sm:gap-8">
          <div className="flex flex-col items-start sm:items-end">
            <div className="flex items-baseline gap-1">
              <motion.span
                key={displayIndex}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-black text-white tabular-nums"
              >
                {String(displayIndex).padStart(2, "0")}
              </motion.span>
              <span className="text-[#FF4D7D] text-base sm:text-lg mx-0.5">
                /
              </span>
              <span className="text-sm text-gray-500 tabular-nums">
                {String(displayTotal).padStart(2, "0")}
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600">
              Projects
            </span>
          </div>

          <div className="hidden lg:flex gap-2">
            {[
              {
                dir: -1,
                Icon: RiArrowLeftLine,
                cls: "group-hover:-translate-x-0.5",
              },
              {
                dir: 1,
                Icon: RiArrowRightLine,
                cls: "group-hover:translate-x-0.5",
              },
            ].map(({ dir, Icon, cls }) => (
              <button
                key={dir}
                onClick={() => paginate(dir)}
                className="group w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/60 hover:text-white hover:bg-[#FF4D7D] hover:border-[#FF4D7D] transition-all duration-300 cursor-pointer active:scale-95"
              >
                <Icon
                  size={20}
                  className={`transition-transform duration-200 ${cls}`}
                />
              </button>
            ))}
          </div>

          <div className="flex lg:hidden gap-2">
            {[
              { dir: -1, Icon: RiArrowLeftLine },
              { dir: 1, Icon: RiArrowRightLine },
            ].map(({ dir, Icon }) => (
              <button
                key={dir}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  el.scrollBy({
                    left: dir * (el.offsetWidth * 0.82 + 16),
                    behavior: "smooth",
                  });
                }}
                className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/50 active:scale-95 active:bg-[#FF4D7D] active:text-white transition-all duration-200"
              >
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenedor de Cards */}
      <div className="w-full">
        {isDesktop ? (
          /* NUEVO CONTENEDOR ESCRITORIO CONTROLADO */
          /* Eliminamos el truco de '-ml-[50vw]' */
          /* Usamos px-8 para un respiro lateral mínimo y mx-auto para centrar */
          <div className="w-full max-w-[1800px] mx-auto px-8 md:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                /* Mantenemos las 3 columnas y el gap */
                className="grid grid-cols-3 gap-6 w-full"
              >
                {currentProjects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={currentIndex * projectsPerPage + i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* SECCIÓN MOBILE: Se mantiene intacta como pediste */
          <>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 scrollbar-hide -mx-4 px-4"
              onScroll={(e) => {
                const el = e.currentTarget;
                const idx = Math.round(
                  el.scrollLeft / (el.offsetWidth * 0.82 + 16),
                );
                setMobileIndex(Math.min(idx, Projects.length - 1));
              }}
            >
              {Projects.map((project, i) => (
                <div
                  key={project.id}
                  className="w-[82%] flex-shrink-0 snap-center"
                >
                  <ProjectCard project={project} index={i} />
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-1 justify-center">
              {Projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const el = scrollRef.current;
                    if (!el) return;
                    el.scrollTo({
                      left: i * (el.offsetWidth * 0.82 + 16),
                      behavior: "smooth",
                    });
                  }}
                  className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                    i === mobileIndex
                      ? "w-8 bg-[#FF4D7D]"
                      : "w-2 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
