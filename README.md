# Dev Digest

AI-curated daily developer news digest. Every morning at 08:00 UTC, a Cloudflare Worker aggregates stories from three sources, sends them to Claude for ruthless curation, and publishes a 2-minute morning read.

**Live:** [digest.lfxai.dev](https://digest.lfxai.dev)
**RSS:** [Subscribe](https://dev-digest-worker.alexmerricks.workers.dev/api/rss)

## Architecture

```
Cron (08:00 UTC) → Worker → HN + Reddit + GitHub Releases → Claude Haiku → D1
                   Worker → API + RSS feed → Dashboard (Pages)
```

## Data Sources

- **Hacker News** — Top 30 stories from the developer community
- **Reddit** — r/programming top daily posts
- **GitHub Releases** — New versions of React, Node.js, Deno, Bun, Rust, Go, Next.js, Svelte, Vue, Astro

## Stack

- **Runtime:** Cloudflare Workers (cron-triggered)
- **Database:** Cloudflare D1
- **Frontend:** React + TypeScript on Cloudflare Pages
- **AI:** Claude Haiku via OpenRouter
- **Feed:** Atom/RSS

## API

| Endpoint | Description |
|---|---|
| `GET /api/today` | Latest digest |
| `GET /api/date/:date` | Digest by date (YYYY-MM-DD) |
| `GET /api/history?days=30` | Past digest summaries |
| `GET /api/rss` | Atom RSS feed (last 7 days) |
| `GET /api/health` | Health check |

## Local Development

```bash
# Worker
cd worker
cp .dev.vars.example .dev.vars  # Add OPENROUTER_API_KEY
npm install
npm run dev

# Dashboard
cd dashboard
npm install
npm run dev
```

## License

MIT
