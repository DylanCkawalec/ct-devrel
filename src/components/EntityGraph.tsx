import { useMemo, useState } from 'react'
import { entities } from '../lib/data'
import { useComprehensionCue } from '../lib/useComprehensionCue'
import type { StrategyEntity } from '../types'

const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 }
const statusOrder: Record<string, number> = {
  Active: 0,
  'In Progress': 1,
  Planned: 2,
  Measured: 3,
  Approved: 4,
}
const typeOrder: Record<string, number> = {
  strategy: 0,
  integration: 1,
  segment: 2,
  'revenue-stage': 3,
  execution: 4,
  metric: 5,
  budget: 6,
}

const orderedEntities = [...entities.entities].sort(
  (a, b) =>
    (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99) ||
    (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99) ||
    (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99) ||
    a.title.localeCompare(b.title),
)

const readable = (value: string) => value.replaceAll('-', ' ')
const metricLabel: Record<string, string> = {
  docs_shipped: 'docs shipped',
  partner_integrations: 'partner integrations',
  activated_builders: 'active builders',
  qualified_opportunities: 'qualified sales opportunities',
  partner_meetings: 'partner meetings',
  pipeline_influenced: 'sales opportunities helped',
  paid_pilots: 'paid pilots',
  annual_contracts: 'annual contracts',
  cumulative_bookings: 'signed revenue',
  cumulative_paying_logos: 'paying customers',
  demos_delivered: 'demos delivered',
}

function ChipList({
  title,
  items,
  tone,
  labelFor = readable,
}: {
  title: string
  items: string[]
  tone: string
  labelFor?: (value: string) => string
}) {
  return (
    <div className="entity-relation">
      <h4>{title}</h4>
      <div className="entity-chip-list">
        {items.map((item) => (
          <span key={item} className={`entity-chip ${tone}`}>
            {labelFor(item)}
          </span>
        ))}
      </div>
    </div>
  )
}

function EntityDetail({ entity, className = 'entity-detail-card' }: { entity: StrategyEntity; className?: string }) {
  return (
    <article className={className}>
      <div className="entity-detail-head">
        <div>
          <h3>{entity.title}</h3>
          <p className="tiny">Source: {entity.source_section}</p>
        </div>
        <div className="entity-badges">
          <span className={`entity-badge priority-${entity.priority.toLowerCase()}`}>
            {entity.priority} priority
          </span>
          <span className={`entity-badge status-${entity.status.toLowerCase().replaceAll(' ', '-')}`}>
            {entity.status}
          </span>
          <span className={`entity-badge type-${entity.type}`}>{readable(entity.type)}</span>
        </div>
      </div>
      <p>{entity.description}</p>
      <p className="owner-note entity-owner-note">
        <strong>Recommended owner:</strong> {entity.owner}
      </p>
      <div className="entity-relations-grid">
        <ChipList title="Pillars" items={entity.related_pillars} tone="chip-pillar" />
        <ChipList
          title="Success measures"
          items={entity.related_metrics}
          tone="chip-metric"
          labelFor={(item) => metricLabel[item] ?? item.replaceAll('_', ' ')}
        />
        <ChipList title="Routes to reach it" items={entity.related_channels} tone="chip-channel" />
        <ChipList title="Customer segments" items={entity.related_segments} tone="chip-segment" />
        <ChipList title="Timing" items={entity.related_quarters} tone="chip-quarter" />
      </div>
    </article>
  )
}

export function EntityGraph() {
  const { cue, cueClass } = useComprehensionCue()
  const [selected, setSelected] = useState<string>(orderedEntities[0]?.id ?? '')

  const selectedEntity = useMemo(
    () => entities.entities.find((entity) => entity.id === selected) ?? entities.entities[0],
    [selected],
  )

  return (
    <section className="card">
      <h2>Proposal Map</h2>
      <p className="muted">
        The proposal map connects the strategy, customer segments, revenue stages, execution work,
        success measures, and resource ask.
      </p>
      <div className="entity-layout">
        <div className="entity-list">
          {orderedEntities.map((entity) => (
            <button
              key={entity.id}
              type="button"
              onClick={() => {
                setSelected(entity.id)
                cue('entity-detail')
              }}
              className={entity.id === selected ? 'entity-button active' : 'entity-button'}
            >
              <span>{entity.title}</span>
              <small>
                <span className={`entity-dot priority-dot-${entity.priority.toLowerCase()}`} /> {entity.priority} ·{' '}
                {readable(entity.type)} · {entity.status}
              </small>
            </button>
          ))}
        </div>
        {selectedEntity ? <EntityDetail entity={selectedEntity} className={cueClass('entity-detail', 'entity-detail-card')} /> : null}
      </div>
    </section>
  )
}
