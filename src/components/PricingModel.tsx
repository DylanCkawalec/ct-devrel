import { pricing } from '../lib/data'

export function PricingModel() {
  return (
    <section className="card">
      <h2>Pricing Model</h2>
      <div className="grid three">
        {pricing.tiers.map((tier) => (
          <article key={tier.id} className="subcard">
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
              <strong>Conversion goal:</strong> {tier.conversion_goal}
            </p>
          </article>
        ))}
      </div>
      {pricing.notes.map((note) => (
        <p key={note} className="assumption">
          {note}
        </p>
      ))}
    </section>
  )
}
