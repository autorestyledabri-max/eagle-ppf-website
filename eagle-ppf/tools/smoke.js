/**
 * tools/smoke.js — browser ke bina poori site test karta hai.
 * Chalane ka tareeka:   node tools/smoke.js
 *
 * smoke.js — chhota sa fake DOM banakar poori site ko Node me chala deta hai.
 * Har page render karke dekhta hai ki koi runtime error, undefined ya
 * [object Object] to nahi aa raha.
 */
const fs = require("fs");
const vm = require("vm");
const path = require("path");

const ROOT = path.join(__dirname, "..");   // project root

function makeEl(name = "el") {
  const el = {
    _name: name,
    innerHTML: "",
    textContent: "",
    value: "",
    src: "",
    href: "",
    type: "",
    hidden: false,
    disabled: false,
    dataset: {},
    style: new Proxy({}, { get: () => "", set: () => true }),
    attributes: {},
    classList: {
      _s: new Set(),
      add(...c) { c.forEach((x) => this._s.add(x)); },
      remove(...c) { c.forEach((x) => this._s.delete(x)); },
      contains(c) { return this._s.has(c); },
      toggle(c, on) { on === undefined ? (this._s.has(c) ? this._s.delete(c) : this._s.add(c)) : on ? this._s.add(c) : this._s.delete(c); },
    },
    setAttribute(k, v) { this.attributes[k] = String(v); },
    getAttribute(k) { return k in this.attributes ? this.attributes[k] : null; },
    removeAttribute(k) { delete this.attributes[k]; },
    toggleAttribute(k, on) { on ? (this.attributes[k] = "") : delete this.attributes[k]; },
    addEventListener() {},
    removeEventListener() {},
    appendChild() {},
    focus() {},
    reset() {},
    scrollIntoView() {},
    requestSubmit() {},
    closest() { return null; },
    insertAdjacentHTML(pos, html) { this.innerHTML += html; },
    scrollTop: 0,
    scrollHeight: 0,
    getBoundingClientRect() { return { top:0, left:0, width:300, height:200, bottom:200, right:300 }; },
    querySelector() { return makeEl("child"); },
    querySelectorAll() { return []; },
  };
  el.elements = new Proxy({}, { get: () => makeEl("field") });
  return el;
}

const registry = new Map();
function bySelector(sel) {
  if (!registry.has(sel)) registry.set(sel, makeEl(sel));
  return registry.get(sel);
}

const document = {
  title: "",
  body: makeEl("body"),
  head: makeEl("head"),
  documentElement: makeEl("html"),
  querySelector: (sel) => bySelector(sel),
  querySelectorAll: () => [],
  getElementById: (id) => bySelector("#" + id),
  createElement: (tag) => makeEl(tag),
  addEventListener() {},
};

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  encodeURIComponent,
  decodeURIComponent,
  URLSearchParams,
  Date,
  Math,
  JSON,
  document,
  navigator: { clipboard: { writeText: async () => {} } },
  location: { hash: "#/", protocol: "http:", href: "http://localhost/" },
  addEventListener() {},
  removeEventListener() {},
  scrollTo() {},
  matchMedia: () => ({ matches: false, addEventListener() {} }),
  requestAnimationFrame: (fn) => { fn(0); return 1; },
  performance: { now: () => 0 },
  innerWidth: 1440,
  innerHeight: 900,
  IntersectionObserver: class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  },
  fetch: async () => ({ ok: true, json: async () => ({}) }),
  FormData: class { constructor() {} entries() { return [][Symbol.iterator](); } },
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

const ctx = vm.createContext(sandbox);
for (const f of ["assets/js/data.js", "assets/js/app.js"]) {
  const code = fs.readFileSync(path.join(ROOT, f), "utf8");
  try {
    vm.runInContext(code, ctx, { filename: f });
  } catch (err) {
    console.error("❌ LOAD FAILED in " + f + "\n   " + err.message);
    process.exit(1);
  }
}
console.log("✅ data.js + app.js loaded, chrome rendered without errors");

const routes = ["#/", "#/about", "#/products", "#/products/crystal", "#/products/silver", "#/products/gold", "#/products/diamond", "#/products/platinum", "#/precut", "#/ceramic", "#/distributor", "#/contact", "#/contact?product=gold", "#/nonsense"];
const main = bySelector("#main");
let failures = 0;

