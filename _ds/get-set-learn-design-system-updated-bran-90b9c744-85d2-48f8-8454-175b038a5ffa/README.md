# Get Set Learn — Design System

A design system for **Get Set Learn (GSL)**, a future-skills learning startup backed
by the **Arvind Mafatlal Group (AMG)** equipping K–12 students with 21st-century
capabilities through hands-on, NEP-aligned programs in **AI, STEAM & Robotics,
Entrepreneurship, and Life Skills**.

This package contains:

- Brand foundations distilled from the *Get Set Learn Brand Guidelines* PDF
- Color and type tokens as plain CSS variables
- The full set of brand logo assets (color + monochrome)
- UI Kits for the two primary surfaces: the **marketing website** and the
  **student/parent program portal**
- Re-usable design-system preview cards (visible in the Design System tab)

> The design system is the source of truth for downstream design work.
> When in doubt, lean on these tokens before inventing new values.

---

## Company context

| | |
|---|---|
| **Brand**    | Get Set Learn |
| **Parent**   | Arvind Mafatlal Group (AMG) |
| **Founded**  | 2022 (brand guidelines © 2022) |
| **Audience** | K–12 students (and their parents/schools) in India |
| **Mission**  | Transition K–12 education from *marks-led* to *skill-first* learning |
| **Programs** | AI · STEAM & Robotics · Entrepreneurship · Life / Future Skills |
| **Framing**  | NEP-aligned, hands-on, future-skills, growth-mindset |

GSL positions itself in the future-skills / extracurricular space: think
weekend / after-school cohorts that complement formal schooling rather than
replace it.

---

## Sources used

The system was built from the materials the user uploaded. None of them were
fetched off the web — they live in `uploads/`:

- `uploads/Get Set Learn Brand Guidelines.pdf` — the canonical 21-page brand book
- `uploads/AMG + GSL logo.svg` (+ white variant)
- `uploads/GSL + AMG logo.pdf`
- `uploads/GSL + AMG tagline logo.svg` (+ white variant)
- `uploads/GSL logo.svg` / `GSL logo-01.svg` (+ white variants)
- `uploads/GSL + AMG logo.ai` (Adobe Illustrator source — not parsed)

> **NOTE on the supplied SVGs:** every SVG in the upload had its `<defs>`
> style block stripped during export from Illustrator, so the `class` selectors
> (`st0`, `st1`, `cls-1`…) referenced no fills and the logos appeared as a
> single black silhouette. We re-mapped each class to the documented brand
> color by inspecting the class frequency and the matching screenshot, then
> replaced `class="…"` with direct `fill="#…"` attributes. The corrected
> files live in `assets/logos/`. If you need to ship a 100%-faithful master,
> source the original `.ai` from the brand team — our recolouring is an
> educated reconstruction, not the master.

There is **no codebase or Figma** attached. UI kits in this package are
*inferred* from the brand book + GSL's market category, not reverse-engineered
from a shipping product. Re-attach the production codebase or a Figma link if
you'd like the kits hardened against real components.

---

## Index — what's in the box

```
.
├── README.md                ← you are here
├── SKILL.md                 ← Claude / Agent Skill manifest
├── colors_and_type.css      ← CSS custom properties: colors, type, spacing, radii, shadows
├── assets/
│   └── logos/               ← all logo lockups (color + white variants)
├── fonts/                   ← (intentionally empty — fonts load from Google Fonts; see below)
├── preview/                 ← design-system specimen cards (rendered in the Design System tab)
├── ui_kits/
│   ├── website/             ← marketing site UI kit + interactive demo
│   └── portal/              ← student/parent program portal UI kit + interactive demo
└── research/                ← raw extracted text & screenshots used while building
```

### Quick-start

```html
<link rel="stylesheet" href="colors_and_type.css">
<h1 style="color: var(--gsl-azure)">Skill-first learning, from age 6.</h1>
<button class="overline" style="background: var(--gsl-turquoise); …">Start a free trial</button>
```

---

## Content fundamentals

GSL's voice is **empowering, innovative, and optimistic** — aligned with the
corporate core value of being *cheerful*. Copy is for two audiences at once: an
**8-to-16-year-old student** (must feel exciting, not babyish) and the
**parent/educator** evaluating the program (must feel substantive, not gimmicky).

