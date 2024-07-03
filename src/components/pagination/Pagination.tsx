import ArrowDown from '@assets/icons/arrow-down.svg'
import { PER_PAGE_ARRAY } from '@constants/per-page-array'
import { useDisclosure } from '@hooks/useDisclosure'
import { usePagination } from '@hooks/usePagination'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
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
      'flex items-center justify-center self-stretch rounded-[0.875rem] border border-solid border-gray-50 p-5 hover:text-light-blue-100 hover:border-light-blue-100 hover:bg-[#A6C1FF14] [&_path]:hover:fill-light-blue-100 [&_path]:fill-text',
      props.className,
    )}
    type="button"
  >
    {children}
  </button>
)

interface PaginationProperties extends React.HTMLAttributes<HTMLDivElement> {
  totalCount: number
  currentPage: number
  onPageChange: (page: number) => void
  onPerPageChange: (page: (typeof PER_PAGE_ARRAY)[number]) => void
  perPage: (typeof PER_PAGE_ARRAY)[number]
}

export const Pagination = ({
  className,
  currentPage,
  totalCount,
  onPageChange,
  perPage,
  onPerPageChange,
}: PaginationProperties) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: 1,
    pageSize: perPage,
  })

  const onNextPage = () => {
    onPageChange(currentPage + 1)
  }

  const onPreviousPage = () => {
    onPageChange(currentPage - 1)
  }

  const [opened, { toggle: togglePerPage }] = useDisclosure()

  if (!paginationRange || currentPage === 0) {
    return null
  }
  return (
    <div className={cn('flex items-stretch gap-4', className)}>
      <div className="flex items-stretch gap-2">
        <PaginationButton
          className={cn(currentPage === 1 && '[&_path]:fill-gray-50 pointer-events-none')}
          aria-label="Previous"
          onClick={onPreviousPage}
        >
          <ChevronLeft />
        </PaginationButton>
        {paginationRange.map((pg, i) => {
          if (pg === '...') {
            return (
              <span
                key={`${pg}_${i}`}
                className="flex min-w-14 items-center justify-center py-0 text-[1.125rem] leading-[100%]"
              >
                {pg}
              </span>
            )
          }
          return (
            <PaginationButton
              key={`${pg}_${i}`}
              onClick={() => onPageChange(pg as number)}
              className={cn(
                'min-w-14 py-0 text-[1.125rem] leading-[100%]',
                currentPage === pg &&
                  'text-light-blue-100 border-light-blue-100 hover:bg-inherit',
              )}
            >
              {pg}
            </PaginationButton>
          )
        })}
        <PaginationButton
          aria-label="Next"
          onClick={onNextPage}
          className={cn(
            currentPage === paginationRange.at(-1) &&
              'pointer-events-none [&_path]:fill-gray-50',
          )}
        >
          <ChevronRight />
        </PaginationButton>
      </div>
      <Popover open={opened} onOpenChange={togglePerPage}>
        <PopoverTrigger className="group flex w-[8.75rem] items-center justify-center self-stretch rounded-[0.875rem] border border-solid border-gray-50 py-[1.12rem] text-[1.125rem]/[0]">
          {perPage} / page
          <ArrowDown className="ml-2 size-4 overflow-visible transition group-data-[state='open']:rotate-180 [&_path]:stroke-text" />
        </PopoverTrigger>
        <PopoverContent
          align="center"
          sideOffset={8}
          className="flex w-[8.75rem] flex-col rounded-[0.625rem] border border-stroke-100 bg-cards"
        >
          {PER_PAGE_ARRAY.map((_perPage, i, array) => {
            return (
              <button
                key={_perPage}
                type="button"
                className={cn(
                  perPage === _perPage && 'bg-input-active',
                  'hover:bg-input-active px-5 py-[1.31rem] text-lg relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-stroke-100',
                  i === array.length - 1 && 'after:bg-transparent',
                )}
                onClick={() => {
                  onPerPageChange(_perPage)
                  togglePerPage()
                }}
              >
                {_perPage} / page
              </button>
            )
          })}
        </PopoverContent>
      </Popover>
    </div>
  )
}
