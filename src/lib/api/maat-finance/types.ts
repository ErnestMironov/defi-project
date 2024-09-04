import type { Address } from 'viem'

export interface ApiResponse<T> {
  data: T
  status: number
}

export interface Balance {
  symbol: 'USDT' | 'USDC'
  mtToken: number
  value: number
  address: Address
  decimals: number
  chain_id: number
}

export interface SharesBalanceResponse {
  address: Address
  balances: {
    chain: string
    balances: {
      mtToken: number
      value: number
      token: Omit<Balance, 'value' | 'mtToken'>
    }[]
  }[]
}

export interface ParsedSharesBalanceResponse {
  balances: Balance[]
}

export type WithdrawStatusResponse = 'success' | 'failed' | 'pending'
