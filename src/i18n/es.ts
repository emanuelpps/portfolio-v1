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
      "Desarrollador frontend que piensa como un marketer: diez años de growth y SEO antes de React, ahora construyendo interfaces rápidas y responsive en React y TypeScript.",
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
    ctaWork: "Trabajos seleccionados",
    ctaContact: "Hablemos",
    available: "Disponible — remoto",
    projectsLabel: "Proyectos destacados",
  },

  approach: {
    quoteLines: ["Un desarrollador que", "piensa como un marketer."],
    lead: "La mayoría de los desarrolladores frontend entregan lo que dice el Figma. Yo entrego lo que funciona. Diez años haciendo growth, SEO y campañas pagas me enseñaron cómo se comporta realmente la gente en una página — así que las interfaces que construyo están pensadas para claridad, velocidad y conversión, no solo para fidelidad al pixel.",
    indieLabel: "También indie hacker",
    indieBefore:
      "Además del trabajo para clientes, diseño y publico mis propios productos — como ",
    indieAfter:
      ", una app de streaming de música construida sobre la red abierta Audius. Mismo stack, sin brief, cada decisión mía.",
    recordLabel: "Los números",
    record: {
      digitalKey: "En digital",
      digitalValue: "10 años — marketing, growth y SEO",
      reactKey: "En React",
      reactValue: "3 años publicando TypeScript en producción",
      indexedKey: "Indexado",
      indexedValue: "{projects} proyectos · {libraries} librerías open-source",
    },
  },

  work: {
    count: "{projects} proyectos · {libraries} librerías open source",
    featuredLabel: "Destacado",
    featuredDescription:
      "Una app de streaming de música construida sobre la red abierta Audius. Producto propio — mismo stack que el trabajo para clientes, sin brief, cada decisión mía.",
    featuredCta: "Ver el caso",
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

  stack: {
    title: "Las herramientas con las que trabajo.",
    groups: {
      frontend: { title: "Frontend", note: "A diario" },
      backend: { title: "Backend y datos", note: "Conocimiento funcional" },
      native: { title: "Nativo", note: "Mobile" },
      testing: { title: "Testing", note: "Cobertura" },
      cloud: { title: "Cloud y ops", note: "Entrega" },
      tools: { title: "Herramientas y automatización", note: "Todo lo demás" },
    },
    inProgress: "En curso — ",
    studying: "Diplomatura en Python — UTN",
  },

  record: {
    title: "Diez años construyendo para resultados.",
    roles: {
      dizizid: {
        period: "2026 — Actualidad",
        title: "Desarrollador Frontend",
        description:
          "Rehíce la plataforma para que fuera completamente responsive, endureciendo los componentes de React + Tailwind contra casos borde y breakpoints. Trabajé con diseño y producto para entregar una UI más consistente y escalable. Ahora estoy sobre la plataforma de ticketing en sí — afinando el camino que va de mirar un evento a completar la compra, y manteniendo cada paso confiable en cualquier pantalla.",
      },
      codemakerlab: {
        period: "2024 — Actualidad",
        title: "Desarrollador Frontend",
        description:
          "Convierto diseños en interfaces listas para producción, las publico y las mantengo rápidas. Mantengo y optimizo sitios de clientes en performance, usabilidad y SEO — y presento las soluciones directamente a los clientes. Más allá del frontend, armo automatizaciones con n8n: flujos que mueven datos entre apps y APIs, captura de leads conectada al CRM, y procesos internos que antes se hacían a mano.",
      },
      epam: {
        period: "2025",
        title: "Associate Project Administrator",
        description:
          "Me hice cargo de la integridad de datos de una plataforma cliente: validé flujos JSON en Retool, depuré queries de GraphQL y coordiné con equipos de Estados Unidos para mantener sincronizados los datos de backoffice y mobile.",
      },
      justina: {
        period: "2024",
        title: "Desarrollador Frontend",
        description:
          "Entregué un producto web funcionando de punta a punta bajo la presión de tiempo de un hackathon.",
      },
      nocountry: {
        period: "2023 — 2024",
        title: "Desarrollador Frontend",
        description:
          "Construí interfaces en React/Next.js a partir del diseño, integré APIs para datos dinámicos e impulsé code reviews y buenas prácticas en un equipo multidisciplinario.",
      },
      duodigital: {
        period: "2022 — 2024",
        title: "Gerente de Marketing Digital",
        description:
          "Generé leads y manejé todo el stack de growth — email, contenido, medios pagos, SEO y Google Ads — mientras construía y administraba los sitios en WordPress detrás de las campañas.",
      },
      vital: {
        period: "2021 — 2022",
        title: "Gerente de Marketing",
        description:
          "Lideré el equipo de marketing y la estrategia SEM/SEO, gestioné presupuestos y optimicé el embudo del e-commerce para generar nuevos leads.",
      },
      dafiti: {
        period: "2014 — 2018",
        title: "Analista de Marketing",
        description:
          "Planifiqué y optimicé campañas de email y on-site a escala, segmentando audiencias y reportando performance a diario para cumplir los objetivos del negocio.",
      },
    },
  },

  contact: {
    title: "Construyamos algo que funcione.",
    directLabel: "Directo",
    lead: "Abierto a puestos frontend y proyectos freelance. Contame en qué estás trabajando — suelo responder dentro del día.",
    messageLabel: "Mensaje",
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
