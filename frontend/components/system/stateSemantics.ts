export type SemanticTone = "neutral" | "success" | "warning" | "critical" | "ai";

export type SemanticTokenSet = {
  badgeBackground: string;
  badgeForeground: string;
  panelBackground: string;
  panelBorder: string;
};

export const semanticTokenSets: Record<SemanticTone, SemanticTokenSet> = {
  neutral: {
    badgeBackground: "var(--ks-surface-muted)",
    badgeForeground: "var(--ks-text-secondary)",
    panelBackground: "var(--ks-surface-container)",
    panelBorder: "var(--ks-border-subtle)",
  },
  success: {
    badgeBackground: "color-mix(in srgb, var(--ks-success) 18%, transparent)",
    badgeForeground: "var(--ks-success)",
    panelBackground: "color-mix(in srgb, var(--ks-success) 10%, var(--ks-surface-container))",
    panelBorder: "color-mix(in srgb, var(--ks-success) 28%, transparent)",
  },
  warning: {
    badgeBackground: "color-mix(in srgb, var(--ks-warning) 18%, transparent)",
    badgeForeground: "var(--ks-warning)",
    panelBackground: "color-mix(in srgb, var(--ks-warning) 10%, var(--ks-surface-container))",
    panelBorder: "color-mix(in srgb, var(--ks-warning) 28%, transparent)",
  },
  critical: {
    badgeBackground: "color-mix(in srgb, var(--ks-critical) 18%, transparent)",
    badgeForeground: "var(--ks-critical)",
    panelBackground: "color-mix(in srgb, var(--ks-critical) 10%, var(--ks-surface-container))",
    panelBorder: "color-mix(in srgb, var(--ks-critical) 28%, transparent)",
  },
  ai: {
    badgeBackground:
      "linear-gradient(135deg, var(--ks-ai-accent-start), var(--ks-ai-accent-end))",
    badgeForeground: "var(--ks-text-primary)",
    panelBackground:
      "linear-gradient(135deg, color-mix(in srgb, var(--ks-primary) 14%, var(--ks-surface-container)), color-mix(in srgb, #6750a4 10%, var(--ks-surface-container)))",
    panelBorder: "color-mix(in srgb, var(--ks-primary) 24%, transparent)",
  },
};

export function toneFromRuntimeStatus(status: "ready" | "degraded"): SemanticTone {
  return status === "ready" ? "success" : "warning";
}