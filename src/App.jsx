import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { Shield, MailCheck, Server, Network, LaptopMinimal, Globe2, ArrowRight, Languages, BadgeHelp, Check, Sparkles, ChevronRight, Quote, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/*
  SicherKlick-AT — Advanced SPA Template
  - React + Tailwind + framer-motion (animations)
  - shadcn/ui cards & buttons
  - DE default, PL toggle
  - Pages: Home, IT-Services, Cyberabwehr, Web & SEO, Pakete, Cases, Blog, Kontakt, Impressum, Datenschutz
  - Fancy hero, animated feature tiles, pricing, FAQ, CTA band, footer with socials
  - GIF / video placeholders included

  Deployment tip (outside this file): create vite project, place this component as App.tsx, add Tailwind.
  For GitHub Pages, build to /dist and push to gh-pages branch or use Actions. 
*/

// --- Simple i18n dict (DE default) ---
const dict = {
  de: {
    nav: {
      home: "Start",
      it: "IT-Services",
      cyber: "Cyberabwehr",
      web: "Web & SEO",
      pakete: "Pakete",
      cases: "Cases",
      blog: "Blog",
      faq: "FAQ",
      kontakt: "Kontakt",
    },
    hero: {
      h1: "IT-Dienstleister & IT-Sicherheit für KMU in Wien & Niederösterreich",
      p: "E-Mail-Zustellung (SPF/DKIM/DMARC), Netzwerk & Microsoft 365, Phishing-Resilienz, Website-Reputation, Webentwicklung & SEO.",
      cta1: "Pakete ansehen",
      cta2: "Termin sichern (20 Min)",
    },
    kpis: ["24–72h Quick-Start", "Messbare KPIs", "Vendor-neutral", "DE/PL"],
    trust: "Österreich-Fokus • ISO-Mindset • OWASP • NIST CSF • DSGVO",
    sections: {
      it: "IT-Services (KMU)",
      cyber: "Cyberabwehr",
      web: "Webentwicklung & SEO",
      pakete: "Pakete (Cyber & IT)",
      cases: "Case Studies",
      blog: "Blog / Ratgeber",
      faq: "FAQ",
      kontakt: "Kontakt",
    },
    faq: [
      { q: "Wie schnell ist der Quick Check?", a: "In der Regel 24–72 Stunden." },
      { q: "Arbeitet ihr in DE/PL/EN?", a: "Ja — Deutsch, Polnisch und Englisch." },
      { q: "Benötigt ihr Passwörter?", a: "Nein. Wir arbeiten über DNS/Konfiguration oder geteilten Bildschirm." },
      { q: "Bietet ihr laufende Betreuung?", a: "Ja, als Retainer inkl. Monatsreports." },
    ],
    contact: {
      headline: "Schnelle Hilfe? 20-Min Quick-Call",
      text: "DMARC/Spam, E-Mail-Zustellung, Netzwerk, Website-Fehler — erste Einschätzung kostenlos.",
      email: "sicherklickat@sicherklickat.com",
      phone: "+43 664 000 00 00",
      address: "Wien / Hausbrunn, Österreich",
    }
  },
  pl: {
    nav: {
      home: "Start",
      it: "Usługi IT",
      cyber: "Cyberbezpieczeństwo",
      web: "Web & SEO",
      pakete: "Pakiety",
      cases: "Case Studies",
      blog: "Blog",
      faq: "FAQ",
      kontakt: "Kontakt",
    },
    hero: {
      h1: "Usługi IT i bezpieczeństwo dla MŚP w Wiedniu i Dolnej Austrii",
      p: "Dostarczalność e‑mail (SPF/DKIM/DMARC), sieci i Microsoft 365, phishing‑resilience, reputacja stron, webdev i SEO.",
      cta1: "Zobacz pakiety",
      cta2: "Zarezerwuj termin (20 min)",
    },
    kpis: ["Start 24–72h", "Mierzalne KPI", "Vendor‑neutral", "DE/PL"],
    trust: "Austria • ISO‑mindset • OWASP • NIST CSF • RODO",
    sections: {
      it: "Usługi IT (MŚP)",
      cyber: "Cyberbezpieczeństwo",
      web: "Webdev & SEO",
      pakete: "Pakiety (Cyber & IT)",
      cases: "Case Studies",
      blog: "Blog / Poradnik",
      faq: "FAQ",
      kontakt: "Kontakt",
    },
    faq: [
      { q: "Jak szybko Quick Check?", a: "Zwykle 24–72 godziny." },
      { q: "Pracujecie DE/PL/EN?", a: "Tak — niemiecki, polski i angielski." },
      { q: "Potrzebne hasła?", a: "Nie — pracujemy przez DNS/konfigurację lub ekran współdzielony." },
      { q: "Stała opieka?", a: "Tak — w abonamencie z raportami miesięcznymi." },
    ],
    contact: {
      headline: "Szybka pomoc? 20‑min konsultacja",
      text: "DMARC/Spam, dostarczalność e‑mail, sieci, błędy WWW — pierwsza ocena gratis.",
      email: "sicherklickat@sicherklickat.com",
      phone: "+43 664 000 00 00",
      address: "Wiedeń / Hausbrunn, Austria",
    }
  }
};

function useI18n() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "de");
  const t = useMemo(() => dict[lang as "de" | "pl"], [lang]);
  useEffect(() => { localStorage.setItem("lang", lang); }, [lang]);
  return { lang, setLang, t };
}

