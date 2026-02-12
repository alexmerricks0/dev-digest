interface HeadlineProps {
  headline?: string;
  date?: string;
  filteredCount?: number;
  loading?: boolean;
}

export function Headline({ headline, date, filteredCount, loading }: HeadlineProps) {
  if (loading) {
    return (
      <div className="mb-8 py-8">
        <div className="h-4 w-32 bg-surface-raised rounded animate-pulse mb-4" />
        <div className="h-8 w-3/4 bg-surface-raised rounded animate-pulse mb-3" />
        <div className="h-5 w-1/3 bg-surface-raised rounded animate-pulse" />
      </div>
    );
  }

  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="mb-8 py-8">
      <div className="flex items-center gap-3 mb-4">
        <p className="font-mono text-xs text-accent tracking-widest uppercase">
          {formattedDate}
        </p>
        {filteredCount !== undefined && filteredCount > 0 && (
          <span className="font-mono text-xs text-text-dim">
            {filteredCount} stories filtered as noise
          </span>
        )}
      </div>
      <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
        {headline}
      </h1>
    </div>
  );
}
