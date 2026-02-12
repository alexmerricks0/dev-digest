import type { MustReadItem } from '../api';

interface MustReadProps {
  items: MustReadItem[];
  loading?: boolean;
}

const SOURCE_LABELS: Record<string, { label: string; color: string }> = {
  hackernews: { label: 'HN', color: 'text-orange-400' },
  reddit: { label: 'Reddit', color: 'text-blue-400' },
  github: { label: 'GitHub', color: 'text-purple-400' },
};

export function MustRead({ items, loading }: MustReadProps) {
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4 flex items-center gap-3">
          Must Read
          <span className="flex-1 h-px bg-border" />
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-32 bg-surface-raised rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4 flex items-center gap-3">
        Must Read
        <span className="flex-1 h-px bg-border" />
      </h2>

      <div className="space-y-4">
        {items.map((item, i) => {
          const source = SOURCE_LABELS[item.source] || { label: item.source, color: 'text-text-dim' };

          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-surface border border-border rounded-xl px-6 py-5 hover:border-accent/30 transition-colors group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-accent font-medium">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`font-mono text-xs font-medium ${source.color}`}>
                  {source.label}
                </span>
              </div>
              <h3 className="text-white text-lg font-display font-semibold group-hover:text-accent transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-text-secondary text-sm mb-2">
                {item.summary}
              </p>
              <p className="text-accent/80 text-sm italic">
                {item.why}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
