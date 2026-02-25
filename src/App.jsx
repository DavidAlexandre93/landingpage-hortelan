import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashGate from "./splash/SplashGate.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashGate />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
