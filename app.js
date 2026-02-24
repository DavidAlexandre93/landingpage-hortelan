document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());

const navWrap = document.querySelector('.nav-wrap');
const menuToggle = document.querySelector('.menu-toggle');
const navCollapse = document.getElementById('nav-collapse');

// i18n dictionaries (kept short for demo)
const dict={pt:{'nav.features':'Recursos','nav.how':'Como funciona','nav.journeys':'Jornadas','nav.pricing':'Planos','nav.faq':'FAQ','nav.docs':'Docs','nav.demo':'Abrir Demo','nav.about':'Sobre','hero.badge':'IoT • Automação • Comunidade','hero.title':'Cultive melhor com dados, automação e uma comunidade ativa','hero.subtitle':'Hortelan Agtech Ltda. integra sensores, regras de automação e um painel em tempo real, com uma comunidade que ensina e recompensa boas práticas.','hero.ctaPrimary':'Explorar Demo','hero.ctaSecondary':'Ver Recursos','kpis.k1':'Tempo p/ ação em alertas','kpis.k2':'Relatórios manuais','kpis.k3':'Chamados repetitivos','kpis.k4':'Onboarding c/ SSO','features.title':'Recursos que fecham o ciclo de cuidado','features.subtitle':'Do monitoramento ao aprendizado, da automação aos incentivos — tudo em um único produto.','about.title':'Sobre a Hortelan Agtech Ltda.','about.subtitle':'Nossa missão é simplificar o cultivo com tecnologia acessível, dados em tempo real e uma comunidade que aprende junto.','about.p1':'Hortelan Agtech Ltda. integra sensores, automação por regras e um painel web para acompanhar tudo de forma simples.','about.l1':'Instalação rápida e segura com kits compatíveis.','about.l2':'Automatize irrigação, iluminação e ventilação com histerese e janelas de operação.','about.l3':'Alertas inteligentes para agir no tempo certo.','about.l4':'Comunidade para compartilhar resultados e aprender com outros cultivadores.','cta.title':'Pronto para cultivar com inteligência?','cta.subtitle':'Abra o demo, explore os recursos e conte para a comunidade como foram seus primeiros resultados.','cta.demo':'Abrir Demo','cta.docs':'Ver Apresentação','footer.rights':'Todos os direitos reservados.'},en:{'nav.features':'Features','nav.how':'How it works','nav.journeys':'Journeys','nav.pricing':'Pricing','nav.faq':'FAQ','nav.docs':'Docs','nav.demo':'Open Demo','nav.about':'About','hero.badge':'IoT • Automation • Community','hero.title':'Grow better with data, automation and an active community','hero.subtitle':'Hortelan Agtech Ltda. brings sensors, rule-based automation and a realtime dashboard together with a community that teaches and rewards good practices.','hero.ctaPrimary':'Explore Demo','hero.ctaSecondary':'See Features','kpis.k1':'Time to act on alerts','kpis.k2':'Manual reports','kpis.k3':'Repeat tickets','kpis.k4':'SSO onboarding','features.title':'Features that close the care loop','features.subtitle':'From monitoring to learning, from automation to incentives — in a single product.','about.title':'About Hortelan Agtech Ltda.','about.subtitle':'Our mission is to make growing simple with accessible tech, realtime data and a community that learns together.','about.p1':'Hortelan Agtech Ltda. brings sensors, rule-based automation and a web dashboard to keep everything simple.','about.l1':'Quick, secure setup with compatible kits.','about.l2':'Automate watering, lighting and ventilation with hysteresis and time windows.','about.l3':'Smart alerts so you act at the right time.','about.l4':'Community to share results and learn from other growers.','cta.title':'Ready to grow smart?','cta.subtitle':'Open the demo, explore the features and tell the community about your first results.','cta.demo':'Open Demo','cta.docs':'View Slides','footer.rights':'All rights reserved.'},es:{'nav.features':'Funciones','nav.how':'Cómo funciona','nav.journeys':'Jornadas','nav.pricing':'Planes','nav.faq':'FAQ','nav.docs':'Docs','nav.demo':'Abrir demo','nav.about':'Sobre','hero.badge':'IoT • Automatización • Comunidad','hero.title':'Cultiva mejor con datos, automatización y una comunidad activa','hero.subtitle':'Hortelan Agtech Ltda. integra sensores, reglas de automatización y un panel en tiempo real con una comunidad que enseña y recompensa buenas prácticas.','hero.ctaPrimary':'Explorar demo','hero.ctaSecondary':'Ver funciones','kpis.k1':'Tiempo para actuar en alertas','kpis.k2':'Reportes manuales','kpis.k3':'Tickets repetitivos','kpis.k4':'Onboarding con SSO','features.title':'Funciones que cierran el ciclo de cuidado','features.subtitle':'Del monitoreo al aprendizaje, de la automatización a los incentivos, en un único producto.','about.title':'Sobre Hortelan Agtech Ltda.','about.subtitle':'Nuestra misión es simplificar el cultivo con tecnología accesible, datos en tiempo real y una comunidad que aprende unida.','about.p1':'Hortelan Agtech Ltda. integra sensores, automatización por reglas y un panel web para acompañar todo de forma simple.','about.l1':'Instalación rápida y segura con kits compatibles.','about.l2':'Automatiza riego, iluminación y ventilación con histéresis y ventanas de operación.','about.l3':'Alertas inteligentes para actuar en el momento correcto.','about.l4':'Comunidad para compartir resultados y aprender con otros cultivadores.','cta.title':'¿Listo para cultivar con inteligencia?','cta.subtitle':'Abre el demo, explora funciones y cuéntale a la comunidad tus primeros resultados.','cta.demo':'Abrir demo','cta.docs':'Ver presentación','footer.rights':'Todos los derechos reservados.'},fr:{'nav.features':'Fonctionnalités','nav.how':'Comment ça marche','nav.journeys':'Parcours','nav.pricing':'Tarifs','nav.faq':'FAQ','nav.docs':'Docs','nav.demo':'Ouvrir la démo','nav.about':'À propos','hero.badge':'IoT • Automatisation • Communauté','hero.title':'Cultivez mieux avec les données, l’automatisation et une communauté active','hero.subtitle':'Hortelan Agtech Ltda. réunit capteurs, automatisation par règles et tableau de bord temps réel avec une communauté qui enseigne et récompense les bonnes pratiques.','hero.ctaPrimary':'Explorer la démo','hero.ctaSecondary':'Voir les fonctionnalités','kpis.k1':'Temps d’action sur alertes','kpis.k2':'Rapports manuels','kpis.k3':'Tickets répétitifs','kpis.k4':'Onboarding SSO','features.title':'Des fonctionnalités qui bouclent le cycle du soin','features.subtitle':'Du suivi à l’apprentissage, de l’automatisation aux incitations — dans un seul produit.','about.title':'À propos de Hortelan Agtech Ltda.','about.subtitle':'Notre mission: simplifier la culture avec une technologie accessible, des données temps réel et une communauté qui apprend ensemble.','about.p1':'Hortelan Agtech Ltda. intègre capteurs, automatisation par règles et un tableau de bord web pour tout suivre simplement.','about.l1':'Installation rapide et sécurisée avec kits compatibles.','about.l2':'Automatisez arrosage, éclairage et ventilation avec hystérésis et fenêtres d’opération.','about.l3':'Alertes intelligentes pour agir au bon moment.','about.l4':'Communauté pour partager des résultats et apprendre des autres cultivateurs.','cta.title':'Prêt à cultiver intelligemment ?','cta.subtitle':'Ouvrez la démo, explorez les fonctionnalités et partagez vos premiers résultats avec la communauté.','cta.demo':'Ouvrir la démo','cta.docs':'Voir la présentation','footer.rights':'Tous droits réservés.'}};

