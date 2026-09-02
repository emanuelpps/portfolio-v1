# Rediseño EP — dónde quedamos

**Última sesión:** 2026-09-02
**Rama:** `feat/redesign-ep-identity`
**Canvas de diseño:** https://claude.ai/code/artifact/66d11af8-47bc-4a34-bd1b-c32b20191990

---

## Estado en una línea

El diseño está **aprobado en canvas** (las seis secciones, en claro y oscuro).
**Las seis secciones están en código**, contra sus artboards, junto con la base
que necesitan (tipografías, paleta de dos modos, masthead) y la ficha de
proyecto. El cascarón Blueprint ya no existe y las fichas están
traducidas. El plan del rediseño está terminado.

### Bajado al código el 2026-09-01

- **Archivo + Archivo Black self-hosteadas** en `public/fonts/` (4 woff2,
  ~100 kB). Urbanist e Instrument Serif borradas.
- **Paleta de dos modos** en `src/index.css`: las seis variables sobre `:root`,
  el modo claro como override en `:root[data-theme="light"]`. `[data-invert]`
  se declara por modo, así que bajo página clara una sección invertida es la
  oscura.
- **Toggle claro/oscuro con persistencia** (`src/lib/theme.ts`,
  `src/components/ThemeToggle.tsx`) + script inline en `index.html` que aplica
  el modo antes del primer pixel, para que no haya flash.
- **Portada** (`src/sections/Hero/Hero.tsx`): el rol como titular, el nombre en
  el masthead, bloque de tinta con la marca calada, y la franja de tres
  proyectos reales cerrando el fold.
- **Masthead** (`src/components/NavBar/NavBar.tsx`): nombre + marca a la
  izquierda, índice y toggle a la derecha, regla de 3px. Los links son `#href`
  reales (`src/lib/scrollToId.ts`).
- **Se eliminaron el astil y las cruces de registro** (`Stem`, `Crosshair`) y el
  overlay de grano: pertenecían al sistema descartado, y el grano costaba un
  repintado de página completa medido en el navegador.

Se verificó en Chrome a 320 / 390 / 780 / 1036 / 1292 / 1557 px, en ambos modos.

### Bilingüe ES/EN — hecho el 2026-09-01

- **Diccionarios** en `src/i18n/en.ts` y `src/i18n/es.ts`. `en` define la forma
  y `es` está tipado como `Dict`, así que **una clave que falte no compila**.
- **Store** en `src/i18n/index.ts` (zustand) + `useT()`. La persistencia es
  localStorage plano bajo `ep-lang`, no el middleware `persist`, porque el
  script inline de `index.html` tiene que leer la misma clave.
- **El idioma se resuelve antes del primer pixel**, en el mismo script inline
  que ya resolvía el modo: elección guardada primero, si no `navigator.languages`.
  Sin elección guardada no se escribe nada, así que quien nunca eligió sigue a
  su navegador para siempre.
- **Selector** en el nav (`src/components/LangToggle.tsx`), al lado del de modo.
  Muestra el idioma **al que te lleva**, no en el que estás.
- `<html lang>`, `<title>` y la meta description siguen al idioma.
- Lo que **no** se traduce y por qué: los nombres propios (empresas, tecnologías)
  viven en `src/data/roles.ts` y `src/data/Stack.ts` fuera de los diccionarios,
  para que no puedan divergir entre idiomas.
- **El titular de la portada se escala por idioma** (`--hero-size`):
  "DESARROLLADOR" mide 9,3em contra los 6,3em de "DEVELOPER". Ver más abajo:
  el criterio con el que se eligen esos tamaños cambió el 2026-09-02.

### Work — hecho el 2026-09-02

- **Sale de `BpSection`.** La cabecera se arma como la portada: el nombre de la
  sección a escala de póster a la izquierda, el conteo a la derecha, y la regla
  de 3px debajo. Se van con ella la hairline dibujada al scrollear, el nombre
  corriendo por el astil y el `WipeText` del título.
