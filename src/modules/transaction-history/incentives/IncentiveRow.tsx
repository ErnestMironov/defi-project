import type { IncentiveEvent } from '@api/maat-finance/types'
import CompounderIcon from '@assets/icons/compounder.svg'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { TableRowOptionsTrigger } from '@components/triggers/TableRowOptionsTrigger'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers'
import type { ComponentProps } from 'react'

import { IncentiveRowOptions } from './EventRowOptions'
import { IncentiveActionTypeComponent } from './IncentiveActionType'

interface IncentiveRowProperties extends ComponentProps<'div'> {
  event: IncentiveEvent
}

export const IncentiveRow = (props: IncentiveRowProperties) => {
  const { event } = props

  const renderAmount = () => {
    const amount = event.amount_in || event.amount_out
    const token = event.token_in || event.token_out
    if (amount && token) {
      return (
        <div className="flex items-center gap-2">
          <p className="leading-4">
            {formatAmount(formatUnits(BigInt(amount), token.decimals), {
              notation: 'compact',
              maximumFractionDigits: 4,
            })}
          </p>
          <IconWithLabelComponent symbol={token.symbol} />
        </div>
      )
    }
    return (
      <div className="h-14 w-[10.625rem] rounded-lg border border-stroke-100 bg-[url('/src/assets/icons/dashes.svg')] bg-cover bg-center bg-repeat dark:bg-[url('/src/assets/icons/dashes-dark.svg')]" />
    )
  }

  return (
    <Table.Row className="group">
      <Table.Cell>
        <IncentiveActionTypeComponent event={event} />
      </Table.Cell>
      <Table.Cell>{renderAmount()}</Table.Cell>
      <Table.Cell className="capitalize">
        <div className="flex items-center gap-2">
          <CompounderIcon className="size-8" />
          <p>{event.entity_initializer}</p>
        </div>
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={event.src_chain_id} className="size-5 gap-3" />
      </Table.Cell>
      <Table.Cell className="text-text-2100">
        {getFromNow(dayjs(event.creation_time).toString())}
      </Table.Cell>
      <Table.Cell>
        <div className="flex justify-end">
          <IncentiveRowOptions event={event} />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export const IncentivesRowSkeleton = (props: ComponentProps<'tr'>) => {
  const { className, ...rest } = props
  return (
    <Table.Row className={cn(className)} {...rest}>
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
        <div className="flex justify-end">
          <TableRowOptionsTrigger />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
