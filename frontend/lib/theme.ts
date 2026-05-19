export const DEFAULT_THEME = "dark" as const;

export const SUPPORTED_THEMES = ["dark", "light"] as const;

export const THEME_PREFERENCE_OPTIONS = ["dark", "light", "system"] as const;

export type ThemeMode = (typeof SUPPORTED_THEMES)[number];
export type ThemePreference = (typeof THEME_PREFERENCE_OPTIONS)[number];

export type ThemeTokens = {
  surfacePrimary: string;
  surfaceContainer: string;
  textPrimary: string;
  textSecondary: string;
  primary: string;
  success: string;
  warning: string;
  critical: string;
};

export const themeTokenSnapshot: Record<ThemeMode, ThemeTokens> = {
  dark: {
    surfacePrimary: "#131314",
    surfaceContainer: "#1c1b1c",
    textPrimary: "#ffffff",
    textSecondary: "#a1a1aa",
    primary: "#0052ff",
    success: "#22c55e",
    warning: "#f59e0b",
    critical: "#ef4444",
  },
  light: {
    surfacePrimary: "#f4f7fb",
    surfaceContainer: "#ffffff",
    textPrimary: "#111827",
    textSecondary: "#475467",
    primary: "#0052ff",
    success: "#22c55e",
    warning: "#f59e0b",
    critical: "#ef4444",
  },
};

export function isThemeMode(value: string): value is ThemeMode {
  return SUPPORTED_THEMES.includes(value as ThemeMode);
}

export function isThemePreference(value: string): value is ThemePreference {
  return THEME_PREFERENCE_OPTIONS.includes(value as ThemePreference);
}