export type SearchRecord = {
  id: string
  title: string
  type: string
  description: string
  quarters: string[]
  pillars: string[]
  channels: string[]
  metrics: string[]
}

export type SearchFilters = {
  query: string
  type: string
  quarter: string
  pillar: string
  channel: string
  metric: string
}

const includes = (haystack: string, needle: string): boolean =>
  haystack.toLowerCase().includes(needle.toLowerCase())

export const filterEntities = (
  records: SearchRecord[],
  filters: SearchFilters,
): SearchRecord[] => {
  return records.filter((record) => {
    const queryMatch =
      filters.query.length === 0 ||
      [record.title, record.description, record.type].some((field) =>
        includes(field, filters.query),
      )

    const typeMatch = filters.type.length === 0 || record.type === filters.type
    const quarterMatch = filters.quarter.length === 0 || record.quarters.includes(filters.quarter)
    const pillarMatch = filters.pillar.length === 0 || record.pillars.includes(filters.pillar)
    const channelMatch = filters.channel.length === 0 || record.channels.includes(filters.channel)
    const metricMatch = filters.metric.length === 0 || record.metrics.includes(filters.metric)

    return queryMatch && typeMatch && quarterMatch && pillarMatch && channelMatch && metricMatch
  })
}
