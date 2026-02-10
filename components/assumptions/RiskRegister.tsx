import type { RiskItem } from "../../lib/types";

export default function RiskRegister({ risks }: { risks: RiskItem[] }) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Risk Register</h3>
      <p className="section-subtitle">
        Track active risks alongside mitigation actions to keep the plan investor-ready.
      </p>
      <div style={{ marginTop: "16px" }}>
        {risks.map((risk) => (
          <article key={risk.id} className="risk-item">
            <span className="risk-label">{risk.label}</span>
            <span className="risk-mitigation">{risk.mitigation}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
