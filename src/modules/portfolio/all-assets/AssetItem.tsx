import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Skeleton } from '@components/ui/skeleton'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
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
        width="3rem"
      />

      <div className="ml-3 flex flex-col items-start max-lg:items-start max-lg:text-left">
        <p className="text-text text-base max-lg:max-w-[8.5rem] ">
          {`${token.balance_usd} ${token.contract_ticker_symbol}`}
        </p>
        <p className="text-sm text-text-80100">
          {chainData?.TokenIcon ? <chainData.TokenIcon /> : null}
        </p>
      </div>
      <div className="ml-auto flex flex-col items-end gap-[0.12rem]">
        <p className="text-base text-text-100 ">
          <span className="text-text-80100">$</span>
          {token.balance_usd}
        </p>
      </div>
    </div>
  )
}

export const AssetItemSkeleton = () => {
  return (
    <div className="mt-2 flex w-full cursor-pointer items-center px-6 max-lg:items-start max-md:px-3">
      <div className="relative flex size-10 items-center justify-center ">
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
