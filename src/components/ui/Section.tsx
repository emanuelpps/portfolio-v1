import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedText } from "@/components/motion/AnimatedText";

/** Small editorial section marker, e.g. "(02) — SELECTED WORK". */
export function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: string;
}) {
  return (
    <Reveal className="eyebrow flex items-center gap-3">
      <span className="text-[color:var(--accent)]">({index})</span>
      <span>{children}</span>
    </Reveal>
  );
}

/** Large kinetic section heading. */
export function SectionHeading({ children }: { children: string }) {
  return (
    <AnimatedText
      el="h2"
      text={children}
      className="mt-4 flex flex-wrap text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
    />
  );
}

/** Standard padded section container with a max-width inner wrapper. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`w-full px-5 sm:px-8 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-[80rem]">{children}</div>
    </section>
  );
}
