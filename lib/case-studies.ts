import fs from 'node:fs'
import path from 'node:path'
import type { CaseStudySlide } from '@/components/case-study-carousel'
import type { FeaturedCaseStudy } from '@/lib/site-data'

type CaseStudyFrontmatter = Record<string, string>

interface ParsedCaseStudy {
  id: string
  title: string
  label: string
  summary: string
  date: string
  image: string
  location?: string
  challenge: string
  solution: string
  sourceFile: string
}

const warnedContentIssues = new Set<string>()
const consultingDirectory = path.join(
  process.cwd(),
  'content/project-consulting-case-studies',
)
const financingDirectory = path.join(
  process.cwd(),
  'content/project-financing-case-studies',
)

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

function parseBodySection(body: string, heading: string) {
  const matches = [...body.matchAll(/^##\s+(.+)$/gm)]
  const matchIndex = matches.findIndex(
    (match) => match[1].trim().toLowerCase() === heading.toLowerCase(),
  )

  if (matchIndex === -1) return undefined

  const match = matches[matchIndex]
  const contentStart = (match.index ?? 0) + match[0].length
  const contentEnd =
    matchIndex + 1 < matches.length
      ? matches[matchIndex + 1].index ?? body.length
      : body.length

  return trimOptional(body.slice(contentStart, contentEnd))
}

function splitLabels(label: string) {
  return label
    .split(/\s*(?:,|\/)\s*/g)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseCaseStudyFile(filePath: string): ParsedCaseStudy | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, body } = parseFrontmatter(raw)
  const title = trimOptional(data.title)
  const label = trimOptional(data.label)
  const summary = trimOptional(data.summary)
  const date = trimOptional(data.date)
  const image = trimOptional(data.image)
  const challenge = parseBodySection(body, 'Challenge')
  const solution = parseBodySection(body, 'Solution')

  if (!title || !label || !summary || !date || !challenge || !solution) {
    warnContentIssue(`Skipping case study with missing required fields: ${filePath}`)
    return null
  }

  const id = trimOptional(data.id) || getSlugFromFileName(filePath)

  if (!id) {
    warnContentIssue(
      `Skipping case study because an id could not be generated: ${filePath}`,
    )
    return null
  }

  return {
    id,
    title,
    label,
    summary,
    date,
    image: image || '/placeholder.svg',
    location: trimOptional(data.location),
    challenge,
    solution,
    sourceFile: filePath,
  }
}

function getCaseStudiesFromDirectory(directory: string) {
  if (!fs.existsSync(directory)) return []

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => parseCaseStudyFile(path.join(directory, file)))
    .filter((study): study is ParsedCaseStudy => Boolean(study))
    .sort((a, b) => {
      const dateSort = new Date(b.date).getTime() - new Date(a.date).getTime()
      if (dateSort !== 0) return dateSort
      return a.sourceFile.localeCompare(b.sourceFile)
    })
}

function toFeaturedCaseStudy(
  study: ParsedCaseStudy,
  index: number,
  servicePath: string,
): FeaturedCaseStudy {
  return {
    id: study.id,
    number: String(index + 1).padStart(2, '0'),
    label: study.label,
    headline: study.title,
    description: study.summary,
    image: study.image,
    link: `${servicePath}#case-${study.id}`,
    location: study.location,
    services: splitLabels(study.label).join(', '),
    summary: study.summary,
    challenge: study.challenge,
    solution: study.solution,
  }
}

function toCaseStudySlide(study: ParsedCaseStudy): CaseStudySlide {
  return {
    id: study.id,
    title: study.title,
    image: study.image,
    imageAlt: `Feature image for ${study.title}`,
    imagePosition: 'center',
    location: study.location,
    services: splitLabels(study.label),
    challenge: study.challenge,
    solution: study.solution,
    outcomes: [],
  }
}

export function getProjectConsultingCaseStudies() {
  return getCaseStudiesFromDirectory(consultingDirectory)
}

export function getProjectFinancingCaseStudies() {
  return getCaseStudiesFromDirectory(financingDirectory)
}

export function getProjectConsultingSlides() {
  return getProjectConsultingCaseStudies().map(toCaseStudySlide)
}

export function getProjectFinancingSlides() {
  return getProjectFinancingCaseStudies().map(toCaseStudySlide)
}

export function getFeaturedProjectConsultingCaseStudies(limit = 3) {
  return getProjectConsultingCaseStudies()
    .slice(0, limit)
    .map((study, index) =>
      toFeaturedCaseStudy(study, index, '/services/project-consulting'),
    )
}

export function getFeaturedProjectFinancingCaseStudies(limit = 3) {
  return getProjectFinancingCaseStudies()
    .slice(0, limit)
    .map((study, index) =>
      toFeaturedCaseStudy(study, index, '/services/project-financing'),
    )
}
