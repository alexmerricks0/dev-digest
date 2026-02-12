-- Dev Digest D1 Schema

CREATE TABLE IF NOT EXISTS daily_digests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  sources_data TEXT NOT NULL,
  digest TEXT NOT NULL,
  model TEXT NOT NULL DEFAULT 'haiku',
  tokens_used INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_digests_date ON daily_digests(date);
