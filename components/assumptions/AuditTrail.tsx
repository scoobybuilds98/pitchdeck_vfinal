import type { AssumptionAuditEntry } from "../../lib/types";

export default function AuditTrail({ entries }: { entries: AssumptionAuditEntry[] }) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Assumption Audit Trail</h3>
      <p className="section-subtitle">
        Capture when assumptions change, who approved them, and the rationale behind
        adjustments.
      </p>
      <div style={{ marginTop: "16px" }}>
        {entries.map((entry) => (
          <article key={`${entry.date}-${entry.author}`} className="audit-item">
            <div className="audit-meta">
              <span className="audit-date">{entry.date}</span>
              <span className="audit-author">{entry.author}</span>
            </div>
            <div className="audit-change">{entry.change}</div>
            <div className="audit-rationale">{entry.rationale}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
