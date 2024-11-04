import { useUserShares } from '@api/contracts/useGetUserShares'
import { useVaultAPY } from '@hooks/useVaultAPY'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo } from 'react'
import { useAccount } from 'wagmi'

import { AllAssets } from '../all-assets/AllAssets'
import { VaultTokenItem, VaultTokenItemSkeleton } from './VaultTokenItem'

interface UserTokensProperties extends ComponentProps<'div'> {}

export const UserTokens = (props: UserTokensProperties) => {
  const { className, ...rest } = props
  const { address } = useAccount()

  const { data, isLoading: isUserSharesLoading } = useUserShares(address)
  const shares = data?.shares

  const balances = useMemo(() => {
    if (!shares) return []

    return [...shares]
      .filter((token) => token.balance > 999_999)
      .sort((a, b) => Number(b.balance) - Number(a.balance))
  }, [shares])

  const {
    bestUSDCAPy: usdcApy,
    bestUSDTAPy: usdtApy,
    isLoading: isStrategiesLoading,
  } = useVaultAPY()

  const formattedVaultData = useMemo(() => {
    return balances.map((token) => {
      return {
        symbol: token.stable,
        token,
        apy: (token.stable === 'USDC' ? usdcApy : usdtApy) as number,
      }
    })
  }, [balances, usdcApy, usdtApy])

  const renderTokens = () => {
    if (isUserSharesLoading || isStrategiesLoading)
      return (
        <div className="user-assets flex flex-col gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <VaultTokenItemSkeleton key={i} />
          ))}
        </div>
      )

    return (
      <div className="user-assets flex flex-col gap-6">
        {formattedVaultData
          .sort((a, b) => Number(b.token.balance) - Number(a.token.balance))
          .map((item, i) => (
            <VaultTokenItem key={i} {...item} />
          ))}
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)} {...rest}>
      {renderTokens()}
      <AllAssets className="mt-6" />
    </div>
  )
}
