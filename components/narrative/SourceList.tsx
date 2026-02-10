interface SourceItem {
  label: string;
  detail: string;
  href?: string;
}

export default function SourceList({ items }: { items: SourceItem[] }) {
  return (
    <section className="card source-card">
      <h3 className="section-title">Source Library</h3>
      <ul className="source-list">
        {items.map((item) => (
          <li key={item.label}>
            <span className="source-label">{item.label}</span>
            <span className="source-detail">
              {item.href ? (
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.detail}
                </a>
              ) : (
                item.detail
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