| | |
|---|---|
| **Voice**      | Cheerful · confident · forward-looking — never preachy, never edu-speak |
| **POV**        | Second person ("you", "your child") in marketing copy; first-person plural ("we believe…") for mission statements |
| **Tone**       | Warm and energetic; declarative; short sentences over long ones |
| **Tense**      | Present-tense ("students *build*", not "students *will be able to build*") |
| **Casing**     | Sentence case for headlines and buttons. Title Case only for proper-noun program names (e.g. *AI for Young Minds*). ALL-CAPS reserved for **overlines** and short labels — never for body text. |
| **Numbers**    | Always numerals in marketing copy (*"4 future-skill tracks"*, not *"four"*). |
| **Punctuation**| Drop the period on single-line headlines and CTAs. Use the Oxford comma. Avoid exclamation marks (max one per page). |
| **Emoji**      | Sparingly. Approved when speaking *as* a student or marking a milestone in-product (🎉, 🚀, 💡, 🧠, 🤖). **Never** in headlines, navigation, or parent-facing content. |
| **Forbidden**  | "Revolutionize", "unlock potential", "leverage", "cutting-edge synergies", "world-class". GenAI clichés. |

### Example copy (write like this)

| Surface              | Do                                             | Don't                                              |
|----------------------|------------------------------------------------|----------------------------------------------------|
| Hero headline        | *Skill-first learning, from age 6.*            | *Empowering tomorrow's leaders today!*             |
| Hero sub             | *Hands-on programs in AI, robotics, entrepreneurship and life skills — built for the way kids actually learn.* | *A revolutionary educational solution.*           |
| Program card title   | *AI for Young Minds*                           | *AI 101 (Beginner)*                                |
| Program card sub     | *Build your first chatbot in 6 weekends.*      | *Comprehensive introduction to artificial intelligence.* |
| CTA                  | *Start a free trial · Book a demo · See programs* | *Click here · Learn more · Submit*              |
| In-app empty state   | *No projects yet — let's build your first one.*| *You have no projects.*                            |
| Achievement toast    | *Nice — that's your first working circuit. 🎉* | *Congratulations on your accomplishment!*          |

### Naming conventions

- **Programs** use sentence-case proper nouns: *AI for Young Minds*, *Robo Maker Lab*, *Future CEO*, *Life Skills Studio*.
- **Tracks** are the four pillars: *AI*, *STEAM & Robotics*, *Entrepreneurship*, *Life Skills*. These map 1:1 to the four secondary colors.
- **Age bands** are written *6-8*, *9-12*, *13-16* (en-dash, no spaces around it in tabular contexts; spaces in flowing copy).

---

## Visual foundations

> The brand book commands: *"Be bold, be proud, make it big!"* — so keep
> logos and primary type **large**, give every element room to breathe, and
> use color decisively rather than tentatively.

### Color

Two primary, three secondary, neutrals. Per the brand book:
**60% primary · 30% secondary · 10% tertiary** by area.

| Role            | Token              | Hex      |
|-----------------|--------------------|----------|
| **Turquoise Sea** (primary accent) | `--gsl-turquoise` | `#00D8B9` |
| **Azure Blue** (primary fg / wordmark) | `--gsl-azure` | `#073393` |
| **Cool Black** (body) | `--gsl-black` | `#212121` |
| **Cool White** (page bg) | `--gsl-white` | `#F8F8FF` |
| Orange · *STEAM & Robotics*   | `--gsl-orange` | `#FF934F` |
| Pink · *Life / Future Skills* | `--gsl-pink`   | `#FFB2E6` |
| Purple · *Entrepreneurship*   | `--gsl-purple` | `#A682FF` |

Each color has a `100→900` ramp (`--gsl-{name}-{stop}`) for tints and shades.
**Program category colors are semantic** — orange means STEAM, full stop. Don't
re-use them just because they look nice.

### Type

The brand book names **four typefaces**:

1. **Gluten** — the display / logo font. Use sparingly for *kid-facing* hero moments only.
2. **Montserrat** — workhorse for headings and short labels.
3. **Proxima Nova** — body text and long-form (paid; substituted with **Nunito Sans** here — please flag if you have a Proxima Nova license).
4. **Open Sans** — body text inside PowerPoint / printed decks.

Default hierarchy:

