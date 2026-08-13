import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/**"],
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      include: [
        "src/app/App.jsx",
        "src/app/siteConfig.js",
        "src/features/feedback/CommunitySection.jsx",
        "src/features/feedback/ContactSection.jsx",
        "src/features/feedback/muralExport.js",
        "src/features/feedback/muralStore.js",
        "src/features/localization/language.js",
        "src/features/marketing/Header.jsx",
        "src/features/marketing/Hero.jsx",
        "src/features/marketing/MarketingSections.jsx",
        "src/features/preferences/theme.js",
        "src/features/preferences/useTheme.js",
        "src/shared/observability/rumMetrics.js",
        "src/shared/ui/ExternalLink.jsx",
        "src/shared/ui/SectionHeading.jsx",
      ],
      thresholds: {
        branches: 85,
        functions: 85,
        lines: 90,
        statements: 90,
      },
    },
  },
});
