import React from "react";
import { screen } from "@testing-library/react";

import {
  ProgressTrajectory,
  RadarContainer,
  TrendContainer,
} from "../../../components/system";
import { renderWithTheme } from "../renderWithTheme";

describe("visualization patterns", () => {
  it("renders reusable analytical containers", () => {
    renderWithTheme(
      <>
        <TrendContainer
          title="Adoption trajectory"
          subtitle="Shared UI decisions are converging."
          points={[
            { label: "Tokens", value: 40 },
            { label: "Shell", value: 70 },
          ]}
        />
        <RadarContainer
          title="Foundation quality"
          metrics={[
            { label: "Readability", value: 92 },
            { label: "Density", value: 84 },
          ]}
        />
        <ProgressTrajectory
          title="Rollout runway"
          steps={[
            { label: "Shell baseline", value: 100 },
            { label: "Pattern catalog", value: 82 },
          ]}
        />
      </>,
    );

    expect(screen.getByRole("heading", { name: "Adoption trajectory" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Foundation quality" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rollout runway" })).toBeInTheDocument();
    expect(screen.getByText("Readability")).toBeInTheDocument();
    expect(screen.getByText("Shell baseline")).toBeInTheDocument();
  });
});