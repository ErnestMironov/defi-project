import type { ReportType } from '@api/maat-finance/types'
import Rocket from '@assets/icons/rocket.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { SYSTEM_ADDRESSES } from '@constants/system-addresses'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import { ReportsRowOptions } from './EventRowOptions'

interface IncentivesTableRowProperties extends ComponentProps<'tr'> {
  report: ReportType
}

export const ReportsTableRow = (props: IncentivesTableRowProperties) => {
  const { className, report, ...rest } = props
  return (
    <Table.Row className={cn('group', className)} {...rest}>
      <Table.Cell>
        <div className="flex items-center gap-4">
          <Rocket className="size-8 shrink-0" />
          <div>
            <p className="text-base/[1.5rem]">
              {SYSTEM_ADDRESSES[report.txFrom as keyof typeof SYSTEM_ADDRESSES]}
            </p>
            <div className="flex items-center gap-[0.38rem]">
              <p className="text-text-2100">{shortenAddress(report.hash)}</p>
              <CopyButton text={report.hash} />
              <ScanLink
                chainId={report.vault.chain_id}
                txHash={report.hash}
                className="size-4 shrink-0"
              />
            </div>
          </div>
        </div>
      </Table.Cell>
      <Table.Cell>
        <div>
          <IconWithLabelComponent className="size-4" symbol={report.vault.token.symbol} />
        </div>
      </Table.Cell>
      <Table.Cell>
        {formatAmount(formatUnits(BigInt(report.price_per_share), 8), {
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        })}
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent className="size-4" symbol={report.vault.chain_id} />
      </Table.Cell>
      <Table.Cell className="text-gray-100">
        {getFromNow(new Date(report.creation_time).toString())}
      </Table.Cell>
      <Table.Cell className="w-1">
        <ReportsRowOptions event={report} />
      </Table.Cell>
    </Table.Row>
  )
}

export const ReportsTableRowSkeleton = (props: ComponentProps<'tr'>) => {
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
        <Skeleton className="h-10 w-full" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="size-9" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-full" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-full" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-10 w-full" />
      </Table.Cell>
      <Table.Cell className="text-gray-100">
        <Skeleton className="h-10 w-full" />
      </Table.Cell>
    </Table.Row>
  )
}
