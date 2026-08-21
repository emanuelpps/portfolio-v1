import { Fragment } from "react";
import type { ReactNode } from "react";

export type Spec = { key: string; value: ReactNode };

/**
 * Key/value rows in the annotation voice — the drafting sheet's title block.
 *
 * This is where facts live in Blueprint. Numbers are set here as plain type,
 * never as animated counters: a figure that counts up is asking to be believed,
 * and the ones on this site are small and true enough to just state.
 */
export function SpecList({
  items,
  className = "",
}: {
  items: Spec[];
  className?: string;
}) {
  return (
    <dl
      className={`grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 ${className}`}
    >
      {items.map(({ key, value }) => (
        <Fragment key={key}>
          <dt className="mono-sm self-center whitespace-nowrap text-ink-faint">
            {key}
          </dt>
          <dd className="font-mono text-[0.8125rem] leading-snug text-ink-dim">
            {value}
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}
