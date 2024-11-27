import type { Event } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import { Table } from '@components/table'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { ActionType } from '@modules/transactions/actions/ActionType'
import { EventRowOptions } from '@modules/transactions/actions/EventRowOptions'
import { StatusChip } from '@modules/transactions/status/StatusChip'
import { ROUTES } from '@routes/routes'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import dayjs from 'dayjs'
import { formatUnits } from 'ethers'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

interface MaatTransactionHistoryRowProperties extends ComponentProps<'div'> {
  event: Event
}

export const MaatTransactionHistoryRow = (props: MaatTransactionHistoryRowProperties) => {
  const { event } = props
  const navigate = useNavigate()
  return (
    <Table.Row
      className="group cursor-pointer"
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
        <StatusChip tx={event} />
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          {event.dst_chain_id && event.src_chain_id !== event.dst_chain_id ? (
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
      <Table.Cell className="text-gray-100">
        {getFromNow(dayjs(event.creation_time).toString())}
      </Table.Cell>
      <Table.Cell className="w-1">
        <EventRowOptions event={event} />
      </Table.Cell>
    </Table.Row>
  )
}
