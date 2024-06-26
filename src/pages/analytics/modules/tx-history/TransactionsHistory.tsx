/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import Arrow from '@assets/icons/arrow-filled.svg'
import { Pagination } from '@components/pagination/Pagination'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { STABLE_TYPE, StableSwitcher } from '@components/stable-switcher/StableSwitcher'
import { Table } from '@components/table'
import { TokenIconComponent } from '@components/token-icon'
import { ActionChip, TxType } from '@components/transaction-type-badge'
import { Accordion } from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { cn } from '@utils/cn'
import { formatAmountValue } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import { useState } from 'react'

import { TransactionMobileItem } from './TransactionMobileItem'

export interface ITransaction {
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
    from: 'Base',
    to: 'Sonne',
    txHash: '0x1234567890abcdef1234567890abcdef',
    created: '2024-06-20T12:34:56',
    nonce: 1,
  },
  {
    action: TxType.Withdraw,
    amount: 500,
    strategy: 'Strategy B',
    weeklyAPY: 0.3,
    tvl: 200_000,
    from: 'Polygon',
    to: 'Compound',
    txHash: '0xfedcba09876543211234567890abcdef',
    created: '2024-06-19T11:22:33',
    nonce: 2,
  },
  {
    action: TxType.Bridge,
    amount: 100,
    strategy: 'Strategy C',
    weeklyAPY: 0.7,
    tvl: 300_000,
    from: 'Polygon',
    to: 'Compound',
    txHash: '0xabcdef12345678901234567890abcdef',
    created: '2024-06-18T10:20:30',
    nonce: 3,
  },
]

export const TransactionsHistory: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionsHistoryMobile {...props} />
  }
  return <TransactionsHistoryDesktop {...props} />
}

export const TransactionsHistoryMobile: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)

  return (
    <div {...props} className={cn('flex flex-col px-4', props.className)}>
      <div className="flex items-start gap-4">
        <Logo className="h-[1.625rem] w-[2.0625rem] overflow-visible" />
        <h2 className="text-2xl uppercase">
          Transactions <br /> History
        </h2>
      </div>
      <StableSwitcher
        layoutId="stable-switcher-transactions-history"
        activeTab={activeStableType}
        setActiveTab={setStableType}
        className="mb-6 mt-8"
      />
      <Accordion type="multiple" className="rounded-3xl bg-cards px-5 py-6">
        {defaultData.map((tx, index, array) => (
          <TransactionMobileItem
            key={tx.txHash}
            tx={tx}
            isLast={index === array.length - 1}
          />
        ))}
      </Accordion>
      <Button size="lg" className="mt-8">
        View more
      </Button>
    </div>
  )
}

export const TransactionsHistoryDesktop: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)

  return (
    <div {...props} className={cn('flex flex-col', props.className)}>
      <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
        <Logo />
        Transactions History
      </h2>
      <StableSwitcher
        layoutId="stable-switcher-transactions-history"
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
                <Arrow />
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
                {tx.action === TxType.Bridge ? (
                  '-'
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <TokenIconComponent symbol={tx.from} className="size-10" />
                      <TokenIconComponent symbol={tx.to} className="size-10" />
                    </div>
                    /<span>{tx.weeklyAPY}%</span>/
                    <span>${formatAmountValue(tx.tvl)}</span>
                  </div>
                )}
              </Table.Cell>
              <Table.Cell>
                {tx.action === TxType.Bridge ? (
                  <div className="flex items-center gap-2">
                    <TokenIconComponent symbol={tx.from} className="size-10" />
                    <Arrow />
                    <TokenIconComponent symbol={tx.to} className="size-10" />
                  </div>
                ) : (
                  '-'
                )}
              </Table.Cell>
              <Table.Cell>{shortenString(tx.txHash)}</Table.Cell>
              <Table.Cell>{getFromNow(tx.created)}</Table.Cell>
              <Table.Cell>{tx.nonce}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination className="mt-6" />
    </div>
  )
}
