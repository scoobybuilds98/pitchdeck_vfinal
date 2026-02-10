interface MilestoneItem {
  title: string;
  detail: string;
  timing: string;
}

export default function TractionMilestones({
  items,
}: {
  items: MilestoneItem[];
}) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Milestones & Traction</h3>
      <p className="section-subtitle">
        Notable milestones and proof points that validate demand and execution.
      </p>
      <div style={{ marginTop: "16px" }}>
        {items.map((item) => (
          <article key={item.title} className="milestone-item">
            <div className="milestone-header">
              <span className="milestone-title">{item.title}</span>
              <span className="milestone-timing">{item.timing}</span>
            </div>
            <span className="milestone-detail">{item.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
