import { useEffect, useRef, useState } from 'react'
import { acquisitionChannels } from '../lib/data'

const metricLabel: Record<string, string> = {
  docs_shipped: 'docs shipped',
  activated_builders: 'active builders',
  qualified_opportunities: 'qualified sales opportunities',
  partner_integrations: 'partner integrations',
  pipeline_influenced: 'sales opportunities helped',
  partner_meetings: 'partner meetings',
  paid_pilots: 'paid pilots',
  annual_contracts: 'annual contracts',
  cumulative_bookings: 'signed revenue',
  demos_delivered: 'demos delivered',
}

function EmphasizedLead({ text }: { text: string }) {
  const [lead, ...rest] = text.split(' ')
  return (
    <>
      <strong>{lead}</strong> {rest.join(' ')}
    </>
  )
}

export function AcquisitionChannels() {
  const [glowingRowId, setGlowingRowId] = useState('')
  const [glowingColumn, setGlowingColumn] = useState('')
  const glowTimeoutRef = useRef<number | undefined>(undefined)
  const columnTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(
    () => () => {
      if (glowTimeoutRef.current !== undefined) {
        window.clearTimeout(glowTimeoutRef.current)
      }
      if (columnTimeoutRef.current !== undefined) {
        window.clearTimeout(columnTimeoutRef.current)
      }
    },
    [],
  )

  const glowRow = (id: string) => {
    if (glowTimeoutRef.current !== undefined) {
      window.clearTimeout(glowTimeoutRef.current)
    }
    setGlowingRowId('')
    window.requestAnimationFrame(() => setGlowingRowId(id))
    glowTimeoutRef.current = window.setTimeout(() => setGlowingRowId(''), 900)
  }

  const glowColumn = (column: string) => {
    if (columnTimeoutRef.current !== undefined) {
      window.clearTimeout(columnTimeoutRef.current)
    }
    setGlowingColumn('')
    window.requestAnimationFrame(() => setGlowingColumn(column))
    columnTimeoutRef.current = window.setTimeout(() => setGlowingColumn(''), 900)
  }

  return (
    <section className="card">
      <h2>How customers are reached</h2>
      <div className="table-wrap">
        <table className={glowingColumn ? `acquisition-table column-glow-${glowingColumn}` : 'acquisition-table'}>
          <thead>
            <tr>
              <th className="col-channel">
                <button type="button" className="column-head-button" onClick={() => glowColumn('channel')}>
                  Where we reach them
                </button>
              </th>
              <th className="col-audience">
                <button type="button" className="column-head-button" onClick={() => glowColumn('audience')}>
                  Who this is for
                </button>
              </th>
              <th className="col-action">
                <button type="button" className="column-head-button" onClick={() => glowColumn('action')}>
                  What we do
                </button>
              </th>
              <th className="col-output">
                <button type="button" className="column-head-button" onClick={() => glowColumn('output')}>
                  Expected next step
                </button>
              </th>
              <th className="col-metrics">
                <button type="button" className="column-head-button" onClick={() => glowColumn('metrics')}>
                  How we measure success
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {acquisitionChannels.channels.map((channel) => (
              <tr
                key={channel.id}
                className={glowingRowId === channel.id ? 'row-glow' : ''}
                onClick={() => glowRow(channel.id)}
              >
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
                        {metricLabel[metric] ?? metric.replaceAll('_', ' ')}
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
