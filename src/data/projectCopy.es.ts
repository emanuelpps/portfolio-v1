import type { ProjectCopyMap } from "./projectCopy";

/**
 * La prosa de los proyectos, en castellano rioplatense.
 *
 * Tipado contra `ProjectCopyMap`, así que un proyecto o un campo que exista en
 * inglés y falte acá no compila.
 *
 * **No es una traducción literal, y hay una razón.** La primera versión sí lo
 * era, y sonaba a otra persona: calcos del inglés ("manejar con elegancia",
 * "publicando TypeScript en producción"), adjetivos de calidad sobre el
 * trabajo propio ("pulido", "de calidad productiva", "impactante") y frases
 * que se agrandaban a costa de terceros. En inglés eso pasa como
 * posicionamiento; en castellano suena a chamuyo.
 *
 * El registro de acá es el que quedó acordado: verbos de hacer —armé, hice, me
 * tocó, quería ver si—, ningún adjetivo que se elogie solo, y ninguna
 * comparación con otros desarrolladores. Lo que hay que decir es qué es la
 * cosa y qué costó hacerla; si es bueno lo decide quien lo mira.
 *
 * Los nombres propios —bibliotecas, APIs, empresas— no se traducen, y no hay
 * acá ninguna afirmación que no esté también en la versión en inglés.
 */
