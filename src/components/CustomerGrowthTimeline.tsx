import { quarterlyProjections } from '../lib/data'
import { money } from '../lib/format'

const quarterPeriods: Record<string, string> = {
  Q1: 'May-Jul 2026',
  Q2: 'Aug-Oct 2026',
  Q3: 'Nov 2026-Jan 2027',
  Q4: 'Feb-Apr 2027',
}

export function CustomerGrowthTimeline() {
  return (
    <section className="card">
      <h2>Customer Growth by Quarter</h2>
      <p className="muted">
        This starts in <strong>May 2026</strong>. The numbers assume a focused ICP: software-heavy
        SMB and mid-market teams, often <strong>10-50 person technical teams</strong>, plus larger
        enterprise platform or security groups when there is a clear pilot path.
      </p>
      <div className="timeline">
        {quarterlyProjections.quarters.map((quarter) => (
          <article key={quarter.id} className="subcard">
            <h3>
              {quarter.id} <span className="quarter-period">{quarterPeriods[quarter.id]}</span>
            </h3>
            <p className="muted">{quarter.objective}</p>
            <dl className="growth-metrics">
              <div>
                <dt className="growth-label growth-orange">Reached builders:</dt>
                <dd>{quarter.activated_builders}</dd>
              </div>
              <div>
                <dt className="growth-label growth-red">Qualified opportunities:</dt>
                <dd>{quarter.qualified_opportunities}</dd>
              </div>
              <div>
                <dt className="growth-label growth-green">New paid pilots:</dt>
                <dd>{quarter.new_paid_pilots}</dd>
              </div>
              <div>
                <dt className="growth-label growth-green">New annual contracts:</dt>
                <dd>{quarter.new_annual_contracts}</dd>
              </div>
              <div>
                <dt className="growth-label growth-light-green">Total paying customers:</dt>
                <dd>{quarter.cumulative_paying_logos}</dd>
              </div>
              <div>
                <dt className="growth-label growth-pink">Bookings to date:</dt>
                <dd>{money(quarter.cumulative_bookings)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <p className="target-note">
        Target examples used to size the plan include local-first builder ecosystems such as
        <strong> Ollama</strong>, <strong>Continue</strong>, <strong>Cline</strong>,
        <strong> Roo Code</strong>, <strong>Aider</strong>, <strong>OpenHands</strong>,
        <strong> LM Studio</strong>, and <strong>vLLM</strong>; security and audit teams such as
        <strong> OpenZeppelin</strong>, <strong>Trail of Bits</strong>, <strong>CertiK</strong>,
        <strong> Quantstamp</strong>, <strong>Spearbit</strong>, and <strong>Halborn</strong>; and
        enterprise teams working on large-codebase planning, modernization, or internal AI
        platforms. These are target-universe examples, not claimed customers.
      </p>
      <p className="assumption">{quarterlyProjections.disclaimer}</p>
    </section>
  )
}