- **El título ya no es una frase.** El artboard titula `Work` a secas, así que
  `work.title` ("Cosas que diseñé, construí y publiqué.") se borró del
  diccionario. El nombre se lee de `t.nav.sections.work` — el índice del
  masthead y el título al que aterriza tienen que decir la misma palabra.
- **El conteo sale de los datos**, no de un string: `src/sections/Projects/work.ts`
  es ahora la única fuente de la lista, los conteos y el destacado, que antes se
  calculaban por separado en cada componente.
- **El destacado es un split de 7/5**, dividido por la misma regla de 3px, en vez
  de una imagen a sangre con todo el texto debajo. El panel se alinea arriba, no
  se estira: siete columnas a 16:10 crecen con el viewport y cinco columnas de
  texto no, así que arriba de ~1400px la imagen abría 213px de hueco en el medio
  del panel. Medido: la proporción del artboard se respeta intacta hasta 1400px
  y de ahí en más el bloque deja de crecer (`lg:max-h-[28.5rem]`).
- **El índice muestra tres nombres de stack, no cuatro.** El cuarto empujaba los
  stacks largos a una segunda línea, y una celda envuelta en una fila cuyas otras
  tres están sobre una sola línea de base es lo que hace que un índice deje de
  leerse como un índice. El tipo pasó de `--ink-faint` (30%) a `--ink-dim`: se
  separan por peso, como en el artboard.
- **La cascada del índice se disparaba al montar**, muy arriba del viewport, así
  que cuando llegabas scrolleando ya había terminado. Ahora escalona desde el
  padre con `whileInView`.
- **La miniatura al cursor se conserva** (decisión tomada contra el artboard, que
  muestra el índice liso): la fila invierte y la imagen enmascarada en el bowl
  sigue al puntero.
- **Cambió el orden de la página.** `Home.tsx` y `SECTION_IDS` van ahora Hero →
  Work → Approach → Stack → Record → Contact, como el diseño aprobado. Approach
  corría segunda, o sea que se le pedía a alguien leer un párrafo sobre cómo
  construye esta persona antes de mostrarle una sola cosa construida.

Verificado en Chrome en claro y oscuro, en los dos idiomas. En esta máquina la
ventana no baja de 1536px CSS, así que 390 y 1280 se verificaron montando la
página en un iframe de ese ancho — las media queries responden al ancho del
iframe, así que el layout es real.

### La ficha de proyecto — hecho el 2026-09-02

No tiene artboard: el canvas cubre las seis secciones de la home y nada más.
Se diseñó contra el sistema, no contra una lámina.

- **Dejó de ser una superposición.** `Router.tsx` tiene rutas reales y el
  proyecto se resuelve **por id** contra `Projects.json`. Antes salía de
  `location.state`, así que `/project/11` sólo existía si habías llegado
  haciendo click: recargar, compartir el link o abrirlo en otra pestaña
  aterrizaba en "Project not found". Se fueron con el overlay la pausa de
  Lenis, el `body{overflow:hidden}`, el contenedor propio de scroll y el botón
  `GoUp` (archivo borrado).
- **`<title>` y meta description por proyecto.** La lógica salió de `App` —que
  se renderiza en todas las rutas— y vive en `src/lib/useDocumentMeta.ts`, que
  usa la ruta que está en pantalla. Sólo una ruta se renderiza a la vez, así
  que la carrera desaparece en vez de resolverse por orden.
- **El masthead ya no se esconde en la ficha.** Muestra nombre + marca y una
  única salida nombrada; el índice de secciones no va, porque apunta a anclas
  que en esta página no existen. La salida es `/#work`, y `Home` ahora atiende
  el hash al montar (el salto nativo del navegador ocurre antes de que React
  haya dibujado la sección, así que pega contra la nada).
- **No se llaman "case study".** La palabra no aparece en la interfaz y el
  namespace del diccionario es `project`. Las cuatro cabeceras se escribieron
  en lenguaje llano: **What it is / Why I built it / How it's built / What was
  hard**. Antes eran Overview / Purpose / Design approach / Challenges, que es
  vocabulario de agencia — y bajo "Design approach" había un párrafo sobre
  React Query.
