import { pricing } from '../lib/data'
import { useComprehensionCue } from '../lib/useComprehensionCue'

export function PricingModel() {
  const { cue, cueClass } = useComprehensionCue()

  return (
    <section className="card">
      <h2>Pricing Model</h2>
      <div className={cueClass('pricing-grid', 'grid three')}>
        {pricing.tiers.map((tier, index) => {
          const nextTier = pricing.tiers[index + 1] ?? pricing.tiers[0]
          return (
          <article
            key={tier.id}
            className={cueClass(tier.id, 'subcard cue-click')}
            onClick={() => cue(nextTier.id)}
          >
            <h3>{tier.name}</h3>
            <p className="price">{tier.price_range}</p>
            <p className="muted">{tier.duration}</p>
            <p>{tier.purpose}</p>
            <ul>
              {tier.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="note">
              <strong>Next step:</strong> {tier.conversion_goal}
            </p>
          </article>
          )
        })}
      </div>
      {pricing.notes.map((note) => (
        <p key={note} className="assumption cue-click" onClick={() => cue('pricing-grid')}>
          {note}
        </p>
      ))}
    </section>
  )
}
