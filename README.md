# GSL Asset Shelf

The shelf every GSL team takes collateral from — sales, marketing, design and
partnerships alike. If it is on the shelf it is the current approved version;
if a space is empty, that piece does not exist yet.

Static site. No build step, no framework, no dependencies. Vercel serves the
folder as-is.

## What this is

A stocked shelf, not a file dump. Every offering has the **same eight slots** —
the things someone actually needs in front of a school:

| Slot | What it is |
|---|---|
| Brochure — digital | Send to a school by email or WhatsApp |
| Brochure — print | Press-ready file for a printer |
| Two-pager | The quick leave-behind at a meeting |
| Product note | One page: what it is, ages, outcomes, duration |
| Pitch deck | For a scheduled school presentation |
| MoU / agreement | The paperwork to close |
| Price list | Current commercials |
| Flyer | Single-sheet promo for events and drives |

A slot either downloads a real file, or reads **Yet to be designed**. The gaps
are the point: as of now **23 of 88 slots are filled**, and product notes, MoUs
and price lists do not exist for any offering.

The full status table, with a design backlog ranked by how many offerings are
missing each slot, is in [`FILES-NEEDED.md`](FILES-NEEDED.md).

## Brand mandates

Below the kit, every offering carries the rules its collateral has to obey:

| Mandate | Where it comes from |
|---|---|
| **Logo lockup** | The approved mark for that offering — 8 of 11 exist |
| **Typefaces** | Gluten, Montserrat, Proxima Nova, Open Sans — rendered, with roles |
| **Colours** | The four core brand colours plus that offering's accent, click to copy hex |
| **Design guideline** | Per offering. Only GSL has one so far |
| **Co-branding guideline** | GSL only — the rules for pairing GSL with a partner mark |

Fonts and colours are drawn by the page rather than served as files, so they
can never go missing or drift out of date. The values come from
`_ds/…/colors_and_type.css`, the design system distilled from the 2025 brand
guidelines.

Mandates live in **`mandates.js`**, edited by hand. It is deliberately separate
from `assets.js`, which is generated from the SharePoint inventory and gets
overwritten.

## Preview it locally

```
node serve.js
```

Then open <http://localhost:4321>. Ctrl+C to stop.

## Roles

Two roles, set in `roles.js`:

| | Manager | Admin |
|---|---|---|
| View and download everything | ✅ | ✅ |
| Add / replace kit links | — | ✅ |
| Add / replace mandates and lockups | — | ✅ |
| Add a new offering or partner | — | ✅ |
| Export changes | — | ✅ |
| See the download history | — | ✅ |

Signed-out visitors get **manager**. To become admin, click **Sign in** in the
sidebar and enter an email listed in `GSL_ADMINS` in `roles.js`. Add admins by
editing that array and pushing.

## Download history

Admins get a **Download history** section in the sidebar: who took which
piece of collateral, and when.

| Column | |
|---|---|
| When | Date and time |
| Who | The signed-in email |
| Offering | Which programme it belongs to |
| Collateral | The slot or lockup taken |
| Type | **download**, or **viewed** if opened in the SharePoint viewer |

Because a flat log gets long fast, it is searchable and filterable:

- **Search** across collateral name, offering and person
- **Filter** by offering, by person, or to downloads-only / views-only
- **Every event ⇄ Grouped by collateral** — the grouped view collapses the
  log to one row per item with a download count, how many people took it,
  and when it was last taken. That is the view for "which brochures are
  actually being used"
- **CSV** exports whatever the current filters show
- Long lists page 200 at a time

Filtering redraws only the table, so typing in the search box keeps focus
and caret position.

Logged for kit slots, logo lockups and guideline documents alike. Managers
never see the section; their downloads are still recorded.

### It only sees this browser

With no server, the hub can log what happens on one machine but cannot collect
downloads from anyone else's. So the log is accurate about *your* usage and
blind to the rest of the team. It is also not tamper-proof: the log lives in
`localStorage` and the person being logged can clear it.

Making it real is a small change — `logDownload()` in `app.js` already builds
the record; it just needs to POST it somewhere. A Vercel serverless function
writing to Vercel KV would do it in about an hour, and `historyFor()` would
read from that instead of local storage.

If you need reliable download auditing **today**, SharePoint already has it:
Microsoft Purview audit logs record every file access, server-side and
tamper-proof, for the same files this hub links to.

### This is a guard rail, not a lock

