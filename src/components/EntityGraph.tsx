import { useMemo, useState } from 'react'
import { entities } from '../lib/data'
import type { StrategyEntity } from '../types'

function EntityDetail({ entity }: { entity: StrategyEntity }) {
  return (
    <article className="subcard">
      <h3>{entity.title}</h3>
      <p>{entity.description}</p>
      <p className="tiny">Type: {entity.type}</p>
      <p className="tiny">Priority: {entity.priority}</p>
      <p className="tiny">Owner: {entity.owner}</p>
      <p className="tiny">Status: {entity.status}</p>
      <p className="tiny">Pillars: {entity.related_pillars.join(', ')}</p>
      <p className="tiny">Metrics: {entity.related_metrics.join(', ')}</p>
      <p className="tiny">Channels: {entity.related_channels.join(', ')}</p>
      <p className="tiny">Quarters: {entity.related_quarters.join(', ')}</p>
    </article>
  )
}

export function EntityGraph() {
  const [selected, setSelected] = useState<string>(entities.entities[0]?.id ?? '')

  const selectedEntity = useMemo(
    () => entities.entities.find((entity) => entity.id === selected) ?? entities.entities[0],
    [selected],
  )

  return (
    <section className="card">
      <h2>Entity Graph</h2>
      <p className="muted">
        Click an entity to inspect description, metrics, channels, quarters, and ownership.
      </p>
      <div className="entity-layout">
        <div className="entity-list">
          {entities.entities.map((entity) => (
            <button
              key={entity.id}
              type="button"
              onClick={() => setSelected(entity.id)}
              className={entity.id === selected ? 'entity-button active' : 'entity-button'}
            >
              {entity.title}
            </button>
          ))}
        </div>
        {selectedEntity ? <EntityDetail entity={selectedEntity} /> : null}
      </div>
    </section>
  )
}
