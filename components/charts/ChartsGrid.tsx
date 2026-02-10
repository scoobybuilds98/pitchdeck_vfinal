import ChartPreview from "./ChartPreview";
import type { ChartConfig } from "../../lib/chartsData";
import type { ProjectionMetric } from "../../lib/types";

const chartTypeLabels: Record<string, string> = {
  line: "Line Chart",
  bar: "Bar Chart",
  stacked: "Stacked Bar",
  pie: "Pie Chart",
};

function getMetricsForChart(
  chart: ChartConfig,
  metrics: ProjectionMetric[]
) {
  return metrics.filter((metric) => chart.metrics.includes(metric.id));
}

export default function ChartsGrid({
  charts,
  metrics,
}: {
  charts: ChartConfig[];
  metrics: ProjectionMetric[];
}) {
  return (
    <section className="section-grid" style={{ marginTop: "24px" }}>
      {charts.map((chart) => (
        <article key={chart.id} className="card" style={{ padding: "20px" }}>
          <span className="badge">{chartTypeLabels[chart.type] ?? "Chart"}</span>
          <h3 style={{ margin: "16px 0 8px" }}>{chart.title}</h3>
          <p className="section-subtitle">Metrics: {chart.metrics.join(", ")}</p>
          <ChartPreview metrics={getMetricsForChart(chart, metrics)} />
          {chart.notes ? (
            <p className="section-subtitle" style={{ marginTop: "12px" }}>
              {chart.notes}
            </p>
          ) : null}
        </article>
      ))}
    </section>
  );
}
