/**
 * Drive the page as a phone drives it: real touch, real `(hover: none)`.
 *
 * `cdp.mjs` runs a desktop Chrome, so every media query the design branches on
 * answers the desktop way — `(hover: hover)` matches, `(pointer: fine)` matches,
 * `maxTouchPoints` is 0. A bug that only exists because a touch browser
 * synthesises `:hover` on tap cannot be seen from there at all, and neither can
 * anything gated on `useEnvironment`.
 *
 * `Emulation.setDeviceMetricsOverride` with `mobile: true` is what actually
 * flips those queries; `setTouchEmulationEnabled` is what makes the DOM agree.
 * With both on, `Input.dispatchTouchEvent` puts a finger on the glass — which
 * is the only way to reproduce a hover that was never supposed to happen.
 *
 * Usage:
 *   node docs/design/touch.mjs <url> --script <file.mjs> [--shot <out.png>]
 *                              [--width 390] [--height 844] [--lang es]
 *                              [--theme dark]
 *
 * The script file is ESM exporting `default async ({ send, evaluate, tap,
 * dragFinger, scrollTo, sleep, shot }) => any`. Whatever it returns is printed.
 */
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const args = process.argv.slice(2);
const url = args[0];
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const width = Number(flag("width", 390));
const height = Number(flag("height", 844));
const port = 9333 + Math.floor(Math.random() * 400);
const profile = mkdtempSync(join(tmpdir(), "touch-"));

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

async function target() {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await fetch(`http://127.0.0.1:${port}/json`).then((r) => r.json());
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
  const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + " " + (r.exceptionDetails.exception?.description ?? ""));
  return r.result?.value;
};

await send("Page.enable");
await send("Runtime.enable");

/* The three calls that make this a phone rather than a narrow desktop. Without
   `mobile: true` the width changes and every hover query still answers yes.

   `--desktop` skips them, because some of what has to be checked is the other
   branch: focus rings and keyboard order only exist where there is a keyboard. */
const desktop = args.includes("--desktop");
if (!desktop) {
await send("Emulation.setDeviceMetricsOverride", {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: true,
  screenWidth: width,
  screenHeight: height,
});
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Emulation.setEmitTouchEventsForMouse", { enabled: true, configuration: "mobile" });
await send("Emulation.setUserAgentOverride", {
  userAgent:
    "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36",
  platform: "Android",
});
}

const lang = flag("lang", null);
const theme = flag("theme", null);
if (lang || theme) {
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

/** A finger down, held, and lifted — the gesture that leaves a phone hovering. */
const tap = async (x, y, holdMs = 120) => {
  await send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y, radiusX: 12, radiusY: 12, force: 1 }],
  });
  await sleep(holdMs);
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
};

/** A thumb dragged down the page, the way someone scrolls past a list. */
const dragFinger = async (x, fromY, toY, steps = 12) => {
  await send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y: fromY, radiusX: 12, radiusY: 12, force: 1 }],
  });
  for (let i = 1; i <= steps; i++) {
    const y = fromY + ((toY - fromY) * i) / steps;
    await send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y, radiusX: 12, radiusY: 12, force: 1 }],
    });
    await sleep(16);
  }
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
};

const scrollTo = (selector, offset = 80) =>
  evaluate(`
    (() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return 'no match';
      const y = el.getBoundingClientRect().top + scrollY - ${offset};
      scrollTo(0, y);
      document.documentElement.scrollTop = y;
      return Math.round(y);
    })()
  `);

/** A real key press. `:focus-visible` is a heuristic on how focus arrived, so
 *  `el.focus()` will not do — only the keyboard counts. */
const pressKey = async (key, code, windowsVirtualKeyCode) => {
  for (const type of ["rawKeyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", { type, key, code, windowsVirtualKeyCode });
  }
  await sleep(60);
};

const shot = async (file) => {
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(file, Buffer.from(data, "base64"));
  return file;
};

const scriptPath = flag("script", null);
if (scriptPath) {
  const mod = await import(pathToFileURL(resolve(scriptPath)).href);
  const out = await mod.default({ send, evaluate, tap, dragFinger, scrollTo, sleep, shot, pressKey });
  console.log(typeof out === "string" ? out : JSON.stringify(out, null, 1));
}

const shotPath = flag("shot", null);
if (shotPath) console.log(`wrote ${await shot(shotPath)}`);

ws.close();
chrome.kill();
