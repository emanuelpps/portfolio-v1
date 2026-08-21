# EP / Blueprint — Rediseño de identidad del portfolio

**Fecha:** 2026-08-21
**Rama:** `feat/redesign-ep-identity`
**Estado:** aprobado

## Premisa

El logo (una E y una P fundidas en una sola P) no se usa como imagen decorativa. Se usa como gramática de layout. Tres rasgos del logo se convierten en reglas estructurales del sitio, y el resto del sistema se deriva de ellas.

Rasgos del logo:

- Monolínea de trazo uniforme y fino, sin relleno. Todo es contorno.
- Contraformas rectangulares: los huecos de la E pesan tanto como el trazo.
- Asimetría: la E cierra a escuadra, la P cierra en curva. Un solo lado se redondea.
- Astil vertical compartido del que cuelgan todas las barras horizontales.
- Monocromo sobre azul-noche `#0F1621`.

## Las cuatro reglas del sistema

### 1. El astil

Una hairline vertical fija a `--stem` del borde izquierdo del viewport que atraviesa el documento entero, en una capa detrás del contenido. Toda regla horizontal de sección nace en el astil, no en el borde de la pantalla.

- Desktop: `--stem: 4.5rem`. Mobile: `--stem: 1.25rem`.
- El progreso de scroll se dibuja sobre el astil como un segmento sólido que crece desde arriba. No existe una barra de progreso separada.
- Cada sección deja una muesca en el astil a la altura de su regla superior. Las muescas son las barras de la E.

### 2. Radio solo a la derecha

Una única regla global de forma: esquinas izquierdas a escuadra, esquinas derechas cerradas en semicírculo (radio igual a la mitad de la altura del elemento). Es el bowl de la P.

Se aplica exclusivamente a: botones, campos de formulario, la máscara de los thumbnails de proyecto, y el indicador de tab/filtro activo. Ningún otro elemento del sitio lleva radio.

Esta regla es el mecanismo principal por el que el sitio se lee como "EP" sin mostrar el logo en cada pantalla.

### 3. Celdas-contraforma

No hay tarjetas. El contenido se agrupa en celdas rectangulares divididas por hairlines que se tocan: sin gaps, sin fondo, sin sombra, sin radio. Es la retícula de contraformas de la E.

El estado hover/activo no es glow ni blur: es **inversión** (fondo `--ink`, texto `--ground`). En un sistema monocromo estricto, invertir es la única señal de estado que no introduce color.

### 4. Tipografía fina

El logo es monolínea delgada, así que el display es delgado:

- **Display:** Urbanist ExtraLight (200) / Light (300) a tamaño grande, tracking cerrado (`-0.03em` a `-0.045em`). Restricción de accesibilidad: el peso ≤300 sólo se usa a ≥48px.
- **Cuerpo:** Urbanist Regular (400). De 16px para abajo nunca se baja de 400.
- **Metadatos, labels, índices, años, stacks:** stack mono del sistema (`ui-monospace, "SF Mono", Menlo, Consolas, monospace`), uppercase, tracking `0.18em`, tamaño 10–12px. No se agregan archivos de fuente al proyecto.

## Tokens

Monocromo estricto. No hay acento cromático: la jerarquía la dan peso de trazo, escala e inversión.

```
--ground    #0F1621   fondo (el fondo real del logo)
--ground-2  #0B1119   fondo hundido
--ink       #F2F3F5   trazo y texto
--ink-dim   #8B929C   texto secundario (~5.9:1 sobre --ground, AA en texto normal)
--ink-faint rgba(242,243,245,.28)
--rule      rgba(242,243,245,.14)
--rule-soft rgba(242,243,245,.07)
--hair      1px
--stem      4.5rem  (1.25rem en <768px)
```

## Movimiento

El gesto del sistema es **trazar**, no aparecer.

- Las reglas se dibujan con `scaleX`/`scaleY` desde su origen cuando la sección entra.
- El texto se revela por barrido de una hairline, no por fade+blur.
- El cursor en punteros finos es una cruz de registro `+`, la misma marca de las esquinas del hero actual.
- El lockup `EP` del cierre es un SVG que se traza a sí mismo vía `stroke-dashoffset`.
- Todo el movimiento cae bajo `prefers-reduced-motion: reduce`.

## Estructura

