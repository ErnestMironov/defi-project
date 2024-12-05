import { useFormattedVaultData } from '@hooks/useFormattedVaultData'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { type ComponentProps } from 'react'
import { useAccount } from 'wagmi'

import { AllAssets } from '../all-assets/AllAssets'
import { NoDeposit } from '../all-assets/NoDeposit'
import { VaultTokenItem, VaultTokenItemSkeleton } from './VaultTokenItem'

interface UserTokensProperties extends ComponentProps<'div'> {}

export const UserTokens = (props: UserTokensProperties) => {
  const { className, ...rest } = props
  const { address } = useAccount()
  const { formattedData, isLoading } = useFormattedVaultData(address)
  const hasDeposits = formattedData.some((item) => +formatAmount(item.balance) > 0)
  const renderTokens = () => {
    if (isLoading) {
      return (
        <div className="user-assets flex flex-col gap-6 px-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <VaultTokenItemSkeleton key={i} />
          ))}
        </div>
      )
    }

    return (
      <div
        className={cn('user-assets flex flex-col gap-6', hasDeposits ? 'px-6 py-4' : '')}
      >
        {hasDeposits ? (
          formattedData
            .filter((item) => +formatAmount(item.balance) > 0)
            .map((item, i) => (
              <VaultTokenItem key={i} {...item} balance={formatAmount(item.balance)} />
            ))
        ) : (
          <NoDeposit />
        )}
      </div>
    )
  }

  return (
    <div className={cn('space-y-6 ', className)} {...rest}>
      {renderTokens()}
      <AllAssets className="!mt-0" />
    </div>
  )
}
