import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@components/ui/select'
import { type SelectProps, SelectValue } from '@radix-ui/react-select'
import { cn } from '@utils/cn'
import type { FC, SVGProps } from 'react'

export type OptionType = {
  value: string
  label: React.ReactNode | string
  Icon?: FC<SVGProps<SVGElement>>
  onSelect?: () => void
  callback?: () => void
}

interface SelectProperties extends Omit<React.FC<SelectProps>, 'value'> {
  className?: string
  options: OptionType[]
  value: OptionType
  onChange: (value: OptionType) => void
  placeholder?: string
  disabled?: boolean
}

export const Select = (props: SelectProperties) => {
  const { className, options, value, onChange, placeholder, ...rest } = props
  return (
    <SelectPrimitive
      {...rest}
      value={value.value}
      onValueChange={(_value) => {
        onChange(options.find((option) => option.value === _value) as OptionType)
      }}
    >
      <SelectTrigger className={cn('size-full', className)}>
        <SelectValue placeholder={placeholder}>{value.label}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => {
          return (
            <SelectItem key={option.value} value={option.value} Icon={option?.Icon}>
              {typeof option === 'string' ? option : option.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </SelectPrimitive>
  )
}
