import { metrics } from '../lib/data'

function MetricGroup({ title, items }: { title: string; items: typeof metrics.leading }) {
  return (
    <article className="subcard">
      <h3>{title}</h3>
      <div className="stack">
        {items.map((item) => (
          <div key={item.name} className="metric-line">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p className="tiny">Source: {item.input_source}</p>
            <p className="tiny">Method: {item.calculation_method}</p>
            <p className="tiny">Cadence: {item.update_cadence}</p>
            <p className="tiny">Owner: {item.responsible_owner}</p>
          </div>
        ))}
      </div>
    </article>
  )
}

export function MetricsDashboard() {
  return (
    <section className="card">
      <h2>Success Metrics</h2>
      <p className="muted">
        Early signals show whether the plan is working. Revenue signals show whether it is
        converting.
      </p>
      <div className="grid two">
        <MetricGroup title="Leading Indicators" items={metrics.leading} />
        <MetricGroup title="Lagging Indicators" items={metrics.lagging} />
      </div>
    </section>
  )
}
