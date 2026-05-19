import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

import { ThemeProvider } from "../../components/system";
import {
  THEME_PREFERENCE_STORAGE_KEY,
  clearStoredThemePreference,
  writeStoredThemePreference,
} from "../../lib/theme-preference";
import type { ThemePreference } from "../../lib/theme";

type ThemeRenderOptions = RenderOptions & {
  preference?: ThemePreference;
};

export function renderWithTheme(ui: ReactElement, options: ThemeRenderOptions = {}) {
  const { preference, ...renderOptions } = options;

  window.localStorage.removeItem(THEME_PREFERENCE_STORAGE_KEY);

  if (preference) {
    writeStoredThemePreference(preference);
  } else {
    clearStoredThemePreference();
  }

  return render(ui, {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    ...renderOptions,
  });
}