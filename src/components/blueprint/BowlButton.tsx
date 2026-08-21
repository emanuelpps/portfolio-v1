import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

/**
 * The one shape in the system: square on the left, closed in a semicircle on
 * the right. It is the P's bowl, and it is the reason the site reads as the
 * mark without ever showing the mark.
 *
 * Idle it is an outline — the monoline. Interacted with, it fills: ink becomes
 * ground and the counter closes. With no accent colour available, inversion is
 * the state change, and it is the same one every other control on the site
 * uses.
 */
const base =
  "bowl invertible group inline-flex items-center gap-3 border border-ink/60 py-3 pl-6 pr-7 " +
  "font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink " +
  "disabled:cursor-not-allowed disabled:opacity-50";

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-300 ease-bp group-hover:translate-x-1"
      >
        →
      </span>
    </>
  );
}

export function BowlButton({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button className={`${base} ${className}`} data-cursor="hover" {...rest}>
      <Inner>{children}</Inner>
    </button>
  );
}

export function BowlLink({
  children,
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a className={`${base} ${className}`} data-cursor="hover" {...rest}>
      <Inner>{children}</Inner>
    </a>
  );
}
