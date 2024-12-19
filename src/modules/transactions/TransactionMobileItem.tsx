import type { Event } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import Dots from '@assets/icons/options-dots.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ROUTES } from '@routes/routes'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenAddress } from '@utils/transform'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionTypeComponent, ActionTypeSkeleton } from './actions/ActionType'
import { StatusChip } from './status/StatusChip'

interface TransactionMobileItemProperties extends ComponentProps<'div'> {
  event: Event
}

export const TransactionMobileItem = (props: TransactionMobileItemProperties) => {
  const { event } = props
  const navigate = useNavigate()
  return (
    <div
      className="px-4 py-3"
      onClick={() => navigate(`${ROUTES.TRANSACTIONS}/${event.hash}`)}
    >
      <div className="flex items-start justify-between">
        <ActionTypeComponent tx={event} />
        <span className="text-sm text-text-2100">
          {getFromNow(dayjs(event.creation_time).toString())}
        </span>
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-3 text-sm odd:[&>*]:text-text-2100 even:[&>*]:justify-self-end">
        {event.amount && (
          <>
            <h6>Amount</h6>
            <div className="flex items-center">
              <span>
                {formatAmount(
                  formatUnits(BigInt(event.amount), event.vault.token.decimals),
                  {
                    notation: 'compact',
                  },
                )}
              </span>
              <TokenIconComponent
                symbol={event.vault.token.symbol}
                className="ml-2 size-6"
              />
              <span className="ml-[0.38rem]">{event.vault.token.symbol}</span>
            </div>
          </>
        )}
        <h6 className="w-fit">Chain</h6>
        {event.dst_chain_id ? (
          <div className="flex items-center gap-2">
            <TokenIconComponent symbol={event.src_chain_id} />
            <Arrow />
            <TokenIconComponent symbol={event.dst_chain_id} />
          </div>
        ) : (
          <IconWithLabelComponent symbol={event.src_chain_id} />
        )}
        <h6>Status</h6>
        <StatusChip tx={event} />
        <h6>From</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p>{shortenAddress(event.txFrom)}</p>
          <div className="flex items-center justify-center rounded-lg border border-stroke-100 p-[0.38rem]">
            <Dots className="size-[0.8125rem] shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonTransactionMobileItem = (_props: ComponentProps<'div'>) => {
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between">
        <ActionTypeSkeleton />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-3 text-sm odd:[&>*]:text-text-2100 even:[&>*]:justify-self-end">
        <h6 className="w-fit">Chain</h6>
        <Skeleton className="h-4 w-16" />
        <h6>Status</h6>
        <Skeleton className="h-4 w-16" />
        <h6>From</h6>
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
