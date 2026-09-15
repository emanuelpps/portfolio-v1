/**
 * Screenshot a page over CDP, at 2x, and write a webp.
 *
 * Same idea as docs/design/cdp.mjs in the portfolio: drive the installed
 * Chrome, let the wall clock run so IntersectionObserver reveals actually
 * fire, then capture. Two differences that matter here:
 *
 *   - deviceScaleFactor 2, so a 1440-wide shot lands as a 2880px file and
 *     stays sharp on the retina screens these get looked at on.
 *   - `--rect <selector>`: the clip is the element's own bounding box, so a
 *     plate is framed on a section boundary instead of wherever the scroll
 *     happened to stop. That is the whole difference between a tidy set of
 *     screenshots and a set that looks cut with scissors.
 *
 * Usage:
 *   node shot.mjs <url> --out f.webp [--w 1440] [--h 900]
 *                 [--rect <sel>] [--y <px>] [--scroll <sel>]
 *                 [--wait ms] [--click <sel>] [--hide <sel,sel>]
 *                 [--eval <expr>] [--outline] [--full] [--q 82]
 */
import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
let sharp = null;
try {
  ({ default: sharp } = await import("sharp"));
} catch {
  // Not installed. PNG out instead of webp — see docs/design/screenshots.md.
}

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const args = process.argv.slice(2);
const url = args[0];
const flag = (n, d) => {
  const i = args.indexOf(`--${n}`);
  return i === -1 ? d : args[i + 1];
};
const has = (n) => args.includes(`--${n}`);

const W = Number(flag("w", 1440));
const H = Number(flag("h", 900));
const DSF = Number(flag("dsf", 2));
const port = 9333 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), "shot-"));

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--disable-lcd-text",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  `--window-size=${W},${H}`,
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 80; i++) {
    try {
      const list = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json());
      const page = list.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome never opened its debugging port");
}

const ws = new WebSocket(await target());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  const w = pending.get(m.id);
  if (!w) return;
  pending.delete(m.id);
  m.error ? w.reject(new Error(m.error.message)) : w.resolve(m.result);
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
  return r.result?.value;
};

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: W,
  height: H,
  deviceScaleFactor: DSF,
  mobile: false,
});

/* Geolocation-gated apps show a spinner forever in headless Chrome,
   which is a screenshot of nothing. Granted and pinned to a real place. */
const geo = flag("geo", null);
if (geo) {
  const [latitude, longitude] = geo.split(",").map(Number);
  await send("Browser.grantPermissions", {
    origin: new URL(url).origin,
    permissions: ["geolocation"],
  });
  await send("Emulation.setGeolocationOverride", { latitude, longitude, accuracy: 40 });
}

await send("Page.navigate", { url });
await sleep(Number(flag("settle", 3500)));

/* Cookie bars, chat bubbles, "crafted by" badges — anything that is furniture
   of the live site rather than of the work being shown. */
const hide = flag("hide", null);
if (hide) {
  await evaluate(`
    ${JSON.stringify(hide.split(","))}.forEach(s => {
      document.querySelectorAll(s.trim()).forEach(el => el.style.setProperty('display','none','important'));
    }); 1
  `);
}

/* His own "crafted by" badge sits on the sites he built, which is right on
   the live site and wrong in a screenshot of it inside his portfolio — the
   page already says whose work this is. Matched on the text because the class
   list is Tailwind and differs per site. */
/* His own "crafted by" badge sits on the sites he built, which is right on the
   live site and wrong in a screenshot of it inside his portfolio — that page
   already says whose work this is. Matched on the text, because the class list
   is Tailwind and reads differently on every site. */
const hideText = flag("hidetext", null);
if (hideText) {
  console.log(
    "hidetext ->",
    await evaluate(`
      (() => {
        const needle = ${JSON.stringify(hideText.toLowerCase())};
        let n = 0;
        for (const el of document.querySelectorAll("body *")) {
          const t = (el.textContent || "").trim().toLowerCase();
          if (!t.includes(needle) || t.length > needle.length + 40) continue;
          // Hide the outermost wrapper, not every ancestor up to <body>.
          if ([...el.children].some((c) => (c.textContent || "").toLowerCase().includes(needle))) continue;
          const box = el.closest("[class*='absolute'],[class*='fixed']") || el;
          box.style.setProperty("display", "none", "important");
          n++;
        }
        return n;
      })()
    `),
  );
}

