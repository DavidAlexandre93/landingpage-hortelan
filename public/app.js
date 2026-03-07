document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());

const navWrap = document.querySelector('.nav-wrap');
const menuToggle = document.querySelector('.menu-toggle');
const navCollapse = document.getElementById('nav-collapse');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const dict = {
  pt: {
    'nav.features': 'Recursos',
    'nav.how': 'Como funciona',
    'nav.journeys': 'Jornadas',
    'nav.pricing': 'Planos',
    'nav.faq': 'FAQ',
    'nav.docs': 'Documentação',
    'nav.demo': 'Abrir Demo',
    'nav.about': 'Sobre',
    'hero.badge': 'Acesso • Monitoramento • Gestão 360',
    'hero.title': 'Plataforma Hortelan completa: do acesso seguro ao monitoramento, operações e comunidade',
    'hero.subtitle': 'Tela splash, login com 2FA e recuperação de senha, dashboard com automações IoT, onboarding guiado, catálogo, blog, admin, alertas, relatórios, assinaturas, integrações, suporte, segurança, perfil e visão Hortelan 360 em um só fluxo.',
    'hero.ctaPrimary': 'Explorar Demo',
    'hero.ctaSecondary': 'Ver Recursos',
    'kpis.k1': 'Acesso seguro com 2FA',
    'kpis.k2': 'Onboarding guiado com checklist',
    'kpis.k3': 'Operação com alertas e relatórios',
    'kpis.k4': 'Módulos integrados (360)',
    'features.title': 'Recursos que cobrem toda a jornada da plataforma',
    'features.subtitle': 'Da autenticação ao checkout, da automação ao suporte: módulos prontos para operação diária, gestão e crescimento.',
    'about.title': 'Sobre a Hortelan Agtech Ltda.',
    'about.subtitle': 'Centralizamos experiência do usuário, confiabilidade operacional e governança de dados para todas as etapas da jornada digital do cultivo.',
    'about.p1': 'O produto atual reúne acesso/conta, monitoramento principal, onboarding orientado, catálogo, comunidade, gestão administrativa, alertas, relatórios, assinaturas, integrações, segurança, perfil, suporte e status operacional em tempo real.',
    'about.l1': 'Conta e acesso: splash, login com lembrar-me e confiar no dispositivo, cadastro seguro, esqueci senha e reset com token.',
    'about.l2': 'Dashboard e operação: widgets, indicadores por horta, automação por regras, agenda de tarefas, planejamento de plantio, eventos por planta e bloco blockchain.',
    'about.l3': 'Módulos de negócio: onboarding guiado/demo, loja com filtros/carrinho/checkout, comunidade com reputação/feed/perguntas e central admin para usuários e IoT.',
    'about.l4': 'Confiabilidade e experiência: alertas e notificações, relatórios CSV/PDF, assinaturas, integrações + ops, LGPD/sessões/2FA, perfil/preferências, help center, status em tempo real, topbar global com busca/tema/idioma/conta.',
    'cta.title': 'Pronto para validar a plataforma ponta a ponta?',
    'cta.subtitle': 'Abra o demo e percorra os fluxos de acesso, monitoramento, operações, comunidade e gestão completa.',
    'cta.demo': 'Abrir Demo',
    'cta.docs': 'Ver Apresentação',
    'footer.rights': 'Todos os direitos reservados.'
  },
  en: {
    'nav.features': 'Features',
    'nav.how': 'How it works',
    'nav.journeys': 'Journeys',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.docs': 'Documentation',
    'nav.demo': 'Open Demo',
    'nav.about': 'About',
    'hero.badge': 'IoT • Automation • Community',
    'hero.title': 'Grow better with data, automation and an active community',
    'hero.subtitle': 'Hortelan Agtech Ltda. brings sensors, rule-based automation and a realtime dashboard together with a community that teaches and rewards good practices.',
    'hero.ctaPrimary': 'Explore Demo',
    'hero.ctaSecondary': 'See Features',
    'kpis.k1': 'Time to act on alerts',
    'kpis.k2': 'Manual reports',
    'kpis.k3': 'Repeat tickets',
    'kpis.k4': 'SSO onboarding',
    'features.title': 'Features that close the care loop',
    'features.subtitle': 'From monitoring to learning, from automation to incentives — in a single product.',
    'about.title': 'About Hortelan Agtech Ltda.',
    'about.subtitle': 'Our mission is to make growing simple with accessible tech, realtime data and a community that learns together.',
    'about.p1': 'Hortelan Agtech Ltda. brings sensors, rule-based automation and a web dashboard to keep everything simple.',
    'about.l1': 'Quick, secure setup with compatible kits.',
    'about.l2': 'Automate watering, lighting and ventilation with hysteresis and time windows.',
    'about.l3': 'Smart alerts so you act at the right time.',
    'about.l4': 'Community to share results and learn from other growers.',
    'cta.title': 'Ready to grow smart?',
    'cta.subtitle': 'Open the demo, explore the features and tell the community about your first results.',
    'cta.demo': 'Open Demo',
    'cta.docs': 'View Slides',
    'footer.rights': 'All rights reserved.'
  },
  es: {
    'nav.features': 'Funciones',
    'nav.how': 'Cómo funciona',
    'nav.journeys': 'Jornadas',
    'nav.pricing': 'Planes',
    'nav.faq': 'FAQ',
    'nav.docs': 'Documentación',
    'nav.demo': 'Abrir demo',
    'nav.about': 'Sobre',
    'hero.badge': 'IoT • Automatización • Comunidad',
    'hero.title': 'Cultiva mejor con datos, automatización y una comunidad activa',
    'hero.subtitle': 'Hortelan Agtech Ltda. integra sensores, reglas de automatización y un panel en tiempo real con una comunidad que enseña y recompensa buenas prácticas.',
    'hero.ctaPrimary': 'Explorar demo',
    'hero.ctaSecondary': 'Ver funciones',
    'kpis.k1': 'Tiempo para actuar en alertas',
    'kpis.k2': 'Reportes manuales',
    'kpis.k3': 'Tickets repetitivos',
    'kpis.k4': 'Onboarding con SSO',
    'features.title': 'Funciones que cierran el ciclo de cuidado',
    'features.subtitle': 'Del monitoreo al aprendizaje, de la automatización a los incentivos, en un único producto.',
    'about.title': 'Sobre Hortelan Agtech Ltda.',
    'about.subtitle': 'Nuestra misión es simplificar el cultivo con tecnología accesible, datos en tiempo real y una comunidad que aprende unida.',
    'about.p1': 'Hortelan Agtech Ltda. integra sensores, automatización por reglas y un panel web para acompañar todo de forma simple.',
    'about.l1': 'Instalación rápida y segura con kits compatibles.',
    'about.l2': 'Automatiza riego, iluminación y ventilación con histéresis y ventanas de operación.',
    'about.l3': 'Alertas inteligentes para actuar en el momento correcto.',
    'about.l4': 'Comunidad para compartir resultados y aprender con otros cultivadores.',
    'cta.title': '¿Listo para cultivar con inteligencia?',
    'cta.subtitle': 'Abre el demo, explora funciones y cuéntale a la comunidad tus primeros resultados.',
    'cta.demo': 'Abrir demo',
    'cta.docs': 'Ver presentación',
    'footer.rights': 'Todos los derechos reservados.'
  },
  fr: {
    'nav.features': 'Fonctionnalités',
    'nav.how': 'Comment ça marche',
    'nav.journeys': 'Parcours',
    'nav.pricing': 'Tarifs',
    'nav.faq': 'FAQ',
    'nav.docs': 'Documentation',
    'nav.demo': 'Ouvrir la démo',
    'nav.about': 'À propos',
    'hero.badge': 'IoT • Automatisation • Communauté',
    'hero.title': 'Cultivez mieux avec les données, l’automatisation et une communauté active',
    'hero.subtitle': 'Hortelan Agtech Ltda. réunit capteurs, automatisation par règles et tableau de bord temps réel avec une communauté qui enseigne et récompense les bonnes pratiques.',
    'hero.ctaPrimary': 'Explorer la démo',
    'hero.ctaSecondary': 'Voir les fonctionnalités',
    'kpis.k1': 'Temps d’action sur alertes',
    'kpis.k2': 'Rapports manuels',
    'kpis.k3': 'Tickets répétitifs',
    'kpis.k4': 'Onboarding SSO',
    'features.title': 'Des fonctionnalités qui bouclent le cycle du soin',
    'features.subtitle': 'Du suivi à l’apprentissage, de l’automatisation aux incitations — dans un seul produit.',
    'about.title': 'À propos de Hortelan Agtech Ltda.',
    'about.subtitle': 'Notre mission: simplifier la culture avec une technologie accessible, des données temps réel et une communauté qui apprend ensemble.',
    'about.p1': 'Hortelan Agtech Ltda. intègre capteurs, automatisation par règles et un tableau de bord web pour tout suivre simplement.',
    'about.l1': 'Installation rapide et sécurisée avec kits compatibles.',
    'about.l2': 'Automatisez arrosage, éclairage et ventilation avec hystérésis et fenêtres d’opération.',
    'about.l3': 'Alertes intelligentes pour agir au bon moment.',
    'about.l4': 'Communauté pour partager des résultats et apprendre des autres cultivateurs.',
    'cta.title': 'Prêt à cultiver intelligemment ?',
    'cta.subtitle': 'Ouvrez la démo, explorez les fonctionnalités et partagez vos premiers résultats avec la communauté.',
    'cta.demo': 'Ouvrir la démo',
    'cta.docs': 'Voir la présentation',
    'footer.rights': 'Tous droits réservés.'
  }
};

