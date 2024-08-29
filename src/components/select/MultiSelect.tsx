import ArrowDown from '@assets/icons/arrow-down.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Command, CommandGroup, CommandItem, CommandList } from '@components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@utils/cn'
import * as React from 'react'

import type { OptionType } from './Select'

interface MultiSelectProperties extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  options: OptionType[]
  value: OptionType[]
  onChange: (value: OptionType[]) => void
  placeholder?: string
  label?: string
  classNames?: {
    content?: string
  }
}

interface MultiSelectTriggerProperties
  extends Omit<React.ComponentProps<'button'>, 'value'> {
  value: OptionType[]
  placeholder?: string
  label?: string
}

const MultiSelectTrigger = (props: MultiSelectTriggerProperties) => {
  const { value, placeholder, className } = props
  return (
    <button
      type="button"
      className={cn(
        'flex size-full flex-col items-start justify-between text-base',
        className,
      )}
    >
      <div className="flex size-full items-center justify-between rounded-xl bg-cards px-4">
        {value.length > 1 ? (
          <div className="flex items-center -space-x-2">
            {value.map((option) => (
              <TokenIconComponent
                key={option.value}
                className="size-5"
                symbol={option.value}
              />
            ))}
          </div>
        ) : value.length === 1 ? (
          value[0].label
        ) : (
          <div>{placeholder}</div>
        )}
        <ArrowDown className="size-4 transition group-data-[state=open]:rotate-180" />
      </div>
    </button>
  )
}

export const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder,
  label,
  className,
  classNames,
}: MultiSelectProperties) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn('group size-full', className)}>
        <MultiSelectTrigger
          value={value}
          placeholder={placeholder}
          label={label}
          className={className}
        />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        align="start"
        className={cn('w-fit rounded-xl p-6', classNames?.content)}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  data-select={value.some((v) => v.value === option.value)}
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    if (value.some((v) => v.value === option.value)) {
                      onChange(value.filter((v) => v.value !== option.value))
                    } else {
                      onChange([...value, option])
                    }
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
