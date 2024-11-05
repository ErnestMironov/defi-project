import type { StrategiesParameters } from '@api/maat-finance/useStrategies'
import { useStrategies } from '@api/maat-finance/useStrategies'
import { getMultiSelectParameters } from '@components/filters/getMultiSelectParamsFromEntries'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { SectionTitle } from '@components/section/SectionTitle'
import { Button } from '@components/ui/button'
import { usePages } from '@hooks/common/usePages'
import { useSort } from '@hooks/common/useSort'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAddress, isHash } from 'viem'

import { StrategyTable } from './StrategyTable'

interface StrategiesDesktopProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
  withLink?: boolean
  params?: StrategiesParameters
}

export const StrategiesDesktop: React.FC<StrategiesDesktopProperties> = (props) => {
  const { filters: initialFilters, className, withLink = false, params } = props
  const [filters, setFilters] = useState(initialFilters)
  const navigate = useNavigate()
  const { search, ...selectFilters } = filters
  const { onPageChange, page, size, onPageSizeChange } = usePages()

  const { sort, orderBy, onSortChange } = useSort(['apy', 'tvl'], {
    orderBy: 'desc',
    sort: 'apy',
  })
  const { data, isLoading, error, isPlaceholderData } = useStrategies({
    page,
    size,
    sort,
    order_by: orderBy,
    strategy_ids: search?.value && isHash(search?.value) ? [search?.value] : undefined,
    strategy_addresses:
      search?.value && isAddress(search?.value) ? [search?.value] : undefined,
    ...getMultiSelectParameters(selectFilters),
    ...params,
  })

  const handleFiltersChange = (newFilters: TableFiltersType) => {
    setFilters(newFilters)
    onPageChange(1)
  }

  return (
    <section {...props} className={cn('', className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Strategies</SectionTitle>
        {withLink && (
          <Button onClick={() => navigate(ROUTES.STRATEGIES)}>Go to strategies</Button>
        )}
      </div>
      <TableFilters filters={filters} setFilters={handleFiltersChange} />
      <StrategyTable
        strategies={data?.items}
        loading={isLoading || isPlaceholderData}
        error={error}
        currentSort={{ sort, order_by: orderBy }}
        onSortChange={onSortChange}
      />
      {data && (
        <Pagination
          className="mt-8"
          currentPage={data.page}
          totalCount={data.total_items}
          onPageChange={onPageChange}
          size={size}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </section>
  )
}
