interface SegmentItem {
  name: string;
  detail: string;
  opportunity: string;
}

export default function SegmentHighlights({
  segments,
}: {
  segments: SegmentItem[];
}) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Priority Customer Segments</h3>
      <p className="section-subtitle">
        Target segments and opportunity sizing for Mainland Truck & Trailer Sales &
        Leasing.
      </p>
      <div style={{ marginTop: "16px" }}>
        {segments.map((segment) => (
          <article key={segment.name} className="segment-item">
            <span className="segment-name">{segment.name}</span>
            <span className="segment-detail">{segment.detail}</span>
            <span className="segment-opportunity">{segment.opportunity}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
