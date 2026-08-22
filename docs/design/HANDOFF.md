# Rediseño EP — dónde quedamos

**Última sesión:** 2026-08-22
**Rama:** `feat/redesign-ep-identity`
**Canvas de diseño:** https://claude.ai/code/artifact/66d11af8-47bc-4a34-bd1b-c32b20191990

---

## Estado en una línea

El diseño está **aprobado en canvas** (las seis secciones, en claro y oscuro).
**Todavía no se bajó al código.** El repo sigue con el sistema anterior
("Blueprint": monocromo + Instrument Serif + astil), que quedó descartado.

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

1. **Bajar el diseño al código.** Es el trabajo grande y no está empezado:
   - Reemplazar los tokens de `src/index.css` por la paleta y las seis
     variables de los dos modos.
   - **Self-hostear Archivo y Archivo Black** (hoy están self-hosteadas
     Urbanist e Instrument Serif; ambas quedan sin uso y se pueden borrar).
   - Reescribir las seis secciones contra los artboards.
   - Toggle claro/oscuro con persistencia.
2. **Bilingüe con selector (ES/EN).** Decidido hace varias sesiones, nunca
   arrancado: extraer todo el copy a un diccionario, store con zustand,
   selector en el nav, persistencia y `<html lang>`.

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
