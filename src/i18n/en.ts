/**
 * English — the reference dictionary.
 *
 * This file defines the shape. `es.ts` is typed against it, so a key that is
 * added here and forgotten there fails the build rather than falling back to
 * an English string nobody notices for a month.
 *
 * Placeholders are written `{name}` and filled by `fill()` in ./index.ts.
 * There are only two of them; anything more elaborate belongs in the component
 * rather than in the copy.
 */
export const en = {
  /** The browser tab and the search snippet. The static tags in index.html are
   *  the English ones; App swaps these in when the language changes. */
  meta: {
    title: "Emanuel Pagés | Frontend Developer",
    description:
      "Frontend developer who thinks like a marketer: a decade of growth and SEO before React, now building fast, responsive React and TypeScript interfaces.",
  },

  nav: {
    label: "Main",
    sections: {
      approach: "Approach",
      work: "Work",
      stack: "Stack",
      experience: "Record",
      contact: "Contact",
    },
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    skip: "Skip to content",
  },

  theme: {
    light: "Light",
    dark: "Dark",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },

  /** Written in the language it takes you TO, which is the only way a switcher
   *  is useful to someone who cannot read the page they are on. */
  language: {
    code: "ES",
    switch: "Ver en español",
  },

  hero: {
    /** Two lines, set as a poster. See --hero-size in index.css: the longest
     *  word in each language sets how large this is allowed to get. */
    roleLines: ["Frontend", "Developer"],
    srName: "Emanuel Pagés — ",
    lead: "A developer who thinks like a marketer — a decade of growth and SEO before React.",
    ctaWork: "Selected work",
    ctaContact: "Get in touch",
    available: "Available — remote",
    projectsLabel: "Selected projects",
  },

  approach: {
    note: "Why the frontend, after ten years of growth",
    /** Three lines, not two. The artboard breaks the claim where the sense
     *  breaks, and at poster scale the line ending is punctuation. */
    quoteLines: ["A developer", "who thinks like", "a marketer"],
    edgeLabel: "The edge",
    lead: "Most frontend developers ship what is in the Figma. I ship what performs. A decade running growth, SEO and paid campaigns taught me how people actually behave on a page — so the interfaces I build are engineered for clarity, speed and conversion, not only for pixel fidelity.",
    /**
     * The figure is the loud part and the qualifier sits under it, rather than
     * both being folded into one sentence at body size. There is no "Indexed —
     * 10 projects · 2 libraries" row any more: Work's own heading counts the
     * index now, and saying it twice on one page made it read as a claim
     * rather than as a fact.
     */
    record: {
      digitalKey: "In digital",
      digitalFigure: "10 years",
      digitalNote: "Marketing, growth and SEO",
      reactKey: "In React",
      reactFigure: "3 years",
      reactNote: "Shipping production TypeScript",
    },
    indieLabel: "Also an indie hacker",
    indieBefore:
      "I design and ship my own products, not just client work — like ",
    indieAfter: ", plus {libraries} open-source libraries on npm.",
  },

  work: {
    /** The heading is `nav.sections.work` — the masthead index and the heading
     *  it lands on have to say the same word, and two strings drift. What sits
     *  beside it is the count, filled from the data rather than typed here. */
    count: "{projects} projects · {libraries} open-source libraries",
    featuredLabel: "Featured",
    featuredDescription:
      "A music-streaming app built on the open Audius network. My own product — same stack as client work, no brief, every decision mine.",
    featuredCta: "Read the case study",
    filterLabel: "Filter projects",
    filters: {
      All: "All",
      Projects: "Projects",
      Libraries: "Libraries",
    },
    types: {
      Project: "Project",
      Library: "Library",
    },
  },

  /**
   * The project sheet.
   *
   * Its four headings are written the way someone would say them out loud.
   * They used to read Overview / Purpose / Design approach / Challenges, which
   * is the vocabulary of an agency case study — a client, a brief, a measured
   * result — and none of that is what these are. "Design approach" was the
   * clearest tell: under it sits a paragraph about React Query and Zustand,
   * which is how the thing is built, not how it was designed.
   */
  project: {
    metaTitle: "{title} — Emanuel Pagés",
    back: "Back to work",
    whatItIs: "What it is",
    whyIBuiltIt: "Why I built it",
    howItsBuilt: "How it's built",
    whatWasHard: "What was hard",
    specs: {
      type: "Type",
      stack: "Stack",
      status: "Status",
      links: "Links",
    },
    repository: "Repository",
    live: "Live site",
    inDevelopment: "In development",
    inDevelopmentNote:
      "{title} is still under active development and isn't live yet, so there are no screenshots to show. The write-up below explains what it is and how it works.",
    nextLabel: "Next project",
    next: "Next",
    viewAlt: "{title} — view {n}",
    notFound: "That project isn't in the index.",
  },

  stack: {
    /** The count is derived from src/data/Stack.ts, never typed: a number
     *  standing next to the list it counts has to be the list. */
    note: "{count} entries · in progress: {studying}",
    groups: {
      frontend: { title: "Frontend", note: "Daily" },
      backend: { title: "Backend & data", note: "Working knowledge" },
      native: { title: "Native", note: "Mobile" },
      testing: { title: "Testing", note: "Coverage" },
      cloud: { title: "Cloud & ops", note: "Delivery" },
      tools: { title: "Tools & automation", note: "Everything else" },
    },
    studying: "Python Diploma, UTN",
  },

  record: {
    title: "Ten years building for outcomes.",
    roles: {
      dizizid: {
        period: "2026 — Present",
        title: "Frontend Developer",
        description:
          "Rebuilt the platform to be fully responsive across devices, hardening React + Tailwind components against edge cases and breakpoints. Partnered with design and product to ship a more consistent, scalable UI. Now working on the ticketing platform itself — refining the path from browsing an event to completing a purchase, and keeping every step of it dependable on any screen.",
      },
      codemakerlab: {
        period: "2024 — Present",
        title: "Frontend Developer",
        description:
          "Turn designs into production-ready interfaces, ship them, and keep them fast. Maintain and optimize client sites for performance, usability, and SEO — and present solutions directly to clients. Beyond the frontend, build automations with n8n: workflows that move data between apps and APIs, lead capture wired into the CRM, and internal processes that used to be done by hand.",
      },
      epam: {
        period: "2025",
        title: "Associate Project Administrator",
        description:
          "Owned data integrity for a client platform: validated JSON flows in Retool, debugged GraphQL queries, and coordinated with US teams to keep backoffice and mobile data in sync.",
      },
      justina: {
        period: "2024",
        title: "Frontend Developer",
        description:
          "Shipped a working web product end-to-end under hackathon time pressure.",
      },
      nocountry: {
        period: "2023 — 2024",
        title: "Frontend Developer",
        description:
          "Built React/Next.js interfaces from design, integrated APIs for dynamic data, and drove code reviews and best practices across a cross-functional team.",
      },
      duodigital: {
        period: "2022 — 2024",
        title: "Digital Marketing Manager",
        description:
          "Generated leads and ran the full growth stack — email, content, paid media, SEO, and Google Ads — while building and managing the WordPress sites behind the campaigns.",
      },
      vital: {
        period: "2021 — 2022",
        title: "Marketing Manager",
        description:
          "Led the marketing team and SEM/SEO strategy, managed budgets, and optimized the e-commerce funnel to generate new leads.",
      },
      dafiti: {
        period: "2014 — 2018",
        title: "Marketing Analyst",
        description:
          "Planned and optimized email and on-site campaigns at scale, segmenting audiences and reporting performance daily to hit business goals.",
      },
    },
  },

  contact: {
    title: "Let's build something that performs.",
    directLabel: "Direct",
    lead: "Open to frontend roles and freelance projects. Tell me what you're working on — I usually reply within a day.",
    messageLabel: "Message",
    form: {
      name: "Name",
      namePlaceholder: "Jane Doe",
      email: "Email",
      emailPlaceholder: "jane@company.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project…",
      send: "Send message",
      errorFields: "Please check the information in the form.",
      errorSend: "There was a problem, and the form could not be sent.",
      ok: "The message has been successfully sent. I will get in touch with you shortly.",
    },
  },

  footer: {
    copyright: "© 2026 Emanuel Pagés",
    builtWith: "React · TypeScript · Tailwind · Framer Motion",
    top: "Top ↑",
  },
};
// Deliberately not `as const`: the type this exports is the *shape* every
// language has to fill, so the values need to widen to `string`. Frozen
// literals here would make es.ts fail unless it repeated the English word for
// word, which is the opposite of the point.
