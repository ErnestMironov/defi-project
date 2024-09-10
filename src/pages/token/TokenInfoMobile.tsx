import { USDC_TOKENS_RAW } from '@api/squid-router/postHook/data/USDC'
import { USDT_TOKENS_RAW } from '@api/squid-router/postHook/data/USDT'
import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { type ComponentProps, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TokenAddressByChainDrawerMobile } from './TokenAdressesByChainDrawer'
import { useTokenMetrics } from './useTokenMetrics'

interface TokenInfoMobileProperties extends ComponentProps<'div'> {}

export const TokenInfoMobile = (props: TokenInfoMobileProperties) => {
  const { className, ...rest } = props
  const { symbol } = useParams()

  const tokenAddresses = useMemo(() => {
    return symbol === 'USDT' ? USDT_TOKENS_RAW : USDC_TOKENS_RAW
  }, [symbol])
  const [selectedAddress, setSelectedAddress] = useState(tokenAddresses[0])
  useEffect(() => {
    setSelectedAddress(tokenAddresses[0])
  }, [tokenAddresses])

  const { apy, tvl, volume, isLoading, error } = useTokenMetrics(
    symbol as 'USDT' | 'USDC',
  )

  if (isLoading || !!error) {
    return <TokenInfoMobileSkeleton />
  }

  return (
    <div
      className={cn(
        'mt-8 grid grid-cols-2 gap-x-2 *:rounded-2xl *:bg-cards *:px-4 *:py-6 *:shadow-[0px_3px_1px_0px_rgba(135,99,243,0.12)]',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">{symbol} APY</h6>
        <p className="flex items-start gap-1 text-2xl">{formatPercentValue(apy)}</p>
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">{symbol} TVL</h6>
        <p className="flex items-start gap-1 text-2xl">{formatUsdValue(tvl)}</p>
      </div>
      <div className="relative col-span-2 mt-3 flex flex-col items-start justify-center gap-1 overflow-hidden">
        <h6 className="text-[0.75rem]/[0.9rem] uppercase text-gray-100">
          Rebalancing volume
        </h6>
        <p className="flex items-start gap-1 text-2xl">{formatUsdValue(volume)}</p>
        <img
          src={symbol === 'USDC' ? usdc : usdt}
          alt={symbol}
          className={cn(
            'absolute top-2 right-[-1.2rem] size-[8.7435rem] opacity-20',
            symbol === 'USDC' ? 'rotate-[7.207deg]' : '',
          )}
        />
      </div>
      <div className="col-span-2 mt-4 flex flex-col items-start justify-center gap-4">
        <p className="text-base text-text">
          USDC is a fully collateralized US dollar stablecoin. USDC is the bridge between
          dollars and trading on cryptocurrency exchanges.
        </p>
        <p className="mt-auto flex w-full items-center justify-between text-base">
          <span className="text-gray-100">Contract</span>
          <TokenAddressByChainDrawerMobile
            data={tokenAddresses}
            value={selectedAddress}
            onChange={(chain) => setSelectedAddress(chain)}
          />
        </p>
      </div>
    </div>
  )
}
export const TokenInfoMobileSkeleton = (props: ComponentProps<'div'>) => {
  const { symbol } = useParams()
  const { className, ...rest } = props

  return (
    <div
      className={cn(
        'mt-8 grid grid-cols-2 gap-x-2 *:rounded-2xl *:bg-cards *:px-4 *:py-6 *:shadow-[0px_3px_1px_0px_rgba(135,99,243,0.12)]',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">{symbol} APY</h6>
        <Skeleton className="h-7 w-20" />
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">{symbol} TVL</h6>
        <Skeleton className="h-7 w-20" />
      </div>
      <div className="relative col-span-2 mt-3 flex flex-col items-start justify-center gap-1 overflow-hidden">
        <h6 className="text-[0.75rem]/[0.9rem] uppercase text-gray-100">
          Rebalancing volume
        </h6>
        <Skeleton className="h-7 w-20" />
        <img
          src={symbol === 'USDC' ? usdc : usdt}
          alt={symbol}
          className={cn(
            'absolute top-2 right-[-1.2rem] size-[8.7435rem] opacity-20',
            symbol === 'USDC' ? 'rotate-[7.207deg]' : '',
          )}
        />
      </div>
      <div className="col-span-2 mt-4 flex flex-col items-start justify-center gap-4">
        <p className="text-base text-text">
          USDC is a fully collateralized US dollar stablecoin. USDC is the bridge between
          dollars and trading on cryptocurrency exchanges.
        </p>
        <p className="mt-auto flex w-full items-center justify-between text-base">
          <span className="text-gray-100">Contract</span>
          <Skeleton className="h-7 w-20" />
        </p>
      </div>
    </div>
  )
}
