import { quarterlyProjections } from '../lib/data'
import { money } from '../lib/format'

const quarterPeriods: Record<string, string> = {
  Q1: 'May-Jul 2026',
  Q2: 'Aug-Oct 2026',
  Q3: 'Nov 2026-Jan 2027',
  Q4: 'Feb-Apr 2027',
}

export function QuarterlyProjectionTable() {
  return (
    <section className="card">
      <h2>Quarterly Targets and Rationale</h2>
      <p className="muted">
        The targets step up from <strong>docs and design-partner proof</strong> to
        <strong> paid pilots</strong>, then to <strong>annual contracts</strong>. This matches the
        proposal docs: technical proof first, Bay Area and ecosystem feedback second, then focused
        conversion with security, developer-tooling, and enterprise planning buyers.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Quarter / Period</th>
              <th>Objective</th>
              <th>Reached Builders</th>
              <th>Qualified Opportunities</th>
              <th>Paid Pilots</th>
              <th>Annual Contracts</th>
              <th>Total Paying Customers</th>
              <th>Bookings to Date</th>
            </tr>
          </thead>
          <tbody>
            {quarterlyProjections.quarters.map((quarter) => (
              <tr key={quarter.id}>
                <td>
                  <strong>{quarter.id}</strong>
                  <br />
                  <span className="tiny">{quarterPeriods[quarter.id]}</span>
                </td>
                <td>{quarter.objective}</td>
                <td>{quarter.activated_builders}</td>
                <td>{quarter.qualified_opportunities}</td>
                <td>{quarter.new_paid_pilots}</td>
                <td>{quarter.new_annual_contracts}</td>
                <td>{quarter.cumulative_paying_logos}</td>
                <td>{money(quarter.cumulative_bookings)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
