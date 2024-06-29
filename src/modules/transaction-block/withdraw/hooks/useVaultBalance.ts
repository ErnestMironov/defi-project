// eslint-disable-next-line import/extensions

import { GATEWAY_ABI } from '@abi/gateway'
import { TOKEN_VAULT } from '@abi/token-vault'
import { ARB_GATEWAY, ARB_USDC, ARB_USDT } from '@constants/contract-address'
import type { Address } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const VAULT_ADDRESSES = {
  USDT: ARB_USDT,
  USDC: ARB_USDC,
} as const

export const useVaultBalance = (token: Address) => {
  const { address } = useAccount()

  const { data: tokenVaultAddress } = useReadContract({
    abi: GATEWAY_ABI,
    address: ARB_GATEWAY,
    args: [token],
    functionName: 'getVault',
    query: {
      enabled: !!address,
    },
  })

  const { data: sharesBalance } = useReadContract({
    abi: TOKEN_VAULT,
    address: tokenVaultAddress,
    args: [address],
    functionName: 'balanceOf',
    query: {
      enabled: !!address,
    },
  })

  const { data: tokenBalance } = useReadContract({
    abi: TOKEN_VAULT,
    address: tokenVaultAddress,
    args: [sharesBalance],
    functionName: 'previewRedeem',
    query: {
      enabled: !!sharesBalance,
    },
  })

  return {
    tokenBalance: tokenBalance as bigint | undefined,
    sharesBalance,
    tokenVaultAddress,
  }
}
