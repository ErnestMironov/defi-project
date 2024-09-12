import type { TableFiltersType } from '@components/filters/TableFilters'

export const getMultiSelectParameters = (entries: TableFiltersType) => {
  return Object.fromEntries(
    Object.entries(entries)
      .filter(([_, v]) => v.value && v.value.length > 0)
      .map(([key, value]) => {
        const filterValue = Array.isArray(value.value)
          ? value.value.map((v) => v.value || v).filter(Boolean)
          : value.value
        return [key, filterValue]
      }),
  )
}
