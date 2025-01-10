import { cn } from '@utils/cn'
import { forwardRef } from 'react'

interface DollarInputProperties {
  /** Current input value */
  value: string
  /** Callback when input value changes */
  onValueChange?: (value: string) => void
  /** Error state */
  error?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Additional className for the wrapper div */
  wrapperClassName?: string
  /** Additional className for the input container */
  inputClassName?: string
  /** Additional className for the input element */
  className?: string
}

const DEFAULT_PLACEHOLDER = '0.00'

const DollarInput = forwardRef<HTMLInputElement, DollarInputProperties>(
  (
    {
      value,
      onValueChange,
      error,
      disabled,
      wrapperClassName,
      inputClassName,
      className,
    },
    reference,
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!onValueChange) return

      const newValue = event.target.value
      // Remove all non-numeric characters except decimal point
      const sanitizedValue = newValue.replaceAll(/[^\d.]/g, '')

      // Ensure only one decimal point
      const parts = sanitizedValue.split('.')
      const formattedValue =
        parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : sanitizedValue

      onValueChange(formattedValue)
    }

    return (
      <div className={cn('flex items-center', wrapperClassName)}>
        <div
          className={cn(
            'flex items-center text-text-30100',
            error && 'text-red-100',
            disabled && 'cursor-not-allowed opacity-50',
            inputClassName,
          )}
        >
          <span className="select-none">$</span>
          <input
            ref={reference}
            type="text"
            inputMode="decimal"
            disabled={disabled}
            value={value}
            onChange={handleChange}
            placeholder={DEFAULT_PLACEHOLDER}
            className={cn(
              'bg-transparent font-medium outline-none text-text-100',
              error && 'text-red-100',
              disabled && 'cursor-not-allowed',
              className,
              'placeholder:text-text-20',
            )}
          />
        </div>
      </div>
    )
  },
)

DollarInput.displayName = 'DollarInput'

export default DollarInput
