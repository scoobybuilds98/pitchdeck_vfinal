import type { ProjectionMetric } from "../../lib/types";
import { formatMetricValue } from "../../lib/formatters";

export default function ProjectionTable({
  metrics,
  years,
  currency,
}: {
  metrics: ProjectionMetric[];
  years: number[];
  currency: string;
}) {
  return (
    <div className="card" style={{ padding: "24px" }}>
      <h2 className="section-title">Projection Summary</h2>
      <p className="section-subtitle">
        This table summarizes the core metrics for the active scenario. Populate the
        values from the projections source data to unlock charts and editing.
      </p>
      <div style={{ overflowX: "auto", marginTop: "16px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "12px" }}>Metric</th>
              {years.map((year) => (
                <th key={year} style={{ textAlign: "right", padding: "12px" }}>
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "12px" }}>{metric.label}</td>
                {years.map((year, index) => (
                  <td key={`${metric.id}-${year}`} style={{ padding: "12px", textAlign: "right" }}>
                    {formatMetricValue(metric.values[index] ?? null, metric.format, currency)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
