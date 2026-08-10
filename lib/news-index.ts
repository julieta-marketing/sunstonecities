export interface NewsIndexItem {
  id: string
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
}

export const newsIndex: NewsIndexItem[] = [
  {
    id: 'n1',
    slug: 'long-beach-civic-center-p3',
    title: 'Experts Explain Huge P3 Project For Long Beach Civic Center',
    date: 'August 1, 2025',
    category: 'The P3 Builder',
    excerpt:
      'A look inside the $520 million Long Beach Civic Center public-private partnership and the financing structure behind one of the West Coast’s largest municipal P3 projects.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LBCC-nlQJBVNb7and37Vka9A6WXwPTjI2bn.jpg',
  },
  {
    id: 'n2',
    slug: 'long-beach-accelerator-ppe',
    title:
      'Public-Private-Education Partnership Creates Long Beach Accelerator',
    date: 'September 2, 2025',
    category: 'The P3 Builder',
    excerpt:
      'How the City of Long Beach, California State University Long Beach, and private capital built an accelerator for early-stage technology companies.',
    image: '/news/long-beach-accelerator.jpg',
  },
  {
    id: 'n3',
    slug: 'japan-p3-opportunity',
    title: 'Public-Private Partnerships: An Untapped Goldmine in Japan',
    date: 'October 3, 2025',
    category: 'The P3 Builder',
    excerpt:
      'California and Japan share infrastructure, energy, and modernization priorities that can be advanced through public-private partnership and PFI models.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Media-1-dAXkfrtDZkpKWmBli8WRQYOKteHfSt.jpg',
  },
  {
    id: 'n7',
    slug: 'space-beach-p3-economic-development',
    title: 'Space Beach Shows P3 as Economic Development Strategy',
    date: 'November 3, 2025',
    category: 'The P3 Builder',
    excerpt:
      'How Long Beach used public-private-education partnerships to turn aerospace industry transition into the growing Space Beach cluster.',
    image: '/event-usc-economic-development-challenge.jpg',
  },
  {
    id: 'n8',
    slug: 'wildfire-recovery-public-private-partnerships',
    title:
      'Recovery from Wildfires Depends on Leveraging Public-Private Partnerships',
    date: 'December 1, 2025',
    category: 'The P3 Builder',
    excerpt:
      'The Eaton and Palisades wildfires show why coordinated public-private partnerships are essential to faster recovery, rebuilding, and community resilience.',
    image: '/news/wildfire-recovery-hero.jpeg',
  },
]

export function getNewsIndexItem(slug: string) {
  const item = newsIndex.find((entry) => entry.slug === slug)

  if (!item) {
    throw new Error(`Missing news index item for "${slug}"`)
  }

  return item
}

export function getNewsArticleMeta(slug: string) {
  const item = getNewsIndexItem(slug)

  return {
    slug: item.slug,
    title: item.title,
    date: item.date,
    category: item.category,
    deck: item.excerpt,
    image: item.image,
  }
}
