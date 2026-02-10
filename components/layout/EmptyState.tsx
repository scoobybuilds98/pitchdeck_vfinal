export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="card empty-state">
      <h3>{title}</h3>
      <p className="section-subtitle">{description}</p>
    </section>
  );
}
