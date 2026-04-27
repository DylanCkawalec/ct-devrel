import { customerSegments } from '../lib/data'

const monthlyFocus = [
  {
    month: 'Month 1',
    title: 'Set the target list',
    segmentIds: ['local-first-agent-builders', 'bay-area-design-partners'],
    priority: 'High',
    action: 'Score the first local-first builders and Bay Area design partners.',
  },
  {
    month: 'Month 2',
    title: 'Start design-partner conversations',
    segmentIds: ['bay-area-design-partners', 'agentic-coding-tools'],
    priority: 'High',
    action: 'Run technical working sessions and identify the first pilot path.',
  },
  {
    month: 'Month 3',
    title: 'Close first pilot',
    segmentIds: ['agentic-coding-tools', 'security-conscious-smb'],
    priority: 'High',
    action: 'Turn early feedback into one paid pilot and a repeatable demo.',
  },
  {
    month: 'Month 4',
    title: 'Expand documentation reach',
    segmentIds: ['local-first-agent-builders', 'planning-agent-builders'],
    priority: 'High',
    action: 'Publish clearer guides and use them to qualify stronger inbound interest.',
  },
  {
    month: 'Month 5',
    title: 'Add security-focused targets',
    segmentIds: ['smart-contract-auditors', 'digital-asset-infra'],
    priority: 'Medium',
    action: 'Test the security and audit story with web3 and digital-asset teams.',
  },
  {
    month: 'Month 6',
    title: 'Convert one annual path',
    segmentIds: ['enterprise-complex-codebases', 'security-conscious-smb'],
    priority: 'High',
    action: 'Move the strongest pilot toward an annual contract.',
  },
  {
    month: 'Month 7',
    title: 'Prove vertical use cases',
    segmentIds: ['smart-contract-auditors', 'enterprise-complex-codebases'],
    priority: 'High',
    action: 'Package web3/security and enterprise reasoning examples for buyers.',
  },
  {
    month: 'Month 8',
    title: 'Build enterprise pipeline',
    segmentIds: ['enterprise-complex-codebases', 'internal-ai-platform'],
    priority: 'High',
    action: 'Focus on platform teams, security review, and large-codebase planning.',
  },
  {
    month: 'Month 9',
    title: 'Turn proof into repeatable sales material',
    segmentIds: ['legacy-modernization', 'planning-agent-builders'],
    priority: 'Medium',
    action: 'Create case notes, buyer FAQs, and repeatable pilot criteria.',
  },
  {
    month: 'Month 10',
    title: 'Push production conversion',
    segmentIds: ['enterprise-complex-codebases', 'internal-ai-platform'],
    priority: 'High',
    action: 'Prioritize annual contracts over broad, low-signal activity.',
  },
  {
    month: 'Month 11',
    title: 'Broaden partner coverage',
    segmentIds: ['digital-asset-infra', 'legacy-modernization'],
    priority: 'Medium',
    action: 'Use proven material to reach adjacent security and modernization teams.',
  },
  {
    month: 'Month 12',
    title: 'Review year-one result',
    segmentIds: ['bay-area-design-partners', 'enterprise-complex-codebases'],
    priority: 'High',
    action: 'Compare pilots, contracts, customers, and bookings against the proposal.',
  },
]

const getSegment = (id: string) => customerSegments.segments.find((segment) => segment.id === id)

export function SegmentExplorer() {
  return (
    <section className="card">
      <h2>Customer Focus Timeline</h2>
      <p className="muted">
        Month-by-month order for the target segments in the proposal. High-priority segments are
        worked earlier and revisited when there is a clear conversion path.
      </p>
      <div className="month-timeline">
        {monthlyFocus.map((item) => (
          <article key={item.month} className="timeline-card">
            <div className="timeline-head">
              <span className="month-label">{item.month}</span>
              <span
                className={
                  item.priority === 'High' ? 'priority-badge priority-high' : 'priority-badge priority-medium'
                }
              >
                {item.priority}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.action}</p>
            <div className="segment-tags">
              {item.segmentIds.map((segmentId) => {
                const segment = getSegment(segmentId)
                return segment ? (
                  <span key={segment.id} className="segment-tag">
                    {segment.name}
                  </span>
                ) : null
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
