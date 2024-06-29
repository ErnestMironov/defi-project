export type StrategyStats = {
  strategyId: string
  chainId: string
  deposited: bigint
  apy: number
  decimals: number
  protocol: string
}

export type Token = {
  id: string
  name: string
  symbol: string
  decimals: number
  addresses: string[]
}

export type Protocol = {
  id: string
  name: string
  chain: Chain
  strategies: Strategy[]
}

export type Chain = {
  id: string
  name: string
  strategies: Strategy[]
  protocols: Protocol[]
}
