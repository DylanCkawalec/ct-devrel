import { metrics } from '../lib/data'

type MetricItem = (typeof metrics.leading)[number]
type CadenceGroup = {
  cadence: string
  title: string
  description: string
  className: string
  items: MetricItem[]
}

const allMetrics = [...metrics.leading, ...metrics.lagging]

const cadenceOrder: Array<Omit<CadenceGroup, 'items'>> = [
  {
    cadence: 'Weekly',
    title: 'Weekly check-in',
    description: 'Fast signals: shipping, adoption, meetings, and demos.',
    className: 'cadence-light-blue',
  },
  {
    cadence: 'Bi-weekly',
    title: 'Bi-weekly review',
    description: 'Partnership releases and product feedback that need enough time to mature.',
    className: 'cadence-mid-blue',
  },
  {
    cadence: 'Monthly',
    title: 'Monthly business review',
    description: 'Revenue, pilots, contracts, and pipeline movement.',
    className: 'cadence-white',
  },
  {
    cadence: 'Quarterly',
    title: 'Quarterly retention review',
    description: 'Customer health and retention trends after enough customer activity exists.',
    className: 'cadence-white',
  },
]

const readableName = (name: string) => name.replaceAll('_', ' ')

const cadenceGroups: CadenceGroup[] = cadenceOrder.map((group) => ({
  ...group,
  items: allMetrics.filter((item) => item.update_cadence === group.cadence),
}))

function MetricGroup({ group }: { group: CadenceGroup }) {
  return (
    <article className={`cadence-card ${group.className}`}>
      <div className="cadence-card-head">
        <span>{group.cadence}</span>
        <h3>{group.title}</h3>
      </div>
      <p className="muted">{group.description}</p>
      <div className="stack">
        {group.items.map((item) => (
          <div key={item.name} className="metric-line">
            <h4>{readableName(item.name)}</h4>
            <p>{item.description}</p>
            <p className="tiny">Source: {item.input_source}</p>
            <p className="tiny">
              <strong>How to measure:</strong> {item.calculation_method}.
            </p>
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
      <p className="owner-note">
        <strong>Primary owner:</strong> DevRel / growth lead. Recommended support: partnerships for
        meetings and integrations, sales for pilots and annual contracts, finance for bookings, and
        customer success for retention.
      </p>
      <div className="cadence-grid">
        {cadenceGroups.map((group) => (
          <MetricGroup key={group.cadence} group={group} />
        ))}
      </div>
    </section>
  )
}
