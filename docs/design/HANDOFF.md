# Rediseño EP — dónde quedamos

**Última sesión:** 2026-09-02
**Rama:** `feat/redesign-ep-identity`
**Canvas de diseño:** https://claude.ai/code/artifact/66d11af8-47bc-4a34-bd1b-c32b20191990

---

## Estado en una línea

El diseño está **aprobado en canvas** (las seis secciones, en claro y oscuro).
**La portada y Work ya están en código**, junto con la base que necesitan
(tipografías, paleta de dos modos, masthead). Las otras cuatro secciones heredan
la tipografía y la paleta nuevas, pero **todavía no se reescribieron contra sus
artboards**.

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

1. **Reescribir las cuatro secciones restantes** contra sus artboards: Approach,
   Stack, Record, Contact. Hoy heredan la tipografía y la paleta nuevas y se ven
   coherentes, pero conservan la estructura vieja. Los artboards ya tienen la
   definitiva (libro mayor en vez de línea de tiempo, campos subrayados en vez
   de cajas).
2. **Unificar el peso de las reglas.** Las cuatro secciones que quedan abren con
   una hairline de 1px que se dibuja al entrar en viewport (`Rule` + `DrawIn`);
   en el sistema nuevo el separador entre secciones es una regla de 3px en
   tinta, y 1px divide *dentro* de una sección. Hoy se nota justo en la costura:
   Work cierra en hairline y Approach abre en otra.
3. **Traducir las fichas de proyecto.** La home está 100% en los dos idiomas;
   las páginas `/project/:id` siguen solo en inglés. Falta reestructurar
   `src/data/Projects.json` a campos por idioma (`description`,
   `longDescription`, `insights.*`) y adaptar `ProjectDetailContainer`. La única
   excepción ya hecha es la descripción del proyecto destacado, que vive en el
   diccionario (`work.featuredDescription`) porque aparece en la home bajo un
   título en español.
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
