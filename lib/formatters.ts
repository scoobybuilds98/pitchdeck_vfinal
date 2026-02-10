import type { ProjectionMetric } from "./types";

export function formatMetricValue(
  value: number | null,
  format: ProjectionMetric["format"],
  currency = "USD"
) {
  if (value === null || Number.isNaN(value)) {
    return "—";
  }

  switch (format) {
    case "currency":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(value);
    case "percentage":
      return `${value}%`;
    default:
      return new Intl.NumberFormat("en-US").format(value);
  }
}
