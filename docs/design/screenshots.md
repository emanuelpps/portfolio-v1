# The project screenshots

Every image under `public/projects/` is taken by `shots.mjs`, which drives the
installed Chrome over the DevTools Protocol the same way `cdp.mjs` does. None of
them is cropped by hand, and that is the point: a set of screenshots cut by eye
drifts in width, in scale, and in where it decides a section ends.

## The two shapes

**Covers are exactly 1440×900 CSS px, at 2x — 2880×1800.** Not a preference.
`ProjectsContainer.tsx` renders `frontImage` with `object-cover` inside an
`aspect-[16/10]` box, so anything that is not 16:10 gets its edges eaten. The
old set mixed 1440×900 with 2844×1656 and the taller ones lost their headlines.

**Plates are framed on a section's own bounding box.** `--rect "#services"`
clips to what that element actually occupies, so a plate begins and ends where
the section does. The sheet renders them `object-contain`, so their height is
free — but keep them under about 1500 CSS px or the plate comes back as a strip.

## Running it

```
node docs/design/shots.mjs                      # everything
node docs/design/shots.mjs eckers-solutions     # one project's folder
```

Output goes straight into `public/projects/<slug>/`. `shot.mjs` writes webp when
[sharp](https://sharp.pixelplumbing.com/) can be imported and png when it
cannot — sharp is deliberately not a dependency of this project, since this runs
by hand a few times a year, not in the build. To get webp:

```
npm i sharp --prefix %TEMP%\shots
set NODE_PATH=%TEMP%\shots\node_modules
```

## What the harness handles that a manual screenshot does not

- **Lazy images.** One scroll pass down and back before framing, so nothing is
  captured mid-fade or as a grey box.
- **Geolocation.** `EP-WeatherAPP` shows a spinner forever without a location.
  `--geo -39.0333,-67.5833` pins it to General Roca, so the forecast on screen is
  a real one for the city he lives in.
- **State behind a click.** `--click` follows a link, `--clickjs` runs anything.
  Epic Sound's cover needs `Listen Now` pressed first: a music player
  photographed in silence is a screenshot of a menu.
- **His own badge.** `--hidetext "crafted by"` removes the "CRAFTED BY Emanuel
  Pagés" pill from the sites that carry it. Correct on the live site, wrong in a
  screenshot inside the portfolio, where the page already says whose work it is.

## Known rough edge

The Eckers cover carries a wide band of white below the headline. That is the
site's own hero — the section is 900 tall and its content stops around 700 — not
a bad crop. Fixing it means changing Eckers, not the screenshot.

## When a site changes

Re-run the slug and commit the files. Do not re-crop by hand; if a section moved,
change its selector in `shots.mjs` so the next person gets the same frame.
