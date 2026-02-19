import { NewsletterSignup } from './NewsletterSignup';

export function About() {
  return (
    <div className="py-8 max-w-2xl">
      <h2 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-6 flex items-center gap-3">
        About
        <span className="flex-1 h-px bg-border" />
      </h2>

      <p className="text-lg text-text leading-relaxed font-light mb-6">
        <strong className="text-white font-medium">Dev Digest</strong> is an
        AI-curated daily developer news digest. Every morning at 08:00 UTC,
        a Cloudflare Worker aggregates stories from three sources, sends them to
        Claude for ruthless curation, and publishes a 2-minute morning read.
      </p>

      <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4 mt-8">
        Data Sources
      </h3>

      <div className="space-y-4 mb-8">
        {[
          { name: 'Hacker News', desc: 'Top 30 stories — the developer community pulse', color: 'text-orange-400' },
          { name: 'Reddit', desc: 'r/programming top daily posts — broader dev discussions', color: 'text-blue-400' },
          { name: 'GitHub Releases', desc: 'New versions of React, Node, Deno, Bun, Rust, Go, and more', color: 'text-purple-400' },
        ].map((source) => (
          <div key={source.name} className="flex gap-3">
            <span className={`font-mono text-xs font-medium flex-shrink-0 mt-0.5 ${source.color}`}>
              {source.name}
            </span>
            <span className="text-sm text-text-secondary">{source.desc}</span>
          </div>
        ))}
      </div>

      <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4 mt-8">
        Subscribe via RSS
      </h3>

      <p className="text-sm text-text-secondary mb-4">
        Add the feed to your reader and get the digest delivered daily without visiting the site.
      </p>

      <a
        href="https://dev-digest-worker.alexmerricks.workers.dev/api/rss"
        className="inline-flex items-center gap-2 bg-accent-soft border border-accent/20 rounded-lg px-4 py-2 font-mono text-xs text-accent hover:bg-accent/20 transition-colors"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1Z" />
        </svg>
        Subscribe to RSS Feed
      </a>

      <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4 mt-8">
        Weekly Newsletter
      </h3>

      <p className="text-sm text-text-secondary mb-2">
        Get the week's best stories delivered to your inbox every Monday morning.
      </p>

      <NewsletterSignup />

      <h3 className="font-mono text-xs uppercase tracking-widest text-text-dim mb-4 mt-8">
        How it works
      </h3>

      <ol className="space-y-3 mb-8">
        {[
          'Cron trigger fires daily at 08:00 UTC',
          'Worker fetches from Hacker News, Reddit, and GitHub in parallel',
          'Claude Haiku curates: 3 must-reads, 5-7 worth-knowing, filters noise',
          'Digest is stored in Cloudflare D1',
          'Dashboard and RSS feed serve the curated content',
        ].map((step, i) => (
          <li key={i} className="flex gap-3 text-text-secondary">
            <span className="font-mono text-xs text-accent flex-shrink-0 mt-0.5">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm">{step}</span>
          </li>
        ))}
      </ol>

      <div className="border-t border-border pt-6 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-text-dim mb-1">Stack</dt>
          <dd className="text-sm text-text-secondary">
            Cloudflare Workers, D1, Pages, React, TypeScript
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-text-dim mb-1">AI</dt>
          <dd className="text-sm text-text-secondary">Claude Haiku via OpenRouter</dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-widest text-text-dim mb-1">Source</dt>
          <dd className="text-sm text-text-secondary">
            <a
              href="https://github.com/alexmerricks0/dev-digest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>
          </dd>
        </div>
      </div>
    </div>
  );
}
