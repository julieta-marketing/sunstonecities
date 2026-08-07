import fs from 'node:fs'
import path from 'node:path'

export interface TeamMember {
  id: string
  name: string
  title: string
  photo: string
  bio: string
  fullIntroduction: string
  linkedin: string
  email: string
  order: number
}

type TeamMemberFrontmatter = Record<string, string>
type ParsedTeamMember = TeamMember & {
  sourceFile: string
}

const teamMembersDirectory = path.join(process.cwd(), 'content/team-members')
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

  const data: TeamMemberFrontmatter = {}
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

function normalizeHeading(heading: string) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function parseBlocks(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
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

    if (
      heading === 'full introduction' ||
      heading === 'introduction' ||
      heading === 'bio'
    ) {
      sections.fullIntroduction = content
    }
  })

  return sections
}

function parseOrder(value?: string) {
  const order = Number(value)
  return Number.isFinite(order) ? order : undefined
}

function parseTeamMemberFile(filePath: string): ParsedTeamMember | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, body } = parseFrontmatter(raw)
  const sections = parseBodySections(body)
  const name = trimOptional(data.name)
  const title = trimOptional(data.title)
  const headshot = trimOptional(data.headshot || data.photo || data.image)
  const summary = trimOptional(data.introductionSummary || data.summary || data.bio)
  const linkedin = trimOptional(data.linkedin)
  const email = trimOptional(data.email)
  const order = parseOrder(trimOptional(data.cardOrder || data.order))
  const fullIntroduction =
    trimOptional(data.fullIntroduction) ||
    trimOptional(sections.fullIntroduction) ||
    trimOptional(body)

  if (
    !name ||
    !title ||
    !headshot ||
    !summary ||
    !fullIntroduction ||
    !linkedin ||
    !email ||
    order === undefined
  ) {
    warnContentIssue(`Skipping Team member with missing required fields: ${filePath}`)
    return null
  }

  const slug = getSlugFromFileName(filePath) || toSlug(name)

  if (!slug) {
    warnContentIssue(
      `Skipping Team member because an id could not be generated: ${filePath}`,
    )
    return null
  }

  return {
    id: slug,
    sourceFile: filePath,
    name,
    title,
    photo: headshot,
    bio: summary,
    fullIntroduction,
    linkedin,
    email,
    order,
  }
}

export function getTeamMembers() {
  if (!fs.existsSync(teamMembersDirectory)) return []

  return fs
    .readdirSync(teamMembersDirectory)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) => parseTeamMemberFile(path.join(teamMembersDirectory, file)))
    .filter((member): member is ParsedTeamMember => Boolean(member))
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order
      return a.sourceFile.localeCompare(b.sourceFile)
    })
    .map(({ sourceFile: _sourceFile, ...member }) => member)
}

export const teamMembers = getTeamMembers()
