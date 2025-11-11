/* SicherKlick-AT — Static Chatbot (no backend) */
(function(){
  const WA = "https://wa.me/4368120922439";
  const state = {
    lang: (localStorage.getItem('lang') === 'pl') ? 'pl' : 'de'
  };

  const i18n = {
    de: {
      title: "SicherKlick-Assistent",
      sub: "Antwortet zu Paketen, IT-Security & Terminen",
      hi: "Hallo! Ich helfe dir schnell das Richtige zu finden:",
      quick: [
        "Pakete & Preise",
        "E-Mail Zustellung (SPF/DKIM/DMARC)",
        "Phishing-Training",
        "Web & SEO",
        "Reaktionszeit",
        "Servicegebiet",
        "Sprachen",
        "Termin (WhatsApp)"
      ],
      map: {
        "pakete": "Unsere Pakete:\n\n• Quick Check — €149\n· DNS/SSL & Reputation, 20-min Ergebnis-Call, PDF Kurzbericht.\n\n• Business Shield — €749\n· VT/OTX, WHOIS/ASN, SPF/DKIM/DMARC Review, 2-h Awareness (DE/PL), 90-Tage Maßnahmenplan.\n\n• Web Start — €699\n· RWD Website (DE/PL), Formulare & Analytics, technisches SEO-Setup.",
        "spf": "E-Mail-Zustellung:\n· SPF/DKIM/DMARC sauber setzen\n· MTA-STS/TLS-RPT aktivieren\n· Bounces & Spam-Folder reduzieren\n· Dokumentierter Change-Plan (ohne Ausfälle)",
        "phish": "Awareness & Phishing-Simulation:\n· 2-h Schulung (DE/PL)\n· Simulierte Kampagne + Reporting\n· Richtlinien & kurze Checklisten für Teams",
        "web": "Web & SEO:\n· Leichte Websites (Lighthouse 90+)\n· schema.org, interne Verlinkung\n· Lokales SEO (AT): GBP, Herold, WKO\n· Landingpages, PDF-Angebote",
        "react": "Reaktionszeit:\n· Quick Check: 24–72h\n· Kleinere Fixes meist < 48h\n· Notfälle: nach Absprache sofort",
        "area": "Servicegebiet:\n· Wien & Niederösterreich (Mistelbach, Gänserndorf …)\n· Auch AT-weit remote",
        "lang": "Sprachen:\n· Deutsch, Polnisch, Englisch",
        "book": "Super — schreibe uns kurz auf WhatsApp. Wir melden uns schnell zurück."
      },
      ask: "Stelle eine Frage oder wähle eine Option…",
      handoff: "Auf WhatsApp öffnen",
      goto: {pakete:"#pakete", it:"#it", cyber:"#cyber", web:"#web", kontakt:"#kontakt"}
    },
    pl: {
      title: "Asystent SicherKlick",
      sub: "Odpowiada o pakietach, IT-security i terminach",
      hi: "Cześć! Pomogę wybrać właściwą usługę:",
      quick: [
        "Pakiety i ceny",
        "Dostarczalność e-mail (SPF/DKIM/DMARC)",
        "Szkolenia phishing",
        "WWW & SEO",
        "Czas reakcji",
        "Obszar działania",
        "Języki",
        "Termin (WhatsApp)"
      ],
      map: {
        "pakete": "Nasze pakiety:\n\n• Quick Check — €149\n· DNS/SSL & reputacja, 20-min call z wynikami, PDF.\n\n• Business Shield — €749\n· VT/OTX, WHOIS/ASN, przegląd SPF/DKIM/DMARC, 2-h szkolenie (DE/PL), plan działań na 90 dni.\n\n• Web Start — €699\n· Lekka strona (DE/PL), formularze & Analytics, techniczne SEO.",
        "spf": "Dostarczalność e-mail:\n· SPF/DKIM/DMARC poprawnie\n· MTA-STS/TLS-RPT\n· Mniej odbić i spamu\n· Zmiany bez przestojów (plan)",
        "phish": "Świadomość & symulacje phishing:\n· Szkolenie 2-h (DE/PL)\n· Kampania testowa + raport\n· Procedury i checklisty",
        "web": "WWW & SEO:\n· Lekkie strony (Lighthouse 90+)\n· schema.org, linkowanie wewnętrzne\n· Lokalne SEO (AT): GBP, Herold, WKO\n· Landing page, oferty PDF",
        "react": "Czas reakcji:\n· Quick Check: 24–72 h\n· Mniejsze poprawki zwykle < 48 h\n· Nagłe sprawy: po uzgodnieniu od ręki",
        "area": "Obszar:\n· Wiedeń i Dolna Austria (np. Mistelbach, Gänserndorf)\n· Zdalnie w całej AT",
        "lang": "Języki:\n· Niemiecki, polski, angielski",
        "book": "Super — napisz krótko na WhatsApp. Oddzwonimy szybko."
      },
      ask: "Napisz pytanie lub wybierz opcję…",
      handoff: "Otwórz WhatsApp",
      goto: {pakete:"#pakete", it:"#it", cyber:"#cyber", web:"#web", kontakt:"#kontakt"}
    }
  };

  // Intencje/wykrywanie po słowach kluczowych
  function intentOf(text, lang) {
    const t = (text||"").toLowerCase();
    if (lang==='de') {
      if (/\b(paket|pakete|preis|preise|kosten)\b/.test(t)) return 'pakete';
      if (/\bspf|dkim|dmarc|e-?mail|zustell/.test(t)) return 'spf';
      if (/\bphish|awareness|training|schulung/.test(t)) return 'phish';
      if (/\bweb|seo|seite|website|shop/.test(t)) return 'web';
      if (/\breaktion|reaktionszeit|wie schnell|dauer/.test(t)) return 'react';
      if (/\bgebiet|region|wien|niederösterreich|österreich/.test(t)) return 'area';
      if (/\bsprache|deutsch|polnisch|englisch/.test(t)) return 'lang';
      if (/\btermin|whatsapp|anrufen|call/.test(t)) return 'book';
    } else {
      if (/\bpakiet|pakiety|cena|ceny|koszt/.test(t)) return 'pakete';
      if (/\bspf|dkim|dmarc|e-?mail|dostarcz/.test(t)) return 'spf';
      if (/\bphish|szkoleni|awareness|trening/.test(t)) return 'phish';
      if (/\bwww|seo|stron|sklep|landing/.test(t)) return 'web';
      if (/\bczas|reakcj|jak szybko|ile trwa/.test(t)) return 'react';
      if (/\bobszar|region|wiedeń|austria/.test(t)) return 'area';
      if (/\bjęzyk|jezyki|de|pl|en/.test(t)) return 'lang';
      if (/\btermin|whatsapp|zadzw|call/.test(t)) return 'book';
    }
    // fallback
    return null;
  }

  // DOM
  const root = document.getElementById('sk-chat-root');
  root.innerHTML = `
    <button class="sk-fab" id="skFab" aria-label="Chat">
      💬
    </button>
    <section class="sk-panel" id="skPanel" role="dialog" aria-modal="false" aria-labelledby="skTitle">
      <header class="sk-header">
        <div>
          <div class="sk-title" id="skTitle"></div>
          <div class="sk-sub" id="skSub"></div>
        </div>
        <button class="sk-close" id="skClose" aria-label="Schließen">✕</button>
      </header>
      <div class="sk-log" id="skLog" tabindex="0"></div>
      <div class="sk-input">
        <input id="skInput" type="text" autocomplete="off" placeholder="">
        <button id="skSend">➤</button>
      </div>
    </section>
  `;

  const el = {
    fab: document.getElementById('skFab'),
    panel: document.getElementById('skPanel'),
    close: document.getElementById('skClose'),
    log: document.getElementById('skLog'),
    input: document.getElementById('skInput'),
    send: document.getElementById('skSend'),
    title: document.getElementById('skTitle'),
    sub: document.getElementById('skSub')
  };

  function t(key){ return i18n[state.lang][key]; }

  function renderHeader(){
    el.title.textContent = t('title');
    el.sub.textContent   = t('sub');
    el.input.placeholder = t('ask');
  }

  function msgAgent(text, quickKeys){
    const row = document.createElement('div');
    row.className = 'sk-row agent';
    row.innerHTML = `
      <div class="sk-avatar">SK</div>
      <div class="sk-msg sk agent"><div>${escapeHtml(text).replace(/\n/g,'<br>')}</div></div>
    `;
    el.log.appendChild(row);

    if (Array.isArray(quickKeys) && quickKeys.length){
      const q = document.createElement('div');
      q.className = 'sk-quick';
      quickKeys.forEach((label, idx)=>{
        const b = document.createElement('button');
        b.textContent = label;
        b.addEventListener('click', ()=>handleQuick(idx));
        q.appendChild(b);
      });
      row.querySelector('.sk-msg').appendChild(q);
    }
    el.log.scrollTop = el.log.scrollHeight;
  }

  function msgUser(text){
    const row = document.createElement('div');
    row.className = 'sk-row user';
    row.innerHTML = `
      <div class="sk-msg sk user"><div>${escapeHtml(text)}</div></div>
      <div class="sk-avatar user">🙂</div>
    `;
    el.log.appendChild(row);
    el.log.scrollTop = el.log.scrollHeight;
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function openPanel(){
    el.panel.classList.add('open');
    el.log.focus();
    if (!el.log.dataset.boot){
      boot();
      el.log.dataset.boot = '1';
    }
  }

  function closePanel(){ el.panel.classList.remove('open'); }

  el.fab.addEventListener('click', openPanel);
  el.close.addEventListener('click', closePanel);

  // Współpraca z wyborem języka na stronie
  const langDe = document.getElementById('lang-de');
  const langPl = document.getElementById('lang-pl');
  langDe && langDe.addEventListener('click', ()=>{ state.lang='de'; renderHeader(); });
  langPl && langPl.addEventListener('click', ()=>{ state.lang='pl'; renderHeader(); });

  renderHeader();

  function boot(){
    // Powitanie + szybkie przyciski
    msgAgent(t('hi'), t('quick'));
  }

  function handleQuick(index){
    const label = t('quick')[index];
    msgUser(label);

    // mapuj na intencję
    const map = {
      0:'pakete', 1:'spf', 2:'phish', 3:'web',
      4:'react', 5:'area', 6:'lang', 7:'book'
    };
    handleIntent(map[index]);
  }

  function handleIntent(intent){
    const M = i18n[state.lang].map;
    switch(intent){
      case 'pakete':
        msgAgent(M.pakete + '\n\n👉 ' + linkTo('pakete'));
        break;
      case 'spf':
        msgAgent(M.spf + '\n\n👉 ' + linkTo('it'));
        break;
      case 'phish':
        msgAgent(M.phish + '\n\n👉 ' + linkTo('cyber'));
        break;
      case 'web':
        msgAgent(M.web + '\n\n👉 ' + linkTo('web'));
        break;
      case 'react':
        msgAgent(M.react);
        break;
      case 'area':
        msgAgent(M.area);
        break;
      case 'lang':
        msgAgent(M.lang);
        break;
      case 'book':
        msgAgent(M.book + `\n\n📲 <a href="${WA}" target="_blank" rel="noopener">${i18n[state.lang].handoff}</a>`);
        break;
      default:
        // fallback
        msgAgent(
          (state.lang==='de'
            ? "Ich habe dich nicht ganz verstanden. Meintest du eines davon?"
            : "Nie do końca zrozumiałem. Chodziło o coś z tego?"),
          t('quick')
        );
    }
  }

  function linkTo(sectionKey){
    const href = i18n[state.lang].goto[sectionKey] || '#';
    const label = (state.lang==='de' ? 'Zur Sektion' : 'Przejdź do sekcji');
    return `<a href="${href}" onclick="document.querySelector('${href}')?.scrollIntoView({behavior:'smooth'});return false;">${label}</a>`;
  }

  function onSend(){
    const v = el.input.value.trim();
    if (!v) return;
    el.input.value = '';
    msgUser(v);
    const intent = intentOf(v, state.lang);
    handleIntent(intent);
  }

  el.send.addEventListener('click', onSend);
  el.input.addEventListener('keydown', (e)=>{ if(e.key==='Enter') onSend(); });

})();
