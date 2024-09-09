import type { AdminEvent } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Table } from '@components/table'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { ADMIN_ACTION_TYPE } from '@constants/action-type'
import { cn } from '@utils/cn'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

interface AdminTableRowProperties extends ComponentProps<'tr'> {
  adminEvent: AdminEvent
}

export const AdminTableRow = (props: AdminTableRowProperties) => {
  const { adminEvent, className, ...rest } = props
  return (
    <Table.Row className={cn('', className)} {...rest}>
      <Table.Cell>
        {ADMIN_ACTION_TYPE[adminEvent.action_type as keyof typeof ADMIN_ACTION_TYPE]}
      </Table.Cell>
      <Table.Cell>MAAT Admin</Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          <span>{shortenString(adminEvent.to)}</span>
          <CopyButton text={adminEvent.to} className="ml-4" />
          <ScanLink
            chainId={adminEvent.src_chain_id}
            address={adminEvent.to}
            className="ml-3 size-5 shrink-0"
          />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          {adminEvent.dst_chain_id &&
          adminEvent.src_chain_id !== adminEvent.dst_chain_id ? (
            <>
              <TokenIconComponent
                symbol={adminEvent.src_chain_id}
                className="size-8 gap-3"
              />
              <Arrow />
              <TokenIconComponent
                symbol={adminEvent.dst_chain_id}
                className="size-8 gap-3"
              />
            </>
          ) : (
            <IconWithLabelComponent
              symbol={adminEvent.src_chain_id}
              className="size-8 gap-3"
            />
          )}
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          <span>{shortenString(adminEvent.hash)}</span>
          <CopyButton text={adminEvent.hash} className="ml-4" />
          <ScanLink
            chainId={adminEvent.src_chain_id}
            txHash={adminEvent.hash}
            className="ml-3 size-5 shrink-0"
          />
        </div>
      </Table.Cell>
      <Table.Cell className="text-gray-100">
        {getFromNow(dayjs(adminEvent.creation_time).toString())}
      </Table.Cell>
    </Table.Row>
  )
}
