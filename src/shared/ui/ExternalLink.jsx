import { Icon } from "./Icon.jsx";

export function ExternalLink({ href, children, className = "", externalLabel, showIcon = false }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      <span>{children}</span>
      {showIcon ? <Icon name="external" className="icon--small" /> : null}
      {externalLabel ? <span className="sr-only"> — {externalLabel}</span> : null}
    </a>
  );
}
