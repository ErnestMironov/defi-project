import type { Event } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ACTION_TYPE } from '@constants/action-type'
import { STATUS_COLOR } from '@constants/status-color'
import { ROUTES } from '@routes/routes'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

interface TransactionMobileItemProperties extends ComponentProps<'div'> {
  event: Event
}

export const TransactionMobileItem = (props: TransactionMobileItemProperties) => {
  const { event } = props
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`${ROUTES.TRANSACTIONS}/${event.intention_id}`)}>
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">
        {ACTION_TYPE[event.action_type as keyof typeof ACTION_TYPE]}
      </div>
      <div className="mt-4 flex items-center gap-3 text-gray-100">
        <span
          className="capitalize"
          style={{ color: STATUS_COLOR[event.status as keyof typeof STATUS_COLOR] }}
        >
          {event.status}
        </span>
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <span>{getFromNow(dayjs(event.creation_time).toString())}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
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
        <h6>Chain</h6>
        {event.dst_chain_id ? (
          <div className="flex items-center gap-2">
            <TokenIconComponent symbol={event.src_chain_id} className="size-6" />
            <Arrow />
            <TokenIconComponent symbol={event.dst_chain_id} className="size-6" />
          </div>
        ) : (
          <IconWithLabelComponent symbol={event.src_chain_id} className="size-6" />
        )}
        <h6>Tx Hash</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p>{shortenString(event.hash)}</p>
          <Scan className="size-5 shrink-0" />
          <CopyButton text={event.hash} className="size-6 shrink-0" />
        </div>
      </div>
    </div>
  )
}

export const SkeletonTransactionMobileItem = (props: ComponentProps<'div'>) => {
  return (
    <div {...props}>
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="mt-4 flex items-center gap-3 text-gray-100">
        <Skeleton className="h-6 w-20" />
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>Amount</h6>
        <Skeleton className="h-6 w-20" />
        <h6>Chain</h6>
        <Skeleton className="h-6 w-20" />
        <h6>Tx Hash</h6>
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  )
}
