import React from "react";

type RadarMetric = {
  label: string;
  value: number;
};

type RadarContainerProps = {
  title: string;
  metrics: RadarMetric[];
};

export function RadarContainer({ title, metrics }: RadarContainerProps) {
  return (
    <section aria-label={title} className="ks-viz-card">
      <div className="ks-viz-card__header">
        <h3 className="ks-viz-card__title">{title}</h3>
        <p className="ks-viz-card__subtitle">Multi-axis health snapshot for the current UI foundation.</p>
      </div>
      <div className="ks-radar-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="ks-radar-grid__item">
            <div className="ks-radar-grid__track">
              <div className="ks-radar-grid__fill" style={{ width: `${metric.value}%` }} />
            </div>
            <div className="ks-radar-grid__meta">
              <span>{metric.label}</span>
              <strong>{metric.value}%</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}