| Índice | Sección | Decisión |
|---|---|---|
| 00 | **Index** (Hero) | Display fino a escala máxima + hoja de specs en mono (ubicación, disponibilidad, rol actual). Absorbe el claim central de Value como una sola línea. |
| 01 | **Approach** (ex-Value) | Se reduce a dos celdas: el claim dev/marketer y la nota de indie hacker. Los `Counter` animados se retiran; las cifras (reales) pasan a tabla de specs en mono, sin animación. |
| 02 | **Work** | Centro del sitio. La grilla de cards se reemplaza por una tabla índice: `PRJ.NN │ título │ tipo │ stack │ ↗`. Hover invierte la fila y muestra un thumbnail flotante que sigue al cursor, enmascarado con el bowl de la P. En mobile la fila expande en lugar de flotar. |
| 03 | **Stack** | La grilla de logos de marca se retira. Se reemplaza por una matriz monoespaciada: herramientas como texto en columnas categorizadas separadas por hairlines. |
| 04 | **Record** (Experience) | El timeline central con gradiente se retira. El astil es el timeline: cada puesto cuelga como barra horizontal desde el astil, año a la izquierda, contenido a la derecha. Colapsado a una línea, expande al click. |
| 05 | **Contact** | Campos con subrayado únicamente, labels en mono, submit con radio-bowl. Cierra con el lockup `EP` trazado. |
| — | **NavBar** | El pill flotante se retira. Barra superior de una hairline: marca EP a la izquierda alineada al astil, índices de sección en mono a la derecha. |
| — | **Footer** | Una fila de metadatos en mono. |
| — | **/project/:id** | Mismo sistema: header de spec sheet, retícula hairline, imágenes con máscara de bowl. |

## Componentes nuevos

En `src/components/blueprint/`:

- `Stem` — el astil fijo, el segmento de progreso de scroll y las muescas de sección.
- `Rule` — hairline horizontal que se traza al entrar en viewport; ancla al astil.
- `Cell` / `CellGrid` — celdas-contraforma con divisores compartidos e inversión en hover.
- `Index` — el numerador en mono (`00`, `PRJ.04`, `2026`).
- `SpecList` — pares clave/valor en mono para las hojas de specs.
- `BowlButton` — el botón con radio sólo a la derecha; es también la base de inputs y tabs.
- `Crosshair` — el cursor de registro (sólo `pointer: fine` y sin reduced-motion).
- `DrawIn` — wrapper de motion para el gesto de trazado.
- `WipeText` — revelado de texto por barrido.

## Qué se conserva

`src/data/Projects.json`, el array `EXPERIENCES`, las rutas y `ScrollContext`/refs, Lenis, la integración de EmailJS, el skip-link, el bloque de `prefers-reduced-motion`, y las declaraciones `@font-face` de Urbanist.

## Qué se retira

`Atmosphere` (blobs de gradiente), `TiltCard`, `Marquee`, la animación `hero-shimmer`, los `blur-[150px]`, el patrón `rounded-2xl bg-white/[0.03]`, `IconsConfig` como grilla visual (los nombres se reutilizan como texto), y `Counter`.

## Riesgos y mitigaciones

- **Contraste con display fino.** El peso ≤300 se restringe a ≥48px; de 16px para abajo se usa 400 con `--ink` pleno. `--ink-dim` sólo en texto de apoyo.
- **La inversión como único estado.** Al no haber color, el foco de teclado necesita ser inequívoco: outline de 2px en `--ink` con `outline-offset: 3px`, y `:focus-visible` hereda la misma inversión que el hover.
- **El thumbnail flotante en Work.** Depende de puntero fino; el fallback en touch (fila que expande) tiene que ser la ruta por defecto, no un parche.
- **El astil en viewports angostos.** A `1.25rem` el margen izquierdo restante es escaso; el contenido arranca en `calc(var(--stem) + 1rem)` y las tablas colapsan a filas apiladas.

## Criterios de aceptación

- `npm run build` pasa sin errores de TypeScript.
- `npm run lint` pasa.
- El sitio no contiene ningún valor de color fuera de los tokens monocromos declarados.
- Ningún elemento tiene radio simétrico; el único radio del sistema es el bowl a la derecha.
- Con `prefers-reduced-motion: reduce` no hay trazados ni barridos y el contenido es legible.
- Navegación completa por teclado con foco visible en cada control interactivo.
- Sin scroll horizontal en 320px, 768px, 1280px y 1920px.
