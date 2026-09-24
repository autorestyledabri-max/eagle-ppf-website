/* ==========================================================================
   HELPERS
   ========================================================================== */
const $  = (s,r=document)=>r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
/* Renders a value that may be either a plain string or {ph:true,text}. */
const txt = v => !v ? "" : (typeof v === "string" ? esc(v)
      : v.ph ? '<span class="ph" title="Placeholder — update in DATA">'+esc(v.text)+'</span>' : esc(v.text));
const isPh = s => typeof s === "string" && s.trim().startsWith("[");
const label = s => isPh(s) ? '<span class="ph">'+esc(s)+'</span>' : esc(s);

const ICONS = {
  arrow:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6"/></svg>',
  tick:'<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M1 6.8 4.6 10.4 12 2.6" stroke="currentColor" stroke-width="1.8"/></svg>',
  alert:'<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="6.2" stroke="currentColor" stroke-width="1.3"/><path d="M7 4v3.6M7 9.6v.6" stroke="currentColor" stroke-width="1.5"/></svg>',
  car:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M3 19h24M5 19v-4.2l3-5.4A3 3 0 0 1 10.6 8h8.8a3 3 0 0 1 2.6 1.4l3 5.4V19" stroke="currentColor" stroke-width="1.3"/><circle cx="9.5" cy="19.5" r="2.5" stroke="currentColor" stroke-width="1.3"/><circle cx="20.5" cy="19.5" r="2.5" stroke="currentColor" stroke-width="1.3"/></svg>',
  front:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M6 20V12.5a3 3 0 0 1 .9-2.1l2.6-2.6A3 3 0 0 1 11.6 7h6.8a3 3 0 0 1 2.1.8l2.6 2.6a3 3 0 0 1 .9 2.1V20" stroke="currentColor" stroke-width="1.3"/><path d="M6 15h18M9 20v2M21 20v2" stroke="currentColor" stroke-width="1.3"/></svg>',
  shield:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M15 3.5 25 7v7.5c0 5.6-4 9.9-10 12-6-2.1-10-6.4-10-12V7l10-3.5Z" stroke="currentColor" stroke-width="1.3"/><path d="M10.5 15.2l3.2 3.3 6-6.4" stroke="currentColor" stroke-width="1.3"/></svg>',
  cabin:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><rect x="3.5" y="7" width="23" height="13" stroke="currentColor" stroke-width="1.3"/><path d="M3.5 15.5h23M11 20v3M19 20v3" stroke="currentColor" stroke-width="1.3"/></svg>',
  light:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M5 11.5h7.5A6.5 6.5 0 0 1 19 18v.5H5v-7Z" stroke="currentColor" stroke-width="1.3"/><path d="M22 9.5 26 7M22 15h4.5M22 20.5 26 23" stroke="currentColor" stroke-width="1.3"/></svg>',
  sparkle:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M15 4.5 17.2 12 25 15l-7.8 3L15 25.5 12.8 18 5 15l7.8-3L15 4.5Z" stroke="currentColor" stroke-width="1.3"/></svg>',
  drop:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M15 4s7 7.6 7 12a7 7 0 1 1-14 0c0-4.4 7-12 7-12Z" stroke="currentColor" stroke-width="1.3"/><path d="M11.6 16.8a3.6 3.6 0 0 0 3.4 4" stroke="currentColor" stroke-width="1.3"/></svg>',
  gloss:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M4 19c4-6 8-9 11-9s7 3 11 9" stroke="currentColor" stroke-width="1.3"/><path d="M4 23h22" stroke="currentColor" stroke-width="1.3"/><path d="M12 6.5 13.4 9M18.5 7.5 17.6 9.6M7 9.5l1.8 1.6" stroke="currentColor" stroke-width="1.3"/></svg>',
  peel:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M5 22V8h14" stroke="currentColor" stroke-width="1.3"/><path d="M5 22h11c6 0 9-3.4 9-8.5 0-2.6-1.4-4-3.2-4-1.7 0-3 1.2-3 3.1 0 1.6 1 2.7 2.4 2.7" stroke="currentColor" stroke-width="1.3"/></svg>',
  value:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M5 21V13M12 21V8M19 21v-6M26 21V5" stroke="currentColor" stroke-width="1.4"/><path d="M3 25h24" stroke="currentColor" stroke-width="1.3"/></svg>',
  flash:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M16.5 3 7 17h6l-1.5 10L22 13h-6l.5-10Z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  "tick-circle":'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><circle cx="15" cy="15" r="11.5" stroke="currentColor" stroke-width="1.3"/><path d="M9.6 15.4l3.5 3.5 7.3-7.6" stroke="currentColor" stroke-width="1.4"/></svg>',
  grid:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><rect x="4" y="4" width="9" height="9" stroke="currentColor" stroke-width="1.3"/><rect x="17" y="4" width="9" height="9" stroke="currentColor" stroke-width="1.3"/><rect x="4" y="17" width="9" height="9" stroke="currentColor" stroke-width="1.3"/><path d="M17 21.5h9M21.5 17v9" stroke="currentColor" stroke-width="1.3"/></svg>',
  sun:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><circle cx="15" cy="15" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M15 3v3.5M15 23.5V27M3 15h3.5M23.5 15H27M6.6 6.6l2.5 2.5M20.9 20.9l2.5 2.5M23.4 6.6l-2.5 2.5M9.1 20.9l-2.5 2.5" stroke="currentColor" stroke-width="1.3"/></svg>',
  flask:'<svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="M12 4h6M13 4v7.5L6.6 22.4A2 2 0 0 0 8.3 25.5h13.4a2 2 0 0 0 1.7-3.1L17 11.5V4" stroke="currentColor" stroke-width="1.3"/><path d="M9.6 18.5h10.8" stroke="currentColor" stroke-width="1.3"/></svg>',
  flip:'<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M1.5 6.5a5 5 0 0 1 8.6-3.4M11.5 6.5a5 5 0 0 1-8.6 3.4" stroke="currentColor" stroke-width="1.4"/><path d="M10.6 1v2.2H8.4M2.4 12V9.8h2.2" stroke="currentColor" stroke-width="1.4"/></svg>',
  instagram:'<svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true"><rect x="1.4" y="1.4" width="14.2" height="14.2" rx="4" stroke="currentColor" stroke-width="1.3"/><circle cx="8.5" cy="8.5" r="3.3" stroke="currentColor" stroke-width="1.3"/><circle cx="12.9" cy="4.2" r="1" fill="currentColor"/></svg>',
  youtube:'<svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true"><rect x="1" y="3.4" width="15" height="10.2" rx="3" stroke="currentColor" stroke-width="1.3"/><path d="M7.2 6.4 11 8.5l-3.8 2.1V6.4Z" fill="currentColor"/></svg>',
  linkedin:'<svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true"><rect x="1.4" y="1.4" width="14.2" height="14.2" rx="2.4" stroke="currentColor" stroke-width="1.3"/><path d="M5 7v5.2M5 4.6v.1M8.4 12.2V7m0 1.9c.9-2.2 4-1.6 4 .9v2.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>'
};

/* A framed media slot. Until a real photograph is supplied it shows a clearly
   labelled placeholder instead of pretending a stock image is Eagle's work. */
function media(src, alt, tag, ratio){
  const inner = src
    ? '<img src="'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy" decoding="async" />'
    : '<div class="ph-frame"><img src="'+ASSETS.mark+'" alt="Eagle PPF" style="width:min(42%,190px);opacity:.5;margin:0 auto" /></div>';
  return '<div class="frame frame--media"><div class="frame__in" style="aspect-ratio:'+(ratio||"4/3")+'">'+inner+
    (tag?'<div class="hero__tag">'+esc(tag)+'</div>':'')+'</div></div>';
}
function cutFrame(html){ return '<div class="frame"><div class="frame__in">'+html+'</div></div>'; }

/* ==========================================================================
   SHARED SECTIONS
   ========================================================================== */
function productCard(p){
  const spec = k => (p.specifications.find(x=>x.label===k)||{}).value || "";
  const row  = (k,v) => v ? '<span class="flip__row"><span>'+k+'</span><span>'+label(v)+'</span></span>' : '';
  return '<article class="card tilt" style="--acc:'+esc(p.accent)+'">'+
    '<button class="flip" type="button" aria-pressed="false" aria-label="Show the numbers for Eagle PPF '+esc(p.name)+' Series">'+
      '<span class="flip__inner">'+
        '<span class="flip__face flip__front">'+
          '<span class="card__shot">'+
            '<img src="'+esc(p.image)+'" alt="Eagle PPF '+esc(p.name)+' Series '+p.micron+' micron paint protection film" loading="lazy" decoding="async" />'+
          '</span>'+
          '<span class="card__glow"></span>'+
          '<span class="card__micron"><b class="count" data-count="'+p.micron+'">'+p.micron+'</b><span>micron</span></span>'+
        '</span>'+
        '<span class="flip__face flip__back">'+
          row("Thickness",spec("Thickness"))+row("Replacement",spec("Replacement cover"))+row("Warranty",spec("Warranty"))+
          row("Grade","0"+p.tier+" of 5")+
        '</span>'+
      '</span>'+
      '<span class="card__tier">0'+p.tier+'</span>'+
      '<span class="flip__hint">'+ICONS.flip+' Numbers</span>'+
    '</button>'+
    '<div class="card__body">'+
      '<span class="card__cat">'+esc(p.series)+'</span>'+
      '<h3 class="h3"><a href="#/products/'+esc(p.slug)+'">'+esc(p.name)+'</a></h3>'+
      '<p>'+txt(p.shortDescription)+'</p>'+
      '<div class="card__foot"><a class="link-arrow" href="#/products/'+esc(p.slug)+'">'+DATA.cta.detail+ICONS.arrow+'</a></div>'+
    '</div></article>';
}

/* ==========================================================================
   FILM LAYERS — 01 Top Coat .. 04 Release Liner
   List par click karo, 3D stack me wahi layer roshan hoti hai aur daayi
   taraf uski details aati hain. Auto-cycle chalta hai jab tak user khud
   kisi layer par click na kare.
   ========================================================================== */
let layerIndex = 0, layerTimer = null, layerTouched = false;

function layersHtml(){
  const L = DATA.filmLayers.layers;
  return '<div class="layers3" id="layers3">'+
    '<div class="lyr-list" role="tablist" aria-label="Film layers">'+
      L.map((l,i)=>'<button role="tab" data-lyr="'+i+'" aria-selected="'+(i===0)+'"><i>'+esc(l.n)+'</i>'+esc(l.name)+'</button>').join("")+
    '</div>'+
    '<div class="stack3d" aria-hidden="true"><div class="stack3d__in">'+
      L.map((l,i)=>'<span class="lyr'+(i===0?' is-on':'')+'" data-layer="'+i+'" style="--z:'+((L.length-1-i)*26)+'px"></span>').join("")+
    '</div></div>'+
    '<div class="lyr-detail" id="lyrDetail">'+layerDetailHtml(0)+'</div>'+
  '</div>';
}

