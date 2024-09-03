import { useCallback, useState } from 'react'

type Option = {
  value: string
  label: React.ReactNode | string
}

type FilterConfig = {
  options: Option[]
  emptyLabel: string
  label: string
}

type Filter = FilterConfig & {
  value: Option[]
  onChange: (value: Option[]) => void
}

export const useFilters = (filterConfigs: FilterConfig[]) => {
  const createFilter = useCallback(
    (config: FilterConfig): Filter => ({
      ...config,
      value: [],
      onChange: (value: Option[]) => {
        setFilters((previousFilters) =>
          previousFilters.map((filter) =>
            filter.label === config.label ? { ...filter, value } : filter,
          ),
        )
      },
    }),
    [],
  )
  const [filters, setFilters] = useState<Filter[]>(() => filterConfigs.map(createFilter))

  const resetFilters = useCallback(() => {
    setFilters(filterConfigs.map(createFilter))
  }, [filterConfigs, createFilter])

  return { filters, resetFilters }
}

export type FiltersType = ReturnType<typeof useFilters>
