import type { Strategy } from '@api/maat-finance/types'
import Dots from '@assets/icons/options-dots.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ROUTES } from '@routes/routes'
import { formatAmount, formatUsdValue } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import { type ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

interface StrategyMobileCardProperties extends ComponentProps<'div'> {
  strategy: Strategy
}

export const StrategyMobileCard = (props: StrategyMobileCardProperties) => {
  const { strategy, ...rest } = props
  const navigate = useNavigate()
  return (
    <div
      className="px-4 py-3"
      {...rest}
      onClick={() => {
        navigate(`${ROUTES.STRATEGIES}/${strategy.id}`)
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <TokenIconComponent symbol={strategy.protocol} className="size-8 shrink-0" />
          <div className="text-sm/[1rem]">
            <p>{shortenAddress(strategy.id)}</p>
            <h6 className="text-text-260">{strategy.protocol}</h6>
          </div>
          {/* <div className="text-lg [&>*:not(:last-child)]:after:content-['_/_']">
          <span>{strategy.token.symbol}</span>
          <span>
            {
              CHAIN_NAMES_BY_ID[
                Number(strategy.chain_id) as keyof typeof CHAIN_NAMES_BY_ID
              ]
            }
          </span>
          <span>{strategy.protocol}</span>
        </div> */}
        </div>
        <p className="text-sm/[1rem]">
          <span className="text-text-2100">APY</span>{' '}
          {formatAmount(strategy.apy, { maximumFractionDigits: 2 })}
          <span className="text-text-260">%</span>
        </p>
      </div>

      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-2 text-sm odd:[&>*]:text-text-2100 even:[&>*]:justify-self-end">
        <h6>Token</h6>
        <IconWithLabelComponent symbol={strategy.token.symbol} />
        <h6>Chain</h6>
        <IconWithLabelComponent symbol={strategy.chain_id} />
        <h6>TVL</h6>
        <div>
          {formatUsdValue(strategy.tvl, {
            notation: 'compact',
            maximumFractionDigits: 2,
          })}
        </div>
        <h6>Address</h6>
        <div className="flex w-full items-center gap-2">
          <p>{shortenAddress(strategy.address)}</p>
          <div className="flex items-center justify-center rounded-lg border border-stroke-100 p-[0.38rem]">
            <Dots className="size-[0.8125rem] shrink-0" />
          </div>
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
