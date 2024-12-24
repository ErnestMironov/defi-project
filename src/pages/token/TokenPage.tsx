import type { VaultType } from '@api/maat-finance/types'
import { useVaults } from '@api/maat-finance/useVaults'
import { Skeleton } from '@components/ui/skeleton'
import { TOKEN_INFO } from '@constants/token-info'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { TokenStatsContainer } from '@modules/token-overview/TokenStatsContainer'
import { Transactions } from '@modules/transactions/Transactions'
import { TransactionsHistoryMobile } from '@modules/transactions/TransactionsHistoryMobile'
import { cn } from '@utils/cn'
import { type ComponentProps, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from './Breadcrumbs'
import { TokenAddressByChainPopover } from './TokenAdressesByChainPopover'
import { TokenApyChart } from './TokenApyChart'
import { TokenChartMobile } from './TokenChartMobile'
import { TokenHeader } from './TokenHeader'
import { TokenInfoMobile } from './TokenInfoMobile'
import { TokenStrategies } from './TokenStrategies'
import { TokenTvlChart } from './TokenTvlChart'
import { useTokenMetrics } from './useTokenMetrics'

interface TokensProperties extends ComponentProps<'div'> {}

export const TokenPage = (props: TokensProperties) => {
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop) {
    return <TokensMobilePage {...props} />
  }

  return <TokenDesktopPage {...props} />
}

export const TokenDesktopPage = (props: TokensProperties) => {
  const { className, ...rest } = props
  const { symbol } = useParams()
  const { data: vaults } = useVaults()
  const tokenVaults = useMemo(() => {
    if (!vaults) return []
    return vaults.filter((vault) => vault.token.symbol === symbol)
  }, [symbol, vaults])
  const [selectedVault, setSelectedVault] = useState<VaultType | undefined>(undefined)
  useEffect(() => {
    if (tokenVaults.length > 0) {
      setSelectedVault(tokenVaults[0])
    }
  }, [tokenVaults])

  const { apy, tvl, volume, isLoading, volumeLoading } = useTokenMetrics(
    symbol as 'USDT' | 'USDC',
  )

  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <TokenHeader />
      <div className="mt-[4.62rem] grid grid-cols-2 gap-10 *:h-[18.25rem]">
        <TokenApyChart symbol={symbol as 'USDT' | 'USDC'} />
        <TokenTvlChart symbol={symbol as 'USDT' | 'USDC'} />
      </div>
      <div className="mt-12 grid grid-cols-2 gap-10">
        <TokenStatsContainer
          loading={isLoading}
          loadingVolume={volumeLoading}
          color="#3883EB"
          apy={apy}
          tvl={tvl}
          rebalancingVolume={volume}
          tokenName={symbol ?? ''}
        />
        <div className="text-text flex flex-col justify-between rounded-[1.75rem] bg-cards p-10 text-[1.25rem]/[1.5rem] normal-case [box-shadow:0px_3px_1px_0px_rgba(56,_118,_203,_0.20)]">
          <p>{TOKEN_INFO[symbol?.toUpperCase() as keyof typeof TOKEN_INFO]}</p>
          <p className="mt-auto flex w-full items-center justify-between text-lg">
            <span className="text-gray-100">Contract</span>
            {vaults && selectedVault ? (
              <TokenAddressByChainPopover data={tokenVaults} />
            ) : (
              <Skeleton className="h-6 w-60" />
            )}
          </p>
        </div>
      </div>
      {symbol && (
        <TokenStrategies className="mt-[6.25rem]" params={{ token: [symbol] }} />
      )}
      <Transactions
        className="mt-[6.25rem] max-lg:mt-14"
        parameters={{ token: [symbol as 'USDT' | 'USDC'] }}
      />
    </div>
  )
}

const TokensMobilePage = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { symbol } = useParams()
  return (
    <div className={cn('mt-8', className)} {...rest}>
      <TokenHeader />
      <TokenChartMobile className="mt-7" />
      <TokenInfoMobile className="mt-10" />
      {symbol && <TokenStrategies className="mt-10" params={{ token: [symbol] }} />}
      <TransactionsHistoryMobile
        className="mt-16"
        parameters={{ token: [symbol as 'USDT' | 'USDC'] }}
      />
    </div>
  )
}
