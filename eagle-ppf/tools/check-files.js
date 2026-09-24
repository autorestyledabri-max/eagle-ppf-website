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
  ["assets/img/eagle-lockup.png", "footer ka logo"],
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
  const refs = [...html.matchAll(/(?:src|href)="((?:assets\/)?[\w.\/-]+\.(?:png|ico|jpg|css|js|webmanifest|xml)[^"]*)"/g)]
    .map((m) => m[1].split("?")[0]);
  const unique = [...new Set(refs)];
  for (const ref of unique) {
    if (fs.existsSync(path.join(ROOT, ref))) console.log(`  ✅ index.html -> ${ref}`);
    else { console.log(`  ❌ index.html -> ${ref}   <-- file nahi mili`); missing++; }
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
