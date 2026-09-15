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
    lead: "Pienso como un marketer y construyo como un ingeniero: diez años de growth y SEO antes de React.",
    ctaWork: "Ver el trabajo",
    ctaContact: "Hablemos",
    available: "Disponible — remoto",
    projectsLabel: "Algunos proyectos",
  },

  approach: {
    note: "Cómo llegué al frontend después de diez años de growth",
    quoteLines: ["Pienso como", "un marketer,", "construyo como", "un ingeniero"],
    edgeLabel: "De dónde vengo",
    lead: "Antes de programar pasé diez años haciendo growth, SEO y campañas pagas. Me quedó la costumbre de mirar cómo se comporta la gente en una página, no solo cómo se ve. Cuando armo una interfaz pienso en que cargue rápido, se entienda y convierta.",
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
    indieNow: "Ahora estoy desarrollando un desktop pet para Windows.",
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
      cloud: { title: "Cloud y ops", note: "Para deployar" },
      tools: { title: "Herramientas y automatización", note: "Todo lo demás" },
    },
    studying: "Tecnicatura Superior en Programación",
  },

  record: {
    /** Sin cuenta, a diferencia del resto de los encabezados. Ver la nota en
     *  `en.ts`: "8 roles" contaba filas, no roles.
     *
     *  Las ocho filas hablan en primera persona y en pasado —salvo Dizizid,
     *  la única que sigue abierta—, de punta a punta. Es la regla que
     *  mantiene el ledger sonando a una sola persona: en el momento en que una
     *  fila se escribe como "A cargo de…" vuelve a ser un CV, y un CV al lado
     *  de siete párrafos que hablan se nota de lejos. El título del puesto en
     *  EPAM queda en inglés porque es el título real, y es lo que se puede ir
     *  a verificar. */
    note: "2014 — actualidad",
    roles: {
      dizizid: {
        period: "2026 — Actualidad",
        title: "Desarrollador Frontend",
        description:
          "Rehíce la plataforma para que funcione bien en cualquier pantalla y arreglé los componentes de React y Tailwind que se rompían. Lo hice con diseño y producto, para que la interfaz se vea igual en todos lados. Ahora estoy trabajando en el ticketing: el camino que va desde mirar un evento hasta terminar la compra.",
      },
      codemakerlab: {
        period: "2024 — 2026",
        title: "Desarrollador Frontend",
        description:
          "Pasaba diseños a código y los publicaba. Después mantenía y optimizaba los sitios de los clientes: performance, usabilidad y SEO. Las soluciones se las presentaba yo. Aparte del frontend armé automatizaciones con n8n: flujos que mueven datos entre apps y APIs, captura de leads conectada al CRM, y procesos internos que antes se hacían a mano.",
      },
      epam: {
        period: "2025",
        title: "Associate Project Administrator",
        description:
          "Me encargué de la integridad de datos de una plataforma: validaba flujos JSON en Retool, depuraba queries de GraphQL y coordinaba con equipos de Estados Unidos para que el backoffice y la app mostraran los mismos datos.",
      },
      justina: {
        period: "2024",
        title: "Desarrollador Frontend",
        description:
          "Armé un producto web entero en lo que dura un hackathon.",
      },
      nocountry: {
        period: "2023 — 2024",
        title: "Desarrollador Frontend",
        description:
          "Armé interfaces en React y Next.js a partir del diseño, integré las APIs que traían los datos e hice code reviews en un equipo multidisciplinario.",
      },
      duodigital: {
        period: "2022 — 2024",
        title: "Gerente de Marketing Digital",
        description:
          "Trabajaba sobre todo en SEO, SEM y campañas pagas en social ads, y en el posicionamiento de negocios en Google Maps. Alrededor de eso iba el resto del growth: conseguir leads, email, contenido y Google Ads. Los sitios en WordPress de las campañas los armaba y los mantenía yo.",
      },
      vital: {
        period: "2021 — 2022",
        title: "Gerente de Marketing",
        description:
          "Estaba a cargo del equipo de marketing y de la estrategia de SEM y SEO: manejaba los presupuestos y el embudo del e-commerce. Trabajé el SEO de la tienda, llevaba las campañas de SEM y de social ads, y pensaba las ideas creativas de lo que salía en redes.",
      },
      dafiti: {
        period: "2014 — 2018",
        title: "Analista de Marketing",
        description:
          "Empecé analizando el e-commerce: miraba la performance y las ventas, y reordenaba los banners del sitio según lo que decían los números. De ahí pasé al email marketing: armaba las campañas, mejoré el flujo de remarketing y sumé campañas de push notifications. Cada semana y cada mes escribía los reportes que contaban cómo venía cada campaña.",
      },
    },
  },

  contact: {
    titleLines: ["Armemos algo", "que funcione", "de verdad"],
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
