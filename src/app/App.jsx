import { useEffect, useMemo, useState } from "react";
import { CommunitySection } from "../features/feedback/CommunitySection.jsx";
import { ContactSection } from "../features/feedback/ContactSection.jsx";
import { catalog, getCatalog } from "../features/localization/catalog.js";
import {
  getHtmlLanguage,
  persistLanguage,
  resolveInitialLanguage,
} from "../features/localization/language.js";
import { Header } from "../features/marketing/Header.jsx";
import { Hero } from "../features/marketing/Hero.jsx";
import {
  ClosingSection,
  FaqSection,
  Footer,
  JourneysSection,
  PlansSection,
  SolutionSection,
  StorySection,
  WorkflowSection,
} from "../features/marketing/MarketingSections.jsx";
import { useTheme } from "../features/preferences/useTheme.js";
import { trackMetric } from "../shared/observability/rumMetrics.js";

function updateDescription(description) {
  let element = document.head.querySelector('meta[name="description"]');
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", "description");
    document.head.append(element);
  }
  element.setAttribute("content", description);
}

export default function App() {
  const [language, setLanguage] = useState(resolveInitialLanguage);
  const { theme, toggleTheme } = useTheme();
  const copy = useMemo(() => getCatalog(language), [language]);

  useEffect(() => {
    document.documentElement.lang = getHtmlLanguage(language);
    document.title = copy.meta.title;
    updateDescription(copy.meta.description);
  }, [copy, language]);

  const handleLanguageChange = (nextLanguage) => {
    if (!catalog[nextLanguage]) return;
    setLanguage(nextLanguage);
    persistLanguage(nextLanguage);
    trackMetric("language_changed", { language: nextLanguage });
  };

  const handleThemeToggle = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (typeof document.startViewTransition === "function" && !prefersReducedMotion) {
      document.startViewTransition(toggleTheme);
    } else {
      toggleTheme();
    }
    trackMetric("theme_changed", { from: theme });
  };

  return (
    <>
      <span className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main-content">
        {copy.skip}
      </a>
      <Header
        copy={copy}
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      <main id="main-content" tabIndex="-1">
        <Hero copy={copy} />
        <SolutionSection copy={copy} />
        <StorySection copy={copy} />
        <WorkflowSection copy={copy} />
        <JourneysSection copy={copy} />
        <PlansSection copy={copy} />
        <FaqSection copy={copy} />
        <ContactSection copy={copy} />
        <CommunitySection copy={copy} language={language} />
        <ClosingSection copy={copy} />
      </main>
      <Footer copy={copy} />
    </>
  );
}
