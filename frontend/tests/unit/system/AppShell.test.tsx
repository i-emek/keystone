import React from "react";
import { screen } from "@testing-library/react";

import { AppShell } from "../../../components/system";
import { renderWithTheme } from "../renderWithTheme";

describe("AppShell", () => {
  it("renders the shared analytics shell structure", () => {
    renderWithTheme(
      <AppShell
        eyebrow="AI Risk Analysis"
        title="Operational clarity for engineering leadership"
        description="A shared shell for trust and analytical views."
      >
        <div>Shell body</div>
      </AppShell>,
    );

    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Operational clarity for engineering leadership" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Engineering Intelligence")).toBeInTheDocument();
    expect(screen.getByText("Shell body")).toBeInTheDocument();
  });
});