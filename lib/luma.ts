import type { EventItem } from './site-data'

// Sunstone Cities' public Luma calendar: https://luma.com/sunstonecities
const LUMA_CALENDAR_API_ID = 'cal-aWP3kvnNGhwUWy1'
const LUMA_API_URL = `https://api.lu.ma/calendar/get-items?calendar_api_id=${LUMA_CALENDAR_API_ID}&period=future`

// How often the homepage is allowed to re-fetch the calendar (seconds).
const REVALIDATE_SECONDS = 60 * 60

interface LumaGeoAddressInfo {
  address?: string | null
  city?: string | null
  region?: string | null
  full_address?: string | null
}

interface LumaEvent {
  api_id: string
  name: string
  cover_url: string | null
  start_at: string
  end_at: string
  timezone: string
  location_type: 'zoom' | 'virtual' | 'offline' | string
  url: string
  geo_address_info: LumaGeoAddressInfo | null
}

interface LumaCalendarItemsResponse {
  entries: { event: LumaEvent }[]
}

function formatEventDate(isoDate: string, timeZone: string) {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone,
  }).format(new Date(isoDate))
}

function formatEventTime(startIso: string, endIso: string, timeZone: string) {
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  })
  const zoneFormatter = new Intl.DateTimeFormat('en-US', {
    timeZoneName: 'short',
    timeZone,
  })
  const zonePart = zoneFormatter
    .formatToParts(new Date(startIso))
    .find((part) => part.type === 'timeZoneName')?.value

  const range = `${timeFormatter.format(new Date(startIso))} – ${timeFormatter.format(new Date(endIso))}`
  return zonePart ? `${range} ${zonePart}` : range
}

function formatEventLocation(event: LumaEvent) {
  if (event.location_type === 'zoom') return 'Zoom'
  if (event.location_type === 'virtual') return 'Virtual'

  const address = event.geo_address_info
  return (
    address?.full_address ||
    address?.address ||
    [address?.city, address?.region].filter(Boolean).join(', ') ||
    'Location TBA'
  )
}

function readImageSize(bytes: Uint8Array): { width: number; height: number } | null {
  // PNG: 8-byte signature, then the IHDR chunk (length + "IHDR" + width + height).
  if (
    bytes.length > 24 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
    return { width: view.getUint32(16), height: view.getUint32(20) }
  }

  // JPEG: scan markers for a start-of-frame segment (SOF0–SOF3), which
  // carries the pixel dimensions.
  if (bytes.length > 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < bytes.length) {
      if (bytes[offset] !== 0xff) {
        offset += 1
        continue
      }
      const marker = bytes[offset + 1]
      if (marker >= 0xc0 && marker <= 0xc3) {
        return {
          height: (bytes[offset + 5] << 8) | bytes[offset + 6],
          width: (bytes[offset + 7] << 8) | bytes[offset + 8],
        }
      }
      const segmentLength = (bytes[offset + 2] << 8) | bytes[offset + 3]
      offset += 2 + segmentLength
    }
  }

  return null
}

/**
 * Determines whether an event's cover image should be shown in full
 * ('contain', for tall poster-style graphics that carry text worth
 * reading in full) or cropped to fill the frame ('cover', for ordinary
 * landscape photos). Only reads the first few KB of the image (enough
 * to cover the PNG/JPEG header) rather than downloading the whole file.
 */
async function detectImageFit(url: string): Promise<'cover' | 'contain'> {
  try {
    const response = await fetch(url, {
      headers: { Range: 'bytes=0-65535' },
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!response.ok) return 'cover'

    const bytes = new Uint8Array(await response.arrayBuffer())
    const size = readImageSize(bytes)

    return size && size.height > size.width ? 'contain' : 'cover'
  } catch (error) {
    console.error('Failed to detect event image dimensions', error)
    return 'cover'
  }
}

async function toEventItem(event: LumaEvent): Promise<EventItem> {
  const image = event.cover_url || '/event-usc-economic-development-challenge.jpg'

  return {
    id: event.api_id,
    title: event.name,
    date: formatEventDate(event.start_at, event.timezone),
    time: formatEventTime(event.start_at, event.end_at, event.timezone),
    location: formatEventLocation(event),
    excerpt:
      'Join Sunstone Cities for this upcoming event — register on Luma for the full details.',
    image,
    imageFit: event.cover_url ? await detectImageFit(image) : 'cover',
    registerUrl: `https://lu.ma/${event.url}`,
  }
}

/**
 * Fetches the next upcoming event from the public Sunstone Cities Luma
 * calendar so the homepage events section always matches what's live on
 * https://luma.com/sunstonecities, without needing a manual content update.
 *
 * Returns null (rather than throwing) on any failure so callers can fall
 * back to an empty state.
 */
export async function getUpcomingLumaEvent(): Promise<EventItem | null> {
  try {
    const response = await fetch(LUMA_API_URL, {
      headers: { accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS },
    })

    if (!response.ok) {
      console.error(`Luma calendar fetch failed with status ${response.status}`)
      return null
    }

    const data = (await response.json()) as LumaCalendarItemsResponse
    const nextEvent = data.entries?.[0]?.event

    return nextEvent ? await toEventItem(nextEvent) : null
  } catch (error) {
    console.error('Failed to fetch upcoming Luma event', error)
    return null
  }
}
