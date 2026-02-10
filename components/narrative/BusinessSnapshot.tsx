interface SnapshotItem {
  label: string;
  value: string;
}

export default function BusinessSnapshot({
  items,
}: {
  items: SnapshotItem[];
}) {
  return (
    <div className="snapshot-grid">
      {items.map((item) => (
        <article key={item.label} className="card snapshot-card">
          <span className="snapshot-label">{item.label}</span>
          <span className="snapshot-value">{item.value}</span>
        </article>
      ))}
    </div>
  );
}
