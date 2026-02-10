import { businessRegistry } from "../../../data/businesses/registry";
import BusinessTabs from "../../../components/layout/BusinessTabs";
import SubNav from "../../../components/layout/SubNav";

export default function BusinessLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const business = businessRegistry.find((item) => item.slug === params.slug);

  // Registry-driven layout ensures consistent navigation across businesses.
  return (
    <div>
      <BusinessTabs activeSlug={params.slug} />
      {business ? (
        <SubNav basePath={`/business/${business.slug}`} sections={business.sections} />
      ) : null}
      {children}
    </div>
  );
}
