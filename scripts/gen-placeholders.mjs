// Regenerates placeholder SVGs into /public/images/placeholders/.
// Run:  node scripts/gen-placeholders.mjs
// These placeholders are intentionally dark/editorial so the site
// looks designed even before real photographs are dropped in.

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/images/placeholders");

const PALETTES = [
  { a: "#0a0a0c", b: "#141418", c: "#26262c", accent: "#3a3a42" },
  { a: "#080809", b: "#12121a", c: "#1d1d22", accent: "#2f2f37" },
  { a: "#0b0b0e", b: "#151519", c: "#22222a", accent: "#3f3f47" },
  { a: "#090909", b: "#181820", c: "#282830", accent: "#494952" },
  { a: "#0a0a0d", b: "#111117", c: "#1e1e28", accent: "#33333d" },
  { a: "#0c0c10", b: "#1a1a22", c: "#2a2a34", accent: "#40404a" },
];

function pick(seed, arr) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return arr[h % arr.length];
}

function svg({ label, meta, w, h, seed }) {
  const p = pick(seed, PALETTES);
  const cx = (0.4 + ((seed.charCodeAt(0) % 6) * 0.08)).toFixed(2);
  const cy = (0.3 + ((seed.charCodeAt(1) % 5) * 0.09)).toFixed(2);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${p.a}"/>
      <stop offset="0.6" stop-color="${p.b}"/>
      <stop offset="1" stop-color="${p.a}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${cx}" cy="${cy}" r="0.6">
      <stop offset="0" stop-color="${p.c}" stop-opacity="0.9"/>
      <stop offset="0.55" stop-color="${p.b}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${p.a}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <g stroke="#ffffff" stroke-opacity="0.05" stroke-width="1">
    <line x1="0" y1="${Math.round(h * 0.68)}" x2="${w}" y2="${Math.round(h * 0.68)}"/>
    <line x1="${Math.round(w * 0.72)}" y1="0" x2="${Math.round(w * 0.72)}" y2="${h}"/>
  </g>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" fill="#ffffff" fill-opacity="0.22">
    <text x="${Math.round(w * 0.04)}" y="${Math.round(h * 0.07)}" font-size="${Math.round(h * 0.018)}" letter-spacing="5">${label}</text>
    <text x="${Math.round(w * 0.04)}" y="${Math.round(h * 0.96)}" font-size="${Math.round(h * 0.014)}" letter-spacing="5">${meta}</text>
    <text x="${Math.round(w * 0.96)}" y="${Math.round(h * 0.96)}" font-size="${Math.round(h * 0.014)}" letter-spacing="5" text-anchor="end">SHOTS BY AIMN</text>
  </g>
</svg>`;
}

const items = [
  { name: "hero", label: "01 · HERO", meta: "REPLACE /images/hero/hero.jpg", w: 1600, h: 1000 },

  { name: "project-01",  label: "PROJECT · G JONES · 01",   meta: "SOUND HAVEN · 2026",       w: 1600, h: 1000 },
  { name: "project-01b", label: "PROJECT · G JONES · 02",   meta: "PORTRAIT · 2026",          w: 900,  h: 1200 },
  { name: "project-01c", label: "PROJECT · G JONES · 03",   meta: "CROWD · 2026",             w: 1600, h: 1000 },
  { name: "project-01d", label: "PROJECT · G JONES · 04",   meta: "LIGHTING · 2026",          w: 1600, h: 1000 },

  { name: "project-02",  label: "PROJECT · RAVENSCOON · 01",     meta: "INTERVIEW · 2026",         w: 1600, h: 1000 },
  { name: "project-02b", label: "PROJECT · RAVENSCOON · 02",     meta: "STUDIO · 2026",            w: 900,  h: 1200 },

  { name: "project-03",  label: "PROJECT · ATLANTA · 01",   meta: "NIGHT · 2026",             w: 1600, h: 1000 },
  { name: "project-03b", label: "PROJECT · ATLANTA · 02",   meta: "SILHOUETTE · 2026",        w: 900,  h: 1200 },
  { name: "project-03c", label: "PROJECT · ATLANTA · 03",   meta: "LIGHTING · 2026",          w: 900,  h: 1200 },

  { name: "project-04",  label: "PROJECT · PORTRAITS · 01", meta: "ONGOING",                  w: 900,  h: 1200 },
  { name: "project-04b", label: "PROJECT · PORTRAITS · 02", meta: "ONGOING",                  w: 900,  h: 1200 },

  { name: "project-05",  label: "PROJECT · FESTIVAL · 01",  meta: "MAIN STAGE · 2026",        w: 1600, h: 1000 },
  { name: "project-05b", label: "PROJECT · FESTIVAL · 02",  meta: "BACKSTAGE · 2026",         w: 1600, h: 1000 },
  { name: "project-05c", label: "PROJECT · FESTIVAL · 03",  meta: "CROWD · 2026",             w: 1600, h: 1000 },

  { name: "film-01", label: "FILM · MYTHM CONVERSATION", meta: "INTERVIEW · 2026",       w: 1920, h: 1080 },
  { name: "film-02", label: "FILM · SOUND HAVEN RECAP",  meta: "RECAP · 2026",           w: 1920, h: 1080 },
  { name: "film-03", label: "FILM · ATLANTA UNDERGROUND", meta: "SHORT DOC · 2026",      w: 1920, h: 1080 },

  { name: "archive-01", label: "ARCHIVE · 001", meta: "SOUND HAVEN · 2026", w: 1200, h: 900 },
  { name: "archive-02", label: "ARCHIVE · 002", meta: "ATLANTA · 2026",     w: 900,  h: 1200 },
  { name: "archive-03", label: "ARCHIVE · 003", meta: "STUDIO · 2026",      w: 1000, h: 1000 },
  { name: "archive-04", label: "ARCHIVE · 004", meta: "BACKSTAGE · 2026",   w: 1200, h: 900 },
  { name: "archive-05", label: "ARCHIVE · 005", meta: "PORTRAIT · 2026",    w: 900,  h: 1200 },
  { name: "archive-06", label: "ARCHIVE · 006", meta: "SOUND HAVEN · 2026", w: 1200, h: 900 },
  { name: "archive-07", label: "ARCHIVE · 007", meta: "ATLANTA · 2026",     w: 900,  h: 1200 },
  { name: "archive-08", label: "ARCHIVE · 008", meta: "WAREHOUSE · 2026",   w: 1200, h: 900 },
  { name: "archive-09", label: "ARCHIVE · 009", meta: "PORTRAIT · 2026",    w: 900,  h: 1200 },
  { name: "archive-10", label: "ARCHIVE · 010", meta: "CROWD · 2026",       w: 1200, h: 900 },
  { name: "archive-11", label: "ARCHIVE · 011", meta: "LIGHTING · 2026",    w: 1000, h: 1000 },
  { name: "archive-12", label: "ARCHIVE · 012", meta: "ATLANTA · 2026",     w: 900,  h: 1200 },

  { name: "about", label: "ABOUT · PORTRAIT", meta: "AYMANE ROUCHDI · ATL", w: 900, h: 1200 },
];

await mkdir(OUT, { recursive: true });

for (const item of items) {
  const contents = svg({ ...item, seed: item.name });
  await writeFile(resolve(OUT, `${item.name}.svg`), contents, "utf8");
}

console.log(`Wrote ${items.length} placeholder SVGs to ${OUT}`);
