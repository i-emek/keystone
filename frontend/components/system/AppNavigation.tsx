import React from "react";

type AppNavigationItem = {
  label: string;
  href: string;
  badge?: string;
  current?: boolean;
};

const PRIMARY_ITEMS: AppNavigationItem[] = [
  { label: "Workspace", href: "#workspace", current: true },
  { label: "Insights", href: "#insights", badge: "Soon" },
  { label: "Trust Review", href: "#trust-review", badge: "Soon" },
  { label: "Admin", href: "#admin", badge: "Soon" },
];

export function AppNavigation() {
  return (
    <nav className="ks-shell-nav" aria-label="Primary">
      <div>
        <p className="ks-shell-nav__eyebrow">Keystone</p>
        <h2 className="ks-shell-nav__title">Engineering Intelligence</h2>
        <p className="ks-shell-nav__description">
          Shared workspace surfaces for resilient engineering leadership.
        </p>
      </div>

      <div className="ks-shell-nav__group">
        {PRIMARY_ITEMS.map((item) => (
          <a
            key={item.label}
            className={`ks-shell-nav__item ks-focus-ring${item.current ? " is-current" : ""}`}
            href={item.href}
          >
            <span>{item.label}</span>
            {item.badge ? <span className="ks-shell-nav__badge">{item.badge}</span> : null}
          </a>
        ))}
      </div>
    </nav>
  );
}