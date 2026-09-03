/* ============================================================
   Get Set Learn — Asset Shelf · CATALOGUE

   Structured as a COLLATERAL KIT: every offering has the same set of
   slots a rep actually needs in front of a school. A slot either
   points at a real file in the GSLMarketingCollaterals-2025
   SharePoint, or is marked "yet to be designed" so the gap shows.

   Files are the real thing — real filename, real Modified date,
   and a direct one-click download URL. Nothing is invented: a
   slot with no confident match is left empty rather than filled
   with a lookalike.

   ADDING A LINK
   Use "Add link" on any empty card in the hub. That saves to your
   browser immediately; press Export in the toolbar to get the
   snippet to paste here so the whole team sees it.
   ============================================================ */

window.GSL_SHAREPOINT = "https://maftechnologies.sharepoint.com/sites/GSLMarketingCollaterals-2025";

window.GSL_SLOTS = [
  { id: "brochure-digital", label: "Brochure — digital", hint: "Send to a school by email or WhatsApp." },
  { id: "brochure-print", label: "Brochure — print", hint: "Press-ready file for a printer." },
  { id: "two-pager", label: "Two-pager", hint: "The quick leave-behind at a meeting." },
  { id: "product-note", label: "Product note", hint: "One page: what it is, ages, outcomes, duration." },
  { id: "deck", label: "Pitch deck", hint: "For a scheduled school presentation." },
  { id: "mou", label: "MoU / agreement", hint: "The paperwork to close." },
  { id: "price-list", label: "Price list", hint: "Current commercials." },
  { id: "flyer", label: "Flyer", hint: "Single-sheet promo for events and drives." }
];

