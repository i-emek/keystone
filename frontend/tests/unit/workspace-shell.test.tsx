import React from "react";
import { render, screen } from "@testing-library/react";

import { WorkspaceStatus } from "../../components/system/WorkspaceStatus";

describe("WorkspaceStatus", () => {
  it("renders service cards for the local workspace", () => {
    render(
      <WorkspaceStatus
        status={{
          status: "ready",
          message: "All local dependencies are reachable.",
          services: {
            api: "ready",
            postgres: "ready",
            objectStorage: "ready",
            queue: "ready",
          },
        }}
      />,
    );

    expect(screen.getByText("Workspace status: ready")).toBeInTheDocument();
    expect(screen.getByText("PostgreSQL")).toBeInTheDocument();
    expect(screen.getByText("Object storage")).toBeInTheDocument();
  });
});
