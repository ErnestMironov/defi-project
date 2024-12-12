import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import type { OptionType } from './Select'

interface MobileRadioSelectProperties extends Omit<ComponentProps<'div'>, 'onChange'> {
  options: OptionType[]
  onChange: (option: OptionType) => void
  label: string
  value?: OptionType
}

export const MobileRadioSelect = (props: MobileRadioSelectProperties) => {
  const { className, label, options, value, onChange } = props

  return (
    <div className={cn('flex flex-col items-start gap-2', className)}>
      {label && <div className="text-gray-100">{label}</div>}
      <RadioGroup
        className="w-full"
        value={value?.value}
        onValueChange={(_value) => {
          const option = options.find((_option) => _option.value === _value)
          if (option) {
            onChange(option)
          }
        }}
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center justify-between px-3 py-4 text-sm"
          >
            <label htmlFor={option.value} className="flex items-center gap-[0.38rem]">
              {option.Icon && <option.Icon className="size-4" />}
              {option.label}
            </label>
            <RadioGroupItem value={option.value} id={option.value} />
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
