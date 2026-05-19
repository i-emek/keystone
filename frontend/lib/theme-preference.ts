import {
  DEFAULT_THEME,
  type ThemeMode,
  type ThemePreference,
  isThemePreference,
} from "./theme";

export const THEME_PREFERENCE_STORAGE_KEY = "keystone-theme-preference";

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export function resolveThemePreference(
  preference: ThemePreference,
  systemTheme: ThemeMode = getSystemTheme(),
): ThemeMode {
  return preference === "system" ? systemTheme : preference;
}

export function readStoredThemePreference(): ThemePreference | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY);

  return value && isThemePreference(value) ? value : null;
}

export function writeStoredThemePreference(preference: ThemePreference): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference);
}

export function clearStoredThemePreference(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(THEME_PREFERENCE_STORAGE_KEY);
}

export function getInitialThemePreference(): ThemePreference {
  return readStoredThemePreference() ?? DEFAULT_THEME;
}