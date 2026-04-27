import { quarterlyProjections } from '../lib/data'
import { money } from '../lib/format'

export function QuarterlyProjectionTable() {
  return (
    <section className="card">
      <h2>Quarterly Targets</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Quarter</th>
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
                <td>{quarter.id}</td>
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
