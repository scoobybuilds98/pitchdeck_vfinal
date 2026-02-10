"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  AssumptionItem,
  ProjectionData,
  ProjectionMetric,
} from "../../lib/types";
import { formatMetricValue } from "../../lib/formatters";
import ProjectionTable from "./ProjectionTable";
import ProjectionTables from "./ProjectionTables";
import type { TableConfig } from "../../lib/tablesData";

interface ScenarioOption {
  id: string;
  label: string;
  description: string;
}

interface ScenarioMetricSet {
  scenarioId: string;
  label: string;
  metrics: string[];
  drivers: string[];
}

const scenarioMetricSets: ScenarioMetricSet[] = [
  {
    scenarioId: "low",
    label: "Low Case",
    metrics: [
      "rentalRevenueLow",
      "chassisSalesLow",
      "usedSalesLow",
      "totalRevenueLow",
    ],
    drivers: ["unitVolumeLow", "avgMonthlyRateLow"],
  },
  {
    scenarioId: "high",
    label: "High Case",
    metrics: [
      "rentalRevenueHigh",
      "chassisSalesHigh",
      "usedSalesHigh",
      "totalRevenueHigh",
    ],
    drivers: ["unitVolumeHigh", "avgMonthlyRateHigh"],
  },
];

const assumptionStoragePrefix = "assumptions:";

function getAssumptionValue(
  assumptions: AssumptionItem[],
  id: string,
  fallback: number
) {
  return assumptions.find((item) => item.id === id)?.value ?? fallback;
}

function findMetric(metrics: ProjectionMetric[], id: string) {
  return metrics.find((metric) => metric.id === id);
}

function adjustForUtilization(
  data: ProjectionData,
  utilization: number
): ProjectionMetric[] {
  const multiplier = utilization / 100;
  const rentalLow = findMetric(data.metrics, "rentalRevenueLow");
  const rentalHigh = findMetric(data.metrics, "rentalRevenueHigh");
  const totalLow = findMetric(data.metrics, "totalRevenueLow");
  const totalHigh = findMetric(data.metrics, "totalRevenueHigh");

  return data.metrics.map((metric) => {
    if (metric.id === "rentalRevenueLow" && rentalLow) {
      return {
        ...metric,
        values: rentalLow.values.map((value) => value * multiplier),
      };
    }
    if (metric.id === "rentalRevenueHigh" && rentalHigh) {
      return {
        ...metric,
        values: rentalHigh.values.map((value) => value * multiplier),
      };
    }
    if (metric.id === "totalRevenueLow" && rentalLow && totalLow) {
      const adjustedRental = rentalLow.values.map((value) => value * multiplier);
      return {
        ...metric,
        values: totalLow.values.map(
          (value, index) => value - rentalLow.values[index] + adjustedRental[index]
        ),
      };
    }
    if (metric.id === "totalRevenueHigh" && rentalHigh && totalHigh) {
      const adjustedRental = rentalHigh.values.map((value) => value * multiplier);
      return {
        ...metric,
        values: totalHigh.values.map(
          (value, index) => value - rentalHigh.values[index] + adjustedRental[index]
        ),
      };
    }

    return metric;
  });
}

function buildDeltaText(base: number | undefined, adjusted: number | undefined) {
  if (!Number.isFinite(base) || !Number.isFinite(adjusted)) {
    return "TBD";
  }

  const diff = (adjusted ?? 0) - (base ?? 0);
  const sign = diff >= 0 ? "+" : "-";
  return `${sign}${Math.abs(diff).toLocaleString()}`;
}

