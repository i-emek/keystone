"use client";

import React from "react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getInitialThemePreference,
  resolveThemePreference,
  writeStoredThemePreference,
} from "../../lib/theme-preference";
import { DEFAULT_THEME, type ThemeMode, type ThemePreference } from "../../lib/theme";

type ThemeContextValue = {
  preference: ThemePreference;
  theme: ThemeMode;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(DEFAULT_THEME);
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME);

  useEffect(() => {
    const nextPreference = getInitialThemePreference();
    const resolved = resolveThemePreference(nextPreference);

    setPreferenceState(nextPreference);
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  useEffect(() => {
    if (preference !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");

    const handleChange = () => {
      const resolved = resolveThemePreference("system");
      setTheme(resolved);
      applyTheme(resolved);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [preference]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      preference,
      theme,
      setPreference: (nextPreference) => {
        const resolved = resolveThemePreference(nextPreference);

        setPreferenceState(nextPreference);
        setTheme(resolved);
        applyTheme(resolved);
        writeStoredThemePreference(nextPreference);
      },
    }),
    [preference, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}