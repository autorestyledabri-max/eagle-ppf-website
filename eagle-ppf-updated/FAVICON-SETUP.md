# Favicon + App Icons — kya, kahan, kaise (updated 25 Sep 2026)

Eagle PPF ka icon browser tab, bookmark, **Google Search result**, iPhone/iPad
home screen, Android aur Windows — har jagah isi setup se dikhta hai.

## Files (sab site ke ROOT me, `index.html` ke saath)

| File | Asli format (check kiya) | Kiske liye |
|---|---|---|
| `favicon.ico` | ICO — 16, 32, 48 px | Browser tab, Google |
| `favicon-16x16.png` | PNG 16×16 | Chhota tab icon |
| `favicon-32x32.png` | PNG 32×32 | Tab / taskbar |
| `favicon-48x48.png` | PNG 48×48 | **Google Search** (48 ka multiple chahiye) |
| `favicon-96x96.png` | PNG 96×96 | Google / high-DPI |
| `android-chrome-192x192.png` | PNG 192×192 | Android, Google |
| `android-chrome-512x512.png` | PNG 512×512 | Android install / splash |
| `maskable-512x512.png` | PNG 512×512 | Android gol icon |
| `apple-touch-icon.png` | PNG 180×180 | iPhone / iPad home screen |
| `apple-touch-icon-precomposed.png` | PNG 180×180 | Purane iOS apps |
| `mstile-150x150.png` | PNG 150×150 | Windows tile |
| `site.webmanifest` | JSON | Android / Chrome / Edge icon list |
| `browserconfig.xml` | XML | Windows / Edge tile |
| `404.html` | HTML | **Zaroori** — neeche padho kyun |

## `index.html` ke `<head>` me ye code hai

```html
<link rel="icon" href="/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="apple-mobile-web-app-title" content="Eagle PPF" />
<meta name="application-name" content="Eagle PPF" />
<meta name="msapplication-TileColor" content="#0B0C0E" />
<meta name="msapplication-TileImage" content="/mstile-150x150.png" />
<meta name="msapplication-config" content="/browserconfig.xml" />
```

Paths `/` se shuru hote hain → hamesha `https://eagleppf.in/favicon.ico` jaisa
seedha URL banta hai, chahe page koi bhi ho.

## Google me safed gola kyun aa raha tha

1. Cloudflare Pages me agar `404.html` na ho, to wo **har galat URL par homepage
   (HTML) 200 OK ke saath** bhej deta hai. (Live site par check kiya:
   `eagleppf.in/koi-bhi-galat-file.png` homepage de raha tha.)
2. Favicon files daalne se pehle Google ne `https://eagleppf.in/favicon.ico`
   maanga → use icon ki jagah HTML page mila → Google ne "koi icon nahi" maan
   ke safed gola laga diya, aur wahi cache me rakh liya.
3. Ab icon files live hain, aur `404.html` ki wajah se galat URL par asli 404
   milega — Google ko kabhi HTML ko icon samajhne ka mauka nahi milega.

`robots.txt` me `Allow: /` hai — koi icon block nahi hai. `_headers` sirf cache
set karta hai, kuch block nahi karta.

## Deploy ke baad Google ko jaldi batane ke liye

1. Browser me kholo — sab **image** dikhni chahiye (HTML page nahi):
   - https://eagleppf.in/favicon.ico
   - https://eagleppf.in/favicon-48x48.png
   - https://eagleppf.in/android-chrome-192x192.png
   - https://eagleppf.in/apple-touch-icon.png
   - https://eagleppf.in/site.webmanifest (JSON text)
2. https://eagleppf.in/kuch-bhi-galat → "That page does not exist" dikhna chahiye.
3. **Google Search Console** (https://search.google.com/search-console):
   property `eagleppf.in` add/verify karo (Cloudflare DNS se 1 click) →
   **URL Inspection** me `https://eagleppf.in/` daalo → **Request indexing**.
4. Sitemap submit karo: `https://eagleppf.in/sitemap.xml`.

Google favicon apne crawl schedule par update karta hai — aam taur par kuch din
se 2–3 hafte. Code ki taraf se ab koi rukawat nahi hai; iske baad sirf intezaar.

## Laptop / phone par check
- Laptop: `Ctrl + Shift + R` (hard refresh) ya incognito.
- iPhone: Safari → eagleppf.in → Share → **Add to Home Screen** (purana
  shortcut ho to hata ke dobara add karo).
- Android: Chrome → ⋮ → **Add to Home screen / Install app**.
