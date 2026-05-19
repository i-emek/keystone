import { WorkspaceStatus } from "../components/system/WorkspaceStatus";
import { getRuntimeStatus } from "../lib/api-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const status = await getRuntimeStatus();

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px" }}>
      <section style={{ marginBottom: 32 }}>
        <p
          style={{
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            color: "#5c677d",
          }}
        >
          Keystone
        </p>
        <h1 style={{ margin: "12px 0", fontSize: "2.5rem" }}>
          Local Workspace Foundation
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 720,
            lineHeight: 1.6,
            color: "#33415c",
          }}
        >
          This workspace confirms the frontend, backend, and worker can run
          together against MiniStack-backed object storage and an
          ElasticMQ-backed queue before the product moves to AWS.
        </p>
      </section>
      <WorkspaceStatus status={status} />
    </main>
  );
}