function setLang(lang){
  const selected=dict[lang]||dict.en;
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(selected[k]) el.textContent=selected[k];
  });
  document.querySelectorAll('.lang-switch button').forEach((btn)=>{
    const active=btn.dataset.lang===lang;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-pressed',String(active));
  });
  localStorage.setItem('lang',lang);
}

function getLangFromCountry(countryCode){
  const cc=(countryCode||'').toUpperCase();
  if(['BR','PT','AO','MZ'].includes(cc)) return 'pt';
  if(['ES','MX','AR','CO','CL','PE','UY','PY','BO','VE','EC','DO','GT','HN','SV','NI','CR','PA','CU'].includes(cc)) return 'es';
  if(['FR','BE','CH','CA','LU','MC'].includes(cc)) return 'fr';
  return 'en';
}

async function detectLanguage(){
  const saved=localStorage.getItem('lang');
  if(saved){ setLang(saved); return; }
  try{
    const res=await fetch('https://ipapi.co/json/');
    if(!res.ok) throw new Error('request failed');
    const data=await res.json();
    setLang(getLangFromCountry(data.country));
  }catch(err){
    setLang('en');
  }
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

import React, { useRef } from 'https://esm.sh/react@18.3.1';
import { createRoot } from 'https://esm.sh/react-dom@18.3.1/client';
import gsap from 'https://esm.sh/gsap@3.12.5';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.5/ScrollTrigger';
import { useGSAP } from 'https://esm.sh/@gsap/react@2.1.1';
import { animate as motionAnimate, inView as motionInView, hover, press } from 'https://esm.sh/motion@11.11.13';

gsap.registerPlugin(ScrollTrigger, useGSAP);

initSplashScene();


function initSplashScene(){
  const splash = document.getElementById('splash-screen');
  const rainLayer = document.getElementById('splash-rain');
  if(!splash || prefersReducedMotion){
    splash?.remove();
    return;
  }

  document.body.classList.add('splash-active');

  for(let i=0;i<34;i++){
    const drop=document.createElement('span');
    drop.className='splash-rain-drop';
    drop.style.left=`${Math.random()*100}%`;
    drop.style.animationDelay=`${Math.random()*0.6}s`;
    rainLayer.appendChild(drop);
  }

  motionAnimate('.splash-rain-drop',
    { y:[-30, window.innerHeight*0.85], opacity:[0,1,0] },
    { duration:0.95, easing:'linear', repeat:5, delay:(i)=>i*0.04 }
  );

  motionAnimate('.splash-plant .plant-leaf',
    { rotate:[-7,7,-5] },
    { duration:2.1, easing:'ease-in-out', repeat:Infinity, delay:(i)=>i*0.1 }
  );

  const tl = gsap.timeline({ defaults:{ ease:'power2.out' }, onComplete:()=>{
    document.body.classList.remove('splash-active');
    splash.remove();
  }});

  tl.to(splash,{ '--day-progress':1, duration:2.5, ease:'sine.inOut' })
    .to('.plant-stem',{ scaleY:1, duration:1, stagger:0.16 },0.45)
    .to('.plant-leaf',{ opacity:1, scale:1, duration:0.7, stagger:0.08 },1.12)
    .to('.splash-content',{ y:-16, duration:0.55 },1.7)
    .to(splash,{ clipPath:'circle(0% at 50% 100%)', opacity:0, duration:1 },2.7);
}

const animateWithGsap=(target,vars,options={})=>{
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

if(navWrap&&menuToggle&&navCollapse){
  const closeMenu=()=>{
    navWrap.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded','false');
  };

  press(menuToggle,()=>{
    const opening=!navWrap.classList.contains('menu-open');
    navWrap.classList.toggle('menu-open',opening);
    menuToggle.setAttribute('aria-expanded',String(opening));
  });

  press(navCollapse.querySelectorAll('a[href]'),()=>closeMenu());

  ScrollTrigger.matchMedia({
    '(min-width: 768px)': ()=>closeMenu()
  });

  press(document,(_, startEvent)=>{
    const target = startEvent.target;
    if(!navWrap.classList.contains('menu-open')) return;
    if(navWrap.contains(target)) return;
    closeMenu();
  });
}

press(document.querySelectorAll('.lang-switch button'),(element)=>setLang(element.dataset.lang));
detectLanguage();

const revealTargets = Array.from(document.querySelectorAll('section, .card, .faq-item, .title-xl, .subtitle'));
revealTargets.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
});

