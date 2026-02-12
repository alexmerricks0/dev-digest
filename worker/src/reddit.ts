/**
 * Reddit r/programming client
 * Fetches top daily posts via public JSON API
 */

export interface RedditPost {
  title: string;
  url: string;
  score: number;
  numComments: number;
  permalink: string;
  author: string;
}

interface RedditResponse {
  data: {
    children: Array<{
      data: {
        title: string;
        url: string;
        score: number;
        num_comments: number;
        permalink: string;
        author: string;
        is_self: boolean;
        selftext: string;
      };
    }>;
  };
}

export async function fetchRedditPosts(): Promise<RedditPost[]> {
  const response = await fetch(
    'https://www.reddit.com/r/programming/top.json?t=day&limit=20',
    {
      headers: {
        'User-Agent': 'dev-digest-worker/1.0 (https://digest.lfxai.dev)',
      },
    },
  );

  if (!response.ok) {
    console.warn(`Reddit API returned ${response.status}, skipping`);
    return [];
  }

  const data: RedditResponse = await response.json();

  return data.data.children
    .map((child) => ({
      title: child.data.title,
      url: child.data.is_self
        ? `https://reddit.com${child.data.permalink}`
        : child.data.url,
      score: child.data.score,
      numComments: child.data.num_comments,
      permalink: `https://reddit.com${child.data.permalink}`,
      author: child.data.author,
    }))
    .slice(0, 15);
}
