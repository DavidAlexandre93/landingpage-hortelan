document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());

const navWrap = document.querySelector('.nav-wrap');
const menuToggle = document.querySelector('.menu-toggle');
const navCollapse = document.getElementById('nav-collapse');
const typingRegistry = new WeakMap();

// i18n dictionaries (kept short for demo)
const dict={pt:{'nav.features':'Recursos','nav.how':'Como funciona','nav.journeys':'Jornadas','nav.pricing':'Planos','nav.faq':'FAQ','nav.docs':'Documentação','nav.demo':'Abrir Demo','nav.about':'Sobre','hero.badge':'Acesso • Monitoramento • Gestão 360','hero.title':'Plataforma Hortelan completa: do acesso seguro ao monitoramento, operações e comunidade','hero.subtitle':'Tela splash, login com 2FA e recuperação de senha, dashboard com automações IoT, onboarding guiado, catálogo, blog, admin, alertas, relatórios, assinaturas, integrações, suporte, segurança, perfil e visão Hortelan 360 em um só fluxo.','hero.ctaPrimary':'Explorar Demo','hero.ctaSecondary':'Ver Recursos','kpis.k1':'Acesso seguro com 2FA','kpis.k2':'Onboarding guiado com checklist','kpis.k3':'Operação com alertas e relatórios','kpis.k4':'Módulos integrados (360)','features.title':'Recursos que cobrem toda a jornada da plataforma','features.subtitle':'Da autenticação ao checkout, da automação ao suporte: módulos prontos para operação diária, gestão e crescimento.','about.title':'Sobre a Hortelan Agtech Ltda.','about.subtitle':'Centralizamos experiência do usuário, confiabilidade operacional e governança de dados para todas as etapas da jornada digital do cultivo.','about.p1':'O produto atual reúne acesso/conta, monitoramento principal, onboarding orientado, catálogo, comunidade, gestão administrativa, alertas, relatórios, assinaturas, integrações, segurança, perfil, suporte e status operacional em tempo real.','about.l1':'Conta e acesso: splash, login com lembrar-me e confiar no dispositivo, cadastro seguro, esqueci senha e reset com token.','about.l2':'Dashboard e operação: widgets, indicadores por horta, automação por regras, agenda de tarefas, planejamento de plantio, eventos por planta e bloco blockchain.','about.l3':'Módulos de negócio: onboarding guiado/demo, loja com filtros/carrinho/checkout, comunidade com reputação/feed/perguntas e central admin para usuários e IoT.','about.l4':'Confiabilidade e experiência: alertas e notificações, relatórios CSV/PDF, assinaturas, integrações + ops, LGPD/sessões/2FA, perfil/preferências, help center, status em tempo real, topbar global com busca/tema/idioma/conta.','cta.title':'Pronto para validar a plataforma ponta a ponta?','cta.subtitle':'Abra o demo e percorra os fluxos de acesso, monitoramento, operações, comunidade e gestão completa.','cta.demo':'Abrir Demo','cta.docs':'Ver Apresentação','footer.rights':'Todos os direitos reservados.'},en:{'nav.features':'Features','nav.how':'How it works','nav.journeys':'Journeys','nav.pricing':'Pricing','nav.faq':'FAQ','nav.docs':'Documentation','nav.demo':'Open Demo','nav.about':'About','hero.badge':'IoT • Automation • Community','hero.title':'Grow better with data, automation and an active community','hero.subtitle':'Hortelan Agtech Ltda. brings sensors, rule-based automation and a realtime dashboard together with a community that teaches and rewards good practices.','hero.ctaPrimary':'Explore Demo','hero.ctaSecondary':'See Features','kpis.k1':'Time to act on alerts','kpis.k2':'Manual reports','kpis.k3':'Repeat tickets','kpis.k4':'SSO onboarding','features.title':'Features that close the care loop','features.subtitle':'From monitoring to learning, from automation to incentives — in a single product.','about.title':'About Hortelan Agtech Ltda.','about.subtitle':'Our mission is to make growing simple with accessible tech, realtime data and a community that learns together.','about.p1':'Hortelan Agtech Ltda. brings sensors, rule-based automation and a web dashboard to keep everything simple.','about.l1':'Quick, secure setup with compatible kits.','about.l2':'Automate watering, lighting and ventilation with hysteresis and time windows.','about.l3':'Smart alerts so you act at the right time.','about.l4':'Community to share results and learn from other growers.','cta.title':'Ready to grow smart?','cta.subtitle':'Open the demo, explore the features and tell the community about your first results.','cta.demo':'Open Demo','cta.docs':'View Slides','footer.rights':'All rights reserved.'},es:{'nav.features':'Funciones','nav.how':'Cómo funciona','nav.journeys':'Jornadas','nav.pricing':'Planes','nav.faq':'FAQ','nav.docs':'Documentación','nav.demo':'Abrir demo','nav.about':'Sobre','hero.badge':'IoT • Automatización • Comunidad','hero.title':'Cultiva mejor con datos, automatización y una comunidad activa','hero.subtitle':'Hortelan Agtech Ltda. integra sensores, reglas de automatización y un panel en tiempo real con una comunidad que enseña y recompensa buenas prácticas.','hero.ctaPrimary':'Explorar demo','hero.ctaSecondary':'Ver funciones','kpis.k1':'Tiempo para actuar en alertas','kpis.k2':'Reportes manuales','kpis.k3':'Tickets repetitivos','kpis.k4':'Onboarding con SSO','features.title':'Funciones que cierran el ciclo de cuidado','features.subtitle':'Del monitoreo al aprendizaje, de la automatización a los incentivos, en un único producto.','about.title':'Sobre Hortelan Agtech Ltda.','about.subtitle':'Nuestra misión es simplificar el cultivo con tecnología accesible, datos en tiempo real y una comunidad que aprende unida.','about.p1':'Hortelan Agtech Ltda. integra sensores, automatización por reglas y un panel web para acompañar todo de forma simple.','about.l1':'Instalación rápida y segura con kits compatibles.','about.l2':'Automatiza riego, iluminación y ventilación con histéresis y ventanas de operación.','about.l3':'Alertas inteligentes para actuar en el momento correcto.','about.l4':'Comunidad para compartir resultados y aprender con otros cultivadores.','cta.title':'¿Listo para cultivar con inteligencia?','cta.subtitle':'Abre el demo, explora funciones y cuéntale a la comunidad tus primeros resultados.','cta.demo':'Abrir demo','cta.docs':'Ver presentación','footer.rights':'Todos los derechos reservados.'},fr:{'nav.features':'Fonctionnalités','nav.how':'Comment ça marche','nav.journeys':'Parcours','nav.pricing':'Tarifs','nav.faq':'FAQ','nav.docs':'Documentation','nav.demo':'Ouvrir la démo','nav.about':'À propos','hero.badge':'IoT • Automatisation • Communauté','hero.title':'Cultivez mieux avec les données, l’automatisation et une communauté active','hero.subtitle':'Hortelan Agtech Ltda. réunit capteurs, automatisation par règles et tableau de bord temps réel avec une communauté qui enseigne et récompense les bonnes pratiques.','hero.ctaPrimary':'Explorer la démo','hero.ctaSecondary':'Voir les fonctionnalités','kpis.k1':'Temps d’action sur alertes','kpis.k2':'Rapports manuels','kpis.k3':'Tickets répétitifs','kpis.k4':'Onboarding SSO','features.title':'Des fonctionnalités qui bouclent le cycle du soin','features.subtitle':'Du suivi à l’apprentissage, de l’automatisation aux incitations — dans un seul produit.','about.title':'À propos de Hortelan Agtech Ltda.','about.subtitle':'Notre mission: simplifier la culture avec une technologie accessible, des données temps réel et une communauté qui apprend ensemble.','about.p1':'Hortelan Agtech Ltda. intègre capteurs, automatisation par règles et un tableau de bord web pour tout suivre simplement.','about.l1':'Installation rapide et sécurisée avec kits compatibles.','about.l2':'Automatisez arrosage, éclairage et ventilation avec hystérésis et fenêtres d’opération.','about.l3':'Alertes intelligentes pour agir au bon moment.','about.l4':'Communauté pour partager des résultats et apprendre des autres cultivateurs.','cta.title':'Prêt à cultiver intelligemment ?','cta.subtitle':'Ouvrez la démo, explorez les fonctionnalités et partagez vos premiers résultats avec la communauté.','cta.demo':'Ouvrir la démo','cta.docs':'Voir la présentation','footer.rights':'Tous droits réservés.'}};

