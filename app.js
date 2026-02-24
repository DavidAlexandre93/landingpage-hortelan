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

import React, { useRef } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';
import { useGSAP } from 'https://esm.sh/@gsap/react@2.1.1';
import { animate as motionAnimate } from 'https://esm.sh/motion@11.11.13';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const animate=(target,vars,options={})=>{
  const fromVars={};
  const toVars={...options,...vars};
  if(Array.isArray(vars.opacity)){
    fromVars.opacity=vars.opacity[0];
    toVars.opacity=vars.opacity[1];
  }
  if(Array.isArray(vars.y)){
    fromVars.y=vars.y[0];
    toVars.y=vars.y[1];
  }
  if(Array.isArray(vars.scale)){
    fromVars.scale=vars.scale[0];
    toVars.scale=vars.scale[vars.scale.length-1];
  }
  if(Array.isArray(vars.transform)){
    fromVars.transform=vars.transform[0];
    toVars.transform=vars.transform[1];
  }
  if(Object.keys(fromVars).length) return gsap.fromTo(target,fromVars,toVars);
  return gsap.to(target,toVars);
};

const inView=(targets,handler,{amount=0.2}={})=>{
  const list=Array.from(targets||[]);
  if(!list.length) return;
  const io=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(!entry.isIntersecting) return;
      handler(entry.target);
      io.unobserve(entry.target);
    });
  },{threshold:amount});
  list.forEach((el)=>io.observe(el));
};


function setupCultivoScene(){
  const scene=document.getElementById('cultivo-scene');
  if(!scene) return;

  const isNight=(()=>{
    const hour=new Date().getHours();
    return hour>=18 || hour<6;
  })();

  scene.classList.toggle('night',isNight);

  const plants=Array.from(scene.querySelectorAll('.plant'));
  const rainField=scene.querySelector('#rain-field');
  let hydration=isNight ? 1 : 0;

  gsap.set(plants,{
    scaleY:isNight ? 1 : 0.25,
    transformOrigin:'bottom center'
  });

  if(!prefersReducedMotion){
    plants.forEach((plant,index)=>{
      motionAnimate(plant,{ rotate:[-2,2,-2] },{
        duration:2.2 + index * 0.1,
        repeat:Infinity,
        easing:'ease-in-out',
        delay:index * 0.08,
        direction:'alternate'
      });
    });
  }

  const spawnRain=(burst=8)=>{
    if(!rainField || prefersReducedMotion) return;
    for(let i=0;i<burst;i+=1){
      const drop=document.createElement('span');
      drop.className='rain-drop-mini';
      drop.style.left=`${Math.random()*100}%`;
      drop.style.opacity=String(0.45 + Math.random()*0.45);
      rainField.appendChild(drop);
      gsap.fromTo(drop,{ y:-20, x:0 },{ y:250 + Math.random()*60, x:-22, duration:0.45 + Math.random()*0.45, ease:'none', onComplete:()=>drop.remove() });
    }
  };

  const growPlants=()=>{
    hydration=Math.min(1,hydration+0.12);
    gsap.to(plants,{
      scaleY:0.25 + hydration*0.75,
      duration:0.45,
      stagger:0.04,
      ease:'back.out(1.4)'
    });
  };

  if(isNight){
    spawnRain(10);
    return;
  }

  const interact=()=>{
    spawnRain(12);
    growPlants();
  };

  scene.addEventListener('pointermove',interact);
  scene.addEventListener('click',interact);
}

setupCultivoScene();

const revealTargets = Array.from(document.querySelectorAll('section, .card, .faq-item, .title-xl, .subtitle'));
revealTargets.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
});

inView(revealTargets, (element) => {
  animate(
    element,
    { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
    { duration: prefersReducedMotion ? 0 : 0.6, ease: 'power3.out', delay: prefersReducedMotion ? 0 : 0.05 }
  );
});

const nav = document.querySelector('.navbar');
if(nav){
  const onScroll=()=>nav.classList.toggle('is-irrigating', window.scrollY>120);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive:true });
}

const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
if(sections.length && navLinks.length){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
      });
    });
  },{threshold:0.45});
  sections.forEach((section)=>io.observe(section));
}

const kpiValues = Array.from(document.querySelectorAll('.kpi .value'));
inView(kpiValues, (element) => {
  const raw = element.textContent.trim();
  const match = raw.match(/^([−-]?)(\d+)(.*)$/);
  if(!match || prefersReducedMotion) return;

  const sign = match[1] || '';
  const target = Number(match[2]);
  const suffix = match[3] || '';
  const state = { value: 0 };

  gsap.to(state, {
    value: target,
    duration: 1.1,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent = `${sign}${Math.round(state.value)}${suffix}`;
    }
  });
});

