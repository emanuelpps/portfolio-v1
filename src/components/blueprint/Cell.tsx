import type { ReactNode } from "react";

/**
 * A grid of counterform cells.
 *
 * The dividers are the 1px gap itself, showing the rule colour through from
 * behind — so adjacent cells share one hairline instead of stacking two, and
 * the lines meet cleanly at every junction. That is the whole point: the E's
 * voids are separated by single strokes that touch, not by floating cards with
 * space around them. Nothing here is allowed a radius, a shadow or a fill.
 */
export function CellGrid({
  cols = "grid-cols-1",
  bordered = true,
  className = "",
  children,
}: {
  /**
   * Column utilities, written out in full by the caller — Tailwind only emits
   * classes it can find as literal strings, so these can never be assembled
   * from a prop at runtime.
   */
  cols?: string;
  bordered?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`grid gap-px bg-rule ${cols} ${
        bordered ? "border-y border-rule" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Cell({
  pad = "px-[var(--gutter)] py-6 sm:py-8",
  className = "",
  children,
}: {
  /**
   * Padding, replaced wholesale rather than layered over a default — two
   * competing `p-*` utilities in one class list resolve by Tailwind's own sort
   * order, not by which one the caller wrote last.
   *
   * The inline axis is the gutter, not a spacing step: a cell's first glyph has
   * to land on the same vertical as every `.inset-stem` heading above it, or
   * the page loses the single left edge the whole system is built on.
   */
  pad?: string;
  className?: string;
  children: ReactNode;
}) {
  return <div className={`bg-ground ${pad} ${className}`}>{children}</div>;
}
