import { strategy } from '../lib/data'
import { useComprehensionCue } from '../lib/useComprehensionCue'

export function StrategyMap() {
  const { cue, cueClass } = useComprehensionCue()
  const pillarClasses = ['pill-blue', 'pill-green', 'pill-amber', 'pill-violet']

  return (
    <section className="card">
      <h2>Proposal Overview</h2>
      <div className="grid three">
        {strategy.hybrid_layers.map((layer) => (
          <article key={layer.id} className="subcard cue-click" onClick={() => cue('pillars')}>
            <h3>{layer.name}</h3>
            <p>{layer.description}</p>
          </article>
        ))}
      </div>
      <h3>CoreThink Pillars</h3>
      <div className={cueClass('pillars', 'pillars')}>
        {strategy.pillars.map((pillar, index) => (
          <span key={pillar} className={`pill ${pillarClasses[index % pillarClasses.length]}`}>
            {pillar}
          </span>
        ))}
      </div>
    </section>
  )
}
