import type { AdminEvent } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import CheckIcon from '@assets/icons/check-square.svg'
import MaskIcon from '@assets/icons/mask.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Table } from '@components/table'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { TableRowOptionsTrigger } from '@components/triggers/TableRowOptionsTrigger'
import { Skeleton } from '@components/ui/skeleton'
import { ADMIN_ACTION_TYPE } from '@constants/action-type'
import { cn } from '@utils/cn'
import { getFromNow } from '@utils/get-day-difference'
import { shortenAddress } from '@utils/transform'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

import { AdminEventRowOptions } from './AdminEventRowOptions'

interface AdminTableRowProperties extends ComponentProps<'tr'> {
  adminEvent: AdminEvent
}

export const AdminTableRow = (props: AdminTableRowProperties) => {
  const { adminEvent, className, ...rest } = props
  return (
    <Table.Row className={cn('group', className)} {...rest}>
      <Table.Cell>
        <div className="flex items-center gap-4">
          <CheckIcon className="size-8" />
          <div>
            <p className="flex items-center gap-1 text-base/[1.5rem] font-medium">
              {ADMIN_ACTION_TYPE[adminEvent.action_type as keyof typeof ADMIN_ACTION_TYPE]
                .split(' ')
                .map((word, i, array) => {
                  return (
                    <span
                      className={cn(
                        'capitalize',
                        i === array.length - 1 && 'text-text-2100',
                      )}
                    >
                      {word}
                    </span>
                  )
                })}
            </p>
            <div className="flex items-center gap-[0.38rem]">
              <p className="text-sm/[1.5rem] text-text-2100">
                {shortenAddress(adminEvent.hash)}
              </p>
              <CopyButton text={adminEvent.hash} />
              <ScanLink
                chainId={adminEvent.src_chain_id}
                txHash={adminEvent.hash}
                className="size-4 shrink-0"
              />
            </div>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-2">
          <MaskIcon className="size-8 shrink-0" />
          <span>MAAT Admin</span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          <span>{shortenAddress(adminEvent.to)}</span>
          <CopyButton text={adminEvent.to} className="ml-2" />
          <ScanLink
            chainId={adminEvent.src_chain_id}
            address={adminEvent.to}
            className="ml-2 size-5 shrink-0"
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
      <Table.Cell className="text-gray-100">
        {getFromNow(dayjs(adminEvent.creation_time).toString())}
      </Table.Cell>
      <Table.Cell>
        <div className="flex justify-end">
          <AdminEventRowOptions event={adminEvent} />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export const AdminTableRowSkeleton = (props: ComponentProps<'tr'>) => {
  const { className, ...rest } = props
  return (
    <Table.Row className={cn('', className)} {...rest}>
      <Table.Cell>
        <Skeleton className="h-6 w-52" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-32" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-32" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-32" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-6 w-32" />
      </Table.Cell>
      <Table.Cell>
        <div className="flex justify-end">
          <TableRowOptionsTrigger />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}
