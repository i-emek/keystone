import React from "react";
import type { ReactNode } from "react";

import { AppHeader } from "./AppHeader";
import { AppNavigation } from "./AppNavigation";

type AppShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AppShell({ eyebrow, title, description, actions, children }: AppShellProps) {
  return (
    <div className="ks-shell">
      <AppNavigation />
      <div className="ks-shell__main">
        <AppHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={actions}
        />
        <main className="ks-shell__content">{children}</main>
      </div>
    </div>
  );
}