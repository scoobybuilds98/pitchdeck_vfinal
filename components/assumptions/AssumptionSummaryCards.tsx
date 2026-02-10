interface SummaryCard {
  label: string;
  value: string;
  detail: string;
}

export default function AssumptionSummaryCards({
  items,
}: {
  items: SummaryCard[];
}) {
  return (
    <section className="summary-grid">
      {items.map((item) => (
        <article key={item.label} className="card summary-card">
          <span className="summary-label">{item.label}</span>
          <span className="summary-value">{item.value}</span>
          <span className="summary-detail">{item.detail}</span>
        </article>
      ))}
    </section>
  );
}
