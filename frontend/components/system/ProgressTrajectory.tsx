import React from "react";

type ProgressStep = {
  label: string;
  value: number;
};

type ProgressTrajectoryProps = {
  title: string;
  steps: ProgressStep[];
};

export function ProgressTrajectory({ title, steps }: ProgressTrajectoryProps) {
  return (
    <section aria-label={title} className="ks-viz-card">
      <div className="ks-viz-card__header">
        <h3 className="ks-viz-card__title">{title}</h3>
        <p className="ks-viz-card__subtitle">Progress-style milestones aligned with the UI foundation rollout.</p>
      </div>
      <div className="ks-progress-trajectory">
        {steps.map((step) => (
          <div key={step.label} className="ks-progress-trajectory__step">
            <div className="ks-progress-trajectory__meta">
              <span>{step.label}</span>
              <strong>{step.value}%</strong>
            </div>
            <div className="ks-progress-trajectory__track">
              <div className="ks-progress-trajectory__fill" style={{ width: `${step.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}