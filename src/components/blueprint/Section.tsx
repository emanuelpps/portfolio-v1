import type { ReactNode, RefObject } from "react";
import { Rule } from "./Rule";
import { WipeText } from "./WipeText";

/**
 * Vertical rhythm, as three deliberate tiers rather than one value repeated.
 *
 * Every section used to open on the same `pt-24 sm:pt-32`, which is the real
 * reason the page scanned as flat: identical air above identical rules above
 * identical headings, nine times. Density is a composition tool — Work gets
 * room to be the loudest thing on the page, Stack is packed tight right after
 * it, and the contrast between the two is what gives the scroll a shape.
 */
const PACE = {
  tight: "pt-12 sm:pt-16",
  normal: "pt-16 sm:pt-24",
  loose: "pt-24 sm:pt-32",
} as const;

const TITLE = {
  tight: "text-[clamp(1.75rem,4vw,2.75rem)]",
  normal: "text-[clamp(2rem,5.5vw,4rem)]",
  loose: "text-[clamp(2.5rem,7vw,5.5rem)]",
} as const;

/**
 * The section shell: a rule crossing the stem, then the title.
 *
 * There is no index and no eyebrow. Every heading used to open `01 / Approach`
 * above its own title — a number, a slash and a label saying what the title
 * says anyway. The stem carries the section name now, running up the spine, so
 * a section opens with the one thing it has to say.
 */
export function BpSection({
  id,
  label,
  title,
  pace = "normal",
  invert = false,
  sectionRef,
  className = "",
  children,
}: {
  id?: string;
  /** Names the section for assistive tech; the spine shows it visually. */
  label: string;
  title?: string;
  pace?: keyof typeof PACE;
  /** Flip the whole subtree to ink-on-paper. See `[data-invert]` in index.css. */
  invert?: boolean;
  sectionRef?: RefObject<HTMLDivElement | null>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      ref={sectionRef}
      aria-label={label}
      data-invert={invert ? "" : undefined}
      className={`relative w-full ${PACE[pace]} ${className}`}
    >
      {/* An inverted section paints over the page's stem, so it carries its own
          in the flipped rule colour and the spine appears continuous. */}
      {invert && (
        <div
          aria-hidden
          className="stem-x pointer-events-none absolute inset-y-0 z-0 w-px bg-rule"
        />
      )}

      <Rule tick />

      {title && (
        <header className="inset-stem relative z-10 pt-8 sm:pt-10">
          <h2 className={`display-md max-w-4xl text-ink ${TITLE[pace]}`}>
            <WipeText>{title}</WipeText>
          </h2>
        </header>
      )}

      <div className="relative z-10">{children}</div>
    </section>
  );
}
