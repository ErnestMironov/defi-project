export const EIDS_BY_CHAIN_ID: Record<string, number> = {
  1: 30_101, // Ethereum
  56: 30_102, // BNB Chain
  137: 30_109, // Polygon
  42_161: 30_110, // Arbitrum
  10: 30_111, // Optimism
  1088: 30_151, // Metis
  5000: 30_181, // Mantle
  8453: 30_184, // Base
} as const

export const SUPPORTED_CHAINS_FOR_REP_TOKENS = [
  8453, // Base
  10, // Optimism
  42_161, // Arbitrum
]
