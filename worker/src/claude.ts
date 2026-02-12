/**
 * AI curation client
 * Raw fetch to OpenRouter API (OpenAI-compatible format)
 */

import type { HNStory } from './hackernews';
import type { RedditPost } from './reddit';
import type { GitHubRelease } from './github';

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

interface OpenRouterResponse {
  choices: Array<{ message: { content: string } }>;
  usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
}

export async function curateDigest(
  hnStories: HNStory[],
  redditPosts: RedditPost[],
  releases: GitHubRelease[],
  apiKey: string,
): Promise<{ digest: DigestResult; tokensUsed: number }> {
  const hnSummary = hnStories
    .map((s) => `- [HN ${s.score}pts, ${s.descendants} comments] ${s.title} (${s.url})`)
    .join('\n');

  const redditSummary = redditPosts
    .map((p) => `- [Reddit ${p.score}pts, ${p.numComments} comments] ${p.title} (${p.url})`)
    .join('\n');

  const releaseSummary = releases.length > 0
    ? releases.map((r) => `- [Release] ${r.repo} ${r.tag}: ${r.title}`).join('\n')
    : '- No major releases in the past 48 hours';

  const systemPrompt = `You are a senior developer curator producing a daily 2-minute morning digest. Be opinionated — aggressively filter noise, surface only what actually matters. Your readers are professional developers who value their time.`;

  const userPrompt = `Here are today's developer news sources:

## Hacker News (Top 30)
${hnSummary || '- No stories available'}

## Reddit r/programming (Top Daily)
${redditSummary || '- No posts available'}

## Framework/Language Releases
${releaseSummary}

Curate these into a morning digest. Output ONLY valid JSON (no markdown, no code fences):

{
  "headline": "One sentence capturing today's most important dev story",
  "must_read": [
    { "title": "Story title", "source": "hackernews|reddit|github", "url": "url", "summary": "2-sentence summary of what this is", "why": "One sentence on why a developer should care" }
  ],
  "worth_knowing": [
    { "title": "Story title", "source": "hackernews|reddit|github", "url": "url", "summary": "One-line summary" }
  ],
  "releases": [
    { "repo": "owner/name", "version": "v1.0.0", "summary": "What changed and why it matters", "url": "url" }
  ],
  "filtered_count": 0
}

Rules:
- must_read: exactly 3 stories that every developer should see today
- worth_knowing: 5-7 additional stories worth a glance
- releases: include all from the input, summarize each
- filtered_count: how many stories you deliberately excluded as noise
- If a section has no data, use an empty array
- Be ruthlessly selective — quality over quantity
- Deduplicate stories that appear on both HN and Reddit`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://digest.lfxai.dev',
      'X-Title': 'Dev Digest',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3.5-haiku',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter API error ${response.status}: ${errorBody}`);
  }

  const data: OpenRouterResponse = await response.json();
  const text = data.choices[0].message.content;
  const tokensUsed = data.usage.total_tokens;

  let jsonText = text.trim();
  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  const digest: DigestResult = JSON.parse(jsonText);

  return { digest, tokensUsed };
}
