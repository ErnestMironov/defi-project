import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Table } from '@components/table'
import { TokenIconComponent } from '@components/token-icon'
import { cn } from '@utils/cn'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'

interface AdminTableRowProperties extends ComponentProps<'tr'> {}

export const AdminTableRow = (props: AdminTableRowProperties) => {
  const { className, ...rest } = props
  return (
    <Table.Row className={cn('', className)} {...rest}>
      <Table.Cell>setIncentivesController</Table.Cell>
      <Table.Cell>MAAT Admin</Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          <span>Address Provider</span>
          <CopyButton text="Address Provider" className="ml-4" />
          <Scan className="ml-3 size-5 shrink-0" />
        </div>
      </Table.Cell>
      <Table.Cell>
        {/* arguments */}
        <div className="flex items-center">
          <span>{shortenString('0xcdfe9128371239182cj4fb3')}</span>
          <CopyButton text="0xcdfe9128379182cj4fb3" className="ml-4" />
          <Scan className="ml-3 size-5 shrink-0" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <TokenIconComponent symbol={43_114} className="inline size-8" />
        <p className="ml-3 inline">Avalanche</p>
      </Table.Cell>
      <Table.Cell>
        {/* hash */}
        <div className="flex items-center">
          <span>{shortenString('0xcdfe9128379112382cj4fb3')}</span>
          <CopyButton text="0xcdfe9128379182cj4fb3" className="ml-4" />
          <Scan className="ml-3 size-5 shrink-0" />
        </div>
      </Table.Cell>
      <Table.Cell className="text-gray-100">now</Table.Cell>
    </Table.Row>
  )
}
