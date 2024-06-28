import { useTxHistory } from '@api/queries/useTxHistory'
import Arrow from '@assets/icons/arrow-filled.svg'
import { ActionType } from '@codegen/graphql'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { STABLE_TYPE, StableSwitcher } from '@components/stable-switcher/StableSwitcher'
import { Table } from '@components/table'
import { TokenIconComponent } from '@components/token-icon'
import { ActionChip } from '@components/transaction-type-badge'
import { Accordion } from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import { Skeleton } from '@components/ui/skeleton'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { cn } from '@utils/cn'
import { formatAmountValue } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import { useState } from 'react'

import { TransactionMobileItem } from './TransactionMobileItem'

export interface ITransaction {
  action: ActionType
  amount: string
  strategy: string
  protocol?: string
  apy: string
  tvl?: string
  from: string
  to: string
  txHash: string
  timestamp: string | number
  nonce: string
}

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
  const { data } = useTxHistory()
  return (
    <div {...props} className={cn('flex flex-col px-4', props.className)}>
      <div className="flex items-start gap-4">
        <Logo className="h-[1.625rem] w-[2.0625rem] overflow-visible" />
        <h2 className="text-2xl uppercase">
          Transactions <br /> History
        </h2>
      </div>
      {/* <StableSwitcher
        layoutId="stable-switcher-transactions-history"
        activeTab={activeStableType}
        setActiveTab={setStableType}
        className="mb-6 mt-8"
      /> */}
      <Accordion type="multiple" className="rounded-3xl bg-cards px-5 py-6">
        {data?.map((tx, index, array) => (
          <TransactionMobileItem
            key={index}
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
  const { data, loading, error } = useTxHistory()
  if (loading) {
    return <TransactionsHistoryDesktopSkeleton {...props} />
  }
  if (error) return `Error! ${error.message}`

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
          {data?.map((tx, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <ActionChip type={tx.action} />
              </Table.Cell>
              <Table.Cell>{tx.amount}</Table.Cell>
              <Table.Cell>
                {tx.action === ActionType.Bridge ? (
                  '-'
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <TokenIconComponent symbol={tx?.from} className="size-10" />
                      <TokenIconComponent symbol={tx.protocol} className="size-10" />
                    </div>
                    /<span>{tx.apy}%</span>/<span>${formatAmountValue(tx.tvl)}</span>
                  </div>
                )}
              </Table.Cell>
              <Table.Cell>
                {tx.action === ActionType.Bridge ? (
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
              <Table.Cell>{getFromNow(Number(tx.timestamp))}</Table.Cell>
              <Table.Cell>#{index + 1}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* <Pagination className="mt-6" /> */}
    </div>
  )
}

const TransactionsHistoryDesktopSkeleton: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return (
    <div {...props} className={cn('flex flex-col', props.className)}>
      <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
        <Logo />
        Transactions History
      </h2>
      <StableSwitcher
        layoutId="stable-switcher-transactions-history"
        activeTab="USDT"
        setActiveTab={() => {}}
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
          {Array.from({ length: 4 })?.map((_, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton className="h-12 w-40 rounded-xl" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-12 w-20 rounded-xl" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-12 w-60 rounded-xl" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="w-30 h-12 rounded-xl" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="w-30 h-12 rounded-xl" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-12 w-24 rounded-xl" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-10 w-20 rounded-xl" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