function updateLangIndicator() {
  const switcher = document.querySelector('.lang-switch');
  const active = switcher?.querySelector('button.active');
  if (!switcher || !active) return;
  switcher.style.setProperty('--indicator-left', `${active.offsetLeft + 4}px`);
  switcher.style.setProperty('--indicator-width', `${active.offsetWidth}px`);
}

function setLang(lang) {
  const selected = dict[lang] || dict.pt;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (selected[key]) el.textContent = selected[key];
  });
  document.querySelectorAll('.lang-switch button').forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  localStorage.setItem('lang', lang);
  localStorage.setItem('hortelan_lang', lang);
  requestAnimationFrame(updateLangIndicator);
}

const GEO_TIMEOUT_MS = 1200;
const COUNTRY_LANGUAGE = {
  BR: 'pt',
  PT: 'pt',
  MZ: 'pt',
  AO: 'pt',
  CV: 'pt',
  GW: 'pt',
  ST: 'pt',
  TL: 'pt',
  GQ: 'pt',
  ES: 'es',
  AR: 'es',
  MX: 'es',
  CL: 'es',
  CO: 'es',
  PE: 'es',
  VE: 'es',
  UY: 'es',
  PY: 'es',
  BO: 'es',
  EC: 'es',
  PA: 'es',
  CR: 'es',
  GT: 'es',
  HN: 'es',
  NI: 'es',
  SV: 'es',
  CU: 'es',
  DO: 'es',
  PR: 'es',
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  CA: 'fr',
  LU: 'fr',
  MC: 'fr',
};

