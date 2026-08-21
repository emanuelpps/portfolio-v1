import type { ReactNode, RefObject } from "react";
import { Rule } from "./Rule";
import { WipeText } from "./WipeText";

/**
 * The section shell: an opening rule crossing the stem, the index in mono, and
 * the title in the thin display voice. Every section on the site opens with
 * exactly this, which is what makes the page scan as one drawing rather than a
 * stack of unrelated blocks.
 */
export function BpSection({
  id,
  index,
  label,
  title,
  aside,
  sectionRef,
  className = "",
  children,
}: {
  id?: string;
  index: string;
  label: string;
  title?: string;
  /** Optional mono note pinned to the right of the header row. */
  aside?: ReactNode;
  sectionRef?: RefObject<HTMLDivElement | null>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full pt-20 sm:pt-28 ${className}`}
    >
      <Rule tick />

      <header className="inset-stem pt-5">
        <div className="flex items-baseline justify-between gap-6">
          <div className="mono flex items-baseline gap-3 text-ink-dim">
            <span className="text-ink">{index}</span>
            <span aria-hidden className="text-rule">
              /
            </span>
            <span>{label}</span>
          </div>
          {aside && <div className="mono-sm text-ink-faint">{aside}</div>}
        </div>

        {title && (
          <h2 className="display-md mt-8 max-w-4xl text-[clamp(2rem,5.5vw,4rem)] text-ink">
            <WipeText>{title}</WipeText>
          </h2>
        )}
      </header>

      {children}
    </section>
  );
}
