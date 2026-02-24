document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());


const navWrap=document.querySelector('.nav-wrap');
const menuToggle=document.querySelector('.menu-toggle');
const navCollapse=document.getElementById('nav-collapse');

if(navWrap&&menuToggle&&navCollapse){
  const closeMenu=()=>{
    navWrap.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded','false');
  };

  menuToggle.addEventListener('click',()=>{
    const opening=!navWrap.classList.contains('menu-open');
    navWrap.classList.toggle('menu-open',opening);
    menuToggle.setAttribute('aria-expanded',String(opening));
  });

  navCollapse.querySelectorAll('a[href]').forEach((link)=>{
    link.addEventListener('click',()=>closeMenu());
  });

  window.addEventListener('resize',()=>{
    if(window.innerWidth>=768) closeMenu();
  },{passive:true});

  document.addEventListener('click',(event)=>{
    if(!navWrap.classList.contains('menu-open')) return;
    if(navWrap.contains(event.target)) return;
    closeMenu();
  });
}

// i18n dictionaries (kept short for demo)
const dict={pt:{'nav.features':'Recursos','nav.how':'Como funciona','nav.journeys':'Jornadas','nav.pricing':'Planos','nav.faq':'FAQ','nav.docs':'Docs','nav.demo':'Abrir Demo','nav.about':'Sobre','hero.badge':'IoT • Automação • Comunidade','hero.title':'Cultive melhor com dados, automação e uma comunidade ativa','hero.subtitle':'Hortelan Agtech Ltda. integra sensores, regras de automação e um painel em tempo real, com uma comunidade que ensina e recompensa boas práticas.','hero.ctaPrimary':'Explorar Demo','hero.ctaSecondary':'Ver Recursos','kpis.k1':'Tempo p/ ação em alertas','kpis.k2':'Relatórios manuais','kpis.k3':'Chamados repetitivos','kpis.k4':'Onboarding c/ SSO','features.title':'Recursos que fecham o ciclo de cuidado','features.subtitle':'Do monitoramento ao aprendizado, da automação aos incentivos — tudo em um único produto.','about.title':'Sobre a Hortelan Agtech Ltda.','about.subtitle':'Nossa missão é simplificar o cultivo com tecnologia acessível, dados em tempo real e uma comunidade que aprende junto.','about.p1':'Hortelan Agtech Ltda. integra sensores, automação por regras e um painel web para acompanhar tudo de forma simples.','about.l1':'Instalação rápida e segura com kits compatíveis.','about.l2':'Automatize irrigação, iluminação e ventilação com histerese e janelas de operação.','about.l3':'Alertas inteligentes para agir no tempo certo.','about.l4':'Comunidade para compartilhar resultados e aprender com outros cultivadores.','cta.title':'Pronto para cultivar com inteligência?','cta.subtitle':'Abra o demo, explore os recursos e conte para a comunidade como foram seus primeiros resultados.','cta.demo':'Abrir Demo','cta.docs':'Ver Apresentação','footer.rights':'Todos os direitos reservados.'},en:{'nav.features':'Features','nav.how':'How it works','nav.journeys':'Journeys','nav.pricing':'Pricing','nav.faq':'FAQ','nav.docs':'Docs','nav.demo':'Open Demo','nav.about':'About','hero.badge':'IoT • Automation • Community','hero.title':'Grow better with data, automation and an active community','hero.subtitle':'Hortelan Agtech Ltda. brings sensors, rule-based automation and a realtime dashboard together with a community that teaches and rewards good practices.','hero.ctaPrimary':'Explore Demo','hero.ctaSecondary':'See Features','kpis.k1':'Time to act on alerts','kpis.k2':'Manual reports','kpis.k3':'Repeat tickets','kpis.k4':'SSO onboarding','features.title':'Features that close the care loop','features.subtitle':'From monitoring to learning, from automation to incentives — in a single product.','about.title':'About Hortelan Agtech Ltda.','about.subtitle':'Our mission is to make growing simple with accessible tech, realtime data and a community that learns together.','about.p1':'Hortelan Agtech Ltda. brings sensors, rule-based automation and a web dashboard to keep everything simple.','about.l1':'Quick, secure setup with compatible kits.','about.l2':'Automate watering, lighting and ventilation with hysteresis and time windows.','about.l3':'Smart alerts so you act at the right time.','about.l4':'Community to share results and learn from other growers.','cta.title':'Ready to grow smart?','cta.subtitle':'Open the demo, explore the features and tell the community about your first results.','cta.demo':'Open Demo','cta.docs':'View Slides','footer.rights':'All rights reserved.'},es:{'nav.features':'Funciones','nav.how':'Cómo funciona','nav.journeys':'Jornadas','nav.pricing':'Planes','nav.faq':'FAQ','nav.docs':'Docs','nav.demo':'Abrir demo','nav.about':'Sobre','hero.badge':'IoT • Automatización • Comunidad','hero.title':'Cultiva mejor con datos, automatización y una comunidad activa','hero.subtitle':'Hortelan Agtech Ltda. integra sensores, reglas de automatización y un panel en tiempo real con una comunidad que enseña y recompensa buenas prácticas.','hero.ctaPrimary':'Explorar demo','hero.ctaSecondary':'Ver funciones','kpis.k1':'Tiempo para actuar en alertas','kpis.k2':'Reportes manuales','kpis.k3':'Tickets repetitivos','kpis.k4':'Onboarding con SSO','features.title':'Funciones que cierran el ciclo de cuidado','features.subtitle':'Del monitoreo al aprendizaje, de la automatización a los incentivos, en un único producto.','about.title':'Sobre Hortelan Agtech Ltda.','about.subtitle':'Nuestra misión es simplificar el cultivo con tecnología accesible, datos en tiempo real y una comunidad que aprende unida.','about.p1':'Hortelan Agtech Ltda. integra sensores, automatización por reglas y un panel web para acompañar todo de forma simple.','about.l1':'Instalación rápida y segura con kits compatibles.','about.l2':'Automatiza riego, iluminación y ventilación con histéresis y ventanas de operación.','about.l3':'Alertas inteligentes para actuar en el momento correcto.','about.l4':'Comunidad para compartir resultados y aprender con otros cultivadores.','cta.title':'¿Listo para cultivar con inteligencia?','cta.subtitle':'Abre la demo, explora las funciones y cuéntale a la comunidad tus primeros resultados.','cta.demo':'Abrir demo','cta.docs':'Ver presentación','footer.rights':'Todos los derechos reservados.'},fr:{'nav.features':'Fonctionnalités','nav.how':'Comment ça marche','nav.journeys':'Parcours','nav.pricing':'Tarifs','nav.faq':'FAQ','nav.docs':'Docs','nav.demo':'Ouvrir la démo','nav.about':'À propos','hero.badge':'IoT • Automatisation • Communauté','hero.title':'Cultivez mieux avec les données, l’automatisation et une communauté active','hero.subtitle':'Hortelan Agtech Ltda. réunit des capteurs, des règles d’automatisation et un tableau de bord en temps réel avec une communauté qui enseigne et récompense les bonnes pratiques.','hero.ctaPrimary':'Explorer la démo','hero.ctaSecondary':'Voir les fonctionnalités','kpis.k1':'Temps d’action sur les alertes','kpis.k2':'Rapports manuels','kpis.k3':'Tickets répétitifs','kpis.k4':'Onboarding SSO','features.title':'Fonctionnalités qui bouclent le cycle de soin','features.subtitle':'Du monitoring à l’apprentissage, de l’automatisation aux incitations — dans un seul produit.','about.title':'À propos de Hortelan Agtech Ltda.','about.subtitle':'Notre mission est de simplifier la culture avec une technologie accessible, des données en temps réel et une communauté qui apprend ensemble.','about.p1':'Hortelan Agtech Ltda. intègre des capteurs, l’automatisation par règles et un tableau de bord web pour tout suivre simplement.','about.l1':'Installation rapide et sécurisée avec des kits compatibles.','about.l2':'Automatisez l’arrosage, l’éclairage et la ventilation avec hystérésis et plages horaires.','about.l3':'Alertes intelligentes pour agir au bon moment.','about.l4':'Communauté pour partager les résultats et apprendre avec d’autres cultivateurs.','cta.title':'Prêt à cultiver intelligemment ?','cta.subtitle':'Ouvrez la démo, explorez les fonctionnalités et partagez vos premiers résultats avec la communauté.','cta.demo':'Ouvrir la démo','cta.docs':'Voir la présentation','footer.rights':'Tous droits réservés.'}};