function normalizeLanguage(value) {
  const [prefix] = String(value || '').toLowerCase().split('-');
  return dict[prefix] ? prefix : null;
}

function withTimeout(promise, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return promise(controller.signal).finally(() => clearTimeout(timeoutId));
}

async function detectGeoLanguage() {
  try {
    const response = await withTimeout(
      (signal) => fetch('https://ipapi.co/json/', { signal }),
      GEO_TIMEOUT_MS
    );

    if (!response.ok) return null;
    const payload = await response.json();
    const countryCode = String(payload?.country_code || '').toUpperCase();
    localStorage.setItem('hortelan_geo_country', countryCode);
    return COUNTRY_LANGUAGE[countryCode] || null;
  } catch {
    return null;
  }
}

async function detectLanguage() {
  const saved = localStorage.getItem('lang') || localStorage.getItem('hortelan_lang');
  if (saved && dict[saved]) {
    setLang(saved);
    return;
  }

  const browserLanguage = normalizeLanguage(navigator.language);
  const geoLanguage = await detectGeoLanguage();
  setLang(geoLanguage || browserLanguage || 'pt');
}

function closeMenu() {
  navWrap?.classList.remove('menu-open');
  document.body.classList.remove('menu-open-active');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
  if (!navWrap) return;
  const open = navWrap.classList.toggle('menu-open');
  document.body.classList.toggle('menu-open-active', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
}

menuToggle?.addEventListener('click', toggleMenu);
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMenu();
  updateLangIndicator();
});

