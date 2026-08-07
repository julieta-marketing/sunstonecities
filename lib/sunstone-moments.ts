import fs from 'node:fs'
import path from 'node:path'

export interface SunstoneMoment {
  id: string
  image: string
  tag: string
  alt: string
  order: number
}

type MomentFrontmatter = Record<string, string>
type ParsedSunstoneMoment = SunstoneMoment & {
  sourceFile: string
}

const momentsDirectory = path.join(process.cwd(), 'content/sunstone-moments')
const warnedContentIssues = new Set<string>()
const maxMoments = 30

function trimOptional(value?: string) {
  const trimmed = value?.trim()
  return trimmed || undefined
}

function warnContentIssue(message: string) {
  if (
    process.env.NODE_ENV !== 'production' &&
    !warnedContentIssues.has(message)
  ) {
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

  const data: MomentFrontmatter = {}
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

function parseOrder(value?: string) {
  const order = Number(value)
  return Number.isFinite(order) ? order : undefined
}

function parseMomentFile(filePath: string): ParsedSunstoneMoment | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data } = parseFrontmatter(raw)
  const image = trimOptional(data.image)
  const tag = trimOptional(data.tag)
  const order = parseOrder(trimOptional(data.order))

  if (!image || !tag || order === undefined) {
    warnContentIssue(
      `Skipping Sunstone Moment with missing required fields: ${filePath}`,
    )
    return null
  }

  const slug = getSlugFromFileName(filePath)

  if (!slug) {
    warnContentIssue(
      `Skipping Sunstone Moment because an id could not be generated: ${filePath}`,
    )
    return null
  }

  return {
    id: slug,
    sourceFile: filePath,
    image,
    tag,
    alt: tag,
    order,
  }
}

export function getSunstoneMoments() {
  if (!fs.existsSync(momentsDirectory)) return []

  return fs
    .readdirSync(momentsDirectory)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => parseMomentFile(path.join(momentsDirectory, file)))
    .filter((moment): moment is ParsedSunstoneMoment => Boolean(moment))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.sourceFile.localeCompare(b.sourceFile)
    })
    .slice(0, maxMoments)
    .map(({ sourceFile: _sourceFile, ...moment }) => moment)
}

export const sunstoneMoments = getSunstoneMoments()
