interface RevenueStream {
  name: string;
  description: string;
  driver: string;
}

export default function RevenueStreams({ streams }: { streams: RevenueStream[] }) {
  return (
    <section className="card" style={{ padding: "24px", marginTop: "24px" }}>
      <h3 className="section-title">Revenue Streams</h3>
      <p className="section-subtitle">
        Core revenue engines and the primary drivers behind each stream.
      </p>
      <div style={{ marginTop: "16px" }}>
        {streams.map((stream) => (
          <article key={stream.name} className="stream-item">
            <span className="stream-name">{stream.name}</span>
            <span className="stream-description">{stream.description}</span>
            <span className="stream-driver">{stream.driver}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
