import type { BalanceItem, Chain } from '@covalenthq/client-sdk'
import { CovalentClient } from '@covalenthq/client-sdk'

const API_KEY = 'cqt_rQ7pKmqvWVKDTG9w4BG3YgHKG6y7'

const client = new CovalentClient(API_KEY)

export interface ITokenData extends BalanceItem {
  chain_id: number
}

export const getTokenBalances = async (chainId: Chain, address?: string) => {
  if (!address) {
    return []
  }
  const response = await client.BalanceService.getTokenBalancesForWalletAddress(
    chainId,
    address,
    {
      noSpam: true,
    },
  )

  if (response.data.items) {
    return response.data.items.map((token) => ({
      ...token,
      chain_id: chainId,
    }))
  }
  return []
}
