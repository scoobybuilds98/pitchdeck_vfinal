interface ScenarioOption {
  id: string;
  label: string;
  description: string;
}

export default function ScenarioSelector({
  scenarios,
}: {
  scenarios: ScenarioOption[];
}) {
  return (
    <section className="card" style={{ padding: "24px", marginBottom: "24px" }}>
      <h3 className="section-title">Scenario Planning</h3>
      <p className="section-subtitle">
        Select a scenario to view assumptions and projections aligned to different
        operating cases.
      </p>
      <div className="scenario-grid" style={{ marginTop: "16px" }}>
        {scenarios.map((scenario) => (
          <article key={scenario.id} className="scenario-card">
            <span className="scenario-label">{scenario.label}</span>
            <span className="scenario-detail">{scenario.description}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
