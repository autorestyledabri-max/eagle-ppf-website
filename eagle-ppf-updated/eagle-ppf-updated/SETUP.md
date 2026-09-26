# SETUP — GitHub repo + VS Code + localhost

Teen cheezein, ek ke baad ek. Total 10 minute.

---

## STEP 1 — Folder sahi jagah rakho

Zip extract karo aur folder ko kisi seedhe path pe rakho, jaise:

```
C:\Projects\eagle-ppf
```

Folder ke andar ye dikhna chahiye:

```
eagle-ppf\
  index.html
  assets\
  functions\
  tools\
  .vscode\
  run-local.bat
  README.md
```

> Agar extract karne ke baad `eagle-ppf\eagle-ppf\index.html` jaisa double
> folder ban gaya ho, to andar wale folder ko bahar nikaal lo. `index.html`
> hamesha folder ki pehli layer me hona chahiye.

---

## STEP 2 — VS Code me kholo aur localhost pe chalao

### 2.1 Folder kholo

VS Code → **File → Open Folder…** → `C:\Projects\eagle-ppf` select karo.

Pehli baar kholne par VS Code neeche-daaye ek notification dega:
*"This workspace has extension recommendations"* → **Install** dabado.
(Live Server aur Prettier install ho jayenge — dono free hain.)

### 2.2 Server chalao — teen me se koi ek tareeka

**A) VS Code ka task (sabse seedha)**

`Ctrl + Shift + B` dabao → "Run site on localhost:5173" chalu ho jayega.
Phir browser me kholo: <http://localhost:5173>

**B) Live Server extension**

`index.html` par right-click → **Open with Live Server**.
Browser khud khul jayega, aur file save karte hi page apne aap refresh hoga
(design ya content edit karte waqt ye sabse aaram ka tareeka hai).

**C) Terminal se**

VS Code me `Ctrl + ~` (terminal kholo), phir:

```powershell
py -m http.server 5173
```

`py` na chale to `python -m http.server 5173` try karo.

**D) VS Code ke bina**

`run-local.bat` par double click. Browser khud khul jayega.

### 2.3 Sab theek chal raha hai, ye confirm karo

Terminal me do command, isi order me:

```powershell
node tools/check-files.js    # koi file chhooti to nahi?
node tools/smoke.js          # saare pages theek render ho rahe hain?
```

Pehli wali khaas taur par tab chalana jab code GitHub se download ya clone
kiya ho — web upload me folders aksar chhoot jate hain, aur ye turant naam
ke saath bata deti hai ki kya missing hai.

Ya VS Code me `Ctrl + Shift + P` → "Tasks: Run Test Task".

Aakhir me `All checks passed` aana chahiye. Agar koi ❌ aaye to us line ka
text mujhe bhej dena — main theek kar dunga.

Browser me ye sab check kar lo:

- [ ] Paanch pages khul rahe hain — Home, About, Products, Distributor, Contact
- [ ] Product card par click karo → card palat kar numbers dikhata hai
- [ ] Neeche-daaye WhatsApp button par click → WhatsApp khulta hai
- [ ] Contact page par form bharke Send → mail app khulta hai bhare hue email ke saath
- [ ] Window chhoti karke dekho (ya `F12` → phone icon) → mobile layout theek hai

---

## STEP 3 — GitHub repo banao

> **Zaroori:** repo **client ke ya company ke** GitHub account me banana behtar
> hai. Baad me handover ke waqt sirf access dena padega, code transfer nahi
> karna padega.

### Tareeka A — VS Code se (bina command, recommended)

1. VS Code ke left side me **Source Control** icon (branch jaisa) dabao
2. **Initialize Repository** dabao
3. Message box me likho: `Eagle PPF website` → **Commit** dabao
4. Ab **Publish to GitHub** button aayega → dabao
5. VS Code GitHub login maangega → login karo
6. **Publish to GitHub private repository** chuno (private hi rakhna)
7. Naam do: `eagle-ppf`

Ho gaya. Repo ban gaya aur code upload bhi ho gaya.

Aage se: file badlo → Source Control me message likho → **Commit** →
**Sync Changes**. Bas.

### Tareeka B — command line se

Pehle <https://github.com/new> par jao:

- Repository name: `eagle-ppf`
- **Private** select karo
- "Add a README file" ko tick **mat** karo (yahan pehle se README hai)
- **Create repository** dabao

Phir VS Code ke terminal me (`USERNAME` apna GitHub username daalna):

```powershell
git init
git add .
git commit -m "Eagle PPF website"
git branch -M main
git remote add origin https://github.com/USERNAME/eagle-ppf.git
git push -u origin main
```

`git` command na mile to pehle <https://git-scm.com/download/win> se Git
install karo, VS Code band karke dobara kholo.

### Kya kya git me jayega

`.gitignore` pehle se laga hua hai. Ye cheezein kabhi upload nahi hongi:

```
node_modules/      .wrangler/      .dev.vars      *.log      .DS_Store
```

`.dev.vars` me aage chalke email ki secret key aayegi — isi liye wo git se
bahar rakhi gayi hai. **Koi bhi secret key kabhi bhi repo me push nahi karni.**

---

## Roz ka kaam kaisa dikhega

```
1. VS Code kholo
2. assets/js/data.js me content badlo
3. browser refresh (Live Server ho to apne aap)
4. node tools/smoke.js   -- sab theek hai?
5. Source Control -> Commit -> Sync Changes
```

Aur jab domain aa jayega, isi repo ko Cloudflare Pages se jod denge — phir
har `git push` par site khud live update ho jayegi. Wo steps README.md ke
section 3 me likhe hain.
