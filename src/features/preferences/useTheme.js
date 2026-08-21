import { useCallback, useState } from "react";
import { applyTheme, getNextTheme, persistTheme, resolveInitialTheme } from "./theme.js";

export function useTheme() {
  const [theme, setTheme] = useState(() => applyTheme(resolveInitialTheme()));

  const toggleTheme = useCallback(() => {
    document.documentElement.classList.add("theme-changing");
    setTheme((currentTheme) => {
      const nextTheme = applyTheme(getNextTheme(currentTheme));
      persistTheme(nextTheme);
      return nextTheme;
    });
    window.setTimeout(() => document.documentElement.classList.remove("theme-changing"), 180);
  }, []);

  return { theme, toggleTheme };
}
