interface InsightItem {
  title: string;
  detail: string;
}

export default function ProjectionInsights({
  items,
}: {
  items: InsightItem[];
}) {
  return (
    <section className="card" style={{ padding: "24px", marginBottom: "24px" }}>
      <h3 className="section-title">Projection Insights</h3>
      <p className="section-subtitle">
        Highlights that connect assumptions to financial outcomes for investor review.
      </p>
      <div style={{ marginTop: "16px" }}>
        {items.map((item) => (
          <article key={item.title} className="insight-item">
            <span className="insight-title">{item.title}</span>
            <span className="insight-detail">{item.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