const SUPPORTED_LANGUAGES = Object.freeze(Object.keys(dict));
const DEFAULT_LANG = 'pt';
const browserLanguageMap = Object.freeze({
  pt: 'pt',
  en: 'en',
  es: 'es',
  fr: 'fr',
});


const dictOverrides = {
  en: {
    'features.f1.title': 'Realtime dashboard',
    'features.f1.desc': 'KPIs, charts and history — from executive overview to operational detail.',
    'features.f2.title': 'Rule-based automation',
    'features.f2.desc': 'If temperature > X, turn on ventilation. Hysteresis, windows and safety locks.',
    'features.f3.title': 'Smart alerts',
    'features.f3.desc': 'You are only notified when it matters — with context to act fast.',
    'features.f4.title': 'Community',
    'features.f4.desc': 'Learn, teach and share grow journals, tips and outcomes.',
    'features.f5.title': 'Store and kits',
    'features.f5.desc': 'Sensors, actuators and supplies recommended for each growing journey.',
    'features.f6.title': 'Rewards',
    'features.f6.desc': 'Engagement incentives: guides, useful answers and best practices.',
    'how.c1.title': 'Telemetry & IoT',
    'how.c1.desc': 'Sensing (temperature, humidity, light, soil) with secure delivery, local buffer and OTA updates. Actuators: pump, lighting, ventilation and more.',
    'how.c2.title': 'Rules & Insights',
    'how.c2.desc': 'Automation with hysteresis, windows and thresholds. Analytics and comparisons by period, crop and location. Data export.',
    'how.c3.title': 'Security & Privacy',
    'how.c3.desc': 'Encryption in transit, RBAC, auditing and device protection (unique keys and revocation).',
    'journeys.title': 'Journeys that start simple and scale with you',
    'journeys.subtitle': 'Ready-made crop templates, monthly challenges and a community for real questions.',
    'journeys.j1.title': 'First garden',
    'journeys.j1.i1': 'Guided setup for the starter kit',
    'journeys.j1.i2': 'Recommended rule template for basil',
    'journeys.j1.i3': 'Under/over watering alerts with fine tuning',
    'journeys.j1.i4': 'Share results and earn rewards',
    'journeys.j2.title': 'Advanced optimization',
    'journeys.j2.i1': 'New sensors (e.g. light) and lighting/ventilation rules',
    'journeys.j2.i2': 'Weekly comparisons (temperature p95, humidity variation)',
    'journeys.j2.i3': 'CSV export and reports',
    'journeys.j2.i4': 'Public guide: how to stabilize your greenhouse',
    'pricing.title': 'Plans that evolve with your crop',
    'pricing.subtitle': 'Start free and unlock advanced features when it makes sense.',
    'pricing.free.p1': 'Basic dashboard',
    'pricing.free.p2': 'Community',
    'pricing.free.p3': 'Essential rules',
    'pricing.free.p4': '7-day history',
    'pricing.popular': 'Most popular',
    'pricing.plus.p1': 'Advanced automation',
    'pricing.plus.p2': 'Extended history',
    'pricing.plus.p3': 'CSV export',
    'pricing.plus.p4': 'Crop templates',
    'pricing.prem.p1': 'Insights and anomaly detection',
    'pricing.prem.p2': 'Integrations (e.g. Home Assistant)',
    'pricing.prem.p3': 'Priority support',
    'pricing.prem.p4': 'Advanced reports',
    'pricing.cta.try': 'Try now',
    'pricing.cta.subscribe': 'Subscribe to Plus',
    'pricing.cta.sales': 'Talk to sales',
    'contact.title': 'Talk to us',
    'contact.subtitle': 'Questions, partnerships or rollouts for schools/condos.',
    'contact.nameLabel': 'Name',
    'contact.emailLabel': 'Email',
    'contact.msgLabel': 'Message',
    'contact.send': 'Send',
    'contact.email': 'Open email',
    'contact.note': 'Tip: replace the mailto: with a Formspree/Formspark endpoint to capture messages without backend.',
  },
  es: {
    'features.f1.title': 'Panel en tiempo real',
    'features.f1.desc': 'KPIs, gráficos e histórico: desde vista ejecutiva hasta detalle operativo.',
    'features.f2.title': 'Automatización por reglas',
    'features.f2.desc': 'Si temperatura > X, enciende ventilación. Histéresis, ventanas y bloqueos de seguridad.',
    'features.f3.title': 'Alertas inteligentes',
    'features.f3.desc': 'Solo te notificamos cuando importa, con contexto para actuar rápido.',
    'features.f4.title': 'Comunidad',
    'features.f4.desc': 'Aprende, enseña y comparte cuadernos de cultivo, consejos y resultados.',
    'features.f5.title': 'Tienda y kits',
    'features.f5.desc': 'Sensores, actuadores e insumos recomendados para cada jornada de cultivo.',
    'features.f6.title': 'Recompensas',
    'features.f6.desc': 'Incentivos al compromiso: guías, respuestas útiles y buenas prácticas.',
    'how.c1.title': 'Telemetría e IoT',
    'how.c1.desc': 'Sensado (temperatura, humedad, luz, suelo) con envío seguro, buffer local y actualización OTA. Actuadores: bomba, iluminación, ventilación y más.',
    'how.c2.title': 'Reglas e insights',
    'how.c2.desc': 'Automatización con histéresis, ventanas y límites. Análisis y comparativas por período, cultivo y lugar. Exportación de datos.',
    'how.c3.title': 'Seguridad y privacidad',
    'how.c3.desc': 'Cifrado en tránsito, RBAC, auditoría y protección de dispositivos (claves únicas y revocación).',
    'journeys.title': 'Jornadas que empiezan simples y escalan contigo',
    'journeys.subtitle': 'Plantillas listas por cultivo, retos mensuales y comunidad para dudas reales.',
    'journeys.j1.title': 'Primer huerto',
    'journeys.j1.i1': 'Instalación guiada del kit básico',
    'journeys.j1.i2': 'Plantilla de reglas recomendada para albahaca',
    'journeys.j1.i3': 'Alertas de riego insuficiente/excesivo con ajuste fino',
    'journeys.j1.i4': 'Comparte resultados y gana recompensas',
    'journeys.j2.title': 'Optimización avanzada',
    'journeys.j2.i1': 'Nuevos sensores (ej.: luz) y reglas de iluminación/ventilación',
    'journeys.j2.i2': 'Comparativas semanales (p95 de temperatura, variación de humedad)',
    'journeys.j2.i3': 'Exportación CSV e informes',
    'journeys.j2.i4': 'Guía pública: cómo estabilizar tu invernadero',
    'pricing.title': 'Planes que evolucionan con tu cultivo',
    'pricing.subtitle': 'Comienza gratis y activa funciones avanzadas cuando tenga sentido.',
    'pricing.free.p1': 'Panel básico',
    'pricing.free.p2': 'Comunidad',
    'pricing.free.p3': 'Reglas esenciales',
    'pricing.free.p4': 'Histórico de 7 días',
    'pricing.popular': 'Más popular',
    'pricing.plus.p1': 'Automatización avanzada',
    'pricing.plus.p2': 'Histórico extendido',
    'pricing.plus.p3': 'Exportación CSV',
    'pricing.plus.p4': 'Plantillas por cultivo',
    'pricing.prem.p1': 'Insights y detección de anomalías',
    'pricing.prem.p2': 'Integraciones (ej.: Home Assistant)',
    'pricing.prem.p3': 'Soporte prioritario',
    'pricing.prem.p4': 'Informes avanzados',
    'pricing.cta.try': 'Probar',
    'pricing.cta.subscribe': 'Suscribirse a Plus',
    'pricing.cta.sales': 'Hablar con ventas',
    'contact.title': 'Habla con nosotros',
    'contact.subtitle': 'Dudas, alianzas o implementación en escuelas/condominios.',
    'contact.nameLabel': 'Nombre',
    'contact.emailLabel': 'Correo electrónico',
    'contact.msgLabel': 'Mensaje',
    'contact.send': 'Enviar',
    'contact.email': 'Abrir correo',
    'contact.note': 'Consejo: sustituye el mailto: por un endpoint de Formspree/Formspark para capturar mensajes sin backend.',
  },
  fr: {
    'features.f1.title': 'Tableau de bord en temps réel',
    'features.f1.desc': 'KPIs, graphiques et historique — de la vue exécutive au détail opérationnel.',
    'features.f2.title': 'Automatisation par règles',
    'features.f2.desc': 'Si température > X, activez la ventilation. Hystérésis, fenêtres et verrous de sécurité.',
    'features.f3.title': 'Alertes intelligentes',
    'features.f3.desc': 'Vous êtes notifié uniquement quand c’est utile, avec le contexte pour agir vite.',
    'features.f4.title': 'Communauté',
    'features.f4.desc': 'Apprenez, enseignez et partagez journaux de culture, conseils et résultats.',
    'features.f5.title': 'Boutique et kits',
    'features.f5.desc': 'Capteurs, actionneurs et consommables recommandés pour chaque parcours de culture.',
    'features.f6.title': 'Récompenses',
    'features.f6.desc': 'Incitations à l’engagement : guides, réponses utiles et bonnes pratiques.',
    'how.c1.title': 'Télémétrie & IoT',
    'how.c1.desc': 'Mesures (température, humidité, lumière, sol) avec envoi sécurisé, buffer local et mise à jour OTA. Actionneurs : pompe, éclairage, ventilation et plus.',
    'how.c2.title': 'Règles & Insights',
    'how.c2.desc': 'Automatisation avec hystérésis, fenêtres et limites. Analyses et comparaisons par période, culture et lieu. Export des données.',
    'how.c3.title': 'Sécurité & Confidentialité',
    'how.c3.desc': 'Chiffrement en transit, RBAC, audit et protection des appareils (clés uniques et révocation).',
    'journeys.title': 'Des parcours simples au départ, évolutifs avec vous',
    'journeys.subtitle': 'Modèles prêts par culture, défis mensuels et communauté pour des questions réelles.',
    'journeys.j1.title': 'Premier potager',
    'journeys.j1.i1': 'Installation guidée du kit de base',
    'journeys.j1.i2': 'Modèle de règles recommandé pour le basilic',
    'journeys.j1.i3': 'Alertes sous/sur-arrosage avec réglage fin',
    'journeys.j1.i4': 'Partagez vos résultats et gagnez des récompenses',
    'journeys.j2.title': 'Optimisation avancée',
    'journeys.j2.i1': 'Nouveaux capteurs (ex. : lumière) et règles d’éclairage/ventilation',
    'journeys.j2.i2': 'Comparaisons hebdomadaires (température p95, variation d’humidité)',
    'journeys.j2.i3': 'Export CSV et rapports',
    'journeys.j2.i4': 'Guide public : comment stabiliser votre serre',
    'pricing.title': 'Des offres qui évoluent avec votre culture',
    'pricing.subtitle': 'Commencez gratuitement et activez les fonctions avancées quand nécessaire.',
    'pricing.free.p1': 'Tableau de bord basique',
    'pricing.free.p2': 'Communauté',
    'pricing.free.p3': 'Règles essentielles',
    'pricing.free.p4': 'Historique 7 jours',
    'pricing.popular': 'Le plus populaire',
    'pricing.plus.p1': 'Automatisation avancée',
    'pricing.plus.p2': 'Historique étendu',
    'pricing.plus.p3': 'Export CSV',
    'pricing.plus.p4': 'Modèles par culture',
    'pricing.prem.p1': 'Insights et détection d’anomalies',
    'pricing.prem.p2': 'Intégrations (ex. : Home Assistant)',
    'pricing.prem.p3': 'Support prioritaire',
    'pricing.prem.p4': 'Rapports avancés',
    'pricing.cta.try': 'Essayer',
    'pricing.cta.subscribe': 'S’abonner à Plus',
    'pricing.cta.sales': 'Contacter les ventes',
    'contact.title': 'Contactez-nous',
    'contact.subtitle': 'Questions, partenariats ou déploiement en écoles/copropriétés.',
    'contact.nameLabel': 'Nom',
    'contact.emailLabel': 'E-mail',
    'contact.msgLabel': 'Message',
    'contact.send': 'Envoyer',
    'contact.email': 'Ouvrir e-mail',
    'contact.note': 'Astuce : remplacez le mailto: par un endpoint Formspree/Formspark pour capter les messages sans backend.',
  },
};