- **Estructura**: portada (título en `.display` en caja mixta, bajada, regla de
  3px, franja de datos en celdas divididas por 1px con los enlaces adentro,
  regla de 3px, lámina principal a sangre) → los cuatro bloques como libro
  mayor (etiqueta en columna angosta, prosa en la ancha) → **el proyecto
  siguiente**, en una fila idéntica a las del índice de Work. Se fue "End of
  case study".
- **Las capturas se deduplican en una sola pasada**, incluyendo `image2`. Epic
  Sound Studio tiene cinco ranuras de imagen sobre tres archivos distintos.
  *La primera versión de esto pasaba un `Set` compartido a cada bloque y lo
  mutaba durante el render: bajo StrictMode la segunda pasada encontraba todo
  ya visto y filtraba las tres. Mutar durante el render es el bug, no
  StrictMode.*

**Verificado.** Primero en el navegador antes de que la extensión se
desconectara —URL directa `/project/11`, `<title>` por proyecto, la franja de
datos, el libro mayor y las tres capturas distintas, en claro— y el resto con el
arnés headless que se describe abajo: el cierre de la página (fila del siguiente
proyecto + colofón), `/project/999`, oscuro, español y 390px.

### Approach — hecho el 2026-09-02

- **Sale de `BpSection`** y toma la cabecera que ahora tienen todas las
  secciones: el nombre a escala de póster, la nota a la derecha
  (`approach.note`), regla de 3px debajo.
- **Tres bandas**: la cabecera, la frase, y un split de 7/5 con el argumento a
  la izquierda y los números a la derecha. La frase pasa a **tres líneas** y a
  versales, como el artboard; antes eran dos y en caja mixta.
- **La frase se escala por idioma** (`--claim-size` en `index.css`), igual que
  la portada. "WHO THINKS LIKE" tiene quince caracteres y "UN DESARROLLADOR"
  dieciséis — a 100px esa letra de diferencia es lo que separa una línea que
  despeja su columna de una que el navegador parte al medio. Se vio partida en
  la primera captura.
- **Los números se dicen, no se animan.** La cifra va a tamaño display y el
  calificativo debajo, en vez de estar los dos plegados en una frase a tamaño
  de cuerpo.
- **Se fue la fila "Indexado — 10 proyectos · 2 librerías".** Ese conteo ahora
  vive en la cabecera de Work; decirlo dos veces en la misma página lo hacía
  leer como un argumento en vez de como un dato. La celda que queda en su lugar
  es la de indie hacker, con el único enlace inline de la página apuntando a la
  ficha de Epic Sound Studio, y el número de librerías derivado del índice.

### Stack — hecho el 2026-09-02

- **Sale de `BpSection`** y toma la cabecera común. El título-frase
  ("Las herramientas con las que trabajo.") se borró del diccionario, igual que
  el de Work.
- **Los nombres se leen como tipografía corrida**, no como una lista con una
  hairline debajo de cada entrada. Treinta y siete filas de una palabra cada una
  son una columna de muñones; el ojo lee un grupo, y un grupo se lee más rápido
  como una frase de nombres.
- **Cada nombre es una unidad indivisible y los separadores cargan los cortes
  de línea.** Unidos en un solo string el navegador partía adentro de un nombre:
  "HTML 5" salía como "HTML" en una línea y "5" en la siguiente, que se lee como
  dos entradas. Se vio en la primera captura.
- **El conteo (37) se deriva de `src/data/Stack.ts`.** El artboard dice 42;
  el dato manda. Y lo que se está estudiando, que era un párrafo suelto debajo
  de la grilla, es una sola cláusula y va donde toda sección guarda su cláusula:
  a la derecha de la cabecera.
- **La grilla es de 3×2 con reglas de 1px.** Cada celda dibuja su borde derecho
  e inferior y la que cierra una fila devuelve el derecho — cuál es esa celda
  cambia con el breakpoint, así que la excepción se declara por breakpoint en
  vez de quedar horneada en el marcado.
- Es **la sección más apretada del sitio a propósito**: va inmediatamente
  después de Work, que es la más suelta, y el contraste entre las dos es lo que
  le da forma al scroll.

### Record — hecho el 2026-09-02

