import Search from '@assets/icons/search.svg'
import { SystemMessage } from '@components/system-message'
import { Dialog, DialogTrigger } from '@components/ui/dialog'
import { ScrollArea } from '@components/ui/scroll-area'
import { Skeleton } from '@components/ui/skeleton'
import type { ChainType } from '@constants/chains'
import type { TokensByChain } from '@hooks/tokens/useTokensList'
import type { HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'

import { ResponsiveDialogContent } from '../deposit/components/ResponsiveDialogContent'
import { SelectChainTrigger } from '../deposit/components/SelectChainTrigger'
import { SelectNetworkPopover } from '../SelectNetworkPopover'

interface UniversalSelectModalProperties<T, R = T> {
  selectedItem?: T
  items: TokensByChain<T>
  isLoading?: boolean
  filterByNetwork?: boolean
  filterBySearch?: boolean
  filterItems: (
    items: TokensByChain<T>,
    searchValue: string,
    network: ChainType | null,
  ) => T[]
  renderTrigger: (selectedItem?: T) => ReactNode
  renderItem: (item: T, onChange: (value: R) => void) => ReactNode
  onChange: (value: R) => void
}

export function UniversalSelectModal<T, R = T>({
  selectedItem,
  items,
  isLoading,
  renderTrigger,
  renderItem,
  onChange,
  filterByNetwork = false,
  filterBySearch = false,
  filterItems,
}: UniversalSelectModalProperties<T, R> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) {
  const [opened, setOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [network, setNetwork] = useState<ChainType | null>(null)

  const handleChange = (item: R) => {
    onChange(item)
    setOpened(false)
  }

  const filteredItems = filterItems
    ? filterItems(items, searchValue, network)
    : ([] as T[])

  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>{renderTrigger(selectedItem)}</DialogTrigger>

      <ResponsiveDialogContent
        className="max-w-[31.25rem] border border-stroke-100"
        opened={opened}
        setOpened={setOpened}
      >
        {(filterBySearch || filterByNetwork) && (
          <div className="relative flex w-full items-stretch gap-2 px-6 py-4 max-lg:max-w-full">
            {filterBySearch && (
              <label
                htmlFor="search-input"
                className="flex grow items-center gap-2 rounded-xl bg-input-default px-6 py-4"
              >
                <span className="sr-only">Search tokens</span>
                <Search />
                <input
                  id="search-input"
                  name="search-input"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  className="max-w-full bg-transparent text-lg placeholder:text-gray-100 focus:outline-none max-lg:max-w-24"
                  placeholder="Search"
                />
              </label>
            )}
            {filterByNetwork && (
              <SelectNetworkPopover
                chain={network}
                onChange={setNetwork}
                trigger={<SelectChainTrigger chain={network} />}
                showAllNetworksOption
              />
            )}
          </div>
        )}

        <ScrollArea className="h-[19.5rem] overscroll-none px-1 max-lg:h-auto max-lg:grow">
          <div className="space-y-1">
            {isLoading && (
              <>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="flex h-[4.5rem] w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
                  />
                ))}
              </>
            )}

            {filteredItems.map((item) => renderItem(item, handleChange))}

            {filteredItems.length === 0 && searchValue && (
              <SystemMessage
                className="mx-5"
                variant="error"
                message="Whoops...This token was not found"
              />
            )}
          </div>
        </ScrollArea>
      </ResponsiveDialogContent>
    </Dialog>
  )
}
