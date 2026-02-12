import type { WorthKnowingItem } from '../api';

interface WorthKnowingProps {
  items: WorthKnowingItem[];
  loading?: boolean;
}

const SOURCE_LABELS: Record<string, { label: string; color: string }> = {
  hackernews: { label: 'HN', color: 'text-orange-400' },
  reddit: { label: 'Reddit', color: 'text-blue-400' },
  github: { label: 'GitHub', color: 'text-purple-400' },
};

export function WorthKnowing({ items, loading }: WorthKnowingProps) {
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4 flex items-center gap-3">
          Worth Knowing
          <span className="flex-1 h-px bg-border" />
        </h2>
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-14 bg-surface-raised rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4 flex items-center gap-3">
        Worth Knowing ({items.length})
        <span className="flex-1 h-px bg-border" />
      </h2>

      <div className="space-y-2">
        {items.map((item, i) => {
          const source = SOURCE_LABELS[item.source] || { label: item.source, color: 'text-text-dim' };

          return (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 bg-surface border border-border rounded-xl px-5 py-3 hover:border-border-accent transition-colors group"
            >
              <span className={`font-mono text-xs font-medium flex-shrink-0 mt-0.5 ${source.color}`}>
                {source.label}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-text text-sm group-hover:text-white transition-colors">
                  {item.title}
                </span>
                <span className="text-text-dim text-sm"> — {item.summary}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
