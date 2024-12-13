import ChevronDown from '@assets/icons/arrow-up.svg'
import Check from '@assets/icons/check.svg'
import { Drawer, DrawerContent, DrawerTrigger } from '@components/ui/drawer'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import type { OptionType } from './Select'

interface DrawerSelectProperties
  extends Omit<ComponentProps<'div'>, 'onChange' | 'value'> {
  options: OptionType[]
  value: OptionType
  onChange: (value: OptionType) => void
  label?: string
}

export const DrawerSelect = (props: DrawerSelectProperties) => {
  const { label, options, value, onChange } = props
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DrawerSelectTrigger label={label} value={value} />
      </DrawerTrigger>
      <DrawerContent
        aria-describedby={undefined}
        position="bottom"
        className="inset-x-0 w-full items-center justify-center space-y-5 px-4 py-6"
      >
        {options.map((option) => {
          return (
            <div
              key={option.value}
              className="flex items-center justify-between"
              onClick={() => onChange(option)}
            >
              {option.label}
              {option.value === value.value && <Check className="size-[1.125rem]" />}
            </div>
          )
        })}
      </DrawerContent>
    </Drawer>
  )
}

interface DrawerSelectTriggerProperties extends Omit<ComponentProps<'button'>, 'value'> {
  label?: string
  value: OptionType
}

export const DrawerSelectTrigger = ({
  label,
  value,
  className,
  ...props
}: DrawerSelectTriggerProperties) => {
  return (
    <button
      type="button"
      className={cn('flex w-full flex-col items-start justify-between', className)}
      {...props}
    >
      {label && <div className="text-gray-100">{label}</div>}
      <div className="mt-4 flex w-full items-center justify-between rounded-lg border border-stroke-100 px-4 py-3">
        <div>{value.label}</div>
        <ChevronDown className="size-4" />
      </div>
    </button>
  )
}
