import { entities, systemTree } from '../lib/data'

const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 }
const typeOrder: Record<string, number> = {
  strategy: 0,
  integration: 1,
  segment: 2,
  'revenue-stage': 3,
  execution: 4,
  metric: 5,
  budget: 6,
}

const branchPurpose: Record<string, string> = {
  'branch-strategy': 'How the proposal is positioned.',
  'branch-pricing': 'How interest turns into paid pilots and contracts.',
  'branch-acquisition': 'Where prospects come from and how they are reached.',
  'branch-segments': 'Which customer groups matter first.',
  'branch-growth': 'How the year-one numbers are measured.',
  'branch-metrics': 'Which signals prove the plan is working.',
  'branch-budget': 'Which resources support execution.',
  'branch-roadmap': 'What gets built and shipped over time.',
  'branch-deliverable-entities': 'The core entities that connect the whole proposal.',
}

const orderedBranches = [...systemTree.branches].sort((a, b) => a.name.localeCompare(b.name))
const readable = (value: string) => value.replaceAll('-', ' ')

export function SystemTreeViewer() {
  return (
    <section className="card">
      <h2>Proposal Structure</h2>
      <p className="muted">
        Root: <strong>{systemTree.root.name}</strong>. Each card groups related parts of the
        proposal. Items inside each card are ordered by priority first, then type.
      </p>
      <div className="system-tree-grid">
        {orderedBranches.map((branch) => {
          const branchEntities = branch.entity_ids
            .map((entityId) => entities.entities.find((item) => item.id === entityId))
            .filter((entity) => entity !== undefined)
            .sort(
              (a, b) =>
                (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99) ||
                (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99) ||
                a.title.localeCompare(b.title),
            )

          return (
            <article key={branch.id} className="tree-card">
              <div className="tree-card-head">
                <h3>{branch.name}</h3>
                <span>{branchEntities.length} items</span>
              </div>
              <p className="muted">{branchPurpose[branch.id] ?? 'Related proposal items.'}</p>
              <div className="tree-entity-list">
                {branchEntities.map((entity) => (
                  <div key={entity.id} className="tree-entity-row">
                    <span className={`entity-dot priority-dot-${entity.priority.toLowerCase()}`} />
                    <div>
                      <strong>{entity.title}</strong>
                      <small>
                        {entity.priority} · {readable(entity.type)} · {entity.status}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
