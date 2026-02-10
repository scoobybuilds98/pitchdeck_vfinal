import type { ChartConfig } from "../../lib/chartsData";

const chartTypeLabels: Record<string, string> = {
  line: "Line",
  bar: "Bar",
  stacked: "Stacked",
  pie: "Pie",
};

export default function ChartDefinitionsTable({
  charts,
}: {
  charts: ChartConfig[];
}) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Chart Definitions</h3>
      <p className="section-subtitle">
        Review the chart registry driving this section. These definitions map to the
        charts data schema and can be expanded with annotations and scenarios.
      </p>
      <div style={{ overflowX: "auto", marginTop: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>Chart</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Type</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Metrics</th>
              <th style={{ textAlign: "left", padding: "12px" }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {charts.map((chart) => (
              <tr key={chart.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>{chart.title}</td>
                <td style={{ padding: "12px" }}>
                  {chartTypeLabels[chart.type] ?? chart.type}
                </td>
                <td style={{ padding: "12px" }}>{chart.metrics.join(", ")}</td>
                <td style={{ padding: "12px" }}>
                  {chart.notes ? chart.notes : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
