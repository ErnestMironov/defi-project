export const CHAIN_NAMES_BY_ID = {
  1: 'Ethereum',
  10: 'Optimism',
  42_161: 'Arbitrum',
  137: 'Polygon',
  43_114: 'Avalanche',
  8453: 'Base',
  5000: 'Mantle',
  56: 'BNB',
  1088: 'Metis',
} as const

export const CHAIN_IDS_BY_NAME = {
  Ethereum: 1,
  Optimism: 10,
  Arbitrum: 42_161,
  Polygon: 137,
  Avalanche: 43_114,
  Base: 8453,
  Mantle: 5000,
  BNB: 56,
  Metis: 1088,
  Sei: 1329,
} as const

export const SCAN_LINK_BY_CHAIN_ID = {
  1: 'https://etherscan.io/',
  10: 'https://optimistic.etherscan.io/',
  1329: 'https://seitrace.com/',
  43_114: 'https://snowtrace.io/',
  56: 'https://bscscan.com/',
}

export const CHAINS = [
  // CHAIN_IDS_BY_NAME.Ethereum,
  CHAIN_IDS_BY_NAME.Arbitrum,
  CHAIN_IDS_BY_NAME.Optimism,
  CHAIN_IDS_BY_NAME.Polygon,
  // CHAIN_IDS_BY_NAME.BNB,
  CHAIN_IDS_BY_NAME.Base,
  // Chains.MANTLE_MAINNET,
] as const

export const DEPOSIT_CHAIN_IDS = [
  CHAIN_IDS_BY_NAME.Ethereum,
  CHAIN_IDS_BY_NAME.Arbitrum,
  CHAIN_IDS_BY_NAME.Optimism,
  CHAIN_IDS_BY_NAME.Polygon,
  CHAIN_IDS_BY_NAME.BNB,
  CHAIN_IDS_BY_NAME.Base,
  CHAIN_IDS_BY_NAME.Mantle,
  CHAIN_IDS_BY_NAME.Metis,
]

export const CHAINS_WITH_VAULTS = [
  CHAIN_IDS_BY_NAME.Arbitrum,
  CHAIN_IDS_BY_NAME.Optimism,
  CHAIN_IDS_BY_NAME.Polygon,
  CHAIN_IDS_BY_NAME.Base,
]
export type ChainType = (typeof CHAINS)[number]
export type DepositChainType = (typeof DEPOSIT_CHAIN_IDS)[number]

export const CONFIRMATIONS_NUMBER = {
  [CHAIN_IDS_BY_NAME.Polygon]: 2,
  [CHAIN_IDS_BY_NAME.Arbitrum]: 24,
  [CHAIN_IDS_BY_NAME.Optimism]: 3,
  [CHAIN_IDS_BY_NAME.Base]: 3,
}

export const ESTIMATED_TIME_OF_CONFIRMATION = 6

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
