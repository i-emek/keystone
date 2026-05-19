import React from "react";
import type { CSSProperties, ReactNode } from "react";

type SurfaceCardProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  tone?: "neutral" | "ai";
  style?: CSSProperties;
};

export function SurfaceCard({
  eyebrow,
  title,
  description,
  children,
  tone = "neutral",
  style,
}: SurfaceCardProps) {
  return (
    <article className={`ks-surface-card${tone === "ai" ? " is-ai" : ""}`} style={style}>
      {eyebrow ? <p className="ks-surface-card__eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="ks-surface-card__title">{title}</h2> : null}
      {description ? <p className="ks-surface-card__description">{description}</p> : null}
      <div className="ks-surface-card__body">{children}</div>
    </article>
  );
}