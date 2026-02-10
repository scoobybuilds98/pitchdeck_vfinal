import Link from "next/link";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="nav-shell">
        <div className="nav-inner">
          <div className="nav-top">
            <Link href="/" className="brand">
              PitchDeck Studio
            </Link>
            <span className="badge">Production-grade</span>
          </div>
        </div>
      </header>
      {children}
      <footer className="footer">© 2025 PitchDeck Studio. All rights reserved.</footer>
    </div>
  );
}