- **Sale de `BpSection`** y toma la cabecera común; el título-frase
  ("Diez años construyendo para resultados.") se borró del diccionario. La nota
  de la derecha deriva el conteo de roles de `src/data/roles.ts`; 2014 es el año
  de la última fila del libro mayor, así que el tramo se verifica scrolleando.
- **Ya era un libro mayor y no una línea de tiempo** — eso no cambió. Lo que se
  ajustó son las medidas contra el artboard: columna de años a 11,5rem (era 9),
  columna de puesto a 16rem, y el nombre de la empresa a 27px.
- **El año pasó de `--ink-faint` a `--ink-dim`.** 30% es un valor para una
  regla, no para una fecha que alguien está leyendo. Mismo arreglo que en el
  índice de Work.
- **La descripción se alinea con la columna de la empresa**, no con el margen de
  la página: la sangría es la columna de años más el gap de la grilla.
- Las filas siguen arrancando plegadas y el trabajo actual sigue abierto al
  llegar, que es la parte que cualquiera vino a mirar.

### Contact — hecho el 2026-09-02

- **Sale de `BpSection`** y además **deja de invertirse**. Voltear la sección
  entera a papel era un resto del sistema descartado; en el diseño aprobado la
  página se queda en su modo hasta el final y el único bloque de tinta maciza
  es aquel del que está calada la marca. Ese bloque aparece exactamente dos
  veces en el sitio —la portada abre con él y esto cierra con él— y eso es lo
  que hace que se lea como una firma y no como decoración.
- **La línea de disponibilidad es `hero.available`.** La portada y el cierre
  hacen el mismo claim, así que leen del mismo string en vez de dos que se
  pueden despegar.
- **Split de 5/7**: a la izquierda el titular en tres líneas, la bajada y los
  tres enlaces directos; a la derecha el formulario. Los campos ya eran
  subrayados; lo que se ajustó contra el artboard es el peso (2px), la etiqueta
  (versales tracked, en `--ink-dim` en vez de `--ink-faint` al 30%) y el botón
  de envío, que pasa a relleno.
- **El colofón se separó de la inversión.** `Footer` ya no voltea la franja ni
  abre con una hairline dibujada al scrollear: el bloque de tinta de arriba es
  el divisor, y una regla debajo de un bloque de tinta maciza es una regla que
  no ve nadie.
- **Bug encontrado mirándolo:** el botón de envío salía relleno y **sin
  etiqueta**, tinta sobre tinta. Agregarle `text-ground` a una base que ya
  declara `text-ink` no gana: Tailwind ordena las utilidades de una misma
  familia por su propio criterio, no por el orden en el atributo. Se resolvió
  con una variante `filled` en `BowlButton`, que es donde la decisión se puede
  leer.

### Componentes muertos — borrados el 2026-09-02

Con las seis secciones reescritas, el cascarón Blueprint dejó de tener quien lo
use. Se borraron `BpSection`, `Rule`, `WipeText`, `Cell`/`CellGrid`, `SpecList`
y `FormContainer`, más las carpetas del build anterior `components/Buttons/`,
`components/Titles/` y `components/Form/`. De `blueprint/` quedan las tres
piezas que siguen vivas: `EPMark`, `DrawIn` y `BowlButton`.

### La prosa de los proyectos, traducida — hecho el 2026-09-02

- **Salió de `Projects.json`.** Un JSON no tiene idioma ni tipo, así que no
  había dónde poner una traducción ni nada que atrapara una que faltara — esa
  es la razón real por la que las fichas siguieron en inglés mientras el resto
  del sitio ya era bilingüe.
- **El corte es el mismo que ya usan `roles.ts` y `Stack.ts`:** `Projects.json`
  guarda lo que no se traduce (id, nombre, tipo, stack, enlaces, imágenes) y la
  prosa vive en `src/data/projectCopy.en.ts` y `projectCopy.es.ts`, con la
  misma clave. `es` está tipado como `ProjectCopyMap`, **así que un proyecto o
  un campo que exista en inglés y falte en español no compila**.
