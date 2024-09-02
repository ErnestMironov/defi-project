import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { ActionChip } from '@components/transaction-type-badge'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import type { ITransaction } from 'src/lib/types/transaction'

interface IncentiveRowProperties extends ComponentProps<'div'> {
  transaction: ITransaction
}

export const IncentiveRow = (props: IncentiveRowProperties) => {
  const { transaction } = props

  return (
    <Table.Row>
      <Table.Cell>
        <ActionChip type={transaction.action} styled={false} />
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={transaction.from} className="size-8 gap-3" />
      </Table.Cell>
      <Table.Cell>
        <div className="flex items-center">
          <p className="w-[6.9rem]">{shortenString(transaction.txHash, 5)}</p>
          <CopyButton text={transaction.txHash} className="ml-4 size-6 shrink-0" />
          <Scan className="ml-3 size-5 shrink-0" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <IconWithLabelComponent symbol={transaction.from} className="size-8 gap-3" />
      </Table.Cell>
      <Table.Cell className="text-gray-100">
        {getFromNow(Number(transaction.timestamp))}
      </Table.Cell>
    </Table.Row>
  )
}
