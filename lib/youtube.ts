// Sunstone Cities' YouTube channel: https://www.youtube.com/@sunstonecities
const YOUTUBE_CHANNEL_ID = 'UC4-eVsMVs2dC4MjdnDQai3w'

// The public per-channel "uploads" RSS feed. No API key required (unlike
// the YouTube Data API), so this is the same no-credentials approach used
// for the Luma calendar sync in lib/luma.ts.
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`

// How often the homepage is allowed to re-fetch the feed (seconds).
const REVALIDATE_SECONDS = 60 * 60

export interface YoutubeVideo {
  id: string
  title: string
  url: string
  thumbnail: string
  publishedAt: string
}

// Last-known-good video, used only if the feed fetch ever fails. Unlike
// the events section, an active YouTube channel is never expected to have
// zero videos, so falling back to the previous video (rather than an
// empty state) is the safer default here.
const FALLBACK_VIDEO: YoutubeVideo = {
  id: 'q7srMeq1dx8',
  title: "Powering California's Workforce | P3 Strategy Series ft. Elsa Wadzinski",
  url: 'https://www.youtube.com/watch?v=q7srMeq1dx8',
  thumbnail: 'https://i.ytimg.com/vi/q7srMeq1dx8/maxresdefault.jpg',
  publishedAt: '2026-07-14T19:43:05+00:00',
}

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function extractTag(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return match ? decodeXmlEntities(match[1].trim()) : null
}

function parseLatestVideo(feedXml: string): YoutubeVideo | null {
  // Entries are already ordered newest-first in the feed, so the first
  // <entry> is the latest upload.
  const entryMatch = feedXml.match(/<entry>([\s\S]*?)<\/entry>/)
  if (!entryMatch) return null

  const entry = entryMatch[1]
  const id = extractTag(entry, 'yt:videoId')
  const title = extractTag(entry, 'title')
  const publishedAt = extractTag(entry, 'published')

  if (!id || !title) return null

  return {
    id,
    title,
    url: `https://www.youtube.com/watch?v=${id}`,
    thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    publishedAt: publishedAt ?? new Date().toISOString(),
  }
}

/**
 * Fetches the most recently uploaded video from the Sunstone Cities
 * YouTube channel so the homepage "Latest Video" card always matches
 * https://www.youtube.com/@sunstonecities, without needing a manual
 * content update.
 */
export async function getLatestYoutubeVideo(): Promise<YoutubeVideo> {
  try {
    const response = await fetch(YOUTUBE_FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      console.error(`YouTube feed fetch failed with status ${response.status}`)
      return FALLBACK_VIDEO
    }

    return parseLatestVideo(await response.text()) ?? FALLBACK_VIDEO
  } catch (error) {
    console.error('Failed to fetch latest YouTube video', error)
    return FALLBACK_VIDEO
  }
}
