// === SicherKlick-AT base scripts ===
document.addEventListener('DOMContentLoaded', () => {
  // Rok w stopce
  const y = new Date().getFullYear();
  document.getElementById('y')?.append(y);
  document.getElementById('y2')?.append(y);

  // i18n (DE/PL)
  const dict = {
    de: {
      'hero.h1':'IT-Dienstleister & IT-Sicherheit für KMU in Wien & Niederösterreich',
      'hero.p':'E-Mail-Zustellung (SPF/DKIM/DMARC), Netzwerk & Microsoft 365, Phishing-Resilienz, Website-Reputation, Webentwicklung & SEO.',
      'cta.pakete':'Pakete ansehen','cta.termin':'Termin sichern (20 Min)'
    },
    pl: {
      'hero.h1':'Usługi IT i bezpieczeństwo dla MŚP w Wiedniu i Dolnej Austrii',
      'hero.p':'Dostarczalność e-mail (SPF/DKIM/DMARC), sieci i Microsoft 365, phishing-resilience, reputacja stron, webdev i SEO.',
      'cta.pakete':'Zobacz pakiety','cta.termin':'Zarezerwuj termin (20 min)'
    }
  };
  function setLang(lang){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const value = dict[lang]?.[key];
      if (value) el.innerHTML = value;
    });
    const de = document.getElementById('lang-de');
    const pl = document.getElementById('lang-pl');
    de?.classList.toggle('active', lang==='de');
    pl?.classList.toggle('active', lang==='pl');
    de?.setAttribute('aria-pressed', String(lang==='de'));
    pl?.setAttribute('aria-pressed', String(lang==='pl'));
    localStorage.setItem('lang', lang);
  }
  if (localStorage.getItem('lang') === 'pl') setLang('pl');
  document.getElementById('lang-de')?.addEventListener('click', ()=>setLang('de'));
  document.getElementById('lang-pl')?.addEventListener('click', ()=>setLang('pl'));

  // Smooth scroll + close mobile menu po kliknięciu
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', ()=>{
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){ el.setAttribute('tabindex','-1'); el.focus({preventScroll:true}); }
      document.body.classList.remove('nav-open');
      document.getElementById('menu-btn')?.setAttribute('aria-expanded','false');
    });
  });

  // Scroll reveal
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Mailto UX
  document.getElementById('contact-form')?.addEventListener('submit', ()=>{
    setTimeout(()=>alert('Danke! Falls sich der Mail-Client nicht geöffnet hat, schreiben Sie direkt per E-Mail.'), 400);
  });

  // Hamburger toggle
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn){
    menuBtn.addEventListener('click', ()=>{
      const open = document.body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  // === DARK MODE: domyślnie włączony, zapamiętywany ===
  const root = document.documentElement;   // <html>
  const themeBtn = document.getElementById('theme-toggle');

  function applyTheme(mode){
    const dark = mode === 'dark';
    root.classList.toggle('dark', dark);
    if (themeBtn) themeBtn.textContent = dark ? '🌙' : '☀️';
    const metaLight = document.querySelector('meta[name="theme-color"][media*="light"]');
    const metaDark  = document.querySelector('meta[name="theme-color"][media*="dark"]');
    if (metaLight && metaDark) {
      metaLight.content = '#0EA5E9';
      metaDark.content  = '#0b1020';
    }
  }

  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    applyTheme(stored);
  } else {
    applyTheme('dark'); // domyślnie dark na pierwszą wizytę
  }

  themeBtn?.addEventListener('click', ()=>{
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
  });

  // Subtelny parallax w hero
  const heroArt = document.querySelector('.hero-art');
  if (heroArt){
    heroArt.addEventListener('pointermove', (e)=>{
      const r = heroArt.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      heroArt.style.transform = `rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
    });
    heroArt.addEventListener('pointerleave', ()=> heroArt.style.transform = 'none');
  }
});
