/* Regenerates FILES-NEEDED.md — the sales-kit matrix as a checklist, with a
   direct download link for every slot that is filled, and a clear gap for
   every slot that is not.

   Run after editing assets.js:   node make-file-list.js                     */

const fs = require("fs");
const path = require("path");

global.window = {};
require("./assets.js");
const C = window.GSL_CATALOG;
const SLOTS = window.GSL_SLOTS;
const SITE = window.GSL_SHAREPOINT;

const dlUrl = a => a.url ? a.url
  : (a.spPath && a.sp
      ? SITE + "/_layouts/15/download.aspx?SourceUrl=" + encodeURIComponent(a.spPath + "/" + a.sp)
      : null);

const cell = s => String(s == null ? "" : s).replace(/\|/g, "\\|");

const byKey = {};
C.assets.forEach(a => { byKey[a.product + "|" + a.slot] = a; });

let have = 0, todo = 0, body = "";

for (const p of C.products) {
  const rows = SLOTS.map(s => {
    const a = byKey[p.id + "|" + s.id] || {};
    const url = dlUrl(a);
    url ? have++ : todo++;
    return { slot: s, a, url };
  });

  const n = rows.filter(r => r.url).length;
  body += "\n## " + p.name + "\n";
  body += "_" + n + " of " + SLOTS.length + " in the kit_\n\n";
  body += "| | Slot | File | Updated | Download |\n|---|---|---|---|---|\n";

  rows.forEach(r => {
    body += "| " + (r.url ? "✅" : "⬜") +
            " | " + cell(r.slot.label) +
            " | " + (r.a.sp ? "`" + cell(r.a.sp) + "`" : "_yet to be designed_") +
            " | " + cell(r.a.updated || "") +
            " | " + (r.url ? "[Download](" + r.url + ")" : "—") + " |\n";
  });
}

/* Which slots are empty everywhere — the design backlog, in priority order. */
const gaps = SLOTS.map(s => ({
  slot: s,
  missing: C.products.filter(p => !dlUrl(byKey[p.id + "|" + s.id] || {})).length
})).filter(g => g.missing > 0).sort((a, b) => b.missing - a.missing);

let backlog = "\n## Design backlog\n\nSlots ranked by how many offerings are missing them.\n\n";
backlog += "| Slot | Missing for | What it is |\n|---|---|---|\n";
gaps.forEach(g => {
  backlog += "| **" + cell(g.slot.label) + "** | " + g.missing + " of " + C.products.length +
             " offerings | " + cell(g.slot.hint) + " |\n";
});

const head = [
  "# GSL sales kit — status",
  "",
  "**" + have + " of " + (have + todo) + " slots filled** across " +
    C.products.length + " offerings × " + SLOTS.length + " slots.",
  "",
  "Every ✅ link downloads that exact file straight away — no preview screen.",
  "You need to be signed in to `maftechnologies.sharepoint.com`.",
  "",
  "⬜ means nothing has been designed for that slot yet. Add one from the hub",
  "with **Add link** on the card, or fill it in `assets.js`.",
  "",
  "Regenerate with `node make-file-list.js`.",
  ""
].join("\n");

fs.writeFileSync(path.join(__dirname, "FILES-NEEDED.md"), head + backlog + body);
console.log("FILES-NEEDED.md — " + have + " filled, " + todo + " yet to be designed");
