import { useMemo, useState, type ChangeEvent, type ReactNode } from 'react'
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
import { filterEntities, type SearchFilters, type SearchRecord, type SearchResult } from '../lib/search'

const initialFilters: SearchFilters = {
  query: '',
  type: '',
  category: '',
  priority: '',
  quarter: '',
  pillar: '',
  channel: '',
  metric: '',
}

const HIGH = 'High' as const
const MEDIUM = 'Medium' as const
const LOW = 'Low' as const

const readable = (value: string) => value.replaceAll(/[_-]/g, ' ')

const pageRecords: SearchRecord[] = [
  {
    id: 'page-home',
    title: 'Home',
    type: 'page',
    category: 'Executive summary',
    tab: 'Home',
    purpose: 'Summarizes the investment ask, bookings target, and proposal thesis.',
    priority: HIGH,
    status: 'Active',
    description: 'Start here for the short executive view of the CoreThink 12-month plan.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    pillars: strategy.pillars,
    channels: [],
    metrics: ['cumulative_bookings', 'cumulative_paying_logos'],
    tags: ['overview', 'investment', 'bookings', 'summary'],
  },
  {
    id: 'page-strategy',
    title: 'Strategy',
    type: 'page',
    category: 'Proposal logic',
    tab: 'Strategy',
    purpose: 'Explains the thesis, CoreThink pillars, and target customer timeline.',
    priority: HIGH,
    status: 'Active',
    description: 'Use this tab to understand why the proposal is positioned around hybrid reasoning.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    pillars: strategy.pillars,
    channels: [],
    metrics: [],
    tags: ['thesis', 'pillars', 'customer focus', 'timeline'],
  },
  {
    id: 'page-pricing',
    title: 'Pricing',
    type: 'page',
    category: 'Commercial model',
    tab: 'Pricing',
    purpose: 'Shows how free/community entry converts to pilots and annual contracts.',
    priority: HIGH,
    status: 'Active',
    description: 'Use this tab to review the pricing ladder and commercial assumptions.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    pillars: [],
    channels: [],
    metrics: ['paid_pilots', 'annual_contracts', 'cumulative_bookings'],
    tags: ['pricing', 'pilot', 'contract', 'bookings'],
  },
  {
    id: 'page-acquisition',
    title: 'Acquisition',
    type: 'page',
    category: 'Demand plan',
    tab: 'Acquisition',
    purpose: 'Explains where customers come from, what action is taken, and how success is measured.',
    priority: HIGH,
    status: 'Active',
    description: 'Use this tab to compare channels, audiences, actions, outputs, and metrics.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    pillars: [],
    channels: acquisitionChannels.channels.map((channel) => channel.id),
    metrics: acquisitionChannels.channels.flatMap((channel) => channel.primary_metrics),
    tags: ['channel', 'audience', 'action', 'demand', 'customer acquisition'],
  },
  {
    id: 'page-growth',
    title: 'Growth',
    type: 'page',
    category: 'Year-one targets',
    tab: 'Growth',
    purpose: 'Explains quarter-by-quarter targets, target examples, and bookings assumptions.',
    priority: HIGH,
    status: 'Active',
    description: 'Use this tab to understand reached builders, qualified opportunities, pilots, contracts, and bookings.',
    quarters: quarterlyProjections.quarters.map((quarter) => quarter.id),
    pillars: [],
    channels: [],
    metrics: ['activated_builders', 'qualified_opportunities', 'paid_pilots', 'annual_contracts', 'cumulative_bookings'],
    tags: ['growth', 'quarterly targets', 'bookings', 'pipeline'],
  },
  {
    id: 'page-metrics',
    title: 'Success Metrics',
    type: 'page',
    category: 'Proof and measurement',
    tab: 'Metrics',
    purpose: 'Groups weekly, bi-weekly, monthly, and quarterly metrics in review order.',
    priority: HIGH,
    status: 'Active',
    description: 'Use this tab to see how execution and revenue signals are measured.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    pillars: [],
    channels: [],
    metrics: metrics.leading.concat(metrics.lagging).map((metric) => metric.name),
    tags: ['metrics', 'cadence', 'weekly', 'monthly', 'measurement'],
  },
  {
    id: 'page-budget',
    title: 'Budget',
    type: 'page',
    category: 'Resource ask',
    tab: 'Budget',
    purpose: 'Explains the investment, role scope, and resources needed to execute the plan.',
    priority: HIGH,
    status: 'Active',
    description: 'Use this tab to understand compensation, tooling, content, events, demos, and partner support.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    pillars: [],
    channels: [],
    metrics: ['cumulative_bookings'],
    tags: ['budget', 'resources', 'role', 'investment'],
  },
  {
    id: 'page-entities',
    title: 'Proposal Map',
    type: 'page',
    category: 'Relationship map',
    tab: 'Entities',
    purpose: 'Maps proposal entities by priority, status, type, pillars, metrics, channels, segments, and timing.',
    priority: MEDIUM,
    status: 'Active',
    description: 'Use this tab to inspect how parts of the proposal connect.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    pillars: strategy.pillars,
    channels: [],
    metrics: [],
    tags: ['map', 'entities', 'relationships', 'priority', 'status'],
  },
  {
    id: 'page-system-tree',
    title: 'Proposal Structure',
    type: 'page',
    category: 'Reading path',
    tab: 'System Tree',
    purpose: 'Summarizes the full executive logic of the proposal in sequence.',
    priority: MEDIUM,
    status: 'Active',
    description: 'Use this tab to see thesis, customer, commercial model, demand, execution, targets, proof, and resources together.',
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    pillars: strategy.pillars,
    channels: [],
    metrics: [],
    tags: ['structure', 'reading path', 'executive summary', 'proposal flow'],
  },
]

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query
    .trim()
    .split(/\s+/)
    .filter((term) => term.length > 1)

  if (terms.length === 0) return <>{text}</>

  const pattern = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = text.split(pattern)

  return (
    <>
      {parts.map((part, index) =>
        terms.some((term) => part.toLowerCase() === term.toLowerCase()) ? (
          <mark key={`${part}-${index}`}>{part}</mark>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </>
  )
}

function ResultPill({ children, tone }: { children: ReactNode; tone: string }) {
  return <span className={`search-pill ${tone}`}>{children}</span>
}

export function SearchInterface() {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)

  const records = useMemo<SearchRecord[]>(
    () => [
      ...pageRecords,
      ...entities.entities.map((entity) => ({
        id: `entity-${entity.id}`,
        title: entity.title,
        type: `entity:${entity.type}`,
        category: entity.type === 'budget' ? 'Resource ask' : entity.type === 'metric' ? 'Proof and measurement' : 'Proposal entity',
        tab: 'Proposal Map',
        purpose: `Connects ${readable(entity.type)} work to pillars, measures, channels, customer segments, and timing.`,
        priority: entity.priority,
        status: entity.status,
        description: entity.description,
        quarters: entity.related_quarters,
        pillars: entity.related_pillars,
        channels: entity.related_channels,
        metrics: entity.related_metrics,
        tags: [entity.source_section, entity.owner, entity.status, entity.priority, entity.type],
      })),
      ...customerSegments.segments.map((segment) => ({
        id: `segment-${segment.id}`,
        title: segment.name,
        type: 'segment',
        category: 'Customer segment',
        tab: 'Strategy',
        purpose: 'Identifies which customer group the proposal should reach and when.',
        priority: segment.priority,
        status: segment.priority === 'High' ? 'Focus' : 'Secondary',
        description: segment.description,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [],
        channels: [],
        metrics: [],
        tags: [segment.priority, 'ICP', 'customer'],
      })),
      ...acquisitionChannels.channels.map((channel) => ({
        id: `channel-${channel.id}`,
        title: channel.name,
        type: 'channel',
        category: 'Demand plan',
        tab: 'Acquisition',
        purpose: `Reach ${channel.audience}; success is measured by ${channel.primary_metrics.map(readable).join(', ')}.`,
        priority:
          channel.primary_metrics.includes('paid_pilots') || channel.primary_metrics.includes('annual_contracts')
            ? HIGH
            : MEDIUM,
        status: 'Planned',
        description: `${channel.audience} | ${channel.action} | ${channel.output}`,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [],
        channels: [channel.id],
        metrics: channel.primary_metrics,
        tags: ['channel', channel.audience, channel.output],
      })),
      ...pricing.tiers.map((tier) => ({
        id: `pricing-${tier.id}`,
        title: tier.name,
        type: 'pricing',
        category: 'Commercial model',
        tab: 'Pricing',
        purpose: `Defines the ${tier.name} offer and how it moves the buyer through the funnel.`,
        priority: tier.id === 'community-entry' ? MEDIUM : HIGH,
        status: 'Recommended',
        description: `${tier.price_range} | ${tier.purpose} | ${tier.conversion_goal}`,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [],
        channels: [],
        metrics: [],
        tags: [tier.price_range, tier.duration, tier.conversion_goal, ...tier.includes],
      })),
      ...quarterlyProjections.quarters.map((quarter) => ({
        id: `projection-${quarter.id}`,
        title: `${quarter.id} Growth Targets`,
        type: 'projection',
        category: 'Year-one targets',
        tab: 'Growth',
        purpose: `Shows expected progress for ${quarter.id}: builders reached, qualified opportunities, pilots, contracts, customers, and bookings.`,
        priority:
          quarter.new_annual_contracts > 0 || quarter.new_paid_pilots > 1
            ? HIGH
            : MEDIUM,
        status: 'Planning assumption',
        description: quarter.objective,
        quarters: [quarter.id],
        pillars: [],
        channels: [],
        metrics: ['activated_builders', 'qualified_opportunities', 'paid_pilots', 'annual_contracts'],
        tags: [
          `${quarter.activated_builders} builders`,
          `${quarter.qualified_opportunities} qualified opportunities`,
          `${quarter.new_paid_pilots} pilots`,
          `${quarter.new_annual_contracts} contracts`,
        ],
      })),
      ...budget.items.map((item) => ({
        id: `budget-${item.id}`,
        title: item.name,
        type: 'budget',
        category: 'Resource ask',
        tab: 'Budget',
        purpose: `Explains why ${item.name.toLowerCase()} is part of the execution budget.`,
        priority: item.category === 'Compensation' ? HIGH : MEDIUM,
        status: 'Proposed',
        description: `${item.category} | ${item.description}`,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [],
        channels: [],
        metrics: [],
        tags: [item.category, String(item.amount), 'budget', 'resource'],
      })),
      ...roadmap.quarters.map((quarter) => ({
        id: `roadmap-${quarter.quarter}`,
        title: `${quarter.quarter} Roadmap`,
        type: 'roadmap',
        category: 'Execution plan',
        tab: 'Proposal Structure',
        purpose: `Explains what must be built or shipped in ${quarter.quarter}.`,
        priority: quarter.quarter === 'Q1' || quarter.quarter === 'Q2' ? HIGH : MEDIUM,
        status: 'Planned',
        description: `${quarter.focus} | ${quarter.items.join(' / ')}`,
        quarters: [quarter.quarter],
        pillars: [],
        channels: [],
        metrics: [],
        tags: [quarter.focus, ...quarter.items],
      })),
      ...strategy.pillars.map((pillar) => ({
        id: `pillar-${pillar}`,
        title: pillar,
        type: 'pillar',
        category: 'Proposal logic',
        tab: 'Strategy',
        purpose: 'Defines one of the CoreThink pillars used to organize the proposal.',
        priority: HIGH,
        status: 'Active',
        description: `CoreThink strategic pillar: ${pillar}`,
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        pillars: [pillar],
        channels: [],
        metrics: [],
        tags: ['pillar', 'strategy', pillar],
      })),
      ...metrics.leading.concat(metrics.lagging).map((metric) => ({
        id: `metric-${metric.name}`,
        title: readable(metric.name),
        type: 'metric',
        category: 'Proof and measurement',
        tab: 'Metrics',
        purpose: `Measured ${metric.update_cadence.toLowerCase()} from ${metric.input_source}.`,
        priority: ['paid_pilots', 'annual_contracts', 'cumulative_bookings'].includes(metric.name)
          ? HIGH
          : MEDIUM,
        status: metric.update_cadence,
        description: metric.description,
        quarters: Object.keys(metric.target_by_quarter),
        pillars: [],
        channels: [],
        metrics: [metric.name],
        tags: [metric.input_source, metric.calculation_method, metric.update_cadence, metric.responsible_owner],
      })),
    ],
    [],
  )

  const filtered = useMemo(() => filterEntities(records, filters), [records, filters])

  const update =
    (field: keyof SearchFilters) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFilters((current) => ({ ...current, [field]: event.target.value }))

  const allTypes = [...new Set(records.map((record) => record.type))].sort()
  const allCategories = [...new Set(records.map((record) => record.category))].sort()
  const allPriorities = [HIGH, MEDIUM, LOW]
  const allQuarters = ['Q1', 'Q2', 'Q3', 'Q4']
  const allPillars = strategy.pillars
  const allChannels = [...new Set(records.flatMap((record) => record.channels))].sort()
  const allMetrics = [...new Set(records.flatMap((record) => record.metrics))].sort()
  const queryActive = filters.query.trim().length > 0

  return (
    <section className="card">
      <h2>Proposal Search</h2>
      <p className="muted">
        Search every tab and dataset in the proposal. Results are ranked by match quality and then
        by proposal priority, so direct and high-impact matches rise to the top.
      </p>
      <div className="search-grid">
        <input
          type="search"
          placeholder="Search titles, descriptions, categories, owners, metrics..."
          value={filters.query}
          onChange={update('query')}
        />
        <select value={filters.category} onChange={update('category')}>
          <option value="">All categories</option>
          {allCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select value={filters.type} onChange={update('type')}>
          <option value="">All types</option>
          {allTypes.map((type) => (
            <option key={type} value={type}>
              {readable(type)}
            </option>
          ))}
        </select>
        <select value={filters.priority} onChange={update('priority')}>
          <option value="">All priorities</option>
          {allPriorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
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
              {readable(channel)}
            </option>
          ))}
        </select>
        <select value={filters.metric} onChange={update('metric')}>
          <option value="">All metrics</option>
          {allMetrics.map((metric) => (
            <option key={metric} value={metric}>
              {readable(metric)}
            </option>
          ))}
        </select>
      </div>
      <div className="search-summary">
        <span>
          <strong>{filtered.length}</strong> results from <strong>{records.length}</strong> indexed
          records
        </span>
        <span>{queryActive ? 'Ranked by match quality + priority' : 'Ranked by proposal priority'}</span>
      </div>
      <div className="search-results">
        {filtered.map((result: SearchResult) => (
          <article key={result.id} className={`search-result priority-result-${result.priority.toLowerCase()}`}>
            <div className="search-result-head">
              <div>
                <h3>
                  <Highlight text={result.title} query={filters.query} />
                </h3>
                <p className="search-purpose">
                  <Highlight text={result.purpose} query={filters.query} />
                </p>
              </div>
              <div className="search-score">
                <span>{Math.round(result.score)}</span>
                <small>score</small>
              </div>
            </div>
            <p>
              <Highlight text={result.description} query={filters.query} />
            </p>
            <div className="search-pill-row">
              <ResultPill tone="search-pill-tab">{result.tab}</ResultPill>
              <ResultPill tone="search-pill-category">{result.category}</ResultPill>
              <ResultPill tone={`search-pill-priority priority-${result.priority.toLowerCase()}`}>
                {result.priority} priority
              </ResultPill>
              <ResultPill tone="search-pill-type">{readable(result.type)}</ResultPill>
              {result.status ? <ResultPill tone="search-pill-status">{result.status}</ResultPill> : null}
            </div>
            <div className="search-pill-row">
              {result.quarters.slice(0, 4).map((quarter) => (
                <ResultPill key={quarter} tone="search-pill-quarter">
                  {quarter}
                </ResultPill>
              ))}
              {result.pillars.slice(0, 3).map((pillar) => (
                <ResultPill key={pillar} tone="search-pill-pillar">
                  {pillar}
                </ResultPill>
              ))}
              {result.metrics.slice(0, 4).map((metric) => (
                <ResultPill key={metric} tone="search-pill-metric">
                  {readable(metric)}
                </ResultPill>
              ))}
            </div>
            {queryActive ? (
              <p className="tiny">
                <strong>Matched:</strong> {result.matchedFields.map(readable).join(', ') || 'N/A'}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}