// --- Layout shell ---
function Shell({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);

  const navItem = (to: string, label: string) => (
    <NavLink
      to={to}
      className={({ isActive }) => `px-3 py-2 rounded-xl text-sm transition ${isActive ? "bg-slate-200 text-slate-900" : "text-slate-600 hover:text-slate-900"}`}
    >{label}</NavLink>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/85 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-sky-500" />
            <span className="font-extrabold tracking-tight text-slate-900">SicherKlick-AT</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItem("/", t.nav.home)}
            {navItem("/it", t.nav.it)}
            {navItem("/cyber", t.nav.cyber)}
            {navItem("/web", t.nav.web)}
            {navItem("/pakete", t.nav.pakete)}
            {navItem("/cases", t.nav.cases)}
            {navItem("/blog", t.nav.blog)}
            {navItem("/faq", t.nav.faq)}
            {navItem("/kontakt", t.nav.kontakt)}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setLang(lang === "de" ? "pl" : "de")}> 
              <Languages className="w-4 h-4"/>{lang.toUpperCase()}
            </Button>
            <a href="#kontakt" className="hidden md:inline-flex">
              <Button size="sm" className="bg-sky-500 hover:bg-sky-600">CTA</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2"><Shield className="w-5 h-5 text-sky-500"/><span className="font-bold">SicherKlick-AT</span></div>
            <p className="text-sm text-slate-600">IT-Dienstleister & Cyberabwehr (DE/PL). {new Date().getFullYear()} ©</p>
          </div>
          <div className="text-sm text-slate-600">
            <div className="flex items-center gap-2"><MailCheck className="w-4 h-4"/><a href="mailto:sicherklickat@sicherklickat.com" className="hover:underline">sicherklickat@sicherklickat.com</a></div>
            <div className="flex items-center gap-2 mt-1"><Phone className="w-4 h-4"/><a href="https://wa.me/436640000000" target="_blank" rel="noreferrer" className="hover:underline">+43 664 000 00 00</a></div>
            <div className="flex items-center gap-2 mt-1"><MapPin className="w-4 h-4"/><span>Wien / Hausbrunn, AT</span></div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/profile.php?id=61583312521651" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">FB</a>
            <a href="https://www.youtube.com/@SicherKlickAT" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">YT</a>
            <a href="https://www.tiktok.com/@SicherKlickAT" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900">TT</a>
            <Link to="/impressum" className="ml-auto text-slate-600 hover:text-slate-900">Impressum</Link>
            <Link to="/datenschutz" className="text-slate-600 hover:text-slate-900">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Hero with animated background ---
