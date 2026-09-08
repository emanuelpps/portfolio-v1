import type { Dict } from "./index";

/**
 * Castellano rioplatense, deliberadamente.
 *
 * El voseo aparece donde el texto se dirige a alguien ("contame"), no en todo
 * el archivo: el resto es primera persona, que es como está escrito el inglés.
 * Las cifras son las mismas de la versión en inglés y salen del mismo lado:
 * el índice de abajo y la regla escrita en `work.ts`. No hay ningún claim acá
 * que no esté también en inglés, ni ninguno que no se pueda ir a chequear.
 *
 * El registro es el mismo que está escrito arriba de `projectCopy.es.ts`:
 * verbos de hacer, ningún adjetivo que se elogie solo, y nada de calcos del
 * inglés. Vale para todo el archivo. Lo que se coló la primera vez fue el
 * ledger de abajo, que llegó como una traducción de los bullets del CV inglés
 * —"empujé code reviews", "campañas a escala", "generación de leads"— y sonaba
 * a otra persona porque lo era: la mitad de las filas hablaban y la otra mitad
 * eran frases nominales de currículum.
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
    count:
      "{shown} de {built} proyectos · {libraries} librerías open source",
    countNoteBefore: "Estos son los que mostraría primero; el resto está en ",
    countNoteLink: "GitHub",
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
      backend: { title: "Backend y datos", note: "Me manejo" },
      native: { title: "Nativo", note: "Mobile" },
      testing: { title: "Testing", note: "Cobertura" },
      cloud: { title: "Cloud y ops", note: "Para publicar" },
      tools: { title: "Herramientas y automatización", note: "Todo lo demás" },
    },
    studying: "Diplomatura en Python, UTN",
  },

  record: {
    /** The count is derived from src/data/roles.ts. 2014 is the year in the
     *  last row of the ledger, so the span is checkable by scrolling to it.
     *
     *  Las ocho filas hablan en primera persona y en pasado —o en presente,
     *  las dos que siguen abiertas—, de punta a punta. Es la regla que
     *  mantiene el ledger sonando a una sola persona: en el momento en que una
     *  fila se escribe como "A cargo de…" vuelve a ser un CV, y un CV al lado
     *  de siete párrafos que hablan se nota de lejos. El título del puesto en
     *  EPAM queda en inglés porque es el título real, y es lo que se puede ir
     *  a verificar. */
    note: "{roles} roles · 2014 — actualidad",
    roles: {
      dizizid: {
        period: "2026 — Actualidad",
        title: "Desarrollador Frontend",
        description:
          "Rehíce la plataforma para que funcione en cualquier pantalla y corregí los componentes de React y Tailwind donde se rompían. Lo trabajé junto a diseño y producto, para que la interfaz fuera la misma en todos lados. Ahora estoy en el ticketing: el camino que va de mirar un evento a terminar la compra.",
      },
      codemakerlab: {
        period: "2024 — Actualidad",
        title: "Desarrollador Frontend",
        description:
          "Paso diseños a código, los publico y después los mantengo. A los sitios de clientes los cuido de performance, usabilidad y SEO, y las soluciones se las presento yo. Aparte del frontend armo automatizaciones con n8n: flujos que mueven datos entre apps y APIs, captura de leads conectada al CRM, y procesos internos que antes se hacían a mano.",
      },
      epam: {
        period: "2025",
        title: "Associate Project Administrator",
        description:
          "Me ocupé de la integridad de datos de una plataforma: validaba flujos JSON en Retool, depuraba queries de GraphQL y coordinaba con equipos de Estados Unidos para que el backoffice y la app mostraran lo mismo.",
      },
      justina: {
        period: "2024",
        title: "Desarrollador Frontend",
        description:
          "Armé un producto web completo, de punta a punta, en lo que dura un hackathon.",
      },
      nocountry: {
        period: "2023 — 2024",
        title: "Desarrollador Frontend",
        description:
          "Armé interfaces en React y Next.js a partir del diseño, integré las APIs que traían los datos e impulsé los code reviews en un equipo multidisciplinario.",
      },
      duodigital: {
        period: "2022 — 2024",
        title: "Gerente de Marketing Digital",
        description:
          "Traía los leads y manejaba todo el growth: email, contenido, medios pagos, SEO y Google Ads. Los sitios en WordPress que estaban detrás de las campañas también los armaba y los mantenía yo.",
      },
      vital: {
        period: "2021 — 2022",
        title: "Gerente de Marketing",
        description:
          "Llevaba el equipo de marketing y la estrategia de SEM y SEO: manejaba los presupuestos y el embudo del e-commerce.",
      },
      dafiti: {
        period: "2014 — 2018",
        title: "Analista de Marketing",
        description:
          "Hacía campañas de email y de on-site para una base grande: segmentaba audiencias y reportaba la performance todos los días.",
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
      errorSend: "Algo falló y el mensaje no se envió.",
      ok: "El mensaje se envió. Te respondo apenas lo lea.",
    },
  },

  footer: {
    copyright: "© 2026 Emanuel Pagés",
    builtWith: "React · TypeScript · Tailwind · Framer Motion",
    top: "Arriba ↑",
  },
};
