import type { DrawerMultiSelectProperties } from '@components/select/DrawerMultiSelect'
import { type OptionType } from '@components/select/Select'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { useState } from 'react'

import type { SearchOption } from './TableFilters'

export type SelectOption = {
  items: OptionType[]
  value: OptionType[]
  placeholder?: string
  type: 'multi-select' | 'checkbox' | 'radio'
  label: string
}

export type InputOption = { value: string; placeholder?: string; type: 'text' }

type SortType = {
  items: OptionType[]
  value: OptionType | undefined
  label: string
  placeholder?: string
  type: 'radio'
}

export type MobileFiltersType = {
  filters: SelectOption[]
  sort: SortType[]
  search: SearchOption
}

interface MobileFiltersProperties extends ComponentProps<'div'> {
  filters: DrawerMultiSelectProperties[]
  resetFilters: () => void
}

export const MobileFilters = (props: MobileFiltersProperties) => {
  const { filters, resetFilters, className, ...rest } = props
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={cn('flex items-center gap-2', className)} {...rest}>
      {/* {Object.entries(selectFilters).map(([key, value]) => {
        return (
          <Select
            className="h-[3.375rem]"
            key={key}
            options={value.items}
            value={value.value}
            onChange={(option) =>
              setFilters({
                ...filters,
                [key]: {
                  items: value.items,
                  value: option,
                },
              })
            }
            placeholder={key}
          />
        )
      })} */}
    </div>
  )
}