| Token        | Family       | Size  | Weight |
|--------------|--------------|-------|--------|
| `display-xl` | Montserrat   | 88px  | 900    |
| `display-lg` | Montserrat   | 64px  | 900    |
| `h1`         | Montserrat   | 40px  | 800    |
| `h2`         | Montserrat   | 32px  | 800    |
| `h3`         | Montserrat   | 24px  | 700    |
| `body`       | Nunito Sans  | 16px  | 400    |
| `overline`   | Montserrat   | 12px  | 700 (uppercase, 0.12em) |

### Spacing & layout

4-px base scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`. Section padding
on desktop hero blocks lives at `--sp-20` (80px) top/bottom. Card padding
defaults to `--sp-6` (24px).

Layouts are **grid-driven, generous, asymmetric-on-purpose**: program cards
typically lean into a 12-column grid with a 2-column gutter; hero blocks pair a
large headline with an off-axis illustration or photograph rather than a
centered stack.

### Backgrounds

- **Default**: cool white (`#F8F8FF`).
- **Brand**: solid Azure Blue for hero blocks, footers, full-bleed CTA bands.
- **Program sections** may use a soft tint (`*-100`) of the program color as a section background, with the saturated swatch reserved for accents.
- **Photography**: full-color, warm-leaning, *student-led action* — kids holding circuit boards, kids huddled around laptops, kids gesturing at whiteboards. Faces, hands, eye contact. **Not** stock-photo classrooms.
- **No gradients** as primary backgrounds. A subtle radial highlight is fine inside an illustration; **avoid** purple→blue diagonal gradients (the AI-slop default).
- **No repeating patterns / textures** as full-bleed backgrounds. The 3-dot icon mark is the only motif that may be repeated decoratively, and only at low contrast.

### Borders

- Default border: `1px solid var(--border-1)` (`#E6E6EB`).
- Strong / framed-card border: `2px solid var(--gsl-black)` — used sparingly to "stamp" hero cards in a poster-style frame.
- Brand-color borders are valid for program-tagged components (e.g. an orange card uses an orange-700 border).

### Corner radii

The brand has a **friendly, rounded** feel — no sharp 0-radius corners outside of dividers. Defaults:

- Form inputs / small chips: `--r-sm` (10px)
- Cards / images: `--r-md` (16px)
- Hero blocks / large illustrations: `--r-lg` → `--r-xl` (24–32px)
- Buttons / pills / tags: `--r-pill` (999px)

### Shadows & elevation

Two shadow systems:

- **Soft elevation** (`--shadow-sm/md/lg`) — for menus, modals, sticky bars. Tinted toward Azure so they feel "brand-y", not generic.
- **Pop shadow** (`--shadow-pop` / `--shadow-pop-turq`) — a solid offset shadow (`0 10px 0 0 var(--gsl-azure)`) used on poster-style hero cards and primary CTAs. This is a *signature move* — use it on one or two elements per screen, not every card.

No inset shadows. No glassmorphism / backdrop-blur.

### Hover / press states

| State   | Treatment                                                                          |
|---------|-------------------------------------------------------------------------------------|
| Hover (button) | Color shift to the `-600` shade. No transform. Cursor pointer. |
| Hover (card)   | Lift: `transform: translateY(-2px)` + `shadow-md → shadow-lg`. |
| Hover (link)   | Underline thickens or color shifts to turquoise-700. |
| Pressed        | Shrink: `transform: scale(0.97)` + remove pop-shadow. |
| Focus          | 2px solid `--gsl-turquoise` outline at `outline-offset: 2px`. **Always visible** — never `outline: none`. |
| Disabled       | `opacity: 0.5`, no pointer events. |

### Motion

- Cheerful but **not bouncy-everywhere**. Reserve spring easing for celebratory moments (a streak completion, a "level up").
- Standard easing: `cubic-bezier(0.22, 1, 0.36, 1)` (the "out-quint" feel) at 200ms.
- Enter animations: 8-12px upward translate + fade-in.
- Avoid: long durations (>400ms), parallax, sliding sidebars, spinning loaders. Use a 3-dot bouncing loader (the brand mark itself, riffed).

### Transparency & blur

Sparingly. The brand is **flat and confident**. Acceptable uses:
- 80% white overlay on a busy hero photo behind a text block.
- 12-16% turquoise wash on the active state of a nav item.
- **Never** backdrop-filter blur on cards / menus / modals — keep elements solid.

### Imagery treatment

