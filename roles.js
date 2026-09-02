/* ============================================================
   Get Set Learn — Sales Asset Hub · ROLES
   ------------------------------------------------------------
   WHAT THIS IS
     A guard rail, not a lock. The hub is a static site with no
     server, so the role lives in the visitor's own browser.
     It stops a manager changing the catalogue by accident. It
     does NOT stop anyone who opens developer tools.

     Nothing here is secret: every file the hub links to is
     already protected by SharePoint's own permissions, which
     are enforced server-side no matter what this file says.

   TO MAKE THIS REAL
     Turn on Vercel Deployment Protection (whole-site gate), or
     put the site behind Microsoft Entra ID so roles come from
     your existing directory. See README.

   ADDING AN ADMIN
     Add the email below, commit, push. Matching is
     case-insensitive and ignores surrounding spaces.
   ============================================================ */

window.GSL_ADMINS = [
  "gslclaude@getsetlearn.info"
];

/* What each role may do. Managers get everything except change. */
window.GSL_ROLES = {
  admin: {
    label: "Admin",
    can: { view: true, download: true, edit: true, addOffering: true, export: true },
    blurb: "Can add offerings, attach links and edit mandates."
  },
  manager: {
    label: "Manager",
    can: { view: true, download: true, edit: false, addOffering: false, export: false },
    blurb: "Can view and download everything. Cannot change the catalogue."
  }
};

/* Signed-out visitors get manager rights — the hub is useful immediately,
   and nothing it exposes is more sensitive than the SharePoint behind it. */
window.GSL_DEFAULT_ROLE = "manager";
