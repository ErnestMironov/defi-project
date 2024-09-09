import type { SortDirection } from '@api/maat-finance/types'
import { useState } from 'react'

type Sort<T extends string> = {
  sort: T
  orderBy: SortDirection
}

export const useSort = <T extends string>(variants: T[], initialSort: Sort<T>) => {
  const [currentSort, setCurrentSort] = useState<Sort<T>>(initialSort)

  const onSortChange = (_sort: T) => {
    const updatedOrderBy = currentSort.orderBy === 'desc' ? 'asc' : 'desc'
    variants.forEach((variant) => {
      if (variant === _sort) {
        setCurrentSort({
          orderBy: currentSort.sort === variant ? updatedOrderBy : 'desc',
          sort: variant,
        })
      }
    })
  }

  return {
    sort: currentSort.sort,
    orderBy: currentSort.orderBy,
    onSortChange,
  }
}