- Warm-leaning, high-contrast, **no grayscale**, **no grain filters**.
- Crops favor faces and hands. Eye-level shots over hero/heroic angles.
- Photos may be masked into a 3-dot composition (the icon mark used as a clip-path with one circle large).
- Illustrations are **flat-color, geometric, friendly**. Curved sans letterforms (Gluten) feel native; thin-line tech illustrations do not.

### Layout rules / fixed elements

- Sticky top nav: 64-72px tall, solid white background, 1px bottom border `--border-1`.
- Mobile bottom tabs in the portal: 4 items max, 56px tall, no labels-only — pair icon + label.
- Reading width on long-form copy: 65ch.
- Hero CTAs sit **above the fold** on every marketing page; the page never opens with a wall of text.

---

## Iconography

GSL's brand book does **not** specify an icon system, so this design system
ships a documented substitution:

- **Primary icon library: [Lucide](https://lucide.dev)** (via CDN). 24×24 viewbox, 1.5px stroke, rounded line caps and joins — visually compatible with Gluten's rounded letterforms and the cool, modern feel of the wordmark. Loaded as `https://unpkg.com/lucide@latest/dist/umd/lucide.js` and rendered with the `data-lucide="…"` attribute, or as inline `<svg>` from the same set.
- **Flag:** Lucide is a *substitution* — if the GSL team has a preferred icon kit (Phosphor, Iconoir, or a custom set), swap the CDN URL and the icon names will mostly carry over. We did not see icons specified in the supplied materials.

Rules:

- Always use the **outline** variant unless the icon is acting as a status indicator inside a colored chip (where filled reads better).
- Stroke color: `currentColor` — let the parent set color via text color.
- Sizes: `16, 20, 24, 32, 48`. **Never** scale below 16px.
- Pair every icon-only button with an `aria-label`.

### Emoji

- Allowed in *student-facing* in-product moments only: achievement toasts, streak banners, project celebrations.
- Curated set: 🎉 (celebration), 🚀 (launch / start), 💡 (idea), 🧠 (think), 🤖 (AI), 🛠️ (build), ⚡ (energy / streak), 🏆 (badge).
- **Never** in nav, parent-facing UI, navigation, marketing headlines, error states.

### Unicode characters as iconography

Reserved for: arrows in CTAs (`→`), bullets in lists (`•`), and the en-dash
(`–`) in age ranges. Do not use Unicode glyphs as a replacement for proper SVG
icons.

### Logo mark as decoration

The 3-dot mark is the brand's most distinctive shape and can be used decoratively
at low contrast (5–10% Azure on white, or 10–15% white on Azure) behind hero
blocks. Don't over-do it — once per page is plenty.

---

## What to read next

Quick orientation for designers picking this up:

1. **Just need tokens?** Link `colors_and_type.css`. Every color, font, spacing, radius, and shadow you need is there as a CSS custom property.
2. **Want to use a logo?** Pull from `assets/logos/`. `gsl-logo-01.svg` is the canonical primary mark; the white variant is for dark backgrounds. Use `gsl-amg-tagline-logo.svg` only in formal lockups (legal pages, slide footers, etc.).
3. **Building a marketing page?** Open `ui_kits/website/index.html` — copy whichever components apply. The CSS is namespaced with `gsl-` so it slots into existing pages without leaking.
4. **Building an in-product screen?** Open `ui_kits/portal/index.html` — same pattern, namespace `gslp-`.
5. **Reviewing the system?** Every card in the Design System tab corresponds to a file in `preview/`. Click through to see the live spec.

---

## Open questions & flags for the brand team

1. **Proxima Nova licensing** — body font is currently **Nunito Sans** (free) as a stand-in. Drop the licensed Proxima Nova `.woff2` into `/fonts/` and update `--font-body` in `colors_and_type.css` to switch.
2. **Logo SVGs** — supplied SVGs were missing their inline `<style>` blocks; recoloured by inspection in `assets/logos/`. Replace with master files from your brand team for production use.
3. **Icon system** — Lucide is our substitution; please confirm or replace.
4. **Production codebase / Figma** — none provided. UI kits are inferred from category conventions + the brand book, not reverse-engineered. Attach a codebase to harden them.
5. **Imagery** — no photographs were supplied. Mockups use coloured placeholder shapes with explicit "photo of …" labels so it's obvious where to drop real assets.
