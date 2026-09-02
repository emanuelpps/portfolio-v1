import type { ProjectCopyMap } from "./projectCopy";

/**
 * La prosa de los proyectos, en castellano rioplatense.
 *
 * Tipado contra `ProjectCopyMap`, así que un proyecto o un campo que exista en
 * inglés y falte acá no compila.
 *
 * No es una traducción literal: el inglés original arrastra construcciones que
 * en castellano suenan a manual ("the app's design is straightforward"), y lo
 * que importa es que diga lo mismo, no que calque la sintaxis. Los nombres
 * propios —bibliotecas, APIs, empresas— no se traducen, y no hay acá ninguna
 * afirmación que no esté también en la versión en inglés.
 */
export const projectCopyEs: ProjectCopyMap = {
  2: {
    blurb:
      "Una librería liviana de hooks de React, sin dependencias y tipada en TypeScript.",
    overview:
      "Un conjunto de hooks mínimos y reutilizables para React, escritos en TypeScript. Resuelven lógica que uno termina reescribiendo en cada proyecto —debounce, manejo de localStorage, alternar valores— para no volver a escribirla. Todos los hooks están testeados con Vitest, son tree-shakables y no arrastran ninguna dependencia.",
    why: "La hice para tener hooks listos para usar que simplifiquen tareas comunes y saquen código repetido del medio: se avanza más rápido y queda menos superficie donde equivocarse.",
    build:
      "Cada hook es simple, reutilizable y está completamente tipado. Siguen responsabilidad única y modularidad, y Vitest cubre el 100% del código.",
    hard: "El equilibrio entre flexibilidad y simplicidad fue lo difícil: un hook que hace de todo no lo usa nadie. Testear los que tocan APIs del navegador, como localStorage, también obligó a armar buenas estrategias de mocking.",
  },
  3: {
    blurb:
      "Funciones utilitarias en TypeScript —deepClone, debounce, slugify y algunas más—, livianas y sin dependencias.",
    overview:
      "Helpers Kit es una librería chica y rápida escrita en TypeScript. Incluye funciones como deepClone, debounce, getUniqueValues y slugify: las que uno vuelve a escribir en cada proyecto. Funciona igual en frontend y en backend, y no necesita ninguna librería extra.",
    why: "El objetivo era tener un conjunto simple y reutilizable de funciones en TypeScript para problemas que aparecen en cualquier proyecto, sin tener que arrastrar una dependencia entera por tres funciones.",
    build:
      "Todas las funciones están escritas en TypeScript con tipado estricto. Cada helper es independiente, fácil de leer y fácil de testear. La librería no usa dependencias externas, que es lo que la mantiene rápida y liviana.",
    hard: "Lo más difícil fue asegurarme de que funcionara igual en distintos entornos, navegador y Node.js. Y escribir helpers que sean a la vez genéricos y seguros en tipos llevó bastante trabajo con los tipos avanzados de TypeScript.",
  },
  11: {
    blurb:
      "Una app de streaming de música sobre la red abierta Audius. Producto propio: reproductor con forma de onda, charts de tendencias, páginas de artista y playlist.",
    overview:
      "Epic Sound Studio es una app web completa de streaming construida sobre la red descentralizada Audius. Combina una portada cinematográfica con un home de streaming —tracks en tendencia y un chart underground—, páginas de artista y de playlist, búsqueda, y un reproductor propio con visualización de forma de onda hecha con wavesurfer.js.\nEstá construida con Next.js (App Router) y TypeScript. Usa TanStack React Query para pedir y cachear datos de la API de Audius, Zustand para el estado global del reproductor y Framer Motion para las transiciones. La identidad se apoya en un violeta neón fuerte y en fuentes variables propias (Clash Display + Supreme).",
    why: "Quería construir una experiencia de streaming de calidad productiva sobre una red abierta y centrada en el artista — demostrando que una interfaz de música moderna y pulida puede funcionar enteramente sobre la API descentralizada de Audius, sin un backend propio.",
    build:
      "Identidad violeta neón con contraste tipográfico fuerte y movimiento envolvente. La app está organizada por feature (portada, home, reproductor, playlist, artista, búsqueda), con un componente de reproductor y forma de onda reutilizable, los datos del servidor cacheados con React Query y el estado de reproducción en Zustand.",
    hard: "Trabajar contra una API descentralizada de terceros implicó manejar con elegancia datos inconsistentes, estados de carga y límites de request, y mantener la reproducción global sincronizada entre páginas. Integrar wavesurfer.js al reproductor sin que las interacciones se pusieran pesadas ni el bundle creciera de más llevó un manejo de estado cuidadoso.",
  },
  13: {
    blurb:
      "Sitio para una consultora de RRHH del Alto Valle, con dos embudos de captación separados: uno para empresas que buscan cubrir una vacante y otro para candidatos.",
    overview:
      "Eckers RRHH Solutions es el sitio de una consultora de selección y recursos humanos con base en General Roca, Río Negro. La portada recorre los servicios, el proceso de búsqueda y la historia regional de la firma, y después separa a quien llega en dos caminos: uno para empresas que necesitan cubrir una vacante y otro para profesionales que buscan su próximo puesto.\nEstá construido con Next.js (App Router) y TypeScript, con Tailwind CSS. Cada camino tiene su propia página de captación: las empresas describen el puesto, la ubicación y la urgencia de la búsqueda; los candidatos cargan su perfil, nivel de experiencia, pretensión salarial, modalidad de contratación preferida y su CV. Las secciones aparecen al scrollear, y un botón flotante de WhatsApp deja el canal más rápido a un toque en cualquier página.",
    why: "La consultora necesitaba una presencia que hiciera algo más que describir el servicio: tenía que calificar a quien escribe. La idea era convertir dos públicos muy distintos —empresas que contratan y personas que buscan trabajo— en dos caminos claros, cada uno pidiendo exactamente la información que el equipo necesita para arrancar una búsqueda.",
    build:
      "Una identidad corporativa serena sobre azul marino y cian, con aire generoso y tipografía display de peso, para que el sitio se lea confiable y no gritón. La portada está armada como un embudo —propuesta de valor, separación de públicos, servicios, proceso, historia, contacto— y las dos páginas de captación reutilizan los mismos bloques de formulario con sus propios campos. Todo responsive-first con Tailwind, y el contenido aparece al scrollear para que una página larga no se sienta pesada.",
    hard: "Lo difícil no fue lo visual sino los formularios: pedirle al candidato el detalle suficiente para que sirva de verdad sin convertir la página en un trámite, manejar la carga del CV con límites de formato y tamaño, y mantener el formulario de empresas enfocado en lo que realmente define una búsqueda: puesto, ubicación y urgencia. La confidencialidad es una preocupación real en un mercado regional chico, así que también moldeó los textos y la forma de pedir datos personales.",
  },
  4: {
    blurb:
      "Sitio para una cafetería, enfocado en una interfaz limpia y en contar la marca con imágenes. Hecho con React y Firebase.",
    overview:
      "Diseñé y desarrollé el sitio de una marca de café con un enfoque mínimo y elegante. La idea era transmitir calidez y calidad a través de imágenes en alta resolución y una interfaz sin ruido.\nEstá construido con React y Tailwindcss, e integra Firebase para la gestión de contenido y la autenticación. Las animaciones son de Framer Motion. La paleta natural se apoya en los tonos tierra del café recién tostado, que es de donde sale la sensación artesanal.",
    why: "El proyecto le dio identidad digital a una marca de café de barrio, combinando tecnologías web modernas con un diseño narrativo para conectar con el cliente por el lado sensorial.",
    build:
      "El diseño se apoya en el minimalismo, los colores tierra y las imágenes grandes. Usé Tailwindcss para el estilado utility-first y Framer Motion para sumar interactividad sin abrumar.",
    hard: "El equilibrio entre performance e imágenes de alta calidad fue el desafío principal: hubo que optimizar los assets con cuidado para mantener la carga rápida sin perder la sensación premium. Integrar las animaciones con las transiciones de ruta también necesitó ajuste fino entre Framer Motion y React Router.",
  },
  5: {
    blurb:
      "Rediseño y desarrollo del sitio de una agencia de software, con tecnologías modernas y animación.",
    overview:
      "Estuve a cargo del rediseño y desarrollo completos del sitio de The CodeMaker Lab, una agencia de desarrollo de software. El sitio original tenía un aspecto desactualizado, así que propuse una renovación visual entera enfocada en una experiencia moderna y profesional. Está construido con Next.js y TypeScript, estilado con Tailwindcss, con Zustand para el estado global y Framer Motion para las animaciones. El diseño nuevo se apoya en tipografía de peso, una paleta vibrante y una navegación directa.",
    why: "El proyecto redefinió la presencia digital de The CodeMaker Lab con un sitio moderno, profesional y orientado a la conversión. El objetivo era construir credibilidad y comunicar con claridad los servicios y la experiencia de la agencia.",
    build:
      "El diseño se organizó alrededor de una jerarquía visual fuerte, titulares contundentes y contraste de color para marcar las secciones clave. La interfaz se estructuró pensando en responsive desde el principio, y las animaciones se integraron para enriquecer la interacción sin castigar la performance.",
    hard: "El mayor desafío fue equilibrar animaciones expresivas con performance y usabilidad. También hubo que manejar con cuidado el estado compartido entre componentes, donde Zustand resultó liviano y efectivo. Sostener la accesibilidad mientras se empujaba un estilo visual audaz planteó decisiones de diseño que hubo que resolver una por una.",
  },
  6: {
    blurb:
      "Sitio personal de un actor: biografía, obras y galería de fotos de escena.",
    overview:
      "Este portfolio lo desarrollé para un actor de teatro, como parte de un proyecto en The CodeMaker Lab. El sitio incluye su biografía, las obras en las que trabajó y una galería de fotos de escena. Está construido con Next.js y TypeScript, y maquetado con Tailwindcss. La estructura visual es mínima pero contundente: tipografía grande y elegante sobre una paleta monocroma, para transmitir presencia profesional y artística. El objetivo es que la carrera del actor se lea clara, en una presentación cuidada y personal.",
    why: "El proyecto buscaba un portfolio digital que mostrara la carrera y la identidad artística del actor, presentando el contenido en un formato atractivo y fácil de recorrer.",
    build:
      "El diseño se apoya en tipografía de peso y una maqueta limpia para que el trabajo del actor sea lo que se ve. La paleta monocroma y las imágenes grandes construyen un aspecto refinado, y Tailwindcss permitió armar componentes responsive rápido.",
    hard: "Un desafío fue que el sitio se viera cuidado en cualquier dispositivo, sobre todo por el peso que tienen las imágenes grandes en la composición. El otro fue optimizar la performance sin bajar la calidad visual, que era justamente el punto del sitio.",
  },
  7: {
    blurb:
      "Mi portfolio anterior, de 2024. Lo rediseño cada año para que refleje dónde estoy parado.",
    overview:
      "Este fue mi portfolio personal de 2024. Todos los años desarrollo uno nuevo, con estética y estructura renovadas, como ejercicio de mejora continua. Esta versión está construida con Next.js, TailwindCSS y TypeScript, enfocada en la simplicidad, la legibilidad y una presentación clara de los proyectos y la experiencia.",
    why: "Lo desarrollé para mantener un portfolio al día que refleje mi progreso, y también como excusa para experimentar con tecnologías y enfoques de diseño nuevos.",
    build:
      "La idea detrás del diseño era sostener una estética limpia y profesional, con foco en la legibilidad y en que los proyectos se vean claros. Usé TailwindCSS para un diseño responsive y ágil, y Framer Motion para la interactividad.",
    hard: "El desafío más grande fue equilibrar la simplicidad del diseño con la interactividad, cuidando que las animaciones no distrajeran del contenido. Y como es una versión anual, tuve que no sobrecargarlo de novedades visuales: mantener alguna continuidad con las versiones anteriores.",
  },
  8: {
    blurb: "App de clima simple hecha en ReactJS, con datos en tiempo real.",
    overview:
      "Una aplicación web para consultar el clima actual de cualquier ciudad usando la API de OpenWeatherMap. La desarrollé como ejercicio de consumo de APIs con ReactJS: la interfaz es simple y responsive, y muestra temperatura, condiciones y algunos datos más.",
    why: "El objetivo era una app funcional para consultar el clima de cualquier ciudad del mundo con datos en tiempo real de OpenWeatherMap, y de paso practicar consumo de APIs con ReactJS.",
    build:
      "El diseño es directo y está enfocado en que la información se lea. Está construido con Bootstrap para que funcione bien tanto en mobile como en escritorio.",
    hard: "El desafío fue que funcionara bien en dispositivos distintos, sobre todo al mostrar imágenes grandes y datos en tiempo real, y optimizar la performance sin bajar la calidad visual.",
  },
  9: {
    blurb:
      "App web simple para una pizzería ficticia: se eligen las pizzas y se hace el pedido online.",
    overview:
      "Don Remolo Pizza es una app chica de pedidos hecha para una pizzería artesanal ficticia. La usé para practicar diseño responsive, componentes reutilizables, base de datos en tiempo real y animación. El menú y los datos de las pizzas viven en Firebase, y los pedidos se envían con un formulario conectado a la misma base.",
    why: "Lo construí para aprender a armar una experiencia de pedidos online de punta a punta. Usa una base de datos de Firebase para los productos y para los pedidos de los clientes.",
    build:
      "El diseño es limpio y moderno, enfocado en la experiencia de uso. Framer Motion se encarga de las animaciones y Bootstrap del layout responsive. La estética busca la sensación de una pizzería de barrio, hecha a mano.",
    hard: "Un desafío fue mantener las animaciones fluidas sin volver el sitio lento, sobre todo en teléfonos. El otro fue que Firebase funcionara bien para las dos cosas a la vez: mostrar los datos de las pizzas y guardar los pedidos, en tiempo real.",
  },
};
