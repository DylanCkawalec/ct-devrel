import { metrics } from '../lib/data'
import { useComprehensionCue } from '../lib/useComprehensionCue'

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
    description: 'Revenue, pilots, contracts, and sales opportunity movement.',
    className: 'cadence-white',
  },
  {
    cadence: 'Quarterly',
    title: 'Quarterly retention review',
    description: 'Customer health and retention trends after enough customer activity exists.',
    className: 'cadence-white',
  },
]

const metricLabel: Record<string, string> = {
  docs_shipped: 'docs shipped',
  partner_integrations: 'partner integrations',
  activated_builders: 'active builders',
  partner_meetings: 'partner meetings',
  demos_delivered: 'demos delivered',
  pipeline_influenced: 'sales opportunities helped',
  product_feedback_loops: 'product feedback loops',
  paid_pilots: 'paid pilots',
  annual_contracts: 'annual contracts',
  cumulative_bookings: 'signed revenue',
  logo_retention: 'paying customer retention',
  expansion_pipeline: 'expansion opportunities',
}

const readableName = (name: string) => metricLabel[name] ?? name.replaceAll('_', ' ')

const cadenceGroups: CadenceGroup[] = cadenceOrder.map((group) => ({
  ...group,
  items: allMetrics.filter((item) => item.update_cadence === group.cadence),
}))

function MetricGroup({
  group,
  className,
  onClick,
}: {
  group: CadenceGroup
  className: string
  onClick: () => void
}) {
  return (
    <article className={className} onClick={onClick}>
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
  const { cue, cueClass } = useComprehensionCue()

  return (
    <section className="card">
      <h2>Success Metrics</h2>
      <p className="muted">
        Early signals show whether the plan is working. Revenue signals show whether it is
        converting.
      </p>
      <p className="owner-note">
        <strong>Primary owner:</strong> developer relations / growth lead. Recommended support:
        partnerships for meetings and integrations, sales for pilots and annual contracts, finance
        for signed revenue, and customer success for retention.
      </p>
      <div className="cadence-grid">
        {cadenceGroups.map((group, index) => {
          const nextGroup = cadenceGroups[index + 1] ?? cadenceGroups[0]
          return (
            <MetricGroup
              key={group.cadence}
              group={group}
              className={cueClass(group.cadence, `cadence-card ${group.className} cue-click`)}
              onClick={() => cue(nextGroup.cadence)}
            />
          )
        })}
      </div>
    </section>
  )
}
