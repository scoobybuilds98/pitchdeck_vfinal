"use client";

import { useEffect, useMemo, useState } from "react";
import type { AssumptionItem } from "../../lib/types";

interface EditableAssumption extends AssumptionItem {
  draftValue: string;
}

type DraftMap = Record<string, string>;

function buildDrafts(items: AssumptionItem[]): EditableAssumption[] {
  return items.map((item) => ({
    ...item,
    draftValue: item.value.toString(),
  }));
}

function toDraftMap(drafts: EditableAssumption[]): DraftMap {
  return drafts.reduce<DraftMap>((acc, item) => {
    acc[item.id] = item.draftValue;
    return acc;
  }, {});
}

function applyDraftMap(
  items: AssumptionItem[],
  draftMap: DraftMap
): EditableAssumption[] {
  return items.map((item) => ({
    ...item,
    draftValue: draftMap[item.id] ?? item.value.toString(),
  }));
}

export default function AssumptionEditor({
  items,
  storageKey,
}: {
  items: AssumptionItem[];
  storageKey?: string;
}) {
  const baseDrafts = useMemo(() => buildDrafts(items), [items]);
  const [drafts, setDrafts] = useState<EditableAssumption[]>(baseDrafts);

  useEffect(() => {
    setDrafts(baseDrafts);
  }, [baseDrafts]);

  useEffect(() => {
    if (!storageKey) {
      return;
    }

    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as DraftMap;
      setDrafts(applyDraftMap(items, parsed));
    } catch {
      return;
    }
  }, [items, storageKey]);

  function persist(nextDrafts: EditableAssumption[]) {
    if (!storageKey) {
      return;
    }

    const payload = toDraftMap(nextDrafts);
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  }

  function updateValue(id: string, value: string) {
    setDrafts((prev) => {
      const nextDrafts = prev.map((item) =>
        item.id === id ? { ...item, draftValue: value } : item
      );
      persist(nextDrafts);
      return nextDrafts;
    });
  }

  function resetDrafts() {
    setDrafts(baseDrafts);
    if (storageKey) {
      window.localStorage.removeItem(storageKey);
    }
  }

  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <div className="card-header">
        <div>
          <h3 className="section-title">Editable Assumptions</h3>
          <p className="section-subtitle">
            Update assumption inputs locally to preview how values may change.
            Changes persist in your browser and can be reset at any time.
          </p>
        </div>
        <button type="button" className="button button--ghost" onClick={resetDrafts}>
          Reset values
        </button>
      </div>
      <div style={{ marginTop: "16px" }}>
        {drafts.map((item) => (
          <div key={item.id} className="assumption-editor-row">
            <div>
              <span className="assumption-editor-label">{item.label}</span>
              <span className="assumption-editor-meta">
                {item.category} · {item.unit}
              </span>
            </div>
            <input
              className="assumption-editor-input"
              type="number"
              inputMode="decimal"
              value={item.draftValue}
              onChange={(event) => updateValue(item.id, event.target.value)}
              aria-label={`Update ${item.label}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
