/* eslint-disable react/no-unused-prop-types */
import ChevronDown from '@assets/icons/arrow-up.svg'
import Check from '@assets/icons/check.svg'
import { TokenIconComponent } from '@components/token-icon'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import { cn } from '@utils/cn'
import { type ComponentProps, forwardRef } from 'react'

import type { OptionType } from './Select'

export interface DrawerMultiSelectProperties
  extends Omit<ComponentProps<'div'>, 'onChange' | 'value'> {
  options: OptionType[]
  onChange: (options: OptionType[]) => void
  label?: string
  value: OptionType[]
  placeholder: string
}

interface DrawerMultiSelectTriggerProperties
  extends Omit<ComponentProps<'button'>, 'value'> {
  label?: string
  value: OptionType[]
  placeholder: string
}

export const DrawerMultiSelectTrigger = forwardRef<
  HTMLButtonElement,
  DrawerMultiSelectTriggerProperties
>(
  (
    {
      label,
      value,
      className,
      placeholder,
      ...props
    }: DrawerMultiSelectTriggerProperties,
    reference: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <button
        type="button"
        className={cn('flex w-full flex-col items-start justify-between')}
        ref={reference}
        {...props}
      >
        {label && <div className="mb-4 text-gray-100">{label}</div>}
        <div
          className={cn(
            'flex w-full items-center justify-between rounded-lg border border-stroke-100 px-4 py-3',
            className,
          )}
        >
          {value.length > 1 ? (
            <div className="flex items-center -space-x-2">
              {value.map((option) => (
                <TokenIconComponent
                  key={option.value}
                  className="size-6"
                  symbol={option.value}
                />
              ))}
            </div>
          ) : value.length === 1 ? (
            value[0].label
          ) : (
            placeholder
          )}
          <ChevronDown className="size-4" />
        </div>
      </button>
    )
  },
)

export const DrawerMultiSelect = (props: DrawerMultiSelectProperties) => {
  const { options, value, onChange, placeholder, label, className } = props
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <DrawerMultiSelectTrigger
          className={className}
          value={value}
          placeholder={placeholder}
          label={label}
        />
      </DrawerTrigger>
      <DrawerContent
        aria-describedby={undefined}
        position="bottom"
        className="inset-x-0 w-full items-center justify-center space-y-5 px-4 py-6"
      >
        <DrawerTitle className="sr-only">{label}</DrawerTitle>
        {options.map((option) => {
          return (
            <div
              key={option.value}
              className="flex items-center justify-between"
              onClick={() => {
                if (value.includes(option)) {
                  onChange(value.filter((v) => v.value !== option.value))
                } else {
                  onChange([...value, option])
                }
              }}
            >
              {option.label}
              {value.includes(option) && <Check className="size-[1.125rem]" />}
            </div>
          )
        })}
      </DrawerContent>
    </Drawer>
  )
}
