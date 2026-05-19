import React from "react";
import { screen } from "@testing-library/react";

import { ContentState } from "../../../components/system";
import { renderWithTheme } from "../renderWithTheme";

describe("ContentState", () => {
  it("renders a reusable state block with tone, title, and description", () => {
    renderWithTheme(
      <ContentState
        title="Trust-sensitive visuals stay reviewable"
        description="Severity states and AI markers share one presentation seam."
        tone="warning"
      />,
    );

    expect(screen.getByRole("heading", { name: "Trust-sensitive visuals stay reviewable" })).toBeInTheDocument();
    expect(screen.getByText("warning")).toBeInTheDocument();
    expect(screen.getByText(/presentation seam/i)).toBeInTheDocument();
  });
});