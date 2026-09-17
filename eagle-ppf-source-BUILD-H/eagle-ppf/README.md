# Eagle PPF — Website

Paint protection film supply and installation. New Delhi, pan-India service.

Ye ek **build-free static site** hai. Koi compiler, bundler ya `npm install` nahi.
Kholo aur chal jayega — laptop pe bhi, Cloudflare/Netlify/Vercel pe bhi.

> **Live karna hai?** Seedha [GO-LIVE.md](GO-LIVE.md) padho — eagleppf.in ke
> liye Hostinger ke step-by-step instructions wahan hain.
>
> **Pehli baar set kar rahe ho?** [SETUP.md](SETUP.md) padho — GitHub repo,
> VS Code aur localhost, teeno ke step-by-step instructions wahan hain.

---

## 1. Localhost pe kaise chalaye

**Sabse aasan (Windows):** `run-local.bat` pe double click.
Server chalu ho jayega aur browser khud khul jayega. Band karne ke liye us
black window me `Ctrl + C`.

**Mac / Linux:** terminal me `./run-local.sh`

**Manually:**

```bash
cd eagle-ppf
python -m http.server 5173      # ya: npx serve -l 5173 .
```

Phir browser me: <http://localhost:5173>

**Bina server bhi chalta hai** — `index.html` pe double click kar do. Sab pages,
form, flip cards, WhatsApp button kaam karenge. Sirf ek chhota farak: `file://`
pe kuch browser features restricted rehte hain, isliye asli testing ke liye
server wala tareeka better hai.

### Site theek chal rahi hai ya nahi, ek command me check

```bash
node tools/check-files.js   # koi file missing to nahi
node tools/smoke.js         # saare pages theek chal rahe hain
```

Ye browser ke bina saare paanch pages render karke dekhta hai — koi JavaScript
error, khaali page, `undefined`, ya bacha hua placeholder to nahi. Kuch bhi
badalne ke baad ise chala lena; 2 second lagta hai.

Pages hash routing pe hain, to ye URLs seedhe kaam karenge:

| Page          | URL                     |
| ------------- | ----------------------- |
| Home          | `/`                     |
| About         | `/#/about`              |
| PPF films     | `/#/products`           |
| Crystal       | `/#/products/crystal`   |
| Silver        | `/#/products/silver`    |
| Gold          | `/#/products/gold`      |
| Diamond       | `/#/products/diamond`   |
| Platinum      | `/#/products/platinum`  |
| Precut PPF    | `/#/precut`             |
| Ceramic       | `/#/ceramic`            |
| Distributor   | `/#/distributor`        |
| Contact       | `/#/contact`            |

---

## 2. File structure

```
eagle-ppf/
├── index.html                  page shell + SEO meta tags
├── assets/
│   ├── css/style.css           poora design system (tokens sabse upar)
│   ├── js/data.js              >>> SAARA CONTENT YAHI HAI <<<
│   ├── js/app.js               components, router, form logic
│   ├── img/                    eagle-mark.png, eagle-lockup.png
│   └── img/products/           crystal, silver, gold, diamond, platinum,
│                               precut, ceramic — asli packshots
├── contact.php                 server-side email handler (Hostinger / PHP)
├── .htaccess                   https redirect, caching, security headers
├── functions/api/enquiry.js    server-side email handler (Cloudflare)
├── tools/check-files.js        `node tools/check-files.js` — koi file chhooti to nahi
├── tools/smoke.js              `node tools/smoke.js` — saare pages test kar leta hai
├── run-local.bat               Windows: double click karo
├── run-local.sh                Mac / Linux
├── robots.txt · sitemap.xml
├── .gitignore · .dev.vars.example
└── README.md
```

**Ek hi rule yaad rakhna: content sirf `assets/js/data.js` me badalta hai.**
Koi bhi text, phone number, product spec ya nav item kisi component me hard-coded
nahi hai. `data.js` ke blocks:

| Block            | Kya control karta hai                                    |
| ---------------- | -------------------------------------------------------- |
| `DATA.site`      | title/meta description har page ka                       |
| `DATA.navigation`| header aur footer ke links                                |
| `DATA.cta`       | button ke labels (ek jagah, sab jagah use hote hain)     |
| `DATA.company`   | headline, about copy, stats, values, pillars             |
| `DATA.contact`   | phone, WhatsApp, email, address, hours, socials          |
| `DATA.products`  | paanchon series — micron, accent colour, spec, warranty   |
| `DATA.precut`    | Precut PPF — exterior/interior lists, benefits            |
| `DATA.ceramic`   | Ceramic coating + The Eagle Shield                        |
| `DATA.founder`   | Kundan Kushwaha — naam, designation, story                |
| `DATA.story`     | Eagle PPF kyun bana                                       |
| `DATA.tpu`       | 100% TPU technology points                                |
| `DATA.mission` / `DATA.vision` | Mission aur Vision                          |
| `DATA.vehicleData` | Precut selector ka demo vehicle data                    |
| `DATA.distributor`| distributor page ka content                              |
| `DATA.forms`     | form kahan bheje (neeche section 4)                      |
| `ASSETS`         | logo file paths                                          |

### Naya product add karna

`DATA.products` me ek object copy karo, `slug` aur `tier` badal do. Bas.
Products grid, compare table, quote form ka dropdown, related films aur
`/#/products/<slug>` page — sab apne aap update ho jayenge.

### Photo ya video lagana

1. File `assets/img/` me daalo (jaise `crystal.jpg`, `hero.mp4`).
2. `data.js` me us product ka `image: null` → `image: "assets/img/crystal.jpg"`.
3. Jahan tak photo nahi hai, wahan logo wala placeholder dikhega — site
   kabhi toota hua nahi lagega.

