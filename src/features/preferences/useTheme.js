import { useCallback, useState } from "react";
import { applyTheme, getNextTheme, persistTheme, resolveInitialTheme } from "./theme.js";

export function useTheme() {
  const [theme, setTheme] = useState(() => applyTheme(resolveInitialTheme()));

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const nextTheme = applyTheme(getNextTheme(currentTheme));
      persistTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  return { theme, toggleTheme };
}
