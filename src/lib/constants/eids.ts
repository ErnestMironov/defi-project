export const EIDS_BY_CHAIN_ID: Record<string, number> = {
  1: 30_101, // Ethereum
  56: 30_102, // BNB Chain
  137: 30_109, // Polygon
  42_161: 30_110, // Arbitrum
  10: 30_111, // Optimism
  1088: 30_151, // Metis
  5000: 30_181, // Mantle
  8453: 30_184, // Base
  2222: 30_177, // Kava
  8217: 30_150, // Klaytn
  8822: 30_284, // IOTA
  1_380_012_617: 30_235, // RARI
  14: 30_295, // Flare
  1625: 30_294, // Gravity Alpha
  167_000: 30_290, // Taiko
  1329: 30_280, // Sei
  534_352: 30_214, // Scroll
  1_313_161_554: 30_211, // Aurora
} as const

export const SUPPORTED_CHAINS_FOR_REP_TOKENS = [
  8453, // Base
  10, // Optimism
  137, // Polygon
  42_161, // Arbitrum
]
