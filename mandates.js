/* ============================================================
   Get Set Learn — BRAND MANDATES
   ------------------------------------------------------------
   The non-negotiables that sit under every piece of collateral:
   the logo lockup, the typefaces, the palette, and the design
   guideline. GSL additionally carries the co-branding rules.

   Kept in its own file, by hand — assets.js is generated from
   the SharePoint inventory and gets overwritten.

   Fonts and colours are rendered by the page rather than served
   as files, so they are never "missing" and never go stale.

   Lockup / guideline rows use the same shape as assets.js:
     sp      real filename in SharePoint
     spPath  server-relative folder
   Omit both and the card reads "Yet to be designed".
   ============================================================ */

/* ---------- Typefaces — brand-wide, from the 2025 guidelines ---------- */
window.GSL_FONTS = [
  { name: "Gluten", role: "Display & wordmark",
    css: "'Gluten', cursive", weight: 700,
    url: "https://fonts.google.com/specimen/Gluten",
    note: "The playful, child-facing face. Wordmark and big statements only." },

  { name: "Montserrat", role: "Headlines & key terms",
    css: "'Montserrat', sans-serif", weight: 800,
    url: "https://fonts.google.com/specimen/Montserrat",
    note: "Every heading, button and label." },

  { name: "Proxima Nova", role: "Body & long-form",
    css: "'Nunito Sans', sans-serif", weight: 400,
    url: null,
    note: "Licensed — not on Google Fonts. Use Nunito Sans as the open substitute where a licence is not available.",
    substitute: "Nunito Sans" },

  { name: "Open Sans", role: "Slides & documents",
    css: "'Open Sans', sans-serif", weight: 400,
    url: "https://fonts.google.com/specimen/Open+Sans",
    note: "Body text in PowerPoint and Word, where the brand faces are not installed." }
];

/* ---------- Core palette — the same four on every offering ---------- */
window.GSL_PALETTE = [
  { name: "Turquoise Sea", hex: "#00D8B9", role: "Primary accent" },
  { name: "Azure Blue",    hex: "#073393", role: "Wordmark, primary" },
  { name: "Cool Black",    hex: "#212121", role: "Body text" },
  { name: "Cool White",    hex: "#F8F8FF", role: "Background", light: true }
];

/* ---------- Placement rules — from the co-branding guidelines ----------
   These apply to every lockup, whichever partner it carries. */
window.GSL_PLACEMENT = [
  { name: "Primary placement",
    rule: "Use as much as possible, across all communication." },
  { name: "Secondary placement",
    rule: "When the communication does not allow the primary." },
  { name: "Tertiary placement",
    rule: "Extreme space constraints only — app icons and similar." }
];

/* The rule that gets broken most often, so it is stated on every page. */
window.GSL_LOCKUP_RULE =
  "Use only the supplied files. Do not recreate, modify, or source partner " +
  "logos externally.";

