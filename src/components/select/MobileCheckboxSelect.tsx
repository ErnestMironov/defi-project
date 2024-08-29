/* eslint-disable jsx-a11y/label-has-associated-control */
import { Checkbox } from '@components/ui/checkbox'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import type { OptionType } from './Select'

interface CheckboxProperties extends Omit<ComponentProps<'div'>, 'onChange'> {
  options: OptionType[]
  onChange: (options: OptionType[]) => void
  label: string
  value: OptionType[]
}

export const MobileCheckboxSelect = (props: CheckboxProperties) => {
  const { className, label, value, options, onChange } = props
  return (
    <div className={cn('flex flex-col items-start gap-2', className)}>
      {label && <div className="text-gray-100">{label}</div>}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3.5">
        {options.map((option) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id={option.value}
              checked={value.some((v) => v.value === option.value)}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange([...value, option])
                } else {
                  onChange(value.filter((v) => v.value !== option.value))
                }
              }}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
