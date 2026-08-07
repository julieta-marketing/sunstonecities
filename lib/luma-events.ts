import { events, type EventItem } from '@/lib/site-data'

const defaultCalendarUrl = 'https://luma.com/sunstonecities?k=c'
const easternTimeZone = 'America/New_York'

type LumaLocation =
  | {
      '@type'?: string
      name?: string
      url?: string
      address?: {
        addressLocality?: string
        addressRegion?: string
        addressCountry?: string
      }
    }
  | string

type LumaSchemaEvent = {
  '@type'?: string
  '@id'?: string
  url?: string
  name?: string
  startDate?: string
  endDate?: string
  location?: LumaLocation
  image?: string | string[]
  description?: string
}

type LumaListItem = {
  item?: LumaSchemaEvent
}

type LumaItemList = {
  '@type'?: string
  itemListElement?: LumaListItem[]
}

function getJsonLdBlocks(html: string) {
  return [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean)
}

function parseJsonLdBlock(block: string) {
  try {
    return JSON.parse(block)
  } catch {
    return null
  }
}

function getSchemaEvents(data: unknown): LumaSchemaEvent[] {
  if (!data || typeof data !== 'object') return []

  if (Array.isArray(data)) {
    return data.flatMap(getSchemaEvents)
  }

  const candidate = data as LumaItemList & LumaSchemaEvent & { '@graph'?: unknown[] }

  if (candidate['@type'] === 'Event') {
    return [candidate]
  }

  if (candidate['@type'] === 'ItemList' && candidate.itemListElement) {
    return candidate.itemListElement
      .map((listItem) => listItem.item)
      .filter((item): item is LumaSchemaEvent => Boolean(item))
  }

  if (candidate['@graph']) {
    return getSchemaEvents(candidate['@graph'])
  }

  return []
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: easternTimeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function formatTime(start: Date, end?: Date) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: easternTimeZone,
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  if (!end) return formatter.format(start)

  const startTime = new Intl.DateTimeFormat('en-US', {
    timeZone: easternTimeZone,
    hour: 'numeric',
    minute: '2-digit',
  }).format(start)

  return `${startTime} – ${formatter.format(end)}`
}

function formatLocation(location: LumaLocation | undefined) {
  if (!location) return 'Location TBD'
  if (typeof location === 'string') return location

  if (location.name && location.name !== 'Online Event') {
    return location.name
  }

  if (location.address?.addressLocality && location.address?.addressRegion) {
    return `${location.address.addressLocality}, ${location.address.addressRegion}`
  }

  return location.name || 'Online Event'
}

function getEventImage(image: LumaSchemaEvent['image']) {
  if (Array.isArray(image)) return image[0]
  return image
}

function normalizeEvent(event: LumaSchemaEvent): EventItem | null {
  if (!event.name || !event.startDate) return null

  const startDate = new Date(event.startDate)
  const endDate = event.endDate ? new Date(event.endDate) : undefined

  if (Number.isNaN(startDate.getTime())) return null

  return {
    id: event.url || event['@id'] || event.name,
    title: event.name,
    date: formatDate(startDate),
    time: formatTime(startDate, endDate),
    location: formatLocation(event.location),
    excerpt: event.description || '',
    image: getEventImage(event.image) || events[0]?.image || '/event-usc-economic-development-challenge.jpg',
    url: event.url || event['@id'] || defaultCalendarUrl,
    ctaLabel: 'Register Now',
  }
}

function getNoUpcomingEvent(): EventItem {
  return {
    id: 'no-upcoming-events',
    title: 'No Upcoming Events',
    date: 'New dates coming soon',
    time: 'Updates will appear here',
    location: 'Browse the Gallery below',
    excerpt:
      'Explore photos and highlights from past Sunstone Cities events while new dates are being finalized.',
    image: events[0]?.image || '/event-usc-economic-development-challenge.jpg',
    url: '#events-full',
    ctaLabel: 'Check Out Past Events',
  }
}

function getStartTime(event: LumaSchemaEvent) {
  if (!event.startDate) return Number.POSITIVE_INFINITY
  const time = Date.parse(event.startDate)
  return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time
}

export async function getFeaturedLumaEvent(): Promise<EventItem | null> {
  const calendarUrl = process.env.LUMA_CALENDAR_URL || defaultCalendarUrl

  try {
    const response = await fetch(calendarUrl, {
      next: { revalidate: 60 * 30 },
    })

    if (!response.ok) return getNoUpcomingEvent()

    const html = await response.text()
    const now = Date.now()
    const lumaEvents = getJsonLdBlocks(html)
      .map(parseJsonLdBlock)
      .flatMap(getSchemaEvents)
      .filter((event) => Number.isFinite(getStartTime(event)))
      .sort((a, b) => getStartTime(a) - getStartTime(b))

    const selectedEvent =
      lumaEvents.find((event) => getStartTime(event) >= now) ?? lumaEvents[0]

    return selectedEvent ? normalizeEvent(selectedEvent) : getNoUpcomingEvent()
  } catch {
    return getNoUpcomingEvent()
  }
}