The hub is a static site with no server, so the role lives in the visitor's own
browser. It stops a manager changing the catalogue by accident. **It does not
stop anyone who opens developer tools.** Nothing here is secret either — every
file links to SharePoint, which enforces its own permissions server-side
regardless of what this app says.

If you need real access control, in increasing order of effort:

1. **Vercel Deployment Protection** (Project → Settings) — gates the whole site
   to your Vercel team. Minutes to set up. One level of access, not two.
2. **Microsoft Entra ID SSO** — the right answer for a Microsoft shop. Put the
   site behind Entra with a Vercel middleware, read the signed-in user's group
   membership, and derive the role from your existing directory. No separate
   admin list to maintain.
3. **A small backend** — a serverless function plus Vercel KV or Blob, so
   changes save for everyone instead of one browser, with the role checked
   server-side before any write.

## Adding a link

**From the hub** — click **Add link** on any empty card, paste the SharePoint
URL, save. The card goes live immediately.

That saves to *your browser only*. To make it permanent for the team, press
**Export** in the sidebar, copy the snippet, and paste it into the `assets`
array in `assets.js`, replacing the matching `status: "todo"` row. Commit and
push.

A plain SharePoint URL is fine — it gets rewritten into a `download.aspx` link
so it downloads rather than opening a preview.

**Directly in `assets.js`** — each row is one slot for one offering:

```js
{ product: "vex", slot: "two-pager", format: "PDF",
  updated: "2025-09-04",
  sp: "123_SalesSheet_A4_AU_REV1-02.pdf",
  spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Vex/…" },
```

An unfilled slot is just `{ product: "vex", slot: "mou", status: "todo" }`.

Product ids: `gsl` · `steam` · `vex` · `aiq` · `young-pioneers` · `harvard` ·
`ai-bootcamp` · `bootcampx` · `cretile` · `videogenx` · `prismix`

Slot ids: `brochure-digital` · `brochure-print` · `two-pager` · `product-note` ·
`deck` · `mou` · `price-list` · `flyer`

Regenerate the status file afterwards:

```
node make-file-list.js
```

## Where the data came from

`sharepoint data.xlsx` — a 39,519-file inventory of the
GSLMarketingCollaterals-2025 SharePoint. The catalogue was generated from it,
so every filename, date and URL is real rather than typed by hand. A slot with
no confident match was left empty rather than filled with a lookalike.

Deliberately excluded: source art (.ai/.psd/.indd), raw photography, video
projects, fonts, internal working documents, and the event archives (External
Events 2025, Events 2023-2025, YP Launchpad — about 28,000 files of one-off
event creatives).

## Deploying

```
vercel --prod
```

Or connect the folder to a Git repo and Vercel redeploys on every push.

`.vercelignore` keeps `uploads/`, `_ds/`, the spreadsheet and the old
design-canvas file out of the deployment.

## Access

The site is public to anyone with the URL, and carries `noindex` headers. If it
needs to be genuinely internal, turn on **Vercel Authentication** (Project →
Settings → Deployment Protection). Note that the download links point at
SharePoint, which enforces its own permissions regardless.

## Files

| | |
|---|---|
| `index.html` | Page shell and dialogs |
| `app.css` | All styling; tokens mirror the design system |
| `app.js` | Matrix, kit pages, search, add-link, export |
| `assets.js` | **The catalogue** — one row per offering × slot (generated) |
| `mandates.js` | **Brand mandates** — lockups, fonts, palette, guidelines (by hand) |
| `roles.js` | Admin list and what each role may do |
| `FILES-NEEDED.md` | Status table and design backlog |
| `make-file-list.js` | Regenerates `FILES-NEEDED.md` |
| `serve.js` | Local preview server |
| `vercel.json` | Cache + security headers |
| `assets/logos/` | Page furniture (sidebar logo, favicon) |
| `_ds/` | GSL design system (reference, not deployed) |
| `uploads/` | Original raw drop (reference, not deployed) |
| `sharepoint data.xlsx` | The inventory the catalogue was built from |

## Behaviour worth knowing

- **All offerings** is the landing view — a matrix of every offering against
  every slot, so you can see coverage at a glance.
- **Search is global** and covers offering names, slot names and filenames.
- `#vex`, `#aiq` etc. deep-link to one kit, so you can paste a direct link in
  Slack.
- Press `/` to jump to the search box.
- Locally added links live in `localStorage` under `gsl-hub-links-v1`. Clearing
  site data loses them — export anything you want to keep.
