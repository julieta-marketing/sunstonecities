import fs from 'node:fs'
import path from 'node:path'

export interface NewsIndexItem {
  id: string
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image: string
}

export interface NewsArticleSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface NewsArticle {
  id?: string
  slug: string
  title: string
  date: string
  category: string
  deck: string
  image: string
  contentImage?: string
  imageCaption?: string
  sections: NewsArticleSection[]
  footnotes?: string[]
  newsBriefs?: string[]
  upcomingEvents?: string[]
  about?: string[]
}

type NewsFrontmatter = Record<string, string>
type ParsedNewsArticle = NewsArticle & {
  sourceFile: string
}

const newsDirectory = path.join(process.cwd(), 'content/news')
const warnedContentIssues = new Set<string>()
const specialSectionMap: Record<string, keyof Pick<
  NewsArticle,
  'newsBriefs' | 'upcomingEvents' | 'footnotes' | 'about'
>> = {
  'news briefs': 'newsBriefs',
  briefs: 'newsBriefs',
  'upcoming events': 'upcomingEvents',
  events: 'upcomingEvents',
  footnotes: 'footnotes',
  sources: 'footnotes',
  about: 'about',
}

function trimOptional(value?: string) {
  const trimmed = value?.trim()
  return trimmed || undefined
}

function warnContentIssue(message: string) {
  if (process.env.NODE_ENV !== 'production' && !warnedContentIssues.has(message)) {
    warnedContentIssues.add(message)
    console.warn(message)
  }
}

function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getSlugFromFileName(filePath: string) {
  return toSlug(path.basename(filePath, path.extname(filePath)))
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    return { data: {}, body: raw }
  }

  const data: NewsFrontmatter = {}
  const [, frontmatter, body] = match

  for (const line of frontmatter.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf(':')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    let value = trimmed.slice(separatorIndex + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    data[key] = value.replace(/\\"/g, '"')
  }

  return { data, body }
}

function parseBlocks(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
}

function parseListItems(content: string) {
  const listItems = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)

  return listItems.length ? listItems : parseBlocks(content)
}

function parseArticleSection(heading: string, content: string) {
  const blocks = parseBlocks(content)
  const paragraphs: string[] = []
  const bullets: string[] = []

  for (const block of blocks) {
    const lines = block.split('\n').map((line) => line.trim())
    const blockBullets = lines
      .filter((line) => line.startsWith('- '))
      .map((line) => line.slice(2).trim())
      .filter(Boolean)

    if (blockBullets.length && blockBullets.length === lines.length) {
      bullets.push(...blockBullets)
    } else {
      paragraphs.push(block)
    }
  }

  return {
    heading,
    ...(paragraphs.length ? { paragraphs } : {}),
    ...(bullets.length ? { bullets } : {}),
  }
}

function parseBody(body: string) {
  const sections: NewsArticleSection[] = []
  const lists: Pick<
    NewsArticle,
    'newsBriefs' | 'upcomingEvents' | 'footnotes' | 'about'
  > = {}
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)]

  if (!matches.length) {
    const paragraphs = parseBlocks(body)
    return {
      sections: paragraphs.length
        ? [{ heading: 'Feature', paragraphs }]
        : [{ heading: 'Feature', paragraphs: [] }],
      lists,
    }
  }

  matches.forEach((match, index) => {
    const heading = match[1].trim()
    const contentStart = (match.index ?? 0) + match[0].length
    const contentEnd =
      index + 1 < matches.length ? matches[index + 1].index ?? body.length : body.length
    const content = body.slice(contentStart, contentEnd).trim()
    const specialKey = specialSectionMap[heading.toLowerCase()]

    if (specialKey) {
      const items = parseListItems(content)
      if (items.length) {
        lists[specialKey] = items
      }
      return
    }

    const section = parseArticleSection(heading, content)
    if (section.paragraphs?.length || section.bullets?.length) {
      sections.push(section)
    }
  })

  return {
    sections: sections.length ? sections : [{ heading: 'Feature', paragraphs: [] }],
    lists,
  }
}

function parseNewsFile(filePath: string): ParsedNewsArticle | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, body } = parseFrontmatter(raw)
  const title = trimOptional(data.title)
  const date = trimOptional(data.date)
  const category = trimOptional(data.category)
  const deck = trimOptional(data.subtitle || data.excerpt || data.deck)
  const image = trimOptional(data.titleImage || data.heroImage || data.image)

  if (!title || !date || !category || !deck || !image) {
    warnContentIssue(`Skipping news file with missing required fields: ${filePath}`)
    return null
  }

  const slug = trimOptional(data.slug) || getSlugFromFileName(filePath) || toSlug(title)

  if (!slug) {
    warnContentIssue(`Skipping news file because a slug could not be generated: ${filePath}`)
    return null
  }

  const { sections, lists } = parseBody(body)

  return {
    id: trimOptional(data.id) || slug,
    sourceFile: filePath,
    slug,
    title,
    date,
    category,
    deck,
    image,
    contentImage: trimOptional(data.contentImage),
    imageCaption: trimOptional(data.imageCaption) || `Feature image for ${title}`,
    sections,
    ...lists,
  }
}

function toDateValue(date: string) {
  const value = Date.parse(date)
  return Number.isNaN(value) ? 0 : value
}

export function getAllNewsArticles() {
  if (!fs.existsSync(newsDirectory)) return []

  const parsedArticles = fs
    .readdirSync(newsDirectory)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => parseNewsFile(path.join(newsDirectory, file)))
    .filter((article): article is ParsedNewsArticle => Boolean(article))
    .sort((a, b) => {
      const aExactFile = path.basename(a.sourceFile) === `${a.slug}.md`
      const bExactFile = path.basename(b.sourceFile) === `${b.slug}.md`

      if (aExactFile !== bExactFile) return aExactFile ? -1 : 1
      return toDateValue(b.date) - toDateValue(a.date)
    })

  const uniqueArticles = new Map<string, ParsedNewsArticle>()

  for (const article of parsedArticles) {
    let slug = article.slug

    if (uniqueArticles.has(slug)) {
      const baseSlug = getSlugFromFileName(article.sourceFile) || slug
      slug = baseSlug
      let suffix = 2

      while (uniqueArticles.has(slug)) {
        slug = `${baseSlug}-${suffix}`
        suffix += 1
      }

      warnContentIssue(
        `Using generated news slug "${slug}" for duplicate slug "${article.slug}": ${article.sourceFile}`,
      )
    }

    uniqueArticles.set(slug, {
      ...article,
      id: slug === article.slug ? article.id : slug,
      slug,
    })
  }

  return [...uniqueArticles.values()]
    .sort((a, b) => toDateValue(b.date) - toDateValue(a.date))
    .map(({ sourceFile: _sourceFile, ...article }) => article)
}

export const newsArticles = getAllNewsArticles()

export const newsIndex: NewsIndexItem[] = newsArticles.map((article, index) => ({
  id: article.id || article.slug || `news-${index + 1}`,
  slug: article.slug,
  title: article.title,
  date: article.date,
  category: article.category,
  excerpt: article.deck,
  image: article.image,
}))

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

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug)
}

export function getHomepageNews(limit = 5) {
  return newsIndex.slice(0, limit)
}