const langMeta={
  pt:{htmlLang:'pt-BR',btn:'btn-pt'},
  en:{htmlLang:'en',btn:'btn-en'},
  es:{htmlLang:'es',btn:'btn-es'},
  fr:{htmlLang:'fr',btn:'btn-fr'}
};

function setLang(lang){
  const selected=langMeta[lang]?lang:'pt';
  const map=dict[selected]||{};
  document.documentElement.lang=langMeta[selected].htmlLang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(map[k]!==undefined){el.innerHTML=map[k];}
  });

  const switcher=document.querySelector('.lang-switch');
  if(switcher){
    switcher.dataset.active=selected;
    switcher.querySelectorAll('button').forEach(btn=>{
      const isActive=btn.dataset.lang===selected;
      btn.classList.toggle('active',isActive);
      btn.setAttribute('aria-pressed',String(isActive));
    });
  }

  localStorage.setItem('hortelan_lang',selected);
}

function getLangFromCountry(countryCode){
  const country=(countryCode||'').toUpperCase();
  if(['US','GB','IE','CA','AU','NZ'].includes(country)) return 'en';
  if(country==='BR') return 'pt';
  if(country==='ES') return 'es';
  if(['FR','BE','CH','LU','MC'].includes(country)) return 'fr';
  return 'en';
}

