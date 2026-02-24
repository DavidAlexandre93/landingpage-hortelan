document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());

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
