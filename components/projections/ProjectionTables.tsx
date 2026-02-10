import type { ProjectionMetric } from "../../lib/types";
import type { TableConfig } from "../../lib/tablesData";
import { formatMetricValue } from "../../lib/formatters";

function renderTable(
  table: TableConfig,
  metrics: ProjectionMetric[],
  years: number[],
  currency: string
) {
  return (
    <article key={table.id} className="card" style={{ padding: "24px" }}>
      <h3 style={{ margin: "0 0 8px" }}>{table.title}</h3>
      {table.notes ? <p className="section-subtitle">{table.notes}</p> : null}
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
    </article>
  );
}

export default function ProjectionTables({
  tables,
  metrics,
  years,
  currency,
}: {
  tables: TableConfig[];
  metrics: ProjectionMetric[];
  years: number[];
  currency: string;
}) {
  return (
    <section className="section-grid" style={{ marginTop: "24px" }}>
      {tables.map((table) => {
        const selectedMetrics = metrics.filter((metric) =>
          table.metrics.includes(metric.id)
        );
        return renderTable(table, selectedMetrics, years, currency);
      })}
    </section>
  );
}
