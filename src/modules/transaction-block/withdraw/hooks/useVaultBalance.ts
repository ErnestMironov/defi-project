// eslint-disable-next-line import/extensions

import { tokenVaultAbi } from '@constants/abi/token-vault'
import { ARB_USDC, ARB_USDT } from '@constants/contract-address'
import type { Address } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const VAULT_ADDRESSES = {
  USDT: ARB_USDT,
  USDC: ARB_USDC,
} as const

export const useVaultBalance = (token: Address) => {
  const { address } = useAccount()

  const { data: sharesBalance } = useReadContract({
    abi: tokenVaultAbi,
    address: token,
    args: [address],
    functionName: 'balanceOf',
    query: {
      enabled: !!address,
    },
  })

  const { data: tokenBalance } = useReadContract({
    abi: tokenVaultAbi,
    address: token,
    args: [sharesBalance],
    functionName: 'previewRedeem',
    query: {
      enabled: !!sharesBalance,
    },
  })

  return {
    tokenBalance: tokenBalance as bigint | undefined,
    sharesBalance: sharesBalance as bigint | undefined,
  }
}
