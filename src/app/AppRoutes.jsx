import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SplashExperienceGate from "../features/splash/components/SplashExperienceGate.jsx";
import { LANDING_PAGE_PATH } from "./routes.js";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashExperienceGate />} />
      <Route path="/home" element={<Navigate to={LANDING_PAGE_PATH} replace />} />
    </Routes>
  );
}
