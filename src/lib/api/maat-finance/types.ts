import type { Address } from 'viem'

export interface ApiResponse<T> {
  data: T
  status: number
}

export interface SharesBalanceResponse {
  address: Address
  balances: {
    chain: string
    balances: {
      token: 'USDT' | 'USDC'
      mtToken: number
      value: number
    }[]
  }[]
}

export interface ParsedSharesBalanceResponse {
  balances: {
    chain: string
    token: 'USDT' | 'USDC'
    mtToken: number
    value: number
  }[]
}
