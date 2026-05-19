"use client";

import React from "react";
import { THEME_PREFERENCE_OPTIONS, type ThemePreference } from "../../lib/theme";
import { useTheme } from "./ThemeProvider";

const LABELS: Record<ThemePreference, string> = {
  dark: "Dark",
  light: "Light",
  system: "System",
};

export function ThemeToggle() {
  const { preference, setPreference } = useTheme();

  return (
    <div className="ks-theme-toggle" role="group" aria-label="Theme preference">
      {THEME_PREFERENCE_OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          className={`ks-theme-toggle__button ks-focus-ring${preference === option ? " is-active" : ""}`}
          aria-pressed={preference === option}
          onClick={() => setPreference(option)}
        >
          {LABELS[option]}
        </button>
      ))}
    </div>
  );
}