async function detectLanguage(){
  const stored=localStorage.getItem('hortelan_lang');
  if(stored&&langMeta[stored]){ setLang(stored); return; }

  const browserLang=(navigator.language||'').slice(0,2).toLowerCase();
  if(langMeta[browserLang]){ setLang(browserLang); return; }

  try{
    const res=await fetch('https://ipapi.co/json/',{cache:'no-store'});
    if(!res.ok) throw new Error('Geo API request failed');
    const data=await res.json();
    setLang(getLangFromCountry(data.country));
  }catch(err){
    setLang('en');
  }
}

document.querySelectorAll('.lang-switch button').forEach(btn=>{
  btn.addEventListener('click',()=>setLang(btn.dataset.lang));
});

detectLanguage();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Hero interaction: leaves sway with scroll and network cable plugs in on entry
const heroSection = document.querySelector('.hero');
const heroLeaves = Array.from(document.querySelectorAll('.hero-visual .leaf'));
if(heroSection && heroLeaves.length){
  requestAnimationFrame(() => heroSection.classList.add('hero-ready'));

  const updateLeavesFromScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const scrollRatio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    const intensity = scrollRatio * 16;

    heroLeaves.forEach((leaf, idx) => {
      const direction = idx % 2 === 0 ? 1 : -1;
      const x = (window.scrollY * 0.05 + intensity) * direction;
      const y = (window.scrollY * 0.03) * (idx + 1);
      const rotate = (8 + intensity * 0.5) * direction;
      leaf.style.transform = `translate(${x.toFixed(1)}px, ${(y % 24).toFixed(1)}px) rotate(${rotate.toFixed(1)}deg)`;
    });
  };

  if(!prefersReducedMotion){
    updateLeavesFromScroll();
    window.addEventListener('scroll', updateLeavesFromScroll, { passive: true });
  }
}

