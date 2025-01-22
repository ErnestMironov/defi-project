import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { useInputsMode } from '../deposit/hooks/useInputsMode'

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

const calculateLeftPosition = (inputWidth: number, isMobile: boolean): string => {
  const offset = isMobile ? '1.4rem' : '1.6rem'
  return `calc(${inputWidth}px + ${offset})`
}

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
    const [inputWidth, setInputWidth] = useState(0)
    const measureReference = useRef<HTMLSpanElement>(null)
    const isInteger = !value.includes('.')
    const { isBelowDesktop } = useDeviceWidth()
    const { isSwapped } = useInputsMode()

    useEffect(() => {
      if (measureReference.current) {
        setInputWidth(measureReference.current.offsetWidth)
      }
    }, [value])

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
            'flex items-center text-text-60 relative',
            error && 'text-red-100',
            disabled && 'cursor-not-allowed opacity-50',
            inputClassName,
          )}
        >
          <span className={cn('select-none text-text-60', error && 'text-red-100')}>
            $
          </span>

          <span
            ref={measureReference}
            aria-hidden="true"
            className="invisible absolute whitespace-pre"
            style={{
              font: 'inherit',
            }}
          >
            {value || '0'}
          </span>

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
              disabled && 'cursor-not-allowed',
              className,
              'placeholder:text-[#8585A9]',
              error && 'text-red-100',
            )}
          />
          {isInteger && value && isSwapped && (
            <span
              className={cn(
                'select-none text-text-60',
                error && 'text-red-100 opacity-50',
              )}
              style={{
                position: 'absolute',
                left: calculateLeftPosition(inputWidth, isBelowDesktop),
              }}
            >
              .00
            </span>
          )}
        </div>
      </div>
    )
  },
)

DollarInput.displayName = 'DollarInput'

export default DollarInput
