import type { ProjectionMetric } from "../../lib/types";

function normalize(values: number[], height: number) {
  const max = Math.max(...values, 1);
  return values.map((value) => height - (value / max) * height);
}

function buildPolyline(values: number[], width: number, height: number) {
  if (values.length === 0) {
    return "";
  }
  const step = values.length > 1 ? width / (values.length - 1) : width;
  const normalized = normalize(values, height);
  return normalized
    .map((value, index) => `${index * step},${value}`)
    .join(" ");
}

export default function ChartPreview({
  metrics,
  width = 240,
  height = 80,
}: {
  metrics: ProjectionMetric[];
  width?: number;
  height?: number;
}) {
  const series = metrics.map((metric) => metric.values);

  if (series.length === 0 || series.every((values) => values.length === 0)) {
    return (
      <div className="chart-preview empty">No data</div>
    );
  }

  return (
    <div className="chart-preview">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {series.map((values, index) => (
          <polyline
            key={`${metrics[index]?.id ?? index}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            points={buildPolyline(values, width, height)}
            opacity={series.length > 1 ? 0.6 : 1}
          />
        ))}
      </svg>
    </div>
  );
}
