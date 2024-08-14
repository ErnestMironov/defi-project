import type { ActionType } from '@codegen/graphql'

export interface ITransaction {
  action: ActionType
  amount: string
  strategy: string
  protocol?: string
  apy: string
  tvl?: string
  from: string
  to: string
  txHash: string
  timestamp: string | number
  nonce: string
  symbol: string
}