function normalizeLanguageCode(input){
  const normalized=String(input||'').toLowerCase().trim();
  if(!normalized) return null;
  if(dict[normalized]) return normalized;
  const [prefix]=normalized.split('-');
  return browserLanguageMap[prefix]||null;
}

function buildFallbackTranslations(){
  const fallback={};
  document.querySelectorAll('[data-i18n]').forEach((el)=>{
    const key=el.getAttribute('data-i18n');
    if(!key || fallback[key]) return;
    fallback[key]=(el.textContent||'').trim();
  });
  return fallback;
}

const fallbackTranslations=buildFallbackTranslations();
const mergedTranslations=SUPPORTED_LANGUAGES.reduce((acc,lang)=>{
  acc[lang]={ ...fallbackTranslations, ...dict[lang], ...(dictOverrides[lang]||{}) };
  return acc;
},{});

function updateLanguageSwitchUI(lang){
  const buttons=Array.from(document.querySelectorAll('.lang-switch button'));
  buttons.forEach((btn)=>{
    const active=btn.dataset.lang===lang;
    btn.classList.toggle('active',active);
    btn.setAttribute('aria-pressed',String(active));
  });

  const switchRoot=document.querySelector('.lang-switch');
  if(!switchRoot) return;

  const activeButton=buttons.find((button)=>button.dataset.lang===lang);
  if(!activeButton) return;

  const rootRect=switchRoot.getBoundingClientRect();
  const buttonRect=activeButton.getBoundingClientRect();
  switchRoot.style.setProperty('--indicator-left',`${Math.round(buttonRect.left-rootRect.left)}px`);
  switchRoot.style.setProperty('--indicator-width',`${Math.round(buttonRect.width)}px`);
}

