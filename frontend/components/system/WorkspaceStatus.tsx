import React from "react";
import type { RuntimeStatus } from "../../lib/api-client";

import { StatusBadge } from "./StatusBadge";
import { SurfaceCard } from "./SurfaceCard";
import { semanticTokenSets, toneFromRuntimeStatus } from "./stateSemantics";

type WorkspaceStatusProps = {
  status: RuntimeStatus;
};

const SERVICE_LABELS: Record<string, string> = {
  api: "API",
  postgres: "PostgreSQL",
  objectStorage: "Object storage",
  queue: "Queue",
};

export function WorkspaceStatus({ status }: WorkspaceStatusProps) {
  const overallTone = toneFromRuntimeStatus(status.status);
  const overallPanel = semanticTokenSets[overallTone];

  return (
    <section className="ks-runtime-status" aria-label="Workspace runtime status">
      <div
        className="ks-runtime-status__hero"
        style={{
          background: overallPanel.panelBackground,
          borderColor: overallPanel.panelBorder,
        }}
      >
        <div>
          <p className="ks-runtime-status__eyebrow">Live runtime</p>
          <h2 className="ks-runtime-status__title">Workspace status: {status.status}</h2>
          <p className="ks-runtime-status__message">{status.message}</p>
        </div>
        <StatusBadge label={status.status} tone={overallTone} />
      </div>

      <div className="ks-runtime-status__grid">
        {Object.entries(status.services).map(([name, serviceStatus]) => {
          const tone = toneFromRuntimeStatus(serviceStatus);

          return (
            <SurfaceCard
              key={name}
              eyebrow="Service"
              title={SERVICE_LABELS[name] ?? name}
              description="Availability reflects the backend health contract for the current local workspace."
            >
              <StatusBadge label={serviceStatus} tone={tone} />
            </SurfaceCard>
          );
        })}
      </div>
    </section>
  );
}
