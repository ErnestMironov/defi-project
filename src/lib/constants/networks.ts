export const NETWORKS = [
  'Polygon',
  'Ethereum',
  'Optimism',
  'Arbitrum',
  'Avalanche',
] as const
export type NetworkType = (typeof NETWORKS)[number]
