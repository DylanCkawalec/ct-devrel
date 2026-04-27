export type SearchRecord = {
  id: string
  title: string
  type: string
  category: string
  tab: string
  purpose: string
  priority: 'High' | 'Medium' | 'Low'
  status?: string
  description: string
  quarters: string[]
  pillars: string[]
  channels: string[]
  metrics: string[]
  tags: string[]
}

export type SearchFilters = {
  query: string
  type: string
  category: string
  priority: string
  quarter: string
  pillar: string
  channel: string
  metric: string
}

export type SearchResult = SearchRecord & {
  score: number
  matchedFields: string[]
}

const priorityScore: Record<string, number> = {
  High: 30,
  Medium: 15,
  Low: 5,
}

const normalize = (value: string): string => value.toLowerCase().replaceAll(/[_-]/g, ' ')

const tokenize = (query: string): string[] =>
  normalize(query)
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)

const scoreField = (fieldValue: string, tokens: string[], weight: number): number => {
  const value = normalize(fieldValue)
  return tokens.reduce((score, token) => {
    if (value === token) return score + weight * 2
    if (value.includes(token)) return score + weight
    return score
  }, 0)
}

const scoreRecord = (record: SearchRecord, tokens: string[]): SearchResult => {
  const fields: Array<[keyof SearchRecord, string, number]> = [
    ['title', record.title, 16],
    ['category', record.category, 12],
    ['tab', record.tab, 10],
    ['purpose', record.purpose, 9],
    ['description', record.description, 7],
    ['type', record.type, 5],
    ['status', record.status ?? '', 4],
    ['tags', record.tags.join(' '), 4],
    ['pillars', record.pillars.join(' '), 4],
    ['channels', record.channels.join(' '), 4],
    ['metrics', record.metrics.join(' '), 4],
    ['quarters', record.quarters.join(' '), 3],
  ]

  const matchedFields = fields
    .filter(([, value]) => tokens.some((token) => normalize(value).includes(token)))
    .map(([field]) => String(field))

  const queryScore =
    tokens.length === 0
      ? 0
      : fields.reduce((score, [, value, weight]) => score + scoreField(value, tokens, weight), 0)

  return {
    ...record,
    score: queryScore + (priorityScore[record.priority] ?? 0),
    matchedFields,
  }
}

export const filterEntities = (
  records: SearchRecord[],
  filters: SearchFilters,
): SearchResult[] => {
  const tokens = tokenize(filters.query)

  return records
    .map((record) => scoreRecord(record, tokens))
    .filter((record) => {
      const queryMatch = tokens.length === 0 || record.matchedFields.length > 0
    const typeMatch = filters.type.length === 0 || record.type === filters.type
      const categoryMatch = filters.category.length === 0 || record.category === filters.category
      const priorityMatch = filters.priority.length === 0 || record.priority === filters.priority
    const quarterMatch = filters.quarter.length === 0 || record.quarters.includes(filters.quarter)
    const pillarMatch = filters.pillar.length === 0 || record.pillars.includes(filters.pillar)
    const channelMatch = filters.channel.length === 0 || record.channels.includes(filters.channel)
    const metricMatch = filters.metric.length === 0 || record.metrics.includes(filters.metric)

      return (
        queryMatch &&
        typeMatch &&
        categoryMatch &&
        priorityMatch &&
        quarterMatch &&
        pillarMatch &&
        channelMatch &&
        metricMatch
      )
    })
    .sort((a, b) => b.score - a.score || a.category.localeCompare(b.category) || a.title.localeCompare(b.title))
}
