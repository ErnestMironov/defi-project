import X from '@assets/icons/close.svg'
import Search from '@assets/icons/search.svg'
import { cn } from '@utils/cn'
import { type ComponentProps, forwardRef } from 'react'

interface SearchInputProperties extends ComponentProps<'input'> {
  classNames?: {
    container?: string
    input?: string
  }
  onValueChange: (value: string) => void
}

export const SearchInput = forwardRef(
  (props: SearchInputProperties, reference: React.Ref<HTMLInputElement>) => {
    const { className, classNames, onValueChange, ...rest } = props

    const handleClear = () => onValueChange?.('')

    return (
      <div
        className={cn(
          'relative flex w-full items-center max-lg:max-w-full',
          classNames?.container,
          className,
        )}
        {...rest}
      >
        <Search className="size-4" />

        <input
          ref={reference}
          type="text"
          className={cn(
            'h-full py-3 bg-transparent align-middle text-sm/[1.5rem] placeholder:text-text-2100 focus:outline-none mx-3 grow',
            classNames?.input,
          )}
          onChange={(e) => onValueChange(e.target.value)}
          {...rest}
        />
        <X
          className={cn('size-4 ml-auto hidden cursor-pointer', rest.value && 'block')}
          onClick={handleClear}
        />
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
