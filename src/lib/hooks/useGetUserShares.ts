import { TOKEN_VAULT } from '@abi/token-vault'
import { USDC_VAULT_ADDRESS, USDT_VAULT_ADDRESS } from '@constants/vaults'
import { useCallback, useEffect, useState } from 'react'
import type { Address } from 'viem'
import { createPublicClient, http } from 'viem'
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  mantle,
  metis,
  optimism,
  polygon,
} from 'viem/chains'

// Define the networks and their respective vault addresses
const networks = [
  { chain: arbitrum, vaultAddress: USDT_VAULT_ADDRESS as Address, token: 'USDT' },
  { chain: arbitrum, vaultAddress: USDC_VAULT_ADDRESS as Address, token: 'USDC' },
  { chain: polygon, vaultAddress: USDC_VAULT_ADDRESS as Address, token: 'USDC' },
  { chain: polygon, vaultAddress: USDT_VAULT_ADDRESS as Address, token: 'USDT' },
  { chain: base, vaultAddress: USDC_VAULT_ADDRESS as Address, token: 'USDC' },
  { chain: avalanche, vaultAddress: USDC_VAULT_ADDRESS as Address, token: 'USDC' },
  { chain: avalanche, vaultAddress: USDT_VAULT_ADDRESS as Address, token: 'USDT' },
  { chain: mainnet, vaultAddress: USDC_VAULT_ADDRESS as Address, token: 'USDC' },
  { chain: mainnet, vaultAddress: USDT_VAULT_ADDRESS as Address, token: 'USDT' },
  { chain: optimism, vaultAddress: USDC_VAULT_ADDRESS as Address, token: 'USDC' },
  { chain: optimism, vaultAddress: USDT_VAULT_ADDRESS as Address, token: 'USDT' },
  { chain: mantle, vaultAddress: USDC_VAULT_ADDRESS as Address, token: 'USDC' },
  { chain: mantle, vaultAddress: USDT_VAULT_ADDRESS as Address, token: 'USDT' },
  { chain: metis, vaultAddress: USDC_VAULT_ADDRESS as Address, token: 'USDC' },
  { chain: metis, vaultAddress: USDT_VAULT_ADDRESS as Address, token: 'USDT' },
  { chain: bsc, vaultAddress: USDT_VAULT_ADDRESS as Address, token: 'USDT' },
]

// Define types for the new structure
export type TokenShares = {
  chainId: number
  balance: bigint
  decimals: number
  stable: 'USDC' | 'USDT'
  address: Address
  stableBalance: bigint
}

type Errors = Array<{
  chainId: number
  error: string
}>

// Hook to get user shares from multiple networks
export const useUserShares = (userAddress?: Address) => {
  const [shares, setShares] = useState<TokenShares[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errors, setErrors] = useState<Errors>([])

  const fetchShares = useCallback(async () => {
    if (!userAddress) return

    setIsLoading(true)
    setErrors([])
    setShares([])

    const sharesMap: Record<string, TokenShares> = {}
    const newErrors: Errors = []

    await Promise.allSettled(
      networks.map(async ({ chain, vaultAddress, token }) => {
        try {
          const client = createPublicClient({
            chain,
            transport: http(),
          })

          const balance = await client.readContract({
            address: vaultAddress,
            abi: TOKEN_VAULT,
            functionName: 'balanceOf',
            args: [userAddress],
          })

          const decimals = await client.readContract({
            address: vaultAddress,
            abi: TOKEN_VAULT,
            functionName: 'decimals',
          })

          const stableBalance = await client.readContract({
            address: vaultAddress,
            abi: TOKEN_VAULT,
            functionName: 'previewRedeem',
            args: [balance],
          })

          // Only add non-zero values to sharesMap
          if (balance !== 0n) {
            const key = `${chain.id}-${vaultAddress}`
            sharesMap[key] = {
              chainId: chain.id,
              balance: balance as bigint,
              decimals: decimals as number,
              stable: token as 'USDC' | 'USDT',
              address: vaultAddress,
              stableBalance: stableBalance as bigint,
            }
          }
        } catch (error) {
          console.error(`Error fetching shares for ${chain.name}-${token}:`, error)
          newErrors.push({
            chainId: chain.id,
            error: 'Failed to fetch shares',
          })
        }
      }),
    )

    setShares(Object.values(sharesMap))
    setErrors((previousErrors) => [...previousErrors, ...newErrors])
    setIsLoading(false)
  }, [userAddress])

  useEffect(() => {
    fetchShares()
  }, [fetchShares])

  return { shares, isLoading, errors, refetch: fetchShares }
}
