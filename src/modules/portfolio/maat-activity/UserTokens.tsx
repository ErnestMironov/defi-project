// src/modules/portfolio/maat-activity/UserTokens.tsx
import { useFormattedVaultData } from '@hooks/useFormattedVaultData'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { type ComponentProps } from 'react'

import { AllAssets } from '../all-assets/AllAssets'
import { NoDeposit } from '../all-assets/NoDeposit'
import { useAllAssets } from '../all-assets/useAllAssets'
import { useGetTokensRate } from './useGetTokensRate' // Не забудьте импортировать useGetTokensRate
import { VaultTokenItem } from './VaultTokenItem'

interface UserTokensProperties extends ComponentProps<'div'> {}

export const UserTokens = (props: UserTokensProperties) => {
  const { className, ...rest } = props
  const { formattedData } = useFormattedVaultData(
    '0x4887C799DD7Df7bafaD0C2De60f0577768e8Cd94',
  )

  const tokenNames = ['USDT', 'USDC']
  const { data } = useGetTokensRate(tokenNames)
  console.log(data)
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
        .map((item, i) => {
          const tokenRate = data?.find((rate) => rate.coinKey === item.symbol)
          return (
            <VaultTokenItem
              key={i}
              {...item}
              balance={formatAmount(item.balance)}
              rate={tokenRate ? Number(tokenRate.priceUSD) : 0}
              apy={item.apy}
            />
          )
        })
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
