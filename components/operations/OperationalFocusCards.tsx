interface FocusItem {
  label: string;
  detail: string;
}

export default function OperationalFocusCards({
  items,
}: {
  items: FocusItem[];
}) {
  return (
    <section className="summary-grid">
      {items.map((item) => (
        <article key={item.label} className="card summary-card">
          <span className="summary-label">{item.label}</span>
          <span className="summary-value">Focus</span>
          <span className="summary-detail">{item.detail}</span>
        </article>
      ))}
    </section>
  );
}
