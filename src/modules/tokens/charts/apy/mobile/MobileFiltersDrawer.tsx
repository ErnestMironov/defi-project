import X from '@assets/icons/close.svg'
import { DrawerMultiSelect } from '@components/select/DrawerMultiSelect'
import type { OptionType } from '@components/select/Select'
import { Button } from '@components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@components/ui/drawer'
import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
} from '@pages/analytics/constants/select-constant'
import { type ComponentProps, useState } from 'react'

interface MobileFiltersDrawerProperties extends ComponentProps<'div'> {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const MobileFiltersDrawer = (props: MobileFiltersDrawerProperties) => {
  const { children, isOpen, onOpenChange } = props
  const [selectedProtocols, setSelectedProtocols] = useState<OptionType[]>([])
  const [selectedChains, setSelectedChains] = useState<OptionType[]>([])
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      {children}
      <DrawerContent
        aria-describedby={undefined}
        position="bottom"
        withDraggable={false}
        className="inset-x-0 w-full items-center justify-center space-y-5 px-4 py-6"
      >
        <DrawerHeader className="flex w-full items-center justify-between">
          <DrawerTitle className="text-lg font-bold text-text-90">Filters</DrawerTitle>
          <DrawerClose>
            <X className="size-6 [&_path]:stroke-gray-100" />
          </DrawerClose>
        </DrawerHeader>
        <DrawerMultiSelect
          emptyLabel="All Protocols"
          label="Protocols"
          options={SELECT_PROTOCOLS.slice(1)}
          value={selectedProtocols}
          onChange={(value) => setSelectedProtocols(value)}
        />
        <DrawerMultiSelect
          emptyLabel="All Chains"
          label="Chains"
          options={SELECT_CHAINS.slice(1)}
          value={selectedChains}
          onChange={(value) => setSelectedChains(value)}
        />
        <div className="flex w-full items-center gap-2 *:flex-1">
          <Button
            onClick={() => {
              setSelectedProtocols([])
              setSelectedChains([])
            }}
            variant="outline-light"
            size="lg"
            className="py-4"
          >
            Reset
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            variant="light"
            size="lg"
            className="py-4 font-bold"
          >
            Apply
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
