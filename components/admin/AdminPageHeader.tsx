interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
}

export function AdminPageHeader({ title, description, actionLabel }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-primary uppercase">
          {title}
        </h1>
        {description && <p className="text-muted mt-2 max-w-3xl">{description}</p>}
      </div>
      {actionLabel && (
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
