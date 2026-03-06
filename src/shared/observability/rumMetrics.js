function sanitizeDetails(details = {}) {
  return Object.fromEntries(
    Object.entries(details).map(([key, value]) => {
      if (typeof value === "number") {
        return [key, Number.isFinite(value) ? Number(value.toFixed(2)) : -1];
      }

      if (typeof value === "string") {
        return [key, value.slice(0, 120)];
      }

      if (typeof value === "boolean") {
        return [key, value];
      }

      return [key, "[unsupported]"];
    })
  );
}

export function trackMetric(name, details = {}) {
  const payload = {
    name,
    details: sanitizeDetails(details),
    timestamp: Date.now(),
    path: typeof window !== "undefined" ? window.location.pathname : "",
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("hortelan:metric", { detail: payload }));

    if (Array.isArray(window.__HORTELAN_METRICS__)) {
      window.__HORTELAN_METRICS__.push(payload);
    }
  }

  if (typeof console !== "undefined" && typeof console.debug === "function") {
    console.debug("[hortelan-metric]", payload);
  }

  return payload;
}
