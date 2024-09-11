import type { Event } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Table } from '@components/table'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { ACTION_TYPE } from '@constants/action-type'
import { STATUS_COLOR } from '@constants/status-color'
import { ROUTES } from '@routes/routes'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenAddress } from '@utils/transform'
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
      className="cursor-pointer"
      onClick={() => navigate(`${ROUTES.TRANSACTIONS}/${event.intention_id}`)}
    >
      <Table.Cell>
        {ACTION_TYPE[event.action_type as keyof typeof ACTION_TYPE]}
      </Table.Cell>
      <Table.Cell
        className="uppercase"
        style={{ color: STATUS_COLOR[event.status as keyof typeof STATUS_COLOR] }}
      >
        {event.status}
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-3">
          {event.amount && event.vault && (
            <span className="block min-w-12">
              {formatAmount(
                formatUnits(BigInt(event.amount), event.vault.token.decimals),
                {
                  notation: 'compact',
                },
              )}
            </span>
          )}
          {event.vault && (
            <IconWithLabelComponent
              symbol={event.vault.token.symbol}
              className="size-8"
            />
          )}
        </div>
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
      <Table.Cell>
        <div className="flex w-full items-center">
          <p className="min-w-[7.5rem]">{shortenAddress(event.hash)}</p>
          <CopyButton text={event.hash} className="ml-4 size-6 shrink-0" />
          <ScanLink
            chainId={event.src_chain_id}
            txHash={event.hash}
            className="ml-3 size-5 shrink-0"
          />
        </div>
      </Table.Cell>
      <Table.Cell className="text-gray-100">
        {getFromNow(dayjs(event.creation_time).toString())}
      </Table.Cell>
    </Table.Row>
  )
}
