import type { Dict } from "./index";

/**
 * Castellano rioplatense, deliberadamente.
 *
 * El voseo aparece donde el texto se dirige a alguien ("contame"), no en todo
 * el archivo: el resto es primera persona, que es como está escrito el inglés.
 * Las cifras son las mismas que se pueden verificar bajando por la página, y
 * no hay ningún claim acá que no esté también en la versión en inglés.
 *
 * Tipado contra `Dict`, así que si falta una clave no compila.
 */
export const es: Dict = {
  meta: {
    title: "Emanuel Pagés | Desarrollador Frontend",
    description:
      "Desarrollador frontend. Diez años de growth y SEO antes de React; ahora armo interfaces en React y TypeScript.",
  },

  nav: {
    label: "Principal",
    sections: {
      approach: "Enfoque",
      work: "Trabajo",
      stack: "Stack",
      experience: "Trayectoria",
      contact: "Contacto",
    },
    backToTop: "Volver arriba",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skip: "Ir al contenido",
  },

  theme: {
    light: "Claro",
    dark: "Oscuro",
    toLight: "Cambiar a modo claro",
    toDark: "Cambiar a modo oscuro",
  },

  language: {
    code: "EN",
    switch: "View in English",
  },

  hero: {
    roleLines: ["Desarrollador", "Frontend"],
    srName: "Emanuel Pagés — ",
    lead: "Un desarrollador que piensa como un marketer: diez años de growth y SEO antes de React.",
    ctaWork: "Ver el trabajo",
    ctaContact: "Hablemos",
    available: "Disponible — remoto",
    projectsLabel: "Algunos proyectos",
  },

  approach: {
    note: "Por qué el frontend, después de diez años de growth",
    quoteLines: ["Un desarrollador", "que piensa como", "un marketer"],
    edgeLabel: "De dónde vengo",
    lead: "Antes de programar pasé diez años haciendo growth, SEO y campañas pagas. Me quedó la costumbre de mirar cómo se comporta la gente en una página, no solo cómo queda. Cuando armo una interfaz pienso en que cargue rápido, se entienda y convierta.",
    record: {
      digitalKey: "En digital",
      digitalFigure: "10 años",
      digitalNote: "Marketing, growth y SEO",
      reactKey: "En React",
      reactFigure: "3 años",
      reactNote: "TypeScript en producción",
    },
    indieLabel: "También indie hacker",
    indieBefore:
      "Además del trabajo para clientes armo cosas mías, como ",
    indieAfter: ", más {libraries} librerías open source en npm.",
  },

  work: {
    count: "{projects} proyectos · {libraries} librerías open source",
    featuredLabel: "Destacado",
    featuredCta: "Ver el proyecto",
    filterLabel: "Filtrar proyectos",
    filters: {
      All: "Todos",
      Projects: "Proyectos",
      Libraries: "Librerías",
    },
    types: {
      Project: "Proyecto",
      Library: "Librería",
    },
  },

  project: {
    metaTitle: "{title} — Emanuel Pagés",
    back: "Volver al trabajo",
    whatItIs: "Qué es",
    whyIBuiltIt: "Por qué lo hice",
    howItsBuilt: "Cómo está construido",
    whatWasHard: "Qué fue difícil",
    specs: {
      type: "Tipo",
      stack: "Stack",
      status: "Estado",
      links: "Enlaces",
    },
    repository: "Repositorio",
    live: "Ver en vivo",
    inDevelopment: "En desarrollo",
    inDevelopmentNote:
      "{title} sigue en desarrollo activo y todavía no está publicado, así que no hay capturas para mostrar. El texto de abajo explica qué es y cómo funciona.",
    nextLabel: "Siguiente proyecto",
    next: "Siguiente",
    viewAlt: "{title} — vista {n}",
    notFound: "Ese proyecto no está en el índice.",
  },

  stack: {
    /** The count is derived from src/data/Stack.ts, never typed: a number
     *  standing next to the list it counts has to be the list. */
    note: "{count} entradas · en curso: {studying}",
    groups: {
      frontend: { title: "Frontend", note: "A diario" },
      backend: { title: "Backend y datos", note: "Conocimiento funcional" },
      native: { title: "Nativo", note: "Mobile" },
      testing: { title: "Testing", note: "Cobertura" },
      cloud: { title: "Cloud y ops", note: "Entrega" },
      tools: { title: "Herramientas y automatización", note: "Todo lo demás" },
    },
    studying: "Diplomatura en Python, UTN",
  },

  record: {
    /** The count is derived from src/data/roles.ts. 2014 is the year in the
     *  last row of the ledger, so the span is checkable by scrolling to it. */
    note: "{roles} roles · 2014 — actualidad",
    roles: {
      dizizid: {
        period: "2026 — Actualidad",
        title: "Desarrollador Frontend",
        description:
          "Rehíce la plataforma para que ande en cualquier pantalla, peleándome con los casos borde de los componentes de React + Tailwind. Trabajé con diseño y producto para que la UI quedara pareja. Ahora estoy en la plataforma de ticketing: el camino que va de mirar un evento a terminar la compra.",
      },
      codemakerlab: {
        period: "2024 — Actualidad",
        title: "Desarrollador Frontend",
        description:
          "Paso diseños a código, los publico y después los mantengo. Sitios de clientes: performance, usabilidad y SEO, y presentar las soluciones yo mismo. Aparte del frontend armo automatizaciones con n8n — flujos que mueven datos entre apps y APIs, captura de leads conectada al CRM, y procesos internos que antes se hacían a mano.",
      },
      epam: {
        period: "2025",
        title: "Associate Project Administrator",
        description:
          "Me tocó la integridad de datos de una plataforma: validar flujos JSON en Retool, depurar queries de GraphQL y coordinar con equipos de Estados Unidos para que backoffice y mobile no se desincronizaran.",
      },
      justina: {
        period: "2024",
        title: "Desarrollador Frontend",
        description:
          "Un producto web funcionando de punta a punta, en el tiempo que dura un hackathon.",
      },
      nocountry: {
        period: "2023 — 2024",
        title: "Desarrollador Frontend",
        description:
          "Armé interfaces en React/Next.js a partir del diseño, integré APIs para datos dinámicos y empujé code reviews en un equipo multidisciplinario.",
      },
      duodigital: {
        period: "2022 — 2024",
        title: "Gerente de Marketing Digital",
        description:
          "Generación de leads y el stack de growth completo: email, contenido, medios pagos, SEO y Google Ads. También armaba y mantenía los sitios en WordPress detrás de las campañas.",
      },
      vital: {
        period: "2021 — 2022",
        title: "Gerente de Marketing",
        description:
          "A cargo del equipo de marketing y de la estrategia SEM/SEO: presupuestos y el embudo del e-commerce.",
      },
      dafiti: {
        period: "2014 — 2018",
        title: "Analista de Marketing",
        description:
          "Campañas de email y on-site a escala: segmentar audiencias y reportar performance todos los días.",
      },
    },
  },

  contact: {
    titleLines: ["Construyamos", "algo que", "funcione"],
    lead: "Abierto a puestos frontend y proyectos freelance. Contame en qué estás trabajando — suelo responder dentro del día.",
    form: {
      name: "Nombre",
      namePlaceholder: "Juan Pérez",
      email: "Email",
      emailPlaceholder: "juan@empresa.com",
      message: "Mensaje",
      messagePlaceholder: "Contame sobre tu proyecto…",
      send: "Enviar mensaje",
      errorFields: "Revisá los datos del formulario.",
      errorSend: "Hubo un problema y el formulario no se pudo enviar.",
      ok: "El mensaje se envió correctamente. Me pongo en contacto a la brevedad.",
    },
  },

  footer: {
    copyright: "© 2026 Emanuel Pagés",
    builtWith: "React · TypeScript · Tailwind · Framer Motion",
    top: "Arriba ↑",
  },
};
