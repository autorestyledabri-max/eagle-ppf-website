# Favicon + App Icons — kya, kahan, kaise

Ye guide batati hai ki Eagle PPF ka icon (browser tab, bookmark, Google result,
iPhone/iPad home screen, Android, Windows) har jagah dikhe, iske liye kaun si
file kahan jaati hai aur `index.html` me kya code lagta hai.

---

## Tareeka 1 — Poora folder replace (sabse aasan)

1. `eagle-ppf-BUILD-H-FINAL.zip` unzip karo → andar `eagle-ppf/` folder milega.
2. Apne project ka purana `eagle-ppf/` folder is naye se **replace** kar do.
3. VS Code terminal me:
   ```
   node tools/check-files.js
   node tools/smoke.js
   git add .
   git commit -m "Add favicon + app icons"
   git push
   ```
4. Cloudflare Pages par naya deploy (zip upload) kar do. Bas.

---

## Tareeka 2 — Sirf nayi files daalo (purana folder rakhna hai to)

### Step A — Ye 12 files project ke ROOT me daalo
(root = jahan `index.html` rakha hai, `assets/` folder ke andar NAHI)

| File | Kiske liye |
|---|---|
| `favicon.ico` | Browser tab (16/32/48 teeno size ek file me) |
| `favicon-16x16.png` | Chhota tab icon |
| `favicon-32x32.png` | Tab / taskbar |
| `favicon-48x48.png` | Google search result |
| `favicon-96x96.png` | Desktop shortcut / high-DPI laptop |
| `apple-touch-icon.png` | iPhone / iPad home screen (180×180) |
| `apple-touch-icon-precomposed.png` | Purane iOS apps / kuch link previews |
| `android-chrome-192x192.png` | Android home screen |
| `android-chrome-512x512.png` | Android install / splash screen |
| `maskable-512x512.png` | Android gol/squircle icon (logo katega nahi) |
| `mstile-150x150.png` | Windows tile |
| `site.webmanifest` | Android / Chrome / Edge ko icons ki list |
| `browserconfig.xml` | Windows / Edge tile |

Folder aisa dikhna chahiye:
```
eagle-ppf/
├── index.html
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── favicon-96x96.png
├── apple-touch-icon.png
├── apple-touch-icon-precomposed.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── maskable-512x512.png
├── mstile-150x150.png
├── site.webmanifest
├── browserconfig.xml
├── _headers
├── assets/ ...
└── ...
```

### Step B — `index.html` me code badlo

`index.html` kholo. `<head>` ke andar ye **2 purani lines dhoondho aur DELETE karo**:

```html
<link rel="icon" type="image/png" href="assets/img/eagle-mark.png" />
<link rel="apple-touch-icon" href="assets/img/eagle-mark.png" />
```

Unki jagah (usi jagah, `og:image` wali line ke neeche) ye **paste karo**:

```html
<!-- Favicon + app icons: browser tab, bookmarks, Google results, iPhone/iPad
     home screen, Android, Windows. Files root me hain taaki /favicon.ico jaise
     default paths bhi mil jaayein. -->
<link rel="icon" href="favicon.ico" sizes="48x48" />
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="48x48" href="favicon-48x48.png" />
<link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png" />
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
<link rel="manifest" href="site.webmanifest" />
<meta name="apple-mobile-web-app-title" content="Eagle PPF" />
<meta name="application-name" content="Eagle PPF" />
<meta name="msapplication-TileColor" content="#0B0C0E" />
<meta name="msapplication-config" content="browserconfig.xml" />
```

`<meta name="theme-color" content="#050506" />` pehle se hai — use mat hatana.

### Step C — `_headers` me caching (Cloudflare)

`_headers` file me `/index.html` wale block se **theek pehle** ye paste karo:

```
/favicon.ico
  Cache-Control: public, max-age=604800

/*.png
  Cache-Control: public, max-age=604800

/site.webmanifest
  Content-Type: application/manifest+json
  Cache-Control: public, max-age=86400

```

### Step D — (optional) `.gitignore`
Repo me `.gitignore` nahi tha (GitHub web upload me dot-files chhoot jaati hain).
Pack me di hui `.gitignore` root me daal do. Isse `node tools/check-files.js`
bhi poora green aayega.

### Step E — Check + push + deploy
```
node tools/check-files.js
node tools/smoke.js
git add .
git commit -m "Add favicon + app icons"
git push
```
Phir Cloudflare Pages par naya deploy.

---

## Live hone ke baad check kaise karein

- Laptop: `https://eagleppf.in/favicon.ico` kholo → logo dikhna chahiye.
  Tab me icon na badle to `Ctrl + Shift + R` (hard refresh) ya incognito.
- iPhone: Safari → eagleppf.in → Share → **Add to Home Screen**.
  Pehle se purana shortcut hai to use hata ke dobara add karo.
- Android: Chrome → ⋮ → **Add to Home screen / Install app**.
- Google search me naya icon aane me kuch din–hafte lag sakte hain (Google khud refresh karta hai).

## Icon ka design
Logo `assets/img/eagle-mark.png` se bana hai, site ke dark background
`#0B0C0E` ke upar — kyunki asli logo safed + transparent hai aur light tab
me gayab ho jaata tha. Logo badle to icons dobara banane padenge.