function setLang(language){
  const lang=normalizeLanguageCode(language)||DEFAULT_LANG;
  const selected=mergedTranslations[lang]||mergedTranslations[DEFAULT_LANG];
  document.documentElement.lang=lang==='pt' ? 'pt-BR' : lang;

  document.querySelectorAll('[data-i18n]').forEach((el)=>{
    const key=el.getAttribute('data-i18n');
    const text=selected[key];
    if(typeof text==='string'){
      el.textContent=text;
    }
  });

  updateLanguageSwitchUI(lang);
  localStorage.setItem('lang',lang);
  localStorage.setItem('hortelan_lang',lang);
  requestAnimationFrame(()=>initTypingEffects({ restart:true }));
}

function detectLanguage(){
  const fromStorage=normalizeLanguageCode(localStorage.getItem('lang'))
    || normalizeLanguageCode(localStorage.getItem('hortelan_lang'));

  if(fromStorage){
    setLang(fromStorage);
    return;
  }

  const fromBrowser=normalizeLanguageCode(navigator.language);
  setLang(fromBrowser||DEFAULT_LANG);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initTypingEffects({ restart=false }={}){
  const typingElements=Array.from(document.querySelectorAll('[data-typing]'));
  if(!typingElements.length) return;

  typingElements.forEach((element,index)=>{
    const latestText=element.textContent.replace(/\s+/g,' ').trim();
    if(latestText) element.dataset.typingSource=latestText;

    const source=element.dataset.typingSource||'';
    const existing=typingRegistry.get(element);
    if(existing){
      existing.kill();
      typingRegistry.delete(element);
    }

    if(!source){
      return;
    }

    if(prefersReducedMotion){
      element.textContent=source;
      return;
    }

    element.innerHTML='<span class="typing-text"></span><span class="typing-caret" aria-hidden="true"></span>';
    element.classList.remove('typing-active');

    const textNode=element.querySelector('.typing-text');
    const speed=Math.max(Number(element.dataset.typingSpeed||0.026),0.008);

    const run=()=>{
      const state={count:0};
      element.classList.add('typing-active');
      const tween=gsap.to(state,{
        count:source.length,
        duration:Math.max(source.length*speed,0.75),
        ease:'none',
        onUpdate:()=>{
          textNode.textContent=source.slice(0,Math.round(state.count));
        },
        onComplete:()=>{
          textNode.textContent=source;
          element.classList.remove('typing-active');
        }
      });
      gsap.to(element.querySelector('.typing-caret'),{ opacity:0.2, duration:0.45, repeat:-1, yoyo:true, ease:'power1.inOut' });
      typingRegistry.set(element,tween);
    };

    const startMode=element.dataset.typingStart||'view';
    if(startMode==='load'){
      gsap.delayedCall(0.25 + index*0.08,run);
      return;
    }

    ScrollTrigger.create({
      trigger:element,
      start:'top 82%',
      once:true,
      onEnter:run
    });
  });
}


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
  if(!splash){
    return;
  }

  document.body.classList.add('splash-active');

  if(prefersReducedMotion){
    gsap.fromTo('.splash-content',{ opacity:0, y:12 },{ opacity:1, y:0, duration:0.45, ease:'power2.out' });
    gsap.delayedCall(1.8,()=>{
      document.body.classList.remove('splash-active');
      splash.remove();
    });
    return;
  }

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

  closeMenu();
}

