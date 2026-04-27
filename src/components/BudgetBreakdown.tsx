import { budget, strategy } from '../lib/data'
import { money } from '../lib/format'
import { useComprehensionCue } from '../lib/useComprehensionCue'

const categoryEmoji: Record<string, string> = {
  Compensation: '👤',
  Operations: '🧭',
  Content: '✍️',
  'Field Sales': '🤝',
  Engineering: '🛠️',
  Partnerships: '📣',
}

const resourceDetails: Record<string, string[]> = {
  'salary-dylan': [
    'Covers one owner for developer relations, growth engineering, partnerships, demos, and field feedback.',
    'Assumes this person creates the technical proof while helping move pilots toward contracts.',
  ],
  'tooling-systems': [
    'Includes CRM, analytics, account tracking, email/domain tools, and reporting systems.',
    'Used to measure meetings, sales opportunities, follow-up, and whether the plan is converting.',
  ],
  'content-production': [
    'Covers editing, design, diagrams, short videos, and polished technical guides.',
    'Used for CoreThink/OpenClaw guides, benchmark explainers, and buyer-ready one-pagers.',
  ],
  'events-travel': [
    'Covers Bay Area meetups, founder dinners, design-partner sessions, and local travel.',
    'Used to create trust, collect feedback, and qualify pilot candidates faster.',
  ],
  'demo-infrastructure': [
    'Covers sandboxes, benchmark runs, sample repos, and reproducible demo environments.',
    'Used to show buyers concrete proof instead of asking them to trust a pitch.',
  ],
  'partner-campaign-support': [
    'Covers partner collateral, co-marketing support, and lightweight campaign materials.',
    'Used to reach shared audiences through partners and technical communities.',
  ],
}

export function BudgetBreakdown() {
  const { cue, cueClass } = useComprehensionCue()
  const gap = budget.year_one_booking_target - budget.total_budget

  return (
    <section className="card">
      <h2>Budget and Role Justification</h2>
      <p className="muted">
        This is the resource plan behind the proposal. It accounts for one primary owner plus the
        tools, content, demos, events, and partner support needed to turn technical interest into
        paid pilots and annual contracts.
      </p>
      <p className="role-note">
        <strong>Role scope:</strong> developer relations + growth engineering + partnerships. The
        ask is not for content alone; it is for a technical operator who can publish proof, run field
        demos, manage feedback, and help build sales opportunities.
      </p>
      <div className="budget-grid">
        {budget.items.map((item) => (
          <article key={item.id} className="budget-card cue-click" onClick={() => cue('budget-summary')}>
            <div className="budget-card-head">
              <span className="category-chip">
                <span aria-hidden="true">{categoryEmoji[item.category] ?? '•'}</span> {item.category}
              </span>
              <strong className="budget-amount">{money(item.amount)}</strong>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <ul className="budget-bullets">
              {(resourceDetails[item.id] ?? []).map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className={cueClass('budget-summary', 'grid three')}>
        <div className="metric metric-green">
          <span>Total Investment</span>
          <strong>{money(budget.total_budget)}</strong>
        </div>
        <div className="metric metric-green">
          <span>Year-One Signed Revenue Target</span>
          <strong>{money(budget.year_one_booking_target)}</strong>
        </div>
        <div className="metric metric-green">
          <span>Planning Delta</span>
          <strong>{money(gap)}</strong>
        </div>
      </div>
      <p className="assumption cue-click" onClick={() => cue('budget-summary')}>
        {strategy.disclaimer}
      </p>
    </section>
  )
}
