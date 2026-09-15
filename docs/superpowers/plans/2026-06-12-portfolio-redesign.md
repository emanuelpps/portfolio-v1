# Portfolio v2 "Convert" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio as an award-winning dark-editorial single page with premium Framer Motion + Lenis animations and conversion-focused English copy, fully responsive.

**Architecture:** Keep the React 19 + Vite + Tailwind 4 + Framer Motion stack. Add a centralized design-token + animation layer and a set of reusable motion primitives, then rebuild each home section and the project-detail page on top of them. Smooth scroll via Lenis. No Three.js.

**Tech Stack:** React 19, Vite 6, TypeScript, Tailwind CSS 4, Framer Motion 12, Lenis, Zustand, React Router 7, react-icons, EmailJS.

**Verification approach (read first):** This project has **no test framework** and the work is visual/design. We will NOT add Vitest/RTL just for this (out of scope, extra weight). Each task is verified by: `npx tsc -b` (types), `npm run lint` (lint), `npm run build` (production build), and a stated **manual visual check** in `npm run dev`. Steps that change logic still describe the exact expected behavior to observe.

**Conventions:**
- Accent pink `--accent: #FF4D7D`; background `--bg: #0A0B0F`. Use CSS vars / Tailwind arbitrary values.
- All motion must respect `prefers-reduced-motion` and degrade on touch/small screens.
- Commit after each task with the message shown.

---

## Phase 0 — Foundation

### Task 1: Install Lenis & lay down design tokens

**Files:**
- Modify: `package.json` (add `lenis`)
- Modify: `src/index.css` (append tokens + utilities, keep all existing `@font-face`)

- [ ] **Step 1: Install Lenis**

Run: `npm install lenis`
Expected: `lenis` added to `dependencies`, no peer-dep errors.

- [ ] **Step 2: Append design tokens & utilities to `src/index.css`**

After the existing `@font-face` blocks and the `html`/`body` rules, append:

```css
:root {
  --bg: #0A0B0F;
  --bg-soft: #11131A;
  --fg: #F4F4F5;
  --muted: #8A8F98;
  --line: rgba(255, 255, 255, 0.08);
  --accent: #FF4D7D;
  --accent-soft: rgba(255, 77, 125, 0.12);
  --max: 80rem;
}

html { background-color: var(--bg); scroll-behavior: auto; }
body { color: var(--fg); background-color: var(--bg); overflow-x: hidden; }

/* Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }

/* Film grain overlay */
.grain::after {
  content: "";
  position: fixed; inset: 0; z-index: 60; pointer-events: none;
  opacity: 0.04; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* Editorial section label */
.eyebrow {
  font-size: 0.7rem; letter-spacing: 0.28em; text-transform: uppercase;
  color: var(--muted); font-weight: 700;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
}
```

- [ ] **Step 3: Verify build & types**

Run: `npx tsc -b && npm run build`
Expected: build succeeds, no TS errors.

- [ ] **Step 4: Manual check**

Run: `npm run dev`. Page background is near-black `#0A0B0F`. No horizontal scrollbar.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/index.css
git commit -m "feat: add lenis + dark-editorial design tokens"
```

---

### Task 2: Animation presets (centralized variants)

**Files:**
- Create: `src/lib/motion.ts`

- [ ] **Step 1: Create `src/lib/motion.ts`**

```ts
import type { Variants, Transition } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const; // expo-out feel

export const dur = { fast: 0.4, base: 0.7, slow: 1.1 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: dur.base, ease: EASE } },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
  show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: dur.base, ease: EASE } },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const springSoft: Transition = { type: "spring", stiffness: 120, damping: 18, mass: 0.6 };
```

- [ ] **Step 2: Verify**

Run: `npx tsc -b`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion.ts
git commit -m "feat: centralized framer-motion presets"
```

---

### Task 3: Environment hook (reduced-motion + pointer)

**Files:**
- Create: `src/hooks/useEnvironment.ts`

- [ ] **Step 1: Create `src/hooks/useEnvironment.ts`**

