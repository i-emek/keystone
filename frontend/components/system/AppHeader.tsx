import React from "react";
import type { ReactNode } from "react";

type AppHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function AppHeader({ eyebrow, title, description, actions }: AppHeaderProps) {
  return (
    <header className="ks-shell-header">
      <div>
        <p className="ks-shell-header__eyebrow">{eyebrow}</p>
        <h1 className="ks-shell-header__title">{title}</h1>
        <p className="ks-shell-header__description">{description}</p>
      </div>
      {actions ? <div className="ks-shell-header__actions">{actions}</div> : null}
    </header>
  );
}