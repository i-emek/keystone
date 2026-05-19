import React from "react";

type AIInsightBadgeProps = {
  label: string;
};

export function AIInsightBadge({ label }: AIInsightBadgeProps) {
  return (
    <span className="ks-ai-insight-badge">
      <span aria-hidden="true">✦</span>
      <span>{label}</span>
    </span>
  );
}