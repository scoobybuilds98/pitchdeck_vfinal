interface TimelineItem {
  quarter: string;
  title: string;
  detail: string;
}

export default function ExecutionTimeline({
  items,
}: {
  items: TimelineItem[];
}) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Execution Timeline</h3>
      <p className="section-subtitle">
        Key operational milestones aligned to the plan for Mainland Truck & Trailer
        Sales & Leasing.
      </p>
      <div className="timeline" style={{ marginTop: "16px" }}>
        {items.map((item) => (
          <article key={item.title} className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <span className="timeline-quarter">{item.quarter}</span>
              <span className="timeline-title">{item.title}</span>
              <span className="timeline-detail">{item.detail}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
