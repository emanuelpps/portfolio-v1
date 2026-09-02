# Rediseño EP — dónde quedamos

**Última sesión:** 2026-09-02
**Rama:** `feat/redesign-ep-identity`
**Canvas de diseño:** https://claude.ai/code/artifact/66d11af8-47bc-4a34-bd1b-c32b20191990

---

## Estado en una línea

El diseño está **aprobado en canvas** (las seis secciones, en claro y oscuro).
**La portada, Work, Approach y Stack ya están en código**, junto con la base que
necesitan (tipografías, paleta de dos modos, masthead) y la ficha de proyecto.
Las otras dos —Record y Contact— heredan la tipografía y la paleta
nuevas, pero **todavía no se reescribieron contra sus artboards**.

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
  "DESARROLLADOR" mide 9,3em contra los 6,3em de "DEVELOPER". El español necesita
  dos tramos donde el inglés necesita uno — no por el idioma sino por el layout:
  debajo de 1024px el titular tiene el ancho completo y arriba solo 8 de 12
  columnas. Medido, la línea más larga despeja su columna entre 7% y 13% en
  ambos idiomas.

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

**Verificado en el navegador** (antes de que la extensión se desconectara): URL
directa `/project/11`, `<title>` por proyecto, la franja de datos, el libro
mayor y las tres capturas distintas, en modo claro. **Sin verificar todavía**:
el cierre de la página (fila del siguiente proyecto + footer), el estado de id
inexistente, el modo oscuro, el español y los anchos de móvil.

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

### Sobre cómo se verifica ahora

La extensión de Chrome dejó de conectar a mitad de sesión. En su lugar se
maneja el Chrome instalado en modo headless (`--headless=new --screenshot`)
contra un arnés local, **`public/__probe.html`**, que está en `.gitignore` y no
debe llegar a producción.

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
chrome --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --run-all-compositor-stages-before-draw \
  --virtual-time-budget=15000 --window-size=1280,940 --screenshot=out.png \
  "http://localhost:5199/__probe.html?w=1280&h=940&sel=%23approach&theme=dark&lang=es"
```

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

1. **Reescribir las dos secciones restantes** contra sus artboards:
   Record y Contact. Hoy heredan la tipografía y la paleta nuevas y se ven
   coherentes, pero conservan la estructura vieja. Los artboards ya tienen la
   definitiva (libro mayor en vez de línea de tiempo, campos subrayados en vez
   de cajas).
2. **Unificar el peso de las reglas.** Las dos secciones que quedan abren con
   una hairline de 1px que se dibuja al entrar en viewport (`Rule` + `DrawIn`);
   en el sistema nuevo el separador entre secciones es una regla de 3px en
   tinta, y 1px divide *dentro* de una sección. Hoy se nota justo en la costura:
   Work cierra en hairline y Approach abre en otra.
3. **Traducir el contenido de las fichas.** Decidido el 2026-09-02: la
   estructura y el diseño se hicieron primero, la traducción va después. Toda
   la **interfaz** de la ficha ya es bilingüe (bloque `project` en los dos
   diccionarios); lo que sigue en inglés es el **contenido de cada proyecto**:
   2058 palabras entre `description`, `longDescription` e `insights.*`. Falta
   reestructurar `src/data/Projects.json` a campos por idioma y leerlos según
   `useLang()`. Hoy la costura se ve: cabeceras en español sobre párrafos en
   inglés. La única excepción ya hecha es la descripción del proyecto
   destacado, que vive en el diccionario (`work.featuredDescription`) porque
   aparece en la home bajo un título en español.
4. **Limpiar componentes muertos**: `src/components/Buttons/`,
   `src/components/Titles/`, `src/components/Form/` son del build anterior y no
   los usa nadie (`TertiaryButton` incluso referencia un `--accent` que no
   existe en ninguna hoja).

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
