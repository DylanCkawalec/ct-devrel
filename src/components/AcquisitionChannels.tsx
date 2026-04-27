import { acquisitionChannels } from '../lib/data'

export function AcquisitionChannels() {
  return (
    <section className="card">
      <h2>Customer Acquisition Channels</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Channel</th>
              <th>Audience</th>
              <th>Action</th>
              <th>Output</th>
              <th>Primary Metrics</th>
            </tr>
          </thead>
          <tbody>
            {acquisitionChannels.channels.map((channel) => (
              <tr key={channel.id}>
                <td>{channel.name}</td>
                <td>{channel.audience}</td>
                <td>{channel.action}</td>
                <td>{channel.output}</td>
                <td>{channel.primary_metrics.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
