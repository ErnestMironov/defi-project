import ArrowDown from '@assets/icons/arrow-down.svg'
import { TokenIconComponent } from '@components/token-icon'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@utils/cn'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import type { OptionType } from './Select'

interface MultiSelectProperties
  extends Omit<React.ComponentProps<'div'>, 'onChange'>,
    VariantProps<typeof multiSelectVariants> {
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
  extends Omit<React.ComponentProps<'button'>, 'value'>,
    VariantProps<typeof multiSelectVariants> {
  value: OptionType[]
  placeholder?: string
  label?: string
}

const multiSelectVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-cards',
      outline: 'border border-stroke-100',
    },
    size: {
      default:
        'h-auto rounded-2xl px-12 py-5 text-[1.25rem] font-bold uppercase leading-[120%]',
      sm: 'h-9 rounded-md px-3',
      lg: 'rounded-xl px-9 py-6 text-lg max-lg:py-[0.91rem] max-lg:text-base',
      icon: 'size-10',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const MultiSelectTrigger = (props: MultiSelectTriggerProperties) => {
  const { value, placeholder, className, variant } = props
  return (
    <button
      type="button"
      className={cn(
        'flex size-full flex-col items-start justify-between text-base',
        className,
      )}
    >
      <div
        className={cn(
          'flex size-full items-center justify-between rounded-xl px-4',
          multiSelectVariants({ variant }),
        )}
      >
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
  variant,
}: MultiSelectProperties) => {
  const [open, setOpen] = React.useState(false)
  const reference = React.useRef<HTMLButtonElement>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={reference} className={cn('group size-full', className)}>
        <MultiSelectTrigger
          value={value}
          placeholder={placeholder}
          label={label}
          className={className}
          variant={variant}
        />
      </PopoverTrigger>
      <PopoverContent
        style={{
          width: classNames?.content?.includes('w-')
            ? undefined
            : `${reference.current?.offsetWidth}px`,
        }}
        sideOffset={10}
        align="start"
        className={cn(
          'w-fit rounded-xl p-6',
          multiSelectVariants({ variant }),
          classNames?.content,
        )}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem data-select={value.length === 0} onSelect={() => onChange([])}>
                {placeholder}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator className="my-5" />
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