export const projectCopyEs: ProjectCopyMap = {
  2: {
    blurb:
      "Una librería de hooks de React en TypeScript, sin dependencias.",
    overview:
      "Un conjunto de hooks para React escritos en TypeScript. Resuelven cosas que uno reescribe en cada proyecto: debounce, manejo de localStorage, alternar valores. Están testeados con Vitest, son tree-shakables y no traen dependencias.",
    why: "La armé para dejar de copiar y pegar los mismos hooks de un proyecto a otro.",
    build:
      "Cada hook es independiente y está tipado. Vitest cubre el 100% del código.",
    hard: "Encontrar el punto entre que sea flexible y que sea simple. Y testear los que tocan APIs del navegador, como localStorage, que necesitan mocks.",
  },
  3: {
    blurb:
      "Funciones utilitarias en TypeScript —deepClone, debounce, slugify— sin dependencias.",
    overview:
      "Helpers Kit es una librería chica escrita en TypeScript. Trae funciones como deepClone, debounce, getUniqueValues y slugify. Anda igual en frontend y en backend, y no necesita nada más.",
    why: "Lo mismo que con los hooks: tener a mano las funciones que termino escribiendo en todos los proyectos, sin sumar una dependencia entera por tres funciones.",
    build:
      "Todo tipado, cada helper independiente y fácil de testear. Sin dependencias externas.",
    hard: "Que funcionara igual en el navegador y en Node. Y que los helpers fueran genéricos sin perder el tipado, que me llevó bastante rato con los tipos avanzados de TypeScript.",
  },
  11: {
    blurb:
      "Una app de streaming de música sobre la red abierta Audius. Proyecto propio: reproductor con forma de onda, charts de tendencias, páginas de artista y playlist.",
    overview:
      "Epic Sound Studio es una app de streaming construida sobre Audius, una red de música descentralizada y abierta. Tiene portada, un home con los tracks en tendencia y un chart underground, páginas de artista y de playlist, búsqueda, y un reproductor propio con forma de onda hecho con wavesurfer.js.\nEstá hecha con Next.js (App Router) y TypeScript. Los datos de la API de Audius pasan por TanStack React Query, el estado del reproductor vive en Zustand y las transiciones son de Framer Motion. La identidad va por un violeta neón, con Clash Display y Supreme.",
    why: "Quería ver si podía armar una app de música completa sobre una API abierta, sin backend propio. Audius es descentralizada y pública, así que era buena excusa.",
    build:
      "Está organizada por feature —portada, home, reproductor, playlist, artista, búsqueda— con el reproductor y la forma de onda como componentes reutilizables. Los datos del servidor los cachea React Query; el estado de reproducción lo guarda Zustand.",
    hard: "La API es de terceros y descentralizada, así que hay datos incompletos, estados de carga y límites de request para todos los gustos. Y mantener la reproducción sincronizada entre páginas. Meter wavesurfer.js en el reproductor sin que se pusiera pesado también llevó su tiempo.",
  },
  13: {
    blurb:
      "Sitio para una consultora de RRHH del Alto Valle, con dos embudos de captación separados: uno para empresas que buscan cubrir una vacante y otro para candidatos.",
    overview:
      "Eckers RRHH Solutions es el sitio de una consultora de selección con base en General Roca, Río Negro. La portada recorre los servicios, el proceso de búsqueda y la historia de la firma, y después separa a quien llega en dos caminos: empresas que necesitan cubrir una vacante, y gente que está buscando trabajo.\nEstá hecho con Next.js (App Router), TypeScript y Tailwind. Cada camino tiene su propia página: las empresas describen el puesto, la ubicación y la urgencia; los candidatos cargan su perfil, la experiencia, la pretensión salarial, la modalidad y el CV. Hay un botón flotante de WhatsApp en todas las páginas, que es por donde más escriben.",
    why: "El sitio tenía que hacer algo más que contar el servicio: tenía que ordenar a quien escribe. Son dos públicos muy distintos y a cada uno hay que pedirle cosas distintas para que el equipo pueda arrancar una búsqueda.",
    build:
      "Azul marino y cian, bastante aire y tipografía grande. La portada está armada como un embudo: propuesta, separación de públicos, servicios, proceso, historia, contacto. Las dos páginas de captación reutilizan los mismos bloques de formulario con sus propios campos.",
    hard: "Los formularios, no lo visual. Pedirle al candidato lo suficiente para que sirva sin que parezca un trámite, manejar la carga del CV con límites de formato y tamaño, y dejar el de empresas en lo que define una búsqueda: puesto, ubicación y urgencia. En un mercado regional chico la confidencialidad importa, así que también cambió la forma de pedir los datos.",
  },
  4: {
    blurb:
      "Sitio para una cafetería, con el peso puesto en las fotos y una interfaz sin ruido. React y Firebase.",
    overview:
      "Diseñé y desarrollé el sitio de una marca de café. La idea era que la calidez y la calidad se vieran en las fotos, no que estuvieran escritas.\nEstá hecho con React y Tailwindcss, y usa Firebase para el contenido y la autenticación. Las animaciones son de Framer Motion. La paleta va por los tonos tierra del café recién tostado.",
    why: "La marca no tenía nada online. El sitio es lo primero que existe de ellos en internet.",
    build:
      "Pocos elementos, colores tierra e imágenes grandes. Tailwindcss para el estilado y Framer Motion para el movimiento, sin pasarme.",
    hard: "Las fotos pesaban. Hubo que optimizarlas bastante para que el sitio cargara rápido sin que se notara la diferencia. Y ajustar las animaciones para que no chocaran con las transiciones de ruta.",
  },
  5: {
    blurb:
      "Rediseño y desarrollo del sitio de una agencia de software.",
    overview:
      "Me tocó el rediseño y el desarrollo completos del sitio de The CodeMaker Lab. El que tenían estaba desactualizado, así que propuse rehacerlo entero. Next.js y TypeScript, Tailwindcss para el estilado, Zustand para el estado global y Framer Motion para el movimiento. El diseño nuevo va por tipografía grande, colores fuertes y navegación directa.",
    why: "El sitio que tenían no mostraba lo que la agencia hace. Necesitaban algo que explicara los servicios sin que hubiera que preguntar.",
    build:
      "Jerarquía visual fuerte, titulares grandes y contraste de color para marcar las secciones. Responsive desde el principio, y las animaciones puestas donde no costaban performance.",
    hard: "Que las animaciones no se comieran la performance. El estado compartido entre componentes también dio trabajo, y ahí Zustand resolvió bien. Y sostener la accesibilidad con un estilo tan cargado, que obligó a decidir cosas una por una.",
  },
  6: {
    blurb:
      "Sitio de un actor de teatro: biografía, obras y fotos de escena.",
    overview:
      "Lo desarrollé para un actor de teatro, en The CodeMaker Lab. Tiene la biografía, las obras en las que trabajó y una galería de fotos de escena. Next.js y TypeScript, maquetado con Tailwindcss. Poca cosa en pantalla: tipografía grande, paleta monocroma y las fotos ocupando lugar.",
    why: "El actor no tenía dónde mandar su trabajo cuando se lo pedían. El sitio es eso: un lugar al que mandar a alguien.",
    build:
      "Tipografía grande y maqueta limpia, para que lo que se vea sea el trabajo del actor. Monocromo y fotos grandes. Tailwindcss para armar los componentes rápido.",
    hard: "Que se viera bien en cualquier pantalla, teniendo las fotos el peso que tienen en la composición. Y que cargaran rápido sin bajarles la calidad, que era justamente el punto.",
  },
  7: {
    blurb:
      "Mi portfolio anterior, de 2024. Hago uno nuevo cada año.",
    overview:
      "Este fue mi portfolio de 2024. Todos los años hago uno nuevo, con otra estética y otra estructura; es la forma que encontré de obligarme a revisar en qué estoy. Esta versión es Next.js, TailwindCSS y TypeScript, con el foco puesto en que se lea fácil y en que los proyectos se vean.",
    why: "Para tener el portfolio al día, y como excusa para probar cosas nuevas sin un cliente esperando del otro lado.",
    build:
      "Estética limpia y foco en la legibilidad. TailwindCSS para el responsive y Framer Motion para el movimiento.",
    hard: "Que las animaciones no taparan el contenido. Y como es una versión anual, no sobrecargarlo de novedades: que se notara la continuidad con las anteriores.",
  },
  8: {
    blurb: "App de clima hecha en ReactJS, con datos en tiempo real.",
    overview:
      "Una app para ver el clima de cualquier ciudad usando la API de OpenWeatherMap. La hice como ejercicio de consumo de APIs con ReactJS. La interfaz es simple y responsive: temperatura, condiciones y algunos datos más.",
    why: "Practicar consumo de APIs con React. Es un ejercicio y no pretende ser otra cosa.",
    build:
      "Directo, con la información como lo único importante en pantalla. Bootstrap para que ande en mobile y en escritorio.",
    hard: "Nada demasiado difícil. Lo que más trabajo dio fueron los estados de carga y de error, que son los que hacen que una app así no parezca rota cuando la API tarda.",
  },
  9: {
    blurb:
      "App web para una pizzería ficticia: se eligen las pizzas y se hace el pedido.",
    overview:
      "Don Remolo Pizza es una app chica de pedidos para una pizzería inventada. La usé para practicar diseño responsive, componentes reutilizables, base de datos en tiempo real y animación. El menú y los datos de las pizzas están en Firebase, y los pedidos se mandan con un formulario a la misma base.",
    why: "Quería armar un flujo de pedido completo, de elegir a confirmar, con una base de datos real atrás.",
    build:
      "Limpio y directo. Framer Motion para las animaciones y Bootstrap para el layout. La estética busca una pizzería de barrio.",
    hard: "Que las animaciones no pusieran lento el sitio en teléfonos. Y que Firebase sirviera para las dos cosas a la vez: mostrar las pizzas y guardar los pedidos.",
  },
};
