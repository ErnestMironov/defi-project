import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { forwardRef, useEffect, useId, useRef, useState } from 'react'

const DEFAULT_DECIMALS = 18
const DEFAULT_PLACEHOLDER = '0.00'

interface AmountInputProperties extends Omit<ComponentProps<'input'>, 'onChange'> {
  /** Callback when input value changes */
  onChange?: (value: string) => void
  /** Error state */
  error?: string
  /** Maximum number of decimal places */
  decimals?: number
  /** Current input value */
  value: string
  /** Text to display after the input (e.g. currency symbol) */
  after?: string
  /** Additional className for the wrapper div */
  wrapperClassName?: string
}

const formatInputValue = (value: string, decimals: number): string => {
  if (value === '') return value

  let formattedValue = value

  // Add leading zero for decimal numbers
  if (formattedValue.startsWith('.')) {
    formattedValue = `0${formattedValue}`
  }

  // Remove non-numeric characters except decimal point
  formattedValue = formattedValue.replaceAll(/[^\d.]|(?<=\..*)\./g, '')

  // Limit decimal places
  const [whole, decimal] = formattedValue.split('.')
  if (decimal?.length > decimals) {
    formattedValue = `${whole}.${decimal.slice(0, decimals)}`
  }

  // Remove leading zeros except for "0" itself
  return formattedValue.replace(/^0+/, '0')
}

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProperties>(
  (props, reference) => {
    const {
      onChange,
      value,
      error,
      decimals = DEFAULT_DECIMALS,
      after,
      className,
      wrapperClassName,
      ...rest
    } = props

    // Reference for measuring input width
    const measureReference = useRef<HTMLSpanElement>(null)
    const [inputWidth, setInputWidth] = useState(0)

    // Update input width when value changes
    useEffect(() => {
      if (measureReference.current) {
        setInputWidth(measureReference.current.offsetWidth)
      }
    }, [value])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatInputValue(event.target.value, decimals)
      onChange?.(formattedValue)
    }

    const baseInputClasses = cn(
      'placeholder:text-text-20',
      'text-[2.625rem] max-lg:text-[2.25rem]',
      'bg-transparent',
      'font-medium',
      'leading-[3.25rem]',
      'tracking-[-0.02625rem]',
    )

    const id = useId()

    return (
      <div className={cn('relative size-full min-h-10', wrapperClassName)}>
        <label htmlFor={id} className="flex items-center">
          {/* Hidden element for measuring input width */}
          <span
            ref={measureReference}
            className={cn(
              'invisible absolute whitespace-pre',
              baseInputClasses,
              className,
            )}
          >
            {value || DEFAULT_PLACEHOLDER}
          </span>

          {/* Actual input element */}
          <input
            id={id}
            {...rest}
            type="text"
            inputMode="decimal"
            placeholder={DEFAULT_PLACEHOLDER}
            style={{ width: `${inputWidth}px` }}
            className={cn(
              baseInputClasses,
              'focus:outline-none',
              className,
              after && 'text-text-2100',
              error && 'text-red-100',
            )}
            onChange={handleChange}
            value={value === '0.00' ? '' : value}
            ref={reference}
          />

          {/* Optional suffix */}
          {after && (
            <span
              className={cn(
                'ml-[0.2rem] text-[1rem] text-text-60 max-lg:text-[0.8125rem]',
                error && 'text-red-100',
              )}
            >
              {after}
            </span>
          )}
        </label>
      </div>
    )
  },
)

AmountInput.displayName = 'AmountInput'
