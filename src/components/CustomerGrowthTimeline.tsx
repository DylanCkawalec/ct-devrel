import { quarterlyProjections } from '../lib/data'
import { money } from '../lib/format'

export function CustomerGrowthTimeline() {
  return (
    <section className="card">
      <h2>Customer Growth by Quarter</h2>
      <div className="timeline">
        {quarterlyProjections.quarters.map((quarter) => (
          <article key={quarter.id} className="subcard">
            <h3>{quarter.id}</h3>
            <p className="muted">{quarter.objective}</p>
            <ul>
              <li>Reached builders: {quarter.activated_builders}</li>
              <li>Qualified opportunities: {quarter.qualified_opportunities}</li>
              <li>New paid pilots: {quarter.new_paid_pilots}</li>
              <li>New annual contracts: {quarter.new_annual_contracts}</li>
              <li>Total paying customers: {quarter.cumulative_paying_logos}</li>
              <li>Bookings to date: {money(quarter.cumulative_bookings)}</li>
            </ul>
          </article>
        ))}
      </div>
      <p className="assumption">{quarterlyProjections.disclaimer}</p>
    </section>
  )
}
