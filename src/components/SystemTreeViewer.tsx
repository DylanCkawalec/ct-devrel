import { entities, systemTree } from '../lib/data'
import { useComprehensionCue } from '../lib/useComprehensionCue'

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
  'branch-strategy': 'Start here: the thesis, the product wedge, and why CoreThink matters.',
  'branch-segments': 'Who the proposal is aimed at before money or channels are discussed.',
  'branch-pricing': 'How interest becomes paid pilots, then annual contracts.',
  'branch-acquisition': 'Where customers come from and what work creates demand.',
  'branch-roadmap': 'What gets built and shipped to make the plan credible.',
  'branch-growth': 'How the first-year customer and signed revenue targets are counted.',
  'branch-metrics': 'Which signals show whether execution is working.',
  'branch-budget': 'What resources support the role and execution plan.',
  'branch-deliverable-entities': 'Appendix: the connected entities behind the proposal.',
}

const proposalFlow = [
  { id: 'branch-strategy', phase: '1', label: 'Thesis', tone: 'tree-flow-blue' },
  { id: 'branch-segments', phase: '2', label: 'Customer', tone: 'tree-flow-violet' },
  { id: 'branch-pricing', phase: '3', label: 'Commercial', tone: 'tree-flow-green' },
  { id: 'branch-acquisition', phase: '4', label: 'Demand', tone: 'tree-flow-amber' },
  { id: 'branch-roadmap', phase: '5', label: 'Execution', tone: 'tree-flow-cyan' },
  { id: 'branch-growth', phase: '6', label: 'Targets', tone: 'tree-flow-pink' },
  { id: 'branch-metrics', phase: '7', label: 'Proof', tone: 'tree-flow-lime' },
  { id: 'branch-budget', phase: '8', label: 'Resources', tone: 'tree-flow-white' },
  { id: 'branch-deliverable-entities', phase: 'Appendix', label: 'Map', tone: 'tree-flow-gray' },
]

const branchById = new Map(systemTree.branches.map((branch) => [branch.id, branch]))
const orderedBranches = proposalFlow
  .map((step) => {
    const branch = branchById.get(step.id)
    return branch ? { ...step, branch } : null
  })
  .filter((step) => step !== null)
const readable = (value: string) => value.replaceAll('-', ' ')

export function SystemTreeViewer() {
  const { cue, cueClass } = useComprehensionCue()

  return (
    <section className="card">
      <h2>Proposal Structure</h2>
      <p className="muted">
        Market thesis, target customers, pricing model, demand plan, execution work, growth targets,
        success metrics, and resource ask.
      </p>
      <div className="system-tree-grid">
        {orderedBranches.map((step, index) => {
          const nextStep = orderedBranches[index + 1] ?? orderedBranches[0]
          const branchEntities = step.branch.entity_ids
            .map((entityId) => entities.entities.find((item) => item.id === entityId))
            .filter((entity) => entity !== undefined)
            .sort(
              (a, b) =>
                (priorityOrder[a.priority] ?? 99) - (priorityOrder[b.priority] ?? 99) ||
                (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99) ||
                a.title.localeCompare(b.title),
            )

          return (
            <article
              key={step.id}
              className={cueClass(step.id, `tree-card tree-flow-card ${step.tone} cue-click`)}
              onClick={() => cue(nextStep.id)}
            >
              <div className="tree-card-head">
                <div>
                  <span className="tree-step-number">{step.phase}</span>
                  <h3>{step.branch.name}</h3>
                </div>
                <span>{branchEntities.length} items</span>
              </div>
              <p className="muted">{branchPurpose[step.id] ?? 'Related proposal items.'}</p>
              <div className="tree-entity-list">
                {branchEntities.map((entity) => (
                  <div key={entity.id} className="tree-entity-row">
                    <span className={`entity-dot priority-dot-${entity.priority.toLowerCase()}`} />
                    <div className="tree-entity-copy">
                      <strong className="tree-entity-title">{entity.title}</strong>
                      <small className="tree-entity-meta">
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
