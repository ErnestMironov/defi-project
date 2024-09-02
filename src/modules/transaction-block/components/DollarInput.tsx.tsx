import { AmountInput } from '@components/amount-input/AmountInput'
import { cn } from '@utils/cn'
import React from 'react'

interface DollarInputProperties {
  value: string
  onValueChange?: (value: string) => void
  error?: boolean
  disabled?: boolean
}

const DollarInput: React.FC<DollarInputProperties> = ({
  value,
  onValueChange,
  error,
  disabled,
}) => {
  const valueSpanReference = React.useRef<HTMLSpanElement>(null)
  const [valueWidth, setValueWidth] = React.useState(0)

  const updateWidth = React.useCallback(() => {
    setValueWidth(valueSpanReference.current?.offsetWidth || 0)
  }, [])

  React.useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [updateWidth])

  React.useEffect(() => {
    updateWidth()
  }, [value, updateWidth])

  return (
    <div
      className={cn(
        'rounded-xl bg-[rgba(97,_96,_255,_0.05)] dark:bg-[rgba(97,_96,_255,_0.15)] px-3 py-2 lg:text-[1.25rem] text-text-80',
        {
          'bg-red-5 text-red-100': error,
        },
      )}
    >
      <span>$ </span>
      <span ref={valueSpanReference} className="absolute text-text-80 opacity-0">
        {value || '0.00'}
      </span>
      <AmountInput
        className={cn(
          'text-text-80 focus:outline-none inline-flex lg:text-[1.25rem] lg:p-0 leading-none w-fit placeholder:text-text-80',
          {
            'text-red-500': error,
          },
        )}
        wrapperClassName="w-auto bg-transparent inline-flex p-0 min-h-0"
        style={{ width: valueWidth }}
        value={value}
        decimals={2}
        onChange={onValueChange}
        disabled={disabled}
      />
    </div>
  )
}

export default DollarInput
