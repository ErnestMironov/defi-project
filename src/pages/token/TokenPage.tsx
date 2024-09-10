import { USDC_TOKENS_RAW } from '@api/squid-router/postHook/data/USDC'
import { USDT_TOKENS_RAW } from '@api/squid-router/postHook/data/USDT'
import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { TOKEN_INFO } from '@constants/token-info'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
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

  const tokenAddresses = useMemo(() => {
    return symbol === 'USDT' ? USDT_TOKENS_RAW : USDC_TOKENS_RAW
  }, [symbol])
  const [selectedAddress, setSelectedAddress] = useState(tokenAddresses[0])
  useEffect(() => {
    setSelectedAddress(tokenAddresses[0])
  }, [tokenAddresses])

  const { apyData, tvlData, apy, tvl, volume, isLoading, error } = useTokenMetrics(
    symbol as 'USDT' | 'USDC',
  )

  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <TokenHeader />
      <div className="mt-[4.62rem] grid grid-cols-2 gap-10 *:h-[18.25rem]">
        <TokenApyChart data={apyData} />
        <TokenTvlChart data={tvlData} />
      </div>
      <div className="mt-12 grid grid-cols-2 gap-10">
        <TokenStatsContainer
          loading={isLoading || !!error}
          withLink={false}
          color="#3883EB"
          apy={apy}
          tvl={tvl}
          rebalancingVolume={volume}
          tokenName={symbol ?? ''}
          img={symbol === 'USDC' ? usdc : usdt}
          imageClassName={
            symbol === 'USDC' ? 'rotate-[3.207deg]' : 'rotate-[-5.207deg] right-[-8.1rem]'
          }
        />
        <div className="flex flex-col justify-between rounded-[1.75rem] bg-cards p-10 text-[1.25rem]/[1.5rem] normal-case text-text [box-shadow:0px_3px_1px_0px_rgba(56,_118,_203,_0.20)]">
          <p>{TOKEN_INFO[symbol?.toUpperCase() as keyof typeof TOKEN_INFO]}</p>
          <p className="mt-auto flex w-full items-center justify-between text-lg">
            <span className="text-gray-100">Contract</span>
            <TokenAddressByChainPopover
              data={tokenAddresses}
              value={selectedAddress}
              onChange={(chain) => setSelectedAddress(chain)}
            />
          </p>
        </div>
      </div>
      {symbol && (
        <TokenStrategies className="mt-[6.25rem]" params={{ token: [symbol] }} />
      )}
      <Transactions className="mt-[6.25rem] max-lg:mt-14" />
      <Footer className="mt-[7.5rem]" />
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
      <TransactionsHistoryMobile className="mt-16" />
      <Footer className="mt-[5.5rem]" />
    </div>
  )
}
