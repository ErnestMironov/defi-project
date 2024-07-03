import { useTxHistory } from '@api/queries/useTxHistory'
import Arrow from '@assets/icons/arrow-filled.svg'
import { ActionType } from '@codegen/graphql'
import { Pagination } from '@components/pagination/Pagination'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { STABLE_TYPE, StableSwitcher } from '@components/stable-switcher/StableSwitcher'
import { Table } from '@components/table'
import { TokenIconComponent } from '@components/token-icon'
import { ActionChip } from '@components/transaction-type-badge'
import { Accordion } from '@components/ui/accordion'
import { Logo } from '@components/ui/logo'
import { Skeleton } from '@components/ui/skeleton'
import { PER_PAGE_ARRAY } from '@constants/per-page-array'
import { useClipboard } from '@hooks/useClipboard'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { useLocalStorage } from '@hooks/useLocalStorage'
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
  // const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)
  const [perPage] = useLocalStorage('perPage', 10)
  const [currentPage, setCurrentPage] = useState(1)
  const { data } = useTxHistory({ perPage, page: currentPage })
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
      {/* // TODO: remove */}
      <div className="mb-6 mt-8" />
      <Accordion type="multiple" className="rounded-3xl bg-cards px-5 py-6">
        {data?.map((tx, index, array) => (
          <TransactionMobileItem
            key={index}
            tx={tx}
            isLast={index === array.length - 1}
          />
        ))}
      </Accordion>
      {/* <Button size="lg" className="mt-8">
        View more
      </Button> */}
    </div>
  )
}

export const TransactionsHistoryDesktop: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { copyWithToast } = useClipboard()
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState<(typeof PER_PAGE_ARRAY)[number]>(
    PER_PAGE_ARRAY[0],
  )
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }
  const onPerPageChange = (_perPage: (typeof PER_PAGE_ARRAY)[number]) => {
    setCurrentPage(1)
    setPerPage(_perPage)
  }

  const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)
  const { data, loading, error, totalCount } = useTxHistory({
    perPage,
    page: currentPage,
    symbol: activeStableType,
  })
  if (loading) {
    return <TransactionsHistoryDesktopSkeleton count={perPage} {...props} />
  }
  if (error) return <TransactionsHistoryDesktopSkeleton {...props} />

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
              <Table.Cell
                className="cursor-pointer"
                onClick={() => copyWithToast(tx.txHash)}
              >
                {shortenString(tx.txHash)}
              </Table.Cell>
              <Table.Cell>{getFromNow(Number(tx.timestamp))}</Table.Cell>
              {totalCount && (
                <Table.Cell>
                  #{totalCount - (currentPage - 1) * perPage - index}
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {totalCount && (
        <Pagination
          className="mt-6"
          currentPage={currentPage}
          totalCount={totalCount}
          onPageChange={onPageChange}
          perPage={perPage}
          onPerPageChange={onPerPageChange}
        />
      )}
    </div>
  )
}

const TransactionsHistoryDesktopSkeleton: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { count?: number }
> = (props) => {
  return (
    <div {...props} className={cn('flex flex-col ', props.className)}>
      <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
        <Logo />
        Transactions History
      </h2>
      {/* <StableSwitcher
        layoutId="stable-switcher-transactions-history"
        activeTab="USDT"
        setActiveTab={() => {}}
        className="mb-6 mt-12"
      /> */}
      {/* // TODO: remove */}
      <div className="mb-6 mt-12" />
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
          {Array.from({ length: props.count || 4 })?.map((_, index) => (
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
