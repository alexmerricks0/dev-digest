# Dev Digest — Implementation Plan

## Overview

AI-curated daily developer news digest. A Cloudflare Worker runs on a cron schedule, aggregates top stories from HN, Reddit r/programming, and major release feeds, sends to Claude for ranking and summarization, stores in D1, and serves a public dashboard with optional RSS feed.

## Architecture

```
┌──────────────────────────────────────────────────────┐
│  Cloudflare Worker (dev-digest-worker)                │
│                                                       │
│  Cron Trigger (08:00 UTC daily)                       │
│    ├── 1. Fetch HN top 30 stories                     │
│    ├── 2. Fetch Reddit r/programming top posts         │
│    ├── 3. Fetch major framework release feeds          │
│    ├── 4. Send to Claude Haiku for curation            │
│    ├── 5. Store curated digest in D1                   │
│    └── 6. Done                                        │
│                                                       │
│  API Routes                                           │
│    ├── GET /api/today        → today's digest         │
│    ├── GET /api/history      → past 30 days           │
│    ├── GET /api/rss          → RSS feed               │
│    └── GET /api/health       → health check           │
└──────────────────────────────────────────────────────┘
```

## Data Sources

| Source | API | What We Get |
|--------|-----|-------------|
| Hacker News | Firebase API | Top 30 stories with scores |
| Reddit | `https://www.reddit.com/r/programming/top.json?t=day` | Top daily posts |
| Release feeds | GitHub releases API for major repos | React, Node, Deno, Bun, Rust, Go, etc. |

## Claude Prompt

```
You are a senior developer curator. Given today's stories from HN, Reddit, and
release feeds, produce a 2-minute morning digest for developers.

Output JSON:
- headline: one-sentence summary of the day
- must_read: top 3 stories every developer should see (title, source, url, 2-sentence summary, why it matters)
- worth_knowing: 5-7 additional stories (title, source, url, one-line summary)
- releases: any notable framework/language releases
- skip: stories that are noise (don't include, just note the count filtered)
```

## D1 Schema

```sql
CREATE TABLE IF NOT EXISTS daily_digests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  sources_data TEXT NOT NULL,
  digest TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'haiku',
  tokens_used INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

## Dashboard Sections

1. **Header** — "Dev Digest" + date + RSS link
2. **Today's Headline** — AI-generated one-liner
3. **Must Read** — Top 3 stories with 2-sentence summaries
4. **Worth Knowing** — Quick-scan list
5. **Releases** — Framework/language updates
6. **Archive** — Browse past days
7. **RSS Feed** — `/api/rss` for subscribers

## Differentiator: RSS Feed

Unlike the other two, Dev Digest outputs an RSS feed so people can subscribe in their reader. This makes it sticky — once someone adds it, they get daily value without visiting the site.

## Cost: ~$0.15/month (same pattern)

## Build After: ai-pulse (clone the architecture)
