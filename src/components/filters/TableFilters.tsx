import { SearchInput } from '@components/input/SearchInput'
import { type OptionType, Select } from '@components/select/Select'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export type SelectOption = {
  items: OptionType[]
  value: OptionType
  placeholder?: string
}
export type SearchOption = { value: string; placeholder?: string }

export type TableFiltersType = {
  search?: SearchOption
  action?: SelectOption
  token?: SelectOption
  status?: SelectOption
  chain?: SelectOption
  protocol?: SelectOption
  from?: SelectOption
}

interface TableFiltersProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
  setFilters: (filters: TableFiltersType) => void
}

export const TableFilters = (props: TableFiltersProperties) => {
  const { filters, setFilters, className, ...rest } = props
  const { search: searchFilter, ...selectFilters } = filters
  return (
    <div
      className={cn(
        'mb-2 mt-8 flex items-center gap-4 rounded-3xl bg-cards p-6 *:w-[15.625rem]',
        className,
      )}
      {...rest}
    >
      {searchFilter && (
        <SearchInput
          className="grow"
          value={searchFilter.value}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: { ...searchFilter, value: e.target.value },
            })
          }
          placeholder={searchFilter.placeholder}
        />
      )}
      {Object.entries(selectFilters).map(([key, value]) => {
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
      })}
    </div>
  )
}
