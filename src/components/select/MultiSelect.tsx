import Arrow from '@assets/icons/arrow-up.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Command, CommandGroup, CommandItem, CommandList } from '@components/ui/command'
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
    trigger?: string
  }
  icon?: React.ReactNode
  align?: 'start' | 'center' | 'end'
}

interface MultiSelectTriggerProperties
  extends Omit<React.ComponentProps<'button'>, 'value'>,
    VariantProps<typeof multiSelectVariants> {
  value: OptionType[]
  placeholder?: string
  label?: string
  icon?: React.ReactNode
}

const multiSelectVariants = cva('', {
  variants: {
    variant: {
      default: 'rounded-xl border border-stroke-100 bg-cards-widget',
      /**
       * @description color2 is cards-widget
       */
      color2: 'bg-cards dark:bg-cards-widget',
      outline: 'border border-stroke-100',
    },
    size: {
      default: 'h-12 rounded-xl px-4 py-3 text-sm/[1rem] font-medium',
      sm: 'h-9 rounded-md px-3',
      lg: 'rounded-xl px-9 py-6 text-lg max-lg:py-[0.91rem] max-lg:text-base',
      icon: 'size-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

const SELECT_ICONS_PLACEHOLDERS = new Set(['All Protocols', 'All Chains', 'All Tokens'])

const MultiSelectTrigger = (props: MultiSelectTriggerProperties) => {
  const { value, placeholder, variant, icon } = props

  const renderValue = () => {
    switch (true) {
      case value.length === 0: {
        return placeholder
      }
      case value.length === 1: {
        return value[0].label
      }
      case placeholder &&
        (!SELECT_ICONS_PLACEHOLDERS.has(placeholder) || value.length >= 6): {
        return `${value.length} Selected`
      }
      case value.length > 1: {
        return (
          <div className="flex items-center -space-x-2">
            {value.map((option) => (
              <TokenIconComponent
                key={option.value}
                className="size-4"
                symbol={option.value}
              />
            ))}
          </div>
        )
      }
      default: {
        return placeholder
      }
    }
  }
  return (
    <button
      type="button"
      className={cn(
        'flex size-full items-center justify-between [&>svg]:size-4',
        'shadow-test',
        multiSelectVariants({ variant }),
      )}
    >
      <div className="flex items-center gap-2 [&_svg]:size-4">
        {(value.length === 0 || value.length > 1) && icon}
        {renderValue()}
      </div>
      <Arrow className="ml-1 rotate-180 transition group-data-[state=open]:rotate-0" />
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
  icon,
  id,
  variant,
  align = 'start',
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
          icon={icon}
          className={cn(className, classNames?.trigger)}
          variant={variant}
        />
      </PopoverTrigger>
      <PopoverContent
        // style={{
        //   width: classNames?.content?.includes('w-')
        //     ? undefined
        //     : `${reference.current?.offsetWidth}px`,
        // }}
        sideOffset={10}
        align={align}
        id={id}
        className={cn(
          'w-[16.25rem] rounded-xl p-1 max-h-96 overflow-y-auto pointer-events-auto',
          '[&_svg]:size-4 [&_*]:text-sm/[1rem] [&_*]:font-medium shadow-test-2',
          multiSelectVariants({ variant, size: null }),
          classNames?.content,
        )}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem data-select={value.length === 0} onSelect={() => onChange([])}>
                <div className="inline-flex items-center gap-[0.38rem]">
                  {icon}
                  {placeholder}
                </div>
              </CommandItem>
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
