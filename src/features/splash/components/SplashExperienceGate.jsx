import React, { useEffect, useMemo } from "react";
import { LANDING_PAGE_PATH } from "../../../app/routes.js";
import DaySplashScreen from "./DaySplashScreen.jsx";
import NightSplashScreen from "./NightSplashScreen.jsx";

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

function getTimeMode(date = new Date()) {
  const h = date.getHours();
  return h >= 6 && h < 18 ? "day" : "night";
}

function redirectToLandingPage() {
  window.location.assign(LANDING_PAGE_PATH);
}

function normalizeBrowserLanguage(value) {
  const normalized = String(value || "").toLowerCase();
  const [prefix] = normalized.split("-");
  return LANGUAGE_BY_PREFIX[prefix] || "en";
}

async function detectLanguageByGeo() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2200);

  try {
    const response = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    if (!response.ok) {
      return null;
    }

    const geo = await response.json();
    const countryCode = String(geo?.country_code || "").toUpperCase();
    const language = GEO_LANGUAGE_BY_COUNTRY[countryCode] || normalizeBrowserLanguage(navigator.language);
    return { language, countryCode };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function detectAndPersistLanguage() {
  const geoResult = await detectLanguageByGeo();

  if (geoResult?.language) {
    localStorage.setItem("hortelan_lang", geoResult.language);
    localStorage.setItem("hortelan_geo_country", geoResult.countryCode);
    return;
  }

  localStorage.setItem("hortelan_lang", normalizeBrowserLanguage(navigator.language));
}

export default function SplashExperienceGate() {
  const mode = useMemo(() => getTimeMode(new Date()), []);

  useEffect(() => {
    detectAndPersistLanguage();
  }, []);

  return mode === "day" ? (
    <DaySplashScreen onDone={redirectToLandingPage} />
  ) : (
    <NightSplashScreen onDone={redirectToLandingPage} />
  );
}
