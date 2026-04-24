interface AdminStatCardProps {
  label: string;
  value: string;
  delta: string;
}

export function AdminStatCard({ label, value, delta }: AdminStatCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-emerald-600">{delta}</p>
    </article>
  );
}
