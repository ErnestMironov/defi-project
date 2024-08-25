export const CHAIN_NAMES_BY_ID = {
  1: 'Ethereum',
  10: 'Optimism',
  42_161: 'Arbitrum',
  137: 'Polygon',
  8453: 'Base',
  5000: 'Mantle',
  56: 'BNB',
  1088: 'Metis',
  43_114: 'Avalanche',
} as const

export const CHAIN_IDS_BY_NAME = {
  Ethereum: 1,
  Optimism: 10,
  Arbitrum: 42_161,
  Polygon: 137,
  Base: 8453,
  Mantle: 5000,
  BNB: 56,
  Metis: 1088,
  Avalanche: 43_114,
} as const

export const CHAINS = [
  // CHAIN_IDS_BY_NAME.Ethereum,
  CHAIN_IDS_BY_NAME.Arbitrum,
  CHAIN_IDS_BY_NAME.Optimism,
  CHAIN_IDS_BY_NAME.Polygon,
  // CHAIN_IDS_BY_NAME.BNB,
  CHAIN_IDS_BY_NAME.Base,
  // Chains.MANTLE_MAINNET,
] as const

export type ChainType = (typeof CHAINS)[number]

export const CONFIRMATIONS_NUMBER = {
  [CHAIN_IDS_BY_NAME.Polygon]: 5,
  [CHAIN_IDS_BY_NAME.Arbitrum]: 48,
  [CHAIN_IDS_BY_NAME.Optimism]: 6,
  [CHAIN_IDS_BY_NAME.Base]: 6,
}

export const CHAIN_IDS_BY_NAME_REVERSE = Object.fromEntries(
  Object.entries(CHAIN_IDS_BY_NAME).map(([key, value]) => [value, key]),
)

export const CHAIN_IDS_BY_BACKEND_NAMES = {
  arbitrum: CHAIN_IDS_BY_NAME.Arbitrum,
  polygon: CHAIN_IDS_BY_NAME.Polygon,
  optimism: CHAIN_IDS_BY_NAME.Optimism,
  base: CHAIN_IDS_BY_NAME.Base,
  avalanche: CHAIN_IDS_BY_NAME.Avalanche,
  bsc: CHAIN_IDS_BY_NAME.BNB,
  mantle: CHAIN_IDS_BY_NAME.Mantle,
  metis: CHAIN_IDS_BY_NAME.Metis,
}
