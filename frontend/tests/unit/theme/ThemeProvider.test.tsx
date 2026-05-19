import React from "react";
import { fireEvent, screen } from "@testing-library/react";

import { ThemeToggle } from "../../../components/system";
import { renderWithTheme } from "../renderWithTheme";

describe("ThemeProvider", () => {
  it("applies stored preference and updates the html theme attribute", () => {
    renderWithTheme(<ThemeToggle />, { preference: "dark" });

    expect(document.documentElement.dataset.theme).toBe("dark");

    fireEvent.click(screen.getByRole("button", { name: "Light" }));

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});