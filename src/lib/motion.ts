import type { Variants, Transition } from "framer-motion";

/** Expo-out easing — the signature smooth deceleration of award-style sites. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const dur = { fast: 0.4, base: 0.7, slow: 1.1 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: EASE } },
};

// Transform/opacity only — animating `filter: blur()` causes scroll/reveal jank.
export const blurIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.base, ease: EASE },
  },
};

/**
 * Start offset for a word sitting inside a `.text-mask`.
 * The mask is padded to fit descenders, so a word only clears it once it has
 * travelled past its own line box plus that padding — 110% used to leave the
 * tail of a descender showing before the reveal ran.
 */
export const MASK_HIDDEN_Y = "170%";

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const springSoft: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.6,
};