function spawnLeafBurst(amount = 10, originX = window.innerWidth / 2, originY = 80){
  if(prefersReducedMotion) return;
  const holder = document.createElement('div');
  holder.className = 'leaf-burst';
  document.body.appendChild(holder);

  for(let i=0;i<amount;i++){
    const leaf = document.createElement('span');
    leaf.className = 'burst-leaf';
    leaf.textContent = Math.random() > 0.5 ? '🍃' : '🌿';
    leaf.style.left = `${originX + (Math.random() * 50 - 25)}px`;
    leaf.style.top = `${originY + (Math.random() * 20 - 10)}px`;
    leaf.style.setProperty('--tx', `${Math.random() * 220 - 110}px`);
    leaf.style.setProperty('--ty', `${Math.random() * 260 + 80}px`);
    leaf.style.setProperty('--rot', `${Math.random() * 360 - 180}deg`);
    leaf.style.animationDelay = `${i * 35}ms`;
    holder.appendChild(leaf);
  }

  setTimeout(() => holder.remove(), 2600);
}

if(!sessionStorage.getItem('hortelan_intro_seen')){
  sessionStorage.setItem('hortelan_intro_seen', '1');
  window.addEventListener('load', () => spawnLeafBurst(18, window.innerWidth / 2, 90), { once:true });
}

let lastBurstStep = -1;
window.addEventListener('scroll', () => {
  if(prefersReducedMotion) return;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if(docHeight <= 0) return;
  const progress = Math.round((window.scrollY / docHeight) * 100);
  const step = Math.floor(progress / 25);
  if(step > lastBurstStep && step > 0){
    lastBurstStep = step;
    spawnLeafBurst(8, Math.max(48, Math.min(window.innerWidth - 48, window.innerWidth * Math.random())), 100);
  }
}, { passive:true });

