// Tiny static server for previewing the hub locally:  node serve.js
const http = require("http"), fs = require("fs"), path = require("path"), url = require("url");
const ROOT = __dirname, PORT = process.env.PORT || 4321;
const MIME = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8",
  ".js":"text/javascript; charset=utf-8", ".json":"application/json", ".svg":"image/svg+xml",
  ".pdf":"application/pdf", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg",
  ".webp":"image/webp", ".zip":"application/zip", ".mp4":"video/mp4", ".woff2":"font/woff2" };
http.createServer((req, res) => {
  let p = decodeURIComponent(url.parse(req.url).pathname);
  if (p === "/") p = "/index.html";
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end("Forbidden"); return; }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, {"Content-Type":"text/plain"}).end("404 " + p); return; }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
                         "Cache-Control": "no-store" });
    res.end(buf);
  });
}).listen(PORT, () => console.log("GSL Asset Shelf → http://localhost:" + PORT));