Images web ke liye compress karke daalna (1600px width, ~200KB tak). Free tool:
<https://squoosh.app>

### Jo cheez confirm nahi hui

Woh amber (peela) dashed style me dikhti hai — jaise Crystal ka micron.
Iska matlab: "ye company ne likhit me confirm nahi kiya". Confirm hone par
`data.js` me value daal do aur `ph:true` ko `ph:false` kar do — colour
apne aap normal ho jayega. Live site pe kabhi galat spec publish nahi hoga.

---

## 3. Deploy (git se, 10 minute)

### Cloudflare Pages — recommended (free, commercial use allowed)

```bash
git init
git add .
git commit -m "Eagle PPF website"
git branch -M main
git remote add origin https://github.com/<your-account>/eagle-ppf.git
git push -u origin main
```

1. <https://dash.cloudflare.com> → Workers & Pages → Create → Pages →
   Connect to Git → repo select karo
2. Build settings:
   - Framework preset: **None**
   - Build command: **khaali chhod do**
   - Build output directory: **`/`**
3. Deploy. `functions/api/enquiry.js` apne aap `/api/enquiry` ban jayega.
4. Custom domain add karo → SSL apne aap lag jayega.

Aage se: `git push` karo, site update ho jayegi.

### Netlify / Vercel

Bhi chalega (static site hai), lekin `functions/` folder Cloudflare ka format
hai — us case me form ko **web3forms** mode pe rakho (section 4).
Note: Vercel ka free "Hobby" plan commercial sites allow nahi karta.

---

## 4. Form kaam kaise karega

`data.js` → `DATA.forms.mode`. Teen options:

| mode          | Kab use karein                                  | Server chahiye? |
| ------------- | ----------------------------------------------- | --------------- |
| `"mailto"`    | **Aaj ka default** — mail app khulta hai, send   | Nahi            |
| `"web3forms"` | Background me chup-chaap email (60 sec setup)    | Nahi            |
| `"server"`    | Domain + apna email ready hone ke baad           | Haan            |
| `"preview"`   | Sirf UI test karna ho, kuch bhejna na ho         | Nahi            |

### A. Abhi (default — kuch karna nahi hai)

`mode: "mailto"` set hai. Customer form bharta hai, Send dabata hai, uska
mail app poora bhara hua email ke saath khulta hai — bas send karna hai.
Enquiry `Eagleppf@gmail.com` pe aa jati hai. Koi account, key ya server nahi.

Iski ek kami hai: agar customer ke laptop pe koi mail app set nahi hai to
kuch nahi khulega (mobile pe ye dikkat nahi aati). Isi liye neeche wala
upgrade recommend karta hoon — 60 second ka kaam hai.

### B. Behtar (60 second, free) — background me email

1. <https://web3forms.com> kholo
2. `Eagleppf@gmail.com` daalo → access key email pe aa jayegi
3. `data.js` me:
   ```js
   forms: {
     mode: "web3forms",
     web3formsKey: "yahan-paste-karo",
   ```
4. Bas. Form localhost pe bhi chalega, enquiry Gmail me aa jayegi.

Web3Forms ki access key public hoti hai — isi liye frontend me rakhna safe hai.

### C. Proper setup (domain aane ke baad)

1. <https://resend.com> pe account (free: 3,000 email/mahina)
2. Apna domain verify karo (DNS me DKIM records)
3. Cloudflare Pages → Settings → Environment variables:
   - `RESEND_API_KEY` = `re_...` **(secret)**
   - `MAIL_TO` = `info@eagleppf.com`
   - `MAIL_FROM` = `Eagle PPF Website <website@eagleppf.com>`
4. `data.js` me `mode: "server"`
5. Spam protection chahiye to Cloudflare Turnstile banao aur
   `TURNSTILE_SECRET` add kar do

**Secret key kabhi bhi `data.js` ya kisi bhi frontend file me nahi aayegi.**
Wo sirf Cloudflare ke environment me rehti hai.

Local pe server mode test karne ke liye:

```bash
cp .dev.vars.example .dev.vars   # apni keys bharo
npx wrangler pages dev .
```

---

## 5. Live jaane se pehle checklist

- [ ] Domain khareeda, Cloudflare pe add kiya
- [ ] `index.html` me canonical + og:url uncomment karke domain daala
- [ ] `robots.txt` aur `sitemap.xml` me `REPLACE-WITH-YOUR-DOMAIN` badla
- [ ] `data.js` me `DATA.site.domain` update kiya
- [ ] Form `web3forms` ya `server` mode pe — khud test mail bhej ke dekha
- [ ] Asli photos daali (hero, products, workshop)
- [ ] Amber placeholders ka final status decide kiya
- [ ] Google Search Console me domain verify + sitemap submit
- [ ] Google Business Profile — address, hours, phone, photos
- [ ] Mobile pe khud chala ke dekha (Android + iPhone)

---

## 6. Aage kya add ho sakta hai (aaj nahi banaya)

Architecture in sab ke liye tayyar hai — site dobara banane ki zaroorat nahi
padegi:

- Gallery / before-after page
- Colour PPF section
- Warranty registration aur verification
- Dealer locator
- Blog / media
- Online store, cart, payment gateway
- Admin dashboard ya CMS (Sanity / Payload)
- Hindi language version

Jab in me se koi cheez chahiye ho — aur specially jab CMS ya online store
chahiye — tab Next.js pe port karna sahi hoga. Tab bhi `data.js` ka structure
waise ka waisa `data/*.ts` files me chala jayega, aur design system CSS
tokens ke through carry ho jayega.

---

© Eagle PPF. Established 2015.