function bindLanguageSwitch(){
  const buttons=Array.from(document.querySelectorAll('.lang-switch button'));
  buttons.forEach((button)=>{
    button.addEventListener('click',()=>setLang(button.dataset.lang));
    button.addEventListener('keydown',(event)=>{
      if(event.key==='Enter' || event.key===' '){
        event.preventDefault();
        setLang(button.dataset.lang);
      }
    });
  });
}

bindLanguageSwitch();
detectLanguage();
initTypingEffects();

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
setupSensorHud();

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

function setupImmersiveMotionSystem(){
  if(prefersReducedMotion) return;

  setupWeatherCommandCenter();

  const sky=document.createElement('div');
  sky.className='iot-sky';
  sky.setAttribute('aria-hidden','true');
  document.body.appendChild(sky);

  const skyNodes=[...Array(8)].map(()=>{
    const node=document.createElement('span');
    node.className='sat-node';
    node.style.left=`${6 + Math.random()*88}%`;
    node.style.top=`${8 + Math.random()*84}%`;
    sky.appendChild(node);
    return node;
  });

  motionAnimate(skyNodes,{ opacity:[0.24,0.95], scale:[0.65,1.5] },{
    duration:2.8,
    easing:'ease-in-out',
    direction:'alternate',
    repeat:Infinity,
    delay:(i)=>i*0.18
  });

  gsap.to(sky,{
    opacity:0.18,
    ease:'none',
    scrollTrigger:{ trigger:'main', start:'top top', end:'bottom bottom', scrub:0.8 }
  });

  const rainLayer=document.createElement('div');
  rainLayer.className='rain-layer';
  rainLayer.setAttribute('aria-hidden','true');
  document.body.appendChild(rainLayer);

  const spawnGlobalRain=(amount=4)=>{
    for(let i=0;i<amount;i+=1){
      const drop=document.createElement('span');
      drop.className='rain-drop';
      drop.style.left=`${Math.random()*100}vw`;
      drop.style.top=`${-20 - Math.random()*120}px`;
      drop.style.setProperty('--fall',`${window.innerHeight*(0.35 + Math.random()*0.65)}px`);
      rainLayer.appendChild(drop);
      drop.addEventListener('animationend',()=>drop.remove(),{ once:true });
    }
  };

  gsap.delayedCall(0.45,()=>spawnGlobalRain(12));
  gsap.ticker.add(()=>{
    if(document.visibilityState!=='visible') return;
    if(Math.random()<0.22) spawnGlobalRain(2);
  });

  const spotlight=document.createElement('span');
  spotlight.className='cursor-spark';
  spotlight.setAttribute('aria-hidden','true');
  document.body.appendChild(spotlight);
  gsap.set(spotlight,{ x:window.innerWidth*0.5, y:window.innerHeight*0.35, opacity:0 });

  const pointer={ x:window.innerWidth*0.5, y:window.innerHeight*0.35 };
  window.addEventListener('pointermove',(event)=>{
    pointer.x=event.clientX;
    pointer.y=event.clientY;
    gsap.to(spotlight,{ x:pointer.x, y:pointer.y, opacity:0.95, duration:0.2, ease:'power2.out' });
  },{ passive:true });

  const dynamicTargets=document.querySelectorAll('.hero .badge, .hero h1, .hero .lead, .promo-banner, .logo-footer, .brand-logo, .card, .btn');
  dynamicTargets.forEach((element)=>{
    hover(element,()=>{
      gsap.to(element,{ rotateX:-3, rotateY:4, z:18, duration:0.25, ease:'power2.out', transformPerspective:850, transformOrigin:'center center' });
      return ()=>gsap.to(element,{ rotateX:0, rotateY:0, z:0, duration:0.35, ease:'power3.out' });
    });
  });

  const realisticImages=document.querySelectorAll('img, .mock, .cultivo-scene');
  realisticImages.forEach((media,index)=>{
    gsap.fromTo(media,
      { filter:'saturate(0.82) contrast(0.92)', y:18, opacity:0.24 },
      {
        filter:'saturate(1.05) contrast(1)',
        y:0,
        opacity:1,
        duration:0.9,
        ease:'power2.out',
        delay:index*0.05,
        scrollTrigger:{ trigger:media, start:'top 88%', once:true }
      }
    );

    gsap.to(media,{ yPercent:index%2===0 ? -4 : 4, ease:'none',
      scrollTrigger:{ trigger:media, start:'top bottom', end:'bottom top', scrub:0.7 }
    });
  });

  const sectionsForAmbient=gsap.utils.toArray('main section');
  sectionsForAmbient.forEach((section,index)=>{
    gsap.fromTo(section,
      { backgroundPosition:'50% 0%' },
      {
        backgroundPosition:'50% 100%',
        ease:'none',
        scrollTrigger:{ trigger:section, start:'top bottom', end:'bottom top', scrub:1 }
      }
    );

    ScrollTrigger.create({
      trigger:section,
      start:'top 45%',
      end:'bottom 55%',
      onToggle:({ isActive })=>{
        if(!isActive) return;
        const strength=(index%3)*0.25 + 0.35;
        document.body.style.setProperty('--satellite-signal',String(strength));
      }
    });
  });

  const faqBoard=document.getElementById('faq-list');
  if(faqBoard){
    press(faqBoard,(_,startEvent)=>{
      const pulse=document.createElement('span');
      pulse.className='water-pulse';
      pulse.style.left=`${startEvent.clientX}px`;
      pulse.style.top=`${startEvent.clientY}px`;
      document.body.appendChild(pulse);
      pulse.addEventListener('animationend',()=>pulse.remove(),{ once:true });
    });
  }

  const toast=document.createElement('div');
  toast.className='grow-toast';
  toast.innerHTML='<strong>Rega inteligente ativa</strong><span>As automações da sua horta se ajustam em tempo real ao clima.</span>';
  document.body.appendChild(toast);

  const showToast=()=>{
    toast.classList.add('is-visible');
    gsap.fromTo(toast,{ y:20, opacity:0 },{ y:0, opacity:1, duration:0.35, ease:'power2.out' });
    gsap.delayedCall(3.2,()=>gsap.to(toast,{ y:10, opacity:0, duration:0.4, onComplete:()=>toast.classList.remove('is-visible') }));
  };
  gsap.delayedCall(1.8,showToast);

  setupAmbientLightTracking();
  setupFireflies();
}

