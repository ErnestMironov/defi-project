import type { ITokenData } from '@api/tokens-balance/api'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Skeleton } from '@components/ui/skeleton'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { formatTokenBalance } from '@utils/formatValue'
import type { ComponentProps } from 'react'

interface AssetItemProperties extends ComponentProps<'div'> {
  token: ITokenData
}

export const AssetItem = ({ token }: AssetItemProperties) => {
  const chainData = useTokenAsset(token.chain_id)

  return (
    <div className="flex w-full cursor-pointer items-center max-lg:items-start">
      <TokenWithNetwork
        symbol={token.contract_ticker_symbol}
        tokenLogoFallback={token.logo_url}
        network={token.chain_id}
        classNames={{
          token: 'rounded-full',
        }}
        position="bottom-right"
        width="2.14288rem"
      />

      <div className="ml-3 flex flex-col items-start max-lg:items-start max-lg:text-left">
        <p className="text-[1.25rem]/[1.75rem] text-text max-lg:max-w-[8.5rem] ">
          {token.contract_ticker_symbol}
        </p>
        <p className="text-[0.9375rem]/[1.125rem] text-gray-80">{chainData?.name}</p>
      </div>
      <div className="ml-auto flex flex-col items-end gap-[0.12rem]">
        <p className="text-base text-text">
          {formatTokenBalance(token?.balance, token?.contract_decimals)}{' '}
          {token.contract_ticker_symbol}
        </p>
        <p className="text-semi-base text-gray-80">{token.pretty_quote}</p>
      </div>
    </div>
  )
}

export const AssetItemSkeleton = () => {
  return (
    <div className="flex w-full cursor-pointer items-center max-lg:items-start">
      <div className="relative flex size-10 items-center justify-center">
        <Skeleton className="size-full rounded-full" />
        <Skeleton className="absolute bottom-0 right-0 size-[0.8em]" />
      </div>

      <div className="ml-3 flex flex-col items-start gap-2 max-lg:items-start max-lg:text-left">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-3 w-24" />
      </div>
      <div className="ml-auto flex flex-col items-end gap-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  )
}
