import { useMemo, useState } from 'react'
import { entities } from '../lib/data'
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

const countBy = (items: StrategyEntity[], key: keyof Pick<StrategyEntity, 'priority' | 'status' | 'type'>) =>
  items.reduce<Record<string, number>>((acc, item) => {
    acc[item[key]] = (acc[item[key]] ?? 0) + 1
    return acc
  }, {})

function ChipList({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="entity-relation">
      <h4>{title}</h4>
      <div className="entity-chip-list">
        {items.map((item) => (
          <span key={item} className={`entity-chip ${tone}`}>
            {readable(item)}
          </span>
        ))}
      </div>
    </div>
  )
}

function EntityDetail({ entity }: { entity: StrategyEntity }) {
  return (
    <article className="entity-detail-card">
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
        <ChipList title="Success measures" items={entity.related_metrics} tone="chip-metric" />
        <ChipList title="Routes to reach it" items={entity.related_channels} tone="chip-channel" />
        <ChipList title="Customer segments" items={entity.related_segments} tone="chip-segment" />
        <ChipList title="Timing" items={entity.related_quarters} tone="chip-quarter" />
      </div>
    </article>
  )
}

export function EntityGraph() {
  const [selected, setSelected] = useState<string>(orderedEntities[0]?.id ?? '')

  const selectedEntity = useMemo(
    () => entities.entities.find((entity) => entity.id === selected) ?? entities.entities[0],
    [selected],
  )
  const priorityCounts = countBy(entities.entities, 'priority')
  const statusCounts = countBy(entities.entities, 'status')
  const typeCounts = countBy(entities.entities, 'type')

  return (
    <section className="card">
      <h2>Proposal Map</h2>
      <p className="muted">
        This maps the proposal into related parts. Read the list from top to bottom: high-priority
        items come first, then status, then type. Click an item to see what it affects.
      </p>
      <div className="entity-summary-grid">
        <div className="entity-summary-card">
          <h3>Priority order</h3>
          <p>
            <span className="entity-badge priority-high">High {priorityCounts.High ?? 0}</span>
            <span className="entity-badge priority-medium">Medium {priorityCounts.Medium ?? 0}</span>
          </p>
        </div>
        <div className="entity-summary-card">
          <h3>Status order</h3>
          <p>
            {['Active', 'In Progress', 'Planned', 'Measured', 'Approved'].map((status) => (
              <span key={status} className={`entity-badge status-${status.toLowerCase().replaceAll(' ', '-')}`}>
                {status} {statusCounts[status] ?? 0}
              </span>
            ))}
          </p>
        </div>
        <div className="entity-summary-card">
          <h3>Type groups</h3>
          <p>
            {['strategy', 'integration', 'segment', 'revenue-stage', 'execution', 'metric', 'budget'].map(
              (type) => (
                <span key={type} className={`entity-badge type-${type}`}>
                  {readable(type)} {typeCounts[type] ?? 0}
                </span>
              ),
            )}
          </p>
        </div>
      </div>
      <div className="entity-layout">
        <div className="entity-list">
          {orderedEntities.map((entity) => (
            <button
              key={entity.id}
              type="button"
              onClick={() => setSelected(entity.id)}
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
        {selectedEntity ? <EntityDetail entity={selectedEntity} /> : null}
      </div>
    </section>
  )
}
