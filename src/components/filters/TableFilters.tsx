import { type OptionType, Select } from '@components/select/Select'
import { SearchInput } from '@components/text-input/SearchInput'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export type SelectOption = {
  items: OptionType[]
  value: OptionType
  placeholder?: string
}
export type SearchOption = { value: string; placeholder?: string }

type SelectFilters =
  | 'action'
  | 'token'
  | 'status'
  | 'chain'
  | 'protocol'
  | 'from'
  | 'functions'
  | 'pps'

export type TableFiltersType = {
  [key in SelectFilters]?: SelectOption
} & { search?: SearchOption }

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
