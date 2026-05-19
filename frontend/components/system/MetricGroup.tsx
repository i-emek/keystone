import React from "react";
import type { ReactNode } from "react";

type Metric = {
  label: string;
  value: string;
  detail?: string;
  accent?: ReactNode;
};

type MetricGroupProps = {
  title: string;
  metrics: Metric[];
};

export function MetricGroup({ title, metrics }: MetricGroupProps) {
  return (
    <section aria-label={title} className="ks-metric-group">
      <div className="ks-metric-group__header">
        <h3 className="ks-metric-group__title">{title}</h3>
      </div>
      <div className="ks-metric-group__grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="ks-metric-group__card">
            <p className="ks-metric-group__label">{metric.label}</p>
            <strong className="ks-metric-group__value">{metric.value}</strong>
            {metric.detail ? <p className="ks-metric-group__detail">{metric.detail}</p> : null}
            {metric.accent ? <div className="ks-metric-group__accent">{metric.accent}</div> : null}
          </article>
        ))}
      </div>
    </section>
  );
}