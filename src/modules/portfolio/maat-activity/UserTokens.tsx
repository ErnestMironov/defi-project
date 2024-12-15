import { useFormattedVaultData } from '@hooks/useFormattedVaultData'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { type ComponentProps } from 'react'
import { useAccount } from 'wagmi'

import { AllAssets } from '../all-assets/AllAssets'
import { NoDeposit } from '../all-assets/NoDeposit'
import { useAllAssets } from '../all-assets/useAllAssets'
import { VaultTokenItem } from './VaultTokenItem'

interface UserTokensProperties extends ComponentProps<'div'> {}

export const UserTokens = (props: UserTokensProperties) => {
  const { className, ...rest } = props
  const { address } = useAccount()
  const { formattedData } = useFormattedVaultData(address)
  const { tokens } = useAllAssets([])
  const hasDeposits = formattedData.some((item) => +formatAmount(item.balance) > 0)
  const hasWalletTokens = tokens && tokens.length > 0
  const renderContent = () => {
    if (!hasDeposits && !hasWalletTokens) {
      return null
    }

    if (hasDeposits) {
      return formattedData
        .filter((item) => +formatAmount(item.balance) > 0)
        .map((item, i) => (
          <VaultTokenItem key={i} {...item} balance={formatAmount(item.balance)} />
        ))
    }

    return <NoDeposit />
  }

  return (
    <div className={cn('space-y-6 ', className)} {...rest}>
      <div
        className={cn(
          'user-assets flex flex-col gap-6',
          hasDeposits ? 'px-6 py-4 max-md:px-3' : '',
        )}
      >
        {renderContent()}
      </div>
      <AllAssets className="!mt-0" />
    </div>
  )
}
