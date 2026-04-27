import { z } from 'zod'

export const strategySchema = z.object({
  id: z.string(),
  title: z.string(),
  thesis: z.string(),
  request: z.string(),
  answer: z.string(),
  one_year_projection: z.object({
    activated_builders: z.number(),
    qualified_opportunities: z.number(),
    paid_pilots: z.number(),
    annual_contracts: z.number(),
    cumulative_paying_logos: z.number(),
    cumulative_bookings: z.number(),
  }),
  investment: z.object({
    salary: z.number(),
    gtm_and_tooling_budget: z.number(),
    total_investment: z.number(),
  }),
  pillars: z.array(z.string()),
  hybrid_layers: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
    }),
  ),
  disclaimer: z.string(),
})

const pricingTierSchema = z.object({
  id: z.string(),
  name: z.string(),
  price_range: z.string(),
  duration: z.string(),
  purpose: z.string(),
  includes: z.array(z.string()),
  conversion_goal: z.string(),
})

export const pricingSchema = z.object({
  tiers: z.array(pricingTierSchema),
  notes: z.array(z.string()),
})

const channelSchema = z.object({
  id: z.string(),
  name: z.string(),
  audience: z.string(),
  action: z.string(),
  output: z.string(),
  primary_metrics: z.array(z.string()),
})

export const acquisitionChannelsSchema = z.object({
  channels: z.array(channelSchema),
})

const segmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  priority: z.enum(['High', 'Medium', 'Low']),
  description: z.string(),
})

export const segmentsSchema = z.object({
  segments: z.array(segmentSchema),
})

const quarterSchema = z.object({
  id: z.string(),
  objective: z.string(),
  activated_builders: z.number(),
  qualified_opportunities: z.number(),
  new_paid_pilots: z.number(),
  new_annual_contracts: z.number(),
  cumulative_paying_logos: z.number(),
  cumulative_bookings: z.number(),
})

export const quarterlyProjectionSchema = z.object({
  quarters: z.array(quarterSchema),
  disclaimer: z.string(),
})

const metricSchema = z.object({
  name: z.string(),
  description: z.string(),
  input_source: z.string(),
  calculation_method: z.string(),
  update_cadence: z.string(),
  target_by_quarter: z.record(z.string(), z.number()),
  responsible_owner: z.string(),
  ui_component: z.string(),
})

export const metricsSchema = z.object({
  leading: z.array(metricSchema),
  lagging: z.array(metricSchema),
})

const budgetItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  amount: z.number(),
  description: z.string(),
})

export const budgetSchema = z.object({
  items: z.array(budgetItemSchema),
  total_budget: z.number(),
  year_one_booking_target: z.number(),
  roi_multiple_assumption: z.number(),
})

const roadmapQuarterSchema = z.object({
  quarter: z.string(),
  focus: z.string(),
  items: z.array(z.string()),
})

export const roadmapSchema = z.object({
  quarters: z.array(roadmapQuarterSchema),
})

const entitySchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  description: z.string(),
  source_section: z.string(),
  related_pillars: z.array(z.string()),
  related_metrics: z.array(z.string()),
  related_channels: z.array(z.string()),
  related_segments: z.array(z.string()),
  related_quarters: z.array(z.string()),
  priority: z.enum(['High', 'Medium', 'Low']),
  owner: z.string(),
  status: z.string(),
})

export const entitiesSchema = z.object({
  entities: z.array(entitySchema),
})

const systemTreeBranchSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.literal('branch'),
  entity_ids: z.array(z.string()),
})

export const systemTreeSchema = z.object({
  root: z.object({
    id: z.string(),
    name: z.string(),
    type: z.literal('root'),
  }),
  branches: z.array(systemTreeBranchSchema),
})

export type Strategy = z.infer<typeof strategySchema>
export type Pricing = z.infer<typeof pricingSchema>
export type AcquisitionChannels = z.infer<typeof acquisitionChannelsSchema>
export type CustomerSegments = z.infer<typeof segmentsSchema>
export type QuarterlyProjections = z.infer<typeof quarterlyProjectionSchema>
export type Metrics = z.infer<typeof metricsSchema>
export type Budget = z.infer<typeof budgetSchema>
export type Roadmap = z.infer<typeof roadmapSchema>
export type Entities = z.infer<typeof entitiesSchema>
export type StrategyEntity = z.infer<typeof entitySchema>
export type SystemTree = z.infer<typeof systemTreeSchema>
