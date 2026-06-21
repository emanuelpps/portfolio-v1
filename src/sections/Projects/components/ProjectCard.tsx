import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { TiltCard } from "@/components/motion/TiltCard";
import { ProjectTypes } from "@/types/ProjectTypes";

interface ProjectCardProps {
  project: ProjectTypes;
  index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const isLib = project.type === "Library";
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={`/project/${project.id}`}
      state={project}
      data-cursor="hover"
      aria-label={`${project.title} — view case study`}
      className="group block h-full"
    >
      <TiltCard className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--bg-soft)] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] transition-[border-color,box-shadow] duration-500 group-hover:border-[color:var(--accent)]/40 group-hover:shadow-[0_28px_80px_-24px_rgba(255,77,125,0.35)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.frontImage}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          <span className="absolute right-5 top-4 font-mono text-xs tracking-[0.3em] text-white/40">
            {num}
          </span>

          {isLib && (
            <span className="absolute left-5 top-4 rounded-full bg-[color:var(--accent)] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,77,125,0.4)]">
              npm package
            </span>
          )}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-md">
              View case study <GoArrowUpRight />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="eyebrow mb-2">{project.type}</p>
              <h3 className="text-2xl font-black tracking-tight text-white">
                {project.title}
              </h3>
            </div>
            <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-colors duration-300 group-hover:border-[color:var(--accent)] group-hover:bg-[color:var(--accent)]">
              <GoArrowUpRight size={20} />
            </div>
          </div>

          <p className="mt-3 text-sm font-light leading-relaxed text-gray-400 line-clamp-2">
            {project.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.stack.slice(0, 4).map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gray-400"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </Link>
  );
};

export default ProjectCard;
