"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "day" | "night";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "day", toggle: () => undefined });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    const stored = window.localStorage.getItem("mbongo-theme") as Theme | null;
    if (stored === "day" || stored === "night") {
      setTheme(stored);
      document.documentElement.setAttribute(
        "data-theme",
        stored === "night" ? "night" : "day"
      );
      return;
    }
    document.documentElement.setAttribute("data-theme", "day");
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "day" ? "night" : "day";
      document.documentElement.setAttribute(
        "data-theme",
        next === "night" ? "night" : "day"
      );
      window.localStorage.setItem("mbongo-theme", next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
