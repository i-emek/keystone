import React from "react";
import { screen } from "@testing-library/react";

import { WorkspaceStatus } from "../../../components/system";
import { renderWithTheme } from "../renderWithTheme";

describe("WorkspaceStatus", () => {
  it("renders runtime status using shared service labels and semantic badges", () => {
    renderWithTheme(
      <WorkspaceStatus
        status={{
          status: "ready",
          message: "All local dependencies are reachable.",
          services: {
            api: "ready",
            postgres: "ready",
            objectStorage: "degraded",
            queue: "ready",
          },
        }}
      />,
    );

    expect(screen.getByRole("heading", { name: "Workspace status: ready" })).toBeInTheDocument();
    expect(screen.getByText("Object storage")).toBeInTheDocument();
    expect(screen.getAllByText("ready").length).toBeGreaterThan(0);
    expect(screen.getByText("degraded")).toBeInTheDocument();
  });
});