import React from "react";
import SplashExperienceGate from "../features/splash/components/SplashExperienceGate.jsx";
import { HOME_REDIRECT_PATH, LANDING_PAGE_PATH, SPLASH_PAGE_PATH } from "./routes.js";

function redirect(path) {
  if (typeof window !== "undefined") {
    window.history.replaceState({}, "", path);
  }
}

export default function AppRoutes() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : SPLASH_PAGE_PATH;

  if (pathname === HOME_REDIRECT_PATH) {
    if (typeof window !== "undefined") {
      window.location.replace(LANDING_PAGE_PATH);
    }
    return null;
  }

  if (pathname !== SPLASH_PAGE_PATH) {
    redirect(SPLASH_PAGE_PATH);
  }

  return <SplashExperienceGate />;
}
