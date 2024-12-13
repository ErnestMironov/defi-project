import { MultiSelect } from '@components/select/MultiSelect'
import { type OptionType } from '@components/select/Select'
import { SearchInput } from '@components/text-input/SearchInput'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export type MultiSelectOption = {
  items: OptionType[]
  value: OptionType[]
  placeholder?: string
  icon?: React.ReactNode
}
export type SearchOption = { value: string; placeholder?: string }

type MultiSelectFilters =
  | 'actions_type'
  | 'token'
  | 'status'
  | 'chain'
  | 'protocol'
  | 'from'
  | 'functions'
  | 'pps'
  | 'incentive-actions'
  | 'incentive-from'

export type TableFiltersType = {
  [key in MultiSelectFilters]?: MultiSelectOption
} & { search?: SearchOption }

interface TableFiltersProperties extends ComponentProps<'div'> {
  filters: TableFiltersType
  setFilters: (filters: TableFiltersType) => void
}

export const TableFilters = (props: TableFiltersProperties) => {
  const { filters, setFilters, className, ...rest } = props
  const { search: searchFilter, ...selectFilters } = filters

  const clearFilters = () => {
    const clearedFilters = Object.entries(selectFilters).reduce(
      (accumulator, [key, value]) => {
        return {
          ...accumulator,
          [key]: { ...value, value: [] },
        }
      },
      {},
    )
    setFilters({
      search: searchFilter,
      ...clearedFilters,
    })
  }

  return (
    <div
      className={cn('flex items-center gap-4 pr-4 border-b border-stroke-100', className)}
      {...rest}
    >
      {searchFilter && (
        <SearchInput
          className="grow border-r border-stroke-100 bg-input-default px-6"
          classNames={{ input: 'py-6' }}
          value={searchFilter.value}
          onValueChange={(value: string) =>
            setFilters({
              ...filters,
              search: { ...searchFilter, value },
            })
          }
          placeholder={searchFilter.placeholder}
        />
      )}
      <div className="flex h-full items-center gap-2 *:w-[12.5rem]">
        {Object.entries(selectFilters).map(([key, value]) => {
          return (
            <MultiSelect
              variant="outline"
              key={key}
              icon={value.icon}
              options={value.items}
              value={value.value}
              onChange={(option) =>
                setFilters({
                  ...filters,
                  [key]: {
                    ...filters[key as keyof typeof filters],
                    items: value.items,
                    value: option,
                  },
                })
              }
              placeholder={value.placeholder}
            />
          )
        })}
      </div>

      <button
        type="button"
        onClick={clearFilters}
        className="h-12 rounded-xl border border-stroke-100 px-[1.88rem] text-sm/[1.5rem] shadow-test"
      >
        Clear
      </button>
    </div>
  )
}
