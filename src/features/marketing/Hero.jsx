import { SITE_LINKS } from "../../app/siteConfig.js";
import { ExternalLink } from "../../shared/ui/ExternalLink.jsx";
import { Icon } from "../../shared/ui/Icon.jsx";
import dashboardImage from "../../../Assets/dashboard.png";

export function Hero({ copy }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-orb hero-orb--one" aria-hidden="true" />
      <div className="hero-orb hero-orb--two" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            {copy.hero.eyebrow}
          </p>
          <h1 id="hero-title">
            {copy.hero.title} <span>{copy.hero.accent}</span>
          </h1>
          <p className="hero-description">{copy.hero.description}</p>
          <div className="hero-actions">
            <ExternalLink
              className="button button--primary"
              href={SITE_LINKS.demo}
              externalLabel={copy.footer.external}
              showIcon
            >
              {copy.hero.primary}
            </ExternalLink>
            <a className="button button--secondary" href="#workflow">
              {copy.hero.secondary}
              <Icon name="arrow" className="icon--small" />
            </a>
          </div>
          <p className="hero-note">
            <Icon name="check" className="icon--small" />
            {copy.hero.note}
          </p>
          <dl className="signal-list">
            {copy.hero.signals.map(({ value, label }) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-product" aria-label={copy.proof.eyebrow}>
          <div className="product-status">
            <span aria-hidden="true" />
            {copy.proof.status}
          </div>
          <div className="dashboard-frame">
            <div className="dashboard-toolbar" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <img
              src={dashboardImage}
              alt={copy.proof.title}
              width="1850"
              height="900"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="proof-chips">
            {copy.proof.chips.map(({ value, label, icon }) => (
              <div className="proof-chip" key={label}>
                <span className="proof-chip-icon" aria-hidden="true">
                  <Icon name={icon} />
                </span>
                <span>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