setupImmersiveMotionSystem();

function setupWeatherCommandCenter(){
  const layer=document.createElement('div');
  layer.className='weather-command';
  layer.setAttribute('aria-hidden','true');
  layer.innerHTML=`
    <span class="sun-core"></span>
    <span class="moon-core"></span>
    <div class="cloud-belt"></div>
  `;
  document.body.appendChild(layer);

  const cloudBelt=layer.querySelector('.cloud-belt');
  [...Array(10)].forEach((_,index)=>{
    const cloud=document.createElement('span');
    cloud.className='cloud-fragment';
    cloud.style.setProperty('--seed',String(index));
    cloud.style.top=`${6 + Math.random()*45}%`;
    cloud.style.left=`${-10 + Math.random()*120}%`;
    cloud.style.width=`${48 + Math.random()*90}px`;
    cloud.style.opacity=String(0.15 + Math.random()*0.3);
    cloudBelt.appendChild(cloud);
    gsap.to(cloud,{ x:()=>gsap.utils.random(-90,140), yoyo:true, repeat:-1, duration:8 + Math.random()*8, ease:'sine.inOut' });
  });

  const weatherState={ cycle:0, mist:0.2 };
  gsap.to(weatherState,{
    cycle:1,
    duration:26,
    repeat:-1,
    yoyo:true,
    ease:'sine.inOut',
    onUpdate:()=>{
      layer.style.setProperty('--weather-cycle',weatherState.cycle.toFixed(3));
      weatherState.mist=0.18 + (1-weatherState.cycle)*0.35;
      layer.style.setProperty('--weather-mist',weatherState.mist.toFixed(3));
    }
  });

  gsap.to(layer,{ 
    opacity:0.95,
    duration:1.2,
    ease:'power2.out'
  });

  gsap.to(layer,{
    yPercent:8,
    ease:'none',
    scrollTrigger:{ trigger:'main', start:'top top', end:'bottom bottom', scrub:1 }
  });
}

