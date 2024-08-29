import Search from '@assets/icons/search.svg'
import { cn } from '@utils/cn'
import { type ComponentProps, forwardRef } from 'react'

interface SearchInputProperties extends ComponentProps<'input'> {
  classNames?: {
    container?: string
    input?: string
  }
}

export const SearchInput = forwardRef(
  (props: SearchInputProperties, reference: React.Ref<HTMLInputElement>) => {
    const { className, classNames, ...rest } = props
    return (
      <div
        className={cn(
          'relative flex w-full items-center rounded-2xl border border-stroke-100 px-6 py-4 max-lg:max-w-full',
          classNames?.container,
          className,
        )}
        {...rest}
      >
        <Search className="size-4 max-lg:size-3" />

        <input
          ref={reference}
          type="text"
          className={cn(
            'h-full bg-transparent align-middle text-lg max-lg:text-[0.75rem]/[0.9rem] placeholder:text-gray-100 focus:outline-none mx-3 grow',
            classNames?.input,
          )}
          {...rest}
        />
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