for (const hash of routes) {
  sandbox.location.hash = hash;
  main.innerHTML = "";
  try {
    vm.runInContext("route()", ctx);
  } catch (err) {
    console.error(`❌ ${hash} threw: ${err.message}`);
    failures++;
    continue;
  }
  const html = main.innerHTML || "";
  // form binding ko bhi chalao jaisa browser me hota hai
  const qf = bySelector("#quoteForm");
  qf.dataset.type = /data-type="distributor"/.test(html) ? "distributor" : "quote";
  if (/id="quoteForm"/.test(html)) { try { vm.runInContext("bindForm()", ctx); } catch (e) { console.error('bindForm threw on ' + hash + ': ' + e.message); failures++; } }
  const problems = [];
  if (html.length < 400) problems.push("output too short (" + html.length + " chars)");
  if (/undefined/.test(html)) problems.push("contains 'undefined'");
  if (/\[object Object\]/.test(html)) problems.push("contains '[object Object]'");
  if (/NaN/.test(html)) problems.push("contains 'NaN'");
  if (/\[TO CONFIRM\]|\[OFFICIAL|\[PRODUCT|\[BENEFIT|\[REQUIREMENT/.test(html)) problems.push("placeholder text still visible");
  if (problems.length) {
    console.error(`❌ ${hash} → ${problems.join(", ")}`);
    failures++;
  } else {
    console.log(`✅ ${hash.padEnd(26)} ${String(html.length).padStart(6)} chars   title: ${document.title}`);
  }
}

// --- source guards: ye bug dobara na aaye ---
{
  const appSrc = fs.readFileSync(path.join(ROOT, "assets/js/app.js"), "utf8");
  const cssSrc = fs.readFileSync(path.join(ROOT, "assets/css/style.css"), "utf8");
  // initSplit innerHTML dobara likhta hai — wo kabhi layout class par nahi chalna chahiye
  if (/querySelectorAll\("#main \.split"/.test(appSrc)) {
    console.error("❌ text animation is targeting the layout class .split — that corrupts markup");
    failures++;
  } else console.log("✅ text animation uses its own class, not the layout grid");
  if (/\.split span\{/.test(cssSrc)) {
    console.error("❌ CSS still styles .split span — layout columns will be affected");
    failures++;
  } else console.log("✅ no CSS rule leaks into layout columns");
}

// content spot-checks on the pages that matter
sandbox.location.hash = "#/";
vm.runInContext("route()", ctx);
const home = main.innerHTML;
const expect = [
  ["hero headline", /Guard the finish/],
  ["stats strip", /11\+/],
  ["all five grades", /Crystal[\s\S]*Silver[\s\S]*Gold[\s\S]*Diamond[\s\S]*Platinum/],
  ["phone number", /84477 66815|918447766815/],
  ["TPU section", /100% TPU/],
  ["precut teaser", /Precut/],
  ["ceramic teaser", /Ceramic/],
  ["eagle assist", /Eagle Assist/],
];
for (const [name, re] of expect) {
  if (re.test(home) || re.test(bySelector("#footer").innerHTML)) console.log("✅ home contains " + name);
  else { console.error("❌ home missing " + name); failures++; }
}

// --- JS se bharne wale panels khaali to nahi? (pehle yahi bug chhoot gaya tha) ---
{
  const panels = [
    ["#/",        "lyrDetail",   /Top Coat/,   "film layers detail"],
    ["#/products","seriesStage", /Crystal/,    "series stage"],
    ["#/precut",  "coverPanel",  /Bonnet/,     "precut coverage panel"],
    ["#/",        "assistLog",   /series/i,    "eagle assist"]
  ];
  for (const [hash, id, re, label] of panels) {
    sandbox.location.hash = hash;
    bySelector("#" + id).innerHTML = "";
    vm.runInContext("route()", ctx);
    const html = bySelector("#" + id).innerHTML || "";
    if (html.length > 30 && re.test(html)) console.log("\u2705 " + label + " filled by JS");
    else { console.error("\u274c " + label + " is EMPTY on " + hash); failures++; }
  }
}

sandbox.location.hash = "#/about";
vm.runInContext("route()", ctx);
if (/trusted name in paint protection/.test(main.innerHTML)) console.log("✅ about page has the full company copy");
else { console.error("❌ about page missing company copy"); failures++; }

sandbox.location.hash = "#/products/crystal";
vm.runInContext("route()", ctx);
const crystal = main.innerHTML;
if (/220 microns/.test(crystal)) { console.error("❌ Crystal page shows another grade's thickness"); failures++; }
else console.log("✅ Crystal page has no invented thickness");
if (/3 years/.test(crystal)) console.log("✅ Crystal warranty present");
else { console.error("❌ Crystal warranty missing"); failures++; }

sandbox.location.hash = "#/contact";
vm.runInContext("route()", ctx);
const contact = main.innerHTML;
if (/Eagleppf@gmail\.com/.test(contact)) console.log("✅ contact page shows the email");
else { console.error("❌ contact page missing email"); failures++; }
if (/wa\.me\/918447766815/.test(contact)) console.log("✅ WhatsApp link wired");
else { console.error("❌ WhatsApp link missing"); failures++; }
if (/id="quoteForm"/.test(contact)) console.log("✅ quote form rendered");
else { console.error("❌ quote form missing"); failures++; }

sandbox.location.hash = "#/distributor";
vm.runInContext("route()", ctx);
if (/data-type="distributor"/.test(main.innerHTML)) console.log("✅ distributor form rendered");
else { console.error("❌ distributor form missing"); failures++; }

console.log(failures ? `\n${failures} problem(s) found` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