window.GSL_CATALOG = {

  products: [
    { id: "gsl", name: "Get Set Learn", color: "#00D8B9", tint: "#EAF0FF",
      blurb: "The company deck — use when you are selling GSL rather than one programme." },
    { id: "steam", name: "STEAM & Robotics", color: "#FF934F", tint: "#FFEEE1",
      blurb: "Tinkrworks STEAM & Robotics — the year-long school programme." },
    { id: "vex", name: "VEX Robotics", color: "#D96A1E", tint: "#FFEEE1",
      blurb: "Competition robotics — VEX GO, IQ, EXP and V5." },
    { id: "aiq", name: "AIQ", color: "#00A78F", tint: "#DFFBF5",
      blurb: "AI literacy programme. June 2026 brochure is current." },
    { id: "young-pioneers", name: "Young Pioneers", color: "#A682FF", tint: "#EFE8FF",
      blurb: "Entrepreneurship cohorts ending in a student pitch." },
    { id: "harvard", name: "Harvard Business Impact", color: "#A51C30", tint: "#FBE9EC",
      blurb: "GSL × Harvard Business Impact. Co-branding rules are strict." },
    { id: "ai-bootcamp", name: "AI Bootcamp", color: "#7A5CE0", tint: "#EFE8FF",
      blurb: "ImagineX AI and drone bootcamps, incl. the IIT Guwahati cohort." },
    { id: "bootcampx", name: "BootcampX", color: "#073393", tint: "#EAF0FF",
      blurb: "The umbrella bootcamp offering." },
    { id: "cretile", name: "Cretile", color: "#E86BC0", tint: "#FFEAF8",
      blurb: "Cretile modular electronics partnership." },
    { id: "videogenx", name: "VideogenX", color: "#1FAE6A", tint: "#E3F7ED",
      blurb: "VideogenX — AI video for schools." },
    { id: "prismix", name: "Prismix", color: "#5B4FD6", tint: "#EAE7FB",
      blurb: "AI filmmaking with Prismix Studio." }
  ],

  assets: [

    /* ===== Get Set Learn ===== */
    { product: "gsl", slot: "brochure-digital", format: "PDF",
      updated: "2026-05-15",
      sp: "GSL Common brochure.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/GSL Common Brochure/GSL Common Brochure _ Updated May 2026/Common Brochure/Digital" },
    { product: "gsl", slot: "brochure-print", format: "PDF",
      updated: "2026-05-15",
      sp: "GSL Common brochure_P.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/GSL Common Brochure/GSL Common Brochure _ Updated May 2026/Common Brochure/Print" },
    { product: "gsl", slot: "two-pager", status: "todo" },
    { product: "gsl", slot: "product-note", status: "todo" },
    { product: "gsl", slot: "deck", format: "PDF",
      updated: "2025-09-04",
      sp: "GSL - Deck Templates.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/GSL Common Brochure/pingpong docx/Deck template" },
    { product: "gsl", slot: "mou", status: "todo" },
    { product: "gsl", slot: "price-list", status: "todo" },
    { product: "gsl", slot: "flyer", status: "todo" },

    /* ===== STEAM & Robotics ===== */
    { product: "steam", slot: "brochure-digital", format: "PDF",
      updated: "2026-06-12",
      sp: "STEAM & Robotics Brochure - 2026 digital_compressed.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/STEAM/Brochures - ALL/STEAM Innovators Brochure/Tinkrworks/STEAM and Robotics Tinkrworks Program Brochures/Updated" },
    { product: "steam", slot: "brochure-print", format: "PDF",
      updated: "2026-06-12",
      sp: "STEAM & Robotics Brochure - 2026 Print.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/STEAM/Brochures - ALL/STEAM Innovators Brochure/Tinkrworks/STEAM and Robotics Tinkrworks Program Brochures/Updated" },
    { product: "steam", slot: "two-pager", status: "todo" },
    { product: "steam", slot: "product-note", status: "todo" },
    { product: "steam", slot: "deck", status: "todo" },
    { product: "steam", slot: "mou", status: "todo" },
    { product: "steam", slot: "price-list", status: "todo" },
    { product: "steam", slot: "flyer", format: "PDF",
      updated: "2026-01-22",
      sp: "GSL_Flyer_Robotics and Drone Workshop edited dates.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/STEAM/Flyers - ALL/Robotics and Drone workshop Flyer/Robotics and drone updated flyer" },

    /* ===== VEX Robotics ===== */
    { product: "vex", slot: "brochure-digital", format: "PDF",
      updated: "2026-04-13",
      sp: "VEX brochure updated logo and contact_DIGITAL.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Vex/Updated Brochure - March 2026/Digital" },
    { product: "vex", slot: "brochure-print", format: "PDF",
      updated: "2026-04-13",
      sp: "VEX brochure updated logo and contact print file.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Vex/Updated Brochure - March 2026/Print file" },
    { product: "vex", slot: "two-pager", format: "PDF",
      updated: "2025-09-04",
      sp: "123_SalesSheet_A4_AU_REV1-02.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Vex/Digital Brochure/Vex Individual Brochure/VEX 123" },
    { product: "vex", slot: "product-note", status: "todo" },
    { product: "vex", slot: "deck", status: "todo" },
    { product: "vex", slot: "mou", status: "todo" },
    { product: "vex", slot: "price-list", status: "todo" },
    { product: "vex", slot: "flyer", status: "todo" },

    /* ===== AIQ ===== */
    { product: "aiq", slot: "brochure-digital", format: "PDF",
      updated: "2026-06-11",
      sp: "AIQ Brochure_June 2026_updated digital_compressed.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/AIQ/Brochure edit - June 2026" },
    { product: "aiq", slot: "brochure-print", format: "PDF",
      updated: "2026-06-11",
      sp: "AIQ Brochure_June 2026_updated print.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/AIQ/Brochure edit - June 2026" },
    { product: "aiq", slot: "two-pager", status: "todo" },
    { product: "aiq", slot: "product-note", status: "todo" },
    { product: "aiq", slot: "deck", status: "todo" },
    { product: "aiq", slot: "mou", status: "todo" },
    { product: "aiq", slot: "price-list", status: "todo" },
    { product: "aiq", slot: "flyer", status: "todo" },

    /* ===== Young Pioneers ===== */
    { product: "young-pioneers", slot: "brochure-digital", format: "PDF",
      updated: "2026-04-13",
      sp: "YP FINAL Digital Brochure_compressed.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/YP/Updated Brochure - 13th Apr 2026/Digital" },
    { product: "young-pioneers", slot: "brochure-print", format: "PDF",
      updated: "2026-04-13",
      sp: "YP FINAL Print Brochure.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/YP/Updated Brochure - 13th Apr 2026/Print File" },
    { product: "young-pioneers", slot: "two-pager", status: "todo" },
    { product: "young-pioneers", slot: "product-note", status: "todo" },
    { product: "young-pioneers", slot: "deck", status: "todo" },
    { product: "young-pioneers", slot: "mou", status: "todo" },
    { product: "young-pioneers", slot: "price-list", status: "todo" },
    { product: "young-pioneers", slot: "flyer", status: "todo" },

    /* ===== Harvard Business Impact ===== */
    { product: "harvard", slot: "brochure-digital", format: "PDF",
      updated: "2026-04-29",
      sp: "HBI Bootcamp brochure - Digital_compressed.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Harvard Business Impact/Bootcampx Brochure/New Brochure/Digital" },
    { product: "harvard", slot: "brochure-print", format: "PDF",
      updated: "2026-04-29",
      sp: "HBI Bootcamp brochure - Print.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Harvard Business Impact/Bootcampx Brochure/New Brochure/Print" },
    { product: "harvard", slot: "two-pager", format: "PDF",
      updated: "2025-11-05",
      sp: "HBP 4 page course Brochure updated.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Harvard HBPE/Harvard Brochure/Harvard course brochure/Updated Harvard brochure" },
    { product: "harvard", slot: "product-note", status: "todo" },
    { product: "harvard", slot: "deck", status: "todo" },
    { product: "harvard", slot: "mou", status: "todo" },
    { product: "harvard", slot: "price-list", status: "todo" },
    { product: "harvard", slot: "flyer", status: "todo" },

    /* ===== AI Bootcamp ===== */
    { product: "ai-bootcamp", slot: "brochure-digital", status: "todo" },
    { product: "ai-bootcamp", slot: "brochure-print", status: "todo" },
    { product: "ai-bootcamp", slot: "two-pager", status: "todo" },
    { product: "ai-bootcamp", slot: "product-note", status: "todo" },
    { product: "ai-bootcamp", slot: "deck", format: "PDF",
      updated: "2025-07-11",
      sp: "Bootcamp Internal Pitch deck.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/AI/Immersions/Bootcamp/ImagineX - 2.0 Bootcamp" },
    { product: "ai-bootcamp", slot: "mou", status: "todo" },
    { product: "ai-bootcamp", slot: "price-list", status: "todo" },
    { product: "ai-bootcamp", slot: "flyer", format: "PDF",
      updated: "2025-08-25",
      sp: "AI Bootcamp Flyer-August 2025.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Ai Bootcamp/Design/A4 Flyers/ImagineX – B2C + B2B/Print" },

    /* ===== BootcampX ===== */
    { product: "bootcampx", slot: "brochure-digital", status: "todo" },
    { product: "bootcampx", slot: "brochure-print", status: "todo" },
    { product: "bootcampx", slot: "two-pager", status: "todo" },
    { product: "bootcampx", slot: "product-note", status: "todo" },
    { product: "bootcampx", slot: "deck", format: "PDF",
      updated: "2026-04-30",
      sp: "BootcampX Deck v3.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Bootcampx" },
    { product: "bootcampx", slot: "mou", status: "todo" },
    { product: "bootcampx", slot: "price-list", status: "todo" },
    { product: "bootcampx", slot: "flyer", status: "todo" },

    /* ===== Cretile ===== */
    { product: "cretile", slot: "brochure-digital", format: "PDF",
      updated: "2025-08-21",
      sp: "Cretile_Brochure_A4 (3).pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Cretile/Digital Brochure" },
    { product: "cretile", slot: "brochure-print", format: "PDF",
      updated: "2025-08-25",
      sp: "Cretile_Brochure_A4.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/Cretile/Print Files" },
    { product: "cretile", slot: "two-pager", status: "todo" },
    { product: "cretile", slot: "product-note", status: "todo" },
    { product: "cretile", slot: "deck", status: "todo" },
    { product: "cretile", slot: "mou", status: "todo" },
    { product: "cretile", slot: "price-list", status: "todo" },
    { product: "cretile", slot: "flyer", status: "todo" },

    /* ===== VideogenX ===== */
    { product: "videogenx", slot: "brochure-digital", status: "todo" },
    { product: "videogenx", slot: "brochure-print", format: "PDF",
      updated: "2026-01-26",
      sp: "Videogenx Flyer print file updated contact.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/VideogenX Flyer" },
    { product: "videogenx", slot: "two-pager", status: "todo" },
    { product: "videogenx", slot: "product-note", status: "todo" },
    { product: "videogenx", slot: "deck", status: "todo" },
    { product: "videogenx", slot: "mou", status: "todo" },
    { product: "videogenx", slot: "price-list", status: "todo" },
    { product: "videogenx", slot: "flyer", format: "PDF",
      updated: "2026-01-26",
      sp: "Videogenx Flyer front page.pdf", spPath: "/sites/GSLMarketingCollaterals-2025/Brochures Of all Programmes  New/VideogenX Flyer" },

    /* ===== Prismix ===== */
    { product: "prismix", slot: "brochure-digital", status: "todo" },
    { product: "prismix", slot: "brochure-print", status: "todo" },
    { product: "prismix", slot: "two-pager", status: "todo" },
    { product: "prismix", slot: "product-note", status: "todo" },
    { product: "prismix", slot: "deck", status: "todo" },
    { product: "prismix", slot: "mou", status: "todo" },
    { product: "prismix", slot: "price-list", status: "todo" },
    { product: "prismix", slot: "flyer", status: "todo" }
  ]
};
