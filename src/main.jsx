import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import AppRoutes from "./app/AppRoutes.jsx";
import "./features/splash/styles/splash-screen.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppRoutes />
    <Analytics />
  </>,
);
