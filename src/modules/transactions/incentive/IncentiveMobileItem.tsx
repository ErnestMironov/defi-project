/* eslint-disable sonarjs/no-small-switch */
import type { IncentiveEvent } from '@api/maat-finance/types'
import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers'
import type { ComponentProps } from 'react'

interface IncentiveMobileItemProperties extends ComponentProps<'div'> {
  incentive: IncentiveEvent
}

export const IncentiveMobileItem = (props: IncentiveMobileItemProperties) => {
  const { incentive } = props

  const chainId = incentive.src_chain_id || incentive.dst_chain_id

  const renderAmount = () => {
    const amount = incentive.amount_in || incentive.amount_out
    const token = incentive.token_in || incentive.token_out
    if (amount && token) {
      return (
        <div className="flex items-center gap-2">
          <span>
            {formatAmount(formatUnits(BigInt(amount), token.decimals), {
              notation: 'compact',
              maximumFractionDigits: 4,
            })}
          </span>
          <IconWithLabelComponent symbol={token.symbol} className="size-6" />
        </div>
      )
    }
    return <div>-</div>
  }
  return (
    <div>
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">Harvest</div>
      <div className="mt-4 flex items-center gap-3 text-gray-100">
        <span>Vault</span>
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <span>{getFromNow(dayjs(incentive.creation_time).toString())}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>Amount</h6>
        {renderAmount()}
        <h6>Chain</h6>
        <IconWithLabelComponent symbol={chainId} className="size-6" />
        <h6>Tx Hash</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p>{shortenString(incentive.hash)}</p>
          <Scan className="size-5 shrink-0" />
          <CopyButton text={incentive.hash} className="size-6 shrink-0" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonIncentiveMobileItem = (
  _props: Omit<IncentiveMobileItemProperties, 'incentive'>,
) => {
  return (
    <div>
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">
        <Skeleton className="h-[1em] w-16" />
      </div>
      <div className="mt-4 flex items-center gap-3 text-gray-100">
        <Skeleton className="h-[1.2em] w-16" />
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <Skeleton className="h-[1.2em] w-16" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>Amount</h6>
        <Skeleton className="h-[1em] w-24" />
        <h6>Chain</h6>
        <Skeleton className="h-[1em] w-24" />
        <h6>Tx Hash</h6>
        <Skeleton className="h-[1em] w-24" />
      </div>
    </div>
  )
}