```ts
import { useEffect, useState } from "react";

/** Detects reduced-motion preference and whether the device has a fine pointer (mouse). */
export function useEnvironment() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasFinePointer, setHasFinePointer] = useState(true);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fp = window.matchMedia("(pointer: fine)");
    const sync = () => {
      setReducedMotion(rm.matches);
      setHasFinePointer(fp.matches);
    };
    sync();
    rm.addEventListener("change", sync);
    fp.addEventListener("change", sync);
    return () => {
      rm.removeEventListener("change", sync);
      fp.removeEventListener("change", sync);
    };
  }, []);

  return { reducedMotion, hasFinePointer };
}
```

- [ ] **Step 2: Verify** — Run: `npx tsc -b` → no errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useEnvironment.ts
git commit -m "feat: useEnvironment hook (reduced-motion + pointer)"
```

---

### Task 4: Lenis smooth-scroll provider

**Files:**
- Create: `src/lib/SmoothScroll.tsx`
- Modify: `src/main.tsx` (wrap app)

- [ ] **Step 1: Create `src/lib/SmoothScroll.tsx`**

```tsx
import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useEnvironment } from "@/hooks/useEnvironment";

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const { reducedMotion } = useEnvironment();

  useEffect(() => {
    if (reducedMotion) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenisInstance = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
```

- [ ] **Step 2: Wrap the app in `src/main.tsx`**

Import `SmoothScroll` and wrap the existing root render tree (inside the router/providers, around `<App />`). Add `import "lenis/dist/lenis.css";` at top.

- [ ] **Step 3: Verify** — Run: `npx tsc -b && npm run build` → succeeds.

- [ ] **Step 4: Manual check** — `npm run dev`: wheel scroll feels eased/smooth; with OS "reduce motion" on, scrolling is native.

- [ ] **Step 5: Commit**

```bash
git add src/lib/SmoothScroll.tsx src/main.tsx
git commit -m "feat: lenis smooth-scroll provider"
```

---

## Phase 1 — Reusable motion primitives

> Each primitive is a small, focused component consuming `useEnvironment` + `src/lib/motion.ts`. Verify each with `npx tsc -b` and a one-line manual check, then commit.

### Task 5: `Reveal` (scroll-in wrapper)

**Files:** Create `src/components/motion/Reveal.tsx`

- [ ] **Step 1: Implement**

```tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, blurIn } from "@/lib/motion";

export function Reveal({
  children, variant = "fadeUp", className, amount = 0.3, delay = 0,
}: {
  children: ReactNode;
  variant?: "fadeUp" | "blurIn";
  className?: string;
  amount?: number;
  delay?: number;
}) {
  const v = variant === "blurIn" ? blurIn : fadeUp;
  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/motion/Reveal.tsx && git commit -m "feat: Reveal scroll primitive"`

---

### Task 6: `AnimatedText` (kinetic word reveal)

**Files:** Create `src/components/motion/AnimatedText.tsx`

- [ ] **Step 1: Implement**

```tsx
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Splits text into words and reveals them with a mask + stagger. */
export function AnimatedText({
  text, className, delay = 0, el = "h1",
}: { text: string; className?: string; delay?: number; el?: "h1" | "h2" | "span" }) {
  const words = text.split(" ");
  const Tag = motion[el];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/motion/AnimatedText.tsx && git commit -m "feat: AnimatedText kinetic reveal"`

---

### Task 7: `MagneticButton`

**Files:** Create `src/components/motion/MagneticButton.tsx`

- [ ] **Step 1: Implement**

```tsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { useEnvironment } from "@/hooks/useEnvironment";

export function MagneticButton({
  children, onClick, className, strength = 0.4,
}: { children: ReactNode; onClick?: () => void; className?: string; strength?: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const move = (e: MouseEvent) => {
    if (!hasFinePointer || reducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref} onClick={onClick} onMouseMove={move} onMouseLeave={reset}
      style={{ x, y }} className={className}
    >
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/motion/MagneticButton.tsx && git commit -m "feat: MagneticButton"`

---

### Task 8: `TiltCard` (faux-3D)

**Files:** Create `src/components/motion/TiltCard.tsx`

- [ ] **Step 1: Implement**

```tsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { useEnvironment } from "@/hooks/useEnvironment";

export function TiltCard({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 150, damping: 15 });

  const move = (e: MouseEvent) => {
    if (!hasFinePointer || reducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const reset = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      ref={ref} onMouseMove={move} onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/motion/TiltCard.tsx && git commit -m "feat: TiltCard faux-3D"`

---

### Task 9: `Marquee`

**Files:** Create `src/components/motion/Marquee.tsx`

- [ ] **Step 1: Implement** (duplicates children once for a seamless loop)

```tsx
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Marquee({ children, speed = 30, reverse = false, className }: {
  children: ReactNode; speed?: number; reverse?: boolean; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max gap-12"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        <div className="flex gap-12 shrink-0">{children}</div>
        <div className="flex gap-12 shrink-0" aria-hidden>{children}</div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/motion/Marquee.tsx && git commit -m "feat: Marquee"`

---

### Task 10: `Counter` (animated number)

**Files:** Create `src/components/motion/Counter.tsx`

- [ ] **Step 1: Implement**

```tsx
import { useEffect } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useEnvironment } from "@/hooks/useEnvironment";

export function Counter({ to, suffix = "", className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reducedMotion } = useEnvironment();
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) { mv.set(to); return; }
    const controls = animate(mv, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, to, reducedMotion, mv]);

  return <motion.span ref={ref} className={className}>{rounded}</motion.span>;
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/motion/Counter.tsx && git commit -m "feat: Counter"`

---

### Task 11: `CustomCursor` (desktop-only)

**Files:** Create `src/components/motion/CustomCursor.tsx`

- [ ] **Step 1: Implement** — a small accent dot + trailing ring that follows the mouse; renders `null` when `!hasFinePointer || reducedMotion`. Grows when hovering `[data-cursor="hover"]` elements.

```tsx
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useEnvironment } from "@/hooks/useEnvironment";

export function CustomCursor() {
  const { hasFinePointer, reducedMotion } = useEnvironment();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 28 });
  const ry = useSpring(y, { stiffness: 350, damping: 28 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hasFinePointer || reducedMotion) return;
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) =>
      setHovering(!!(e.target as HTMLElement).closest('[data-cursor="hover"]'));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [hasFinePointer, reducedMotion, x, y]);

  if (!hasFinePointer || reducedMotion) return null;
  return (
    <motion.div
      style={{ x: rx, y: ry }}
      className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      animate={{ scale: hovering ? 2.4 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-3 w-3 rounded-full bg-white" />
    </motion.div>
  );
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/motion/CustomCursor.tsx && git commit -m "feat: CustomCursor"`

---

### Task 12: `SectionLabel` + `SectionHeading`

**Files:** Create `src/components/ui/Section.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedText } from "@/components/motion/AnimatedText";

export function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <Reveal className="eyebrow flex items-center gap-3">
      <span className="text-[color:var(--accent)]">({index})</span>
      <span>{children}</span>
    </Reveal>
  );
}

export function SectionHeading({ children }: { children: string }) {
  return (
    <AnimatedText
      el="h2"
      text={children}
      className="mt-4 text-3xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
    />
  );
}

export function Section({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`w-full px-5 sm:px-8 ${className ?? ""}`}>
      <div className="mx-auto w-full max-w-[80rem]">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/ui/Section.tsx && git commit -m "feat: Section label/heading primitives"`

---

## Phase 2 — Layout shell

### Task 13: Background atmosphere

**Files:** Create `src/components/layout/Atmosphere.tsx`

- [ ] **Step 1: Implement** — fixed, behind content (`z-0`, `pointer-events-none`): two soft accent/blue radial glows + a faint fine grid. The `.grain` overlay is applied on the app root (Task 15).

```tsx
export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-40 top-[-10%] h-[40rem] w-[40rem] rounded-full bg-[color:var(--accent-soft)] blur-[140px]" />
      <div className="absolute -right-40 top-[40%] h-[36rem] w-[36rem] rounded-full bg-blue-500/10 blur-[150px]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2:** `npx tsc -b` → no errors.
- [ ] **Step 3:** Commit: `git add src/components/layout/Atmosphere.tsx && git commit -m "feat: Atmosphere background"`

---

### Task 14: NavBar redesign

**Files:** Rebuild `src/components/NavBar/NavBar.tsx` and its subcomponents as needed; keep the scroll/anchor behavior from `src/hooks/UseScroll.tsx`.

**Structure:**
- Fixed top, transparent → blurred/translucent (`backdrop-blur`, subtle bottom hairline) after scrolling > 40px (use a scroll listener or Framer `useScroll`).
- Left: logo (reuse `epLogo.png`) as a link to top.
- Center/right (desktop): anchor links `Work`, `Stack`, `Experience`, `Contact` → smooth-scroll to sections (use `getLenis()?.scrollTo(target)` with fallback to `scrollIntoView`). Each link has `data-cursor="hover"` and an underline draw on hover.
- Right: `Let's talk` MagneticButton → scroll to contact.
- Mobile: hamburger → full-screen overlay menu (Framer slide/fade, staggered links). Reuse/restyle existing `MenuMobile`.

- [ ] **Step 1:** Implement the navbar per the structure above using `MagneticButton`.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — links smooth-scroll to each section; navbar gains blur after scroll; mobile menu opens/closes and locks scroll while open.
- [ ] **Step 4:** Commit: `git add src/components/NavBar && git commit -m "feat: redesign navbar"`

---

### Task 15: App shell wiring

**Files:** Modify `src/App.tsx` (and `src/pages/Home.tsx` as needed)

- [ ] **Step 1:** In `App.tsx`, mount (once, around the routed content): `<Atmosphere />`, `<CustomCursor />`, add the `grain` class to the root wrapper, and ensure `<NavBar />` + `<Footer />` wrap the routes. Confirm `SmoothScroll` from Task 4 wraps everything in `main.tsx`.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — grain texture visible; custom cursor present on desktop, absent on touch / reduced-motion; background glows behind content.
- [ ] **Step 4:** Commit: `git add src/App.tsx src/pages/Home.tsx && git commit -m "feat: wire app shell (atmosphere, cursor, grain)"`

---

## Phase 3 — Sections (rebuild)

> Copy below is final. Use the primitives from Phase 1. Verify each section with `npx tsc -b && npm run build` + the stated manual check, then commit.

### Task 16: Hero

**Files:** Rebuild `src/sections/Hero/Hero.tsx`; remove now-unused Hero subcomponents (`components/Title.tsx`, `TitleText.tsx`, `Available.tsx`) if no longer referenced.

**Content & structure:**
- Full viewport, centered, `ref={refs.refHome}`.
- Badge (Reveal): a pulsing dot + `AVAILABLE FOR WORK — REMOTE / FRONTEND`.
- Small label above headline: `EMANUEL PAGÉS`.
- Headline via `AnimatedText` (h1, huge): **`I build frontends that convert.`** — the word "convert" wrapped in an accent gradient span.
- Subhead (Reveal, `blurIn`, max-w ~2xl, muted): **`Frontend engineer with 10 years in digital marketing. I turn designs into fast, accessible interfaces that don't just look good — they move the metrics that matter.`**
- CTA row: `MagneticButton` primary **`Let's talk`** (→ scroll contact) + secondary text link **`View work →`** (→ scroll work). Both `data-cursor="hover"`.
- Bottom: scroll-cue (existing animated mouse) hidden on mobile.

- [ ] **Step 1:** Implement Hero per above.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — headline words rise into view on load; "convert" is accent-colored; CTAs scroll to the right sections; layout holds at 320px width.
- [ ] **Step 4:** Commit: `git add src/sections/Hero && git commit -m "feat: rebuild hero section"`

---

### Task 17: Value strip (the edge)

**Files:** Create `src/sections/Value/Value.tsx`; add it to `Home.tsx` after Hero.

**Content & structure:**
- `SectionLabel` index `01` → `THE EDGE`.
- `SectionHeading`: **`A developer who thinks like a marketer.`**
- Body paragraph (Reveal, muted, max-w ~3xl): **`Most frontend devs ship what's in the Figma. I ship what performs. A decade running growth, SEO, and paid campaigns taught me how real users actually behave — so the interfaces I build are engineered for clarity, speed, and conversion, not just pixel-perfection.`**
- Stats row (4 items, each in a `Reveal` with stagger; numbers via `Counter`):
  - `10+` — `Years in digital & product`
  - `3+` — `Years building with React & TypeScript`
  - `2` — `Open-source npm libraries`
  - `9+` — `Shipped projects`
- Use hairline dividers between stats on desktop; 2x2 grid on mobile.

- [ ] **Step 1:** Implement + register in `Home.tsx`.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — counters animate when scrolled into view (and jump to final value under reduced-motion); 2x2 on mobile, row on desktop.
- [ ] **Step 4:** Commit: `git add src/sections/Value src/pages/Home.tsx && git commit -m "feat: value strip section"`

---

### Task 18: Selected Work

**Files:** Rebuild `src/sections/Projects/Projects.tsx`, `components/ProjectsContainer.tsx`, `components/ProjectCard.tsx`. Reuse `src/data/Projects.json` and `src/types/ProjectTypes.ts`.

**Content & structure:**
- `SectionLabel` index `02` → `SELECTED WORK`.
- `SectionHeading`: **`Things I've designed, built, and shipped.`**
- Intro line (muted): **`A mix of client products, experiments, and open-source tools.`**
- Grid of project cards (2 cols desktop, 1 col mobile). Each card = `TiltCard` wrapping: project `frontImage` (lazy `loading="lazy"`), title, `type`, short `description`, stack chips (first 4), and a hover overlay revealing **`View case study →`**.
- **npm differentiation:** cards whose `type === "Library"` get an `npm` badge and a `deploy`-link chip. Surface the two libraries near the top.
- Card click → `react-router` navigate to existing project detail route (`/project/:id` per current `Router.tsx`; confirm the path) with page transition.
- `data-cursor="hover"` on cards.

- [ ] **Step 1:** Implement cards + grid.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — cards tilt on mouse-move (desktop only), images lazy-load, npm badge shows on the two libraries, clicking opens the detail page.
- [ ] **Step 4:** Commit: `git add src/sections/Projects && git commit -m "feat: rebuild selected work section"`

---

### Task 19: Stack / Skills

**Files:** Rebuild `src/sections/Skills/Skills.tsx` + `components/SkillsContainer.tsx`, `SkillCard.tsx`, `SkillsTabs.tsx`. Reuse `src/components/Icons/IconsConfig.tsx`.

**Content & structure:**
- `SectionLabel` index `03` → `STACK`.
- `SectionHeading`: **`The tools I reach for.`**
- Top: a full-width `Marquee` of the most relevant frontend tech icons (React, TypeScript, Next.js, Tailwind, Framer Motion, React Native, Zustand, GraphQL...) for an immediate "wow" band.
- Below: keep the category tabs (`Frontend, Native, Testing, Backend, Cloud, Tools`) with the existing `layoutId` active-pill animation; restyle cards to the editorial system (hairline border, hover accent, icon + name). Reuse `icons[activeTab]`.

- [ ] **Step 1:** Implement marquee + restyled tabs/grid.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — marquee loops seamlessly; tab switch animates the pill and re-staggers cards; no overflow on mobile.
- [ ] **Step 4:** Commit: `git add src/sections/Skills && git commit -m "feat: rebuild stack section"`

---

### Task 20: Experience timeline

**Files:** Rebuild `src/sections/Experience/Experience.tsx` + `components/ExperienceContainer.tsx`, `ExperienceItem.tsx`. Keep the scroll-progress line idea; reframe copy to outcomes.

**Content & structure:**
- `SectionLabel` index `04` → `EXPERIENCE`.
- `SectionHeading`: **`Ten years building for outcomes.`**
- Vertical timeline with a scroll-driven accent progress line (keep current `useScroll`/`useTransform` approach). Each entry: period (mono accent), company, role, and an **outcome-reframed** description. Use this reframed copy:
  - **Dizizid — Frontend Developer (2026 – Present):** `Rebuilt the platform to be fully responsive across devices, hardening React + Tailwind components against edge cases and breakpoints. Partnered with design and product to ship a more consistent, scalable UI.`
  - **The CodeMaker Lab — Frontend Developer (2024 – Present):** `Turn designs into production-ready interfaces, ship them, and keep them fast. Maintain and optimize client sites for performance, usability, and SEO — and present solutions directly to clients.`
  - **EPAM Systems — Associate Project Administrator (2025):** `Owned data integrity for a client platform: validated JSON flows in Retool, debugged GraphQL queries, and coordinated with US teams to keep backoffice and mobile data in sync.`
  - **Justina.io Hackathon — Frontend Developer (2024):** `Shipped a working web product end-to-end under hackathon time pressure.`
  - **NoCountry — Frontend Developer (2023 – 2024):** `Built React/Next.js interfaces from design, integrated APIs for dynamic data, and drove code reviews and best practices across a cross-functional team.`
  - **Duo Digital — Digital Marketing Manager (2022 – 2024):** `Generated leads and ran the full growth stack — email, content, paid media, SEO, and Google Ads — while building and managing the WordPress sites behind the campaigns.`
  - **Vital Servicios — Marketing Manager (2021 – 2022):** `Led the marketing team and SEM/SEO strategy, managed budgets, and optimized the e-commerce funnel to generate new leads.`
  - **Dafiti Argentina — Marketing Analyst (2014 – 2018):** `Planned and optimized email and on-site campaigns at scale, segmenting audiences and reporting performance daily to hit business goals.`

- [ ] **Step 1:** Implement timeline with reframed copy.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — progress line fills with scroll; entries reveal alternately on desktop, single-column on mobile with the left rail.
- [ ] **Step 4:** Commit: `git add src/sections/Experience && git commit -m "feat: rebuild experience timeline with outcome copy"`

---

### Task 21: Contact

**Files:** Rebuild `src/sections/Contact/Contact.tsx` + `components/FormContainer.tsx`, `Form.tsx`. Keep the EmailJS integration and `PopUp`/`LoadingDots` behavior.

**Content & structure:**
- `SectionLabel` index `05` → `CONTACT`.
- Big heading (`AnimatedText`): **`Let's build something that performs.`**
- Sub (muted): **`Open to frontend roles and freelance projects. Tell me what you're working on — I usually reply within a day.`**
- Left column: the form (name, email, message) — restyled inputs (hairline border, accent focus ring), submit = `MagneticButton` **`Send message`**; preserve existing EmailJS submit + success/error popup.
- Right column: direct links — email `emanuelpages.ps@gmail.com` (mailto, `data-cursor="hover"`), GitHub `github.com/emanuelpps`, LinkedIn `linkedin.com/in/emanuel-ps`.

- [ ] **Step 1:** Implement; keep EmailJS keys/flow intact.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — form still sends via EmailJS (success popup shows); inputs stack on mobile; mailto/social links work.
- [ ] **Step 4:** Commit: `git add src/sections/Contact && git commit -m "feat: rebuild contact section"`

---

### Task 22: Footer

**Files:** Rebuild `src/sections/Footer/Footer.tsx` + subcomponents into a minimal footer.

**Content & structure:**
- Big CTA line (reuse heading style): **`Available for new projects`** / **`Let's create something impactful.`** + `GET IN TOUCH` MagneticButton → scroll contact (fix the placeholder LinkedIn URL in current `Header.tsx`).
- Bottom bar: left © `2026 Emanuel Pagés`; center muted `Built with React, TypeScript & Framer Motion.`; right socials (GitHub, LinkedIn) + `Back to top ↑` (uses `getLenis()?.scrollTo(0)`).

- [ ] **Step 1:** Implement.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — back-to-top smooth-scrolls; socials open correct URLs; responsive stack on mobile.
- [ ] **Step 4:** Commit: `git add src/sections/Footer && git commit -m "feat: rebuild footer"`

---

## Phase 4 — Project detail page

### Task 23: Restyle project detail to new system

**Files:** Restyle `src/sections/ProjectDetails/**` and `src/pages/ProjectDetails.tsx` to the new tokens/primitives. Keep the data shape from `Projects.json` and the routing.

**Structure:**
- Apply `--bg`, hairlines, editorial labels, `Reveal` on section enters, `AnimatedText` on the project title.
- Hero: title, type, stack chips, links (`code`/`deploy`), main image.
- Sections Purpose / Design Approach / Challenges / ShowCase: editorial two-column layouts with `Reveal`; lazy-load all images.
- A `Back to work ↑`/close control returns to home `#work` (smooth scroll on arrival if feasible).
- The slide-up overlay transition **already exists** in `src/routes/Router.tsx` (`AnimatePresence` on `useMatch("/project/:projectId")`). Only restyle its container background `bg-[#0F1724]` → `bg-[color:var(--bg)]`; do not rebuild the transition. Navigation is `<Link to={`/project/${project.id}`} state={project}>` (confirmed).

- [ ] **Step 1:** Restyle the detail sections; update the overlay background token in `Router.tsx`.
- [ ] **Step 2:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 3: Manual check** — open a project from Work; detail matches the new look; images lazy-load; back returns to the Work section; the slide-up transition is smooth.
- [ ] **Step 4:** Commit: `git add src/sections/ProjectDetails src/pages/ProjectDetails.tsx src/routes/Router.tsx && git commit -m "feat: restyle project detail pages"`

---

## Phase 5 — Polish, meta & verification

### Task 24: Meta / SEO / favicon polish

**Files:** Modify `index.html`.

- [ ] **Step 1:** Update `<title>` and meta description to the new positioning, e.g. description: `Frontend engineer who builds fast, accessible interfaces that convert. 10 years in digital marketing, 3+ years shipping React & TypeScript.` Keep OG/Twitter tags; verify image URL still valid. Ensure `lang="en"`.
- [ ] **Step 2:** `npm run build` → succeeds.
- [ ] **Step 3:** Commit: `git add index.html && git commit -m "chore: update meta for new positioning"`

---

### Task 25: Responsive & reduced-motion QA pass

**Files:** Any section needing fixes found during QA.

- [ ] **Step 1:** In `npm run dev`, walk every section at widths **320 / 375 / 768 / 1024 / 1440**. Check: no horizontal overflow, readable type scale, tap targets ≥ 40px, images not distorted, navbar/mobile menu correct.
- [ ] **Step 2:** Toggle OS "reduce motion": confirm marquee/cursor/parallax/tilt/counters degrade (no essential content hidden).
- [ ] **Step 3:** Fix any issues found; keep changes minimal and section-scoped.
- [ ] **Step 4:** `npx tsc -b && npm run build` → succeeds.
- [ ] **Step 5:** Commit: `git add -A && git commit -m "fix: responsive + reduced-motion QA pass"`

---

### Task 26: Final verification

- [ ] **Step 1:** Run `npm run lint` → resolve any errors (warnings acceptable if pre-existing).
- [ ] **Step 2:** Run `npx tsc -b && npm run build` → clean production build.
- [ ] **Step 3:** Run `npm run preview`; click through the whole site once (all CTAs, all nav links, one project detail, submit contact form). Confirm no console errors.
- [ ] **Step 4:** Remove any dead files left from the redesign (unused old Hero subcomponents, unused Factory variants) confirmed unreferenced via search.
- [ ] **Step 5:** Commit: `git add -A && git commit -m "chore: final cleanup + verification"`

---

## Self-Review notes

- **Spec coverage:** positioning/copy (Tasks 16–22, 24), IA all 7 sections (16–22), design system (1, 12, 13), animation system incl. Lenis/kinetic/magnetic/tilt/marquee/cursor/counter/parallax (2–11, 14), responsive+reduced-motion (3, 25), tech reuse + Lenis add (1, 4), project detail (23), success criteria & cleanup (26). No gaps.
- **No new test framework** is a deliberate, stated deviation from default TDD given no existing harness + visual nature of work; verification is types/lint/build/manual.
- **Type consistency:** `useEnvironment` returns `{ reducedMotion, hasFinePointer }` used consistently; `getLenis()` exported from `SmoothScroll.tsx` used in NavBar/Footer; primitives' prop names match their call sites.
