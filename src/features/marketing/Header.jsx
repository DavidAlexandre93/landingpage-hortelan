import { useEffect, useRef, useState } from "react";
import { SITE_LINKS } from "../../app/siteConfig.js";
import { SUPPORTED_LANGUAGES } from "../localization/language.js";
import { ExternalLink } from "../../shared/ui/ExternalLink.jsx";
import { Icon } from "../../shared/ui/Icon.jsx";

const NAVIGATION = [
  { id: "solution", key: "features" },
  { id: "workflow", key: "workflow" },
  { id: "plans", key: "plans" },
  { id: "faq", key: "faq" },
  { id: "contact", key: "contact" },
];

export function Header({ copy, language, onLanguageChange, theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleNavigation = (id) => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  };

  const themeLabel = theme === "dark" ? copy.controls.themeToLight : copy.controls.themeToDark;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Hortelan AgTech">
          <span className="brand-mark" aria-hidden="true">
            <Icon name="leaf" />
          </span>
          <span className="brand-copy">
            <strong>Hortelan</strong>
            <small>{copy.brandTagline}</small>
          </span>
        </a>

        <button
          className="icon-button menu-button"
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? copy.controls.menuClose : copy.controls.menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>

        <div className={`header-panel ${menuOpen ? "is-open" : ""}`} id="primary-navigation">
          <nav className="primary-navigation" aria-label={copy.footer.product}>
            {NAVIGATION.map(({ id, key }) => (
              <a key={id} href={`#${id}`} onClick={() => handleNavigation(id)}>
                {copy.nav[key]}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <label className="language-control">
              <span className="sr-only">{copy.controls.language}</span>
              <select value={language} onChange={(event) => onLanguageChange(event.target.value)}>
                {SUPPORTED_LANGUAGES.map(({ code, shortLabel, label }) => (
                  <option key={code} value={code}>
                    {shortLabel} · {label}
                  </option>
                ))}
              </select>
            </label>

            <button
              className="icon-button"
              type="button"
              onClick={onThemeToggle}
              aria-label={themeLabel}
              title={themeLabel}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} />
            </button>

            <ExternalLink
              className="button button--compact button--primary header-demo"
              href={SITE_LINKS.demo}
              externalLabel={copy.footer.external}
            >
              {copy.footer.demo}
            </ExternalLink>
          </div>
        </div>
      </div>
    </header>
  );
}
