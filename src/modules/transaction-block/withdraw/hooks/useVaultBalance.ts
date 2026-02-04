// eslint-disable-next-line import/extensions

import { tokenVaultAbi } from '@constants/abi/token-vault'
import { ARB_USDC, ARB_USDT } from '@constants/contract-address'
import { USE_MOCKS } from '@configs/mocks'
import type { Address } from 'viem'
import { useReadContract } from 'wagmi'
import { useActiveAccount } from '@hooks/useActiveAccount'

export const VAULT_ADDRESSES = {
  USDT: ARB_USDT,
  USDC: ARB_USDC,
} as const

export const useVaultBalance = (token: Address) => {
  const { address } = useActiveAccount()

  const { data: sharesBalance } = useReadContract({
    abi: tokenVaultAbi,
    address: token,
    args: [address],
    functionName: 'balanceOf',
    query: {
      enabled: !USE_MOCKS && !!address,
    },
  })

  const { data: tokenBalance } = useReadContract({
    abi: tokenVaultAbi,
    address: token,
    args: [sharesBalance],
    functionName: 'previewRedeem',
    query: {
      enabled: !USE_MOCKS && !!sharesBalance,
    },
  })

  return {
    tokenBalance: USE_MOCKS ? 990_000n : (tokenBalance as bigint | undefined),
    sharesBalance: USE_MOCKS ? 1_000_000n : (sharesBalance as bigint | undefined),
  }
}
