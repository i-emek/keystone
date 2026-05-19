import React from "react";
import type { RuntimeStatus } from "../../lib/api-client";

type WorkspaceStatusProps = {
  status: RuntimeStatus;
};

const SERVICE_LABELS: Record<string, string> = {
  api: "API",
  postgres: "PostgreSQL",
  objectStorage: "Object storage",
  queue: "Queue",
};

function toneForStatus(status: "ready" | "degraded") {
  return status === "ready"
    ? { bg: "#e8f5e9", fg: "#1b5e20" }
    : { bg: "#fff4e5", fg: "#9c4f00" };
}

export function WorkspaceStatus({ status }: WorkspaceStatusProps) {
  const overallTone = toneForStatus(status.status);

  return (
    <section>
      <div
        style={{
          background: overallTone.bg,
          color: overallTone.fg,
          borderRadius: 16,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <strong style={{ display: "block", marginBottom: 8 }}>
          Workspace status: {status.status}
        </strong>
        <span>{status.message}</span>
      </div>

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        {Object.entries(status.services).map(([name, serviceStatus]) => {
          const tone = toneForStatus(serviceStatus);

          return (
            <article
              key={name}
              style={{
                background: "white",
                borderRadius: 16,
                padding: 20,
                boxShadow: "0 12px 32px rgba(20, 33, 61, 0.08)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  textTransform: "uppercase",
                  letterSpacing: 1.1,
                  color: "#5c677d",
                }}
              >
                {SERVICE_LABELS[name] ?? name}
              </div>
              <div
                style={{
                  marginTop: 10,
                  display: "inline-block",
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: tone.bg,
                  color: tone.fg,
                  fontWeight: 600,
                }}
              >
                {serviceStatus}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
