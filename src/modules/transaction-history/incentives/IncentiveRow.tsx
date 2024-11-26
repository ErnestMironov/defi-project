import type { IncentiveEvent } from '@api/maat-finance/types'
import CheckSquare from '@assets/icons/check-square.svg'
import CompounderIcon from '@assets/icons/compounder.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { INCENTIVE_ACTION_TYPE } from '@constants/action-type'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenAddress } from '@utils/transform'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers'
import type { ComponentProps } from 'react'

import { IncentiveRowOptions } from './EventRowOptions'

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
      <div className="h-14 w-full rounded-lg border border-stroke-100 bg-[url('/src/assets/icons/dashes.svg')] bg-cover bg-center bg-repeat" />
    )
  }

  return (
    <Table.Row className="group">
      <Table.Cell>
        <div className="flex items-center gap-4">
          <CheckSquare className="size-8 shrink-0" />
          <div>
            <p className="leading-4">
              {
                INCENTIVE_ACTION_TYPE[
                  event.action_type as keyof typeof INCENTIVE_ACTION_TYPE
                ]
              }
            </p>
            <div className="flex items-center gap-[0.38rem]">
              <p className="text-text-2100">{shortenAddress(event.hash)}</p>
              <CopyButton text={event.hash} />
              <ScanLink
                chainId={event.src_chain_id}
                txHash={event.hash}
                className="size-4 shrink-0"
              />
            </div>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>{renderAmount()}</Table.Cell>
      <Table.Cell className="capitalize">
        <div className="flex items-center gap-2">
          <CompounderIcon />
          <p>{event.entity_initializer}</p>
        </div>
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={event.src_chain_id} className="size-8 gap-3" />
      </Table.Cell>
      <Table.Cell className="text-text-2100">
        {getFromNow(dayjs(event.creation_time).toString())}
      </Table.Cell>
      <Table.Cell className="w-1">
        <IncentiveRowOptions event={event} />
      </Table.Cell>
    </Table.Row>
  )
}

export const IncentivesRowSkeleton = (props: ComponentProps<'tr'>) => {
  const { className, ...rest } = props
  return (
    <Table.Row
      className={cn(
        '[&>td>*]:inline-block [&>td>*]:align-middle [&>td>*]:leading-[0rem]',
        className,
      )}
      {...rest}
    >
      <Table.Cell>
        <Skeleton className="h-8 w-20" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-8 w-20" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-8 w-20" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-8 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-8 w-40" />
      </Table.Cell>
      <Table.Cell className="text-gray-100">
        <Skeleton className="h-8 w-20" />
      </Table.Cell>
    </Table.Row>
  )
}
