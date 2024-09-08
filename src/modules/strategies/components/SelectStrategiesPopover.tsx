import ChevronDown from '@assets/icons/arrow-down.svg'
import Check from '@assets/icons/check.svg'
import Setting from '@assets/icons/setting.svg'
import type { OptionType } from '@components/select/Select'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@utils/cn'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

import { CustomProtocolsDrawer } from './CustomProtocolsDrawer'

interface SelectGraphPopoverProperties {
  options: OptionType[]
  value: OptionType
  onChange: (option: OptionType) => void
  disabled?: boolean
}

export const SELECT_STRATEGIES: OptionType[] = [
  { label: 'Top 5 strategies', value: 'Top 5 strategies' },
  {
    label: 'Custom...',
    value: 'Custom',
    Icon: () => <></>,
    callback: () => {},
  },
]

export const SelectStrategiesPopover = ({
  disabled,
  options,
  value,
  onChange,
}: SelectGraphPopoverProperties) => {
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isFirstOpen, setFirstOpen] = useState(true)
  const reference = useRef<HTMLButtonElement | null>(null)

  const renderRightSection = (option: OptionType) => {
    if (option.value === 'Custom') {
      return (
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setDrawerOpen(true)
          }}
          className="size-[1.125rem]"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Setting
            className={cn(
              'size-full',
              value.value === option.value && '[&_path]:fill-main-100',
            )}
          />
        </motion.button>
      )
    }
    if (value.value === option.value) {
      return <Check className="size-[1.125rem]" />
    }
    return <></>
  }

  return (
    <>
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger
          ref={reference}
          className="group flex w-full items-center justify-between rounded-xl border border-stroke-100 p-4 text-lg"
        >
          <div>{value.label}</div>
          <ChevronDown className="size-4 transition-all duration-300 group-data-[state='open']:rotate-180" />
        </PopoverTrigger>
        <PopoverContent
          style={{
            width: `${reference.current?.offsetWidth}px`,
          }}
          className="rounded-xl border border-stroke-100 p-6"
        >
          <div className="flex w-full flex-col gap-5 text-base">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  'flex w-full relative cursor-pointer items-center justify-between',
                  'hover:before:bg-main-15 before:pointer-events-none before:h-[calc(100%+1rem)] before:w-[calc(100%+1rem)] before:rounded-xl before:absolute before:-top-2 before:-left-2 before:transition-width before:duration-200 before:ease-in-out before:group-hover:w-full',
                )}
                onClick={() => {
                  if (option.value === 'Custom' && isFirstOpen) {
                    setDrawerOpen(true)
                  }
                  onChange(option)
                  setOpen(false)
                }}
              >
                <div>{option.label}</div>
                {renderRightSection(option)}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <CustomProtocolsDrawer
        onOpenChange={setDrawerOpen}
        open={drawerOpen}
        onClose={() => {
          setFirstOpen(false)
          onChange(options.find((option) => option.value === 'Custom') as OptionType)
        }}
      />
    </>
  )
}
