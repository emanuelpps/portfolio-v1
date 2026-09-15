/**
 * Scroll a page the way a person does and report anything left unrevealed.
 *
 * Run through cdp.mjs, which gives it a real browser on the wall clock:
 *
 *   node docs/design/cdp.mjs "http://localhost:5199/" --lang es --theme dark \
 *     --wait 500 --eval-file docs/design/sweep.js
 *
 * It looks for the states an entrance animation leaves behind when it never
 * fires: an inline opacity below 1, a leftover translate, an SVG path still
 * fully dash-offset. A reveal that deadlocks on its own clipped intersection
 * rect shows up here and nowhere else — the screenshot harness forces all of
 * these to their settled values and cannot see them.
 */
(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const root = document.documentElement;

  for (let y = 0; y < root.scrollHeight; y += innerHeight * 0.6) {
    if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
    root.scrollTop = y;
    await sleep(300);
  }
  await sleep(1400);

  const stuck = [];
  const seen = new Set();
  const note = (line) => {
    if (!seen.has(line)) {
      seen.add(line);
      stuck.push(line);
    }
  };

  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;

    const label = (el.textContent || "").trim().slice(0, 40) || el.tagName;
    const s = el.style;

    if (s.opacity !== "" && Number(s.opacity) < 0.99)
      note(`opacity ${s.opacity} — <${el.tagName.toLowerCase()}> "${label}"`);

    if (s.transform && /translate|scale|matrix/.test(s.transform))
      note(`transform ${s.transform} — <${el.tagName.toLowerCase()}> "${label}"`);

    if (el.tagName === "path" && Number(cs.strokeDashoffset || 0) > 1)
      note(`undrawn path — dashoffset ${cs.strokeDashoffset}`);
  }

  return JSON.stringify(
    { height: root.scrollHeight, stuck: stuck.length ? stuck : "nada" },
    null,
    1,
  );
})();
