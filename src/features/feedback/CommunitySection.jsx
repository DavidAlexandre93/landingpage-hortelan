import { useMemo, useState } from "react";
import { Icon } from "../../shared/ui/Icon.jsx";
import { SectionHeading } from "../../shared/ui/SectionHeading.jsx";
import { MURAL_LIMITS, createMuralEntry, readMuralEntries, writeMuralEntries } from "./muralStore.js";
import { downloadMuralEntries } from "./muralExport.js";

const LOCALES = { pt: "pt-BR", en: "en-US", es: "es-ES", fr: "fr-FR" };

export function CommunitySection({
  copy,
  language,
  storage = globalThis.localStorage,
  onDownload = downloadMuralEntries,
}) {
  const [entries, setEntries] = useState(() => readMuralEntries(storage));
  const [status, setStatus] = useState("");
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(LOCALES[language] ?? LOCALES.pt, { dateStyle: "medium", timeStyle: "short" }),
    [language]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus(copy.community.invalid);
      form.querySelector(":invalid")?.focus();
      form.reportValidity();
      return;
    }

    const fields = Object.fromEntries(new FormData(form));
    const entry = createMuralEntry(fields);
    if (!entry) {
      setStatus(copy.community.invalid);
      return;
    }

    const nextEntries = [entry, ...entries].slice(0, 50);
    setEntries(nextEntries);
    const persisted = writeMuralEntries(nextEntries, storage);
    form.reset();
    setStatus(persisted ? copy.community.saved : copy.community.notPersisted);
  };

  const handleRemove = (id) => {
    const confirmed = typeof window.confirm !== "function" || window.confirm(`${copy.community.remove}?`);
    if (!confirmed) return;
    const nextEntries = entries.filter((entry) => entry.id !== id);
    setEntries(nextEntries);
    const persisted = writeMuralEntries(nextEntries, storage);
    if (!persisted) setStatus(copy.community.notPersisted);
  };

  const handleExport = () => {
    if (entries.length === 0) {
      setStatus(copy.community.exportEmpty);
      return;
    }
    onDownload(entries);
  };

  return (
    <section
      className="section section--soft community-section"
      id="community"
      aria-labelledby="community-title"
    >
      <div className="container">
        <SectionHeading
          id="community-title"
          eyebrow={copy.community.eyebrow}
          title={copy.community.title}
          description={copy.community.description}
          align="center"
        />
        <div className="community-layout">
          <form className="form-card community-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <label>
                <span>{copy.community.name}</span>
                <input
                  name="name"
                  type="text"
                  required
                  minLength="2"
                  maxLength={MURAL_LIMITS.name}
                  placeholder={copy.community.namePlaceholder}
                  autoComplete="name"
                />
              </label>
              <label>
                <span>{copy.community.email}</span>
                <input
                  name="email"
                  type="email"
                  maxLength={MURAL_LIMITS.email}
                  placeholder={copy.community.emailPlaceholder}
                  autoComplete="email"
                />
              </label>
            </div>
            <label>
              <span>{copy.community.type}</span>
              <select name="type" defaultValue="question">
                {Object.entries(copy.community.typeOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>{copy.community.message}</span>
              <textarea
                name="message"
                required
                minLength="3"
                maxLength={MURAL_LIMITS.message}
                rows="5"
                placeholder={copy.community.messagePlaceholder}
              />
            </label>
            <div className="form-actions">
              <button className="button button--primary" type="submit">
                {copy.community.publish}
                <Icon name="arrow" className="icon--small" />
              </button>
              <button className="button button--secondary" type="button" onClick={handleExport}>
                <Icon name="download" className="icon--small" />
                {copy.community.export}
              </button>
            </div>
            <p className="form-disclosure">{copy.community.privacy}</p>
            <p className="form-status" aria-live="polite">
              {status}
            </p>
          </form>

          <div className="mural-list" aria-live="polite">
            {entries.length === 0 ? (
              <div className="mural-empty">
                <span aria-hidden="true">
                  <Icon name="leaf" />
                </span>
                <p>{copy.community.empty}</p>
              </div>
            ) : (
              entries.map((entry) => (
                <article className="mural-card" key={entry.id}>
                  <div className="mural-card-header">
                    <div>
                      <strong>{entry.name}</strong>
                      <span>{copy.community.typeOptions[entry.type]}</span>
                    </div>
                    <button
                      className="icon-button icon-button--danger"
                      type="button"
                      onClick={() => handleRemove(entry.id)}
                      aria-label={`${copy.community.remove}: ${entry.name}`}
                    >
                      <Icon name="trash" />
                    </button>
                  </div>
                  <p>{entry.message}</p>
                  <time dateTime={entry.createdAt}>{dateFormatter.format(new Date(entry.createdAt))}</time>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
