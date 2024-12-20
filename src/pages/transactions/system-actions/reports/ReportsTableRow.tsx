import type { ReportType } from '@api/maat-finance/types'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { TableRowOptionsTrigger } from '@components/triggers/TableRowOptionsTrigger'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

import { ReportsRowOptions } from './EventRowOptions'
import { ReportActionType } from './ReportActionType'

interface IncentivesTableRowProperties extends ComponentProps<'tr'> {
  report: ReportType
}

export const ReportsTableRow = (props: IncentivesTableRowProperties) => {
  const { className, report, ...rest } = props
  return (
    <Table.Row className={cn('group', className)} {...rest}>
      <Table.Cell>
        <ReportActionType report={report} />
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
      <Table.Cell>
        <div className="flex justify-end">
          <ReportsRowOptions event={report} />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export const ReportsTableRowSkeleton = (props: ComponentProps<'tr'>) => {
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
