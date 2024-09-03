import type { StrategyStats } from '@codegen/graphql'
import { CopyButton } from '@components/copy/CopyButton'
import { TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { ROUTES } from '@routes/routes'
import { formatAmountValue } from '@utils/formatValue'
import { shortenString } from '@utils/transform'
import BigNumber from 'bignumber.js'
import { type ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

interface StrategyMobileCardProperties extends ComponentProps<'div'> {
  strategy: StrategyStats
}

export const StrategyMobileCard = (props: StrategyMobileCardProperties) => {
  const { strategy, ...rest } = props
  const navigate = useNavigate()
  return (
    <div
      {...rest}
      onClick={() => {
        navigate(`${ROUTES.STRATEGIES}/${strategy.strategyId}`)
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center space-x-[-0.44rem] *:size-6">
          <TokenIconComponent symbol={strategy.tokenSymbol} />
          <TokenIconComponent symbol={strategy.chainName} />
          <TokenIconComponent symbol={strategy.protocol} />
        </div>
        <div className="text-lg [&>*:not(:last-child)]:after:content-['_/_']">
          <span>{strategy.tokenSymbol}</span>
          <span>
            {
              CHAIN_NAMES_BY_ID[
                Number(strategy.chainId) as keyof typeof CHAIN_NAMES_BY_ID
              ]
            }
          </span>
          <span>{strategy.protocol}</span>
        </div>
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-2 text-base even:[&>*]:justify-self-end">
        <h6>Projected APY</h6>
        {/* // ! TODO: remove "* 5" when we have real data */}
        <div className="font-bold">
          {BigNumber(strategy.apy).multipliedBy(5).toFixed(2)}%
        </div>
        <h6>TVL</h6>
        <div>
          $
          {formatAmountValue(
            BigNumber(strategy.deposited)
              .div(10 ** strategy.decimals)
              ?.toString(),
            2,
          )}
        </div>
        <h6>Strategy ID</h6>
        <div className="flex w-full items-center gap-2">
          <p>{shortenString(strategy.strategyId)}</p>
          <CopyButton text={strategy.strategyId} className="size-6 shrink-0" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonStrategyMobileCard = (
  props: Omit<StrategyMobileCardProperties, 'strategy'>,
) => {
  const { ...rest } = props

  return (
    <div {...rest}>
      <div className="flex items-center gap-3">
        <Skeleton className="size-6 rounded-full" />
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-[0.82rem] even:[&>*]:justify-self-end [&_h6]:text-base [&_h6]:leading-normal">
        <h6>Chain | Protocol</h6>
        <div className="flex items-center space-x-[-0.44rem]">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
        </div>
        <h6>Projected APY</h6>
        <Skeleton className="h-6 w-20 text-lg" />
        <h6>TVL</h6>
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
    </div>
  )
}
