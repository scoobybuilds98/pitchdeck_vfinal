import type { AssumptionItem } from "../../lib/types";

export default function AssumptionTable({ items }: { items: AssumptionItem[] }) {
  return (
    <div className="card" style={{ padding: "24px" }}>
      <h2 className="section-title">Assumption Register</h2>
      <p className="section-subtitle">
        Review and validate the core assumptions that drive the financial model.
        These will become editable inputs once the projection engine is live.
      </p>
      <div style={{ overflowX: "auto", marginTop: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>Category</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Assumption</th>
              <th style={{ textAlign: "right", padding: "12px" }}>Value</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>{item.category}</td>
                <td style={{ padding: "12px" }}>{item.label}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {item.value} {item.unit}
                </td>
                <td style={{ padding: "12px" }}>{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
