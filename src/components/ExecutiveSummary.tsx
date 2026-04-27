import { strategy } from '../lib/data'
import { money } from '../lib/format'

export function ExecutiveSummary() {
  const projection = strategy.one_year_projection

  return (
    <section className="card">
      <h1 className="title-xl">CoreThink 12-month plan</h1>
      <p className="muted">{strategy.thesis}</p>
      <div className="grid three">
        <div className="metric metric-blue">
          <span>Investment Ask</span>
          <strong>{money(strategy.investment.total_investment)}</strong>
        </div>
        <div className="metric metric-green">
          <span>Year-one bookings target</span>
          <strong>{money(projection.cumulative_bookings)}</strong>
        </div>
        <div className="metric metric-violet">
          <span>Paying customers by month 12</span>
          <strong>{projection.cumulative_paying_logos}</strong>
        </div>
      </div>
      <p className="assumption">{strategy.disclaimer}</p>
    </section>
  )
}
