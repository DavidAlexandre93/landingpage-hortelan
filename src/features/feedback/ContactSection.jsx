import { useState } from "react";
import { SITE_LINKS } from "../../app/siteConfig.js";
import { Icon } from "../../shared/ui/Icon.jsx";
import { SectionHeading } from "../../shared/ui/SectionHeading.jsx";
import { buildMailtoUrl } from "./muralStore.js";

function focusFirstInvalidField(form) {
  const invalidField = form.querySelector(":invalid");
  invalidField?.focus();
  form.reportValidity();
}

function openMailClient(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function ContactSection({ copy, onMailto = openMailClient }) {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus(copy.contact.invalid);
      focusFirstInvalidField(form);
      return;
    }

    const fields = Object.fromEntries(new FormData(form));
    const mailto = buildMailtoUrl({
      recipient: SITE_LINKS.email,
      name: fields.name,
      email: fields.email,
      subject: `[Hortelan] ${fields.subject}`,
      message: fields.message,
    });
    setStatus(copy.contact.status);
    onMailto(mailto);
  };

  return (
    <section className="section contact-section" id="contact" tabIndex="-1" aria-labelledby="contact-title">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionHeading
            id="contact-title"
            eyebrow={copy.contact.eyebrow}
            title={copy.contact.title}
            description={copy.contact.description}
          />
          <div className="contact-orbit" aria-hidden="true">
            <span className="contact-orbit-center">
              <Icon name="leaf" />
            </span>
            <span className="contact-orbit-item contact-orbit-item--one">
              <Icon name="mail" />
            </span>
            <span className="contact-orbit-item contact-orbit-item--two">
              <Icon name="community" />
            </span>
            <span className="contact-orbit-item contact-orbit-item--three">
              <Icon name="sparkles" />
            </span>
          </div>
        </div>

        <form className="form-card contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label>
              <span>{copy.contact.name}</span>
              <input
                name="name"
                type="text"
                required
                minLength="2"
                maxLength="80"
                placeholder={copy.contact.namePlaceholder}
                autoComplete="name"
              />
            </label>
            <label>
              <span>{copy.contact.email}</span>
              <input
                name="email"
                type="email"
                required
                maxLength="160"
                placeholder={copy.contact.emailPlaceholder}
                autoComplete="email"
              />
            </label>
          </div>
          <label>
            <span>{copy.contact.subject}</span>
            <select name="subject" required defaultValue={copy.contact.subjectOptions[0]}>
              {copy.contact.subjectOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            <span>{copy.contact.message}</span>
            <textarea
              name="message"
              required
              minLength="10"
              maxLength="2000"
              rows="5"
              placeholder={copy.contact.messagePlaceholder}
            />
          </label>
          <button className="button button--primary" type="submit">
            {copy.contact.send}
            <Icon name="arrow" className="icon--small" />
          </button>
          <p className="form-disclosure">{copy.contact.disclosure}</p>
          <p className="direct-email">
            {copy.contact.direct} <a href={`mailto:${SITE_LINKS.email}`}>{SITE_LINKS.email}</a>
          </p>
          <p className="form-status" aria-live="polite">
            {status}
          </p>
        </form>
      </div>
    </section>
  );
}
