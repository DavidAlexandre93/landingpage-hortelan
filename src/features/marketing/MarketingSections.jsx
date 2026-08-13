import { useState } from "react";
import { SITE_LINKS } from "../../app/siteConfig.js";
import { ExternalLink } from "../../shared/ui/ExternalLink.jsx";
import { Icon } from "../../shared/ui/Icon.jsx";
import { SectionHeading } from "../../shared/ui/SectionHeading.jsx";

export function SolutionSection({ copy }) {
  return (
    <section className="section section--soft" id="solution" tabIndex="-1" aria-labelledby="solution-title">
      <div className="container">
        <SectionHeading
          id="solution-title"
          eyebrow={copy.features.eyebrow}
          title={copy.features.title}
          description={copy.features.description}
          align="center"
        />
        <div className="feature-grid">
          {copy.features.items.map((item, index) => (
            <article className="feature-card" key={item.title}>
              <div className="feature-card-topline">
                <span className="feature-icon" aria-hidden="true">
                  <Icon name={item.icon} />
                </span>
                <span className="feature-index">0{index + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="feature-detail">{item.detail}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoExperience({ copy }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`${SITE_LINKS.videoEmbed}?autoplay=1&rel=0`}
        title={copy.story.videoTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      className="video-placeholder"
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={copy.story.videoTitle}
    >
      <span className="video-grid" aria-hidden="true" />
      <span className="video-brand" aria-hidden="true">
        <span className="brand-mark brand-mark--large">
          <Icon name="leaf" />
        </span>
        <strong>Hortelan</strong>
      </span>
      <span className="play-button" aria-hidden="true">
        <span />
      </span>
    </button>
  );
}

export function StorySection({ copy }) {
  return (
    <section className="section story-section" id="story" aria-labelledby="story-title">
      <div className="container story-layout">
        <div className="story-media">
          <div className="video-shell">
            <VideoExperience copy={copy} />
          </div>
          <ExternalLink
            className="text-link"
            href={SITE_LINKS.youtube}
            externalLabel={copy.footer.external}
            showIcon
          >
            {copy.story.channel}
          </ExternalLink>
        </div>
        <div className="story-copy">
          <SectionHeading
            id="story-title"
            eyebrow={copy.story.eyebrow}
            title={copy.story.title}
            description={copy.story.description}
          />
          <ul className="check-list">
            {copy.story.bullets.map((bullet) => (
              <li key={bullet}>
                <span aria-hidden="true">
                  <Icon name="check" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function WorkflowSection({ copy }) {
  return (
    <section className="section section--dark" id="workflow" tabIndex="-1" aria-labelledby="workflow-title">
      <div className="container">
        <SectionHeading
          id="workflow-title"
          eyebrow={copy.workflow.eyebrow}
          title={copy.workflow.title}
          description={copy.workflow.description}
        />
        <ol className="workflow-list">
          {copy.workflow.items.map((item) => (
            <li key={item.step}>
              <span className="workflow-step">{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <Icon name="arrow" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function JourneysSection({ copy }) {
  return (
    <section className="section journeys-section" id="journeys" aria-labelledby="journeys-title">
      <div className="container">
        <SectionHeading
          id="journeys-title"
          eyebrow={copy.journeys.eyebrow}
          title={copy.journeys.title}
          description={copy.journeys.description}
          align="center"
        />
        <div className="journey-grid">
          {copy.journeys.items.map((item) => (
            <article className="journey-card" key={item.title}>
              <div className="journey-visual" aria-hidden="true">
                <span>
                  <Icon name={item.icon} />
                </span>
              </div>
              <div className="journey-content">
                <p className="card-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlansSection({ copy }) {
  return (
    <section className="section section--soft" id="plans" tabIndex="-1" aria-labelledby="plans-title">
      <div className="container">
        <SectionHeading
          id="plans-title"
          eyebrow={copy.plans.eyebrow}
          title={copy.plans.title}
          description={copy.plans.description}
          align="center"
        />
        <div className="plan-grid">
          {copy.plans.items.map((plan) => (
            <article className={`plan-card ${plan.featured ? "plan-card--featured" : ""}`} key={plan.name}>
              {plan.featured ? <span className="popular-label">{copy.plans.popular}</span> : null}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price">
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span aria-hidden="true">
                      <Icon name="check" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <ExternalLink
                className={`button ${plan.featured ? "button--primary" : "button--secondary"}`}
                href={SITE_LINKS.demo}
                externalLabel={copy.footer.external}
              >
                {plan.cta}
              </ExternalLink>
            </article>
          ))}
        </div>
        <p className="plans-disclaimer">{copy.plans.disclaimer}</p>
      </div>
    </section>
  );
}

export function FaqSection({ copy }) {
  return (
    <section className="section faq-section" id="faq" tabIndex="-1" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <SectionHeading
          id="faq-title"
          eyebrow={copy.faq.eyebrow}
          title={copy.faq.title}
          description={copy.faq.description}
        />
        <div className="faq-list">
          {copy.faq.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-toggle" aria-hidden="true">
                  <Icon name="chevron" />
                </span>
              </summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosingSection({ copy }) {
  return (
    <section className="section closing-section" aria-labelledby="closing-title">
      <div className="container">
        <div className="closing-card">
          <div className="closing-decoration" aria-hidden="true">
            <Icon name="leaf" />
          </div>
          <p className="eyebrow">{copy.closing.eyebrow}</p>
          <h2 id="closing-title">{copy.closing.title}</h2>
          <p>{copy.closing.description}</p>
          <div className="closing-actions">
            <ExternalLink
              className="button button--light"
              href={SITE_LINKS.demo}
              externalLabel={copy.footer.external}
              showIcon
            >
              {copy.closing.primary}
            </ExternalLink>
            <ExternalLink
              className="button button--ghost-light"
              href={SITE_LINKS.docs}
              externalLabel={copy.footer.external}
              showIcon
            >
              {copy.closing.secondary}
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ copy }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand brand--footer" href="#top" aria-label="Hortelan AgTech">
            <span className="brand-mark" aria-hidden="true">
              <Icon name="leaf" />
            </span>
            <span className="brand-copy">
              <strong>Hortelan</strong>
              <small>AgTech Ltda.</small>
            </span>
          </a>
          <p>{copy.footer.description}</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>{copy.footer.product}</strong>
            <a href="#solution">{copy.nav.features}</a>
            <a href="#workflow">{copy.nav.workflow}</a>
            <a href="#plans">{copy.nav.plans}</a>
          </div>
          <div>
            <strong>{copy.footer.company}</strong>
            <ExternalLink href={SITE_LINKS.docs} externalLabel={copy.footer.external}>
              {copy.footer.docs}
            </ExternalLink>
            <ExternalLink href={SITE_LINKS.youtube} externalLabel={copy.footer.external}>
              YouTube
            </ExternalLink>
            <ExternalLink href={SITE_LINKS.instagram} externalLabel={copy.footer.external}>
              Instagram
            </ExternalLink>
            <ExternalLink href={SITE_LINKS.linkedin} externalLabel={copy.footer.external}>
              LinkedIn
            </ExternalLink>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {year} Hortelan AgTech Ltda. {copy.footer.rights}
        </span>
        <span>IoT · Automação · Comunidade</span>
      </div>
    </footer>
  );
}
