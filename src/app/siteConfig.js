export const SITE_LINKS = Object.freeze({
  demo: "https://hortelanagtech.vercel.app/",
  docs: "https://docs.google.com/presentation/d/1BpvxRFnMVgAnUO2XeYl6Q6Yads8sWMLKgpi-b2snJ1Y/edit?slide=id.p#slide=id.p",
  youtube: "https://www.youtube.com/@HortelanAgTechLtda",
  videoEmbed: "https://www.youtube-nocookie.com/embed/91gdJPCjX40",
  instagram: "https://www.instagram.com/hortelan_agtech/",
  linkedin: "https://www.linkedin.com/company/hortelan",
  email: "davidalexandrefernandes@outlook.com",
});

const LEGACY_PATHS = new Set(["/home", "/splash", "/index.min.html"]);

function normalizeBasePath(baseUrl) {
  const normalized = `/${String(baseUrl || "/").replace(/^\/+|\/+$/gu, "")}/`;
  return normalized === "//" ? "/" : normalized;
}

export function normalizeLegacyRoute(
  locationRef = window.location,
  historyRef = window.history,
  baseUrl = import.meta.env.BASE_URL
) {
  const basePath = normalizeBasePath(baseUrl);
  const routePath =
    basePath === "/" || !locationRef.pathname.startsWith(basePath)
      ? locationRef.pathname
      : `/${locationRef.pathname.slice(basePath.length)}`;
  if (LEGACY_PATHS.has(routePath)) {
    historyRef.replaceState({}, "", `${basePath}${locationRef.search}${locationRef.hash}`);
  }
}
