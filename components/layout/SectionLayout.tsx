interface SectionLayoutProps {
  title: string;
  subtitle: string;
  lead: string;
  highlights: string[];
  focusAreas: Array<{ label: string; detail: string }>;
  notes: string[];
  narrativeParagraphs?: string[];
  children?: React.ReactNode;
}

// Shared narrative layout for all deck sections.
export default function SectionLayout({
  title,
  subtitle,
  lead,
  highlights,
  focusAreas,
  notes,
  narrativeParagraphs = [],
  children,
}: SectionLayoutProps) {
  return (
    <main className="page-shell">
      <section className="card hero">
        <span className="badge">Section</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>

      <section className="card" style={{ marginTop: "24px", padding: "24px" }}>
        <h2 className="section-title">Strategic Narrative</h2>
        <p className="section-subtitle" style={{ marginBottom: "16px" }}>
          {lead}
        </p>
        {narrativeParagraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="section-subtitle"
            style={{ marginBottom: "12px" }}
          >
            {paragraph}
          </p>
        ))}
        <ul className="list">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section-grid" style={{ marginTop: "24px" }}>
        {focusAreas.map((area) => (
          <article key={area.label} className="card" style={{ padding: "20px" }}>
            <h3 style={{ marginTop: 0 }}>{area.label}</h3>
            <p className="section-subtitle">{area.detail}</p>
          </article>
        ))}
      </section>

      {children ? <section style={{ marginTop: "24px" }}>{children}</section> : null}

      <section className="card" style={{ marginTop: "24px", padding: "24px" }}>
        <h2 className="section-title">Notes & Considerations</h2>
        <ul className="list">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
