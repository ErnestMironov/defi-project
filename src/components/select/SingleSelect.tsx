/* eslint-disable sonarjs/no-small-switch */
import Arrow from '@assets/icons/arrow-down.svg'
import { Command, CommandGroup, CommandItem, CommandList } from '@components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@utils/cn'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import type { OptionType } from './Select'

interface SingleSelectProperties
  extends Omit<React.ComponentProps<'div'>, 'onChange'>,
    VariantProps<typeof singleSelectVariants> {
  options: OptionType[]
  value: OptionType
  onChange: (value: OptionType) => void
  placeholder?: string
  label?: string
  classNames?: {
    content?: string
    trigger?: string
  }
  icon?: React.ReactNode
  align?: 'start' | 'center' | 'end'
}

interface SingleSelectTriggerProperties
  extends Omit<React.ComponentProps<'button'>, 'value'>,
    VariantProps<typeof singleSelectVariants> {
  value: OptionType
  placeholder?: string
  label?: string
  icon?: React.ReactNode
}

const singleSelectVariants = cva('', {
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

const SingleSelectTrigger = (props: SingleSelectTriggerProperties) => {
  const { value, placeholder, className, variant, icon } = props

  const renderValue = () => {
    switch (true) {
      case !!value: {
        return value.label
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
        singleSelectVariants({ variant }),
        className,
      )}
    >
      <div className="flex items-center gap-2 [&_svg]:size-4">
        {icon}
        {renderValue()}
      </div>
      <Arrow className="ml-1 rotate-180 transition group-data-[state=open]:rotate-0" />
    </button>
  )
}

export const SingleSelect = ({
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
}: SingleSelectProperties) => {
  const [open, setOpen] = React.useState(false)
  const reference = React.useRef<HTMLButtonElement>(null)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={reference} className={cn('group size-full', className)}>
        <SingleSelectTrigger
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
          singleSelectVariants({ variant, size: null }),
          classNames?.content,
        )}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  data-select={value.value === option.value}
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option)
                    setOpen(false)
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
