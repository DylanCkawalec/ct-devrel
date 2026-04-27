import { CustomerGrowthTimeline } from '../components/CustomerGrowthTimeline'
import { QuarterlyProjectionTable } from '../components/QuarterlyProjectionTable'

export function GrowthPage() {
  return (
    <div className="stack">
      <CustomerGrowthTimeline />
      <QuarterlyProjectionTable />
    </div>
  )
}
