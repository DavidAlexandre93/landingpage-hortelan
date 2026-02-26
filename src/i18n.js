const TEXTS = {
  pt: {
    welcome: "Bem-vindo!",
    dayLoad: "Carregando a experiência do dia 🌤️",
    dayRain: "Regando a plantação…",
    dayGrow: "A chuva parou — crescimento em andamento…",
    opening: "Abrindo a homepage…",
    nightLoad: "Carregando a experiência da noite 🌙",
    nightCare: "Cuidando da plantação sob a lua…",
    moonSet: "A lua está se pondo — abrindo a homepage…",
  },
  en: {
    welcome: "Welcome!",
    dayLoad: "Loading the daytime experience 🌤️",
    dayRain: "Watering the crop…",
    dayGrow: "Rain has stopped — growth in progress…",
    opening: "Opening the homepage…",
    nightLoad: "Loading the nighttime experience 🌙",
    nightCare: "Taking care of the crop under the moon…",
    moonSet: "The moon is setting — opening the homepage…",
  },
  fr: {
    welcome: "Bienvenue !",
    dayLoad: "Chargement de l'expérience de jour 🌤️",
    dayRain: "Arrosage de la plantation…",
    dayGrow: "La pluie s'est arrêtée — croissance en cours…",
    opening: "Ouverture de la page d'accueil…",
    nightLoad: "Chargement de l'expérience de nuit 🌙",
    nightCare: "Entretien de la plantation sous la lune…",
    moonSet: "La lune se couche — ouverture de la page d'accueil…",
  },
  es: {
    welcome: "¡Bienvenido!",
    dayLoad: "Cargando la experiencia del día 🌤️",
    dayRain: "Regando el cultivo…",
    dayGrow: "La lluvia paró — crecimiento en curso…",
    opening: "Abriendo la página principal…",
    nightLoad: "Cargando la experiencia de la noche 🌙",
    nightCare: "Cuidando el cultivo bajo la luna…",
    moonSet: "La luna se está poniendo — abriendo la página principal…",
  },
  ja: {
    welcome: "ようこそ！",
    dayLoad: "昼の体験を読み込み中 🌤️",
    dayRain: "作物に水やり中…",
    dayGrow: "雨が止みました — 成長中…",
    opening: "ホームページを開いています…",
    nightLoad: "夜の体験を読み込み中 🌙",
    nightCare: "月明かりの下で作物をケアしています…",
    moonSet: "月が沈みます — ホームページを開いています…",
  },
};

export function resolveLanguage() {
  const saved = localStorage.getItem("hortelan_lang");
  if (saved && TEXTS[saved]) {
    return saved;
  }

  const normalized = (navigator.language || "").toLowerCase();
  if (normalized.startsWith("ja")) return "ja";
  if (normalized.startsWith("fr")) return "fr";
  if (normalized.startsWith("es")) return "es";
  if (normalized.startsWith("en")) return "en";
  return "pt";
}

export function getMessages() {
  return TEXTS[resolveLanguage()] || TEXTS.pt;
}