setupRealityMotionEnhancers();

function setupRealityMotionEnhancers(){
  setupHeroMicroTelemetry();
  setupParallaxImagePressure();
  setupCardGyroMotion();
  setupFaqRainEvents();
}

function setupHeroMicroTelemetry(){
  const mock=document.querySelector('.hero .mock');
  if(!mock || prefersReducedMotion) return;

  const telemetry=document.createElement('div');
  telemetry.className='hero-telemetry';
  telemetry.innerHTML=[
    '<span data-label="Umidade">74%</span>',
    '<span data-label="Temperatura">24.1°C</span>',
    '<span data-label="EC">1.9 mS/cm</span>'
  ].join('');
  mock.appendChild(telemetry);

  gsap.fromTo(telemetry.querySelectorAll('span'),
    { y:20, opacity:0 },
    { y:0, opacity:1, duration:0.6, stagger:0.1, ease:'power3.out', delay:0.4 }
  );

  telemetry.querySelectorAll('span').forEach((node,index)=>{
    gsap.to(node,{ 
      backgroundColor:index % 2 === 0 ? 'rgba(74, 222, 128, 0.2)' : 'rgba(125, 211, 252, 0.22)',
      repeat:-1,
      yoyo:true,
      duration:1.2 + index * 0.3,
      ease:'sine.inOut'
    });
  });
}

function setupParallaxImagePressure(){
  const mediaNodes=document.querySelectorAll('img, .promo-banner, .mock');
  if(!mediaNodes.length || prefersReducedMotion) return;

  mediaNodes.forEach((node,index)=>{
    const state={ hue:0 };
    gsap.to(state,{ 
      hue:1,
      duration:5 + index * 0.2,
      repeat:-1,
      yoyo:true,
      ease:'sine.inOut',
      onUpdate:()=>{
        const sat=1.02 + state.hue * 0.1;
        const brightness=0.96 + state.hue * 0.06;
        node.style.filter=`saturate(${sat.toFixed(2)}) brightness(${brightness.toFixed(2)})`;
      }
    });

    motionInView(node,(element)=>{
      gsap.fromTo(element,
        { scale:1.06, clipPath:'inset(2% 2% 2% 2% round 16px)' },
        { scale:1, clipPath:'inset(0% 0% 0% 0% round 16px)', duration:1.1, ease:'power2.out' }
      );
    },{ amount:0.45, once:true });
  });
}

