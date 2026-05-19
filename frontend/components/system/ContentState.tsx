import React from "react";
import type { ReactNode } from "react";

import { StatusBadge } from "./StatusBadge";
import type { SemanticTone } from "./stateSemantics";

type ContentStateProps = {
  title: string;
  description: string;
  tone?: SemanticTone;
  action?: ReactNode;
};

export function ContentState({
  title,
  description,
  tone = "neutral",
  action,
}: ContentStateProps) {
  return (
    <section className="ks-content-state">
      <div>
        <StatusBadge label={tone} tone={tone} />
        <h3 className="ks-content-state__title">{title}</h3>
        <p className="ks-content-state__description">{description}</p>
      </div>
      {action ? <div className="ks-content-state__action">{action}</div> : null}
    </section>
  );
}