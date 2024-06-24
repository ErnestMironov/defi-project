import { Pagination } from '@components/pagination/Pagination'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { STABLE_TYPE, StableSwitcher } from '@components/stable-switcher/StableSwitcher'
import { Table } from '@components/table'
import { ActionChip, TxType } from '@components/transaction-type-badge'
import { Logo } from '@components/ui/logo'
import { cn } from '@utils/cn'
import { useState } from 'react'

interface ITransaction {
  action: TxType
  amount: number
  strategy: string
  weeklyAPY: number
  tvl: number
  from: string
  to: string
  txHash: string
  created: string
  nonce: number
}

const defaultData: ITransaction[] = [
  {
    action: TxType.Deposit,
    amount: 1000,
    strategy: 'Strategy A',
    weeklyAPY: 0.5,
    tvl: 100_000,
    from: 'Wallet A',
    to: 'Wallet B',
    txHash: '0x1234567890abcdef',
    created: '2024-06-20T12:34:56',
    nonce: 1,
  },
  {
    action: TxType.Withdraw,
    amount: 500,
    strategy: 'Strategy B',
    weeklyAPY: 0.3,
    tvl: 200_000,
    from: 'Wallet B',
    to: 'Wallet A',
    txHash: '0xfedcba0987654321',
    created: '2024-06-19T11:22:33',
    nonce: 2,
  },
  {
    action: TxType.Bridge,
    amount: 100,
    strategy: 'Strategy C',
    weeklyAPY: 0.7,
    tvl: 300_000,
    from: 'Wallet C',
    to: 'Wallet D',
    txHash: '0xabcdef1234567890',
    created: '2024-06-18T10:20:30',
    nonce: 3,
  },
]

export const TransactionsHistory: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)

  return (
    <div {...props} className={cn('flex flex-col', props.className)}>
      <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
        <Logo />
        Transactions History
      </h2>
      <StableSwitcher
        activeTab={activeStableType}
        setActiveTab={setStableType}
        className="mb-6 mt-12"
      />
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Action</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Strategy / Weekly APY / TVL</Table.HeadCell>
            <Table.HeadCell>
              <div className="flex items-center gap-2">
                From
                <svg
                  width="13"
                  height="8"
                  viewBox="0 0 13 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8536 3.64645C13.0488 3.84171 13.0488 4.15829 12.8536 4.35355L9.67157 7.53553C9.47631 7.7308 9.15973 7.7308 8.96447 7.53553C8.7692 7.34027 8.7692 7.02369 8.96447 6.82843L11.7929 4L8.96447 1.17157C8.7692 0.976311 8.7692 0.659728 8.96447 0.464466C9.15973 0.269204 9.47631 0.269204 9.67157 0.464466L12.8536 3.64645ZM0.5 3.5H12.5V4.5H0.5V3.5Z"
                    fill="#323949"
                  />
                </svg>
                To
              </div>
            </Table.HeadCell>
            <Table.HeadCell>Tx Hash</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Nonce</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {defaultData.map((tx, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <ActionChip type={tx.action} />
              </Table.Cell>
              <Table.Cell>{tx.amount}</Table.Cell>
              <Table.Cell>
                {tx.strategy} / {tx.weeklyAPY} / {tx.tvl}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  {tx.from}
                  <svg
                    width="13"
                    height="8"
                    viewBox="0 0 13 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.8536 3.64645C13.0488 3.84171 13.0488 4.15829 12.8536 4.35355L9.67157 7.53553C9.47631 7.7308 9.15973 7.7308 8.96447 7.53553C8.7692 7.34027 8.7692 7.02369 8.96447 6.82843L11.7929 4L8.96447 1.17157C8.7692 0.976311 8.7692 0.659728 8.96447 0.464466C9.15973 0.269204 9.47631 0.269204 9.67157 0.464466L12.8536 3.64645ZM0.5 3.5H12.5V4.5H0.5V3.5Z"
                      fill="#323949"
                    />
                  </svg>
                  {tx.to}
                </div>
              </Table.Cell>
              <Table.Cell>{tx.txHash}</Table.Cell>
              <Table.Cell>{tx.created}</Table.Cell>
              <Table.Cell>{tx.nonce}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination />
    </div>
  )
}
