import React from "react";
import { semanticTokenSets, type SemanticTone } from "./stateSemantics";

type StatusBadgeProps = {
  label: string;
  tone?: SemanticTone;
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  const tokens = semanticTokenSets[tone];

  return (
    <span
      className="ks-status-badge"
      style={{
        background: tokens.badgeBackground,
        color: tokens.badgeForeground,
      }}
    >
      {label}
    </span>
  );
}