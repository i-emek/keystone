import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Keystone Local Workspace",
  description: "Local-first monorepo foundation for the Keystone MVP.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#f5f7fb",
          color: "#14213d",
        }}
      >
        {children}
      </body>
    </html>
  );
}
