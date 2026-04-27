import { useMemo, useState, type ChangeEvent } from 'react'
import {
  acquisitionChannels,
  budget,
  customerSegments,
  entities,
  metrics,
  pricing,
  quarterlyProjections,
  roadmap,
  strategy,
} from '../lib/data'
import { filterEntities, type SearchFilters, type SearchRecord } from '../lib/search'

const initialFilters: SearchFilters = {
  query: '',
  type: '',
  quarter: '',
  pillar: '',
  channel: '',
  metric: '',
}

export function SearchInterface() {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)

  const records = useMemo<SearchRecord[]>(
    () => [
      ...entities.entities.map((entity) => ({
        id: `entity-${entity.id}`,
        title: entity.title,
        type: `entity:${entity.type}`,
        description: entity.description,
        quarters: entity.related_quarters,
        pillars: entity.related_pillars,
        channels: entity.related_channels,
        metrics: entity.related_metrics,
      })),
      ...customerSegments.segments.map((segment) => ({
        id: `segment-${segment.id}`,
        title: segment.name,
        type: 'segment',
        description: segment.description,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [],
        channels: [],
        metrics: [],
      })),
      ...acquisitionChannels.channels.map((channel) => ({
        id: `channel-${channel.id}`,
        title: channel.name,
        type: 'channel',
        description: `${channel.audience} | ${channel.action}`,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [],
        channels: [channel.id],
        metrics: channel.primary_metrics,
      })),
      ...pricing.tiers.map((tier) => ({
        id: `pricing-${tier.id}`,
        title: tier.name,
        type: 'pricing',
        description: `${tier.price_range} | ${tier.purpose}`,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [],
        channels: [],
        metrics: [],
      })),
      ...quarterlyProjections.quarters.map((quarter) => ({
        id: `projection-${quarter.id}`,
        title: `${quarter.id} Projection`,
        type: 'projection',
        description: quarter.objective,
        quarters: [quarter.id],
        pillars: [],
        channels: [],
        metrics: ['activated_builders', 'qualified_opportunities', 'paid_pilots', 'annual_contracts'],
      })),
      ...budget.items.map((item) => ({
        id: `budget-${item.id}`,
        title: item.name,
        type: 'budget',
        description: `${item.category} | ${item.description}`,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [],
        channels: [],
        metrics: [],
      })),
      ...roadmap.quarters.map((quarter) => ({
        id: `roadmap-${quarter.quarter}`,
        title: `${quarter.quarter} Roadmap`,
        type: 'roadmap',
        description: `${quarter.focus} | ${quarter.items.join(' / ')}`,
        quarters: [quarter.quarter],
        pillars: [],
        channels: [],
        metrics: [],
      })),
      ...strategy.pillars.map((pillar) => ({
        id: `pillar-${pillar}`,
        title: pillar,
        type: 'pillar',
        description: `CoreThink strategic pillar: ${pillar}`,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [pillar],
        channels: [],
        metrics: [],
      })),
      ...metrics.leading.concat(metrics.lagging).map((metric) => ({
        id: `metric-${metric.name}`,
        title: metric.name,
        type: 'metric',
        description: metric.description,
        quarters: Object.keys(metric.target_by_quarter),
        pillars: [],
        channels: [],
        metrics: [metric.name],
      })),
    ],
    [],
  )

  const filtered = useMemo(() => filterEntities(records, filters), [records, filters])

  const update =
    (field: keyof SearchFilters) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFilters((current) => ({ ...current, [field]: event.target.value }))

  const allTypes = [...new Set(records.map((record) => record.type))].sort()
  const allQuarters = ['Q1', 'Q2', 'Q3', 'Q4']
  const allPillars = strategy.pillars
  const allChannels = [...new Set(records.flatMap((record) => record.channels))].sort()
  const allMetrics = [...new Set(records.flatMap((record) => record.metrics))].sort()

  return (
    <section className="card">
      <h2>Global Search</h2>
      <p className="muted">
        Search across strategy entities, segments, metrics, channels, pricing assumptions, and quarters.
      </p>
      <div className="search-grid">
        <input
          type="search"
          placeholder="Search titles, descriptions, owners..."
          value={filters.query}
          onChange={update('query')}
        />
        <select value={filters.type} onChange={update('type')}>
          <option value="">All types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select value={filters.quarter} onChange={update('quarter')}>
          <option value="">All quarters</option>
          {allQuarters.map((quarter) => (
            <option key={quarter} value={quarter}>
              {quarter}
            </option>
          ))}
        </select>
        <select value={filters.pillar} onChange={update('pillar')}>
          <option value="">All pillars</option>
          {allPillars.map((pillar) => (
            <option key={pillar} value={pillar}>
              {pillar}
            </option>
          ))}
        </select>
        <select value={filters.channel} onChange={update('channel')}>
          <option value="">All channels</option>
          {allChannels.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
        <select value={filters.metric} onChange={update('metric')}>
          <option value="">All metrics</option>
          {allMetrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric}
            </option>
          ))}
        </select>
      </div>
      <p className="tiny">Results: {filtered.length}</p>
      <div className="grid two">
        {filtered.map((entity) => (
          <article key={entity.id} className="subcard">
            <h3>{entity.title}</h3>
            <p>{entity.description}</p>
            <p className="tiny">
              <strong>Type:</strong> {entity.type}
            </p>
            <p className="tiny">
              <strong>Pillars:</strong> {entity.pillars.join(', ') || 'N/A'}
            </p>
            <p className="tiny">
              <strong>Channels:</strong> {entity.channels.join(', ') || 'N/A'}
            </p>
            <p className="tiny">
              <strong>Metrics:</strong> {entity.metrics.join(', ') || 'N/A'}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
