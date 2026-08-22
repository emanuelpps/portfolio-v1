import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

/**
 * The one shape in the system: square on the left, closed in a semicircle on
 * the right. It is the P's bowl, and it is the reason the site reads as the
 * mark without ever putting the mark on the screen.
 *
 * Idle it is an outline — the monoline. Interacted with, it fills: ink becomes
 * ground and the counter closes. With no accent colour available, inversion is
 * the state change, and every other control on the site uses the same one.
 *
 * The label is set in sentence case with a normal weight, and there is no
 * trailing arrow. Uppercase tracked-out mono with an arrow tacked on the end
 * is the house style of every generated portfolio there is; the shape is
 * already doing the distinguishing here, so the type doesn't have to shout.
 */
const base =
  "bowl invertible inline-flex items-center border border-ink/60 py-3 pl-6 pr-8 " +
  "text-[0.9375rem] font-medium text-ink disabled:cursor-not-allowed disabled:opacity-50";

export function BowlButton({
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button className={`${base} ${className}`} data-cursor="hover" {...rest}>
      {children}
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
      {children}
    </a>
  );
}
