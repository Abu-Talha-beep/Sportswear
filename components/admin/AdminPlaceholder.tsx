import Link from 'next/link';

interface AdminPlaceholderProps {
  title: string;
  summary: string;
  nextSteps: string[];
}

export function AdminPlaceholder({ title, summary, nextSteps }: AdminPlaceholderProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h1 className="font-[var(--font-heading)] text-3xl font-bold text-primary uppercase">{title}</h1>
        <p className="mt-2 text-muted max-w-3xl">{summary}</p>
      </div>
      <div className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">Suggested Next Steps</h2>
        <ul className="mt-4 list-disc list-inside space-y-2 text-muted">
          {nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <Link
          href="/admin"
          className="mt-5 inline-flex rounded-xl border border-border bg-surface-alt px-4 py-2 text-sm font-semibold text-foreground hover:bg-border-light"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
