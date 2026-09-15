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
  "bowl invertible inline-flex items-center py-3 pl-6 pr-8 text-[0.9375rem] " +
  "disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Outline is the default; `filled` is for the one primary action on a screen.
 *
 * This is a variant rather than a class a caller appends, because appending
 * `text-ground` to a base that already sets `text-ink` does not win: Tailwind
 * orders utilities of the same family by its own sort, not by their order in
 * the attribute. The send button came out as a filled bowl with an invisible
 * label, ink on ink, and nothing about the markup said why.
 */
const VARIANT = {
  outline: "border border-ink/60 font-medium text-ink",
  filled: "border-2 border-ink bg-ink font-semibold text-ground",
} as const;

type Variant = keyof typeof VARIANT;

export function BowlButton({
  children,
  variant = "outline",
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button
      className={`${base} ${VARIANT[variant]} ${className}`}
      data-cursor="hover"
      {...rest}
    >
      {children}
    </button>
  );
}

export function BowlLink({
  children,
  variant = "outline",
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <a
      className={`${base} ${VARIANT[variant]} ${className}`}
      data-cursor="hover"
      {...rest}
    >
      {children}
    </a>
  );
}