function layerDetailHtml(i){
  const l = DATA.filmLayers.layers[i];
  return '<h3 class="h3">'+esc(l.name)+'</h3><ul>'+
    l.feats.map((f,n)=>'<li style="animation-delay:'+(n*80+60)+'ms">'+esc(f)+'</li>').join("")+'</ul>';
}

function renderLayer(i){
  const host = document.getElementById("layers3");
  if(!host) return;
  layerIndex = i;
  const l = DATA.filmLayers.layers[i];
  host.querySelectorAll("[data-lyr]").forEach((b,n)=> b.setAttribute("aria-selected", String(n === i)));
  host.querySelectorAll("[data-layer]").forEach((el,n)=> el.classList.toggle("is-on", n === i));
  const d = document.getElementById("lyrDetail");
  if(d) d.innerHTML = layerDetailHtml(i);
}

function initLayers(){
  const host = document.getElementById("layers3");
  if(!host) return;
  layerTouched = false;
  clearInterval(layerTimer);
  renderLayer(0);
  const pick = i => { layerTouched = true; clearInterval(layerTimer); renderLayer(i); };
  const canHover = !window.matchMedia("(hover: none)").matches;
  host.querySelectorAll("[data-lyr]").forEach(b=>{
    const i = parseInt(b.dataset.lyr,10) || 0;
    b.addEventListener("click", ()=> pick(i));
    // reference jaisa: cursor le jaate hi layer badal jati hai
    if(canHover) b.addEventListener("pointerenter", ()=> pick(i));
  });
  // 3D stack ki layer par bhi click chale
  host.querySelectorAll("[data-layer]").forEach(el=>{
    el.style.cursor = "pointer";
    el.addEventListener("click", ()=> pick(parseInt(el.dataset.layer,10) || 0));
  });
  if(!reducedMotion()){
    layerTimer = setInterval(()=>{
      if(layerTouched){ clearInterval(layerTimer); return; }
      renderLayer((layerIndex + 1) % DATA.filmLayers.layers.length);
    }, 3800);
  }
}

function stepsHtml(list){
  return '<div class="steps">'+ list.map(st=>
    '<div class="step"><b>'+esc(st.n)+'</b><h4 class="h4">'+esc(st.title)+'</h4><p>'+esc(st.text)+'</p></div>'
  ).join("") +'</div>';
}

function ctaBand(title, text, primary, secondary){
  return '<section class="band"><div class="wrap band__in">'+
    '<img src="'+ASSETS.mark+'" alt="" aria-hidden="true" />'+
    '<p class="meta">Let\'s talk protection</p>'+
    '<h2 class="h2" style="max-width:20ch">'+title+'</h2>'+
    '<p class="lead">'+text+'</p>'+
    '<div class="btn-row">'+
      '<a class="btn btn--red" href="#/contact">'+DATA.cta.quote+'</a>'+
      (secondary?'<a class="btn btn--ghost" href="#/products">'+DATA.cta.products+'</a>':'')+
    '</div></div></section>';
}

/* ==========================================================================
   PAGE: HOME
   ========================================================================== */
