interface AdminTableProps {
  title: string;
  columns: string[];
  rows: Array<Record<string, string | number>>;
}

export function AdminTable({ title, columns, rows }: AdminTableProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface shadow-sm overflow-hidden">
      <header className="border-b border-border bg-surface-alt px-5 py-4">
        <h2 className="font-[var(--font-heading)] text-xl font-bold text-primary uppercase">{title}</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-alt/70 text-left">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-3 font-semibold text-foreground whitespace-nowrap">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-t border-border-light">
                {columns.map((column) => (
                  <td key={column} className="px-5 py-3 text-muted whitespace-nowrap">
                    {row[column] ?? '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
