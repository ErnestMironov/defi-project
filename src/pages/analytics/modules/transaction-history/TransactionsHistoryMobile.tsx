import { useTxHistory } from '@api/queries/useTxHistory'
import { DotLoader } from '@components/loader/DotLoader'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { STABLE_TYPE, StableSwitcher } from '@components/stable-switcher/StableSwitcher'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import { Accordion } from '@radix-ui/react-accordion'
import { cn } from '@utils/cn'
import { useState } from 'react'

import {
  SkeletonTransactionMobileItem,
  TransactionMobileItem,
} from './TransactionMobileItem'

export const TransactionsHistoryMobile: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)

  const [currentPage, setCurrentPage] = useState(1)
  const { data, loading, error, pageInfo, fetchMore, totalCount } = useTxHistory({
    perPage: 10,
    page: currentPage,
    symbol: activeStableType,
  })
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const onViewMoreClick = async () => {
    setIsLoadingMore(true)
    await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
    })
    setIsLoadingMore(false)
  }

  const onStableChange = (value: StableType) => {
    setCurrentPage(1)
    setStableType(value)
  }

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return (
          <Accordion type="multiple" className="rounded-3xl bg-cards px-5 py-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonTransactionMobileItem key={i} isLast={i === 9} />
            ))}
          </Accordion>
        )
      }
      default: {
        return (
          <>
            <Accordion type="multiple" className="rounded-3xl bg-cards px-5 py-6">
              {totalCount &&
                data?.map((tx, index, array) => (
                  <TransactionMobileItem
                    key={index}
                    tx={tx}
                    txIndex={totalCount - index}
                    isLast={index === array.length - 1}
                  />
                ))}
            </Accordion>
            {isLoadingMore && (
              <div className="my-4 flex items-center justify-center">
                <DotLoader className="text-xl" />
              </div>
            )}
            {pageInfo?.hasNextPage && (
              <Button size="lg" className="mt-8" onClick={onViewMoreClick}>
                View more
              </Button>
            )}
          </>
        )
      }
    }
  }

  return (
    <div {...props} className={cn('flex flex-col px-4', props.className)}>
      <div className="flex items-start gap-4">
        <Logo className="h-[1.625rem] w-[2.0625rem] overflow-visible" />
        <h2 className="text-2xl uppercase">
          Transactions <br /> History
        </h2>
      </div>
      <StableSwitcher
        activeTab={activeStableType}
        onTabChange={onStableChange}
        className="mb-6 mt-8"
      />
      {renderBody()}
    </div>
  )
}
