/* eslint-disable jsx-a11y/label-has-associated-control */
import { Command, CommandGroup, CommandItem, CommandList } from '@components/ui/command'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import type { OptionType } from './Select'

interface CheckboxProperties extends Omit<ComponentProps<'div'>, 'onChange'> {
  options: OptionType[]
  onChange: (options: OptionType[]) => void
  label: string
  value: OptionType[]
  icon?: React.ReactNode
  placeholder?: string
}

export const MobileCheckboxSelect = (props: CheckboxProperties) => {
  const { className, label, value, options, onChange, icon, placeholder } = props
  return (
    <div className={cn('flex flex-col items-start gap-3', className)}>
      {label && <div className="text-sm text-text-2100">{label}</div>}
      <BaseContainer className="w-full gap-1 rounded-2xl p-1">
        <Command>
          <CommandList>
            <CommandGroup className="*:grid *:grid-cols-2">
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
      </BaseContainer>
    </div>
  )
}
