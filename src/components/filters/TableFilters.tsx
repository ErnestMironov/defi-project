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

      {/* Clear filters  */}
      {/* {Object.values(selectFilters).some((value) => {
        return value.value.length > 0
      }) && ( */}
      <svg
        onClick={() => {
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
        }}
        className="inline-block !size-6 cursor-pointer opacity-50 hover:opacity-100"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 0C5.388 0 0 5.388 0 12C0 18.612 5.388 24 12 24C18.612 24 24 18.612 24 12C24 5.388 18.612 0 12 0ZM16.032 14.76C16.38 15.108 16.38 15.684 16.032 16.032C15.852 16.212 15.624 16.296 15.396 16.296C15.168 16.296 14.94 16.212 14.76 16.032L12 13.272L9.24 16.032C9.06 16.212 8.832 16.296 8.604 16.296C8.376 16.296 8.148 16.212 7.968 16.032C7.62 15.684 7.62 15.108 7.968 14.76L10.728 12L7.968 9.24C7.62 8.892 7.62 8.316 7.968 7.968C8.316 7.62 8.892 7.62 9.24 7.968L12 10.728L14.76 7.968C15.108 7.62 15.684 7.62 16.032 7.968C16.38 8.316 16.38 8.892 16.032 9.24L13.272 12L16.032 14.76Z"
          fill="#9998B8"
        />
      </svg>
      {/* )} */}
    </div>
  )
}
