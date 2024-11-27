import type { Event } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Table } from '@components/table'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenAddress } from '@utils/transform'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

import { ActionType } from './actions/ActionType'
import { EventRowOptions } from './actions/EventRowOptions'
import { StatusChip } from './status/StatusChip'

interface TransactionHistoryRowProperties extends ComponentProps<'div'> {
  event: Event
}

export const TransactionHistoryRow = (props: TransactionHistoryRowProperties) => {
  const { event } = props

  const navigate = useNavigate()
  return (
    <Table.Row
      className="group cursor-pointer *:px-7 *:py-4"
      onClick={() => navigate(`${ROUTES.TRANSACTIONS}/${event.hash}`)}
    >
      <Table.Cell>
        <ActionType tx={event} />
      </Table.Cell>
      <Table.Cell>
        {event.amount ? (
          <div className="flex items-center gap-[0.38rem]">
            <p className="min-w-10 text-end">
              {event.vault
                ? formatAmount(
                    formatUnits(BigInt(event.amount), event.vault.token.decimals),
                    {
                      notation: 'compact',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    },
                  )
                : 'N/A'}
            </p>
            {event.vault && (
              <IconWithLabelComponent
                symbol={event.vault.token.symbol}
                className="size-8"
              />
            )}
          </div>
        ) : (
          <div className="h-14 w-full rounded-lg border border-stroke-100 bg-[url('/src/assets/icons/dashes.svg')] bg-cover bg-center bg-repeat" />
        )}
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          {event.dst_chain_id ? (
            <>
              <TokenIconComponent symbol={event.src_chain_id} className="size-8 gap-3" />
              <Arrow />
              <TokenIconComponent symbol={event.dst_chain_id} className="size-8 gap-3" />
            </>
          ) : (
            <IconWithLabelComponent
              symbol={event.src_chain_id}
              className="size-8 gap-3"
            />
          )}
        </div>
      </Table.Cell>
      <Table.Cell>
        <StatusChip tx={event} />
      </Table.Cell>
      <Table.Cell>
        <div className="flex w-full items-center">
          <p className="min-w-24 text-sm/[1.5rem]">{shortenAddress(event.txFrom)}</p>
          <CopyButton text={event.txFrom} className="shrink-0" />
        </div>
      </Table.Cell>
      {/* <Table.Cell>
        <div className="flex w-full items-center">
          <p className="min-w-24">{shortenAddress(event.hash)}</p>
          <CopyButton text={event.hash} className="shrink-0" />
          <ScanLink
            chainId={event.src_chain_id}
            txHash={event.hash}
            className="ml-3 size-5 shrink-0"
          />
        </div>
      </Table.Cell> */}
      <Table.Cell className="text-text-2100">
        {getFromNow(dayjs(event.creation_time).toString())}
      </Table.Cell>
      <Table.Cell>
        <div className="flex justify-end">
          <EventRowOptions event={event} />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
export const TransactionHistoryRowSkeleton = (props: ComponentProps<'tr'>) => {
  const { className } = props
  return (
    <Table.Row className={cn(className)}>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-40" />
      </Table.Cell>
    </Table.Row>
  )
}
