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

function toEventItem(event: LumaEvent): EventItem {
  return {
    id: event.api_id,
    title: event.name,
    date: formatEventDate(event.start_at, event.timezone),
    time: formatEventTime(event.start_at, event.end_at, event.timezone),
    location: formatEventLocation(event),
    excerpt:
      'Join Sunstone Cities for this upcoming event — register on Luma for the full details.',
    image: event.cover_url || '/event-usc-economic-development-challenge.jpg',
    registerUrl: `https://lu.ma/${event.url}`,
  }
}

/**
 * Fetches the next upcoming event from the public Sunstone Cities Luma
 * calendar so the homepage events section always matches what's live on
 * https://luma.com/sunstonecities, without needing a manual content update.
 *
 * Returns null (rather than throwing) on any failure so callers can fall
 * back to the static entry in lib/site-data.ts.
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

    return nextEvent ? toEventItem(nextEvent) : null
  } catch (error) {
    console.error('Failed to fetch upcoming Luma event', error)
    return null
  }
}
