import fs from 'node:fs'
import path from 'node:path'
import type { FeaturedCaseStudy } from '@/lib/site-data'

export interface ProjectFinancingCaseStudy {
  id: string
  slug: string
  title: string
  label: string
  summary: string
  date: string
  location?: string
  image: string
  imageAlt: string
  imagePosition?: string
  challenge: string
  solution: string
}

type CaseStudyFrontmatter = Record<string, string>
type ParsedProjectFinancingCaseStudy = ProjectFinancingCaseStudy & {
  sourceFile: string
}

const caseStudiesDirectory = path.join(
  process.cwd(),
  'content/project-financing-case-studies',
)
const warnedContentIssues = new Set<string>()

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

  const data: CaseStudyFrontmatter = {}
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

function normalizeHeading(heading: string) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function parseBodySections(body: string) {
  const sections: Record<string, string> = {}
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)]

  matches.forEach((match, index) => {
    const heading = normalizeHeading(match[1])
    const contentStart = (match.index ?? 0) + match[0].length
    const contentEnd =
      index + 1 < matches.length ? matches[index + 1].index ?? body.length : body.length
    const content = parseBlocks(body.slice(contentStart, contentEnd)).join('\n\n')

    if (heading === 'challenge' || heading === 'case study challenge') {
      sections.challenge = content
    }

    if (heading === 'solution' || heading === 'case study solution') {
      sections.solution = content
    }
  })

  return sections
}

function toDateValue(date: string) {
  const value = Date.parse(date)
  return Number.isNaN(value) ? 0 : value
}

function parseLabelItems(label: string) {
  return label
    .split(/\s*(?:,|\/)\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseCaseStudyFile(
  filePath: string,
): ParsedProjectFinancingCaseStudy | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, body } = parseFrontmatter(raw)
  const sections = parseBodySections(body)
  const title = trimOptional(data.title)
  const label = trimOptional(data.label)
  const summary = trimOptional(data.summary)
  const date = trimOptional(data.date)
  const challenge = trimOptional(data.challenge) || trimOptional(sections.challenge)
  const solution = trimOptional(data.solution) || trimOptional(sections.solution)

  if (!title || !label || !summary || !date || !challenge || !solution) {
    warnContentIssue(
      `Skipping Project Financing case study with missing required fields: ${filePath}`,
    )
    return null
  }

  const slug = getSlugFromFileName(filePath) || toSlug(title)

  if (!slug) {
    warnContentIssue(
      `Skipping Project Financing case study because a slug could not be generated: ${filePath}`,
    )
    return null
  }

  return {
    id: slug,
    sourceFile: filePath,
    slug,
    title,
    label,
    summary,
    date,
    location: trimOptional(data.location),
    image: trimOptional(data.image || data.titleImage) || '/placeholder.svg',
    imageAlt: title,
    imagePosition: 'center',
    challenge,
    solution,
  }
}

export function getAllProjectFinancingCaseStudies() {
  if (!fs.existsSync(caseStudiesDirectory)) return []

  const parsedCaseStudies = fs
    .readdirSync(caseStudiesDirectory)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => parseCaseStudyFile(path.join(caseStudiesDirectory, file)))
    .filter(
      (
        caseStudy,
      ): caseStudy is ParsedProjectFinancingCaseStudy => Boolean(caseStudy),
    )
    .sort((a, b) => toDateValue(b.date) - toDateValue(a.date))

  const uniqueCaseStudies = new Map<string, ParsedProjectFinancingCaseStudy>()

  for (const caseStudy of parsedCaseStudies) {
    let slug = caseStudy.slug

    if (uniqueCaseStudies.has(slug)) {
      const baseSlug = getSlugFromFileName(caseStudy.sourceFile) || slug
      slug = baseSlug
      let suffix = 2

      while (uniqueCaseStudies.has(slug)) {
        slug = `${baseSlug}-${suffix}`
        suffix += 1
      }

      warnContentIssue(
        `Using generated Project Financing case study slug "${slug}" for duplicate slug "${caseStudy.slug}": ${caseStudy.sourceFile}`,
      )
    }

    uniqueCaseStudies.set(slug, {
      ...caseStudy,
      id: slug,
      slug,
    })
  }

  return [...uniqueCaseStudies.values()]
    .sort((a, b) => toDateValue(b.date) - toDateValue(a.date))
    .map(({ sourceFile: _sourceFile, ...caseStudy }) => caseStudy)
}

export const projectFinancingCaseStudies = getAllProjectFinancingCaseStudies()

export const projectFinancingCaseStudySlides = projectFinancingCaseStudies.map(
  (caseStudy) => ({
    id: caseStudy.id,
    title: caseStudy.title,
    image: caseStudy.image,
    imageAlt: caseStudy.imageAlt,
    imagePosition: caseStudy.imagePosition,
    location: caseStudy.location,
    services: parseLabelItems(caseStudy.label),
    challenge: caseStudy.challenge,
    solution: caseStudy.solution,
    outcomes: [],
  }),
)

export const featuredProjectFinancingCaseStudies: FeaturedCaseStudy[] =
  projectFinancingCaseStudies.map((caseStudy, index) => ({
    id: caseStudy.id,
    number: String(index + 1).padStart(2, '0'),
    label: caseStudy.label,
    headline: caseStudy.title,
    description: caseStudy.summary,
    location: caseStudy.location,
    services: parseLabelItems(caseStudy.label).join(', '),
    summary: caseStudy.summary,
    challenge: caseStudy.challenge,
    solution: caseStudy.solution,
    image: caseStudy.image,
    link: `/services/project-financing#case-${caseStudy.id}`,
  }))

export function getFeaturedProjectFinancingCaseStudies(limit = 3) {
  return featuredProjectFinancingCaseStudies.slice(0, limit)
}
