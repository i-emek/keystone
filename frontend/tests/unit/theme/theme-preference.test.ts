import {
  clearStoredThemePreference,
  readStoredThemePreference,
  resolveThemePreference,
  writeStoredThemePreference,
} from "../../../lib/theme-preference";

describe("theme preference helpers", () => {
  afterEach(() => {
    clearStoredThemePreference();
  });

  it("resolves system preference to the provided system theme", () => {
    expect(resolveThemePreference("system", "light")).toBe("light");
  });

  it("persists and reads stored preference values", () => {
    writeStoredThemePreference("light");

    expect(readStoredThemePreference()).toBe("light");
  });
});