const revealTargets = document.querySelectorAll('section, .card, .faq-item, .title-xl, .subtitle');
if('IntersectionObserver' in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  revealTargets.forEach((el, idx) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${Math.min(idx * 25, 400)}ms`);
    observer.observe(el);
  });
}

const heroMock = document.querySelector('.mock');
if(heroMock && !prefersReducedMotion){
  heroMock.addEventListener('pointermove', (ev) => {
    const rect = heroMock.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5;
    const y = (ev.clientY - rect.top) / rect.height - 0.5;
    heroMock.style.transform = `perspective(900px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg) scale(1.015)`;
  });
  heroMock.addEventListener('pointerleave', () => {
    heroMock.style.transform = '';
  });
}

document.querySelectorAll('.btn, .pill, .brand-logo, .logo-footer').forEach((el) => {
  el.addEventListener('click', (ev) => {
    if(prefersReducedMotion) return;
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'click-ripple';
    ripple.style.left = `${ev.clientX - rect.left}px`;
    ripple.style.top = `${ev.clientY - rect.top}px`;
    el.classList.add('is-ripple-host');
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);

    if(el.classList.contains('brand-logo') || el.classList.contains('logo-footer')){
      spawnLeafBurst(12, ev.clientX, ev.clientY);
    }
  });
});

// FAQ board logic (localStorage)
const LIST_KEY='hortelan_faq';
const form=document.getElementById('faq-form');
const listEl=document.getElementById('faq-list');
const btnExport=document.getElementById('faq-export');

function loadItems(){ try{return JSON.parse(localStorage.getItem(LIST_KEY))||[]}catch(e){return[]} }
function saveItems(items){ localStorage.setItem(LIST_KEY, JSON.stringify(items)) }
function render(){
  const items=loadItems(); listEl.innerHTML='';
  if(items.length===0){ const d=document.createElement('div'); d.className='faq-item'; d.innerHTML='<em>Nenhuma mensagem ainda. Seja o primeiro a publicar!</em>'; listEl.appendChild(d); return; }
  items.slice().reverse().forEach(it=>{
    const d=new Date(it.ts); const card=document.createElement('div'); card.className='faq-item reveal is-visible';
    card.innerHTML=`<div class="faq-meta"><strong>${it.nome||'Anônimo'}</strong> • ${it.tipo.toUpperCase()} • ${d.toLocaleString()}</div>
                    <p style="margin:.5rem 0 0">${(it.msg||'').replace(/</g,'&lt;')}</p>
                    <div class="row mt-2"><button class="btn ghost btn-del" data-id="${it.id}">Remover</button></div>`;
    listEl.appendChild(card);
  });
  listEl.querySelectorAll('.btn-del').forEach(b=>b.addEventListener('click',e=>{
    const id=e.currentTarget.getAttribute('data-id'); const items=loadItems().filter(x=>x.id!==id); saveItems(items); render();
  }));
}
form?.addEventListener('submit',e=>{ e.preventDefault(); const item={id:Math.random().toString(36).slice(2),nome:document.getElementById('f-nome').value.trim(),email:document.getElementById('f-email').value.trim(),tipo:document.getElementById('f-tipo').value,msg:document.getElementById('f-msg').value.trim(),ts:Date.now()}; if(!item.msg) return; const items=loadItems(); items.push(item); saveItems(items); form.reset(); render(); spawnLeafBurst(10, window.innerWidth*0.5, window.innerHeight*0.7); });
btnExport?.addEventListener('click',()=>{ const blob=new Blob([JSON.stringify(loadItems(),null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='faq-hortelan.json'; a.click(); URL.revokeObjectURL(url); });
if(location.search.includes('clearFaq')){ localStorage.removeItem(LIST_KEY); }
render();

// Extra playful effects across the full page
(function playfulGardenFX(){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const progress = document.createElement('div');
  progress.className = 'scroll-grow';
  document.body.appendChild(progress);

  const updateProgress = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = total > 0 ? window.scrollY / total : 0;
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, ratio))})`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  if(!reduced){
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-spark';
    document.body.appendChild(sparkle);

    window.addEventListener('pointermove', (ev) => {
      sparkle.style.left = `${ev.clientX}px`;
      sparkle.style.top = `${ev.clientY}px`;
    }, { passive: true });

    document.addEventListener('click', (ev) => {
      const pop = document.createElement('span');
      pop.className = 'soil-pop';
      pop.textContent = ['🌱', '🍀', '🌿', '💧'][Math.floor(Math.random() * 4)];
      pop.style.left = `${ev.clientX}px`;
      pop.style.top = `${ev.clientY}px`;
      document.body.appendChild(pop);
      setTimeout(() => pop.remove(), 900);
    });
  }

  const kpis = document.querySelectorAll('.kpi .value');
  if('IntersectionObserver' in window){
    const animateKPI = (el) => {
      const raw = el.textContent.trim();
      const match = raw.match(/^([−-]?)(\d+)(.*)$/);
      if(!match) return;
      const sign = match[1] || '';
      const target = Number(match[2]);
      const suffix = match[3] || '';
      const duration = reduced ? 0 : 1100;
      const start = performance.now();

      const tick = (now) => {
        const p = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = Math.round(target * eased);
        el.textContent = `${sign}${value}${suffix}`;
        if(p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const kpiObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting){
          animateKPI(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    kpis.forEach((item) => kpiObserver.observe(item));
  }

  document.querySelectorAll('.btn').forEach((btn) => {
    if(reduced) return;
    btn.addEventListener('pointermove', (ev) => {
      const rect = btn.getBoundingClientRect();
      const x = ev.clientX - rect.left - rect.width / 2;
      const y = ev.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.07}px, ${y * 0.08}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });

  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  if(sections.length && navLinks.length && 'IntersectionObserver' in window){
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', active);
        });
      });
    }, { threshold: 0.4 });
    sections.forEach((section) => navObserver.observe(section));
  }
})();

