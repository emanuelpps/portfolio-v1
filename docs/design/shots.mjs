/**
 * The shot list.
 *
 * One entry per screenshot the portfolio actually renders. `cover` shots are
 * exactly 1440x900 because ProjectsContainer crops them with object-cover in an
 * aspect-[16/10] box — anything taller gets its middle cut out. Plates are
 * framed on a section's own bounding box (`rect`) and rendered object-contain,
 * so their height is free; they are capped around 1500 CSS px so a plate does
 * not come back as a thin strip on screen.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const SHOT = join(here, "shot.mjs");
const OUT = join(here, "..", "..", "public", "projects");

const ES = "https://epic-sound-studio-seven.vercel.app";
/* The player has no track in it until something is pressed, and a music app
   photographed in silence is a screenshot of a menu. */
const PLAY =
  "(()=>{const b=[...document.querySelectorAll('button')].find(x=>/listen now/i.test(x.innerText));if(b)b.click();return b?1:'no button'})()";

const LIST = [
  // ---- 11 Epic Sound Studio ---------------------------------------------
  // The cover is the app with a track loaded, not the marketing landing: the
  // index promises a music player and the picture has to be of one.
  ["epic-sound-studio/player.webp",  `${ES}/player`,
    ["--settle","8000","--clickjs",PLAY,"--after","9000","--y","0"]],
  ["epic-sound-studio/trending.webp",`${ES}/player`,
    ["--settle","8000","--clickjs",PLAY,"--after","9000","--y","780"]],
  ["epic-sound-studio/landing.webp", `${ES}/`,     ["--settle","6000","--y","0"]],
  ["epic-sound-studio/more.webp",    `${ES}/more`, ["--settle","6000","--y","0"]],

  // ---- 4 The Coffee Roastery -------------------------------------------
  ["coffee-roastery/cover.webp",   "https://the-coffee-roastery.vercel.app/", ["--y","0"]],
  ["coffee-roastery/collection.webp","https://the-coffee-roastery.vercel.app/", ["--rect","#info"]],
  ["coffee-roastery/about.webp",   "https://the-coffee-roastery.vercel.app/", ["--rect","#about"]],
  ["coffee-roastery/contact.webp", "https://the-coffee-roastery.vercel.app/", ["--rect","#contact"]],

  // ---- 5 The CodeMaker Lab ---------------------------------------------
  ["codemaker-lab/cover.webp",     "https://www.codemakerlab.com.ar/", ["--y","0"]],
  ["codemaker-lab/services.webp",  "https://www.codemakerlab.com.ar/", ["--rect","#Precios"]],
  ["codemaker-lab/plans.webp",     "https://www.codemakerlab.com.ar/", ["--rect","#Planes"]],
  ["codemaker-lab/about.webp",     "https://www.codemakerlab.com.ar/", ["--rect","#Nosotros"]],
  ["codemaker-lab/contact.webp",   "https://www.codemakerlab.com.ar/", ["--rect","#Contacto"]],

  // ---- 6 Actor Portfolio -----------------------------------------------
  ["actor-portfolio/cover.webp",   "https://mng-actor.vercel.app/", ["--y","0"]],
  ["actor-portfolio/about.webp",   "https://mng-actor.vercel.app/", ["--rect","#about"]],
  ["actor-portfolio/experience.webp","https://mng-actor.vercel.app/", ["--rect","#experience"]],
  ["actor-portfolio/gallery.webp", "https://mng-actor.vercel.app/", ["--rect","#gallery"]],
  ["actor-portfolio/sizesheet.webp","https://mng-actor.vercel.app/", ["--rect","#sizesheet"]],

  // ---- 7 Personal Portfolio 2024 ---------------------------------------
  ["portfolio-2024/cover.webp",    "https://emanuelpps2024.vercel.app/", ["--y","0"]],
  ["portfolio-2024/experience.webp","https://emanuelpps2024.vercel.app/", ["--rect","#experience"]],
  ["portfolio-2024/skills.webp",   "https://emanuelpps2024.vercel.app/", ["--rect","#skills"]],
  ["portfolio-2024/projects.webp", "https://emanuelpps2024.vercel.app/", ["--y","4371","--h","1200"]],
  ["portfolio-2024/contact.webp",  "https://emanuelpps2024.vercel.app/", ["--rect","#contact"]],

  // ---- 8 EP Weather App -------------------------------------------------
  // One screen, and it needs a location or it spins forever. Pinned to the
  // city he lives in, so the forecast on screen is a real one.
  ["ep-weather/cover.webp",        "https://emanuelpps.github.io/EP-WeatherAPP/",
    ["--geo","-39.0333,-67.5833","--settle","7000","--y","0"]],

  // ---- 9 Don Remolo Pizza -----------------------------------------------
  ["don-remolo/cover.webp",        "https://emanuelpps.github.io/don-remolo-pizza/", ["--y","0"]],
  ["don-remolo/menu.webp",         "https://emanuelpps.github.io/don-remolo-pizza/",
    ["--click","a[href='/food-selection/']","--settle","4000","--full"]],

  // ---- 13 Eckers RRHH Solutions -----------------------------------------
  ["eckers-solutions/cover.webp",  "https://eckers-solutions.vercel.app/", ["--y","137"]],
  ["eckers-solutions/paths.webp",  "https://eckers-solutions.vercel.app/", ["--y","1037","--h","502"]],
  ["eckers-solutions/services.webp","https://eckers-solutions.vercel.app/", ["--rect","#services"]],
  ["eckers-solutions/process.webp","https://eckers-solutions.vercel.app/", ["--rect","#process"]],
  ["eckers-solutions/about.webp",  "https://eckers-solutions.vercel.app/", ["--rect","#about"]],
  ["eckers-solutions/contact.webp","https://eckers-solutions.vercel.app/", ["--rect","#contact"]],

  // ---- 2 / 3 the two libraries ------------------------------------------
  ["react-smart-hooks/npm.webp",   "https://www.npmjs.com/package/smart-hooks", ["--y","0"]],
  ["ts-helpers-kit/npm.webp",      "https://www.npmjs.com/package/ts-helpers-kit", ["--y","0"]],
];

const only = process.argv[2];
let ok = 0, bad = 0;
for (const [out, url, extra] of LIST) {
  if (only && !out.startsWith(only)) continue;
  const r = spawnSync(
    process.execPath,
    [SHOT, url, "--out", join(OUT, out), "--hidetext", "crafted by", ...extra],
    { encoding: "utf8" },
  );
  const line = (r.stdout || "").trim().split("\n").pop() || "";
  if (r.status === 0 && line.startsWith("wrote")) { ok++; console.log("  " + line.replace(OUT + "\\", "").replace(OUT + "/", "")); }
  else { bad++; console.log("  FAIL " + out + " :: " + ((r.stderr || "").trim().split("\n").pop() || line)); }
}
console.log(`\n${ok} ok, ${bad} failed`);