- **Los campos se renombraron a como se llaman los bloques de la ficha**:
  `description` → `blurb`, `longDescription` → `overview`, y
  `insights.purpose/designApproach/challenges` → `why` / `build` / `hard`. Las
  imágenes de esos bloques pasaron a `plates` en el JSON, con las mismas
  claves.
- **Se fue `work.featuredDescription`.** Era el único blurb de proyecto que
  vivía en el diccionario, y existía sólo porque las fichas estaban en inglés.
  El blurb del proyecto 11 se reescribió para decir las dos cosas que antes
  estaban repartidas: qué es y que es producto propio.
- **`state={project}` se fue de todos los links a fichas.** No hacía nada desde
  que la ruta resuelve por id, y dejarlo sugería que importaba.
- Lo que **no** se tocó: `image` y `gallery` en `Projects.json`. Guardan
  capturas de Cloudinary que hoy no se muestran en ninguna parte (y una se
  repite en siete proyectos, con pinta de relleno). Borrarlas tiraría imágenes
  de las que no hay otra copia; mostrarlas es una decisión de contenido, no de
  esta tanda.

### El titular de la portada, ajustado el 2026-09-02

La primera versión hacía que las dos líneas llenaran su columna de punta a
punta, que es la regla de manual de un póster. La aritmética de esa regla acá es
brutal: llenar la misma medida con 9,3em de palabra en vez de 6,3em obliga a
componerla **31% más chica**. A 1280 la portada medía 106px en inglés y 74px en
español — cambiar de idioma cambiaba de un tercio el tamaño de la cosa más
grande de la página, y se leía como dos diseños distintos.

La regla se relaja a propósito: **el español, que es el restringido, llena su
columna, y el inglés se sostiene 10% por encima** en vez de donde lo pondría el
llenado. A 1280 quedan 78,5px y 86,3px. El inglés llena el 71% de su columna en
vez del 83%, o sea que carga más aire a la derecha — una portada con un margen
derecho ancho es mejor que una portada donde el idioma cambia la composición.

**El corte se mudó de 640 a 1024**, que es donde el layout efectivamente cambia:
debajo el titular tiene el ancho completo, arriba ocho de doce columnas. El
corte anterior no medía nada en particular, y por eso la diferencia entre
idiomas era del 16% en un teléfono y del 31% en un escritorio.

Medido: el español llena entre 94% y 97% de su columna en 320 / 390 / 1024 /
1280, y la relación entre los dos idiomas se sostiene en 1,10 en todos.

De paso se emparejó el hueco vertical del fold. El titular español, al ser más
bajo, dejaba 117px entre la bajada y los botones contra los 63px del inglés;
ahora son 107 y 95.

### El hueco de Approach, cerrado el 2026-09-02

El split de 7/5 del artboard dejaba **200px de rectángulo vacío** al pie de la
columna izquierda, con la regla vertical marcándolo al costado. La causa es
aritmética y el artboard la tiene igual: un párrafo nunca va a medir lo mismo
que tres celdas apiladas.

Se cerró en tres pasos, midiendo cada uno:

1. **La bajada al tamaño del artboard** (22px, no los 19,8 que tenía) y en una
   medida más angosta: más líneas, columna más alta. 200 → 126px.
2. **El split pasa a 6/6.** La derecha más ancha mete la frase de indie hacker
   en dos líneas en vez de tres, y la izquierda más angosta suma otra línea al
   párrafo. 126 → 99px.
3. **La izquierda centra su contenido** en `lg`. Los 99px que quedan se
   reparten arriba y abajo, donde se leen como el relleno de una columna y no
   como el final de una.

Lo que se pierde es la alineación de "LA VENTAJA" con "EN DIGITAL" en el borde
superior. Vale el cambio: el bloque se lee como una unidad compuesta.

**Y faltaba una regla.** Approach era la única sección que terminaba en nada:
Work cierra en el último divisor de su índice, Stack en la última regla de su
grilla, Record en la última fila del libro mayor — y recién ahí el aire pasa a
ser de la sección siguiente. Acá el aire no tenía a quién pertenecer, así que
los 80px de apertura de Stack se leían como un hueco al pie de Approach. La
hairline de cierre va en el contenedor de la grilla, no en las celdas, para que
se dibuje en el fondo real de la fila sea cual sea la columna más alta.

