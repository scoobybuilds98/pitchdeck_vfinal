import Link from "next/link";
import { businessRegistry } from "../../data/businesses/registry";

export default function BusinessTabs({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="nav-shell">
      <div className="nav-inner">
        <div className="tab-row">
          {businessRegistry.map((business) => (
            <Link
              key={business.slug}
              href={`/business/${business.slug}`}
              className={`tab ${business.slug === activeSlug ? "active" : ""}`}
            >
              {business.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
