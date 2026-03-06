import React, { Suspense, lazy, useEffect, useMemo } from "react";
import { LANDING_PAGE_PATH } from "../../../app/routes.js";
import { detectAndPersistLanguage } from "../../localization/languageDetection.js";
import { trackMetric } from "../../../shared/observability/rumMetrics.js";
import HortelanSeo from "../../../shared/seo/HortelanSeo.jsx";

const DaySplashScreen = lazy(() => import("./DaySplashScreen.jsx"));
const NightSplashScreen = lazy(() => import("./NightSplashScreen.jsx"));

function getTimeMode(date = new Date()) {
  const h = date.getHours();
  return h >= 6 && h < 18 ? "day" : "night";
}

function redirectToLandingPage() {
  window.location.assign(LANDING_PAGE_PATH);
}

function SplashFallback() {
  return <div className="splashRoot day" aria-label="Carregando experiência" />;
}

export default function SplashExperienceGate() {
  const mode = useMemo(() => getTimeMode(new Date()), []);
  const startedAt = useMemo(() => performance.now(), []);

  useEffect(() => {
    trackMetric("splash_boot", { mode });

    detectAndPersistLanguage({
      onMetric: (name, details) => trackMetric(name, details),
    });
  }, [mode]);

  const handleDone = () => {
    trackMetric("splash_finished", {
      mode,
      durationMs: Math.round(performance.now() - startedAt),
    });
    redirectToLandingPage();
  };

  return (
    <>
      <HortelanSeo />
      <Suspense fallback={<SplashFallback />}>
        {mode === "day" ? <DaySplashScreen onDone={handleDone} /> : <NightSplashScreen onDone={handleDone} />}
      </Suspense>
    </>
  );
}
