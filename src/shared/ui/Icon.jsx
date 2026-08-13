const ICON_PATHS = {
  arrow: ["M5 12h14", "m13 6 6 6-6 6"],
  automation: [
    "M12 3v3",
    "M12 18v3",
    "M3 12h3",
    "M18 12h3",
    "M5.6 5.6l2.1 2.1",
    "m16.3 16.3-2.1-2.1",
    "m18.4 5.6-2.1 2.1",
    "M7.7 16.3l-2.1 2.1",
    "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  ],
  chart: ["M4 19V9", "M10 19V5", "M16 19v-7", "M22 19H2"],
  check: ["m5 12 4 4L19 6"],
  chevron: ["m9 18 6-6-6-6"],
  close: ["M6 6l12 12", "M18 6 6 18"],
  community: [
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
    "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
    "M22 21v-2a4 4 0 0 0-3-3.87",
    "M16 3.13a4 4 0 0 1 0 7.75",
  ],
  download: ["M12 3v12", "m7 10 5 5 5-5", "M5 21h14"],
  external: ["M14 3h7v7", "M10 14 21 3", "M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"],
  leaf: ["M11 20A7 7 0 0 1 4 13C4 7 10 4 20 4c0 10-3 16-9 16Z", "M7 17c3-3 6-5 11-9"],
  mail: ["M4 4h16v16H4z", "m4 6 8 7 8-7"],
  menu: ["M4 7h16", "M4 12h16", "M4 17h16"],
  moon: ["M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"],
  sensor: ["M12 22a5 5 0 0 0 5-5c0-2.4-1.7-4.4-4-4.9V5a1 1 0 0 0-2 0v7.1A5 5 0 0 0 12 22Z", "M9 9h4"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "m9 12 2 2 4-4"],
  sparkles: [
    "m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3Z",
    "m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z",
    "m5 13 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z",
  ],
  store: [
    "M3 9l2-5h14l2 5",
    "M5 13v8h14v-8",
    "M9 21v-6h6v6",
    "M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0",
  ],
  sun: [
    "M12 3v2",
    "M12 19v2",
    "M3 12h2",
    "M19 12h2",
    "m5.6 5.6 1.4 1.4",
    "m17 17 1.4 1.4",
    "m18.4 5.6-1.4 1.4",
    "M7 17l-1.4 1.4",
    "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  ],
  trash: ["M4 7h16", "M9 7V4h6v3", "m7 7 1 14h10l1-14", "M10 11v6", "M14 11v6"],
  water: ["M12 2s6 7 6 12a6 6 0 0 1-12 0c0-5 6-12 6-12Z", "M9 15a3 3 0 0 0 3 3"],
};

export function Icon({ name, className = "", title }) {
  const paths = ICON_PATHS[name] ?? ICON_PATHS.leaf;
  return (
    <svg
      className={`icon ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
