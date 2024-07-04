import { useTxHistoryDesktop } from '@api/queries/useTxHistoryDesktop'
import Arrow from '@assets/icons/arrow.svg'
import LogoIcon from '@assets/icons/logo.svg'
import ProfileIcon from '@assets/icons/profile-circle.svg'
import { ActionType } from '@codegen/graphql'
import { Pagination } from '@components/pagination/Pagination'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { STABLE_TYPE, StableSwitcher } from '@components/stable-switcher/StableSwitcher'
import { Table } from '@components/table'
import { TokenIconComponent } from '@components/token-icon'
import { ActionChip } from '@components/transaction-type-badge'
import { Logo } from '@components/ui/logo'
import { Skeleton } from '@components/ui/skeleton'
import { PER_PAGE_ARRAY } from '@constants/per-page-array'
import { useClipboard } from '@hooks/useClipboard'
import { cn } from '@utils/cn'
import { formatAmountValue } from '@utils/formatValue'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import { useEffect, useState } from 'react'
import type { ITransaction } from 'src/lib/types/transaction'

export const TransactionsHistoryDesktop: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { copyWithToast } = useClipboard()

  const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState<(typeof PER_PAGE_ARRAY)[number]>(
    PER_PAGE_ARRAY[0],
  )

  const { data, loading, error, totalCount } = useTxHistoryDesktop({
    perPage,
    page: currentPage,
    symbol: activeStableType,
  })
  const [totalCountMemo, setTotalCountMemo] = useState<number | undefined>()
  useEffect(() => {
    if (totalCount === undefined) {
      return
    }
    setTotalCountMemo(totalCount)
  }, [totalCount])

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }
  const onPerPageChange = (_perPage: (typeof PER_PAGE_ARRAY)[number]) => {
    setCurrentPage(1)
    setPerPage(_perPage)
  }

  const onStableChange = (value: StableType) => {
    setCurrentPage(1)
    setStableType(value)
  }

  const renderStrategy = (tx: ITransaction) => {
    switch (tx.action) {
      case ActionType.Bridge:
      case ActionType.WithdrawRequestFulfillment: {
        return '-'
      }
      default: {
        return (
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <TokenIconComponent symbol={tx?.from} className="size-10" />
              <TokenIconComponent symbol={tx.protocol} className="size-10" />
            </div>
            /<span>{tx.apy}%</span>/<span>${formatAmountValue(tx.tvl)}</span>
          </div>
        )
      }
    }
  }
  const renderFromTo = (tx: ITransaction) => {
    switch (tx.action) {
      case ActionType.Bridge: {
        return (
          <div className="flex items-center gap-2">
            <TokenIconComponent symbol={tx.from} className="size-10" />
            <Arrow className="[&_path]:fill-text" />
            <TokenIconComponent symbol={tx.to} className="size-10" />
          </div>
        )
      }
      case ActionType.WithdrawRequestFulfillment: {
        return (
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full border border-text dark:bg-white">
              <LogoIcon className="size-5 [&_path]:fill-black" />
            </div>
            <Arrow className="[&_path]:fill-text" />
            <ProfileIcon className="size-10" />
          </div>
        )
      }
      default: {
        return '-'
      }
    }
  }

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return <TransactionsHistoryDesktopSkeleton count={perPage} {...props} />
      }
      default: {
        return (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Action</Table.HeadCell>
                <Table.HeadCell>Amount</Table.HeadCell>
                <Table.HeadCell>Strategy / Weekly APY / TVL</Table.HeadCell>
                <Table.HeadCell>
                  <div className="flex items-center gap-2">
                    From
                    <Arrow className="[&_path]:fill-text" />
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
                  <Table.Cell>{renderStrategy(tx)}</Table.Cell>
                  <Table.Cell>{renderFromTo(tx)}</Table.Cell>
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
        )
      }
    }
  }
  return (
    <div {...props} className={cn('flex flex-col', props.className)}>
      <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
        <Logo />
        Transactions History
      </h2>
      <StableSwitcher
        layoutId="stable-switcher-transactions-history"
        activeTab={activeStableType}
        onTabChange={onStableChange}
        className="mb-6 mt-12"
      />
      {renderBody()}
      {totalCountMemo && (
        <Pagination
          className="mt-6"
          currentPage={currentPage}
          totalCount={totalCountMemo}
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
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Strategy / Weekly APY / TVL</Table.HeadCell>
          <Table.HeadCell>
            <div className="flex items-center gap-2">
              From
              <Arrow className="[&_path]:fill-text" />
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
  )
}
