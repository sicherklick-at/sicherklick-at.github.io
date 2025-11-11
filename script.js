// Jahr in Footer
document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  document.getElementById('y')?.append(year);
  document.getElementById('y2')?.append(year);
});

// i18n — DE default, PL on toggle
const dict = {
  de: {
    'nav.leistungen':'Leistungen','nav.pakete':'Pakete','nav.prozess':'Prozess',
    'nav.referenzen':'Referenzen','nav.faq':'FAQ','nav.kontakt':'Kontakt',
    'hero.h1':'Von Scam-Signalen zu Intelligence in Bankqualität',
    'hero.p':'SicherKlick-AT stärkt KMU gegen Phishing und Ausfälle: DNS- & E-Mail-Härtung (SPF/DKIM/DMARC), Website-Reputation, Webentwicklung und SEO in AT/DE/CH.',
    'cta.pakete':'Pakete ansehen','cta.termin':'Termin sichern (20 Min)',
    'leistungen.h2':'Leistungen','pakete.h2':'Pakete (Cyber & Web)',
    'prozess.h2':'Prozess','referenzen.h2':'Referenzen'
  },
  pl: {
    'nav.leistungen':'Usługi','nav.pakete':'Pakiety','nav.prozess':'Proces',
    'nav.referenzen':'Referencje','nav.faq':'FAQ','nav.kontakt':'Kontakt',
    'hero.h1':'Od sygnałów scam do analityki klasy bankowej',
    'hero.p':'SicherKlick-AT: odporność na phishing, utwardzanie stron i DNS, audyty i webdev dla MŚP w AT/DE/CH.',
    'cta.pakete':'Zobacz pakiety','cta.termin':'Zarezerwuj termin (20 min)',
    'leistungen.h2':'Usługi','pakete.h2':'Pakiety (Cyber & Web)',
    'prozess.h2':'Proces','referenzen.h2':'Referencje'
  }
};

function setLang(lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const value = dict[lang]?.[key];
    if (value) el.innerHTML = value;
  });
  const deBtn = document.getElementById('lang-de');
  const plBtn = document.getElementById('lang-pl');
  if (deBtn && plBtn){
    deBtn.classList.toggle('active', lang==='de');
    plBtn.classList.toggle('active', lang==='pl');
    deBtn.setAttribute('aria-pressed', String(lang==='de'));
    plBtn.setAttribute('aria-pressed', String(lang==='pl'));
  }
  localStorage.setItem('lang', lang);
}

const saved = localStorage.getItem('lang');
if (saved === 'pl') setLang('pl');
document.getElementById('lang-de')?.addEventListener('click', ()=>setLang('de'));
document.getElementById('lang-pl')?.addEventListener('click', ()=>setLang('pl'));

// Smooth scroll + focus
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', ()=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ el.setAttribute('tabindex','-1'); el.focus({preventScroll:true}); }
  });
});

// Mailto feedback
document.getElementById('contact-form')?.addEventListener('submit', ()=>{
  setTimeout(()=>alert('Danke! Falls sich der Mail-Client nicht geöffnet hat, schreiben Sie direkt per E-Mail.'), 400);
});