function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-gradient-to-tr from-amber-400 to-sky-500 blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-sky-500 to-amber-400 blur-3xl opacity-20" />
      </motion.div>
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {t.hero.h1}
          </motion.h1>
          <motion.p
            className="text-slate-600 mt-4 text-lg"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {t.hero.p}
          </motion.p>
          <motion.div className="flex flex-wrap gap-3 mt-6" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}}>
            <Button className="bg-sky-500 hover:bg-sky-600">
              <Link to="/pakete" className="flex items-center gap-2">{t.hero.cta1}<ArrowRight className="w-4 h-4"/></Link>
            </Button>
            <Button variant="outline">
              <a href="https://wa.me/436640000000" target="_blank" rel="noreferrer" className="flex items-center gap-2">{t.hero.cta2}<ArrowRight className="w-4 h-4"/></a>
            </Button>
          </motion.div>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
            {dict.de.kpis.map((k, i) => (
              <li key={i} className="px-3 py-1 bg-slate-100 rounded-full">{k}</li>
            ))}
          </ul>
          <p className="text-slate-500 mt-2">{dict.de.trust}</p>
        </div>
        <div className="relative">
          {/* GIF/Video placeholder */}
          <motion.div initial={{ scale:.9, opacity:0 }} animate={{ scale:1, opacity:1 }} transition={{ duration: .6 }} className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWp6cGhsZ3h3M3Z2aDk3anZ4b3M5ZnVtNWIyYThseGd2aWRqZzVoMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7aCRZfNQW4VQZ9bi/giphy.gif" alt="Animated dashboard" className="w-full h-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --- Feature tiles ---
