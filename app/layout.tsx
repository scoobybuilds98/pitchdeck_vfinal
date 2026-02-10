import "./globals.css";
import type { Metadata } from "next";
import AppShell from "../components/layout/AppShell";

export const metadata: Metadata = {
  title: "Interactive Pitch Deck",
  description: "Multi-business pitch deck platform with interactive projections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
