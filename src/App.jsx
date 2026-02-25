import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SplashGate from "./splash/SplashGate.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashGate />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
