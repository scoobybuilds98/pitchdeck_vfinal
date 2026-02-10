interface LeaderProfile {
  name: string;
  role: string;
  detail: string;
}

export default function LeadershipHighlights({
  leaders,
}: {
  leaders: LeaderProfile[];
}) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Leadership Team</h3>
      <p className="section-subtitle">
        Core leadership and execution capability behind Mainland Truck & Trailer Sales &
        Leasing.
      </p>
      <div style={{ marginTop: "16px" }}>
        {leaders.map((leader) => (
          <article key={leader.name} className="leader-item">
            <span className="leader-name">{leader.name}</span>
            <span className="leader-role">{leader.role}</span>
            <span className="leader-detail">{leader.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
