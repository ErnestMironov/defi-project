import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Table } from '@components/table'
import { TokenIconComponent } from '@components/token-icon'
import { cn } from '@utils/cn'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'

interface IncentivesTableRowProperties extends ComponentProps<'tr'> {}

export const ReportsTableRow = (props: IncentivesTableRowProperties) => {
  const { className, ...rest } = props
  return (
    <Table.Row
      className={cn(
        '[&>td>*]:inline-block [&>td>*]:align-middle [&>td>*]:leading-[0rem]',
        className,
      )}
      {...rest}
    >
      <Table.Cell>Oracle Admin</Table.Cell>
      <Table.Cell>
        {/* token */}
        <TokenIconComponent symbol="USDT" className="size-8" />
        <span className="ml-3">USDT</span>
      </Table.Cell>
      <Table.Cell>1.0001</Table.Cell>
      <Table.Cell>
        <TokenIconComponent symbol={43_114} className="size-8" />
        <span className="ml-3">Avalanche</span>
      </Table.Cell>
      <Table.Cell>
        {/* hash */}
        <span>{shortenString('0xcdfe9128379112382cj4fb3')}</span>
        <CopyButton text="0xcdfe9128379182cj4fb3" className="ml-4" />
        <Scan className="ml-3 size-5 shrink-0" />
      </Table.Cell>
      <Table.Cell className="text-gray-100">now</Table.Cell>
    </Table.Row>
  )
}
