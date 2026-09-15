# Portfolio v2 "Convert" — Design Spec

**Author:** Emanuel Pagés
**Date:** 2026-06-12
**Status:** Approved (pending spec review)

## 1. Goal

Complete redesign of the personal portfolio to an award-winning ("Awwwards-grade")
dark editorial aesthetic, with premium Framer Motion animations (no Three.js / WebGL),
English copy optimized to maximize hiring as a frontend developer, and a fully
responsive, well-engineered implementation.

## 2. Positioning & Copy Strategy

**Central hook:** *"I build frontends that convert."*

Emanuel is a frontend engineer whose 10 years in digital marketing give him an
instinct for users, conversion, and business outcomes — he doesn't just write
components, he moves metrics. This is the unique differentiator and the spine of
all copy.

**Copy rules:**
- Rewrite everything from **tasks → outcomes** (e.g. "Translated designs into
  components" → "Shipped production UIs that cut bounce and lifted conversion").
- Lead with value, keep it confident but not arrogant, concrete over generic.
- Highlight proof of craft: **2 published npm libraries** (react-smart-hooks,
  ts-helpers-kit) — a credibility signal few devs have.
- Clear CTAs throughout: *Let's talk*, *View work*, *Email me*, CV download.
- Language: **English only** (international / remote reach).

## 3. Information Architecture (single-page)

1. **Hero** — name + kinetic value prop, "Available for work" badge, primary CTA
   (*Let's talk*) + secondary (*View work* / *CV*), subtle animated background.
2. **Value strip** — the differentiator (marketing-trained frontend engineer) +
   animated stats (10+ yrs, 3+ coding, 2 npm libs, N projects).
3. **Selected Work** — featured projects with hover reveal + faux-3D tilt. The two
   npm libraries are surfaced as proof of craft. Project detail pages retained.
4. **Stack / Skills** — clean redesign: infinite marquee + categories
   (Frontend, Native, Testing, Backend, Cloud, Tools).
5. **Experience** — refined vertical timeline; copy reoriented to impact.
6. **Contact** — large CTA + form (EmailJS retained).
7. **Footer** — minimal: socials, back-to-top.

Nav: existing NavBar evolves (desktop + mobile menu), anchors to the sections above.

## 4. Design System

- **Background:** deep near-black `#0A0B0F` (darker than current `#0F1621`).
- **Accent:** keep brand pink `#FF4D7D` (refined), used sparingly for emphasis,
  glows, active states.
- **Neutrals:** editorial grays for body and muted labels.
- **Typography:** Urbanist (already self-hosted, no new fonts).
  - Display: Urbanist Black, oversized, tight tracking for headlines.
  - Labels: uppercase, wide letter-spacing, small, monospace-feel for editorial
    section markers (e.g. `(01) — SELECTED WORK`).
- **Texture & detail:** film grain overlay, fine hairlines/grid, mono numerals,
  generous whitespace, strong hierarchy, point gradient glows.

## 5. Animation System (Framer Motion only)

- Scroll-triggered reveals: blur→focus, clip-path wipes, staggered children.
- **Kinetic typography:** headline letter/word reveals on enter.
- **Magnetic buttons** + subtle **custom cursor**.
- **Faux-3D tilt** on project cards (CSS perspective + Framer transforms).
- **Parallax** layered backgrounds/sections.
- **Marquee** infinite scroll for the tech stack.
- Page transitions between home and project detail.
- Animated counters for stats.
- **Smooth scroll via Lenis** (~3kb) — major contributor to the "award-winning"
  feel; integrated with Framer Motion scroll where needed.

**Constraints:** respect `prefers-reduced-motion` (disable/skip non-essential
motion); reduce or disable heavy effects (custom cursor, parallax, tilt) on
touch / small viewports.

## 6. Technology

- **Keep stack:** React 19 + Vite 6 + TypeScript + Tailwind 4 + Framer Motion 12 +
  Zustand + React Router 7 + react-icons + react-intersection-observer + EmailJS.
- **Add:** `lenis` (smooth scroll).
- **Reuse:** routing, EmailJS contact flow, `src/data/Projects.json`, self-hosted
  Urbanist fonts, Cloudinary image URLs (already `f_auto,q_auto`), icon config.
- **Rebuild:** all home sections (Hero, Value strip, Work, Skills, Experience,
  Contact, Footer) and NavBar with the new design system. Simplify the Factory
  patterns (Buttons/Titles/Inputs) where they add indirection without value;
  keep them only where they reduce duplication.
- Project detail pages: restyle to match the new system; keep the data shape.

## 7. Responsive & Performance

- Mobile-first; deliberate breakpoints (sm/md/lg/xl).
- Lazy-load project/gallery images; keep Cloudinary auto format/quality.
- Reduced motion on mobile and for `prefers-reduced-motion`.
- Avoid layout shift; preload critical fonts (already done in `index.html`).
- Target strong Lighthouse scores (performance + a11y); semantic HTML, alt text,
  focus states, color contrast on the accent.

## 8. Component / File Plan (high level)

- `src/index.css` — new design tokens (CSS vars for bg/accent/neutrals), grain
  utility, base typography.
- `src/components/` — shared primitives: animated text (kinetic), magnetic button,
  custom cursor, marquee, tilt card wrapper, section label, reveal wrapper.
- `src/lib/` — Lenis smooth-scroll provider/hook; motion presets/variants.
- `src/sections/*` — rebuilt sections per IA above.
- `src/data/Projects.json` — reused; copy may be lightly edited for outcome framing.
- Experience data: reused, copy reframed to impact.

Each section is a self-contained unit with a clear responsibility, consuming shared
primitives. Animation variants centralized so timing/easing stay consistent.

## 9. Success Criteria

- Visually distinctive, cohesive dark editorial design that reads as "award-winning",
  not a generic template.
- Smooth, performant animations that degrade gracefully (reduced motion, mobile).
- Conversion-focused English copy that leads with outcomes and the marketing+frontend
  differentiator; clear CTAs.
- Fully responsive from ~320px to large desktop, no horizontal overflow.
- Builds clean (`tsc -b && vite build`), lints clean, no console errors.

## 10. Out of Scope (YAGNI)

- No Three.js / WebGL.
- No CMS, blog, i18n/bilingual toggle, or backend changes.
- No new font families.
- No analytics/A-B infrastructure (copy is optimized by craft, not tooling).
