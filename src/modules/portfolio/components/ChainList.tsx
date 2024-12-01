import { type ITokenData } from '@api/tokens-balance/use-tokens-balance'
import { TokenIconComponent } from '@components/token-icon'
import { useTokenAsset } from '@hooks/common/useTokenAsset'
import { cn } from '@utils/cn'
import { formatUsdValue } from '@utils/formatValue'

interface ChainsListProperties {
  tokens: ITokenData[]
  potentialUsdProfit?: string
  className?: string
}

const ChainItem = ({
  chainId,
  totalUsdValue,
}: {
  chainId: number
  totalUsdValue: number
}) => {
  const chainData = useTokenAsset(chainId)

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-cards p-4">
      <div className="flex items-center gap-3">
        <TokenIconComponent symbol={chainId} className="size-10 rounded-full" />
        <div className="flex flex-col items-start">
          <span className="text-base font-medium text-text-100">
            {chainData?.name || `Chain ${chainId}`}
          </span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-base font-medium text-text-100">
          {formatUsdValue(totalUsdValue)}
        </p>
      </div>
    </div>
  )
}

export const ChainsList = ({
  tokens,
  potentialUsdProfit,
  className,
}: ChainsListProperties) => {
  const groupedByChain = tokens.reduce(
    (accumulator, token) => {
      const chainId = token.chain_id
      if (accumulator[chainId]) {
        accumulator[chainId].totalUsdValue += Number(token.balance_usd)
      } else {
        accumulator[chainId] = {
          chainId,
          totalUsdValue: Number(token.balance_usd),
        }
      }
      return accumulator
    },
    {} as Record<string, { chainId: number; totalUsdValue: number }>,
  )

  return (
    <div className={cn('px-6 pt-2 pb-1', className)}>
      <div className="mt-4">
        <div className="h-auto w-full rounded-xl bg-light-blue-15 px-6 py-3 text-center text-white">
          <span className="text-main-100 opacity-70">Yield Potential</span>{' '}
          <span className="text-main-100">{formatUsdValue(potentialUsdProfit)}/year</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {Object.values(groupedByChain).map(({ chainId, totalUsdValue }, i) => (
          <ChainItem key={i} chainId={chainId} totalUsdValue={totalUsdValue} />
        ))}
      </div>
    </div>
  )
}
