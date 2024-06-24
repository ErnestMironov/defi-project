import { cn } from '@utils/cn'

import ChevronLeft from './icons/chevron-left.svg'
import ChevronRight from './icons/chevron-right.svg'

const PaginationButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    className={cn(
      'flex items-center justify-center self-stretch rounded-[0.875rem] border border-solid border-gray-50 p-5',
      props.className,
    )}
    type="button"
  >
    {children}
  </button>
)

export const Pagination = () => {
  return (
    <div className="flex items-stretch gap-4">
      <div className="flex items-stretch gap-2">
        <PaginationButton
          className="flex items-center justify-center self-stretch rounded-[0.875rem] border border-solid border-gray-50 p-5"
          aria-label="Previous"
        >
          <ChevronLeft />
        </PaginationButton>
        <PaginationButton
          className={cn('min-w-14 py-0 text-[1.125rem] leading-[100%]', {
            'text-light-blue-100 border-light-blue-100': true,
          })}
        >
          1
        </PaginationButton>
        <PaginationButton aria-label="Next">
          <ChevronRight />
        </PaginationButton>
      </div>
      <PaginationButton className="py-0 text-[1.125rem] leading-[100%]">
        10 / page
      </PaginationButton>
    </div>
  )
}