navCollapse?.addEventListener('click', (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.closest('a') && window.innerWidth < 768) {
    closeMenu();
  }
});

document.querySelectorAll('.lang-switch button').forEach((button) => {
  button.addEventListener('click', () => setLang(button.dataset.lang || 'pt'));
});

const LIST_KEY = 'hortelan_faq';
const form = document.getElementById('faq-form');
const listEl = document.getElementById('faq-list');
const btnExport = document.getElementById('faq-export');

function loadItems() {
  try {
    return JSON.parse(localStorage.getItem(LIST_KEY)) || [];
  } catch {
    return [];
  }
}

function saveItems(items) {
  localStorage.setItem(LIST_KEY, JSON.stringify(items));
}

function renderFaq() {
  if (!listEl) return;
  const items = loadItems();
  listEl.innerHTML = '';

  if (!items.length) {
    const empty = document.createElement('div');
    empty.className = 'faq-item';
    empty.innerHTML = '<em>Nenhuma mensagem ainda. Seja o primeiro a publicar!</em>';
    listEl.appendChild(empty);
    return;
  }

  items.slice().reverse().forEach((item) => {
    const createdAt = new Date(item.ts);
    const card = document.createElement('div');
    card.className = 'faq-item';
    card.innerHTML = `<div class="faq-meta"><strong>${item.nome || 'Anônimo'}</strong> • ${item.tipo.toUpperCase()} • ${createdAt.toLocaleString()}</div>
      <p style="margin:.5rem 0 0">${(item.msg || '').replace(/</g, '&lt;')}</p>
      <div class="row mt-2"><button class="btn ghost btn-del" data-id="${item.id}">Remover</button></div>`;
    if (!prefersReducedMotion) card.style.animation = 'fadeIn .2s ease';
    listEl.appendChild(card);
  });
}

listEl?.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const removeButton = target.closest('.btn-del');
  if (!removeButton) return;
  const id = removeButton.getAttribute('data-id');
  if (!id) return;
  saveItems(loadItems().filter((item) => item.id !== id));
  renderFaq();
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const item = {
    id: Math.random().toString(36).slice(2),
    nome: document.getElementById('f-nome')?.value.trim() || '',
    email: document.getElementById('f-email')?.value.trim() || '',
    tipo: document.getElementById('f-tipo')?.value || 'duvida',
    msg: document.getElementById('f-msg')?.value.trim() || '',
    ts: Date.now()
  };
  if (!item.msg) return;
  const items = loadItems();
  items.push(item);
  saveItems(items);
  form.reset();
  renderFaq();
});

btnExport?.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(loadItems(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'faq-hortelan.json';
  anchor.click();
  URL.revokeObjectURL(url);
});

if (location.search.includes('clearFaq')) {
  localStorage.removeItem(LIST_KEY);
}

detectLanguage();
renderFaq();
updateLangIndicator();
closeMenu();
