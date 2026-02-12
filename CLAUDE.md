# CLAUDE.md — Dev Digest

## Project Overview

AI-curated daily developer news digest. A Cloudflare Worker runs daily via Cron Trigger, aggregates top stories from Hacker News, Reddit r/programming, and major release feeds, sends to Claude for ranking and summarization, stores in D1, and serves a public dashboard via Cloudflare Pages.

**Live at:** `digest.lfxai.dev`

## Architecture

```
Cron Trigger (daily) → Worker → HN API / Reddit / Feeds → Claude API → D1 → Dashboard (Pages)
```

### Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Worker | `worker/` | Cron-triggered agent: fetches dev news sources, calls Claude for curation, stores in D1, serves API |
| Dashboard | `dashboard/` | React frontend displaying daily curated digest |
| Schema | `schema.sql` | D1 database schema |

## Tech Stack

- **Cloudflare Workers** — Cron Trigger + API
- **Cloudflare D1** — SQLite storage for daily digests
- **Cloudflare Pages** — Dashboard hosting
- **Claude API** — AI curation and summarization (Haiku for cost efficiency)
- **React + Vite + TypeScript** — Frontend
- **Tailwind CSS** — Styling

## Key Facts

- **Repo:** `~/Business/dev-digest/`
- **GitHub:** `alexmerricks0/dev-digest` (public)
- **Hosting:** Cloudflare Pages + Workers
- **Domain:** `digest.lfxai.dev`
- **Cron Schedule:** Daily at 08:00 UTC
- **License:** MIT

## Design System

Matches lfxai.dev:
- Background: `#0a0a0a`
- Accent: `#c9a227`
- Fonts: Bricolage Grotesque / DM Sans / JetBrains Mono

## Important Notes

- Claude API key stored via `wrangler secret put ANTHROPIC_API_KEY`
- Use Haiku model to minimize API costs
- All data is public — no auth required on dashboard
- News sources: HN API (free), Reddit JSON API (free), RSS feeds (free)
- CORS should allow the Pages domain
- RSS feed output for subscribers
