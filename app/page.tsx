import Link from "next/link";
import { businessRegistry } from "../data/businesses/registry";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="card hero">
        <span className="badge">Interactive Pitch Deck</span>
        <h1>Investor-ready narratives with live projections.</h1>
        <p>
          Explore the active business deck, review projections, and adjust
          assumptions in real time. The platform is built to scale with new
          business modules and investment theses.
        </p>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2 className="section-title">Businesses</h2>
        <p className="section-subtitle">
          Select a business to open its complete pitch deck.
        </p>
        <div className="grid-3" style={{ marginTop: "20px" }}>
          {businessRegistry.map((business) => (
            <Link key={business.slug} href={`/business/${business.slug}`}>
              <article className="card" style={{ padding: "20px" }}>
                <span className="badge">{business.industry}</span>
                <h3 style={{ margin: "16px 0 8px" }}>{business.name}</h3>
                <p className="section-subtitle">{business.summary}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
