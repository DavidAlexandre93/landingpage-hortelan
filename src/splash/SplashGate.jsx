import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DaySplash from "./DaySplash.jsx";
import NightSplash from "./NightSplash.jsx";

function getTimeMode(date = new Date()) {
  const h = date.getHours();
  return h >= 6 && h < 18 ? "day" : "night";
}

export default function SplashGate() {
  const navigate = useNavigate();
  const mode = useMemo(() => getTimeMode(new Date()), []);

  return mode === "day" ? (
    <DaySplash onDone={() => navigate("/home")} />
  ) : (
    <NightSplash onDone={() => navigate("/home")} />
  );
}