### La frase de Approach no se dibujaba — 2026-09-02

Entre la regla de 3px y "La ventaja" había **página en blanco**: la frase nunca
aparecía. Lo reportó Emanuel; ninguna captura lo había mostrado.

**La causa.** Una línea se revela sacándola de abajo de una máscara con
`overflow: hidden`, así que en su estado inicial está recortada a cero. Un
elemento con área de intersección cero **nunca es reportado visible por el
IntersectionObserver**, así que un `whileInView` colgado de esa misma línea
espera por sí mismo para siempre.

Es el mismo bug que el commit `46ccaa4` de agosto —que se comió el titular de la
portada y todas las reglas de sección— y que dejó escrita la regla: **el elemento
observado y el animado tienen que ser distintos.** Se rompió al escribir la
frase de Approach.

**El arreglo no es puntual.** Como ya pasó dos veces, el patrón vive ahora en
`src/components/blueprint/MaskedLines.tsx`: el observador está en el envoltorio
—que nunca se recorta— y las líneas de adentro sólo llevan variants, sin poder
tener disparador propio. La portada y Approach lo usan; la portada con
`trigger="mount"`, porque está sobre el fold.

### Por qué el arnés no lo agarró, y qué se hizo al respecto

**`probe.html` fuerza las animaciones a su estado final** — tiene que hacerlo,
porque bajo `--virtual-time-budget` el IntersectionObserver no dispara nunca y
sin forzar sale todo invisible. El costo es que es **ciego exactamente a esto**:
una animación que en un navegador real no arranca nunca, en una captura del
arnés se ve perfecta. Así fue como una frase que no existía en pantalla pasó dos
revisiones.

Así que ahora hay una segunda herramienta, **`docs/design/cdp.mjs`**, que maneja
el Chrome instalado por DevTools Protocol en **tiempo real**: no fuerza nada, el
IntersectionObserver funciona, se scrollea como scrollea una persona, y lo que
vuelve es lo que ve un visitante. Sin dependencias — usa el `WebSocket` nativo
de Node 22+.

    node docs/design/cdp.mjs "http://localhost:5199/"
      --lang es --theme dark --scroll "#approach" --wait 3000
      --shot out.png --eval "document.title"

**Regla de acá en adelante:** el arnés sirve para composición, medidas y anchos.
Cualquier cosa que dependa de que una animación *arranque* se verifica con
`cdp.mjs` o en un navegador de verdad. El arnés no puede desmentirte.

Y hay un barrido listo para eso, **`docs/design/sweep.js`**: scrollea la página
entera como la scrollea una persona y reporta todo lo que quedó sin revelarse
—opacidad inline por debajo de 1, un translate que sobró, un path de SVG todavía
sin dibujar—. Se corre con `--eval-file`:

    node docs/design/cdp.mjs "http://localhost:5199/" --lang es --theme dark
      --wait 500 --eval-file docs/design/sweep.js

Pasado el 2026-09-02 sobre la home y las fichas, en los dos idiomas, los dos
modos y a 390 y 1280: **nada trabado** más allá de la frase de Approach, que era
el único caso.

### El castellano, reescrito — 2026-09-02

Emanuel lo leyó y dijo lo que era: **no sonaba argentino, no sonaba a él, y
sonaba agrandado.** Tenía razón, y el problema era mío: escribí un castellano
más literario y más autocomplaciente que el inglés del que salía.

Lo que estaba mal, concretamente:

- **Se agrandaba a costa de terceros.** "La mayoría de los desarrolladores
  frontend entregan lo que dice el Figma. Yo entrego lo que funciona." En
  inglés pasa como posicionamiento; en castellano es una comparación para
  quedar mejor.
- **Calcos del inglés**: "manejar con elegancia" (handling gracefully),
  "publicando TypeScript en producción" (shipping production TypeScript).
- **Adjetivos de calidad sobre el trabajo propio**: "pulido", "de calidad
  productiva", "impactante", "confiable y no gritón".
