export function scheduleSplashTimeline(steps) {
  const timeoutIds = steps.map(({ delayMs, action }) => setTimeout(action, delayMs));

  return () => {
    timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
  };
}