function setupCardGyroMotion(){
  const cards=document.querySelectorAll('.card');
  if(!cards.length || prefersReducedMotion) return;

  cards.forEach((card)=>{
    const rotateXTo=gsap.quickTo(card,'rotateX',{ duration:0.35, ease:'power3.out' });
    const rotateYTo=gsap.quickTo(card,'rotateY',{ duration:0.35, ease:'power3.out' });
    const yTo=gsap.quickTo(card,'y',{ duration:0.3, ease:'power3.out' });

    card.addEventListener('pointermove',(event)=>{
      const rect=card.getBoundingClientRect();
      const x=((event.clientX - rect.left) / rect.width) - 0.5;
      const y=((event.clientY - rect.top) / rect.height) - 0.5;
      rotateYTo(x*10);
      rotateXTo(-y*8);
      yTo(-6);
    });

    card.addEventListener('pointerleave',()=>{
      rotateXTo(0);
      rotateYTo(0);
      yTo(0);
    });
  });
}

function setupFaqRainEvents(){
  const faqBoard=document.getElementById('faq-list');
  if(!faqBoard || prefersReducedMotion) return;

  const emitRainFromPointer=(event)=>{
    const rainLayer=document.querySelector('.rain-layer');
    if(!rainLayer) return;
    [...Array(6)].forEach((_,index)=>{
      const drop=document.createElement('span');
      drop.className='rain-drop';
      drop.style.left=`${event.clientX + gsap.utils.random(-80,80)}px`;
      drop.style.top=`${event.clientY - 30 - index*12}px`;
      drop.style.setProperty('--fall',`${80 + Math.random()*160}px`);
      rainLayer.appendChild(drop);
      drop.addEventListener('animationend',()=>drop.remove(),{ once:true });
    });
  };

  faqBoard.addEventListener('pointerenter',emitRainFromPointer);
  faqBoard.addEventListener('pointerdown',emitRainFromPointer);
}

function setupSensorHud(){
  const hud=document.getElementById('sensor-hud');
  if(!hud) return;

  const sensorItems=Array.from(hud.querySelectorAll('.sensor-item'));
  if(!sensorItems.length) return;

  const registerItem=(item,index)=>{
    const valueEl=item.querySelector('.sensor-value');
    const barEl=item.querySelector('.sensor-bar span');
    const min=Number(item.dataset.min || 0);
    const max=Number(item.dataset.max || 100);
    const unit=item.dataset.unit || '';
    const state={ value:min + ((max-min)*0.5) };

    const render=()=>{
      const ratio=(state.value-min)/(max-min || 1);
      const precision=max > 2000 ? 0 : 1;
      valueEl.textContent=`${state.value.toFixed(precision)}${unit}`;
      barEl.style.width=`${Math.max(6,Math.min(100,ratio*100))}%`;
    };

    render();

    if(prefersReducedMotion) return;

    gsap.timeline({ repeat:-1, repeatRefresh:true, delay:index*0.18 })
      .to(state,{ value:()=>gsap.utils.random(min,max), duration:2.4 + index*0.3, ease:'sine.inOut', onUpdate:render })
      .to(state,{ value:()=>gsap.utils.random(min,max), duration:2 + index*0.25, ease:'sine.inOut', onUpdate:render });
  };

  sensorItems.forEach(registerItem);

  motionInView(hud,(element)=>{
    gsap.fromTo(element,
      { y:20, opacity:0, rotateX:-7 },
      { y:0, opacity:1, rotateX:0, duration:0.8, ease:'power3.out' }
    );
  },{ amount:0.5, once:true });
}

function setupAmbientLightTracking(){
  const updateLight=(x,y)=>{
    document.body.style.setProperty('--light-x',`${(x/window.innerWidth)*100}%`);
    document.body.style.setProperty('--light-y',`${(y/window.innerHeight)*100}%`);
  };

  updateLight(window.innerWidth*0.5,window.innerHeight*0.3);
  window.addEventListener('pointermove',(event)=>{
    gsap.to({}, {
      duration:0.3,
      onUpdate:()=>updateLight(event.clientX,event.clientY)
    });
  },{ passive:true });

  const orbit={ progress:0 };
  gsap.to(orbit, {
    progress:1,
    duration:18,
    repeat:-1,
    yoyo:true,
    ease:'sine.inOut',
    onUpdate:()=>{
      const cycleX=window.innerWidth*(0.2 + orbit.progress*0.6);
      const cycleY=window.innerHeight*(0.18 + orbit.progress*0.22);
      updateLight(cycleX,cycleY);
    }
  });
}

function setupFireflies(){
  const layer=document.createElement('div');
  layer.className='firefly-layer';
  document.body.appendChild(layer);

  const flies=[...Array(16)].map((_,index)=>{
    const fly=document.createElement('span');
    fly.className='firefly';
    fly.style.left=`${Math.random()*100}%`;
    fly.style.top=`${22 + Math.random()*65}%`;
    layer.appendChild(fly);
    motionAnimate(fly,{ opacity:[0.15,0.95], scale:[0.4,1.35] },{
      duration:1.8 + Math.random()*1.8,
      easing:'ease-in-out',
      direction:'alternate',
      repeat:Infinity,
      delay:index*0.14
    });
    return fly;
  });

  flies.forEach((fly,index)=>{
    gsap.to(fly,{
      x:()=>gsap.utils.random(-120,120),
      y:()=>gsap.utils.random(-100,100),
      duration:4 + Math.random()*3,
      ease:'sine.inOut',
      repeat:-1,
      yoyo:true,
      delay:index*0.1
    });
  });
}

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
