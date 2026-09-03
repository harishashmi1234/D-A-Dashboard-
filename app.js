/* ============================================================
   Get Set Learn — Asset Shelf
   Plain JS, no build step.
     assets.js   -> GSL_CATALOG, GSL_SLOTS, GSL_SHAREPOINT
     mandates.js -> GSL_MANDATES, GSL_FONTS, GSL_PALETTE, GSL_PLACEMENT
     roles.js    -> GSL_ADMINS, GSL_ROLES
   ============================================================ */
(function () {
  "use strict";

  var C = window.GSL_CATALOG, SLOTS = window.GSL_SLOTS, SP = window.GSL_SHAREPOINT || "";
  if (!C || !SLOTS) { console.error("[hub] assets.js did not load"); return; }

  var KEY = "gsl-hub-v2";

  /* ---------- local store ----------
     Everything a person adds lives here until it is exported into
     assets.js / mandates.js and pushed. */
  var store = load();
  function load() {
    var d = { role: null, email: "", links: {}, mandates: {}, lockups: {},
              offerings: [], mandOpen: false, history: [] };
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      Object.keys(d).forEach(function (k) { if (raw[k] != null) d[k] = raw[k]; });
    } catch (e) {}
    return d;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(store)); return true; }
    catch (e) { return false; }
  }

  /* ---------- roles ---------- */
  var ROLES = window.GSL_ROLES || {};
  function role() { return store.role || window.GSL_DEFAULT_ROLE || "manager"; }
  function can(what) { return !!((ROLES[role()] || {}).can || {})[what]; }

  function isAdminEmail(e) {
    var n = String(e || "").trim().toLowerCase();
    return (window.GSL_ADMINS || []).some(function (a) {
      return String(a).trim().toLowerCase() === n;
    });
  }

  /* ---------- download log ----------
     Written on every download click. With no server this records only what
     happens in THIS browser — accurate about who and when for one machine,
     but it cannot aggregate across the team. Swapping in a backend means
     POSTing the same record from here; nothing else changes. */
  function logDownload(meta) {
    var rec = {
      ts: new Date().toISOString(),
      email: store.email || "",
      role: role(),
      product: meta.product || "",
      item: meta.item || "",
      kind: meta.kind || "file"
    };
    store.history.push(rec);

    var cap = window.GSL_HISTORY_LIMIT || 1000;
    if (store.history.length > cap) {
      store.history = store.history.slice(store.history.length - cap);
    }
    save();

    // Where a shared log would go:
    // navigator.sendBeacon("/api/log", JSON.stringify(rec));
  }

  function stamp(ts) {
    var d = new Date(ts);
    if (isNaN(d)) return ts;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
           ", " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  }

  /* ---------- the history view ----------
     One place to answer "who took what, and when". Searchable because a
     flat log gets long fast; filters narrow it to one offering, one
     person, or downloads-only. */
  var hstate = { q: "", product: "all", who: "all", kind: "all", group: false, show: 200 };

  function historyRows() {
    var q = hstate.q.trim().toLowerCase();
    return (store.history || [])
      .filter(function (r) {
        if (hstate.product !== "all" && r.product !== hstate.product) return false;
        if (hstate.who !== "all" && (r.email || "") !== hstate.who) return false;
        if (hstate.kind === "download" && r.kind === "viewed") return false;
        if (hstate.kind === "viewed" && r.kind !== "viewed") return false;
        if (q && (r.item + " " + r.product + " " + r.email).toLowerCase().indexOf(q) === -1) return false;
        return true;
      })
      .sort(function (a, b) { return b.ts.localeCompare(a.ts); });
  }

  /* Same rows, one line per collateral item — the view you want when
     asking "which brochures are actually being used". */
  function groupRows(rows) {
    var by = {}, order = [];
    rows.forEach(function (r) {
      var k = r.product + "||" + r.item;
      if (!by[k]) {
        by[k] = { product: r.product, item: r.item, n: 0, views: 0, last: r.ts, who: {} };
        order.push(k);
      }
      var g = by[k];
      if (r.kind === "viewed") g.views++; else g.n++;
      g.who[r.email || "—"] = 1;
      if (r.ts > g.last) g.last = r.ts;
    });
    return order.map(function (k) { return by[k]; });
  }

  function historyTable() {
    var rows = historyRows();

    if (!rows.length) {
      return '<tr><td colspan="5" class="hx__none">' +
        ((store.history || []).length ? "Nothing matches those filters."
                                      : "Nothing recorded yet.") + '</td></tr>';
    }

    if (hstate.group) {
      return groupRows(rows).map(function (g) {
        return '<tr>' +
          '<td class="hx__item"><strong>' + esc(g.item) + '</strong></td>' +
          '<td>' + esc(g.product) + '</td>' +
          '<td class="hx__num">' + g.n + (g.views ? ' <em>+' + g.views + ' viewed</em>' : '') + '</td>' +
          '<td class="hx__num">' + Object.keys(g.who).length + '</td>' +
          '<td class="hx__when">' + esc(stamp(g.last)) + '</td>' +
        '</tr>';
      }).join("");
    }

    var shown = rows.slice(0, hstate.show);
    var out = shown.map(function (r) {
      return '<tr>' +
        '<td class="hx__when">' + esc(stamp(r.ts)) + '</td>' +
        '<td class="hx__who">' + esc(r.email || "— not signed in —") + '</td>' +
        '<td>' + esc(r.product) + '</td>' +
        '<td class="hx__item">' + esc(r.item) + '</td>' +
        '<td><span class="hx__kind hx__kind--' + esc(r.kind) + '">' +
          esc(r.kind === "viewed" ? "viewed" : "download") + '</span></td>' +
      '</tr>';
    }).join("");

    if (rows.length > shown.length) {
      out += '<tr><td colspan="5" class="hx__more">' +
        '<button class="chip" data-hmore>Show ' +
        Math.min(200, rows.length - shown.length) + ' more of ' +
        (rows.length - shown.length) + '</button></td></tr>';
    }
    return out;
  }

  function historyHead() {
    return hstate.group
      ? '<tr><th class="mx__h">Collateral</th><th class="mx__h">Offering</th>' +
        '<th class="mx__h">Downloads</th><th class="mx__h">People</th>' +
        '<th class="mx__h">Last taken</th></tr>'
      : '<tr><th class="mx__h">When</th><th class="mx__h">Who</th>' +
        '<th class="mx__h">Offering</th><th class="mx__h">Collateral</th>' +
        '<th class="mx__h">Type</th></tr>';
  }

  function historyCount() {
    var rows = historyRows();
    var n = hstate.group ? groupRows(rows).length : rows.length;
    return n + (hstate.group ? (n === 1 ? " item" : " items")
                             : (n === 1 ? " event" : " events"));
  }

  function renderHistory() {
    var all = store.history || [];
    var people = {}, prods = {};
    all.forEach(function (r) {
      people[r.email || ""] = 1;
      prods[r.product] = 1;
    });
    var peopleList = Object.keys(people).sort();
    var prodList = Object.keys(prods).sort();

    var opt = function (v, label, cur) {
      return '<option value="' + esc(v) + '"' + (cur === v ? " selected" : "") + '>' +
             esc(label) + '</option>';
    };

    return '' +
      '<header class="page-head">' +
        '<div class="page-head__text">' +
          '<div class="page-head__crumb overline">Admin</div>' +
          '<h1 class="page-head__title">Download history</h1>' +
          '<p class="page-head__blurb">Who took which piece of collateral, and when.</p>' +
        '</div>' +
        '<div class="kitmeter">' +
          '<div class="kitmeter__num">' + all.length + '</div>' +
          '<div class="kitmeter__label">' +
            (peopleList.length === 1 ? "1 person" : peopleList.length + " people") + '</div>' +
        '</div>' +
      '</header>' +

      '<div class="hx__warn">' +
        '<strong>This browser only.</strong> The hub has no server, so it records ' +
        'what happens here but cannot collect downloads from anyone else’s machine.' +
      '</div>' +

      '<div class="hx__controls">' +
        '<div class="hx__search">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A8A99" ' +
          'stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' +
          '<circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4.2-4.2"></path></svg>' +
          '<input id="hxQ" type="search" placeholder="Search collateral, offering or person" ' +
            'value="' + esc(hstate.q) + '" autocomplete="off">' +
        '</div>' +
        '<select id="hxProduct" aria-label="Filter by offering">' +
          opt("all", "All offerings", hstate.product) +
          prodList.map(function (p) { return opt(p, p, hstate.product); }).join("") +
        '</select>' +
        '<select id="hxWho" aria-label="Filter by person">' +
          opt("all", "Everyone", hstate.who) +
          peopleList.map(function (p) {
            return opt(p, p || "— not signed in —", hstate.who);
          }).join("") +
        '</select>' +
        '<select id="hxKind" aria-label="Filter by type">' +
          opt("all", "Downloads and views", hstate.kind) +
          opt("download", "Downloads only", hstate.kind) +
          opt("viewed", "Views only", hstate.kind) +
        '</select>' +
        '<button class="chip" data-hgroup aria-pressed="' + hstate.group + '">' +
          (hstate.group ? "Grouped by collateral" : "Every event") + '</button>' +
        '<span class="filters__spacer"></span>' +
        '<span class="filters__count" id="hxCount">' + historyCount() + '</span>' +
        (all.length ? '<button class="chip" data-hx="csv">CSV</button>' +
                      '<button class="chip" data-hx="clear">Clear</button>' : '') +
      '</div>' +

      '<div class="mx__wrap"><table class="mx hx">' +
        '<thead id="hxHead">' + historyHead() + '</thead>' +
        '<tbody id="hxBody">' + historyTable() + '</tbody>' +
      '</table></div>';
  }

  /* Redraw only the table, so typing in the search box keeps focus. */
  function refreshHistory() {
    var head = document.getElementById("hxHead"),
        body = document.getElementById("hxBody"),
        count = document.getElementById("hxCount");
    if (!body) return render();
    head.innerHTML = historyHead();
    body.innerHTML = historyTable();
    count.textContent = historyCount();
    var g = document.querySelector("[data-hgroup]");
    if (g) {
      g.setAttribute("aria-pressed", String(hstate.group));
      g.textContent = hstate.group ? "Grouped by collateral" : "Every event";
    }
  }

  function historyCsv() {
    var rows = historyRows();
    var lines = ["when,who,role,offering,collateral,type"];
    rows.forEach(function (r) {
      lines.push([r.ts, r.email, r.role, r.product, r.item,
                  r.kind === "viewed" ? "viewed" : "download"].map(function (v) {
        var s = String(v == null ? "" : v);
        return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
      }).join(","));
    });
    var blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "gsl-download-history-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  /* ---------- products (catalogue + locally added) ---------- */
  function products() { return C.products.concat(store.offerings || []); }
  var PRODUCTS = {}, SLOT = {};
  function indexProducts() {
    PRODUCTS = {};
    products().forEach(function (p) { PRODUCTS[p.id] = p; });
  }
  SLOTS.forEach(function (s) { SLOT[s.id] = s; });
  indexProducts();

  var state = { view: readHash(), filter: "all", q: "" };

  function readHash() {
    var h = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (h === "history") return can("history") ? "history" : "overview";
    return h && h !== "overview" ? h : "overview";
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function fmtDate(iso) {
    if (!iso) return "";
    var d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/['’]/g, "").replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  /* download.aspx forces a download instead of SharePoint's preview. */
  function spUrl(a) {
    if (!a) return null;
    if (a.local) return a.local;
    if (a.url) return a.url;
    if (!SP || !a.spPath || !a.sp) return null;
    return SP + "/_layouts/15/download.aspx?SourceUrl=" + encodeURIComponent(a.spPath + "/" + a.sp);
  }

  /* The plain file URL — SharePoint opens Office files in the web viewer. */
  var SP_ORIGIN = (SP.match(/^https:\/\/[^/]+/) || [""])[0];
  function viewUrl(a) {
    if (!a || a.url || a.local || !SP_ORIGIN || !a.spPath || !a.sp) return null;
    return SP_ORIGIN + encodeURI(a.spPath + "/" + a.sp);
  }

  /* A pasted SharePoint URL is rewritten so it downloads rather than previews. */
  function toDownloadUrl(url) {
    var m = url.match(/^(https:\/\/[^/]+)(\/sites\/[^/]+)\/(?!_layouts)(.+)$/i);
    if (!m || /download\.aspx/i.test(url)) return url;
    var path = url.replace(/^https:\/\/[^/]+/, "").split("?")[0];
    return m[1] + m[2] + "/_layouts/15/download.aspx?SourceUrl=" + encodeURIComponent(path);
  }

  /* ---------- build cards ---------- */
  var ALL = [];
  function build() {
    var byKey = {};
    C.assets.forEach(function (a) { byKey[a.product + "|" + a.slot] = a; });

    var out = [];
    products().forEach(function (p) {
      SLOTS.forEach(function (s) {
        var key = p.id + "|" + s.id;
        var base = byKey[key] || { product: p.id, slot: s.id };
        var extra = store.links[key];
        var a = extra ? Object.assign({}, base, extra, { local: null }) : base;

        var file = a.sp || (a.url ? decodeURIComponent(a.url).split("?")[0].split("/").pop() : null);
        var url = spUrl(a);

        out.push({
          key: key,
          product: p.id, productName: p.name, accent: p.color, tint: p.tint,
          slot: s.id, slotLabel: s.label, slotHint: s.hint,
          format: a.format || (file ? (file.split(".").pop() || "").toUpperCase() : ""),
          updated: a.updated || "", updatedLabel: fmtDate(a.updated),
          file: file, url: url, view: viewUrl(a), ready: !!url,
          added: !!extra,
          haystack: (p.name + " " + s.label + " " + (file || "")).toLowerCase()
        });
      });
    });
    ALL = out;
  }
  build();

  function coverage(pid) {
    var mine = ALL.filter(function (a) { return a.product === pid; });
    return { have: mine.filter(function (a) { return a.ready; }).length, total: mine.length };
  }

  /* ---------- mandates, merged with local additions ---------- */
  function mandate(pid) {
    var base = (window.GSL_MANDATES || {})[pid] || {};
    var m = Object.assign({}, base);
    ["lockup", "guideline", "cobranding"].forEach(function (k) {
      var extra = store.mandates[pid + "|" + k];
      if (extra) m[k] = Object.assign({}, base[k] || {}, extra, { added: true });
    });
    m.lockups = (base.lockups || []).concat(store.lockups[pid] || []);
    return m;
  }

  /* ---------- icons ---------- */
  var I_DL = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"></path><path d="M7 11l5 5 5-5"></path><path d="M5 20h14"></path></svg>';
  var I_ADD = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>';
  var I_EDIT = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4l10-10a2.8 2.8 0 0 0-4-4L4 16v4z"></path></svg>';
  var I_EYE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"></path><circle cx="12" cy="12" r="2.6"></circle></svg>';

  /* ---------- nav ---------- */
  function renderNav() {
    var html = '<div class="nav__group">' +
      '<div class="nav__label overline">Overview</div>' +
      '<button class="nav__item" data-view="overview" aria-current="' + (state.view === "overview") + '">' +
        '<span class="nav__dot" style="background:#00D8B9"></span>' +
        '<span class="nav__name">All offerings</span>' +
      '</button></div>';

    html += '<div class="nav__group"><div class="nav__label overline">Offerings</div>';
    products().forEach(function (p) {
      var c = coverage(p.id), on = state.view === p.id;
      html += '<button class="nav__item" data-view="' + esc(p.id) + '" aria-current="' + on + '">' +
                '<span class="nav__dot" style="background:' + esc(on ? "#00D8B9" : p.color) + '"></span>' +
                '<span class="nav__name">' + esc(p.name) + '</span>' +
                '<span class="nav__count' + (c.have ? " nav__count--has" : "") + '">' +
                  c.have + '/' + c.total + '</span>' +
              '</button>';
    });
    if (can("addOffering")) {
      html += '<button class="nav__add" data-new-offering>' + I_ADD + 'Add an offering</button>';
    }
    html += '</div>';

    if (can("history")) {
      var n = (store.history || []).length;
      html += '<div class="nav__group"><div class="nav__label overline">Admin</div>' +
        '<button class="nav__item" data-view="history" aria-current="' +
          (state.view === "history") + '">' +
          '<span class="nav__dot" style="background:' +
            (state.view === "history" ? "#00D8B9" : "#8A8A99") + '"></span>' +
          '<span class="nav__name">Download history</span>' +
          (n ? '<span class="nav__count nav__count--has">' + n + '</span>' : '') +
        '</button></div>';
    }
    return html;
  }

  /* ---------- kit card ---------- */
  function card(a) {
    var head =
      '<div class="card__top">' +
        '<span class="card__slot">' + esc(a.slotLabel) + '</span>' +
        (a.format ? '<span class="card__fmt">' + esc(a.format) + '</span>' : '') +
      '</div>' +
      '<p class="card__hint">' + esc(a.slotHint) + '</p>';

    if (!a.ready) {
      return '<article class="card card--todo">' + head +
        '<div class="card__todo"><span class="card__todo-tag">Yet to be designed</span></div>' +
        (can("edit")
          ? '<button class="btn-ghost-sm" data-add="' + esc(a.key) + '">' + I_ADD + 'Add link</button>'
          : '') +
      '</article>';
    }

    return '<article class="card card--ready">' + head +
      '<div class="card__file" title="' + esc(a.file) + '"><code>' + esc(a.file) + '</code></div>' +
      '<div class="card__meta-row">' +
        (a.updatedLabel ? '<span>Updated ' + esc(a.updatedLabel) + '</span>' : '') +
        (a.added ? '<span class="card__added">Added here</span>' : '') +
      '</div>' +
      '<div class="card__actions">' +
        '<a class="btn-download" href="' + esc(a.url) + '" target="_blank" rel="noopener" ' +
          'data-log="' + esc(a.productName + "||" + a.slotLabel + "||kit") + '">' +
          I_DL + 'Download</a>' +
        (a.view
          ? '<a class="btn-icon" href="' + esc(a.view) + '" target="_blank" rel="noopener" ' +
            'data-log="' + esc(a.productName + "||" + a.slotLabel + "||viewed") + '" ' +
            'title="Open in SharePoint" aria-label="Open in SharePoint">' + I_EYE + '</a>'
          : '') +
        (can("edit")
          ? '<button class="btn-icon" data-add="' + esc(a.key) + '" title="Replace link" ' +
            'aria-label="Replace link">' + I_EDIT + '</button>'
          : '') +
      '</div>' +
    '</article>';
  }

  /* ---------- mandate cards ---------- */
  function mandateFile(m, label, hint, mkey) {
    var addBtn = can("edit")
      ? '<button class="btn-ghost-sm" data-mand="' + esc(mkey) + '">' + I_ADD +
        (m && m.sp ? 'Replace link' : 'Add link') + '</button>'
      : '';

    if (!m || !m.sp) {
      return '<article class="card card--todo">' +
        '<div class="card__top"><span class="card__slot">' + esc(label) + '</span></div>' +
        '<p class="card__hint">' + esc(hint) + '</p>' +
        '<div class="card__todo"><span class="card__todo-tag">Yet to be designed</span></div>' +
        addBtn +
      '</article>';
    }

    var url = spUrl(m), v = viewUrl(m);
    var fmt = (String(m.sp).split(".").pop() || "").toUpperCase().slice(0, 5);
    return '<article class="card card--ready">' +
      '<div class="card__top">' +
        '<span class="card__slot">' + esc(label) + '</span>' +
        '<span class="card__fmt">' + esc(fmt) + '</span>' +
      '</div>' +
      '<p class="card__hint">' + esc(m.note || hint) + '</p>' +
      '<div class="card__file"><code>' + esc(m.sp) + '</code></div>' +
      (m.added ? '<div class="card__meta-row"><span class="card__added">Added here</span></div>' : '') +
      '<div class="card__actions">' +
        '<a class="btn-download" href="' + esc(url) + '" target="_blank" rel="noopener" ' +
          'data-log="' + esc((PRODUCTS[mkey.split("|")[0]] || {}).name + "||" + label + "||mandate") + '">' +
          I_DL + 'Download</a>' +
        (v ? '<a class="btn-icon" href="' + esc(v) + '" target="_blank" rel="noopener" ' +
             'data-log="' + esc((PRODUCTS[mkey.split("|")[0]] || {}).name + "||" + label + "||viewed") + '" ' +
             'title="Open in SharePoint" aria-label="Open in SharePoint">' + I_EYE + '</a>' : '') +
        (can("edit")
          ? '<button class="btn-icon" data-mand="' + esc(mkey) + '" title="Replace link" ' +
            'aria-label="Replace link">' + I_EDIT + '</button>'
          : '') +
      '</div>' +
    '</article>';
  }

  /* A lockup is a picture — showing it beats naming it. */
  function lockupsCard(pid) {
    var m = mandate(pid);
    var list = m.lockups || [];
    var addBtn = can("edit")
      ? '<button class="btn-ghost-sm" data-lockup="' + esc(pid) + '">' + I_ADD + 'Add a lockup</button>'
      : '';

    if (!list.length) {
      return '<article class="card card--todo card--span2">' +
        '<div class="card__top"><span class="card__slot">Logo lockups</span></div>' +
        '<p class="card__hint">No approved lockup for this offering yet.</p>' +
        '<div class="card__todo"><span class="card__todo-tag">Yet to be designed</span></div>' +
        addBtn +
      '</article>';
    }

    var pname = (PRODUCTS[pid] || {}).name || pid;
    var items = list.map(function (l) {
      // Show a small thumbnail, hand over the full-resolution file. The
      // masters are 8000px wide — rendering those directly locks the page up.
      var thumb = /\.png$/i.test(l.file) ? l.file.replace(/\.png$/i, "-thumb.png") : l.file;
      var isRemote = /^https?:/i.test(l.file);
      return '<li class="lk' + (l.dark ? " lk--dark" : "") + '">' +
        '<a class="lk__art" href="' + esc(l.file) + '" target="_blank" rel="noopener" ' +
          'title="Open ' + esc(l.name) + ' at full size">' +
          (isRemote
            ? '<span class="lk__noart">' + I_EYE + '</span>'
            : '<img src="' + esc(thumb) + '" alt="' + esc(l.name) + '" loading="lazy" decoding="async">') +
        '</a>' +
        '<div class="lk__meta">' +
          '<span class="lk__name">' + esc(l.name) +
            (l.added ? ' <em class="lk__added">added</em>' : '') + '</span>' +
          '<span class="lk__use">' + esc(l.usage || "") + '</span>' +
          '<span class="lk__acts">' +
            '<a class="lk__dl" href="' + esc(l.file) + '"' +
              (isRemote ? ' target="_blank" rel="noopener"' : ' download') +
              ' data-log="' + esc(pname + "||" + l.name + "||lockup") + '">' +
              I_DL + (isRemote ? 'Open' : 'PNG') + '</a>' +
            (l.vector
              ? '<a class="lk__dl" href="' + esc(l.vector) + '" download ' +
                'data-log="' + esc(pname + "||" + l.name + " (SVG)||lockup") + '">' + I_DL + 'SVG</a>'
              : '') +
          '</span>' +
        '</div>' +
      '</li>';
    }).join("");

    var placement = (window.GSL_PLACEMENT || []).map(function (p) {
      return '<li><strong>' + esc(p.name) + '</strong> ' + esc(p.rule) + '</li>';
    }).join("");

    return '<article class="card card--span2">' +
      '<div class="card__top">' +
        '<span class="card__slot">Logo lockups</span>' +
        '<span class="card__fmt">' + list.length + '</span>' +
      '</div>' +
      '<p class="card__warn">' + esc(window.GSL_LOCKUP_RULE || "") + '</p>' +
      (m.lockupNote ? '<p class="card__hint card__hint--note">' + esc(m.lockupNote) + '</p>' : '') +
      '<ul class="lockups">' + items + '</ul>' +
      (placement ? '<ul class="placement">' + placement + '</ul>' : '') +
      addBtn +
    '</article>';
  }

  function fontsCard() {
    var rows = (window.GSL_FONTS || []).map(function (f) {
      return '<li class="fontrow">' +
        '<span class="fontrow__sample" style="font-family:' + f.css + ';font-weight:' + f.weight + '">Aa</span>' +
        '<span class="fontrow__body">' +
          '<span class="fontrow__name">' + esc(f.name) +
            (f.substitute ? ' <em>→ ' + esc(f.substitute) + '</em>' : '') + '</span>' +
          '<span class="fontrow__role">' + esc(f.role) + '</span>' +
          '<span class="fontrow__note">' + esc(f.note) + '</span>' +
        '</span>' +
        (f.url ? '<a class="fontrow__get" href="' + esc(f.url) + '" target="_blank" rel="noopener">Get</a>'
               : '<span class="fontrow__lic">Licensed</span>') +
      '</li>';
    }).join("");

    return '<article class="card card--wide">' +
      '<div class="card__top"><span class="card__slot">Typefaces</span></div>' +
      '<p class="card__hint">Four faces, fixed roles. Never substitute outside this list.</p>' +
      '<ul class="fontlist">' + rows + '</ul>' +
    '</article>';
  }

  function coloursCard(pid) {
    var m = mandate(pid);
    var swatches = (window.GSL_PALETTE || []).slice();
    if (m.accent) swatches.push(m.accent);

    var chips = swatches.map(function (s) {
      return '<li class="sw' + (s.light ? " sw--light" : "") + '">' +
        '<button class="sw__chip" style="background:' + esc(s.hex) + '" ' +
          'data-copy="' + esc(s.hex) + '" title="Copy ' + esc(s.hex) + '"></button>' +
        '<span class="sw__name">' + esc(s.name) + '</span>' +
        '<span class="sw__hex">' + esc(s.hex) + '</span>' +
        '<span class="sw__role">' + esc(s.role) + '</span>' +
      '</li>';
    }).join("");

    return '<article class="card card--wide">' +
      '<div class="card__top"><span class="card__slot">Colours</span></div>' +
      '<p class="card__hint">Click a swatch to copy its hex.' +
        (m.accent ? ' The accent is this offering only — the four core colours are on everything.' : '') +
      '</p>' +
      '<ul class="swatches">' + chips + '</ul>' +
    '</article>';
  }

  function renderMandates(pid) {
    var m = mandate(pid);
    var cards =
      lockupsCard(pid) +
      fontsCard() +
      coloursCard(pid) +
      mandateFile(m.guideline, "Design guideline",
        "How this offering is allowed to look — layout, imagery, tone.", pid + "|guideline") +
      (pid === "gsl"
        ? mandateFile(m.cobranding, "Co-branding guideline",
            "Rules for pairing the GSL mark with a partner logo.", pid + "|cobranding")
        : "");

    var missing = [];
    if (!(m.lockups && m.lockups.length)) missing.push("lockup");
    if (!m.guideline) missing.push("design guideline");
    if (pid === "gsl" && !m.cobranding) missing.push("co-branding guideline");

    var open = !!store.mandOpen;

    return '<section class="section section--mandates">' +
      '<button class="mand__bar" id="mandToggle" aria-expanded="' + open + '" aria-controls="mandBody">' +
        '<span class="mand__chev" aria-hidden="true">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
          'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M9 6l6 6-6 6"></path></svg>' +
        '</span>' +
        '<span class="mand__title">Brand mandates</span>' +
        '<span class="mand__sub">Lockups · typefaces · colours · guidelines</span>' +
        '<span class="mand__spacer"></span>' +
        (missing.length
          ? '<span class="mand__flag">' + missing.length + ' missing</span>'
          : '<span class="mand__flag mand__flag--ok">Complete</span>') +
      '</button>' +
      '<div class="mand__body" id="mandBody"' + (open ? '' : ' hidden') + '>' +
        '<p class="mand__note">Non-negotiable. Everything below has to obey these.</p>' +
        '<div class="grid grid--mandates">' + cards + '</div>' +
      '</div>' +
    '</section>';
  }

  /* ---------- pages ---------- */
  function renderProduct(pid) {
    var p = PRODUCTS[pid], c = coverage(pid);
    var list = ALL.filter(function (a) { return a.product === pid; });
    if (state.filter === "ready") list = list.filter(function (a) { return a.ready; });
    if (state.filter === "todo") list = list.filter(function (a) { return !a.ready; });
    var pct = Math.round((c.have / c.total) * 100);

    return '' +
      '<header class="page-head">' +
        '<div class="page-head__text">' +
          '<div class="page-head__crumb overline">Collateral kit' +
            (p.added ? ' · added here' : '') + '</div>' +
          '<h1 class="page-head__title">' + esc(p.name) + '</h1>' +
          '<p class="page-head__blurb">' + esc(p.blurb) + '</p>' +
          // Only offerings added from the hub can be removed here; the
          // catalogue ones live in assets.js and are removed by editing it.
          (p.added && can("addOffering")
            ? '<button class="btn-remove" data-del-offering="' + esc(p.id) + '">' +
              'Remove this offering</button>'
            : '') +
        '</div>' +
        '<div class="kitmeter">' +
          '<div class="kitmeter__num">' + c.have + '<span>/' + c.total + '</span></div>' +
          '<div class="kitmeter__label">kit complete</div>' +
          '<div class="kitmeter__bar"><i style="width:' + pct + '%;background:' + esc(p.color) + '"></i></div>' +
        '</div>' +
      '</header>' +
      renderMandates(pid) +
      '<section class="section">' +
        filterBar(list.length) +
        '<div class="grid">' + list.map(card).join("") + '</div>' +
        (list.length ? "" : '<div class="empty"><h3>Nothing matches</h3></div>') +
      '</section>';
  }

  function renderOverview() {
    var totalHave = ALL.filter(function (a) { return a.ready; }).length;

    var head = '<tr><th class="mx__corner">Offering</th>' +
      SLOTS.map(function (s) {
        return '<th class="mx__h"><span>' + esc(s.label.replace(/ — /g, " ")) + '</span></th>';
      }).join("") + '<th class="mx__h mx__h--tot">Kit</th></tr>';

    var body = products().map(function (p) {
      var c = coverage(p.id);
      var cells = SLOTS.map(function (s) {
        var a = ALL.filter(function (x) { return x.product === p.id && x.slot === s.id; })[0];
        if (a && a.ready) {
          return '<td class="mx__c mx__c--ok"><a href="' + esc(a.url) + '" target="_blank" rel="noopener" ' +
                 'data-log="' + esc(p.name + "||" + s.label + "||kit") + '" ' +
                 'title="' + esc(a.file) + '">' + I_DL + '</a></td>';
        }
        return '<td class="mx__c mx__c--no">' +
          (can("edit")
            ? '<button data-add="' + esc(p.id + "|" + s.id) + '" title="Yet to be designed — add a link">+</button>'
            : '<span class="mx__dash" title="Yet to be designed">–</span>') +
          '</td>';
      }).join("");
      return '<tr>' +
        '<th class="mx__row"><a href="#' + esc(p.id) + '">' +
          '<span class="mx__dot" style="background:' + esc(p.color) + '"></span>' + esc(p.name) +
        '</a></th>' + cells +
        '<td class="mx__c mx__tot">' + c.have + '/' + c.total + '</td></tr>';
    }).join("");

    return '' +
      '<header class="page-head">' +
        '<div class="page-head__text">' +
          '<div class="page-head__crumb overline">Asset shelf</div>' +
          '<h1 class="page-head__title">What we can send a school today</h1>' +
          '<p class="page-head__blurb">Every offering, every piece of collateral. ' +
            'A tick downloads it; a gap means it has not been designed yet.</p>' +
        '</div>' +
        '<div class="kitmeter">' +
          '<div class="kitmeter__num">' + totalHave + '<span>/' + ALL.length + '</span></div>' +
          '<div class="kitmeter__label">across all offerings</div>' +
          '<div class="kitmeter__bar"><i style="width:' +
            Math.round(totalHave / ALL.length * 100) + '%;background:#00D8B9"></i></div>' +
        '</div>' +
      '</header>' +
      '<div class="mx__wrap"><table class="mx">' + head + body + '</table></div>' +
      '<p class="mx__note">Gaps are the point of this view — a product note, MoU or ' +
        'price list does not exist for any offering yet.</p>' +
      (can("addOffering")
        ? '<button class="btn-solid mx__new" data-new-offering>' + I_ADD + 'Add an offering</button>'
        : '');
  }

  function renderSearch() {
    var q = state.q.trim().toLowerCase();
    var list = ALL.filter(function (a) { return a.haystack.indexOf(q) !== -1; });
    if (state.filter === "ready") list = list.filter(function (a) { return a.ready; });
    if (state.filter === "todo") list = list.filter(function (a) { return !a.ready; });

    return '' +
      '<header class="page-head">' +
        '<div class="page-head__text">' +
          '<div class="page-head__crumb overline">Search · all offerings</div>' +
          '<h1 class="page-head__title">“' + esc(state.q.trim()) + '”</h1>' +
        '</div>' +
      '</header>' +
      filterBar(list.length) +
      '<div class="grid">' + list.map(function (a) {
        return card(a).replace('<div class="card__top">',
          '<div class="card__top"><span class="card__prod" style="background:' + esc(a.tint) +
          ';color:' + esc(a.accent) + '">' + esc(a.productName) + '</span>');
      }).join("") + '</div>' +
      (list.length ? "" : '<div class="empty"><h3>Nothing matches</h3>' +
        '<p>Try an offering name, or a file name.</p></div>');
  }

  function filterBar(n) {
    var f = [["all", "All"], ["ready", "Ready"], ["todo", "Yet to be designed"]];
    return '<div class="filters">' +
      f.map(function (x) {
        return '<button class="chip" data-filter="' + x[0] + '" aria-pressed="' +
               (state.filter === x[0]) + '">' + x[1] + '</button>';
      }).join("") +
      '<span class="filters__spacer"></span>' +
      '<span class="filters__count">' + n + (n === 1 ? " item" : " items") + '</span>' +
    '</div>';
  }

  /* ---------- render ---------- */
  var el = {};
  function render() {
    indexProducts();
    var special = state.view === "overview" || (state.view === "history" && can("history"));
    if (!PRODUCTS[state.view] && !special) state.view = "overview";

    el.nav.innerHTML = renderNav();
    if (state.view === "history") el.main.innerHTML = renderHistory();
    else if (state.q.trim()) el.main.innerHTML = renderSearch();
    else if (state.view === "overview") el.main.innerHTML = renderOverview();
    else el.main.innerHTML = renderProduct(state.view);

    // role chip
    var r = ROLES[role()] || {};
    el.role.innerHTML =
      '<span class="rolechip rolechip--' + esc(role()) + '">' + esc(r.label || role()) + '</span>' +
      (store.email ? '<span class="rolechip__who">' + esc(store.email) + '</span>' : '') +
      '<button class="rolechip__btn" data-signin>' + (store.role ? "Switch" : "Sign in") + '</button>';

    var n = pendingCount();
    el.export.hidden = !(can("export") && n > 0);
    el.export.textContent = "Export " + n + " change" + (n === 1 ? "" : "s");

    document.title = (state.view === "overview" ? "Asset Shelf"
                     : state.view === "history" ? "Download history"
                     : (PRODUCTS[state.view] || {}).name) + " · GSL";
  }

  function pendingCount() {
    return Object.keys(store.links).length +
           Object.keys(store.mandates).length +
           Object.keys(store.lockups).reduce(function (a, k) { return a + store.lockups[k].length; }, 0) +
           (store.offerings || []).length;
  }

  /* ---------- dialogs ---------- */
  var dlgMode = null, dlgTarget = null;

  function openDialog(mode, target, opts) {
    if (!can("edit")) return;
    dlgMode = mode; dlgTarget = target;
    opts = opts || {};
    el.dlgSub.textContent = opts.sub || "";
    el.dlgTitle.textContent = opts.title || "";
    el.dlgHelp.innerHTML = opts.help || "";
    el.dlgErr.hidden = true;
    el.dlgExtra.innerHTML = opts.extra || "";
    el.dlgExtra.hidden = !opts.extra;
    el.dlgUrl.value = opts.value || "";
    el.dlgUrl.placeholder = opts.placeholder || "https://…";
    el.dlgUrlRow.hidden = !!opts.noUrl;
    el.dlgRemove.hidden = !opts.canRemove;
    el.dlg.hidden = false;
    setTimeout(function () {
      var first = el.dlgExtra.querySelector("input");
      (opts.noUrl && first ? first : el.dlgUrl).focus();
    }, 30);
  }

  function closeDialog() { el.dlg.hidden = true; dlgMode = null; dlgTarget = null; }
  function showErr(msg) { el.dlgErr.textContent = msg; el.dlgErr.hidden = false; }

  function openKitLink(key) {
    var p = key.split("|"), cur = store.links[key];
    openDialog("kit", key, {
      sub: (PRODUCTS[p[0]] || {}).name,
      title: (SLOT[p[1]] || {}).label,
      help: "Paste the SharePoint link to the file. Open it in SharePoint, use " +
            "<strong>Copy link</strong> or the address bar, and paste it here.",
      value: cur ? cur.url : "",
      canRemove: !!cur,
      placeholder: "https://maftechnologies.sharepoint.com/sites/…"
    });
  }

  function openMandate(mkey) {
    var p = mkey.split("|"), kind = p[1];
    var labels = { guideline: "Design guideline", cobranding: "Co-branding guideline" };
    var cur = store.mandates[mkey];
    openDialog("mandate", mkey, {
      sub: (PRODUCTS[p[0]] || {}).name,
      title: labels[kind] || kind,
      help: "Paste the SharePoint link to the document.",
      value: cur ? cur.url : "",
      canRemove: !!cur,
      placeholder: "https://maftechnologies.sharepoint.com/sites/…"
    });
  }

  function openLockup(pid) {
    openDialog("lockup", pid, {
      sub: (PRODUCTS[pid] || {}).name,
      title: "Add a logo lockup",
      help: "Paste the SharePoint link to the lockup file, then say what it is " +
            "and when to use it.",
      placeholder: "https://maftechnologies.sharepoint.com/sites/…",
      extra:
        '<label class="dlg__lab">Name<input class="dlg__input" data-f="name" ' +
          'placeholder="e.g. Partner × GSL — reversed"></label>' +
        '<label class="dlg__lab">When to use it<textarea class="dlg__input" data-f="usage" rows="2" ' +
          'placeholder="e.g. Use for all communications featuring the partnership."></textarea></label>' +
        '<label class="dlg__check"><input type="checkbox" data-f="dark"> ' +
          'Reversed artwork — show on a dark tile</label>'
    });
  }

  function openOffering() {
    if (!can("addOffering")) return;
    openDialog("offering", null, {
      sub: "New offering",
      title: "Add a partner or programme",
      help: "It appears in the sidebar and the overview with all " + SLOTS.length +
            " kit slots empty, ready to fill.",
      noUrl: true,
      extra:
        '<label class="dlg__lab">Name<input class="dlg__input" data-f="name" ' +
          'placeholder="e.g. Acme Robotics"></label>' +
        '<label class="dlg__lab">One line about it<textarea class="dlg__input" data-f="blurb" rows="2" ' +
          'placeholder="What it is, who it is for."></textarea></label>' +
        '<label class="dlg__lab">Accent colour' +
          '<span class="dlg__colour"><input type="color" data-f="color" value="#073393">' +
          '<span class="dlg__colour-hint">Shows as the dot in the sidebar and the kit bar.</span></span>' +
        '</label>'
    });
  }

  function field(name) {
    var e = el.dlgExtra.querySelector('[data-f="' + name + '"]');
    if (!e) return "";
    return e.type === "checkbox" ? e.checked : e.value.trim();
  }

  function saveDialog() {
    if (dlgMode === "offering") return saveOffering();

    var url = el.dlgUrl.value.trim();
    if (!url) return showErr("Paste a link first.");
    if (!/^https:\/\//i.test(url)) return showErr("The link must start with https://");

    var name = decodeURIComponent(url).split("?")[0].split("/").pop() || "linked file";
    var rec = {
      url: toDownloadUrl(url),
      sp: name,
      format: (name.split(".").pop() || "").toUpperCase().slice(0, 5),
      updated: new Date().toISOString().slice(0, 10)
    };

    if (dlgMode === "kit") {
      store.links[dlgTarget] = rec;
    } else if (dlgMode === "mandate") {
      store.mandates[dlgTarget] = rec;
    } else if (dlgMode === "lockup") {
      var nm = field("name");
      if (!nm) return showErr("Give the lockup a name.");
      store.lockups[dlgTarget] = store.lockups[dlgTarget] || [];
      store.lockups[dlgTarget].push({
        name: nm, usage: field("usage"), dark: !!field("dark"),
        file: rec.url, added: true
      });
    }

    if (!save()) return showErr("Could not save — your browser is blocking storage.");
    build(); closeDialog(); render();
  }

  function saveOffering() {
    var name = field("name");
    if (!name) return showErr("Give the offering a name.");
    var id = slug(name);
    if (!id) return showErr("That name has no usable letters or numbers.");
    if (PRODUCTS[id]) return showErr("An offering called “" + name + "” already exists.");

    var color = field("color") || "#073393";
    store.offerings.push({
      id: id, name: name, color: color,
      tint: tintFor(color),
      blurb: field("blurb") || "Added from the hub. Fill in the kit and mandates.",
      added: true
    });
    if (!save()) return showErr("Could not save — your browser is blocking storage.");
    build(); closeDialog();
    state.view = id;
    history.replaceState(null, "", "#" + id);
    render();
  }

  /* A pale wash of the accent, so cards and tags match the offering. */
  function tintFor(hex) {
    var m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return "#EAF0FF";
    var n = parseInt(m[1], 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    var mix = function (c) { return Math.round(c + (255 - c) * 0.88); };
    return "#" + [mix(r), mix(g), mix(b)].map(function (c) {
      return c.toString(16).padStart(2, "0");
    }).join("").toUpperCase();
  }

  /* Removing an offering also drops anything attached to it, so nothing is
     left orphaned in storage pointing at an id that no longer exists. */
  function removeOffering(pid) {
    if (!can("addOffering")) return;
    var p = PRODUCTS[pid];
    if (!p || !p.added) return;
    if (!window.confirm("Remove “" + p.name + "” and anything added to it?")) return;

    store.offerings = (store.offerings || []).filter(function (o) { return o.id !== pid; });
    Object.keys(store.links).forEach(function (k) {
      if (k.split("|")[0] === pid) delete store.links[k];
    });
    Object.keys(store.mandates).forEach(function (k) {
      if (k.split("|")[0] === pid) delete store.mandates[k];
    });
    delete store.lockups[pid];

    save(); build();
    state.view = "overview";
    history.replaceState(null, "", "#overview");
    render();
  }

  function removeDialog() {
    if (dlgMode === "kit") delete store.links[dlgTarget];
    else if (dlgMode === "mandate") delete store.mandates[dlgTarget];
    save(); build(); closeDialog(); render();
  }

  /* ---------- sign in ---------- */
  function openSignIn() {
    el.siEmail.value = store.email || "";
    el.siErr.hidden = true;
    el.siOut.hidden = !store.role;
    el.si.hidden = false;
    setTimeout(function () { el.siEmail.focus(); }, 30);
  }

  function doSignIn() {
    var e = el.siEmail.value.trim();
    if (!e) { el.siErr.textContent = "Enter your work email."; el.siErr.hidden = false; return; }
    store.email = e;
    store.role = isAdminEmail(e) ? "admin" : "manager";
    save();
    el.si.hidden = true;
    render();
  }

  function doSignOut() {
    store.role = null; store.email = "";
    save(); el.si.hidden = true; render();
  }

  /* ---------- export ---------- */
  function exportSnippet() {
    if (!can("export")) return;
    var out = [];

    if ((store.offerings || []).length) {
      out.push("/* ---- assets.js -> products ---- */");
      store.offerings.forEach(function (p) {
        out.push('    { id: "' + p.id + '", name: "' + q(p.name) + '", color: "' + p.color +
                 '", tint: "' + p.tint + '",\n      blurb: "' + q(p.blurb) + '" },');
      });
      out.push("");
    }

    if (Object.keys(store.links).length) {
      out.push("/* ---- assets.js -> assets (replace the matching rows) ---- */");
      Object.keys(store.links).forEach(function (k) {
        var a = store.links[k], p = k.split("|");
        out.push('    { product: "' + p[0] + '", slot: "' + p[1] + '", format: "' + a.format + '",\n' +
                 '      updated: "' + a.updated + '",\n' +
                 '      sp: "' + q(a.sp) + '", url: "' + q(a.url) + '" },');
      });
      out.push("");
    }

    if (Object.keys(store.mandates).length) {
      out.push("/* ---- mandates.js -> the matching product ---- */");
      Object.keys(store.mandates).forEach(function (k) {
        var a = store.mandates[k], p = k.split("|");
        out.push('    // ' + p[0] + ':');
        out.push('    ' + p[1] + ': { sp: "' + q(a.sp) + '", url: "' + q(a.url) + '" },');
      });
      out.push("");
    }

    var lkKeys = Object.keys(store.lockups).filter(function (k) { return store.lockups[k].length; });
    if (lkKeys.length) {
      out.push("/* ---- mandates.js -> lockups[] on the matching product ---- */");
      lkKeys.forEach(function (pid) {
        out.push('    // ' + pid + ':');
        store.lockups[pid].forEach(function (l) {
          out.push('      { file: "' + q(l.file) + '", name: "' + q(l.name) + '",' +
                   (l.dark ? ' dark: true,' : '') +
                   '\n        usage: "' + q(l.usage) + '" },');
        });
      });
    }

    el.exportText.value =
      "// Paste each block into the file named above it, then commit and push.\n" +
      "// Until you do, these changes exist only in your browser.\n\n" +
      out.join("\n");
    el.exportDlg.hidden = false;
    el.exportText.select();
  }
  function q(s) { return String(s == null ? "" : s).replace(/\\/g, "\\\\").replace(/"/g, '\\"'); }

  /* ---------- copy hex ---------- */
  function copyHex(btn) {
    var hex = btn.getAttribute("data-copy");
    var t = document.createElement("textarea");
    t.value = hex; t.setAttribute("readonly", "");
    t.style.cssText = "position:absolute;left:-9999px";
    document.body.appendChild(t); t.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(t);

    var li = btn.closest(".sw"); if (!li) return;
    var label = li.querySelector(".sw__hex"), was = label.textContent;
    label.textContent = ok ? "Copied" : hex;
    label.classList.toggle("sw__hex--ok", ok);
    setTimeout(function () { label.textContent = was; label.classList.remove("sw__hex--ok"); }, 1200);
  }

  /* ---------- events ---------- */
  function wire() {
    document.addEventListener("click", function (e) {
      // Log before anything else — the link may navigate away immediately.
      var lg = e.target.closest("[data-log]");
      if (lg) {
        var p = lg.getAttribute("data-log").split("||");
        logDownload({ product: p[0], item: p[1], kind: p[2] });
        if (state.view === "history") setTimeout(refreshHistory, 60);
      }

      if (e.target.closest("[data-hgroup]")) {
        hstate.group = !hstate.group; hstate.show = 200; refreshHistory(); return;
      }
      if (e.target.closest("[data-hmore]")) {
        hstate.show += 200; refreshHistory(); return;
      }
      var hx = e.target.closest("[data-hx]");
      if (hx) {
        var act = hx.getAttribute("data-hx");
        if (act === "csv") historyCsv();
        if (act === "clear" && window.confirm("Clear the download log on this browser?")) {
          store.history = []; save(); render();
        }
        return;
      }

      var nav = e.target.closest("[data-view]");
      if (nav) {
        state.view = nav.getAttribute("data-view");
        state.q = ""; el.search.value = ""; state.filter = "all";
        history.replaceState(null, "", "#" + state.view);
        setDrawer(false); render(); window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      var f = e.target.closest("[data-filter]");
      if (f) { state.filter = f.getAttribute("data-filter"); render(); return; }

      if (e.target.closest("[data-new-offering]")) { openOffering(); return; }

      var del = e.target.closest("[data-del-offering]");
      if (del) { removeOffering(del.getAttribute("data-del-offering")); return; }

      var add = e.target.closest("[data-add]");
      if (add) { openKitLink(add.getAttribute("data-add")); return; }

      var mand = e.target.closest("[data-mand]");
      if (mand) { openMandate(mand.getAttribute("data-mand")); return; }

      var lk = e.target.closest("[data-lockup]");
      if (lk) { openLockup(lk.getAttribute("data-lockup")); return; }

      if (e.target.closest("[data-signin]")) { openSignIn(); return; }

      var copy = e.target.closest("[data-copy]");
      if (copy) { copyHex(copy); return; }

      // Toggle in place — re-rendering would scroll the page back to the top.
      var mt = e.target.closest("#mandToggle");
      if (mt) {
        var body = document.getElementById("mandBody");
        var open = body.hidden;
        body.hidden = !open;
        mt.setAttribute("aria-expanded", String(open));
        store.mandOpen = open; save();
        return;
      }
    });

    // History controls live inside the rendered page, so they are bound by
    // delegation and update only the table — typing keeps focus.
    var ht;
    document.addEventListener("input", function (e) {
      if (e.target.id !== "hxQ") return;
      var v = e.target.value;
      clearTimeout(ht);
      ht = setTimeout(function () { hstate.q = v; hstate.show = 200; refreshHistory(); }, 120);
    });
    document.addEventListener("change", function (e) {
      var m = { hxProduct: "product", hxWho: "who", hxKind: "kind" }[e.target.id];
      if (!m) return;
      hstate[m] = e.target.value; hstate.show = 200; refreshHistory();
    });

    var t;
    el.search.addEventListener("input", function (e) {
      var v = e.target.value;
      clearTimeout(t);
      t = setTimeout(function () { state.q = v; state.filter = "all"; render(); }, 120);
    });

    el.toggle.addEventListener("click", function () {
      setDrawer(el.sidebar.getAttribute("data-open") !== "true");
    });
    el.scrim.addEventListener("click", function () { setDrawer(false); });

    el.dlgSave.addEventListener("click", saveDialog);
    el.dlgCancel.addEventListener("click", closeDialog);
    el.dlgRemove.addEventListener("click", removeDialog);
    el.dlgUrl.addEventListener("keydown", function (e) { if (e.key === "Enter") saveDialog(); });
    el.dlg.addEventListener("click", function (e) { if (e.target === el.dlg) closeDialog(); });

    el.siGo.addEventListener("click", doSignIn);
    el.siOut.addEventListener("click", doSignOut);
    el.siCancel.addEventListener("click", function () { el.si.hidden = true; });
    el.siEmail.addEventListener("keydown", function (e) { if (e.key === "Enter") doSignIn(); });
    el.si.addEventListener("click", function (e) { if (e.target === el.si) el.si.hidden = true; });

    el.export.addEventListener("click", exportSnippet);
    el.exportClose.addEventListener("click", function () { el.exportDlg.hidden = true; });
    el.exportCopy.addEventListener("click", function () {
      el.exportText.select();
      try { document.execCommand("copy"); el.exportCopy.textContent = "Copied"; } catch (err) {}
      setTimeout(function () { el.exportCopy.textContent = "Copy"; }, 1400);
    });
    el.exportDlg.addEventListener("click", function (e) {
      if (e.target === el.exportDlg) el.exportDlg.hidden = true;
    });

    window.addEventListener("hashchange", function () {
      var v = readHash();
      if (v !== state.view) { state.view = v; state.q = ""; el.search.value = ""; render(); }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        if (!el.dlg.hidden) closeDialog();
        else if (!el.si.hidden) el.si.hidden = true;
        else if (!el.exportDlg.hidden) el.exportDlg.hidden = true;
        else setDrawer(false);
      }
      if (e.key === "/" && document.activeElement !== el.search &&
          el.dlg.hidden && el.si.hidden) {
        e.preventDefault(); el.search.focus();
      }
    });
  }

  function setDrawer(open) {
    el.sidebar.setAttribute("data-open", String(open));
    el.scrim.setAttribute("data-open", String(open));
    el.toggle.setAttribute("aria-expanded", String(open));
  }

  /* ---------- boot ---------- */
  ["nav", "main", "search", "sidebar", "scrim", "toggle", "export", "role",
   "dlg", "dlgTitle", "dlgSub", "dlgHelp", "dlgUrl", "dlgUrlRow", "dlgExtra",
   "dlgErr", "dlgSave", "dlgCancel", "dlgRemove",
   "si", "siEmail", "siErr", "siGo", "siOut", "siCancel",
   "exportDlg", "exportText", "exportCopy", "exportClose"].forEach(function (k) {
    el[k] = document.getElementById(k);
  });

  wire();
  history.replaceState(null, "", "#" + state.view);
  render();
})();
