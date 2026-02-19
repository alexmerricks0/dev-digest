const API_BASE = (() => {
  const url = import.meta.env.VITE_API_URL;
  if (url) return url;
  if (import.meta.env.DEV) return 'http://localhost:8787';
  console.error('VITE_API_URL must be set in production builds');
  return '';
})();

export interface MustReadItem {
  title: string;
  source: 'hackernews' | 'reddit' | 'github';
  url: string;
  summary: string;
  why: string;
}

export interface WorthKnowingItem {
  title: string;
  source: 'hackernews' | 'reddit' | 'github';
  url: string;
  summary: string;
}

export interface ReleaseItem {
  repo: string;
  version: string;
  summary: string;
  url: string;
}

export interface DigestResult {
  headline: string;
  must_read: MustReadItem[];
  worth_knowing: WorthKnowingItem[];
  releases: ReleaseItem[];
  filtered_count: number;
}

export interface DailyDigest {
  date: string;
  digest: DigestResult;
  tokensUsed: number;
  createdAt: string;
}

export interface HistoryItem {
  date: string;
  headline: string;
  mustReadCount: number;
  worthKnowingCount: number;
}

export async function fetchToday(): Promise<DailyDigest> {
  const res = await fetch(`${API_BASE}/api/today`);
  if (!res.ok) throw new Error("Failed to fetch today's digest");
  return res.json();
}

export async function fetchByDate(date: string): Promise<DailyDigest> {
  const res = await fetch(`${API_BASE}/api/date/${date}`);
  if (!res.ok) throw new Error(`Failed to fetch digest for ${date}`);
  return res.json();
}

export async function fetchHistory(days = 30): Promise<{ data: HistoryItem[] }> {
  const res = await fetch(`${API_BASE}/api/history?days=${days}`);
  if (!res.ok) throw new Error('Failed to fetch history');
  return res.json();
}

export async function subscribe(email: string): Promise<{ status?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/api/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
}
