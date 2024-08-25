import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { Table } from '@components/table'
import { IconWithLabelComponent } from '@components/token-icon'
import { ActionChip } from '@components/transaction-type-badge'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ITransaction } from 'src/lib/types/transaction'

interface MaatTransactionHistoryRowProperties extends ComponentProps<'div'> {
  transaction: ITransaction
}

export const MaatTransactionHistoryRow = (props: MaatTransactionHistoryRowProperties) => {
  const { transaction } = props
  const navigate = useNavigate()
  return (
    <Table.Row
      className="cursor-pointer"
      onClick={() => navigate(`/transactions/${transaction.txHash}`)}
    >
      <Table.Cell>
        <ActionChip type={transaction.action} styled={false} />
      </Table.Cell>
      <Table.Cell className="uppercase text-green-100">Success</Table.Cell>
      <Table.Cell>
        <div className="flex max-w-[11.1rem] items-center justify-between gap-3">
          <span>{transaction.amount}</span>
          <IconWithLabelComponent symbol={transaction.symbol} className="size-8" />
        </div>
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
      <Table.Cell className="text-gray-100">
        {getFromNow(Number(transaction.timestamp))}
      </Table.Cell>
    </Table.Row>
  )
}
