/* ==========================================================================
   EDITABLE DATA  —  the only block anyone needs to touch to update content.
   In the Next.js build each key below becomes its own file under /data.
   ========================================================================== */
/* Paanchon series par common features (packaging par bhi yahi chhape hain) */
const COMMON_FEATURES = [
  "High clarity",
  "Self healing",
  "Scratch resistant",
  "UV protection",
  "Stain resistant",
  "Easy maintenance"
];

const DATA = {

  /* ---- data/site.ts ---------------------------------------------------- */
  site: {
    name: "Eagle PPF",
    tagline: "Paint protection film",
    domain: "eagleppf.in",
    build: "20260925-K",   // footer me dikhta hai — kaunsa version live hai, turant pata chal jaye
    // Per-route <title> and meta description. Used by the router for SEO.
    meta: {
      "/":          { title: "Eagle PPF — Paint Protection Film Supply & Installation | New Delhi", desc: "Premium paint protection film supply and expert installation under one roof. Five grades from Crystal to Platinum. 11+ years, pan-India service." },
      "/about":     { title: "About Eagle PPF — 11+ years in paint protection", desc: "Established 2015. Film supply and in-house installation, built on quality material, precision application and customer trust." },
      "/products":  { title: "PPF Range — Crystal, Silver, Gold, Diamond, Platinum | Eagle PPF", desc: "Five grades of 100% TPU paint protection film: 180 to 220 microns, with warranties up to lifetime." },
      "/precut":    { title: "Precut PPF — Interior & Exterior | Eagle PPF", desc: "Model-specific precut paint protection film for exterior panels and interior trims. Precision cut, perfect fit." },
      "/ceramic":   { title: "Ceramic & Graphene Coating — Eagle PPF", desc: "Ceramic coating for deep gloss and hydrophobic protection, and graphene coating for superior hardness, heat dissipation and water-spot resistance." },
      "/distributor": { title: "Become a distributor — Eagle PPF", desc: "Distribution and dealership opportunities with Eagle PPF." },
      "/contact":   { title: "Contact Eagle PPF — New Delhi", desc: "Call or WhatsApp +91 84477 66815. Block B, 76A, Dabri - Palam Rd, Vaishali Colony, Dashrath Puri, New Delhi. Tuesday to Sunday, 10:30 AM to 7:00 PM." }
    }
  },

  /* ---- data/navigation.ts ---------------------------------------------- */
  navigation: {
    primary: [
      { label: "Home",        href: "#/" },
      { label: "About",       href: "#/about" },
      { label: "PPF Films",   href: "#/products" },
      { label: "Precut",      href: "#/precut" },
      { label: "Ceramic",     href: "#/ceramic" },
      { label: "Distributor", href: "#/distributor" },
      { label: "Contact",     href: "#/contact" }
    ],
    footer: [
      { label: "Home", href: "#/" },
      { label: "About & founder", href: "#/about" },
      { label: "PPF series", href: "#/products" },
      { label: "Precut PPF", href: "#/precut" },
      { label: "Ceramic & graphene coating", href: "#/ceramic" },
      { label: "Become a distributor", href: "#/distributor" },
      { label: "Contact us", href: "#/contact" }
    ]
  },

  cta: {
    products: "Explore products",
    detail:   "View details",
    quote:    "Request a quote",
    distributor: "Apply for distribution",
    enquire:  "Enquire now",
    contact:  "Contact us",
    about:    "About Eagle PPF"
  },

  /* ---- data/company.ts --------------------------------------------------
     Everything marked ph:true renders in the amber placeholder style so it
     can never be mistaken for approved copy. Set ph:false once confirmed. */
  company: {
    headline: "Guard the finish.",
    headlineAccent: "Own the road.",   // last word renders outlined in red
    heroLead: { ph:false, text:"Premium paint protection film supply and expert installation under one roof. Eleven years on, still protecting the paint people paid for \u2014 across India." },
    intro: { ph:false, text:"For over 11 years Eagle PPF has helped car owners safeguard the look and value of their vehicles \u2014 supplying premium paint protection film and fitting it ourselves, so the quality holds from the film to the final finish." },
    aboutParas: [
      "For over 11 years, Eagle PPF has been a trusted name in paint protection film, helping car owners safeguard the look and value of their vehicles. What started as a focused effort to bring high-quality PPF solutions to car owners has grown into a full-fledged brand offering both premium film supply and expert installation, all under one roof.",
      "At Eagle PPF, we understand that your car is more than just a machine \u2014 it's an investment and, for many, a passion. That's why we deal in multiple types of paint protection film, from gloss and matte finishes to self-healing and stealth variants, ensuring every customer finds the right fit for their vehicle and style. And because we handle the installation ourselves, you get consistent quality from the film to the final finish.",
      "Over the years, we've built our reputation on three pillars: quality material, precision application, and customer trust. Every film we supply and fit is tested and applied with care against scratches, stone chips, UV rays, and everyday wear \u2014 so your car stays showroom-fresh for years to come.",
      "With more than a decade of experience, thousands of vehicles protected, and a growing community of satisfied customers, Eagle PPF continues to set the standard for paint protection in the industry. We're not just selling film \u2014 we're protecting what matters to you, from start to finish."
    ],
    stats: [
      { value:"11+",       label:"Years in paint protection" },
      { value:"2015",      label:"Established" },
      { value:"Pan India", label:"Service coverage" },
      { value:"5",         label:"Film grades" }
    ],
    values: [
      { title:"Quality material", text:{ ph:false, text:"We deal in multiple types of film \u2014 gloss, matte, self-healing and stealth \u2014 and supply only what we are willing to fit ourselves." } },
      { title:"Precision application", text:{ ph:false, text:"Installation is handled in-house, so the finish never depends on someone else's workmanship." } },
      { title:"Customer trust", text:{ ph:false, text:"Clear grades and stated warranties, so an owner knows exactly what they are buying." } }
    ],
    capabilities: [
      "Premium paint protection film supply",
      "Professional in-house installation",
      "Gloss, matte, self-healing and stealth variants",
      "Five grades, from entry-level to lifetime warranty",
      "100% TPU film across all five grades",
      "Pan-India service"
    ],
    pillars: [
      { title:"Film and fitting, one team", text:{ ph:false, text:"We supply the film and install it ourselves. Nothing is handed off, so quality holds from the roll to the finished panel." } },
      { title:"Eleven years of it", text:{ ph:false, text:"Established in 2015, with more than a decade of vehicles protected and a customer base built on repeat work and referrals." } },
      { title:"A grade for every budget", text:{ ph:false, text:"Five films from Crystal to Platinum \u2014 essential coverage at one end, a lifetime warranty at the other." } },
      { title:"Warranty in writing", text:{ ph:false, text:"Every grade carries a stated warranty \u2014 from 3 years on Crystal to lifetime on Platinum." } }
    ]
  },

  /* ---- data/contact.ts -------------------------------------------------- */
  contact: {
    address:  { ph:false, text:"Block B, 76A, Dabri - Palam Rd, Vaishali, Vaishali Colony, Dashrath Puri, New Delhi, Delhi, 110045" },
    phone:    { ph:false, text:"+91 84477 66815" },
    phoneRaw: "918447766815",
    whatsapp: { ph:false, text:"+91 84477 66815" },
    email:    { ph:false, text:"Eagleppf@gmail.com" },
    hours:    { ph:false, text:"Tuesday\u2013Sunday, 10:30 AM \u2013 7:00 PM. Monday closed." },
    areaServed: "Pan India",
    mapsLink: "https://maps.app.goo.gl/Vyag3aNwXgYVz4wo7",
    // Short link (maps.app.goo.gl) iframe me nahi chalta, isliye embed naam + pate se hai.
    mapEmbed: "https://www.google.com/maps?q=EAGLE+PPF,+Block+B,+76A,+Dabri+-+Palam+Rd,+Vaishali,+Vaishali+Colony,+Dashrath+Puri,+New+Delhi,+Delhi+110045&z=17&output=embed",
    // Sirf wahi links jo confirm hain. Naya link milte hi yahan add kar do.
    socials: [
      { label:"Instagram", href:"https://www.instagram.com/eaglepaintprotectionfilm", icon:"instagram" }
    ],
    requirementOptions: ["Full body coverage","Front end / high-impact areas","Selected panels","Interior surfaces","Bulk / dealer supply","Not sure yet"]
  },

  /* ---- data/products.ts -------------------------------------------------
     Add a product by copying one object. Nothing else in the site changes:
     the products grid, the dropdown in the quote form, the related-products
     strip and the /products/<slug> page all read from this array. */
  products: [
    {
      slug:"crystal", name:"Crystal", series:"Crystal Series", tier:1,
      micron:180, accent:"#4EC8E8", tagline:"Protect your pride",
      category:"Paint protection film", status:"available",
      image:"assets/img/products/crystal.jpg",
      shortDescription:{ ph:false, text:"Entry-level protection with the clarity and finish kept intact." },
      description:{ ph:false, text:"Our entry-level film, designed for car owners who want reliable, affordable protection without compromising on clarity and finish. Built on the same 100% TPU construction as the rest of the range." },
      gallery:[],
      features: COMMON_FEATURES,
      specifications:[
        { label:"Thickness",        value:"180 micron" },
        { label:"Film", value:"100% TPU - Best film" },
        { label:"Warranty",          value:"3 years" },
        { label:"Position in range", value:"Grade 1 of 5" }
      ],
      applications:["Full body","Front end","High-impact panels","Doors and sills"],
      warranty:{ ph:false, text:"3 years warranty." }
    },
    {
      slug:"silver", name:"Silver", series:"Silver Series", tier:2,
      micron:190, accent:"#C6CBD2", tagline:"Protect your pride",
      category:"Paint protection film", status:"available",
      image:"assets/img/products/silver.jpg",
      shortDescription:{ ph:false, text:"Thicker film for daily driving, with a 5-year warranty." },
      description:{ ph:false, text:"A step up in durability and thickness, Silver offers stronger everyday protection backed by a 5-year warranty for added peace of mind." },
      gallery:[],
      features: COMMON_FEATURES,
      specifications:[
        { label:"Thickness",        value:"190 micron" },
        { label:"Film", value:"100% TPU - Best film" },
        { label:"Warranty",          value:"5 years" },
        { label:"Position in range", value:"Grade 2 of 5" }
      ],
      applications:["Full body","Front end","High-impact panels","Doors and sills"],
      warranty:{ ph:false, text:"5 years warranty." }
    },
    {
      slug:"gold", name:"Gold", series:"Gold Series", tier:3,
      micron:200, accent:"#D4A73C", tagline:"Protect your pride",
      category:"Paint protection film", status:"available",
      image:"assets/img/products/gold.jpg",
      shortDescription:{ ph:false, text:"Thicker 200 micron film with a 5-year warranty." },
      description:{ ph:false, text:"Built for car owners who want extended protection and confidence, Gold combines a thicker 200 micron film with a 5-year warranty." },
      gallery:[],
      features: COMMON_FEATURES,
      specifications:[
        { label:"Thickness",        value:"200 micron" },
        { label:"Film", value:"100% TPU - Best film" },
        { label:"Warranty",          value:"5 years" },
        { label:"Position in range", value:"Grade 3 of 5" }
      ],
      applications:["Full body","Front end","High-impact panels","Doors and sills"],
      warranty:{ ph:false, text:"5 years warranty." }
    },
    {
      slug:"diamond", name:"Diamond", series:"Diamond Series", tier:4,
      micron:210, accent:"#7FB7F0", tagline:"Protect your pride",
      category:"Paint protection film", status:"available",
      image:"assets/img/products/diamond.jpg",
      shortDescription:{ ph:false, text:"Premium grade: thicker, tougher, built to last." },
      description:{ ph:false, text:"Our premium-grade film for those who demand serious long-term protection — thicker, tougher, and built to last." },
      gallery:[],
      features: COMMON_FEATURES,
      specifications:[
        { label:"Thickness",        value:"210 micron" },
        { label:"Film", value:"100% TPU - Best film" },
        { label:"Warranty",          value:"8 years" },
        { label:"Position in range", value:"Grade 4 of 5" }
      ],
      applications:["Full body","Front end","High-impact panels","Doors and sills"],
      warranty:{ ph:false, text:"8 years warranty." }
    },
    {
      slug:"platinum", name:"Platinum", series:"Platinum Series", tier:5,
      micron:220, accent:"#E3E7EC", tagline:"The ultimate shield",
      category:"Paint protection film", status:"available",
      image:"assets/img/products/platinum.jpg",
      shortDescription:{ ph:false, text:"The top of the range: 220 micron with a lifetime warranty." },
      description:{ ph:false, text:"The pinnacle of our range. Platinum offers unmatched thickness and a lifetime warranty — true end-to-end protection for the life of your vehicle." },
      gallery:[],
      features: COMMON_FEATURES,
      specifications:[
        { label:"Thickness",        value:"220 micron" },
        { label:"Film", value:"100% TPU - Best film" },
        { label:"Warranty",          value:"Lifetime" },
        { label:"Position in range", value:"Grade 5 of 5" }
      ],
      applications:["Full body","Front end","High-impact panels","Doors and sills"],
      warranty:{ ph:false, text:"Lifetime warranty." }
    }
  ],

  productsIntro: "At Eagle PPF we offer five distinct grades of paint protection film, each engineered to match different needs, budgets and levels of protection. Whether you want essential coverage or the ultimate long-term shield for your vehicle, there is an Eagle PPF grade built for you.",

  /* ---- Benefits of paint protection film (category information, safe) --- */
  benefits: [
    { title:"Stone chips and road debris", text:"Highway grit and loose stones hit the film instead of the paint.", icon:"shield" },
    { title:"Wash and swirl marks",        text:"Day-to-day cleaning marks land on the film, not on the clear coat.", icon:"sparkle" },
    { title:"Stains and spotting",         text:"Bird droppings, tree sap and hard water sit on the film, not on the clear coat.", icon:"drop" },
    { title:"Gloss and appearance",        text:"The panel keeps the finish it left the showroom with.", icon:"gloss" },
    { title:"Removable later",             text:"Film can be taken off, leaving the original paint underneath.", icon:"peel" },
    { title:"Resale value",                text:"Original, unrepainted paint is worth more when the car is sold.", icon:"value" }
  ],

  /* ---- data/distributor.ts --------------------------------------------- */
  /* ---- Process steps ----------------------------------------------------- */
  processPPF: [
    { n:"01", title:"Paint",      text:"The factory finish underneath \u2014 the thing worth keeping." },
    { n:"02", title:"Film",       text:"100% TPU film laid over it, clear and self-healing." },
    { n:"03", title:"Protection", text:"Chips, scuffs and wash marks land on the film, not the paint." }
  ],
  processPrecut: [
    { n:"01", title:"Select vehicle", text:"Make, model and year." },
    { n:"02", title:"Select pattern", text:"Interior, exterior or both." },
    { n:"03", title:"Precision cut",  text:"Cut to the model's own pattern, before it reaches the car." },
    { n:"04", title:"Install",        text:"Applied by our team \u2014 no trimming on your paint." },
    { n:"05", title:"Protect",        text:"Coverage that follows the car's own lines." }
  ],
  ceramicLayers: [
    { tag:"01 \u00b7 Environment", title:"What the car lives in", text:"Water spots, road grime, UV, chemical contaminants, everyday dirt.", cls:"" },
    { tag:"02 \u00b7 Eagle Shield", title:"The coating layer", text:"A hydrophobic, high-gloss barrier bonded over the surface.", cls:"layer--film" },
    { tag:"03 \u00b7 Vehicle paint", title:"The finish underneath", text:"Clear coat and colour, kept the way it left the showroom.", cls:"layer--paint" }
  ],

  /* ---- Precut PPF ------------------------------------------------------- */
  precut: {
    title: "Eagle PPF Precut",
    tagline: "Precision cut. Perfect fit. Complete protection.",
    image: "assets/img/products/precut.jpg",
    intro: "Precut PPF is cut to a vehicle's own pattern before it reaches the car — no guesswork, no trimming on paint. And it is not only for the outside: the same precision covers the panels inside the cabin that pick up marks fastest.",
    exterior: [
      "Bonnet and fenders", "Front bumper", "Headlights", "ORVMs",
      "Door edges and handles", "Pillars", "Running boards", "Other high-impact areas"
    ],
    interior: [
      "Infotainment screens", "Piano-black panels", "Centre console", "Dashboard trims",
      "Door trims", "Instrument cluster", "Touch-sensitive surfaces", "Other vulnerable interior panels"
    ],
    benefits: [
      { title:"Model specific",   text:"Patterns designed for individual vehicle models.", icon:"car" },
      { title:"Precision fit",    text:"Designed around original vehicle contours and body lines.", icon:"front" },
      { title:"Faster installation", text:"Reduces installation time and unnecessary on-car trimming.", icon:"flash" },
      { title:"Consistent results", text:"Standardised patterns help installers repeat the same result every time.", icon:"tick-circle" },
      { title:"Interior + exterior", text:"Complete vehicle protection, inside and out.", icon:"cabin" },
      { title:"Growing coverage", text:"Vehicle-specific pattern coverage is expanding continuously.", icon:"grid" }
    ]
  },

  /* ---- Ceramic coating -------------------------------------------------- */
  ceramic: {
    title: "Eagle PPF Ceramic Coating",
    tagline: "Unmatched gloss. Powerful protection. Effortless maintenance.",
    image: "assets/img/products/ceramic.jpg",
    intro: "A premium protective coating designed to enhance vehicle gloss while adding a protective barrier against everyday contaminants and environmental elements.",
    protects: ["Water spots", "Road grime", "UV exposure", "Chemical contaminants", "Everyday environmental contamination"],
    reasons: [
      { title:"Deep gloss and shine", text:"Enhances the appearance of the paint with a rich, deep gloss.", icon:"gloss" },
      { title:"Advanced hydrophobic protection", text:"Helps water, dirt and grime bead up and move away more easily.", icon:"drop" },
      { title:"UV protection", text:"Helps reduce the effects of prolonged UV exposure, fading and oxidation.", icon:"sun" },
      { title:"Chemical resistance", text:"Adds a protective layer against common contaminants.", icon:"flask" },
      { title:"Easier maintenance", text:"The smooth hydrophobic surface makes washing and maintenance easier.", icon:"sparkle" },
      { title:"Long-lasting protection", text:"Designed to keep protecting while maintaining the vehicle's finish.", icon:"shield" }
    ],
    shield: {
      title: "The Eagle Shield",
      tagline: "Protect. Enhance. Preserve.",
      text: "Eagle PPF Ceramic Coating forms a protective layer over the vehicle's paint, combining high-gloss aesthetics with surface protection.",
      chips: ["Hydrophobic", "UV resistant", "Chemical resistant", "High gloss", "Easy maintenance"]
    }
  },

  /* ---- Graphene coating — Ceramic page ke andar, Ceramic ke neeche -------- */
  graphene: {
    title: "Eagle PPF Graphene Coating",
    tagline: "The future of paint protection is here",
    image: "assets/img/products/graphene-coating.jpg",
    intro: "Graphene Coating is the latest evolution in paint protection technology. Infused with graphene particles, it offers superior hardness, heat dissipation, and anti-static properties compared to traditional ceramic coatings.",
    protects: ["Water spots", "Dust and fine particles", "Heat and thermal shock", "UV exposure", "Environmental contaminants"],
    about: [
      "Graphene Coating represents the latest frontier in automotive surface protection technology. By incorporating graphene particles into the coating matrix, graphene coatings achieve a remarkable combination of properties that surpass conventional ceramic coatings in several key areas.",
      "At Eagle PPF, we apply premium graphene coatings that deliver superior hardness, better thermal conductivity \u2014 meaning the surface dissipates heat more effectively and is less susceptible to thermal shock \u2014 and improved anti-static properties that reduce the attraction of dust and fine particles to the coated surface.",
      "The result is a vehicle that stays cleaner for longer and is more resistant to environmental challenges.",
      "Water spot resistance is one of the key benefits of graphene over standard ceramic. The anti-static properties of graphene mean that water droplets dry with less mineral residue, helping reduce white water spot marks that can occur on coated vehicles. For owners who value a low-maintenance appearance, this can be a significant advantage.",
      "Graphene coatings also provide an exceptional optical finish, with a deep, liquid gloss and enhanced visual depth, particularly on darker vehicle colours."
    ],
    why: [
      "If you want advanced automotive paint protection, strong durability, improved water-spot resistance, and a deep gloss finish, graphene coating provides a modern protection solution.",
      "It is particularly suitable for vehicles parked outdoors, driven in challenging conditions, or owners who want advanced surface protection with easier maintenance."
    ],
    features: [
      { title:"Superior graphene technology", text:"Graphene particles incorporated into the coating matrix.", icon:"grid" },
      { title:"Better heat dissipation", text:"The surface dissipates heat more effectively and is less susceptible to thermal shock.", icon:"heat" },
      { title:"Anti-static properties", text:"Reduces the attraction of dust and fine particles to the coated surface.", icon:"flash" },
      { title:"Harder than standard ceramic", text:"Superior hardness compared to traditional ceramic coatings.", icon:"shield" },
      { title:"Long-lasting protection", text:"Keeps the vehicle cleaner for longer and more resistant to environmental challenges.", icon:"tick-circle" },
      { title:"Water-spot resistance", text:"Water dries with less mineral residue, helping reduce white water spot marks.", icon:"drop" },
      { title:"Enhanced UV protection", text:"Helps protect the finish from the effects of UV exposure.", icon:"sun" }
    ],
    care: [
      "Graphene coating benefits most from pH-neutral washing products, similar to ceramic coating.",
      "Its anti-static properties are particularly useful in dusty environments.",
      "Regular inspections can help assess the coating condition and determine whether maintenance or top-up treatment is required.",
      "Bird droppings, tree sap and other contaminants should be removed promptly."
    ],
    warranty: "Warranty terms for this service: To be confirmed with our team. Please ask us directly when booking."
  },

  /* ---- Founder ---------------------------------------------------------- */
  founder: {
    name: "Kundan Kushwaha",
    role: "Founder & CEO",
    paras: [
      "Kundan Kushwaha comes from a mechanical engineering background and has built his career around the automobile industry.",
      "He has been associated with the automotive industry since 2014 in India and has worked with multiple automotive brands. He has also received training and professional exposure in California, USA, within the automobile industry.",
      "Across automotive, paint protection, detailing and business, he brings roughly 15 years of experience — and with it an understanding of the practical problems faced by customers, installers and automotive professionals alike."
    ]
  },

  /* ---- Why Eagle PPF was created ---------------------------------------- */
  story: {
    title: "Why Eagle PPF was created",
    paras: [
      "In 2014, when the founder entered the automotive industry, paint protection film was barely available in India. Teflon and ceramic coating were what customers were offered, and PPF remained a niche most workshops could not reach.",
      "By 2015 ceramic coating had become prominent and new brands were entering the market. Through those years he trained with different products and technologies, worked with automotive brands and built his own business alongside.",
      "The same problems kept surfacing, year after year, across every kind of customer and workshop.",
      "Eagle PPF was built as the answer to that list — not as another label on someone else's film."
    ],
    problems: [
      "Product quality that changed from batch to batch",
      "Very few genuinely good options to choose from",
      "Prices far above what the protection justified",
      "Customer expectations that did not match what the film actually did",
      "A clear need for better-quality PPF at a reasonable price"
    ],
    focus: ["Quality", "Technology", "Protection", "Customer value"]
  },

  /* ---- TPU technology --------------------------------------------------- */
  tpu: {
    title: "100% TPU-based film",
    lead: "Eagle PPF is built on 100% thermoplastic polyurethane construction, rather than PVC or TPH mixing.",
    points: [
      { title:"100% TPU", text:"The entire range is TPU, not a PVC or TPH blend." },
      { title:"Nano technology", text:"Nano technology worked into the TPU itself." },
      { title:"Ceramic-based options", text:"Ceramic-based film options within the range." },
      { title:"Self-healing", text:"Self-healing technology across the series." },
      { title:"High clarity", text:"Clarity that keeps the paint underneath looking like paint." },
      { title:"Shine retention", text:"Shine retention and paint protection over the life of the film." }
    ]
  },

  /* ---- Mission / Vision -------------------------------------------------- */
  mission: {
    title: "Our mission",
    lead: "What Eagle PPF works on every single day.",
    words: ["Protection", "Quality", "Innovation", "Reliable products", "Customer confidence"]
  },
  vision: {
    title: "Our vision",
    text: "To become a trusted, high-performance PPF brand — advancing protection technology and setting a new benchmark in the automotive protection industry."
  },

  /* ---- Vehicle pattern selector (DEMO DATA) ------------------------------
     Ye sample data hai. Asli pattern database aane par sirf ye object
     badalna hoga, ya API se load kara dena hoga — UI waise ka waisa chalega.
     Koi pattern "available" nahi dikhaya jata; enquiry par confirm hota hai. */
  vehicleData: {
    note: "Pattern coverage is confirmed by our team before installation. This selector records what you drive so we can check the exact pattern for you.",
    makes: {
      "Maruti Suzuki": { models:["Baleno","Brezza","Fronx","Grand Vitara","Swift","Jimny"], years:["2026","2025","2024","2023","2022 or older"] },
      "Hyundai":       { models:["Creta","Venue","i20","Verna","Alcazar","Exter"], years:["2026","2025","2024","2023","2022 or older"] },
      "Tata":          { models:["Nexon","Harrier","Safari","Punch","Curvv","Altroz"], years:["2026","2025","2024","2023","2022 or older"] },
      "Mahindra":      { models:["XUV700","Thar","Scorpio N","XUV 3XO","Bolero"], years:["2026","2025","2024","2023","2022 or older"] },
      "Toyota":        { models:["Fortuner","Innova Hycross","Urban Cruiser","Glanza","Hilux"], years:["2026","2025","2024","2023","2022 or older"] },
      "Kia":           { models:["Seltos","Sonet","Carens","Carnival","EV6"], years:["2026","2025","2024","2023","2022 or older"] },
      "Honda":         { models:["City","Elevate","Amaze","WR-V"], years:["2026","2025","2024","2023","2022 or older"] },
      "MG":            { models:["Hector","Astor","ZS EV","Gloster"], years:["2026","2025","2024","2023","2022 or older"] },
      "Volkswagen":    { models:["Virtus","Taigun","Tiguan"], years:["2026","2025","2024","2023","2022 or older"] },
      "Skoda":         { models:["Slavia","Kushaq","Kodiaq"], years:["2026","2025","2024","2023","2022 or older"] },
      "BMW":           { models:["3 Series","5 Series","X1","X3","X5"], years:["2026","2025","2024","2023","2022 or older"] },
      "Mercedes-Benz": { models:["C-Class","E-Class","GLA","GLC","GLE"], years:["2026","2025","2024","2023","2022 or older"] },
      "Audi":          { models:["A4","A6","Q3","Q5","Q7"], years:["2026","2025","2024","2023","2022 or older"] },
      "Other":         { models:["Not listed here"], years:["2026","2025","2024","2023","2022 or older"] }
    },
    coverage: [
      { id:"exterior", label:"Exterior", note:"Bonnet, bumper, fenders, headlights, ORVMs, door edges, pillars and other high-impact areas." },
      { id:"interior", label:"Interior", note:"Screens, piano-black panels, console, dashboard and door trims, instrument cluster." },
      { id:"both",     label:"Interior + exterior", note:"Complete protection, inside and out." }
    ]
  },

  /* ---- Film ke 4 layers (interactive section) ---------------------------
     Ye PPF ki general construction hai — category ki baat, Eagle ka koi
     claim nahi. Naye layer/feature yahin add ya edit karo. */
  filmLayers: {
    title: "Engineered to disappear.",
    title2: "Built to protect.",
    lead: "Four layers, working as one \u2014 from the topcoat that meets the road to the liner that protects the film before it ever touches your car.",
    layers: [
      { n:"01", name:"Top Coat",      feats:["Self-healing","Hydrophobic","Stain resistant"] },
      { n:"02", name:"TPU Core",      feats:["Impact resistant","Flexible","Optically clear"] },
      { n:"03", name:"Adhesive",      feats:["Strong bonding","Clean application","Removable later"] },
      { n:"04", name:"Release Liner", feats:["Protective backing","Keeps the film clean","Removed at installation"] }
    ]
  },

  applications: [
    { title:"Full body",    text:"Every painted panel covered, front to back.", icon:"car" },
    { title:"Front end",    text:"Bonnet, bumper, fenders, mirrors \u2014 the areas that meet the road first.", icon:"front" },
    { title:"Impact zones", text:"Door edges, sills, loading lip and handle cups.", icon:"shield" },
    { title:"Interior",     text:"Screens, console and trim that scuff with daily use.", icon:"cabin" },
    { title:"Lights",       text:"Headlamp and tail lamp surfaces.", icon:"light" }
  ],

  distributor: {
    lead: { ph:false, text:"Eagle PPF supplies film to detailing studios, workshops and retail counters across India. If paint protection is already part of what you sell \u2014 or you want it to be \u2014 partnering gives you the full five-grade range, from Crystal through to Platinum, with the warranty terms behind it." },
    benefits: [
      { title:"The full range", text:{ ph:false, text:"All five grades available to order: Crystal, Silver, Gold, Diamond and Platinum." } },
      { title:"Warranty behind the product", text:{ ph:false, text:"Every grade carries a stated warranty \u2014 from 3 years on Crystal to lifetime on Platinum." } },
      { title:"Pan-India dispatch", text:{ ph:false, text:"We already service customers across India, so location is not a barrier to supply." } },
      { title:"Installation know-how", text:{ ph:false, text:"Eleven years of fitting experience behind the product. Training and technical support are worked out with each partner during onboarding." } },
      { title:"Distributor pricing", text:{ ph:false, text:"Partner pricing is shared on request, once we understand the volume and the market you sell into." } },
      { title:"Territory", text:{ ph:false, text:"Territory is discussed case by case, based on where you operate and who else we already supply there." } }
    ],
    steps: [
      { title:"Apply", text:{ ph:false, text:"Fill the form below with your business details and the volume you expect to move." } },
      { title:"We call you", text:{ ph:false, text:"Our team reviews the application and calls you to discuss the range, pricing and terms." } },
      { title:"First order", text:{ ph:false, text:"Once terms are agreed, we dispatch your opening stock and get you set up." } }
    ],
    // Ye "requirements" nahi, "apply karte waqt ye ready rakho" hai — isliye
    // koi business rule invent nahi kiya gaya.
    requirements: [
      "What your business does today \u2014 detailing studio, workshop, retail counter or distribution",
      "The city and area you want to cover",
      "Roughly how much film you expect to move in a month",
      "Whether you have an installer on the team, or want training",
      "GST details, for billing"
    ]
  },

  /* ---- FORM DELIVERY ----------------------------------------------------
     Enquiry form ko email tak pahunchane ke do raste hain. Dono ready hain,
     bas mode set karna hai.

     mode: "web3forms"  -> koi server nahi chahiye. Localhost pe bhi chalta hai.
                           Setup (2 minute):
                             1. https://web3forms.com kholo
                             2. Eagleppf@gmail.com daalo -> access key email pe aayegi
                             3. wo key neeche web3formsKey me paste karo
                             4. mode ko "web3forms" kar do -> form LIVE
     mode: "server"     -> Cloudflare Pages / Vercel pe deploy karne ke baad.
                           functions/api/enquiry.js already likha hua hai;
                           usme RESEND_API_KEY environment variable set karni hai.
                           Domain aane ke baad yahi use karna — zyada professional
                           hai kyunki mail aapke apne domain se jata hai.
     mode: "preview"    -> kuch nahi bhejta, sirf UI dikhata hai (aaj ka default).
     ----------------------------------------------------------------------- */
  forms: {
    /* mode: "auto"  <-- aaj ka default, aur sabse safe.
         Pehle server ko try karta hai (Hostinger par contact.php, Cloudflare
         par /api/enquiry). Server na mile ya fail ho jaye to apne aap
         customer ka mail app khol deta hai, poora bhara hua email ke saath.
         Matlab: enquiry kabhi kho ke nahi jaati.

       Doosre options:
         "php"       -> sirf contact.php (Hostinger)
         "server"    -> sirf /api/enquiry (Cloudflare Pages Function)
         "web3forms" -> key daal kar, bina kisi server ke background email
         "mailto"    -> sirf mail app
         "preview"   -> kuch nahi bhejta, sirf UI                             */
    mode: "auto",
    serverEndpoint: "contact.php",
    cloudflareEndpoint: "/api/enquiry",
    mailtoTo: "Eagleppf@gmail.com",
    web3formsKey: "",
    web3formsEndpoint: "https://api.web3forms.com/submit",
    delay: 900,
    subjectPrefix: "Website enquiry"
  }
};

/* ==========================================================================
   ASSETS — logo files live in assets/img/. Swap these files and the
   whole site updates; no component references the logo directly.
   ========================================================================== */
const ASSETS = {
  mark:   "assets/img/eagle-mark.png",
  lockup: "assets/img/eagle-lockup-chrome.png",   // footer logo (supplied chrome lockup)
  about:  "assets/img/about-eagle-studio-full.jpg"     // Home > About Eagle PPF ki photo
  // CTA band ("Tell us about the car") ka background: assets/img/cta-band-bg.jpg (style.css me)
};

