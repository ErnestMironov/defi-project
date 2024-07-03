import { useTxHistory } from '@api/queries/useTxHistory'
import type { StableType } from '@components/stable-switcher/StableSwitcher'
import { STABLE_TYPE, StableSwitcher } from '@components/stable-switcher/StableSwitcher'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import { Accordion } from '@radix-ui/react-accordion'
import { cn } from '@utils/cn'
import { useState } from 'react'

import { TransactionMobileItem } from './TransactionMobileItem'

export const TransactionsHistoryMobile: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const [activeStableType, setStableType] = useState<StableType>(STABLE_TYPE.USDT)

  const [currentPage, setCurrentPage] = useState(1)
  const { data, pageInfo, fetchMore, totalCount } = useTxHistory({
    perPage: 10,
    page: currentPage,
    symbol: activeStableType,
  })

  const onViewMoreClick = () => {
    fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
    })
  }

  const onStableChange = (value: StableType) => {
    setCurrentPage(1)
    setStableType(value)
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
        layoutId="stable-switcher-transactions-history"
        activeTab={activeStableType}
        onTabChange={onStableChange}
        className="mb-6 mt-8"
      />
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
      {pageInfo?.hasNextPage && (
        <Button size="lg" className="mt-8" onClick={onViewMoreClick}>
          View more
        </Button>
      )}
    </div>
  )
}