motionInView(revealTargets, (element) => {
  animateWithGsap(
    element,
    { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0px)'] },
    { duration: prefersReducedMotion ? 0 : 0.6, ease: 'power3.out', delay: prefersReducedMotion ? 0 : 0.05 }
  );
}, { amount: 0.2 });

const nav = document.querySelector('.navbar');
if(nav){
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => nav.classList.toggle('is-irrigating', self.scroll() > 120)
  });
}

const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
if(sections.length && navLinks.length){
  sections.forEach((section)=>{
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: ({isActive}) => {
        if(!isActive) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${section.id}`;
          link.classList.toggle('is-active', active);
        });
      }
    });
  });
}

const kpiValues = Array.from(document.querySelectorAll('.kpi .value'));
motionInView(kpiValues, (element) => {
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
}, { amount: 0.5 });

const actionTargets = document.querySelectorAll('.btn, .pill, .brand-logo, .logo-footer');
actionTargets.forEach((el) => {
  hover(el, () => {
    if(prefersReducedMotion) return undefined;
    gsap.to(el, { y: -3, scale: 1.02, duration: 0.2, ease: 'power1.out' });
    return () => gsap.to(el, { y: 0, scale: 1, duration: 0.2, ease: 'power1.out' });
  });

  press(el, () => {
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
      hover(heroMock, () => {
        gsap.to(heroMock,{ scale:1.02, duration:0.22, ease:'power1.out' });
        return () => gsap.to(heroMock,{ rotateX:0, rotateY:0, scale:1, duration:0.35 });
      });

      press(heroMock, ()=>{
        gsap.fromTo(heroMock,{ rotate:0 },{ rotate:1.4, duration:0.12, yoyo:true, repeat:1, ease:'power1.out' });
      });
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
    animateWithGsap(card, { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0px)'] }, { duration: prefersReducedMotion ? 0 : 0.35 });
  });

  press(listEl.querySelectorAll('.btn-del'), (button)=>{
    const id=button.getAttribute('data-id');
    const items=loadItems().filter(x=>x.id!==id);
    saveItems(items);
    render();
  });
}

if(form){
  form.onsubmit=(e)=>{
    e.preventDefault();
    const item={id:Math.random().toString(36).slice(2),nome:document.getElementById('f-nome').value.trim(),email:document.getElementById('f-email').value.trim(),tipo:document.getElementById('f-tipo').value,msg:document.getElementById('f-msg').value.trim(),ts:Date.now()};
    if(!item.msg) return;
    const items=loadItems();
    items.push(item);
    saveItems(items);
    form.reset();
    render();
  };
}

if(btnExport){
  press(btnExport,()=>{
    const blob=new Blob([JSON.stringify(loadItems(),null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download='faq-hortelan.json';
    a.click();
    URL.revokeObjectURL(url);
  });
}

if(location.search.includes('clearFaq')){ localStorage.removeItem(LIST_KEY); }
render();
