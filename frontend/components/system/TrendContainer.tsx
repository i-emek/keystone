import React from "react";

type TrendPoint = {
  label: string;
  value: number;
};

type TrendContainerProps = {
  title: string;
  subtitle: string;
  points: TrendPoint[];
};

export function TrendContainer({ title, subtitle, points }: TrendContainerProps) {
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  return (
    <section aria-label={title} className="ks-viz-card ks-viz-card--trend">
      <div className="ks-viz-card__header">
        <h3 className="ks-viz-card__title">{title}</h3>
        <p className="ks-viz-card__subtitle">{subtitle}</p>
      </div>
      <div className="ks-trend-chart" aria-hidden="true">
        {points.map((point) => (
          <div key={point.label} className="ks-trend-chart__column">
            <div
              className="ks-trend-chart__bar"
              style={{ height: `${Math.max(18, (point.value / maxValue) * 100)}%` }}
            />
            <span className="ks-trend-chart__label">{point.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}