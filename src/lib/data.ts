import strategyJson from '../../data/strategy.json'
import pricingJson from '../../data/pricing.json'
import acquisitionJson from '../../data/acquisition_channels.json'
import segmentsJson from '../../data/customer_segments.json'
import projectionsJson from '../../data/quarterly_projections.json'
import metricsJson from '../../data/metrics.json'
import budgetJson from '../../data/budget.json'
import roadmapJson from '../../data/roadmap.json'
import entitiesJson from '../../data/entities.json'
import systemTreeJson from '../../data/system_tree.json'
import {
  acquisitionChannelsSchema,
  budgetSchema,
  entitiesSchema,
  metricsSchema,
  pricingSchema,
  quarterlyProjectionSchema,
  roadmapSchema,
  segmentsSchema,
  strategySchema,
  systemTreeSchema,
} from '../types'

export const strategy = strategySchema.parse(strategyJson)
export const pricing = pricingSchema.parse(pricingJson)
export const acquisitionChannels = acquisitionChannelsSchema.parse(acquisitionJson)
export const customerSegments = segmentsSchema.parse(segmentsJson)
export const quarterlyProjections = quarterlyProjectionSchema.parse(projectionsJson)
export const metrics = metricsSchema.parse(metricsJson)
export const budget = budgetSchema.parse(budgetJson)
export const roadmap = roadmapSchema.parse(roadmapJson)
export const entities = entitiesSchema.parse(entitiesJson)
export const systemTree = systemTreeSchema.parse(systemTreeJson)
