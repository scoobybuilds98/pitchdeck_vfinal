interface MetricItem {
  label: string;
  value: string;
  caption?: string;
}

export default function MetricHighlights({ items }: { items: MetricItem[] }) {
  return (
    <div className="metric-grid">
      {items.map((item) => (
        <article key={item.label} className="card metric-card">
          <span className="metric-label">{item.label}</span>
          <span className="metric-value">{item.value}</span>
          {item.caption ? (
            <span className="metric-caption">{item.caption}</span>
          ) : null}
        </article>
      ))}
    </div>
  );
}