const actionTargets = document.querySelectorAll('.btn, .pill, .brand-logo, .logo-footer');
actionTargets.forEach((el) => {
  el.addEventListener('pointerenter', () => {
    if(prefersReducedMotion) return;
    gsap.to(el, { y: -3, scale: 1.02, duration: 0.2, ease: 'power1.out' });
  });
  el.addEventListener('pointerleave', () => {
    gsap.to(el, { y: 0, scale: 1, duration: 0.2, ease: 'power1.out' });
  });
  el.addEventListener('click', () => {
    if(prefersReducedMotion) return;
    gsap.fromTo(el, { scale: 1 }, { scale: 1.03, yoyo: true, repeat: 1, duration: 0.16, ease: 'power1.out' });
  });
});

function SpecialSectionsMotion(){
  const scopeRef=useRef(null);

  useGSAP(()=>{
    if(prefersReducedMotion) return;

    const hero = document.querySelector('.hero');
    const heroMock = hero?.querySelector('.mock');
    const heroBadge = hero?.querySelector('.badge');
    const heroTitle = hero?.querySelector('#hero-title');
    const heroLead = hero?.querySelector('.lead');
    const heroCtas = hero?.querySelectorAll('.hero .row .btn');

    if(hero){
      const tl=gsap.timeline({ defaults:{ ease:'power3.out' } });
      tl.from([heroBadge,heroTitle,heroLead],{ y:26, opacity:0, stagger:0.08, duration:0.7 })
        .from(heroCtas||[],{ y:18, opacity:0, stagger:0.08, duration:0.45 },'-=0.3');
    }

    if(heroMock){
      const onMove=(ev)=>{
        const rect = heroMock.getBoundingClientRect();
        const x = (ev.clientX - rect.left) / rect.width - 0.5;
        const y = (ev.clientY - rect.top) / rect.height - 0.5;
        gsap.to(heroMock,{ rotateX:-y*8, rotateY:x*10, scale:1.02, transformPerspective:900, transformOrigin:'center', duration:0.22, overwrite:true });
      };
      const onLeave=()=>gsap.to(heroMock,{ rotateX:0, rotateY:0, scale:1, duration:0.35 });
      heroMock.addEventListener('pointermove',onMove);
      heroMock.addEventListener('pointerleave',onLeave);
    }

    gsap.to('.mock',{
      yPercent:-8,
      ease:'none',
      scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:0.6 }
    });

    const storyCards=gsap.utils.toArray('#journeys .card');
    storyCards.forEach((card,index)=>{
      gsap.from(card,{ y:60, opacity:0, duration:0.65, ease:'power3.out',
        scrollTrigger:{ trigger:card, start:'top 82%', toggleActions:'play none none reverse' },
        delay:index*0.08
      });
    });

    gsap.to('#how .card',{ 
      yPercent:(i)=> i % 2 === 0 ? -6 : 6,
      ease:'none',
      scrollTrigger:{ trigger:'#how', start:'top bottom', end:'bottom top', scrub:0.8 }
    });

    gsap.from('.scroll-grow',{ 
      scaleX:0,
      transformOrigin:'left center',
      ease:'none',
      scrollTrigger:{ start:0, end:'max', scrub:true }
    });
  },{scope:scopeRef});

  return React.createElement('div',{ref:scopeRef,'aria-hidden':'true',style:{display:'none'}});
}

const progress = document.createElement('div');
progress.className = 'scroll-grow';
document.body.appendChild(progress);

const gsapRoot = document.createElement('div');
gsapRoot.id='gsap-motion-root';
document.body.appendChild(gsapRoot);
createRoot(gsapRoot).render(React.createElement(SpecialSectionsMotion));

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
    const d=new Date(it.ts); const card=document.createElement('div'); card.className='faq-item';
    card.innerHTML=`<div class="faq-meta"><strong>${it.nome||'Anônimo'}</strong> • ${it.tipo.toUpperCase()} • ${d.toLocaleString()}</div>
                    <p style="margin:.5rem 0 0">${(it.msg||'').replace(/</g,'&lt;')}</p>
                    <div class="row mt-2"><button class="btn ghost btn-del" data-id="${it.id}">Remover</button></div>`;
    listEl.appendChild(card);
    animate(card, { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0px)'] }, { duration: prefersReducedMotion ? 0 : 0.35 });
  });
  listEl.querySelectorAll('.btn-del').forEach(b=>b.addEventListener('click',e=>{
    const id=e.currentTarget.getAttribute('data-id'); const items=loadItems().filter(x=>x.id!==id); saveItems(items); render();
  }));
}
form?.addEventListener('submit',e=>{ e.preventDefault(); const item={id:Math.random().toString(36).slice(2),nome:document.getElementById('f-nome').value.trim(),email:document.getElementById('f-email').value.trim(),tipo:document.getElementById('f-tipo').value,msg:document.getElementById('f-msg').value.trim(),ts:Date.now()}; if(!item.msg) return; const items=loadItems(); items.push(item); saveItems(items); form.reset(); render(); });
btnExport?.addEventListener('click',()=>{ const blob=new Blob([JSON.stringify(loadItems(),null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='faq-hortelan.json'; a.click(); URL.revokeObjectURL(url); });
if(location.search.includes('clearFaq')){ localStorage.removeItem(LIST_KEY); }
render();

