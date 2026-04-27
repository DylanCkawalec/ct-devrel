import { SegmentExplorer } from '../components/SegmentExplorer'
import { StrategyMap } from '../components/StrategyMap'

export function StrategyPage() {
  return (
    <div className="stack">
      <StrategyMap />
      <SegmentExplorer />
    </div>
  )
}
