import { acquisitionChannels, budget, customerSegments, pricing, quarterlyProjections, strategy } from '../lib/data'
import { money } from '../lib/format'
import { useComprehensionCue } from '../lib/useComprehensionCue'

export function ExecutiveSummary() {
  const { cue, cueClass } = useComprehensionCue()
  const projection = strategy.one_year_projection
  const finalQuarter = quarterlyProjections.quarters.at(-1)
  const primarySegments = customerSegments.segments
    .filter((segment) => segment.priority === 'High')
    .slice(0, 4)
  const primaryChannelIds = new Set([
    'docs-tutorials',
    'oss-integrations',
    'bay-area-field-motion',
    'web3-security-motion',
    'enterprise-modernization-motion',
  ])
  const primaryChannels = acquisitionChannels.channels.filter((channel) => primaryChannelIds.has(channel.id))
  const pilotTier = pricing.tiers.find((tier) => tier.id === 'design-partner-pilot')
  const productionTier = pricing.tiers.find((tier) => tier.id === 'annual-production-contract')

  return (
    <section className="card executive-summary">
      <p className="eyebrow">Executive summary</p>
      <h1 className="title-xl">CoreThink 12-month growth and partnerships plan</h1>
      <p className="executive-lede">
        Turn the CoreThink/OpenClaw strategy into a measurable sales plan: developer adoption,
        paid pilot projects, and annual contracts.
      </p>

      <div className={cueClass('executive-targets', 'grid three executive-metrics')} aria-label="Year-one executive targets">
        <div className="metric metric-blue cue-click" onClick={() => cue('recommendation')}>
          <span>Execution investment</span>
          <strong>{money(strategy.investment.total_investment)}</strong>
          <small>
            {money(strategy.investment.salary)} salary +{' '}
            {money(strategy.investment.gtm_and_tooling_budget)} operating budget
          </small>
        </div>
        <div className="metric metric-green cue-click" onClick={() => cue('recommendation')}>
          <span>Year-one signed revenue target</span>
          <strong>{money(projection.cumulative_bookings)}</strong>
          <small>
            {projection.paid_pilots} pilots and {projection.annual_contracts} annual contracts
          </small>
        </div>
        <div className="metric metric-violet cue-click" onClick={() => cue('recommendation')}>
          <span>Month-12 customer base</span>
          <strong>{projection.cumulative_paying_logos} paying customers</strong>
          <small>
            {projection.activated_builders} active builders and {projection.qualified_opportunities}{' '}
            qualified sales opportunities
          </small>
        </div>
      </div>

      <div className={cueClass('recommendation', 'executive-section cue-click')} onClick={() => cue('pricing')}>
        <h2>Recommendation</h2>
        <p>
          Position CoreThink as safe AI for technical teams: local models handle frequent routine
          work, CoreThink handles higher-value reasoning, and local execution preserves workspace
          control. This keeps the commercial story tied to CoreThink&apos;s core pillars:
          domain-specific languages, improved coding, improved cybersecurity, and improved planning.
        </p>
      </div>

      <div className="grid two executive-section">
        <div className={cueClass('pricing', 'subcard cue-click')} onClick={() => cue('acquisition')}>
          <h3>Pricing model to test</h3>
          <p>
            Start with free community adoption, convert serious teams into{' '}
            <strong>
              {pilotTier?.price_range ?? '$20,000-$30,000'} {pilotTier?.duration ?? '6-8 week'}{' '}
              design-partner pilots
            </strong>
            , then graduate validated workflows into{' '}
            <strong>
              {productionTier?.price_range ?? '$75,000-$150,000 + usage'} production annual
              contracts
            </strong>
            .
          </p>
          <p className="tiny">
            Base case assumes a $25K average pilot, a $90K average first-year annual contract, and a
            Q3 break-even point against the {money(budget.total_budget)} investment.
          </p>
        </div>

        <div className="subcard cue-click" onClick={() => cue('acquisition')}>
          <h3>Primary customer segments</h3>
          <ul className="executive-list">
            {primarySegments.map((segment) => (
              <li key={segment.id}>
                <strong>{segment.name}:</strong> {segment.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={cueClass('acquisition', 'executive-section cue-click')} onClick={() => cue('growth')}>
        <h2>Customer acquisition plan</h2>
        <div className="executive-channel-grid">
          {primaryChannels.map((channel) => (
            <article className="subcard" key={channel.id}>
              <h3>{channel.name}</h3>
              <p>{channel.action}</p>
              <span className="tiny">{channel.output}</span>
            </article>
          ))}
        </div>
      </div>

      <div className={cueClass('growth', 'executive-section')}>
        <h2>12-month customer growth projection</h2>
        <div className="table-wrap executive-table">
          <table>
            <thead>
              <tr>
                <th>Quarter</th>
                <th>Main objective</th>
                <th>Active builders</th>
                <th>Qualified opportunities</th>
                <th>New pilots</th>
                <th>New annuals</th>
                <th>Paying customers</th>
                <th>Signed revenue</th>
              </tr>
            </thead>
            <tbody>
              {quarterlyProjections.quarters.map((quarter) => (
                <tr key={quarter.id}>
                  <td>
                    <strong>{quarter.id}</strong>
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
        <p className="tiny">
          Signed revenue math: 6 paid pilots x $25K average = $150K; 4 annual contracts x $90K
          average = $360K; total base-case year-one signed contract value ={' '}
          {money(finalQuarter?.cumulative_bookings ?? projection.cumulative_bookings)}.
        </p>
      </div>

      <div className="grid two executive-section">
        <div className="subcard">
          <h3>First 90 days</h3>
          <p>
            Set up CRM and analytics, publish CoreThink/OpenClaw guides, ship the first working demo,
            define pilot success criteria, rank 50 target companies, secure 8-10 design-partner
            conversations, and move at least one paid pilot into contract.
          </p>
        </div>
        <div className="subcard">
          <h3>Success metrics</h3>
          <p>
            Track active builders, docs completions, integration installs, demo runs, qualified
            meetings, paid pilots, pilot-to-annual-contract movement, signed revenue, renewal
            signals, and product feedback mapped to CoreThink&apos;s four pillars.
          </p>
        </div>
      </div>

      <p className="assumption cue-click" onClick={() => cue('executive-targets')}>
        {strategy.disclaimer}
      </p>
    </section>
  )
}