function FeatureTiles() {
  const features = [
    { icon: <MailCheck className="w-5 h-5"/>, title: "SPF/DKIM/DMARC", text: "Zustellbarkeit stabilisieren. Richtlinien bis reject." },
    { icon: <Network className="w-5 h-5"/>, title: "Netzwerk & VPN", text: "WLAN, VPN, Segmentierung, sichere Richtlinien." },
    { icon: <Server className="w-5 h-5"/>, title: "Microsoft 365", text: "Setup, Migration, sichere Postfächer & Aliasse." },
    { icon: <Globe2 className="w-5 h-5"/>, title: "Web & SEO", text: "Leichte Webseiten, Lighthouse 95+, lokales SEO (AT)." },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <motion.div key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">{f.icon}</div>
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{f.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- Pricing ---
function Pricing() {
  const plans = [
    { name: "Quick Check", price: 149, bullets: ["DNS/SSL & Reputation", "20-min Ergebnis-Call", "PDF-Kurzbericht"], featured: false },
    { name: "Business Shield", price: 749, bullets: ["VT/OTX & WHOIS/ASN", "SPF/DKIM/DMARC Review", "2h Awareness (DE/PL)", "90-Tage Maßnahmen"], featured: true },
    { name: "Web Start", price: 699, bullets: ["RWD Website (DE/PL)", "Formulare & Analytics", "Technisches SEO-Setup"], featured: false },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 py-12" id="pakete">
      <h2 className="text-2xl font-bold tracking-tight mb-6">Pakete (Cyber & IT)</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((p, i) => (
          <Card key={i} className={`rounded-2xl ${p.featured ? "border-amber-400 shadow-amber-100" : ""}`}>
            <CardContent className="p-6">
              {p.featured && <div className="text-xs font-bold text-amber-600 mb-2">Beliebtestes Paket</div>}
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500"/>
                <h3 className="text-lg font-bold">{p.name}</h3>
              </div>
              <div className="text-3xl font-extrabold mt-2">€ {p.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {p.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-600 mt-0.5"/>{b}</li>
                ))}
              </ul>
              <Button className="w-full mt-5 bg-sky-500 hover:bg-sky-600">Anfragen</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

// --- Reusable section wrappers ---
function PageTitle({ icon, title, subtitle }: { icon?: React.ReactNode; title: string; subtitle?: string; }){
  return (
    <div className="max-w-6xl mx-auto px-4 pt-10 pb-6">
      <div className="flex items-center gap-3 text-slate-700">
        {icon}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1>
      </div>
      {subtitle && <p className="text-slate-600 mt-2 max-w-3xl">{subtitle}</p>}
    </div>
  );
}

// --- Pages ---
function HomePage(){
  return (
    <>
      <Hero/>
      <FeatureTiles/>
      <section className="max-w-6xl mx-auto px-4 py-12" id="it">
        <h2 className="text-2xl font-bold tracking-tight mb-6">IT-Services (KMU)</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[{icon: LaptopMinimal, title: "Managed IT & Support", text: "Proaktive Betreuung, Updates, Backup, Monitoring."}, {icon: Network, title: "Netzwerk & Sicherheit", text: "Firewall, WLAN, VPN, Segmentierung."}, {icon: MailCheck, title: "Migration & Zustellung", text: "Providerwechsel, Bounces/Spam beheben."}].map((f, i)=>(
            <Card key={i} className="rounded-2xl"><CardContent className="p-6"><div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-3">{React.createElement(f.icon, {className:"w-5 h-5"})}</div><h3 className="font-semibold">{f.title}</h3><p className="text-sm text-slate-600 mt-1">{f.text}</p></CardContent></Card>
          ))}
        </div>
      </section>
      <Pricing/>
      <section className="max-w-6xl mx-auto px-4 py-12" id="cases">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Case Studies</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {["DMARC in 7 Tagen","Site-Speed 95+","Reputation Fix"].map((t,i)=>(
            <Card key={i} className="rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHM2bWQyYzJzbmFzYm9yNXF4cTMzZ3BzYzFzYmg3eHB3Y2U2eWVyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPnAiaMCws8nOsE/giphy.gif" alt="Case visual" className="w-full h-40 object-cover"/>
                <div className="p-5">
                  <h3 className="font-semibold">{t}</h3>
                  <p className="text-sm text-slate-600 mt-1">Kurzbeschreibung des Ergebnisses und der Wirkung in KPI.</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12" id="blog">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Blog / Ratgeber</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {["Checkliste: IT-Sicherheit für KMU","SPF/DKIM/DMARC kurz erklärt","Website-Launch ohne Pannen"].map((t,i)=>(
            <Card key={i} className="rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold">{t}</h3><p className="text-sm text-slate-600 mt-1">Teasertext — 2–3 Sätze.</p><Link to="/kontakt" className="inline-flex items-center gap-1 mt-3 text-sky-600 hover:underline">Mehr <ChevronRight className="w-4 h-4"/></Link></CardContent></Card>
          ))}
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <Card className="rounded-2xl bg-gradient-to-r from-amber-400 to-sky-500 text-white">
          <CardContent className="p-8 flex flex-wrap items-center gap-4">
            <Quote className="w-8 h-8"/>
            <div className="text-lg font-semibold">Schnelle Hilfe? 20-Min Quick-Call — erste Einschätzung kostenlos.</div>
            <div className="ml-auto flex gap-2">
              <Button className="bg-white text-slate-900 hover:bg-slate-100"><a href="https://wa.me/436640000000" target="_blank" rel="noreferrer">WhatsApp</a></Button>
              <Button variant="outline"><Link to="/kontakt">Kontakt</Link></Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function ITPage(){
  return (
    <>
      <PageTitle icon={<LaptopMinimal className="w-6 h-6 text-sky-500"/>} title="IT-Services" subtitle="Managed IT, Microsoft 365, Netzwerk & VPN, Helpdesk."/>
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-4">
        {["Managed IT & Support","Microsoft 365 Setup","Netzwerk & Sicherheit","Migration & E-Mail"].map((t,i)=>(
          <Card key={i} className="rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold">{t}</h3><p className="text-sm text-slate-600 mt-1">Kurzbeschreibung, Nutzen, Outcome.</p><div className="mt-3"><Button variant="outline" size="sm">Angebot anfordern</Button></div></CardContent></Card>
        ))}
      </section>
    </>
  );
}

function CyberPage(){
  return (
    <>
      <PageTitle icon={<Shield className="w-6 h-6 text-sky-500"/>} title="Cyberabwehr" subtitle="SPF/DKIM/DMARC, MTA-STS/TLS-RPT, Reputation & Scans, Awareness."/>
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-4">
        {["DNS & E-Mail-Sicherheit","Reputation & Scans","Awareness & Simulation"].map((t,i)=>(
          <Card key={i} className="rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold">{t}</h3><p className="text-sm text-slate-600 mt-1">Kurzbeschreibung, Nutzen, Outcome.</p></CardContent></Card>
        ))}
      </section>
    </>
  );
}

function WebPage(){
  return (
    <>
      <PageTitle icon={<Globe2 className="w-6 h-6 text-sky-500"/>} title="Web & SEO" subtitle="Leichte Websites, Shops, lokales SEO (AT), strukturierte Daten."/>
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-4">
        {["Leichte Websites","Shops & Angebote","Lokales SEO (AT)"].map((t,i)=>(
          <Card key={i} className="rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold">{t}</h3><p className="text-sm text-slate-600 mt-1">Kurzbeschreibung, Nutzen, Outcome.</p></CardContent></Card>
        ))}
      </section>
    </>
  );
}

function PackagesPage(){
  return (
    <>
      <PageTitle icon={<BadgeHelp className="w-6 h-6 text-sky-500"/>} title="Pakete" subtitle="Klare Pakete mit Fixpreisen."/>
      <Pricing/>
    </>
  );
}

function CasesPage(){
  return (
    <>
      <PageTitle icon={<Quote className="w-6 h-6 text-sky-500"/>} title="Case Studies" subtitle="Konkrete Ergebnisse aus Projekten (Auszug)."/>
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-4">
        {["DMARC in 7 Tagen","Site-Speed 95+","Reputation Fix"].map((t,i)=>(
          <Card key={i} className="rounded-2xl overflow-hidden"><CardContent className="p-0"><img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExam1mY3hjcHd6bGJ2cHNxMGk0eThpN2Z2bW1hZnB1a2h4N2t6a2xkcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0Ex7JmN8Zp4h6cYE/giphy.gif" alt="Case" className="w-full h-44 object-cover"/><div className="p-5"><h3 className="font-semibold">{t}</h3><p className="text-sm text-slate-600 mt-1">Kurzbeschreibung, KPIs, Outcome.</p></div></CardContent></Card>
        ))}
      </section>
    </>
  );
}

function BlogPage(){
  return (
    <>
      <PageTitle icon={<Globe2 className="w-6 h-6 text-sky-500"/>} title="Blog / Ratgeber" subtitle="Kurzratgeber & Checklisten für KMU."/>
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map((i)=>(
          <Card key={i} className="rounded-2xl"><CardContent className="p-6"><h3 className="font-semibold">Artikel {i}</h3><p className="text-sm text-slate-600 mt-1">Teasertext — 2–3 Sätze.</p><Link to="/kontakt" className="inline-flex items-center gap-1 mt-3 text-sky-600 hover:underline">Mehr <ChevronRight className="w-4 h-4"/></Link></CardContent></Card>
        ))}
      </section>
    </>
  );
}

function FAQPage(){
  const { t } = useI18n();
  return (
    <>
      <PageTitle icon={<BadgeHelp className="w-6 h-6 text-sky-500"/>} title={t.sections.faq} />
      <section className="max-w-3xl mx-auto px-4 pb-16">
        {t.faq.map((item, i) => (
          <details key={i} className="border rounded-xl p-4 mb-3 bg-white">
            <summary className="cursor-pointer font-medium text-slate-900">{item.q}</summary>
            <p className="text-slate-600 mt-2">{item.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}

function ContactPage(){
  const { t } = useI18n();
  return (
    <>
      <PageTitle icon={<Phone className="w-6 h-6 text-sky-500"/>} title={t.sections.kontakt} />
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-6">
        <Card className="rounded-2xl"><CardContent className="p-6">
          <form className="grid gap-3">
            <label className="text-sm">Firma / Name<input className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="Ihr Name"/></label>
            <label className="text-sm">E-Mail<input type="email" className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="name@firma.at"/></label>
            <label className="text-sm">Nachricht<textarea className="mt-1 w-full border rounded-xl px-3 py-2 h-32" placeholder="Wie können wir helfen?"/></label>
            <Button className="bg-sky-500 hover:bg-sky-600">Senden</Button>
          </form>
        </CardContent></Card>
        <Card className="rounded-2xl"><CardContent className="p-6 space-y-2 text-slate-700">
          <div className="flex items-center gap-2"><MailCheck className="w-4 h-4"/><a className="hover:underline" href="mailto:sicherklickat@sicherklickat.com">sicherklickat@sicherklickat.com</a></div>
          <div className="flex items-center gap-2"><Phone className="w-4 h-4"/><a className="hover:underline" href="https://wa.me/436640000000" target="_blank" rel="noreferrer">+43 664 000 00 00</a></div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4"/><span>Wien / Hausbrunn, AT</span></div>
          <p className="text-sm text-slate-500 mt-2">Österreich-Fokus • ISO / OWASP • DSGVO</p>
        </CardContent></Card>
      </section>
    </>
  );
}

function LegalPage({ kind }: { kind: "impressum"|"datenschutz" }){
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight mb-3 capitalize">{kind}</h1>
      {kind === "impressum" ? (
        <>
          <p><strong>SicherKlick-AT</strong><br/>Wien / Hausbrunn, Österreich</p>
          <p>E-Mail: <a href="mailto:sicherklickat@sicherklickat.com" className="text-sky-600 hover:underline">sicherklickat@sicherklickat.com</a><br/>Telefon: +43 664 000 00 00</p>
          <p>Inhaltlich verantwortlich: SicherKlick-AT</p>
          <p>Haftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für externe Links.</p>
        </>
      ) : (
        <>
          <p>Wir verarbeiten personenbezogene Daten gemäß DSGVO nur soweit erforderlich.</p>
          <h3 className="font-semibold mt-4">Kontaktformular / E-Mail</h3>
          <p>Bei Nutzung des Kontaktformulars bzw. einer E-Mail werden Angaben zur Bearbeitung der Anfrage verarbeitet.</p>
          <h3 className="font-semibold mt-4">Logfiles / Hosting</h3>
          <p>Beim Aufruf der Seite können technische Logdaten serverseitig erfasst werden (Betrieb/Fehleranalyse).</p>
          <h3 className="font-semibold mt-4">Rechtsgrundlagen & Rechte</h3>
          <ul className="list-disc pl-5 text-slate-700">
            <li>Art. 6 Abs. 1 lit. b DSGVO — Vertrag/Anbahnung</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse</li>
          </ul>
        </>
      )}
    </div>
  );
}

// --- Router + App ---
function AppInner(){
  return (
    <Shell>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/it" element={<ITPage/>} />
          <Route path="/cyber" element={<CyberPage/>} />
          <Route path="/web" element={<WebPage/>} />
          <Route path="/pakete" element={<PackagesPage/>} />
          <Route path="/cases" element={<CasesPage/>} />
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/faq" element={<FAQPage/>} />
          <Route path="/kontakt" element={<ContactPage/>} />
          <Route path="/impressum" element={<LegalPage kind="impressum"/>} />
          <Route path="/datenschutz" element={<LegalPage kind="datenschutz"/>} />
        </Routes>
      </AnimatePresence>
    </Shell>
  );
}

export default function App(){
  return (
    <BrowserRouter>
      <AppInner/>
    </BrowserRouter>
  );
}