- **Aforismos míos que él nunca dijo**: "un hook que hace de todo no lo usa
  nadie", "menos superficie donde equivocarse".

**El registro acordado**, y el criterio para cualquier texto nuevo: verbos de
hacer —armé, hice, me tocó, quería ver si—, ningún adjetivo que se elogie solo,
y ninguna comparación con otros desarrolladores. Se dice qué es la cosa y qué
costó hacerla; si es buena lo decide quien la mira.

Pasada sobre `src/i18n/es.ts` y `src/data/projectCopy.es.ts` completos.

**Ojo con esto:** el inglés **no** se tocó, así que hoy los dos idiomas
argumentan distinto — el inglés todavía se compara con otros desarrolladores y
el castellano ya no. Hay que decidir si el inglés se alinea.

### El default pasó a inglés — 2026-09-02

Antes lo decidía `navigator.languages`: un reclutador hispanohablante y uno
anglófono veían primeras pantallas distintas y ninguna de las dos estaba
elegida. Ahora abre en inglés salvo que el visitante haya elegido español, y el
switch del masthead ofrece el otro. Cambió en los dos lados que toman la
decisión: el script inline de `index.html` y `detectLang()` en `src/i18n`.

### Approach dejó de ser un split lateral — 2026-09-02

El argumento va a ancho completo y las tres celdas abajo. Era un split de
costado —7/5 primero, 6/6 después— y los dos quedaban rehenes del largo del
párrafo: un párrafo nunca mide lo que tres celdas apiladas, así que la columna
corta terminaba en un rectángulo de nada con una regla al costado. Cuando el
párrafo se reescribió más corto, por razones que no tienen nada que ver con el
layout, el hueco volvió de una.

Apilado, el texto puede tener el largo que quiera. Ese es el punto: un texto no
se escribe para llenar una caja.

### Sobre cómo se verifica ahora

La extensión de Chrome dejó de conectar a mitad de sesión. En su lugar se
maneja el Chrome instalado en modo headless (`--headless=new --screenshot`)
contra un arnés local. La fuente vive en **`docs/design/probe.html`** y se copia
a `public/__probe.html` sólo mientras se sacan capturas — todo lo que está en
`public/` se publica, así que se borra al terminar; el `.gitignore` lo cubre por
si queda olvidado.

El arnés existe por una razón concreta: bajo tiempo virtual de headless el
IntersectionObserver no dispara, así que todo lo que entra con `whileInView`
se queda en `opacity: 0` y la captura sale vacía — 56 elementos invisibles en
la primera prueba. El arnés monta el sitio en un iframe del ancho que se le
pida (que además es la única forma de ver 390px en esta máquina, donde la
ventana no baja de 1536) e **inyecta una hoja de estilo** que fuerza el estado
final. La primera versión forzaba estilos inline y perdía la carrera contra
framer-motion, que los reescribe en el frame siguiente; `!important` en una
hoja gana.

Uso:

```bash
cp docs/design/probe.html public/__probe.html

chrome --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --run-all-compositor-stages-before-draw \
  --virtual-time-budget=15000 --window-size=1280,940 --screenshot=out.png \
  "http://localhost:5199/__probe.html?w=1280&h=940&sel=%23approach&theme=dark&lang=es"

rm public/__probe.html
```

Parámetros: `w`/`h` el tamaño del iframe, `sel` un selector al que scrollear,
`dy` un desplazamiento extra, `url` para abrir otra ruta (`/project/11`),
`theme` y `lang`.

---

## La dirección elegida

Se exploraron cuatro direcciones estéticas y ganó **B — Swiss poster**, luego
repintada con la paleta del logo. De seis variantes de B se eligieron **B1
(oscuro)** y **B2 (claro)** como los dos modos del mismo diseño.

### El sistema

| | |
|---|---|
| Display | **Archivo Black**, versales, tracking `-0.045em` |
| Texto | **Archivo** 400/500/600 |
| Fondo / tinta | `#0F1621` / `#F2F3F5` — **sin acento cromático** |
| Claro | fondo `#ECEEF1`, tinta `#0F1621` |
| Reglas | 3px entre secciones, 1px dentro |
| Radio | **solo el bowl de la P** (`border-radius: 0 999px 999px 0`) — botones y filtros, nada más |
| Estado | **inversión**: tinta y fondo cambian de lugar. Sin glow, sin sombra |

