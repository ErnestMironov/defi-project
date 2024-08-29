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
        value={value?.value}
        onValueChange={(_value) => {
          const option = options.find((_option) => _option.value === _value)
          if (option) {
            onChange(option)
          }
        }}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
