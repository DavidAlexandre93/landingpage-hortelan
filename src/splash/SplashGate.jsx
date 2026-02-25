import React, { useMemo } from "react";
import DaySplash from "./DaySplash.jsx";
import NightSplash from "./NightSplash.jsx";

function getTimeMode(date = new Date()) {
  const h = date.getHours();
  return h >= 6 && h < 18 ? "day" : "night";
}

function redirectToCorrectHome() {
  window.location.assign("/index.min.html");
}

export default function SplashGate() {
  const mode = useMemo(() => getTimeMode(new Date()), []);

  return mode === "day" ? (
    <DaySplash onDone={redirectToCorrectHome} />
  ) : (
    <NightSplash onDone={redirectToCorrectHome} />
  );
}