const click = flag("click", null);
if (click) {
  await evaluate(`(document.querySelector(${JSON.stringify(click)})||{click(){}}).click(); 1`);
  await sleep(1200);
}

/* Everything below the fold is lazy on most of these sites. One full pass down
   and back forces the images in before anything is framed. */
if (!has("nolazy")) {
  await evaluate(`
    (async () => {
      const step = innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        scrollTo(0, y); await new Promise(r => setTimeout(r, 220));
      }
      scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
      return 1;
    })()
  `);
}

const scrollSel = flag("scroll", null);
if (scrollSel) {
  await evaluate(`
    (() => { const el = document.querySelector(${JSON.stringify(scrollSel)});
      if (!el) return 'no match';
      scrollTo(0, el.getBoundingClientRect().top + scrollY); return 1; })()
  `);
}
const y = flag("y", null);
if (y !== null) await evaluate(`scrollTo(0, ${Number(y)}); 1`);

await sleep(Number(flag("wait", 1800)));

/* An outline of the page: what sections exist, where they start, how tall they
   are. This is what the shot list gets planned from. */
if (has("outline")) {
  console.log(
    await evaluate(`
      [...document.querySelectorAll('section,header,footer,main>div,[id]')]
        .map(el => { const r = el.getBoundingClientRect();
          return { t: el.tagName.toLowerCase(), id: el.id||'', cls: (el.className&&el.className.baseVal===undefined ? String(el.className) : '').slice(0,40),
                   y: Math.round(r.top + scrollY), h: Math.round(r.height),
                   txt: (el.innerText||'').replace(/\\s+/g,' ').slice(0,60) }; })
        .filter(o => o.h > 200)
        .map(o => o.y + ' +' + o.h + ' [' + o.t + (o.id?'#'+o.id:'') + '] ' + o.txt)
        .join('\\n')
    `),
  );
}

/* Some of these apps only show the thing worth photographing after you
   press something — a player has no waveform until a track is playing. This
   runs arbitrary JS and then waits, so the frame is captured after the app
   has caught up. */
const clickjs = flag("clickjs", null);
if (clickjs) {
  console.log("clickjs ->", await evaluate(clickjs));
  await sleep(Number(flag("after", 4000)));
}

const expr = flag("eval", null);
if (expr) console.log(await evaluate(expr));

const out = flag("out", null);
if (out) {
  let clip = null;
  const rectSel = flag("rect", null);
  if (rectSel) {
    const r = await evaluate(`
      (() => { const el = document.querySelector(${JSON.stringify(rectSel)});
        if (!el) return null; const b = el.getBoundingClientRect();
        return { x: 0, y: Math.round(b.top + scrollY), width: ${W}, height: Math.round(b.height) }; })()
    `);
    if (!r) throw new Error(`--rect matched nothing: ${rectSel}`);
    clip = { ...r, scale: 1 };
  } else if (has("full")) {
    const h = await evaluate(`document.body.scrollHeight`);
    clip = { x: 0, y: 0, width: W, height: h, scale: 1 };
  } else {
    const top = await evaluate(`scrollY`);
    clip = { x: 0, y: top, width: W, height: H, scale: 1 };
  }

  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip,
  });

  mkdirSync(dirname(out), { recursive: true });
  const png = Buffer.from(data, "base64");
  if (out.endsWith(".webp") && sharp) {
    await sharp(png).webp({ quality: Number(flag("q", 82)) }).toFile(out);
  } else {
    writeFileSync(out.replace(/.webp$/, ".png"), png);
  }
  console.log(`wrote ${out} ${clip.width * DSF}x${Math.round(clip.height * DSF)}`);
}

ws.close();
chrome.kill();
