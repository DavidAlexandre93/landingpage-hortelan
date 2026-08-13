import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import { normalizeLegacyRoute } from "./app/siteConfig.js";
import { applyTheme, resolveInitialTheme } from "./features/preferences/theme.js";
import "./styles/index.css";

normalizeLegacyRoute();
applyTheme(resolveInitialTheme());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
