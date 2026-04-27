import { entities, systemTree } from '../lib/data'

export function SystemTreeViewer() {
  return (
    <section className="card">
      <h2>System Tree</h2>
      <p className="muted">Root: {systemTree.root.name}</p>
      <div className="grid two">
        {systemTree.branches.map((branch) => (
          <article key={branch.id} className="subcard">
            <h3>{branch.name}</h3>
            <ul>
              {branch.entity_ids.map((entityId) => {
                const entity = entities.entities.find((item) => item.id === entityId)
                return <li key={entityId}>{entity ? entity.title : entityId}</li>
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
