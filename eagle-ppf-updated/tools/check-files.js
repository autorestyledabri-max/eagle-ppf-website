/**
 * tools/check-files.js — project poora hai ya kuch file chhoot gayi, ye batata hai.
 * Chalane ka tareeka:   node tools/check-files.js
 *
 * GitHub se download / clone karne ke baad sabse pehle ise chalao. Agar upload
 * me koi folder chhoot gaya hoga (web upload me aksar ho jata hai), to ye
 * turant naam ke saath bata dega.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const REQUIRED = [
  ["index.html",                  "page shell — iske bina kuch nahi chalega"],
  ["assets/css/style.css",        "poora design — iske bina site bina styling ke dikhegi"],
  ["assets/js/data.js",           "saara content — iske bina page blank aayega"],
  ["assets/js/app.js",            "pages aur form ka logic"],
  ["assets/img/eagle-mark.png",   "logo (header, cards, WhatsApp)"],
  ["assets/img/eagle-lockup.png", "purana footer logo (backup)"],
  ["assets/img/eagle-lockup-chrome.png", "footer ka logo"],
  ["assets/img/cta-band-bg.jpg",         "CTA band (Tell us about the car) ka background"],
  ["assets/img/about-eagle-range.jpg",  "home > About Eagle PPF ki photo (product range, correct branding)"],
  ["assets/img/products/graphene-coating-v2.jpg",   "Graphene Coating ki photo (correct branding)"],
  ["assets/img/products/precut-1.jpg",   "Precut PPF photo 1 (box) — Precut page"],
  ["assets/img/products/precut-2.jpg",   "Precut PPF photo 2 (packaging detail, niche wali) — Precut page"],
  ["assets/img/products/precut-card.jpg", "Precut PPF home card thumbnail (poora composite)"],
  ["functions/api/enquiry.js",    "backend email handler (deploy ke baad kaam aayega)"],
  ["tools/smoke.js",              "site test script"],
  ["README.md",                   "documentation"],
  ["SETUP.md",                    "GitHub + VS Code + localhost guide"],
  [".gitignore",                  "secret files ko git se door rakhta hai"],
  ["favicon.ico",                 "browser tab icon"],
  ["apple-touch-icon.png",        "iPhone/iPad home screen icon"],
  ["android-chrome-192x192.png",  "Android icon"],
  ["android-chrome-512x512.png",  "Android / install icon"],
  ["site.webmanifest",            "app icons ki list (Android, Chrome, Edge)"],
  ["404.html",                    "asli 404 page — iske bina Cloudflare galat URL par homepage deta hai (Google favicon issue)"],
  ["robots.txt",                  "SEO"],
  ["sitemap.xml",                 "SEO"],
];

const OPTIONAL = [
  ["run-local.bat",          "Windows one-click server"],
  ["run-local.sh",           "Mac/Linux server"],
  [".vscode/tasks.json",     "VS Code me Ctrl+Shift+B se server"],
  [".vscode/settings.json",  "VS Code settings"],
  [".dev.vars.example",      "backend env ka sample"],
];

let missing = 0;
let warnings = 0;

console.log("\n  EAGLE PPF — file check");
console.log("  " + "-".repeat(58) + "\n");

for (const [file, why] of REQUIRED) {
  const full = path.join(ROOT, file);
  if (fs.existsSync(full) && fs.statSync(full).size > 0) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file}   <-- MISSING (${why})`);
    missing++;
  }
}

console.log("");
for (const [file, why] of OPTIONAL) {
  const full = path.join(ROOT, file);
  if (fs.existsSync(full)) console.log(`  ✅ ${file}`);
  else { console.log(`  ⚠️  ${file}   (optional — ${why})`); warnings++; }
}

// index.html jo files maang raha hai, wo sach me hain ya nahi
console.log("");
const indexPath = path.join(ROOT, "index.html");
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, "utf8");
  const refs = [...html.matchAll(/(?:src|href|content)="(\/?(?:assets\/)?[\w.\/-]+\.(?:png|ico|jpg|css|js|webmanifest|xml)[^"]*)"/g)]
    .map((m) => m[1].split("?")[0].replace(/^\//, ""));
  const unique = [...new Set(refs)];
  for (const ref of unique) {
    if (fs.existsSync(path.join(ROOT, ref))) console.log(`  ✅ index.html -> ${ref}`);
    else { console.log(`  ❌ index.html -> ${ref}   <-- file nahi mili`); missing++; }
  }
}

// data.js + site.webmanifest me jo images likhi hain, wo sach me hain ya nahi
const dataPath = path.join(ROOT, "assets/js/data.js");
if (fs.existsSync(dataPath)) {
  const data = fs.readFileSync(dataPath, "utf8");
  const imgs = [...new Set([...data.matchAll(/"(assets\/img\/[^"]+)"/g)].map((m) => m[1]))];
  for (const ref of imgs) {
    if (fs.existsSync(path.join(ROOT, ref))) console.log(`  ✅ data.js -> ${ref}`);
    else { console.log(`  ❌ data.js -> ${ref}   <-- file nahi mili`); missing++; }
  }
}
const manPath = path.join(ROOT, "site.webmanifest");
if (fs.existsSync(manPath)) {
  const man = JSON.parse(fs.readFileSync(manPath, "utf8"));
  for (const ic of man.icons || []) {
    const f = ic.src.replace(/^\//, "");
    if (fs.existsSync(path.join(ROOT, f))) console.log(`  ✅ site.webmanifest -> ${ic.src}`);
    else { console.log(`  ❌ site.webmanifest -> ${ic.src}   <-- file nahi mili`); missing++; }
  }
}

console.log("\n  " + "-".repeat(58));
if (missing) {
  console.log(`\n  ${missing} file missing hai. Site theek nahi chalegi.`);
  console.log("  Sabse aasan fix: GitHub web upload ki jagah VS Code ke terminal se");
  console.log("  push karo (git add . -> commit -> push). Web upload me folders");
  console.log("  aksar chhoot jate hain.\n");
  process.exit(1);
} else {
  console.log(`\n  Sab files maujood hain.${warnings ? ` (${warnings} optional file nahi hai — koi dikkat nahi)` : ""}`);
  console.log("  Ab chalao:  node tools/smoke.js");
  console.log("  Phir:       run-local.bat  (ya  py -m http.server 5173)\n");
}
