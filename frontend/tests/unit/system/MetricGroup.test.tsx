import React from "react";
import { screen } from "@testing-library/react";

import { MetricGroup } from "../../../components/system";
import { renderWithTheme } from "../renderWithTheme";

describe("MetricGroup", () => {
  it("renders compact metrics with labels, values, and detail text", () => {
    renderWithTheme(
      <MetricGroup
        title="Foundation metrics"
        metrics={[
          { label: "Theme support", value: "2 modes", detail: "Dark and light." },
          { label: "Shell regions", value: "3", detail: "Nav, header, content." },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Foundation metrics" })).toBeInTheDocument();
    expect(screen.getByText("Theme support")).toBeInTheDocument();
    expect(screen.getByText("2 modes")).toBeInTheDocument();
  });
});