Los dos modos comparten **seis variables en la raíz** (`--bg --ink --body --dim
--hair`). No son dos hojas de estilo: es una sola con la paleta cambiada, que es
lo que impide que claro y oscuro se despeguen.

### Las seis secciones

1. **Hero** — bloque de tinta a la derecha con la marca calada. Ese bloque
   aparece exactamente dos veces en todo el sitio (acá y al pie de Contact).
2. **Work** — la más alta. Un proyecto se muestra con imagen real, el resto se
   lista. Última fila invertida = el hover.
3. **Approach** — la frase se dice una vez y a tamaño. Números escritos, nunca
   animados.
4. **Stack** — la más apretada, pegada a Work. Tipografía, no grilla de logos.
5. **Record** — libro mayor, no línea de tiempo. Lo actual viene abierto.
6. **Contact** — campos con subrayado, no cajas. Cierra con la marca.

---

## Cómo retomar

### Ver o editar el diseño
Abrir el link del canvas. Cada artboard tiene un chip **Theme** (dark/light).

### Volver a generar el canvas desde estos archivos

Los fuentes viven en `docs/design/canvas/`. El helper y la plantilla se extraen
a un directorio temporal, así que **hay que correr `/design` primero** para que
vuelvan a existir; el comando imprime la ruta base.

```bash
cd docs/design/canvas
cp ../../../public/projects/epic-sound-studio/epic-landing.webp ./epic.webp

node "<base>/seed-canvas.mjs" \
  --template "<base>/payload.template.html" \
  --out portfolio-canvas.html \
  --title "Portfolio EP — Seis secciones" \
  --artboard Main.dc.html --artboard Work.dc.html --artboard Approach.dc.html \
  --artboard Stack.dc.html --artboard Record.dc.html --artboard Contact.dc.html \
  --image epic.webp --canvas canvas.json
```

Para actualizar el canvas existente en vez de crear uno nuevo, hay que publicar
pasándole la URL de arriba.

`epic.webp` no se versiona acá porque ya existe en `public/projects/` — el `cp`
de arriba lo pone en su lugar.

---

## Lo que falta

Del plan del rediseño, nada. Las seis secciones, la ficha, el masthead y el
colofón están reescritos y vistos, los componentes muertos están borrados y la
prosa de los proyectos está en los dos idiomas.

Lo que quedó anotado al pasar, para cuando haya ganas:

1. **`image` y `gallery` en `Projects.json`** guardan capturas que hoy no se
   muestran en ninguna parte. Hay que decidir si entran en las fichas o se
   borran — conviene mirarlas antes, porque una de ellas se repite en siete
   proyectos y tiene pinta de relleno.
2. **La ficha no tiene artboard.** Se diseñó contra el sistema. Si en algún
   momento se vuelve al canvas, valdría la pena dibujarla ahí también.

---

## Decisiones cerradas (no volver a abrir)

- **Sin ubicación en ningún lado.** El trabajo es remoto; dónde está el
  escritorio no es un dato del puesto.
- **Sin cifras infladas ni claims fabricados.** Los números que se muestran son
  verificables scrolleando la propia página.
- **Nada de disfraz técnico**: sin `01 /` en los títulos, sin `PRJ.04`, sin
  `Sheet 02`, sin cruces de registro en las esquinas, sin mono en mayúsculas
  con tracking ancho en cada etiqueta. Eso es lo que hacía que el sitio se
  leyera como generado.
- El logo se usa como **gramática de layout**, no como imagen pegada.

---

## Advertencia sobre la sesión anterior

Todo el código actual de la rama fue **razonado sobre el código, nunca visto en
un navegador** — la extensión de Chrome no conecta en esta máquina. El canvas de
diseño sí es visual y confiable. Cuando se baje al código, hay que mirarlo de
verdad en 320 / 768 / 1280 / 1920.
