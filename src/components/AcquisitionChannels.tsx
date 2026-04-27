import { acquisitionChannels } from '../lib/data'

function EmphasizedLead({ text }: { text: string }) {
  const [lead, ...rest] = text.split(' ')
  return (
    <>
      <strong>{lead}</strong> {rest.join(' ')}
    </>
  )
}

export function AcquisitionChannels() {
  return (
    <section className="card">
      <h2>How customers are reached</h2>
      <p className="muted">
        Read each row left to right: <strong>where we reach people</strong>, <strong>who it is for</strong>,{' '}
        <strong>what we do</strong>, <strong>what should happen next</strong>, and{' '}
        <strong>how success is measured</strong>.
      </p>
      <div className="table-wrap">
        <table className="acquisition-table">
          <thead>
            <tr>
              <th className="col-channel">Where we reach them</th>
              <th className="col-audience">Who this is for</th>
              <th className="col-action">What we do</th>
              <th className="col-output">Expected next step</th>
              <th className="col-metrics">How we measure success</th>
            </tr>
          </thead>
          <tbody>
            {acquisitionChannels.channels.map((channel) => (
              <tr key={channel.id}>
                <td className="col-channel">
                  <strong>{channel.name}</strong>
                </td>
                <td className="col-audience">
                  <strong>{channel.audience}</strong>
                </td>
                <td className="col-action">
                  <EmphasizedLead text={channel.action} />
                </td>
                <td className="col-output">
                  <EmphasizedLead text={channel.output} />
                </td>
                <td className="col-metrics">
                  <div className="metric-tags">
                    {channel.primary_metrics.map((metric) => (
                      <span key={metric} className="metric-tag">
                        {metric.replaceAll('_', ' ')}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
