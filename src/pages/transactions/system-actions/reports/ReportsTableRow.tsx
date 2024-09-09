import type { ReportType } from '@api/maat-finance/types'
import { CopyButton } from '@components/copy/CopyButton'
import { ScanLink } from '@components/scan-link/ScanLink'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { SYSTEM_ADDRESSES } from '@constants/system-addresses'
import { cn } from '@utils/cn'
import { formatAmount } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import { formatUnits } from 'viem'

interface IncentivesTableRowProperties extends ComponentProps<'tr'> {
  report: ReportType
}

export const ReportsTableRow = (props: IncentivesTableRowProperties) => {
  const { className, report, ...rest } = props
  return (
    <Table.Row
      className={cn(
        '[&>td>*]:inline-block [&>td>*]:align-middle [&>td>*]:leading-[0rem]',
        className,
      )}
      {...rest}
    >
      <Table.Cell>
        {SYSTEM_ADDRESSES[report.txFrom as keyof typeof SYSTEM_ADDRESSES]}
      </Table.Cell>
      <Table.Cell>
        <div>
          <IconWithLabelComponent className="size-9" symbol={report.vault.token.symbol} />
        </div>
      </Table.Cell>
      <Table.Cell>
        {formatAmount(formatUnits(BigInt(report.price_per_share), 8), {
          minimumFractionDigits: 2,
          maximumFractionDigits: 3,
        })}
      </Table.Cell>
      <Table.Cell>
        <div>
          <IconWithLabelComponent className="size-9" symbol={report.vault.chain_id} />
        </div>
      </Table.Cell>
      <Table.Cell>
        <span>{shortenString(report.hash)}</span>
        <CopyButton text={report.hash} className="ml-4" />
        <ScanLink
          chainId={report.vault.chain_id}
          txHash={report.hash}
          className="ml-3 size-5 shrink-0"
        />
      </Table.Cell>
      <Table.Cell className="text-gray-100">
        {getFromNow(new Date(report.creation_time).toString())}
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
