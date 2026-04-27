import { budget, strategy } from '../lib/data'
import { money } from '../lib/format'

export function BudgetBreakdown() {
  const gap = budget.year_one_booking_target - budget.total_budget

  return (
    <section className="card">
      <h2>Budget and Role Justification</h2>
      <p>
        This role spans <strong>DevRel + Growth Engineering + Partnerships</strong>, not only content.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Budget Item</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {budget.items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{money(item.amount)}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid three">
        <div className="metric">
          <span>Total Investment</span>
          <strong>{money(budget.total_budget)}</strong>
        </div>
        <div className="metric">
          <span>Year-One Bookings Target</span>
          <strong>{money(budget.year_one_booking_target)}</strong>
        </div>
        <div className="metric">
          <span>Planning Delta</span>
          <strong>{money(gap)}</strong>
        </div>
      </div>
      <p className="assumption">{strategy.disclaimer}</p>
    </section>
  )
}
