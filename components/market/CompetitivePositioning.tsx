interface CompetitorItem {
  name: string;
  advantage: string;
  gap: string;
}

export default function CompetitivePositioning({
  competitors,
}: {
  competitors: CompetitorItem[];
}) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Competitive Positioning</h3>
      <p className="section-subtitle">
        Competitive landscape and strategic differentiation for Mainland Truck & Trailer
        Sales & Leasing.
      </p>
      <div style={{ marginTop: "16px" }}>
        {competitors.map((competitor) => (
          <article key={competitor.name} className="competitor-item">
            <span className="competitor-name">{competitor.name}</span>
            <span className="competitor-advantage">{competitor.advantage}</span>
            <span className="competitor-gap">{competitor.gap}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
