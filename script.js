// Rok w stopce
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const y1 = document.getElementById('y'); if (y1) y1.textContent = y;
  const y2 = document.getElementById('y2'); if (y2) y2.textContent = y;
});

// Prosty DE/PL słownik
const dict = {
  'pl': {
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
    const k = el.getAttribute('data-i18n'); const v = dict[lang]?.[k];
    if(v) el.innerHTML = v;
  });
  const de = document.getElementById('lang-de');
  const pl = document.getElementById('lang-pl');
  if (de && pl){
    de.classList.toggle('active', lang==='de');
    pl.classList.toggle('active', lang==='pl');
    de.setAttribute('aria-pressed', lang==='de');
    pl.setAttribute('aria-pressed', lang==='pl');
  }
  localStorage.setItem('lang', lang);
}

const btnDe = document.getElementById('lang-de');
const btnPl = document.getElementById('lang-pl');
if(btnDe) btnDe.addEventListener('click', ()=>setLang('de'));
if(btnPl) btnPl.addEventListener('click', ()=>setLang('pl'));

const saved = localStorage.getItem('lang'); if(saved==='pl') setLang('pl');

// Smooth scroll: przeniesienie fokusu do sekcji
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){ el.setAttribute('tabindex','-1'); el.focus({preventScroll:true}); }
  });
});

// Feedback formularza (mailto)
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', ()=>{
    setTimeout(()=>alert('Dziękujemy! Jeśli klient poczty się nie otworzył, napisz bezpośrednio na e-mail.'), 400);
  });
}
