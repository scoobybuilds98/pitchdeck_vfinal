import Link from "next/link";

interface SectionLink {
  slug: string;
  label: string;
  description: string;
}

export default function SubNav({
  sections,
  basePath,
}: {
  sections: SectionLink[];
  basePath: string;
}) {
  return (
    <div className="nav-shell" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="nav-inner">
        {/* Section tabs for the active business. */}
        <nav className="subnav">
          {sections.map((section) => (
            <Link key={section.slug} href={`${basePath}/${section.slug}`}>
              {section.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
