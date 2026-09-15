# Where "34 projects" comes from

The Work header claims `8 of 34 projects · 2 open-source libraries`. Eight and
two are counted from `src/data/Projects.json`. Thirty-four is a constant,
`BUILT_PROJECTS` in `src/sections/Projects/work.ts`, and this file is the reason
it is allowed to be one.

Audited 2026-09-07 against every repository on `github.com/emanuelpps`, public
and private: **91 repos** in total.

## The rule

A repo counts as a project when it is his own and it is a built application,
site, or shipped library. A repo does not count when it is any of:

- a **fork** — someone else's code (11)
- **empty** — no files, or a `README` and nothing else (12)
- a **technical challenge** for a hiring process — a brief he was handed (4)
- a **course drill or language exercise** — Python coursework, design-pattern
  exercises, GitHub's own tutorial repos
- a **scaffold or spike** — `npm-*-base-package`, `arq`, `*-prueba`, `test-*`
- a **second repo of an app already counted once** — `weatherApp` next to
  `EP-WeatherAPP`, `ep-music` next to `EPic-Sound`, `portfolio-2026` next to
  `portfolio-v1`

Judgment calls are resolved *down*. The number is on a page where a stranger
can open the profile and start counting, so it has to survive that.

## The 34

Public (24): `portfolio-v1`, `emp-portfolio`, `emanuelpps.github.io`,
`turnofijo`, `epic-sound-studio`, `BurgerCompanion`, `epic-burger-WEB`,
`InfoNation`, `ep-voice-converter`, `ATC-Dream-Match`, `ushuaia-epicentro`,
`profile-page`, `EPic-Sound`, `the-coffee-roastery`, `s15-01-m-node-react`,
`EP-WeatherAPP`, `Falcon-Aviation-Shop`, `embe-ecommerce`, `Nire-Panaderia`,
`don-remolo-pizza`, `ep-currency-converter`, `EP-Music-Player`,
`AirportRoutesAPP`, `design-system-storybook`

Private (10): `ImportFlow`, `creep-exe`, `eckers-solutions`, `CodeMaker`,
`code-maker-lab`, `CarGuardian`, `mng-portfolio`, `estudio-eb`, `lader-landing`,
`duo-digital`

## The 2 libraries

`ts-helpers-kit` and `react-smart-hooks`. Both are on npm under MIT, both are
in the index, so the header does not need an "of" for them.

## Left out on purpose, worth knowing

- Two Python course finals (`proyecto-final-python`, `Proyecto-Final`) look like
  one project pushed twice. Counting either would put the figure at 35.
- `CodeMaker` and `code-maker-lab` are counted as two. If the lab is a branch of
  the same product rather than its own thing, the figure is 33.

## Re-running it

Open `github.com/emanuelpps?tab=repositories` while signed in — private repos do
not appear otherwise, and ten of the thirty-four are private. Apply the rule
above, then update `BUILT_PROJECTS` and the date at the top of this file. Do not
update one without the other.
