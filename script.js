// Footer year
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  document.getElementById('y')?.append(y);
  document.getElementById('y2')?.append(y);
});

// i18n (DE default, PL toggle)
const dict = {
  de: {
    'nav.it':'IT-Services','nav.cyber':'Cyberabwehr','nav.web':'Web & SEO',
    'nav.pakete':'Pakete','nav.cases':'Cases','nav.blog':'Blog',
    'nav.faq':'FAQ','nav.kontakt':'Kontakt',
    'hero.h1':'IT-Dienstleister & IT-Sicherheit für KMU in Wien & Niederösterreich',
    'hero.p':'E-Mail-Zustellung (SPF/DKIM/DMARC), Netzwerk & Microsoft 365, Phishing-Resilienz, Website-Reputation, Webentwicklung & SEO.',
    'cta.pakete':'Pakete ansehen',
    'cta.termin':'Termin sichern (20 Min)',
    'it.h2':'IT-Services (KMU)','cyber.h2':'Cyberabwehr','web.h2':'Webentwicklung & SEO',
    'pakete.h2':'Pakete (Cyber & IT)','cases.h2':'Case Studies'
  },
  pl: {
    'nav.it':'Usługi IT','nav.cyber':'Cyberbezpieczeństwo','nav.web':'Web & SEO',
    'nav.pakete':'Pakiety','nav.cases':'Case Studies','nav.blog':'Blog',
    'nav.faq':'FAQ','nav.kontakt':'Kontakt',
    'hero.h1':'Usługi IT i bezpieczeństwo dla MŚP w Wiedniu i Dolnej Austrii',
    'hero.p':'Dostarczalność e-mail (SPF/DKIM/DMARC), sieci i Microsoft 365, phishing-resilience, reputacja stron, webdev i SEO.',
    'cta.pakete':'Zobacz pakiety',
    'cta.termin':'Zarezerwuj termin (20 min)',
    'it.h2':'Usługi IT (MŚP)','cyber.h2':'Cyberbezpieczeństwo','web.h2':'Webdev & SEO',
    'pakete.h2':'Pakiety (Cyber & IT)','cases.h2':'Case Studies'
  }
};

function setLang(lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const v = dict[lang]?.[key];
    if (v) el.innerHTML = v;
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
if (localStorage.getItem('lang') === 'pl') setLang('pl');
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

// Mailto UX
document.getElementById('contact-form')?.addEventListener('submit', ()=>{
  setTimeout(()=>alert('Danke! Falls sich der Mail-Client nicht geöffnet hat, schreiben Sie direkt per E-Mail.'), 400);
});

// Faux on-site search (scroll to matching section)
const search = document.getElementById('site-search');
if (search) {
  search.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') {
      const q = (search.value||'').toLowerCase();
      const map = [
        {k:['dmarc','spf','dkim','mail'], id:'cyber'},
        {k:['vpn','wlan','netz','m365','365','microsoft'], id:'it'},
        {k:['seo','web','shop','website'], id:'web'},
        {k:['paket','angebot','preis'], id:'pakete'},
        {k:['case','referenz'], id:'cases'},
        {k:['faq','hilfe'], id:'faq'},
        {k:['kontakt','telefon','email'], id:'kontakt'}
      ];
      const hit = map.find(m=>m.k.some(v=>q.includes(v)));
      if (hit) location.hash = '#'+hit.id; else location.hash = '#pakete';
      e.preventDefault();
    }
  });
}
