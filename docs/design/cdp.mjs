/**
 * Drive the installed Chrome over the DevTools Protocol, in real time.
 *
 * This exists because the screenshot harness lies about one specific thing.
 * `probe.html` forces every animation to its settled state, because headless
 * Chrome under `--virtual-time-budget` never fires IntersectionObserver and
 * without the forcing every `whileInView` element stays invisible. The cost is
 * that a reveal which never fires in a real browser looks perfectly fine in a
 * harness screenshot — which is exactly how a claim that never appeared on
 * screen got committed and shipped past two rounds of review.
 *
 * Here nothing is forced. Chrome runs on the wall clock with a real
 * IntersectionObserver, the page is scrolled the way a person scrolls it, and
 * what comes back is what a visitor sees.
 *
 * Node 22+ has a built-in WebSocket, so this needs no dependencies.
 *
 * Usage:
 *   node docs/design/cdp.mjs <url> [--scroll <selector>] [--wait <ms>]
 *                            [--eval <expr>] [--shot <file.png>]
 *                            [--width 1280] [--height 900] [--lang es]
 *                            [--theme dark]
 */
import { spawn } from "node:child_process";
import { writeFileSync, readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const args = process.argv.slice(2);
const url = args[0];
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const width = Number(flag("width", 1280));
const height = Number(flag("height", 900));
const port = 9333 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), "cdp-"));

const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--force-device-scale-factor=1",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  `--window-size=${width},${height}`,
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** The debugging endpoint is not up the instant the process is. */
async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await fetch(`http://127.0.0.1:${port}/json`).then((r) =>
        r.json(),
      );
      const page = list.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      // Not listening yet.
    }
    await sleep(250);
  }
  throw new Error("Chrome never opened its debugging port");
}

const ws = new WebSocket(await target());
await new Promise((r) => ws.addEventListener("open", r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  const waiting = pending.get(msg.id);
  if (!waiting) return;
  pending.delete(msg.id);
  msg.error ? waiting.reject(new Error(msg.error.message)) : waiting.resolve(msg.result);
});

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject });
    ws.send(JSON.stringify({ id: n, method, params }));
  });

const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  return r.result?.value;
};

await send("Page.enable");
await send("Runtime.enable");

const lang = flag("lang", null);
const theme = flag("theme", null);
if (lang || theme) {
  // Written before the app boots, so the inline script in index.html reads it.
  await send("Page.addScriptToEvaluateOnNewDocument", {
    source: `
      try {
        ${lang ? `localStorage.setItem('ep-lang', ${JSON.stringify(lang)});` : ""}
        ${theme ? `localStorage.setItem('ep-theme', ${JSON.stringify(theme)});` : ""}
      } catch {}
    `,
  });
}

await send("Page.navigate", { url });
await sleep(2500);

if (theme) await evaluate(`document.documentElement.dataset.theme = ${JSON.stringify(theme)}`);

const scrollTo = flag("scroll", null);
if (scrollTo) {
  // Scrolled the way a person scrolls: the element is brought into view and
  // then everything is given real time to notice.
  await evaluate(`
    (() => {
      const el = document.querySelector(${JSON.stringify(scrollTo)});
      if (!el) return 'no match';
      const y = el.getBoundingClientRect().top + scrollY - 80;
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else scrollTo(0, y);
      document.documentElement.scrollTop = y;
      return Math.round(y);
    })()
  `);
}

await sleep(Number(flag("wait", 2500)));

const expr = flag("eval", null);
if (expr) console.log(await evaluate(expr));

/* Anything longer than a one-liner goes in a file — a shell cannot be trusted
   with a page of JavaScript, and the quoting eats backslashes and quotes. */
const evalFile = flag("eval-file", null);
if (evalFile) console.log(await evaluate(readFileSync(evalFile, "utf8")));

const shot = flag("shot", null);
if (shot) {
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(shot, Buffer.from(data, "base64"));
  console.log(`wrote ${shot}`);
}

ws.close();
chrome.kill();
