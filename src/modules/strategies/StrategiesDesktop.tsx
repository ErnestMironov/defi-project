import { useStrategies } from '@api/queries/useStrategies'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { SectionTitle } from '@components/section/SectionTitle'
import { Button } from '@components/ui/button'
import { usePages } from '@hooks/common/usePages'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { StrategyTable } from './StrategyTable'

interface StrategiesDesktopProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
  withLink?: boolean
}

export const StrategiesDesktop: React.FC<StrategiesDesktopProperties> = (props) => {
  const { filters: initialFilters, className, withLink = false } = props
  const [filters, setFilters] = useState(initialFilters)
  const navigate = useNavigate()

  const { onPageChange, page, size, onPageSizeChange } = usePages()
  const { data, isLoading, error, isPlaceholderData } = useStrategies({
    page,
    size,
  })

  return (
    <section {...props} className={cn('', className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Strategies</SectionTitle>
        {withLink && (
          <Button onClick={() => navigate(ROUTES.STRATEGIES)}>Go to strategies</Button>
        )}
      </div>
      <TableFilters filters={filters} setFilters={setFilters} />
      <StrategyTable
        strategies={data?.items}
        loading={isLoading || isPlaceholderData}
        error={error}
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