// Immersive theme interactions: watering rain, IoT constellation and IA mood feedback
(function hortelanImmersiveFX(){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero');
  if(!hero) return;

  const firstVisitKey = 'hortelan_first_visit_v2';
  const isFirstVisit = !localStorage.getItem(firstVisitKey);
  localStorage.setItem(firstVisitKey, String(Date.now()));

  const overlay = document.createElement('div');
  overlay.className = 'iot-sky';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  if(!reduced){
    for(let i=0;i<18;i++){
      const node = document.createElement('span');
      node.className = 'sat-node';
      node.style.left = `${Math.random() * 100}%`;
      node.style.top = `${Math.random() * 100}%`;
      node.style.animationDelay = `${(Math.random() * 2.4).toFixed(2)}s`;
      overlay.appendChild(node);
    }
  }

  const rainLayer = document.createElement('div');
  rainLayer.className = 'rain-layer';
  rainLayer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(rainLayer);

  const createDrop = (x, y) => {
    const d = document.createElement('span');
    d.className = 'rain-drop';
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    d.style.setProperty('--fall', `${200 + Math.random() * 220}px`);
    d.style.animationDuration = `${450 + Math.random() * 350}ms`;
    rainLayer.appendChild(d);
    setTimeout(() => d.remove(), 900);
  };

  const rainBurst = (x, y, amount=22) => {
    if(reduced) return;
    for(let i=0;i<amount;i++){
      createDrop(x + (Math.random() - .5) * 180, y - 20 - Math.random() * 60);
    }
  };

  if(isFirstVisit){
    setTimeout(() => {
      const toast = document.createElement('div');
      toast.className = 'grow-toast';
      toast.innerHTML = '<strong>🌱 Bem-vindo(a) à estufa inteligente!</strong><span>Sistemas de irrigação, IA e satélite ativados.</span>';
      document.body.appendChild(toast);

      const box = hero.getBoundingClientRect();
      rainBurst(box.left + box.width * .65, box.top + 90, 32);
      spawnLeafBurst(15, box.left + box.width * .6, box.top + 110);
      setTimeout(() => toast.classList.add('is-visible'), 80);
      setTimeout(() => toast.classList.remove('is-visible'), 4500);
      setTimeout(() => toast.remove(), 5200);
    }, 550);
  }

  const trackSections = Array.from(document.querySelectorAll('main section'));
  const updateMood = () => {
    const ratio = Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight));
    document.body.style.setProperty('--satellite-signal', (0.22 + ratio * .65).toFixed(2));
    document.body.style.setProperty('--hydration', (0.35 + ratio * .45).toFixed(2));
  };
  updateMood();
  window.addEventListener('scroll', updateMood, { passive: true });

  if('IntersectionObserver' in window){
    const secObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('section-live', entry.isIntersecting);
        if(entry.isIntersecting && !reduced && Math.random() > .5){
          const r = entry.target.getBoundingClientRect();
          rainBurst(r.left + r.width * (0.35 + Math.random() * 0.3), r.top + 40, 8);
        }
      });
    }, { threshold: 0.45 });
    trackSections.forEach((sec) => secObserver.observe(sec));
  }

  document.querySelectorAll('.card, .btn, .feature').forEach((item) => {
    item.addEventListener('click', (ev) => {
      const rect = item.getBoundingClientRect();
      const x = ev.clientX || rect.left + rect.width / 2;
      const y = ev.clientY || rect.top + rect.height / 2;
      rainBurst(x, y, 14);

      const pulse = document.createElement('span');
      pulse.className = 'water-pulse';
      pulse.style.left = `${x}px`;
      pulse.style.top = `${y}px`;
      document.body.appendChild(pulse);
      setTimeout(() => pulse.remove(), 850);
    });
  });

  const nav = document.querySelector('.navbar');
  if(nav){
    window.addEventListener('scroll', () => {
      nav.classList.toggle('is-irrigating', window.scrollY > 120);
    }, { passive: true });
  }
})();
