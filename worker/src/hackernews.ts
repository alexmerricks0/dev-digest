/**
 * Hacker News API client
 * Fetches top stories (no keyword filter — all dev stories)
 */

export interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

export async function fetchHNStories(): Promise<HNStory[]> {
  const topIds = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((r) => r.json<number[]>());

  const top30 = topIds.slice(0, 30);

  const stories = await Promise.all(
    top30.map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((r) => r.json<HNStory>()),
    ),
  );

  return stories
    .filter((s) => s && s.title)
    .map((s) => ({
      id: s.id,
      title: s.title,
      url: s.url || `https://news.ycombinator.com/item?id=${s.id}`,
      score: s.score,
      by: s.by,
      time: s.time,
      descendants: s.descendants || 0,
    }));
}