function viewHome(){
  const c = DATA.company;
  /* Hero keeps the original split layout. The right-hand frame is the video
     slot the client asked for: set DATA.site.heroVideo and drop a <video> in. */
  return `
  <section class="hero">
    <span class="hero__wash" aria-hidden="true"></span>
    <div class="beam" aria-hidden="true"><i></i><i></i></div>
    <span class="hero__ghost" aria-hidden="true">EAGLE</span>
    <div class="badge" aria-hidden="true">
      <svg viewBox="0 0 200 200"><defs><path id="badgeArc" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" /></defs>
        <text><textPath href="#badgeArc">EAGLE PPF · PAINT PROTECTION FILM · </textPath></text></svg>
      <span class="badge__mark"><img src="${ASSETS.mark}" alt="" /></span>
    </div>
    <div class="wrap hero__grid hero__stage">
      <div>
        <p class="hero__label"><span class="meta">${esc(DATA.site.tagline)}</span></p>
        <h1 class="h1 txt-reveal">${esc(c.headline)}<br>${esc(c.headlineAccent).replace(/(\S+)$/,'<em>$1</em>')}</h1>
      </div>
      <div class="hero__aside">
        <span class="build-chip">Since 2015 <b>·</b> Pan India <b>·</b> 11+ years</span>
        <p class="hero__quote">${txt(c.heroLead)}</p>
        <div class="btn-row">
          <a class="btn btn--primary" href="#/products">${DATA.cta.products}</a>
          <a class="btn btn--ghost" href="#/contact">${DATA.cta.quote}</a>
        </div>
      </div>
    </div>
    <span class="hero__scroll">Scroll</span>
  </section>

  <section class="stats" aria-label="Eagle PPF at a glance">
    ${c.stats.map(st=>`<div><b>${esc(st.value)}</b><span>${esc(st.label)}</span></div>`).join("")}
  </section>

  <section class="section bg-graphite">
    <div class="wrap split">
      <div>
        <p class="meta">Who we are</p>
        <h2 class="h2" style="margin-top:14px">About Eagle PPF</h2>
        <p class="lead" style="margin-top:18px">${txt(c.intro)}</p>
        <div style="margin-top:30px"><a class="link-arrow" href="#/about">${DATA.cta.about}${ICONS.arrow}</a></div>
      </div>
      <div>${media(null,"Company / vehicle photo",null,"4/3")}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="sec-head">
        <p class="meta">What it protects against</p>
        <h2 class="h2">Benefits</h2>
        <p class="lead">What paint protection film is meant to do for a car. Figures specific to Eagle films are added once confirmed.</p>
      </div>
      <div class="benefits">
        ${DATA.benefits.map(b=>`<div class="benefit">${ICONS[b.icon]}<h3 class="h3">${esc(b.title)}</h3><p>${esc(b.text)}</p></div>`).join("")}
      </div>

      <div style="margin-top:clamp(44px,5vw,66px)">
        <p class="meta" style="margin-bottom:20px">How it works</p>
        ${stepsHtml(DATA.processPPF)}
      </div>

      <div style="margin-top:clamp(48px,6vw,78px)">
        <h3 class="h2 layers-head txt-reveal" style="font-size:clamp(1.9rem,3.6vw,3.1rem)">${esc(DATA.filmLayers.title)}<br>${esc(DATA.filmLayers.title2)}</h3>
        <p class="lead" style="margin-top:20px">${esc(DATA.filmLayers.lead)}</p>
        ${layersHtml()}
      </div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="sec-head" style="display:flex;justify-content:space-between;align-items:end;max-width:none;gap:24px;flex-wrap:wrap">
        <div style="max-width:52ch">
          <p class="meta">The range</p>
          <h2 class="h2">Product range</h2>
          <p class="lead" style="margin-top:14px">Five grades, from essential coverage to a lifetime warranty.</p>
        </div>
        <a class="link-arrow" href="#/products">All products${ICONS.arrow}</a>
      </div>
      <div class="grid-3">${DATA.products.slice(0,3).map(productCard).join("")}</div>
      <div class="grid-3" style="margin-top:22px">${DATA.products.slice(3).map(productCard).join("")}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Material</p><h2 class="h2">${esc(DATA.tpu.title)}</h2>
        <p class="lead">${esc(DATA.tpu.lead)}</p></div>
      <div class="feat-grid" style="--acc:var(--red)">
        ${DATA.tpu.points.map(x=>`<div class="feat">${ICONS.tick}<span>${esc(x.title)}</span></div>`).join("")}
      </div>
      <div style="margin-top:30px"><a class="link-arrow" href="#/about">The technology${ICONS.arrow}</a></div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap grid-2">
      <article class="card tilt" style="--acc:#E8B33A">
        <span class="card__shot"><img src="${esc(DATA.precut.image)}" alt="Eagle PPF Precut paint protection film" loading="lazy" /></span>
        <span class="card__glow"></span>
        <div class="card__body">
          <span class="card__cat">Precut PPF</span>
          <h3 class="h3">${esc(DATA.precut.tagline)}</h3>
          <p>Model-specific patterns for the exterior and the interior — cut before the film ever reaches the car.</p>
          <div class="card__foot"><a class="link-arrow" href="#/precut">Precut PPF${ICONS.arrow}</a></div>
        </div>
      </article>
      <article class="card tilt" style="--acc:#8FB9D8">
        <span class="card__shot"><img src="${esc(DATA.ceramic.image)}" alt="Eagle PPF Ceramic Coating kit" loading="lazy" /></span>
        <span class="card__glow"></span>
        <div class="card__body">
          <span class="card__cat">Ceramic coating</span>
          <h3 class="h3">${esc(DATA.ceramic.tagline)}</h3>
          <p>A hydrophobic, high-gloss layer over the paint — the Eagle Shield on top of everything else.</p>
          <div class="card__foot"><a class="link-arrow" href="#/ceramic">Ceramic coating${ICONS.arrow}</a></div>
        </div>
      </article>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="meta">Eagle assist</p>
        <h2 class="h2" style="margin-top:14px">Not sure which series?</h2>
        <p class="lead" style="margin-top:16px">Answer three questions and we will point you at the grade that fits how you actually use the car — Crystal through to Platinum, precut, or ceramic on top.</p>
        <p class="note" style="margin-top:18px">This is a guided recommendation tool built on our own product range, not a live AI assistant. For anything specific, our team is on WhatsApp.</p>
        <div class="btn-row" style="margin-top:26px"><a class="btn btn--ghost" href="#/products">See all five series</a></div>
      </div>
      <div>${assistHtml()}</div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="sec-head">
        <p class="meta">Why Eagle</p>
        <h2 class="h2">Why Eagle PPF</h2>
        <p class="lead">${txt(c.intro)}</p>
      </div>
      <div class="pillars">
        ${c.pillars.map(p=>`
          <div class="pillar">
            <h3 class="h3">${esc(p.title)}</h3>
            <p>${txt(p.text)}</p>
          </div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="sec-head">
        <p class="meta">Coverage</p>
        <h2 class="h2">Where it goes on the car</h2>
        <p class="lead">Coverage can be as complete or as targeted as the owner wants.</p>
      </div>
      <div class="apps">
        ${DATA.applications.map(a=>`
          <div class="app">${ICONS[a.icon]}<h4 class="h4">${esc(a.title)}</h4><p>${esc(a.text)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  ${ctaBand("Tell us about the car.","Send the vehicle, the coverage you want and where you are. We will come back with options and pricing.",true,true)}`;
}

/* ==========================================================================
   PAGE: ABOUT
   ========================================================================== */
function viewAbout(){
  const c = DATA.company, f = DATA.founder, st = DATA.story, m = DATA.mission, v = DATA.vision, t = DATA.tpu;
  return `
  <section class="section section--tight">
    <div class="wrap">
      <p class="hero__label"><span class="meta">About</span></p>
      <h1 class="h1 txt-reveal">Eagle PPF</h1>
      <p class="lead" style="margin-top:24px">${txt(c.intro)}</p>
      <div class="stats" style="margin-top:44px;border-top:1px solid var(--line)">
        ${c.stats.map(x=>`<div><b>${esc(x.value)}</b><span>${esc(x.label)}</span></div>`).join("")}
      </div>
    </div>
  </section>
  <hr class="rule" />

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="meta">Our story</p>
        <h2 class="h2" style="margin-top:14px">The company</h2>
        <div style="margin-top:22px;display:grid;gap:18px">
          ${c.aboutParas.map(x=>`<p class="body-copy">${esc(x)}</p>`).join("")}
        </div>
      </div>
      <div class="founder-card">
        <p class="meta">Founder</p>
        <p class="name" style="margin-top:18px">${esc(f.name)}</p>
        <p class="role">${esc(f.role)}</p>
        <div style="margin-top:24px;display:grid;gap:16px">
          ${f.paras.map(x=>`<p class="body-copy">${esc(x)}</p>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap split">
      <div>
        <p class="meta">The reason</p>
        <h2 class="h2" style="margin-top:14px">${esc(st.title)}</h2>
        <div style="margin-top:22px;display:grid;gap:18px">
          ${st.paras.map(x=>`<p class="body-copy">${esc(x)}</p>`).join("")}
        </div>
      </div>
      <div>
        <p class="meta">What kept going wrong</p>
        <ul class="story-list" style="margin-top:18px">
          ${st.problems.map(x=>`<li>${esc(x)}</li>`).join("")}
        </ul>
        <div class="focus-row" style="margin-top:30px">
          ${st.focus.map(x=>`<div>${esc(x)}</div>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Material</p><h2 class="h2">${esc(t.title)}</h2>
        <p class="lead">${esc(t.lead)}</p></div>
      <div class="benefits">
        ${t.points.map(x=>`<div class="benefit tilt"><h3 class="h3">${esc(x.title)}</h3><p>${esc(x.text)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap split">
      <div>
        <p class="meta">Every day</p>
        <h2 class="h2" style="margin-top:14px">${esc(m.title)}</h2>
        <p class="lead" style="margin-top:16px">${esc(m.lead)}</p>
        <ul class="mission-list" style="margin-top:26px">
          ${m.words.map((w,i)=>`<li><span>0${i+1}</span>${esc(w)}</li>`).join("")}
        </ul>
      </div>
      <div>
        <p class="meta">Where we are going</p>
        <h2 class="h2" style="margin-top:14px;margin-bottom:24px">${esc(v.title)}</h2>
        <div class="vision-box"><p>${esc(v.text)}</p></div>
        <div style="margin-top:26px">
          <h3 class="h3" style="margin-bottom:16px">What we stand for</h3>
          <ul class="tick-list">
            ${c.values.map(x=>`<li>${ICONS.tick}<span><b style="color:#fff">${esc(x.title)}</b> — ${txt(x.text)}</span></li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div><p class="meta">Capabilities</p><h2 class="h2" style="margin-top:14px">What we do</h2>
        <p class="lead" style="margin-top:16px">Film supply and installation under one roof, across India.</p></div>
      <ul class="feature-list">
        ${c.capabilities.map(x=>`<li>${ICONS.tick}<span>${esc(x)}</span></li>`).join("")}
      </ul>
    </div>
  </section>

  ${ctaBand("Work with Eagle PPF.","Owner, installer or distributor — send an enquiry and we will get back to you.",true,true)}`;
}

/* ==========================================================================
   PAGE: PRODUCTS
   ========================================================================== */
function viewProducts(){
  return `
  <section class="section section--tight">
    <div class="wrap">
      <p class="hero__label"><span class="meta">PPF films</span></p>
      <h1 class="h1 txt-reveal">Five series. One standard.</h1>
      <p class="lead" style="margin-top:24px">${esc(DATA.productsIntro)}</p>
    </div>
  </section>
  <hr class="rule" />
  <section class="section">
    <div class="wrap">
      <nav class="tier-row" aria-label="Jump to a series">
        ${DATA.products.map(p=>`<a href="#/products/${esc(p.slug)}" style="border-color:${esc(p.accent)}40">${esc(p.name)} · ${p.micron}µ</a>`).join("")}
      </nav>
      ${stageTabsHtml()}
      <div id="seriesStage"></div>

      <div class="grid-3" style="margin-top:clamp(40px,5vw,62px)">${DATA.products.slice(0,3).map(productCard).join("")}</div>
      <div class="grid-3" style="margin-top:22px">${DATA.products.slice(3).map(productCard).join("")}</div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="sec-head"><p class="meta">On every series</p><h2 class="h2">What every Eagle film does</h2>
      <p class="lead">The six things printed on every box, across all five series.</p></div>
      <div class="feat-grid" style="--acc:var(--red)">
        ${COMMON_FEATURES.map(f=>`<div class="feat">${ICONS.tick}<span>${esc(f)}</span></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Side by side</p><h2 class="h2">Compare the range</h2>
      <p class="lead">Five grades, one table. Thickness rises with the grade; so does the cover behind it.</p></div>
      <div style="overflow-x:auto">
        <table class="spec" style="min-width:680px">
          <thead><tr><th scope="col" style="width:auto">Series</th><th scope="col">Thickness</th><th scope="col">Replacement cover</th><th scope="col">Warranty</th></tr></thead>
          <tbody>
            ${DATA.products.map(p=>{
              const spec = k => {
                const v = (p.specifications.find(s=>s.label===k)||{}).value;
                return v ? esc(v) : '<span style="color:var(--faint)">On request</span>';
              };
              return `<tr>
                <td><a href="#/products/${esc(p.slug)}" style="color:${esc(p.accent)}">${esc(p.name)}</a></td>
                <td>${spec("Thickness")}</td>
                <td>${spec("Replacement cover")}</td>
                <td>${spec("Warranty")}</td>
              </tr>`;}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  </section>
  ${ctaBand("Not sure which series?","Tell us the car and how it is used. We will recommend the film and the coverage that make sense.",true,false)}`;
}

/* ==========================================================================
   PAGE: PRODUCT DETAIL (one template, every series)
   ========================================================================== */
function viewProduct(slug){
  const p = DATA.products.find(x=>x.slug===slug);
  if(!p) return view404();
  const related = DATA.products.filter(x=>x.slug!==slug).slice(0,3);
  const spec = k => (p.specifications.find(x=>x.label===k)||{}).value || "";
  return `
  <section class="series-hero section section--tight" style="--acc:${esc(p.accent)}">
    <div class="wrap">
      <p class="meta" style="margin-bottom:26px"><a href="#/products" style="color:var(--faint)">PPF films</a> / ${esc(p.name)}</p>
      <div class="pd__top">
        <div class="series-shot parallax" data-speed="0.04">
          <img src="${esc(p.image)}" alt="Eagle PPF ${esc(p.name)} Series ${p.micron} micron paint protection film" />
        </div>
        <div>
          <span class="card__cat" style="color:${esc(p.accent)}">${esc(p.series)}</span>
          <h1 class="h1" style="margin:12px 0 0">${esc(p.name)}</h1>
          <div class="micron-big"><b class="count" data-count="${p.micron}">0</b><span>micron</span></div>
          <p class="lead">${txt(p.description)}</p>
          <p style="margin-top:18px;font-family:var(--font-display);letter-spacing:.22em;text-transform:uppercase;color:${esc(p.accent)}">${esc(p.tagline)}</p>
          <div class="btn-row" style="margin-top:32px">
            <a class="btn btn--red" href="#/contact?product=${esc(p.slug)}">${DATA.cta.enquire}</a>
            <a class="btn btn--ghost" href="#/products">All series</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="--acc:${esc(p.accent)}">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Features</p><h2 class="h2">What this film does</h2></div>
      <div class="feat-grid">
        ${p.features.map(f=>`<div class="feat">${ICONS.tick}<span>${esc(f)}</span></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap split">
      <div>
        <p class="meta">Numbers</p>
        <h2 class="h2" style="margin-top:14px">Specifications</h2>
        <table class="spec" style="margin-top:22px">
          <tbody>${p.specifications.map(x=>`<tr><th scope="row">${esc(x.label)}</th><td>${esc(x.value)}</td></tr>`).join("")}</tbody>
        </table>
        <p class="note" style="margin-top:16px">Anything not listed here — finish options or coverage for a particular panel — is confirmed with your quotation.</p>
      </div>
      <div>
        <p class="meta">Cover</p>
        <h2 class="h2" style="margin-top:14px">Warranty</h2>
        <div style="margin-top:22px;padding:24px;border:1px solid var(--line);border-left:2px solid ${esc(p.accent)};background:var(--panel)">
          <p style="font-size:1.06rem;color:var(--white)">${txt(p.warranty)}</p>
          <p class="note" style="margin-top:10px">Warranty is registered at the time of installation and confirmed in writing with the job card.</p>
        </div>
        <h3 class="h3" style="margin:34px 0 16px">Typical applications</h3>
        <div class="chips">${p.applications.map(a=>`<span class="chip">${esc(a)}</span>`).join("")}</div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="sec-head"><p class="meta">The rest of the range</p><h2 class="h2">Other series</h2></div>
      <div class="grid-3">${related.map(productCard).join("")}</div>
    </div>
  </section>
  ${ctaBand("Ask about "+esc(p.name)+".","Send the vehicle and the coverage you have in mind and we will quote it.",true,false)}`;
}

/* ==========================================================================
   PAGE: PRECUT PPF  (exterior + interior + vehicle selector)
   ========================================================================== */
function viewPrecut(){
  const c = DATA.precut;
  return `
  <section class="section section--tight">
    <div class="wrap">
      <p class="hero__label"><span class="meta">Precut PPF</span></p>
      <h1 class="h1 txt-reveal">${esc(c.title)}</h1>
      <p style="margin-top:18px;font-family:var(--font-display);font-size:clamp(1.1rem,2vw,1.5rem);letter-spacing:.16em;text-transform:uppercase;color:var(--red)">${esc(c.tagline)}</p>
      <p class="lead" style="margin-top:24px">${esc(c.intro)}</p>
    </div>
  </section>

  <section class="section--tight" style="padding-top:0">
    <div class="wrap">
      <div class="frame sheen"><div class="frame__in">
        <img src="${esc(c.image)}" alt="Eagle PPF Precut paint protection film packaging" loading="lazy" style="width:100%" />
      </div></div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Inside and out</p><h2 class="h2">What precut covers</h2>
        <p class="lead">The same pattern precision on both sides of the door.</p></div>
      <div class="switch" id="coverSwitch" role="tablist" aria-label="Exterior or interior coverage">
        <span class="switch__pill" id="coverPill"></span>
        <button role="tab" aria-selected="true"  data-cover="exterior">Exterior</button>
        <button role="tab" aria-selected="false" data-cover="interior">Interior</button>
      </div>
      <div id="coverPanel" style="margin-top:26px"></div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Why precut</p><h2 class="h2">Cut before it reaches the car</h2></div>
      <div class="benefits">
        ${c.benefits.map(b=>`<div class="benefit tilt">${ICONS[b.icon]||ICONS.tick}<h3 class="h3">${esc(b.title)}</h3><p>${esc(b.text)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="sec-head section-line" style="padding-top:26px"><p class="meta">The process</p>
        <h2 class="h2">Vehicle to protection, in five steps</h2></div>
      ${stepsHtml(DATA.processPrecut)}
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Pattern finder</p><h2 class="h2">Tell us what you drive</h2>
        <p class="lead">${esc(DATA.vehicleData.note)}</p></div>
      ${selectorHtml()}
    </div>
  </section>
  ${ctaBand("Precut for your car.","Send the make, model and year. We will check the pattern and come back with coverage options.",true,false)}`;
}

/* ==========================================================================
   PAGE: CERAMIC COATING
   ========================================================================== */
function viewCeramic(){
  const c = DATA.ceramic, sh = c.shield;
  return `
  <section class="section section--tight">
    <div class="wrap">
      <p class="hero__label"><span class="meta">Ceramic coating</span></p>
      <h1 class="h1 txt-reveal">${esc(c.title)}</h1>
      <p style="margin-top:18px;font-family:var(--font-display);font-size:clamp(1.1rem,2vw,1.5rem);letter-spacing:.16em;text-transform:uppercase;color:var(--red)">${esc(c.tagline)}</p>
      <p class="lead" style="margin-top:24px">${esc(c.intro)}</p>
      <div class="chips" style="margin-top:30px">${c.protects.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div>
    </div>
  </section>

  <section class="section--tight" style="padding-top:0">
    <div class="wrap">
      <div class="frame sheen"><div class="frame__in">
        <img src="${esc(c.image)}" alt="Eagle PPF Ceramic Coating kit and packaging" loading="lazy" style="width:100%" />
      </div></div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Why choose it</p><h2 class="h2">Six reasons</h2></div>
      <div class="benefits">
        ${c.reasons.map(r=>`<div class="benefit tilt">${ICONS[r.icon]||ICONS.tick}<h3 class="h3">${esc(r.title)}</h3><p>${esc(r.text)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="meta">How it sits</p>
        <h2 class="h2" style="margin-top:14px">Environment, shield, paint</h2>
        <p class="body-copy" style="margin-top:18px">The coating is not paint and it is not a wax. It is a bonded layer that sits between the world and your finish, so contamination meets the shield first.</p>
        <div class="btn-row" style="margin-top:28px"><a class="btn btn--red" href="#/contact">${DATA.cta.quote}</a></div>
      </div>
      <div class="layers">
        ${DATA.ceramicLayers.map(l=>`<div class="layer ${esc(l.cls)}"><b>${esc(l.tag)}</b><h4 class="h4">${esc(l.title)}</h4><p>${esc(l.text)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="shield">
        <div class="drops" aria-hidden="true">${
          [[12,18,26],[26,62,16],[44,28,34],[61,72,20],[78,22,28],[88,58,14],[34,84,18],[68,46,22]]
          .map(([l,t,sz],i)=>`<i class="drop" style="left:${l}%;top:${t}%;width:${sz}px;height:${sz}px;animation-delay:${i*0.7}s"></i>`).join("")
        }</div>
        <p class="meta" style="justify-content:center">${esc(sh.tagline)}</p>
        <h2 class="h2 txt-reveal" style="margin-top:16px">${esc(sh.title)}</h2>
        <p class="lead" style="margin:20px auto 0;text-align:center">${esc(sh.text)}</p>
        <div class="chips">${sh.chips.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div>
      </div>
    </div>
  </section>
  ${ctaBand("Book a ceramic coating.","Tell us the car and its condition and we will advise on preparation and finish.",true,false)}`;
}

/* ==========================================================================
   PAGE: DISTRIBUTOR
   ========================================================================== */
function viewDistributor(){
  const d = DATA.distributor;
  return `
  <section class="section section--tight">
    <div class="wrap">
      <p class="hero__label"><i></i><span class="meta">Distributor</span></p>
      <h1 class="h1" style="max-width:17ch">Sell Eagle PPF in your market.</h1>
      <p class="lead" style="margin-top:24px">${txt(d.lead)}</p>
      <div class="btn-row" style="margin-top:32px">
        <button class="btn btn--primary" type="button" onclick="document.getElementById('distributor-form').scrollIntoView({behavior:'smooth'})">${DATA.cta.distributor}</button>
        <a class="btn btn--ghost" href="#/products">${DATA.cta.products}</a>
      </div>
    </div>
  </section>
  <hr class="rule" />

  <section class="section">
    <div class="wrap">
      <div class="sec-head"><p class="meta">Partner programme</p><h2 class="h2">What you get</h2></div>
      <div class="benefits">
        ${d.benefits.map(b=>`<div class="benefit"><h3 class="h3">${label(b.title)}</h3><p>${txt(b.text)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap split">
      <div>
        <h2 class="h2">How it works</h2>
        <p class="lead" style="margin-top:16px">Three steps from application to first order.</p>
      </div>
      <div>
        <div class="dist-steps" style="grid-template-columns:1fr">
          ${d.steps.map((st,i)=>`<div class="dist-step" style="border-left:1px solid var(--line)"><span>Step 0${i+1}</span><h3 class="h3" style="margin-bottom:10px">${esc(st.title)}</h3><p style="color:var(--dim);font-size:.94rem">${txt(st.text)}</p></div>`).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div>
        <h2 class="h2">What we look for</h2>
        <p class="lead" style="margin-top:16px">Requirements are confirmed by the company before this page goes live.</p>
      </div>
      <ul class="feature-list">
        ${d.requirements.map(r=>`<li>${ICONS.tick}<span>${label(r)}</span></li>`).join("")}
      </ul>
    </div>
  </section>

  <section class="section bg-graphite" id="distributor-form">
    <div class="wrap split">
      <div>
        <h2 class="h2" style="margin-bottom:26px">Apply for distribution</h2>
        ${formHtml("distributor")}
        <div id="formState" style="margin-top:22px"></div>
      </div>
      <aside>
        ${contactCard()}
      </aside>
    </div>
  </section>`;
}

/* ==========================================================================
   PAGE: PRODUCT DETAIL  (one template, every product)
   ========================================================================== */
function viewProduct(slug){
  const p = DATA.products.find(x=>x.slug===slug);
  if(!p) return view404();
  const related = DATA.products.filter(x=>x.slug!==slug).slice(0,3);
  return `
  <section class="section section--tight">
    <div class="wrap">
      <p class="meta" style="margin-bottom:26px"><a href="#/products" style="color:var(--faint)">Products</a> / ${label(p.name)}</p>
      <div class="pd__top">
        <div>
          ${media(p.image,"Product image — "+p.name, p.status==="coming-soon"?"Coming soon":null,"4/3")}
          <div class="thumbs">
            ${p.gallery.map((g,i)=>`<button class="thumb" aria-pressed="${i===0}" aria-label="Image ${i+1}">IMG ${i+1}</button>`).join("")}
          </div>
        </div>
        <div>
          <span class="card__cat">${label(p.category)}</span>
          <h1 class="h1" style="font-size:clamp(2.1rem,4.4vw,3.2rem);margin:14px 0 20px">${label(p.name)}</h1>
          <p class="lead">${txt(p.description)}</p>
          <div class="btn-row" style="margin-top:32px">
            <a class="btn btn--primary" href="#/contact?product=${esc(p.slug)}">${DATA.cta.enquire}</a>
            <a class="btn btn--ghost" href="#/products">All films</a>
          </div>
          <p class="note" style="margin-top:22px">Availability: ${p.status==="coming-soon"?"coming soon":"available now"}.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap split">
      <div>
        <h2 class="h2">Key features</h2>
        <ul class="feature-list" style="margin-top:22px">
          ${p.features.map(f=>`<li>${ICONS.tick}<span>${label(f)}</span></li>`).join("")}
        </ul>
      </div>
      <div>
        <h2 class="h2">Specifications</h2>
        <table class="spec" style="margin-top:22px">
          <tbody>${p.specifications.map(s=>`<tr><th scope="row">${esc(s.label)}</th><td>${label(s.value)}</td></tr>`).join("")}</tbody>
        </table>
        <p class="note" style="margin-top:16px">Anything not listed here — finish options, coverage area, or thickness for a particular panel — is confirmed with your quotation. Call or WhatsApp and we will go through it.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap grid-2">
      <div>
        <h2 class="h2">Typical applications</h2>
        <div class="chips" style="margin-top:22px">${p.applications.map(a=>`<span class="chip">${label(a)}</span>`).join("")}</div>
      </div>
      <div>
        <h2 class="h2">Warranty</h2>
        <div style="margin-top:22px;padding:22px;border:1px solid var(--line);border-left:2px solid var(--red);background:var(--panel)">
          <p style="font-size:1.04rem;color:var(--white)">${txt(p.warranty)}</p>
          <p class="note" style="margin-top:10px">Warranty is registered at the time of installation. Terms are confirmed in writing with the job card.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section bg-graphite">
    <div class="wrap">
      <div class="sec-head"><h2 class="h2">Other films</h2></div>
      <div class="grid-3">${related.map(productCard).join("")}</div>
    </div>
  </section>
  ${ctaBand("Ask about "+(isPh(p.name)?"this film":esc(p.name))+".","Send the vehicle and coverage you have in mind and we will quote it.",true,false)}`;
}

/* ==========================================================================
   PAGE: CONTACT / REQUEST A QUOTE
   ========================================================================== */
/* ---- Form definitions. One renderer, two forms. ------------------------ */
const FIELD_DEFS = {
  name:    { label:"Name", ac:"name", rule:v=> v.trim().length>=2 || "Enter your name." },
  phone:   { label:"Phone", type:"tel", ac:"tel", rule:v=> v.replace(/\D/g,"").length>=7 || "Enter a phone number we can reach you on." },
  email:   { label:"Email", type:"email", ac:"email", rule:v=> /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.trim()) || "Enter a valid email address, like name@example.com." },
  company: { label:"Company / business name", ac:"organization", rule:v=> v.trim().length>=2 || "Enter your business name." },
  city:    { label:"City and state", rule:v=> v.trim().length>=2 || "Tell us where you are based." },
  vehicle: { label:"Vehicle", placeholder:"Make, model, year", rule:v=> v.trim().length>=2 || "Tell us the make and model." },
  message: { label:"Message", el:"textarea", rule:v=> v.trim().length>=10 || "Add a little more detail so we can reply properly." },
  product: { label:"Product of interest", el:"select" },
  requirement:{ label:"Requirement", el:"select" },
  volume:  { label:"Expected monthly volume", placeholder:"Rolls or square feet per month" },
  business:{ label:"Current business", placeholder:"Detailing studio, workshop, retail counter…" }
};
const FORMS = {
  quote:       { fields:["name","phone","email","company","vehicle","product","requirement","message"],
                 required:["name","phone","email","vehicle","message"], submit:()=>DATA.cta.quote },
  distributor: { fields:["name","phone","email","company","city","business","volume","message"],
                 required:["name","phone","email","company","city","message"], submit:()=>DATA.cta.distributor }
};

function fieldHtml(key, cfg, preselect){
  const d = FIELD_DEFS[key], req = cfg.required.includes(key);
  const lab = '<label for="f-'+key+'">'+esc(d.label)+(req?'<span class="req" aria-hidden="true">*</span>':
      ' <span style="text-transform:none;letter-spacing:0;color:var(--faint)">(optional)</span>')+'</label>';
  const err = '<p class="err" id="e-'+key+'" aria-live="polite"></p>';
  let ctrl;
  if(key === "product"){
    ctrl = '<select id="f-product" name="product"><option value="">No preference yet</option>'+
      DATA.products.map(p=>'<option value="'+esc(p.slug)+'"'+(p.slug===preselect?" selected":"")+'>'+esc(p.name)+'</option>').join("")+'</select>';
  } else if(key === "requirement"){
    ctrl = '<select id="f-requirement" name="requirement">'+
      DATA.contact.requirementOptions.map(o=>'<option>'+esc(o)+'</option>').join("")+'</select>';
  } else if(d.el === "textarea"){
    ctrl = '<textarea id="f-'+key+'" name="'+key+'"'+(req?' required':'')+' aria-describedby="e-'+key+'"></textarea>';
  } else {
    ctrl = '<input id="f-'+key+'" name="'+key+'" type="'+(d.type||"text")+'"'+
      (d.ac?' autocomplete="'+d.ac+'"':'')+(d.placeholder?' placeholder="'+esc(d.placeholder)+'"':'')+
      (req?' required':'')+' aria-describedby="e-'+key+'" />';
  }
  return '<div class="field">'+lab+ctrl+err+'</div>';
}

function formHtml(type, preselect){
  const cfg = FORMS[type];
  const rows = [];
  const fs = cfg.fields.slice();
  while(fs.length){
    const a = fs.shift();
    const wide = FIELD_DEFS[a].el === "textarea" || FIELD_DEFS[a].el === "select";
    if(wide){ rows.push('<div class="field-wide">'+fieldHtml(a,cfg,preselect)+'</div>'); continue; }
    const b = (fs.length && FIELD_DEFS[fs[0]].el !== "textarea" && FIELD_DEFS[fs[0]].el !== "select") ? fs.shift() : null;
    rows.push(b ? '<div class="form__row">'+fieldHtml(a,cfg,preselect)+fieldHtml(b,cfg,preselect)+'</div>'
               : '<div class="field-wide">'+fieldHtml(a,cfg,preselect)+'</div>');
  }
  return '<form class="form" id="quoteForm" data-type="'+type+'" novalidate>'+rows.join("")+
    '<button class="btn btn--primary btn--block" type="submit" id="submitBtn">'+cfg.submit()+'</button>'+
    '<p class="note">Fields marked <span style="color:var(--red)">*</span> are required. '+
    'We reply during working hours — '+txt(DATA.contact.hours)+' '+
    'For anything urgent, WhatsApp is faster.</p></form>';
}

function contactCard(){
  const c = DATA.contact;
  const row = (k,v,href) => '<li><span style="color:var(--faint);display:block;font-family:var(--font-display);font-size:.84rem;letter-spacing:.18em;text-transform:uppercase">'+k+'</span>'+
    (href?'<a href="'+href+'" style="color:#fff">'+txt(v)+'</a>':txt(v))+'</li>';
  return '<div class="frame"><div class="frame__in" style="padding:32px">'+
    '<h2 class="h3" style="margin-bottom:24px">Contact details</h2>'+
    '<ul style="display:grid;gap:20px;font-size:.98rem">'+
      row("Address",c.address,c.mapsLink)+
      row("Phone",c.phone,"tel:+"+c.phoneRaw)+
      row("WhatsApp",c.whatsapp,"https://wa.me/"+c.phoneRaw)+
      row("Email",c.email)+
      row("Hours",c.hours)+
      row("Service area",{ph:false,text:c.areaServed})+
    '</ul>'+
    '<div class="btn-row" style="margin-top:28px"><a class="btn btn--red" href="https://wa.me/'+c.phoneRaw+'" rel="noopener">WhatsApp us</a>'+
    '<a class="btn btn--ghost" href="tel:+'+c.phoneRaw+'">Call now</a></div>'+
    '</div></div>';
}

/* ==========================================================================
   PAGE: CONTACT US
   ========================================================================== */
function viewContact(preselect){
  const c = DATA.contact;
  return `
  <section class="section section--tight">
    <div class="wrap">
      <p class="hero__label"><i></i><span class="meta">Contact us</span></p>
      <h1 class="h1" style="max-width:16ch">Talk to Eagle PPF.</h1>
      <p class="lead" style="margin-top:24px">Call, message on WhatsApp, or send the form below. For distribution enquiries, use the distributor page.</p>
      <div class="info-3" style="margin-top:36px">
        <div><h3>Call or WhatsApp</h3><p><a href="tel:+${c.phoneRaw}">${txt(c.phone)}</a></p>
          <p style="margin-top:10px"><a class="link-arrow" href="https://wa.me/${c.phoneRaw}" rel="noopener">WhatsApp${ICONS.arrow}</a></p></div>
        <div><h3>Hours</h3><p style="font-size:.96rem">${txt(c.hours)}</p>
          <p style="margin-top:10px;font-size:.92rem;color:var(--faint)">Service area: ${esc(c.areaServed)}</p></div>
        <div><h3>Visit</h3><p style="font-size:.96rem">${txt(c.address)}</p>
          <p style="margin-top:10px"><a class="link-arrow" href="${c.mapsLink}" rel="noopener">Directions${ICONS.arrow}</a></p></div>
      </div>
    </div>
  </section>
  <hr class="rule" />

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="meta">Fastest reply</p>
        <div class="quick" style="margin-top:18px">
          <a href="https://wa.me/${c.phoneRaw}" rel="noopener"><b>WhatsApp us</b><span>Send the car and we reply with options</span></a>
          <a href="tel:+${c.phoneRaw}"><b>Call the workshop</b><span>${txt(c.phone)}</span></a>
        </div>
        <h2 class="h2" style="margin-bottom:26px">Or send the details</h2>
        ${formHtml("quote", preselect)}
        <div id="formState" style="margin-top:22px"></div>
      </div>
      <aside>
        ${contactCard()}
        <div style="margin-top:22px">
          ${c.mapEmbed
            ? `<div class="frame"><div class="frame__in" style="aspect-ratio:4/3"><iframe src="${esc(c.mapEmbed)}" title="Eagle PPF location" style="width:100%;height:100%;border:0" loading="lazy"></iframe></div></div>`
            : `<div class="frame"><div class="frame__in" style="padding:32px;display:grid;gap:16px">
                 <p class="meta">Workshop</p>
                 <p style="font-size:1.02rem;color:var(--text)">${txt(c.address)}</p>
                 <p style="font-size:.92rem;color:var(--faint)">${txt(c.hours)}</p>
                 <a class="btn btn--ghost" href="${c.mapsLink}" rel="noopener" style="justify-self:start">Open in Google Maps</a>
               </div></div>`}
        </div>
      </aside>
    </div>
  </section>`;
}

function view404(){
  return `<section class="section" style="min-height:52vh"><div class="wrap">
    <p class="meta">404</p>
    <h1 class="h1" style="margin:18px 0 20px;max-width:14ch">That page does not exist.</h1>
    <p class="lead">The link may be out of date. Start from the range or send us an enquiry.</p>
    <div class="btn-row" style="margin-top:30px">
      <a class="btn btn--primary" href="#/products">${DATA.cta.products}</a>
      <a class="btn btn--ghost" href="#/">Back to home</a>
    </div></div></section>`;
}

/* ==========================================================================
   CHROME: header nav, mobile drawer, footer
   ========================================================================== */
function renderChrome(){
  $("#brandMark").src = ASSETS.mark;
  $("#nav").innerHTML = DATA.navigation.primary.map(n=>`<a href="${n.href}">${esc(n.label)}</a>`).join("");
  $("#drawer").innerHTML =
    DATA.navigation.primary.map(n=>`<a class="drawer__link" href="${n.href}">${esc(n.label)}</a>`).join("") +
    `<a class="btn btn--red btn--block" href="#/contact">${DATA.cta.quote}</a>
     <div class="drawer__contact">
       <a href="tel:+${DATA.contact.phoneRaw}">${txt(DATA.contact.phone)}</a>
       <a href="https://wa.me/${DATA.contact.phoneRaw}" rel="noopener">WhatsApp</a>
       <span style="color:var(--faint)">${txt(DATA.contact.hours)}</span>
     </div>`;

  $("#footer").innerHTML = `
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__brand">
          <img src="${ASSETS.lockup}" alt="Eagle PPF" />
          <p style="font-size:.94rem;color:var(--dim);max-width:34ch">${txt(DATA.company.intro)}</p>
        </div>
        <div><h4>Pages</h4><ul>${DATA.navigation.footer.map(n=>`<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("")}</ul></div>
        <div><h4>Products</h4><ul>${DATA.products.map(p=>`<li><a href="#/products/${esc(p.slug)}">${label(isPh(p.name)?p.category:p.name)}</a></li>`).join("")}</ul></div>
        <div><h4>Contact</h4><ul>
          <li><a href="${DATA.contact.mapsLink}" rel="noopener">${txt(DATA.contact.address)}</a></li>
          <li><a href="tel:+${DATA.contact.phoneRaw}">${txt(DATA.contact.phone)}</a></li>
          <li><a href="https://wa.me/${DATA.contact.phoneRaw}" rel="noopener">WhatsApp ${txt(DATA.contact.whatsapp)}</a></li>
          <li>${txt(DATA.contact.email)}</li>
          <li style="color:var(--faint)">${txt(DATA.contact.hours)}</li>
        </ul>
        <div class="socials" style="margin-top:18px">
          ${DATA.contact.socials.map(s=>`<a href="${esc(s.href)}" aria-label="${esc(s.label)}" rel="noopener">${ICONS[s.icon]}</a>`).join("")}
        </div></div>
      </div>
      <div class="footer__bottom">
        <span>© ${new Date().getFullYear()} ${esc(DATA.site.name)}. All rights reserved.</span>
      </div>
    </div>`;
}

/* Mobile drawer */
const burger = $("#burger"), drawer = $("#drawer");
function setDrawer(open){
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  drawer.hidden = false;
  drawer.classList.toggle("is-open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
burger.addEventListener("click", ()=> setDrawer(burger.getAttribute("aria-expanded")!=="true"));
drawer.addEventListener("click", e=>{ if(e.target.closest("a")) setDrawer(false); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") setDrawer(false); });

/* Header hairline on scroll */
const header = $("#header");
const onScroll = ()=> header.classList.toggle("is-stuck", window.scrollY > 8);
addEventListener("scroll", onScroll, {passive:true}); onScroll();
addEventListener("scroll", ()=> requestAnimationFrame(runParallax), {passive:true});
addEventListener("resize", ()=>{ initParallax(); runParallax(); }, {passive:true});

/* ==========================================================================
   FORM: validation, loading, success and error states
   ========================================================================== */
function validateField(form, key){
  const input = form.elements[key];
  const box = document.getElementById("e-"+key);
  if(!input || !box || !FIELD_DEFS[key].rule) return true;
  const res = FIELD_DEFS[key].rule(input.value);
  const ok = res === true;
  input.setAttribute("aria-invalid", String(!ok));
  box.innerHTML = ok ? "" : ICONS.alert + "<span>" + esc(res) + "</span>";
  return ok;
}

function bindForm(){
  const form = $("#quoteForm"); if(!form) return;
  const cfg = FORMS[form.dataset.type];
  if(!cfg) return;   // form ke bina page pe kuch bind nahi karna
  cfg.required.forEach(k=>{
    const el = form.elements[k]; if(!el) return;
    el.addEventListener("blur", ()=> validateField(form,k));
    el.addEventListener("input", ()=>{ if(el.getAttribute("aria-invalid")==="true") validateField(form,k); });
  });

  form.addEventListener("submit", async e=>{
    e.preventDefault();
    const bad = cfg.required.filter(k=> !validateField(form,k));
    if(bad.length){ form.elements[bad[0]].focus(); return; }

    const btn = $("#submitBtn"), state = $("#formState");
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span> Sending';
    state.innerHTML = "";

    /* ---------------- delivery ----------------
       Raasta DATA.forms.mode se tay hota hai. "auto" pehle server try karta
       hai, na chale to mail app khol deta hai — enquiry kabhi kho ke nahi
       jaati. Koi secret key yahan nahi hai: web3forms ki key public hoti
       hai, aur PHP/Cloudflare wale raaste me mail server side se jaata hai. */
    const f = DATA.forms;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.enquiry_type = form.dataset.type;
    payload.page = location.hash || "#/";

    let ok = false, delivered = false, errMsg = "";

    const postJson = async (url) => {
      const res = await fetch(url, {
        method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" },
        body: JSON.stringify(payload)
      });
      return res.ok;
    };

    const openMail = () => {
      const order = ["enquiry_type","name","phone","email","company","city","business","volume","vehicle","product","requirement","message"];
      const pretty = { enquiry_type:"Enquiry type", name:"Name", phone:"Phone", email:"Email",
        company:"Company", city:"City", business:"Current business", volume:"Expected volume",
        vehicle:"Vehicle", product:"Product of interest", requirement:"Requirement", message:"Message" };
      const body = order.filter(k=> String(payload[k]||"").trim())
                        .map(k=> pretty[k] + ": " + payload[k]).join("\n");
      window.location.href = "mailto:" + f.mailtoTo +
        "?subject=" + encodeURIComponent(f.subjectPrefix + " \u2014 " + (payload.name || "new enquiry")) +
        "&body=" + encodeURIComponent(body);
    };

    try{
      if(f.mode === "web3forms" && f.web3formsKey){
        const res = await fetch(f.web3formsEndpoint, {
          method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" },
          body: JSON.stringify({ access_key:f.web3formsKey, from_name:"Eagle PPF website",
            subject: f.subjectPrefix + " \u2014 " + (payload.name||"enquiry"), ...payload })
        });
        ok = res.ok; delivered = ok;
        if(!ok) errMsg = "Server returned " + res.status;

      } else if(f.mode === "php"){
        ok = delivered = await postJson(f.serverEndpoint);

      } else if(f.mode === "server"){
        ok = delivered = await postJson(f.cloudflareEndpoint);

      } else if(f.mode === "mailto"){
        openMail(); await new Promise(r=> setTimeout(r, 400));
        ok = true; delivered = "mailto";

      } else if(f.mode === "auto"){
        // 1. web3forms (agar key hai), 2. host ka handler, 3. Cloudflare function, 4. mail app
        if(f.web3formsKey){
          try{
            const res = await fetch(f.web3formsEndpoint, {
              method:"POST", headers:{ "Content-Type":"application/json", Accept:"application/json" },
              body: JSON.stringify({ access_key:f.web3formsKey, from_name:"Eagle PPF website",
                subject: f.subjectPrefix + " \u2014 " + (payload.name||"enquiry"), ...payload })
            });
            if(res.ok) ok = delivered = true;
          }catch(e){ /* agla try */ }
        }
        if(!ok) for(const url of [f.serverEndpoint, f.cloudflareEndpoint]){
          try{ if(await postJson(url)){ ok = delivered = true; break; } }catch(e){ /* agla try */ }
        }
        if(!ok){ openMail(); await new Promise(r=> setTimeout(r, 400)); ok = true; delivered = "mailto"; }

      } else {
        await new Promise(r=> setTimeout(r, f.delay));
        ok = true; delivered = false;   // preview mode
        console.info("Enquiry captured (preview mode \u2014 nothing sent):", payload);
      }
    }catch(err){
      ok = false; errMsg = err.message || "Network error";
    }

    btn.disabled = false;
    btn.textContent = cfg.submit();

    if(ok){
      form.reset();
      state.innerHTML = '<div class="state state--ok" role="status">'+
        '<p class="meta">Sent</p>'+
        '<h3 class="h3">Thank you — your enquiry has reached us</h3>'+
        (delivered === "mailto"
          ? '<p class="body-copy">Your email app has opened with every detail already filled in — just press send and it reaches '+txt(DATA.contact.email)+'.</p>'+
            '<p class="body-copy">If nothing opened, no problem: <a href="https://wa.me/'+DATA.contact.phoneRaw+'" style="color:#fff;border-bottom:1px solid var(--red)">WhatsApp us</a> instead, or email '+txt(DATA.contact.email)+' directly.</p>'
          : delivered
          ? '<p class="body-copy">It has landed in the Eagle PPF inbox ('+txt(DATA.contact.email)+'). We reply during working hours: '+txt(DATA.contact.hours)+'</p>'+
            '<p class="body-copy">Need it sooner? <a href="https://wa.me/'+DATA.contact.phoneRaw+'" style="color:#fff;border-bottom:1px solid var(--red)">WhatsApp us</a> and we will pick it up straight away.</p>'
          : '<p class="body-copy">Note for the Eagle PPF team: the form is in preview mode, so nothing was emailed. Set <b>DATA.forms.mode</b> in assets/js/data.js to switch delivery on.</p>')+
        '</div>';
    } else {
      state.innerHTML = '<div class="state state--err" role="alert">'+
        '<h3 class="h3">The enquiry did not go through</h3>'+
        '<p class="body-copy">Nothing was sent'+(errMsg?' ('+esc(errMsg)+')':'')+'. Please try again, or reach us directly on '+
        '<a href="https://wa.me/'+DATA.contact.phoneRaw+'" style="color:#fff;border-bottom:1px solid var(--red)">WhatsApp</a> '+
        'or '+txt(DATA.contact.phone)+'.</p>'+
        '<div><button class="btn btn--ghost" type="button" onclick="document.getElementById(\'quoteForm\').requestSubmit()">Try again</button></div></div>';
    }
    state.scrollIntoView({behavior:"smooth", block:"nearest"});
  });
}

/* ==========================================================================
   SERIES STAGE — Crystal .. Platinum switcher.
   Sirf stage ka andar ka hissa badalta hai (image, naam, micron, features,
   accent light) — poora page dobara render nahi hota, isliye transition
   smooth rehti hai.
   ========================================================================== */
let stageIndex = 0;
function renderStage(){
  const host = document.getElementById("seriesStage");
  if(!host) return;
  if(stageIndex >= DATA.products.length) stageIndex = 0;
  const p = DATA.products[stageIndex];
  const spec = k => (p.specifications.find(x=>x.label===k)||{}).value || "";

  host.innerHTML =
    '<div class="stage" style="--acc:'+esc(p.accent)+'">'+
      '<div class="stage__shot"><img src="'+esc(p.image)+'" alt="Eagle PPF '+esc(p.name)+' Series '+p.micron+' micron" /></div>'+
      '<div>'+
        '<span class="card__cat" style="color:'+esc(p.accent)+'">'+esc(p.series)+'</span>'+
        '<h3 class="stage__name" style="margin:10px 0 0">'+esc(p.name)+'</h3>'+
        '<div class="micron-big"><b class="count" data-count="'+p.micron+'">0</b><span>micron</span></div>'+
        '<p class="body-copy">'+txt(p.shortDescription)+'</p>'+
        '<div class="stage__feats">'+ p.features.map((f,i)=>
            '<span style="animation-delay:'+(i*60)+'ms">'+esc(f)+'</span>').join("") +'</div>'+
        '<div class="sel-summary" style="margin-top:22px">'+
          (spec("Warranty") ? '<span>Warranty <b>'+esc(spec("Warranty"))+'</b></span>' : '')+
          (spec("Replacement cover") ? '<span>Replacement <b>'+esc(spec("Replacement cover"))+'</b></span>' : '')+
        '</div>'+
        '<div class="btn-row" style="margin-top:12px">'+
          '<a class="btn btn--primary" href="#/products/'+esc(p.slug)+'">'+DATA.cta.detail+'</a>'+
          '<a class="btn btn--ghost" href="#/contact?product='+esc(p.slug)+'">'+DATA.cta.enquire+'</a>'+
        '</div>'+
      '</div>'+
    '</div>';

  const tabs = document.getElementById("stageTabs");
  if(tabs) tabs.querySelectorAll("button").forEach((b,i)=>{
    b.setAttribute("aria-selected", String(i === stageIndex));
    b.style.setProperty("--tab-acc", DATA.products[i].accent);
  });
  initCounters();
  initTilt();
}

function stageTabsHtml(){
  return '<div class="stage__tabs" id="stageTabs" role="tablist" aria-label="Choose a series">'+
    DATA.products.map((p,i)=>'<button role="tab" data-stage="'+i+'" aria-selected="'+(i===0)+'" style="--tab-acc:'+esc(p.accent)+'">'+
      esc(p.name)+'</button>').join("") +'</div>';
}

/* ==========================================================================
   PRECUT COVERAGE SWITCH — exterior / interior
   ========================================================================== */
function renderCoverage(which){
  const panel = document.getElementById("coverPanel");
  if(!panel) return;
  const c = DATA.precut;
  const list  = which === "interior" ? c.interior : c.exterior;
  const title = which === "interior" ? "The panels that meet your hands" : "The panels that meet the road";
  const half  = Math.ceil(list.length / 2);
  const col = items => '<ul class="tick-list">'+ items.map(x=>'<li>'+ICONS.tick+'<span>'+esc(x)+'</span></li>').join("") +'</ul>';
  panel.innerHTML = '<div class="panel-fade"><h3 class="h3" style="margin-bottom:20px">'+esc(title)+'</h3>'+
    '<div class="grid-2" style="gap:0 var(--gutter)">'+ col(list.slice(0,half)) + col(list.slice(half)) +'</div></div>';

  const sw = document.getElementById("coverSwitch"), pill = document.getElementById("coverPill");
  if(sw && pill){
    sw.querySelectorAll("button").forEach(b=>{
      const on = b.dataset.cover === which;
      b.setAttribute("aria-selected", String(on));
      if(on){ pill.style.left = b.offsetLeft + "px"; pill.style.width = b.offsetWidth + "px"; }
    });
  }
}

/* ==========================================================================
   VEHICLE PATTERN SELECTOR
   Make -> Model -> Year -> Coverage. Demo data aati hai DATA.vehicleData se.
   Asli pattern database aane par sirf wo object badalna hai (ya API se load
   karana hai) — niche ka code waise ka waisa chalega.
   Koi pattern "available hai" aisa dawa nahi kiya jata; selection seedhe
   enquiry form me chali jati hai jahan team confirm karti hai.
   ========================================================================== */
const SEL_STEPS = ["Make","Model","Year","Coverage"];
let selState = { make:null, model:null, year:null, coverage:null };

function selectorHtml(){
  return '<div class="selector" id="selector">'+
    '<div class="selector__steps">'+ SEL_STEPS.map((x,i)=>'<div data-step="'+i+'">0'+(i+1)+' · '+x+'</div>').join("") +'</div>'+
    '<div class="selector__body" id="selectorBody"></div>'+
  '</div>';
}

function renderSelector(){
  const body = document.getElementById("selectorBody");
  if(!body) return;
  const v = DATA.vehicleData;
  const stepIndex = !selState.make ? 0 : !selState.model ? 1 : !selState.year ? 2 : !selState.coverage ? 3 : 4;

  document.querySelectorAll("#selector .selector__steps div").forEach((el,i)=>{
    el.classList.toggle("is-active", i === stepIndex);
    el.classList.toggle("is-done", i < stepIndex);
  });

  const chips = [];
  if(selState.make)  chips.push('<span>Make <b>'+esc(selState.make)+'</b></span>');
  if(selState.model) chips.push('<span>Model <b>'+esc(selState.model)+'</b></span>');
  if(selState.year)  chips.push('<span>Year <b>'+esc(selState.year)+'</b></span>');
  if(selState.coverage) chips.push('<span>Coverage <b>'+esc(selState.coverage)+'</b></span>');
  const summary = chips.length ? '<div class="sel-summary">'+chips.join("")+
      '<button class="opt" data-reset="1" style="padding:7px 13px">Start again</button></div>' : '';

  let inner = "";
  if(stepIndex === 0){
    inner = '<p class="meta" style="margin-bottom:18px">Choose the make</p><div class="opt-grid">'+
      Object.keys(v.makes).map(m=>'<button class="opt" data-pick="make" data-value="'+esc(m)+'">'+esc(m)+'</button>').join("")+'</div>';
  } else if(stepIndex === 1){
    inner = '<p class="meta" style="margin-bottom:18px">Choose the model</p><div class="opt-grid">'+
      v.makes[selState.make].models.map(m=>'<button class="opt" data-pick="model" data-value="'+esc(m)+'">'+esc(m)+'</button>').join("")+'</div>';
  } else if(stepIndex === 2){
    inner = '<p class="meta" style="margin-bottom:18px">Model year</p><div class="opt-grid">'+
      v.makes[selState.make].years.map(y=>'<button class="opt" data-pick="year" data-value="'+esc(y)+'">'+esc(y)+'</button>').join("")+'</div>';
  } else if(stepIndex === 3){
    inner = '<p class="meta" style="margin-bottom:18px">What should be protected?</p><div class="opt-grid">'+
      v.coverage.map(c=>'<button class="opt" data-pick="coverage" data-value="'+esc(c.label)+'">'+esc(c.label)+'<small>'+esc(c.note)+'</small></button>').join("")+'</div>';
  } else {
    const msg = "Precut PPF enquiry — " + selState.make + " " + selState.model + " " + selState.year + ", " + selState.coverage + " coverage.";
    inner = '<div style="display:grid;gap:18px">'+
      '<div><p class="meta">Ready</p><h3 class="h3" style="margin-top:12px">'+esc(selState.make+" "+selState.model+" "+selState.year)+'</h3>'+
      '<p class="body-copy" style="margin-top:10px">'+esc(selState.coverage)+' coverage. '+esc(DATA.vehicleData.note)+'</p></div>'+
      '<div class="btn-row"><a class="btn btn--red" href="https://wa.me/'+DATA.contact.phoneRaw+'?text='+encodeURIComponent(msg)+'" rel="noopener">Send on WhatsApp</a>'+
      '<a class="btn btn--ghost" href="#/contact?vehicle='+encodeURIComponent(selState.make+" "+selState.model+" "+selState.year)+'">Use the enquiry form</a></div></div>';
  }
  body.innerHTML = summary + inner;

  body.querySelectorAll("[data-pick]").forEach(btn=> btn.addEventListener("click", ()=>{
    selState[btn.dataset.pick] = btn.dataset.value;
    if(btn.dataset.pick === "make"){ selState.model = null; selState.year = null; selState.coverage = null; }
    renderSelector();
  }));
  const reset = body.querySelector("[data-reset]");
  if(reset) reset.addEventListener("click", ()=>{ selState = { make:null, model:null, year:null, coverage:null }; renderSelector(); });
}

/* ==========================================================================
   EAGLE ASSIST — guided recommendation, not a live AI.
   Rules Eagle ke apne range par bane hain. Aage koi asli AI/API jodni ho to
   askAssist() ko async bana kar wahan fetch laga dena; UI same rahega.
   ========================================================================== */
const ASSIST = {
  start: {
    bot: "Tell me how the car is used and I will point you at the right series.",
    opts: [
      { label:"Daily city driving", next:"daily" },
      { label:"Highway / long runs", next:"highway" },
      { label:"New or premium car", next:"premium" },
      { label:"Interior scratches", next:"interior" },
      { label:"Just want more gloss", next:"gloss" }
    ]
  },
  daily: { bot:"City use is mostly parking scuffs, door edges and light scratches. Crystal (180 micron) covers that at the friendliest price, and Silver (190 micron) adds three years of unlimited replacement if you want the cushion.",
    opts:[{label:"Crystal details",href:"#/products/crystal"},{label:"Silver details",href:"#/products/silver"},{label:"Start again",next:"start"}] },
  highway: { bot:"Highway running throws stones at the front end. Gold (200 micron) is the sensible step up — thicker film with a five-year replacement window. Diamond (210 micron) if you keep cars long.",
    opts:[{label:"Gold details",href:"#/products/gold"},{label:"Diamond details",href:"#/products/diamond"},{label:"Start again",next:"start"}] },
  premium: { bot:"On a new or premium car the paint is the asset. Platinum (220 micron) is the top of the range — unlimited replacement and a lifetime warranty. Diamond is the step below it.",
    opts:[{label:"Platinum details",href:"#/products/platinum"},{label:"Diamond details",href:"#/products/diamond"},{label:"Start again",next:"start"}] },
  interior: { bot:"That is precut territory. Screens, piano-black panels, console and door trims get model-specific patterns, so nothing is trimmed on the car.",
    opts:[{label:"Precut PPF",href:"#/precut"},{label:"Start again",next:"start"}] },
  gloss: { bot:"For gloss and easier washing, ceramic coating is the answer — a hydrophobic layer over the paint. It also sits happily on top of PPF.",
    opts:[{label:"Ceramic coating",href:"#/ceramic"},{label:"Start again",next:"start"}] }
};

function assistHtml(){
  return '<div class="assist" id="assist">'+
    '<div class="assist__head"><img src="'+ASSETS.mark+'" alt="" /><b>Eagle Assist</b>'+
      '<small>Guided tool · not a live AI</small></div>'+
    '<div class="assist__log" id="assistLog"></div>'+
    '<div class="assist__opts" id="assistOpts"></div>'+
  '</div>';
}

function renderAssist(key, userLabel){
  const log = document.getElementById("assistLog"), opts = document.getElementById("assistOpts");
  if(!log || !opts) return;
  const node = ASSIST[key] || ASSIST.start;
  if(key === "start") log.innerHTML = "";
  if(userLabel) log.insertAdjacentHTML("beforeend", '<div class="msg msg--me">'+esc(userLabel)+'</div>');
  log.insertAdjacentHTML("beforeend", '<div class="msg msg--bot">'+esc(node.bot)+'</div>');
  log.scrollTop = log.scrollHeight;

  opts.innerHTML = node.opts.map((o,i)=> o.href
      ? '<a class="btn btn--ghost btn--small" href="'+o.href+'" style="padding:10px 15px;font-size:.9rem">'+esc(o.label)+'</a>'
      : '<button data-next="'+o.next+'" data-label="'+esc(o.label)+'">'+esc(o.label)+'</button>').join("");
  opts.querySelectorAll("[data-next]").forEach(b=> b.addEventListener("click", ()=> renderAssist(b.dataset.next, b.dataset.label)));
}

/* ==========================================================================
   SCROLL REVEAL — one short fade-and-rise per block, then it stays put
   ========================================================================== */
let revealObserver = null;
function initReveal(){
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll("#main .section > .wrap, #main .stats > div, #main .card, #main .benefit");
  if(reduce || !("IntersectionObserver" in window)){ targets.forEach(t=>t.classList.add("is-in")); return; }
  if(revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      en.target.classList.add("is-in");
      revealObserver.unobserve(en.target);
    });
  }, { rootMargin:"0px 0px -8% 0px", threshold:.08 });
  targets.forEach((t,i)=>{
    t.classList.add("reveal");
    t.style.transitionDelay = (Math.min(i,6) * 55) + "ms";
    revealObserver.observe(t);
  });
}

/* ==========================================================================
   MOTION — cinematic, subtle, and completely off when the visitor asks for
   reduced motion. Sab kuch route() ke baad initMotion() se lagta hai.
   ========================================================================== */
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Headings ko word-by-word uthata hai.
   DO NOT rename this to anything that is also a layout class. Ye function
   element ka innerHTML dobara likhta hai, isliye:
     1. selector bilkul specific hai  (.txt-reveal, sirf headings par lagta hai)
     2. neeche guard hai — agar element ke andar text ke alawa kuch bhi ho
        (chhote <br>/<em> ke alawa), to function chhod kar nikal jata hai.
   Pehle ye class ".split" thi, jo layout grid ki class se takra rahi thi aur
   poore section ka markup text ban kar screen par chhap raha tha. */
function initSplit(){
  document.querySelectorAll("#main .txt-reveal").forEach(el=>{
    if(el.dataset.split) return;
    el.dataset.split = "1";
    if(reducedMotion()){ el.classList.add("is-in"); return; }

    // Guard: sirf simple headings. Kuch bhi complex ho to haath nahi lagayenge.
    const allowed = ["BR","EM","B","I","STRONG","SPAN"];
    const safe = Array.from(el.children).every(ch=> allowed.includes(ch.tagName));
    if(!safe || el.children.length > 6){ el.classList.add("is-in"); return; }

    const parts = [];
    el.childNodes.forEach(node=>{
      if(node.nodeType === 3){                       // text
        node.textContent.split(/(\s+)/).forEach(tok=>{
          if(!tok.trim()){ if(tok) parts.push(document.createTextNode(tok)); return; }
          const sp = document.createElement("span");
          sp.textContent = tok;
          parts.push(sp);
        });
      } else if(node.tagName === "BR"){
        parts.push(node.cloneNode(true));
      } else {                                        // <em>, <b> etc.
        const sp = document.createElement("span");
        sp.appendChild(node.cloneNode(true));
        parts.push(sp);
      }
    });
    el.textContent = "";
    parts.forEach(n=> el.appendChild(n));
    el.querySelectorAll(":scope > span").forEach((sp,i)=> sp.style.transitionDelay = (i*70)+"ms");
    requestAnimationFrame(()=> setTimeout(()=> el.classList.add("is-in"), 60));
  });
}

/* Micron numbers 0 se count hote hain jab scroll me aate hain */
function initCounters(){
  const nodes = document.querySelectorAll("#main .count[data-count]");
  if(!nodes.length) return;
  if(reducedMotion() || !("IntersectionObserver" in window)){
    nodes.forEach(n=> n.textContent = n.dataset.count); return;
  }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      const el = en.target, target = parseInt(el.dataset.count,10) || 0;
      io.unobserve(el);
      const start = performance.now(), dur = 900;
      const tick = now =>{
        const t = Math.min((now-start)/dur, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1-t, 3)));
        if(t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold:.4 });
  nodes.forEach(n=>{ n.textContent = "0"; io.observe(n); });
}

/* Cards cursor ke saath halka sa jhukte hain. Touch par bilkul nahi. */
let tiltBound = false;
function initTilt(){
  if(reducedMotion() || window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll("#main .tilt").forEach(card=>{
    if(card.dataset.tilt) return;
    card.dataset.tilt = "1";
    card.addEventListener("pointermove", e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = "perspective(900px) rotateX("+(-y*4).toFixed(2)+"deg) rotateY("+(x*5).toFixed(2)+"deg) translateY(-3px)";
    });
    card.addEventListener("pointerleave", ()=>{ card.style.transform = ""; });
  });
  tiltBound = true;
}

/* Product shot scroll ke saath halka sa shift hota hai */
let parallaxNodes = [];
function initParallax(){
  parallaxNodes = reducedMotion() ? [] : Array.from(document.querySelectorAll("#main .parallax"));
}
function runParallax(){
  if(!parallaxNodes.length) return;
  const mid = window.innerHeight / 2;
  parallaxNodes.forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.bottom < -200 || r.top > window.innerHeight + 200) return;
    const speed = parseFloat(el.dataset.speed || "0.05");
    el.style.transform = "translateY(" + ((r.top + r.height/2 - mid) * -speed).toFixed(1) + "px)";
  });
}

/* Background me bahut halke particles — sirf desktop par */
function initDust(){
  if(reducedMotion() || window.innerWidth < 900 || document.getElementById("dust")) return;
  const d = document.createElement("div");
  d.className = "dust"; d.id = "dust"; d.setAttribute("aria-hidden","true");
  d.innerHTML = Array.from({length:26}, ()=>{
    const l = Math.random()*100, delay = Math.random()*26, dur = 18 + Math.random()*16;
    return '<i style="left:'+l.toFixed(1)+'%;bottom:-10px;animation-delay:-'+delay.toFixed(1)+'s;animation-duration:'+dur.toFixed(1)+'s"></i>';
  }).join("");
  document.body.appendChild(d);
}

/* Grain + cursor glow — sirf desktop, sirf ek baar */
function initAmbient(){
  if(!document.getElementById("grain")){
    const g = document.createElement("div");
    g.className = "grain"; g.id = "grain"; g.setAttribute("aria-hidden","true");
    document.body.appendChild(g);
  }
  if(reducedMotion() || window.matchMedia("(hover: none)").matches) return;
  if(document.getElementById("cursorGlow")) return;
  const c = document.createElement("div");
  c.className = "cursor-glow"; c.id = "cursorGlow"; c.setAttribute("aria-hidden","true");
  document.body.appendChild(c);
  let raf = null, x = 0, y = 0;
  addEventListener("pointermove", e=>{
    x = e.clientX; y = e.clientY;
    c.classList.add("is-on");
    if(raf) return;
    raf = requestAnimationFrame(()=>{ c.style.transform = "translate("+x+"px,"+y+"px)"; raf = null; });
  }, { passive:true });
  addEventListener("pointerleave", ()=> c.classList.remove("is-on"));
}

/* Buttons cursor ki taraf halka sa khinchte hain */
function initMagnetic(){
  if(reducedMotion() || window.matchMedia("(hover: none)").matches) return;
  document.querySelectorAll("#main .btn, .wa").forEach(btn=>{
    if(btn.dataset.mag) return;
    btn.dataset.mag = "1";
    btn.addEventListener("pointermove", e=>{
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) / r.width;
      const dy = (e.clientY - (r.top + r.height/2)) / r.height;
      btn.style.transform = "translate("+(dx*7).toFixed(1)+"px,"+(dy*5).toFixed(1)+"px)";
    });
    btn.addEventListener("pointerleave", ()=>{ btn.style.transform = ""; });
  });
}

/* Section ke upar ki red line scroll par khinchti hai */
function initLines(){
  const nodes = document.querySelectorAll("#main .section-line, #main .steps");
  if(!nodes.length) return;
  if(reducedMotion() || !("IntersectionObserver" in window)){ nodes.forEach(n=>n.classList.add("is-in")); return; }
  const io = new IntersectionObserver(es=> es.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add("is-in"); io.unobserve(e.target); }
  }), { threshold:.25 });
  nodes.forEach(n=> io.observe(n));
}

function initMotion(){
  initAmbient(); initMagnetic(); initLines();
  initSplit(); initCounters(); initTilt(); initParallax(); initDust();
}

/* ==========================================================================
   ROUTER  (hash based here; becomes Next.js file routing in production)
   ========================================================================== */
function setMeta(path){
  const m = DATA.site.meta[path] || DATA.site.meta["/"];
  document.title = m.title;
  document.querySelector('meta[name="description"]').setAttribute("content", m.desc);
  const og = document.querySelector('meta[property="og:title"]');
  if(og) og.setAttribute("content", m.title);
}

let prefillVehicle = "";

function route(){
  const raw = (location.hash || "#/").slice(1);
  const [pathRaw, queryRaw] = raw.split("?");
  const path = pathRaw.replace(/\/+$/,"") || "/";
  const query = new URLSearchParams(queryRaw || "");
  const main = $("#main");
  let html, metaKey = path;

  if(path === "/")                       html = viewHome();
  else if(path === "/about")             html = viewAbout();
  else if(path === "/products")          html = viewProducts();
  else if(path.startsWith("/products/")){
    const slug = path.split("/")[2];
    const p = DATA.products.find(x=>x.slug===slug);
    html = viewProduct(slug); metaKey = "/products";
    if(p){
      document.title = (isPh(p.name)? p.category : p.name) + " — " + DATA.site.name;
      document.querySelector('meta[name="description"]').setAttribute("content",
        "Eagle PPF " + p.category + " — features, specifications, applications and enquiries.");
      metaKey = null;
    }
  }
  else if(path === "/precut")            html = viewPrecut();
  else if(path === "/ceramic")           html = viewCeramic();
  else if(path === "/distributor")       html = viewDistributor();
  else if(path === "/contact"){
    html = viewContact(query.get("product"));
    prefillVehicle = query.get("vehicle") || "";
  }
  else                                   { html = view404(); metaKey = "/"; }

  main.innerHTML = html;
  if(metaKey) setMeta(metaKey);

  // Active nav state
  const top = "#" + (path.startsWith("/products") ? "/products" : path);
  document.querySelectorAll("#nav a").forEach(a=>{
    a.toggleAttribute("aria-current", a.getAttribute("href") === top);
    if(a.getAttribute("href") === top) a.setAttribute("aria-current","page");
  });

  // Page-specific behaviour
  bindForm();
  if(prefillVehicle){
    const vf = document.getElementById("f-vehicle");
    if(vf){ vf.value = prefillVehicle; }
    prefillVehicle = "";
  }

  // flip panels on the product cards
  document.querySelectorAll(".flip").forEach(btn=> btn.addEventListener("click", ()=>{
    btn.setAttribute("aria-pressed", btn.getAttribute("aria-pressed") === "true" ? "false" : "true");
  }));
  initReveal();
  initMotion();
  renderSelector();
  initLayers();
  renderStage();
  const stageTabs = document.getElementById("stageTabs");
  if(stageTabs) stageTabs.querySelectorAll("button").forEach(b=> b.addEventListener("click", ()=>{
    stageIndex = parseInt(b.dataset.stage,10) || 0; renderStage();
  }));
  const cover = document.getElementById("coverSwitch");
  if(cover){
    renderCoverage("exterior");
    cover.querySelectorAll("button").forEach(b=> b.addEventListener("click", ()=> renderCoverage(b.dataset.cover)));
  }
  if(document.getElementById("assistLog")) renderAssist("start");
  document.querySelectorAll(".thumbs").forEach(g=> g.addEventListener("click", e=>{
    const t = e.target.closest(".thumb"); if(!t) return;
    g.querySelectorAll(".thumb").forEach(x=>x.setAttribute("aria-pressed","false"));
    t.setAttribute("aria-pressed","true");
  }));

  setDrawer(false);
  if(!location.hash.includes("#/contact?")) window.scrollTo({top:0,behavior:"instant"});
  main.focus?.();
}

addEventListener("hashchange", route);
$("#waBtn").href = "https://wa.me/" + DATA.contact.phoneRaw +
  "?text=" + encodeURIComponent("Hi Eagle PPF, I would like a quote for paint protection film.");
renderChrome();
route();

/* Structured data — ready for real values, kept honest until then. */
const ld = document.createElement("script");
ld.type = "application/ld+json";
ld.textContent = JSON.stringify({
  "@context":"https://schema.org","@type":"AutoBodyShop",
  name:"Eagle PPF",
  description:"Paint protection film supply and professional installation.",
  telephone:"+918447766815",
  email:"Eagleppf@gmail.com",
  sameAs:["https://www.instagram.com/eaglepaintprotectionfilm"],
  foundingDate:"2015",
  areaServed:"IN",
  address:{ "@type":"PostalAddress", streetAddress:"Block B, 76A, Dabri-Palam Road, Vaishali Colony, Dashrath Puri",
            addressLocality:"New Delhi", addressRegion:"Delhi", postalCode:"110045", addressCountry:"IN" },
  openingHoursSpecification:[{ "@type":"OpeningHoursSpecification",
    dayOfWeek:["Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens:"10:30", closes:"19:00" }],
  makesOffer: DATA.products.map(p=>({ "@type":"Offer", itemOffered:{ "@type":"Product", name:"Eagle PPF "+p.name } }))
});
document.head.appendChild(ld);
