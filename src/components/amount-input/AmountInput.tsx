import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { forwardRef } from 'react'

interface AmountInputProperties extends Omit<ComponentProps<'input'>, 'onChange'> {
  onChange?: (value: string) => void
  error?: string
  decimals?: number
  value: string
  after?: string
  wrapperClassName?: string
}

export const AmountInput = forwardRef(
  (props: AmountInputProperties, reference: React.Ref<HTMLInputElement>) => {
    const {
      onChange,
      value,
      error,
      decimals = 18,
      after,
      className,
      wrapperClassName,
      ...rest
    } = props
    return (
      <div className={cn('relative size-full min-h-10', wrapperClassName)}>
        {!props.readOnly && (
          <input
            {...rest}
            type="text"
            placeholder="0.00"
            className={cn(
              'placeholder:text-text-20 text-[2.625rem] bg-transparent font-medium leading-[3.25rem] tracking-[-0.02625rem] focus:outline-none',
              className,
              error && 'text-red-100',
            )}
            onChange={(event) => {
              let inputValue = event.target.value
              if (inputValue?.startsWith('.')) {
                inputValue = `0${inputValue}`
              }
              let filteredValue = inputValue.replaceAll(/[^\d.]|(?<=\..*)\./g, '')
              const [whole, decimal] = filteredValue.split('.')
              if (decimal?.length > decimals) {
                filteredValue = `${whole}.${decimal.slice(0, decimals)}`
              }
              filteredValue = filteredValue.replace(/^0+/, '0')
              onChange?.(filteredValue)
            }}
            value={value}
            ref={reference}
          />
        )}
        {after && value && (
          <div
            className={cn(
              'pointer-events-none select-none absolute inset-0 size-full truncate border-none bg-transparent py-0 pl-0 pr-3 text-2.5xl leading-[120%] placeholder:text-gray-100 focus:outline-none lg:pr-2 lg:text-4xl font-normal',
              !props.readOnly && 'text-transparent',
              className,
            )}
          >
            {value} <span className="text-gray-80">{after}</span>
          </div>
        )}
      </div>
    )
  },
)

AmountInput.displayName = 'AmountInput'
