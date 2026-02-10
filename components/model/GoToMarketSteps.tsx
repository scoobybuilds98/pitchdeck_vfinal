interface GoToMarketStep {
  title: string;
  detail: string;
}

export default function GoToMarketSteps({ steps }: { steps: GoToMarketStep[] }) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Go-To-Market Strategy</h3>
      <p className="section-subtitle">
        Distribution, partnerships, and sales motions that fuel growth.
      </p>
      <div style={{ marginTop: "16px" }}>
        {steps.map((step, index) => (
          <article key={step.title} className="gtm-item">
            <span className="gtm-index">Step {index + 1}</span>
            <span className="gtm-title">{step.title}</span>
            <span className="gtm-detail">{step.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
