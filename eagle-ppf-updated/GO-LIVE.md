# GO LIVE — eagleppf.in

Domain: **eagleppf.in** (Hostinger, active till 2027-03-15)
Repo: **https://github.com/autorestyledabri-max/Eagle-PPF-**

Code me domain ka kaam ho chuka hai — canonical, og tags, sitemap, robots,
structured data, `.htaccess`, aur `contact.php` sab `eagleppf.in` ke liye
set hain. Ab sirf panel ka kaam bacha hai.

Do raaste hain. **Raasta A sabse tez hai — aaj live ho jayega.**

---

## RAASTA A — Hostinger par (recommended, ~15 minute)

### A1. Domain ko hosting se jodo

Abhi nameservers `ns1.dns-parking.com` par hain — matlab domain parked hai,
kisi hosting se juda nahi.

1. hPanel → **Websites** → **Add website** (ya "Create or migrate a website")
2. Domain chuno: **eagleppf.in**
3. "Skip, I'll build it myself" / empty website select karo — koi template mat lena

Hostinger khud nameservers apne hosting par set kar dega. 15 minute se 2 ghante
me chalu ho jata hai (kabhi-kabhi zyada).

> Auto-renewal abhi **off** hai. On kar do, warna March 2027 me domain chala
> jayega aur website band ho jayegi.

### A2. Files upload karo

1. hPanel → **Files** → **File Manager**
2. `public_html` folder kholo
3. Andar jo bhi default file ho (`default.php`, Hostinger ka welcome page)
   **delete** kar do
4. `eagle-ppf-website.zip` upload karo
5. Zip par right-click → **Extract**
6. **Dhyan se:** extract ke baad agar `public_html/eagle-ppf/index.html`
   bana hai, to `eagle-ppf` folder ke **andar ki saari files** uthakar seedhe
   `public_html` me le aao. `index.html` `public_html` ki pehli layer me
   hona chahiye — warna site nahi khulegi.

Sahi structure:

```
public_html/
  index.html
  contact.php
  .htaccess
  assets/
  robots.txt
  sitemap.xml
```

### A3. SSL chalu karo

hPanel → **Security → SSL** → eagleppf.in → **Install SSL** (free, Let's Encrypt).
10 minute me `https://eagleppf.in` chalne lagega. `.htaccess` khud http ko
https par bhej dega.

### A4. Email banao (form ke liye zaroori)

hPanel → **Emails → Email Accounts → Create**

Do account banao:

| Address | Kaam |
| --- | --- |
| `website@eagleppf.in` | site se mail bhejne ke liye (sirf system use karega) |
| `info@eagleppf.in` | asli business inbox (optional par professional lagta hai) |

Phir `contact.php` file me upar ye do line check kar lo:

```php
$MAIL_TO   = 'Eagleppf@gmail.com';       // enquiry yahan aayegi
$MAIL_FROM = 'website@eagleppf.in';      // jo abhi banaya
```

`$MAIL_TO` ko `info@eagleppf.in` karna ho to bas yahi badal do.

### A5. Form test karo

`https://eagleppf.in/#/contact` kholo, form bharo, bhejo.

- Mail aa gaya → **ho gaya, live hai**
- Mail nahi aaya → Hostinger par `mail()` block hoga. Tab 2 minute ka fallback:
  1. <https://web3forms.com> → `Eagleppf@gmail.com` daalo → key mail par aayegi
  2. `assets/js/data.js` me `web3formsKey: "wo-key"` aur `mode: "web3forms"`
  3. file dobara upload kar do

> Waise form ka default mode `"auto"` hai — server fail ho to wo apne aap
> customer ka mail app khol deta hai. Matlab enquiry kabhi kho ke nahi jaati.

### A6. Google par daalo

1. <https://search.google.com/search-console> → Add property → `eagleppf.in`
   → DNS verification (Hostinger DNS me TXT record daalna hai)
2. Sitemap submit karo: `https://eagleppf.in/sitemap.xml`
3. **Google Business Profile** banao — address, timing, phone, photos.
   Local "PPF near me" searches ke liye ye sabse zyada kaam ka hai.

---

## RAASTA B — GitHub + Cloudflare Pages (baad me, jab chaho)

Isme fayda ye hai ki `git push` karte hi site khud update ho jati hai.
Lekin domain ke nameservers Hostinger se Cloudflare par le jane padte hain.

1. Repo par code chadhao:

```bash
git remote set-url origin https://github.com/autorestyledabri-max/Eagle-PPF-.git
git add .
git commit -m "eagleppf.in ready"
git push -u origin main --force
```

2. <https://dash.cloudflare.com> → Workers & Pages → Create → Pages →
   Connect to Git → repo select
   - Framework preset: **None**
   - Build command: **khaali**
   - Output directory: **`/`**
3. Custom domain: `eagleppf.in` → Cloudflare nameservers dega
4. Hostinger → Domain → DNS/Nameservers → **Change nameservers** → Cloudflare wale daalo
5. `assets/js/data.js` me `mode: "server"` kar do (`functions/api/enquiry.js`
   chal jayega), aur Cloudflare me `RESEND_API_KEY`, `MAIL_TO`, `MAIL_FROM`
   environment variables set kar do

> Dono ek saath nahi chal sakte — nameservers ek hi jagah point karte hain.
> Aaj Hostinger se live karo; Cloudflare baad me shift kar sakte ho, code
> dono ke liye tayyar hai.

---

## Live jaane ke baad ek baar check karo

- [ ] `https://eagleppf.in` khulta hai, lock (SSL) dikhta hai
- [ ] `www.eagleppf.in` bhi bina www par redirect hota hai
- [ ] Saare 12 pages khulte hain (Home, About, 5 series, Precut, Ceramic, Distributor, Contact)
- [ ] Mobile par kholke dekha — menu, WhatsApp button, form
- [ ] Form bhara aur mail aaya
- [ ] WhatsApp button se chat khulti hai
- [ ] Phone number par tap karne se dial hota hai
- [ ] Address par tap karne se Google Maps khulta hai
- [ ] Browser console (F12) me koi laal error nahi
- [ ] Domain auto-renewal **ON**
