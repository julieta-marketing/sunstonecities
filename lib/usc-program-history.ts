import fs from 'node:fs'
import path from 'node:path'

export interface ProgramHistoryClient {
  name: string
  logo: string
  link: string
}

export interface ProgramHistoryYear {
  years: string
  sortYear: number
  description: string
  clients: ProgramHistoryClient[]
}

type ProgramHistoryFrontmatter = Record<string, string>

type ParsedProgramHistoryYear = ProgramHistoryYear & {
  sourceFile: string
}

const programHistoryDirectory = path.join(
  process.cwd(),
  'content/usc-program-history',
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

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    return { data: {}, body: raw }
  }

  const data: ProgramHistoryFrontmatter = {}
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

function parseSortYear(value?: string) {
  const year = Number(value)
  return Number.isFinite(year) ? year : undefined
}

function splitTableRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

function isSeparatorRow(cells: string[]) {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell))
}

function parseCitiesTable(content: string, sourceFile: string) {
  const rows = content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && line.endsWith('|'))
    .map(splitTableRow)
    .filter((cells) => cells.length >= 3 && !isSeparatorRow(cells))

  if (rows.length < 2) return []

  return rows.slice(1).flatMap((cells) => {
    const [name, logo, link] = cells.map(trimOptional)

    if (!name || !logo || !link) {
      warnContentIssue(
        `Skipping Program History city with missing required fields in: ${sourceFile}`,
      )
      return []
    }

    return [{ name, logo, link }]
  })
}

function parseProgramHistoryFile(
  filePath: string,
): ParsedProgramHistoryYear | null {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, body } = parseFrontmatter(raw)
  const years = trimOptional(data.year || data.years)
  const sortYear = parseSortYear(trimOptional(data.sortYear))
  const description = parseBodySection(body, 'Summary')
  const cities = parseBodySection(body, 'Cities')

  if (!years || sortYear === undefined || !description || !cities) {
    warnContentIssue(
      `Skipping Program History file with missing required fields: ${filePath}`,
    )
    return null
  }

  const clients = parseCitiesTable(cities, filePath)

  if (!clients.length) {
    warnContentIssue(
      `Skipping Program History file because no valid cities were found: ${filePath}`,
    )
    return null
  }

  return {
    years,
    sortYear,
    description,
    clients,
    sourceFile: filePath,
  }
}

export function getProgramHistoryYears() {
  if (!fs.existsSync(programHistoryDirectory)) return []

  return fs
    .readdirSync(programHistoryDirectory)
    .filter((file) => file.endsWith('.md') && !file.startsWith('_'))
    .map((file) =>
      parseProgramHistoryFile(path.join(programHistoryDirectory, file)),
    )
    .filter(
      (programYear): programYear is ParsedProgramHistoryYear =>
        Boolean(programYear),
    )
    .sort((a, b) => {
      if (a.sortYear !== b.sortYear) return b.sortYear - a.sortYear
      return b.sourceFile.localeCompare(a.sourceFile)
    })
    .map(({ sourceFile: _sourceFile, ...programYear }) => programYear)
}
