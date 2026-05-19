import {
  AIInsightBadge,
  AppShell,
  ContentState,
  MetricGroup,
  ProgressTrajectory,
  RadarContainer,
  StatusBadge,
  SurfaceCard,
  ThemeToggle,
  TrendContainer,
  WorkspaceStatus,
} from "../components/system";
import { getRuntimeStatus } from "../lib/api-client";

export const dynamic = "force-dynamic";

const workspaceHighlights = [
  {
    eyebrow: "System posture",
    title: "Consistent analytical shell",
    description:
      "One navigation rail, one header contract, and one content frame for future investor demos and design-partner flows.",
    tone: "neutral" as const,
    badge: { label: "MVP", tone: "success" as const },
  },
  {
    eyebrow: "Theme parity",
    title: "Dark-first, light-ready",
    description:
      "Shared semantic tokens preserve hierarchy, severity, and AI markers across both presentation modes.",
    tone: "ai" as const,
    badge: { label: "Dual mode", tone: "ai" as const },
  },
  {
    eyebrow: "Extension seam",
    title: "Reusable component language",
    description:
      "Cards, status surfaces, and chart containers can expand later screens without one-off page styling.",
    tone: "neutral" as const,
    badge: { label: "Reusable", tone: "neutral" as const },
  },
];

const executionMetrics = [
  {
    label: "Shell coverage",
    value: "3 regions",
    detail: "Navigation, header, and content frame now share one layout contract.",
    accent: <AIInsightBadge label="Hierarchy stable" />,
  },
  {
    label: "Theme support",
    value: "2 modes",
    detail: "Dark-first tokens render with equivalent semantic meaning in light mode.",
  },
  {
    label: "Shared primitives",
    value: "8 patterns",
    detail: "Cards, states, and analytical containers are ready for later screens.",
  },
];

const trendPoints = [
  { label: "Tokens", value: 52 },
  { label: "Shell", value: 74 },
  { label: "Parity", value: 66 },
  { label: "Reuse", value: 81 },
];

const radarMetrics = [
  { label: "Readability", value: 92 },
  { label: "Density", value: 84 },
  { label: "Trust cues", value: 79 },
  { label: "Extensibility", value: 88 },
];

const rolloutSteps = [
  { label: "Token system", value: 100 },
  { label: "Shell baseline", value: 100 },
  { label: "Theme controls", value: 100 },
  { label: "Pattern catalog", value: 82 },
];

export default async function HomePage() {
  const status = await getRuntimeStatus();

  return (
    <AppShell
      eyebrow="AI Risk Analysis"
      title="Operational clarity for engineering leadership"
      description="A shared shell for status, trust, and analytical views before Keystone expands into onboarding, ingestion, and audit workflows."
      actions={
        <>
          <StatusBadge label="Dark-first foundation" tone="ai" />
          <ThemeToggle />
        </>
      }
    >
      <section className="ks-dashboard-grid">
        {workspaceHighlights.map((highlight) => (
          <SurfaceCard
            key={highlight.title}
            eyebrow={highlight.eyebrow}
            title={highlight.title}
            description={highlight.description}
            tone={highlight.tone}
          >
            <StatusBadge label={highlight.badge.label} tone={highlight.badge.tone} />
          </SurfaceCard>
        ))}
      </section>

      <section className="ks-page-section">
        <MetricGroup title="Foundation metrics" metrics={executionMetrics} />
      </section>

      <section className="ks-analytics-grid">
        <TrendContainer
          title="Adoption trajectory"
          subtitle="Shared UI decisions are now concentrated into one tokenized shell rather than scattered page-level styling."
          points={trendPoints}
        />
        <RadarContainer title="Foundation quality" metrics={radarMetrics} />
        <ProgressTrajectory title="Rollout runway" steps={rolloutSteps} />
      </section>

      <section className="ks-page-section">
        <ContentState
          title="Trust-sensitive visuals stay reviewable"
          description="Severity states, AI-assisted markers, and runtime degradation paths now have one shared presentation seam for later audit and trust workflows."
          tone={status.status === "ready" ? "success" : "warning"}
          action={<AIInsightBadge label="AI-assisted cues unified" />}
        />
      </section>

      <WorkspaceStatus status={status} />
    </AppShell>
  );
}