/* ---------- Per-offering mandates ---------- */
window.GSL_MANDATES = {

  gsl: {
    accent: null,               // GSL uses the core palette alone
    lockup: { sp: "GSL + AMG tagline logo.svg",
              spPath: "/sites/GSLMarketingCollaterals-2025/GSL/Brand guidelines/2025 New GSL Brand Guideline/GSL , AMG logo with tagline",
              note: "The master lockup. GSL never appears without the AMG endorsement on external collateral." },
    lockups: [
      { file: "assets/lockups/gsl-amg-tagline.png", name: "GSL + AMG tagline",
        usage: "The master mark — GSL with the 'An Arvind Mafatlal Group Company' endorsement. Primary placement: use this wherever it fits.",
        vector: "assets/lockups/gsl-amg-tagline-logo.svg" },
      { file: "assets/lockups/gsl-amg-tagline-logo-white.svg", name: "GSL + AMG tagline — reversed",
        usage: "The master mark on dark backgrounds.", dark: true },
      { file: "assets/lockups/amg-gsl-horizontal.png", name: "Arvind Mafatlal Group × GSL",
        usage: "Horizontal partner lockup. Use where the parent group carries equal weight.",
        vector: "assets/lockups/amg-gsl-logo.svg" },
      { file: "assets/lockups/amg-gsl-horizontal-reversed.png", name: "AMG × GSL — reversed",
        usage: "The horizontal lockup on dark backgrounds.", dark: true,
        vector: "assets/lockups/amg-gsl-logo-white.svg" },
      { file: "assets/lockups/gsl-mark.png", name: "GSL mark",
        usage: "GSL alone, without the endorsement. Secondary placement — where the communication does not allow the full lockup.",
        vector: "assets/lockups/gsl-logo.svg" },
      { file: "assets/lockups/gsl-mark-reversed.png", name: "GSL mark — reversed",
        usage: "GSL alone on dark backgrounds.", dark: true,
        vector: "assets/lockups/gsl-logo-white.svg" },
      { file: "assets/lockups/gsl-symbol.png", name: "GSL symbol",
        usage: "The three dots alone. Tertiary placement only — app icons and extreme space constraints.",
        vector: "assets/lockups/gsl-logo-01.svg" },
      { file: "assets/lockups/amg-logo.png", name: "Arvind Mafatlal Group",
        usage: "The parent group mark on its own. Use only where AMG appears without GSL." }
    ],
    guideline: { sp: "Get Set Learn Brand Guidelines-digital.pdf",
                 spPath: "/sites/GSLMarketingCollaterals-2025/GSL/Brand guidelines/2025 New GSL Brand Guideline",
                 note: "2025 edition. The source of truth for everything on this page." },
    cobranding: { sp: "Co branding guidelines FINAL_compressed.pdf",
                  spPath: "/sites/GSLMarketingCollaterals-2025/GSL Marketing collaterals 2026/Co-Branding Guidelines",
                  local: "assets/co-branding-guidelines.pdf",
                  note: "Every lockup on every page comes from here. Read it before pairing the GSL mark with any partner logo." }
  },

  steam: {
    accent: { name: "STEAM Orange", hex: "#FF934F", role: "Programme accent" },
    lockup: { sp: "STEAM Innovators Programme-01.svg",
              spPath: "/sites/GSLMarketingCollaterals-2025/GSL/GSL Logo Lockup/STEAM Innovators Programme" },
    lockups: [
      { file: "assets/lockups/tinkrworks-gsl.png", name: "TinkRworks × GSL",
        usage: "Use for all communications featuring the Get Set Learn and TinkRworks partnership." }
    ],
    guideline: null
  },

  vex: {
    accent: { name: "VEX Red", hex: "#D96A1E", role: "Programme accent" },
    lockup: { sp: "VEX Robotics 2C.svg",
              spPath: "/sites/GSLMarketingCollaterals-2025/GSL/Partner logos/VEX logo/SVG",
              note: "VEX is a partner mark — never redraw or recolour it. One-colour versions sit in the same folder." },
    lockups: [
      { file: "assets/lockups/vex-gsl-amg.png", name: "VEX Robotics × GSL + AMG",
        usage: "GSL is the official distributor of VEX Robotics in India. Use this for all communications featuring the partnership." },
      { file: "assets/lockups/vex-gsl-amg-reversed.png", name: "VEX × GSL + AMG — reversed",
        usage: "Same lockup on dark backgrounds.", dark: true },
      { file: "assets/lockups/vex-gsl.png", name: "VEX Robotics × GSL",
        usage: "Without the AMG endorsement. Use where space is tight." },
      { file: "assets/lockups/vex-gsl-reversed.png", name: "VEX × GSL — reversed",
        usage: "Without the endorsement, on dark backgrounds.", dark: true }
    ],
    lockupNote: "VEX has multiple products, each with its own logo — pair the product-specific logo with the GSL lockup as needed. Competition communications additionally carry the REC Foundation logo.",
    guideline: null
  },

  aiq: {
    accent: { name: "AIQ Teal", hex: "#00A78F", role: "Programme accent" },
    lockup: { sp: "AIQ-01.svg",
              spPath: "/sites/GSLMarketingCollaterals-2025/GSL/GSL Logo Lockup/AIQ-IIT Guwahati-GSL logo lockup" },
    lockups: [
      { file: "assets/lockups/aiq-logo.png", name: "AIQ programme logo",
        usage: "Artificial Intelligence Quotient. Use this alongside the IIT Guwahati lockup in all relevant communications." },
      { file: "assets/lockups/iit-guwahati-gsl.png", name: "IIT Guwahati × GSL",
        usage: "AIQ is co-created with IIT Guwahati. Use for anything featuring the partnership." },
      { file: "assets/lockups/iit-guwahati-gsl-reversed.png", name: "IIT Guwahati × GSL — reversed",
        usage: "The partnership lockup on dark backgrounds.", dark: true }
    ],
    guideline: null
  },

  "young-pioneers": {
    accent: { name: "Pioneer Purple", hex: "#A682FF", role: "Programme accent" },
    lockup: { sp: "Young Pioneers logo lockup-01.svg",
              spPath: "/sites/GSLMarketingCollaterals-2025/GSL/GSL Logo Lockup/Young Pioneers" },
    lockups: [
      { file: "assets/lockups/young-pioneers-horizontal.png", name: "Young Pioneers — horizontal",
        usage: "The programme mark with the 'Fostering an entrepreneurial mindset' descriptor. Primary placement." },
      { file: "assets/lockups/young-pioneers-stacked.png", name: "Young Pioneers — stacked",
        usage: "Same mark stacked, for narrow or square formats." },
      { file: "assets/lockups/young-pioneers-launchpad.png", name: "Young Pioneers Launchpad",
        usage: "Launchpad is the final stage of the 3-year programme. Use alongside the Cambridge lockup in relevant communications." },
      { file: "assets/lockups/young-pioneers-launchpad-reversed.png", name: "Launchpad — reversed",
        usage: "Launchpad on dark backgrounds.", dark: true },
      { file: "assets/lockups/cambridge-gsl.png", name: "Cambridge × GSL",
        usage: "Young Pioneers runs with Cambridge University Press & Assessment, aligned to NEP 2020 and NCF 2023. Use for anything featuring the partnership." }
    ],
    guideline: null
  },

  harvard: {
    accent: { name: "Harvard Crimson", hex: "#A51C30", role: "Partner accent" },
    lockup: { sp: "GSL x HBPE logo lockup.pdf",
              spPath: "/sites/GSLMarketingCollaterals-2025/GSL/GSL Logo Lockup/GSL x HBPE",
              note: "Harvard co-branding rules are the strictest we work under. Check the co-branding guideline on the GSL page before any application." },
    lockups: [
      { file: "assets/lockups/gsl-harvard-business-impact.png", name: "GSL × Harvard Business Impact",
        usage: "Carries the 'K-12 Learning Partner of' qualifier and the tagline 'Preparing learners for real-world challenges'. Both are part of the mark — do not drop either." }
    ],
    guideline: null
  },

  "ai-bootcamp": {
    accent: { name: "Bootcamp Violet", hex: "#7A5CE0", role: "Programme accent" },
    lockup: { sp: "IITxGSL-01.svg",
              spPath: "/sites/GSLMarketingCollaterals-2025/GSL/GSL Logo Lockup/AIQ-IIT Guwahati-GSL logo lockup",
              note: "IIT Guwahati cohort lockup. A reversed version sits in the same folder." },
    lockups: [
      { file: "assets/lockups/iit-guwahati-gsl.png", name: "IIT Guwahati × GSL",
        usage: "Use for all communications featuring the Get Set Learn and IIT Guwahati partnership." },
      { file: "assets/lockups/iit-guwahati-gsl-reversed.png", name: "IIT Guwahati × GSL — reversed",
        usage: "Same lockup on dark backgrounds.", dark: true }
    ],
    guideline: null
  },

  bootcampx: {
    accent: { name: "Azure Blue", hex: "#073393", role: "Programme accent" },
    lockup: { sp: "bootcampx-01.svg",
              spPath: "/sites/GSLMarketingCollaterals-2025/GSL/GSL Logo Lockup/Bootcampx" },
    guideline: null
  },

  cretile: {
    accent: { name: "Cretile Pink", hex: "#E86BC0", role: "Partner accent" },
    lockup: null,
    guideline: null
  },

  videogenx: {
    accent: { name: "VideogenX Green", hex: "#1FAE6A", role: "Partner accent" },
    lockup: null,
    guideline: null
  },

  prismix: {
    accent: { name: "Prismix Indigo", hex: "#5B4FD6", role: "Partner accent" },
    lockup: { sp: "Prismix Logo", spPath: "/sites/GSLMarketingCollaterals-2025/Prismix/Prismix Logo" },
    lockups: [
      { file: "assets/lockups/prismix-gsl-horizontal.png", name: "Prismix Studios × GSL",
        usage: "Prismix set horizontally. Use for communications featuring the AI filmmaking partnership." },
      { file: "assets/lockups/prismix-gsl-compact.png", name: "Prismix × GSL + AMG",
        usage: "Horizontal, with the Arvind Mafatlal Group endorsement. Primary placement for external work." },
      { file: "assets/lockups/prismix-gsl-horizontal-reversed.png", name: "Prismix × GSL + AMG — reversed",
        usage: "Horizontal lockup on dark backgrounds.", dark: true },
      { file: "assets/lockups/prismix-gsl-stacked.png", name: "Prismix × GSL — stacked",
        usage: "Prismix mark stacked above its wordmark, for narrower formats." },
      { file: "assets/lockups/prismix-gsl-stacked-reversed.png", name: "Prismix × GSL — stacked, reversed",
        usage: "Stacked lockup on dark backgrounds.", dark: true }
    ],
    guideline: null
  }
};
