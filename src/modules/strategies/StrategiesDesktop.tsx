import { useStrategies } from '@api/queries/useStrategies'
import type { TableFiltersType } from '@components/filters/TableFilters'
import { TableFilters } from '@components/filters/TableFilters'
import { Pagination } from '@components/pagination/Pagination'
import { SectionTitle } from '@components/section/SectionTitle'
import { Button } from '@components/ui/button'
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
  const { data, loading, error } = useStrategies()
  return (
    <section {...props} className={cn('', className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Strategies</SectionTitle>
        {withLink && (
          <Button onClick={() => navigate('/strategies')}>Go to strategies</Button>
        )}
      </div>
      <TableFilters filters={filters} setFilters={setFilters} />
      <StrategyTable strategies={data?.strategyStats} loading={loading} error={error} />
      <Pagination
        className="mt-8"
        currentPage={1}
        totalCount={50}
        onPageChange={() => {}}
        perPage={10}
        onPerPageChange={() => {}}
      />
    </section>
  )
}
