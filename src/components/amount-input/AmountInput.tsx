import { cn } from '@utils/cn'
import { forwardRef } from 'react'

type AmountInputProperties = {
  onChange?: (value: string) => void
  error?: string
  decimals?: number
  value: string
  after?: string
}

export const AmountInput = forwardRef(
  (props: AmountInputProperties, reference: React.Ref<HTMLInputElement>) => {
    const { onChange, value, error, decimals = 18, after } = props
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="0.00"
          className={cn(
            'text-2.5xl relative max-w-[20rem] border-none bg-transparent py-0 pl-0 pr-3 leading-[120%] placeholder:text-gray focus:outline-none lg:pr-2 lg:text-4xl lg:font-medium',
            error && 'text-error',
          )}
          onChange={(event) => {
            let inputValue = event.target.value
            if (inputValue.startsWith('.')) {
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
        {after && value && (
          <div className="text-2.5xl pointer-events-none absolute inset-0 size-full max-w-80 truncate border-none bg-transparent py-0 pl-0 pr-3 leading-[120%] text-transparent placeholder:text-gray focus:outline-none lg:pr-2 lg:text-4xl lg:font-medium">
            {value} <span className="text-gray/80">{after}</span>
          </div>
        )}
      </div>
    )
  },
)

AmountInput.displayName = 'AmountInput'