export default function InteractiveProjectionDashboard({
  slug,
  projectionData,
  assumptions,
  tables,
  years,
}: {
  slug: string;
  projectionData: ProjectionData;
  assumptions: AssumptionItem[];
  tables: TableConfig[];
  years: number[];
}) {
  const defaultUtilization = getAssumptionValue(
    assumptions,
    "base-utilization",
    100
  );
  const [utilization, setUtilization] = useState(defaultUtilization);
  const [activeScenarioId, setActiveScenarioId] = useState(
    projectionData.scenarios[0]?.id ?? "low"
  );

  useEffect(() => {
    const stored = window.localStorage.getItem(
      `${assumptionStoragePrefix}${slug}`
    );
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Record<string, number>;
      if (Number.isFinite(parsed["base-utilization"])) {
        setUtilization(parsed["base-utilization"] as number);
      }
    } catch {
      return;
    }
  }, [slug]);

  useEffect(() => {
    const payload = { "base-utilization": utilization };
    window.localStorage.setItem(
      `${assumptionStoragePrefix}${slug}`,
      JSON.stringify(payload)
    );
  }, [slug, utilization]);

  const adjustedMetrics = useMemo(
    () => adjustForUtilization(projectionData, utilization),
    [projectionData, utilization]
  );

  const scenarioConfig =
    scenarioMetricSets.find((scenario) => scenario.scenarioId === activeScenarioId) ??
    scenarioMetricSets[0];

  const scenarioMetrics = adjustedMetrics.filter((metric) =>
    scenarioConfig.metrics.includes(metric.id)
  );

  const scenarioDrivers = projectionData.drivers.filter((driver) =>
    scenarioConfig.drivers.includes(driver.id)
  );

  const baseMetrics = projectionData.metrics;
  const adjustedTotals = {
    base: findMetric(
      baseMetrics,
      activeScenarioId === "high" ? "totalRevenueHigh" : "totalRevenueLow"
    )?.values.at(-1),
    adjusted: findMetric(
      adjustedMetrics,
      activeScenarioId === "high" ? "totalRevenueHigh" : "totalRevenueLow"
    )?.values.at(-1),
  };

  const adjustedRentalTotals = {
    base: findMetric(
      baseMetrics,
      activeScenarioId === "high" ? "rentalRevenueHigh" : "rentalRevenueLow"
    )?.values.at(-1),
    adjusted: findMetric(
      adjustedMetrics,
      activeScenarioId === "high" ? "rentalRevenueHigh" : "rentalRevenueLow"
    )?.values.at(-1),
  };

  const utilizationValue = Number.isFinite(utilization) ? utilization : 0;

  return (
    <section style={{ display: "grid", gap: "24px" }}>
      <section className="card" style={{ padding: "24px" }}>
        <h3 className="section-title">Scenario Planning</h3>
        <p className="section-subtitle">
          Select a scenario and adjust utilization to see the revenue impact on the
          projection tables.
        </p>
        <div className="scenario-grid" style={{ marginTop: "16px" }}>
          {projectionData.scenarios.map((scenario: ScenarioOption) => {
            const isActive = scenario.id === activeScenarioId;
            return (
              <button
                key={scenario.id}
                type="button"
                className={`scenario-card${isActive ? " scenario-card--active" : ""}`}
                onClick={() => setActiveScenarioId(scenario.id)}
                aria-pressed={isActive}
              >
                <span className="scenario-label">{scenario.label}</span>
                <span className="scenario-detail">{scenario.description}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card" style={{ padding: "24px" }}>
        <h3 className="section-title">Utilization Sensitivity</h3>
        <p className="section-subtitle">
          Adjust utilization to preview changes to rental revenue and total revenue.
        </p>
        <div className="assumption-editor-row" style={{ borderTop: "none" }}>
          <div>
            <span className="assumption-editor-label">Utilization rate</span>
            <span className="assumption-editor-meta">
              Base assumption: {defaultUtilization}%
            </span>
          </div>
          <input
            className="assumption-editor-input"
            type="number"
            min={0}
            max={120}
            step={1}
            value={utilizationValue}
            onChange={(event) => setUtilization(Number(event.target.value))}
            aria-label="Utilization rate"
          />
        </div>
      </section>

      <section className="card" style={{ padding: "24px" }}>
        <h3 className="section-title">Scenario Impact</h3>
        <p className="section-subtitle">
          Impact versus the base dataset for the latest forecast year.
        </p>
        <div className="metric-grid" style={{ marginTop: "16px" }}>
          <article className="metric-card">
            <span className="metric-label">Total revenue impact</span>
            <span className="metric-value">
              {formatMetricValue(
                adjustedTotals.adjusted ?? null,
                "currency",
                projectionData.currency
              )}
            </span>
            <span className="metric-detail">
              Delta vs base: {buildDeltaText(adjustedTotals.base, adjustedTotals.adjusted)}
            </span>
          </article>
          <article className="metric-card">
            <span className="metric-label">Rental revenue impact</span>
            <span className="metric-value">
              {formatMetricValue(
                adjustedRentalTotals.adjusted ?? null,
                "currency",
                projectionData.currency
              )}
            </span>
            <span className="metric-detail">
              Delta vs base: {buildDeltaText(
                adjustedRentalTotals.base,
                adjustedRentalTotals.adjusted
              )}
            </span>
          </article>
        </div>
      </section>

      <section className="card" style={{ padding: "24px" }}>
        <h3 className="section-title">Scenario Drivers</h3>
        <p className="section-subtitle">
          Drivers tied to unit volume and monthly pricing for the active scenario.
        </p>
        <div style={{ overflowX: "auto", marginTop: "16px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "12px" }}>Driver</th>
                {years.map((year) => (
                  <th key={year} style={{ textAlign: "right", padding: "12px" }}>
                    {year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scenarioDrivers.map((driver) => (
                <tr key={driver.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px" }}>{driver.label}</td>
                  {years.map((year, index) => (
                    <td
                      key={`${driver.id}-${year}`}
                      style={{ padding: "12px", textAlign: "right" }}
                    >
                      {formatMetricValue(
                        driver.values[index] ?? null,
                        driver.format,
                        projectionData.currency
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ProjectionTable
        metrics={scenarioMetrics}
        years={years}
        currency={projectionData.currency}
      />

      <ProjectionTables
        tables={tables}
        metrics={adjustedMetrics}
        years={years}
        currency={projectionData.currency}
      />
    </section>
  );
}
