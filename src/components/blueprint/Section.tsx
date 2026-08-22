import type { ReactNode, RefObject } from "react";
import { Rule } from "./Rule";
import { WipeText } from "./WipeText";

/**
 * The section shell: a rule crossing the stem, then the title.
 *
 * There is no index and no eyebrow. Every heading on the page used to open
 * `01 / Approach` above its own title — a number, a slash and a label saying
 * what the title says anyway. The stem carries the section name now, running
 * up the spine, so a section opens with the one thing it has to say.
 */
export function BpSection({
  id,
  label,
  title,
  sectionRef,
  className = "",
  children,
}: {
  id?: string;
  /** Names the section for assistive tech; the spine shows it visually. */
  label: string;
  title?: string;
  sectionRef?: RefObject<HTMLDivElement | null>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      ref={sectionRef}
      aria-label={label}
      className={`relative w-full pt-24 sm:pt-32 ${className}`}
    >
      <Rule tick />

      {title && (
        <header className="inset-stem pt-10 sm:pt-14">
          <h2 className="display-md max-w-4xl text-[clamp(2rem,5.5vw,4rem)] text-ink">
            <WipeText>{title}</WipeText>
          </h2>
        </header>
      )}

      {children}
    </section>
  );
}
