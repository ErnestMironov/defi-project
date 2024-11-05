import ChevronDown from '@assets/icons/arrow-down.svg'
import Check from '@assets/icons/check.svg'
import Filter from '@assets/icons/filter.svg'
import type { OptionType } from '@components/select/Select'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@utils/cn'
import { useRef, useState } from 'react'

interface SelectGraphPopoverProperties {
  options: OptionType[]
  value: OptionType
  onChange: (option: OptionType) => void
}

export const SelectStrategiesMobilePopover = ({
  options,
  value,
  onChange,
}: SelectGraphPopoverProperties) => {
  const [open, setOpen] = useState(false)
  const reference = useRef<HTMLButtonElement | null>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={reference}
        className="group flex w-full items-center rounded-xl border border-stroke-100 p-4 text-lg"
      >
        <Filter className="size-6" />
        <div className="ml-2 flex-1 text-left">{value.label}</div>
        <ChevronDown className="size-4 transition-all duration-300 group-data-[state='open']:rotate-180" />
      </PopoverTrigger>
      <PopoverContent
        style={{
          width: `${reference.current?.offsetWidth}px`,
        }}
        onInteractOutside={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        className="pointer-events-auto rounded-xl border border-stroke-100 p-6"
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
                onChange(option)
                setOpen(false)
              }}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div>{option.label}</div>
                {option.value === value.value && <Check className="ml-auto size-5" />}
                {option.Icon && option.value !== value.value && (
                  <option.Icon className="ml-auto size-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
