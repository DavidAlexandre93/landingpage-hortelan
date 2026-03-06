const GEO_LANGUAGE_BY_COUNTRY = {
  BR: "pt",
  FR: "fr",
  US: "en",
  JP: "ja",
};

const LANGUAGE_BY_PREFIX = {
  pt: "pt",
  fr: "fr",
  en: "en",
  es: "es",
  ja: "ja",
};

const GEO_CACHE_KEY = "hortelan_geo_cache_v1";
const GEO_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const GEO_TIMEOUT_MS = 1200;
const GEO_MAX_ATTEMPTS = 2;
const CIRCUIT_OPEN_AFTER_FAILURES = 3;
const CIRCUIT_COOLDOWN_MS = 60 * 1000;

const circuitState = {
  failures: 0,
  openedAt: null,
};

let inFlightGeoDetection = null;

function randomJitter(maxMs = 90) {
  return Math.floor(Math.random() * maxMs);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isCircuitOpen(now = Date.now()) {
  return Number.isFinite(circuitState.openedAt) && now - circuitState.openedAt < CIRCUIT_COOLDOWN_MS;
}

function registerFailure(now = Date.now()) {
  circuitState.failures += 1;
  if (circuitState.failures >= CIRCUIT_OPEN_AFTER_FAILURES) {
    circuitState.openedAt = now;
  }
}

function registerSuccess() {
  circuitState.failures = 0;
  circuitState.openedAt = null;
}

function buildAbortController(timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, clear: () => clearTimeout(timer) };
}

function parseGeoPayload(payload = {}, navigatorLanguage = "") {
  const countryCode = String(payload?.country_code || "").toUpperCase();
  const language = GEO_LANGUAGE_BY_COUNTRY[countryCode] || normalizeBrowserLanguage(navigatorLanguage);
  return { language, countryCode };
}

function getGeoCache(sessionStorageRef = sessionStorage, now = Date.now()) {
  const raw = sessionStorageRef?.getItem?.(GEO_CACHE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (now - parsed.timestamp > GEO_CACHE_TTL_MS) {
      sessionStorageRef?.removeItem?.(GEO_CACHE_KEY);
      return null;
    }

    if (!parsed.language) return null;
    return { language: parsed.language, countryCode: parsed.countryCode || "" };
  } catch {
    sessionStorageRef?.removeItem?.(GEO_CACHE_KEY);
    return null;
  }
}

function setGeoCache(result, sessionStorageRef = sessionStorage, now = Date.now()) {
  if (!result?.language) return;

  sessionStorageRef?.setItem?.(
    GEO_CACHE_KEY,
    JSON.stringify({
      language: result.language,
      countryCode: result.countryCode || "",
      timestamp: now,
    })
  );
}

async function detectLanguageByGeo({
  fetchImpl = fetch,
  navigatorLanguage = navigator.language,
  sessionStorageRef = sessionStorage,
  now = Date.now,
  onMetric,
} = {}) {
  const currentNow = typeof now === "function" ? now() : Date.now();

  if (isCircuitOpen(currentNow)) {
    onMetric?.("geo_detection_skipped", { reason: "circuit_open" });
    return null;
  }

  const cached = getGeoCache(sessionStorageRef, currentNow);
  if (cached) {
    onMetric?.("geo_detection_cache_hit", { countryCode: cached.countryCode || "unknown" });
    return cached;
  }

  const startedAt = performance.now();

  for (let attempt = 1; attempt <= GEO_MAX_ATTEMPTS; attempt += 1) {
    const { controller, clear } = buildAbortController(GEO_TIMEOUT_MS);

    try {
      const response = await fetchImpl("https://ipapi.co/json/", {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Geo lookup failed with status ${response.status}`);
      }

      const payload = await response.json();
      const parsed = parseGeoPayload(payload, navigatorLanguage);
      setGeoCache(parsed, sessionStorageRef, currentNow);
      registerSuccess();

      onMetric?.("geo_detection_success", {
        attempt,
        countryCode: parsed.countryCode || "unknown",
        durationMs: Math.round(performance.now() - startedAt),
      });

      return parsed;
    } catch (error) {
      const isLast = attempt === GEO_MAX_ATTEMPTS;
      onMetric?.("geo_detection_error", {
        attempt,
        message: error instanceof Error ? error.message : "unknown",
      });

      if (isLast) {
        registerFailure(currentNow);
        return null;
      }

      await sleep(140 * attempt + randomJitter());
    } finally {
      clear();
    }
  }

  return null;
}

export function normalizeBrowserLanguage(value) {
  const normalized = String(value || "").toLowerCase();
  const [prefix] = normalized.split("-");
  return LANGUAGE_BY_PREFIX[prefix] || "en";
}

export async function detectAndPersistLanguage({
  fetchImpl,
  navigatorLanguage = navigator.language,
  localStorageRef = localStorage,
  sessionStorageRef = sessionStorage,
  now = Date.now,
  onMetric,
} = {}) {
  if (inFlightGeoDetection) {
    return inFlightGeoDetection;
  }

  inFlightGeoDetection = (async () => {
    const geoResult = await detectLanguageByGeo({
      fetchImpl,
      navigatorLanguage,
      sessionStorageRef,
      now,
      onMetric,
    });

    const resolvedLanguage = geoResult?.language || normalizeBrowserLanguage(navigatorLanguage);
    localStorageRef?.setItem?.("hortelan_lang", resolvedLanguage);

    if (geoResult?.countryCode) {
      localStorageRef?.setItem?.("hortelan_geo_country", geoResult.countryCode);
    }

    return { language: resolvedLanguage, countryCode: geoResult?.countryCode || "" };
  })();

  try {
    return await inFlightGeoDetection;
  } finally {
    inFlightGeoDetection = null;
  }
}

export function __resetLanguageDetectionStateForTests() {
  inFlightGeoDetection = null;
  circuitState.failures = 0;
  circuitState.openedAt = null;
}
