// import { PER_PAGE_ARRAY } from '@constants/per-page-array'
import type { OptionType } from '@components/select/Select'
import { SingleSelect } from '@components/select/SingleSelect'
import { usePagination } from '@hooks/common/usePagination'
import { BaseContainer } from '@pages/analytics/components/BaseContainer'
import { cn } from '@utils/cn'

import ChevronLeft from './icons/chevron-left.svg'

const PaginationButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => (
  <button
    {...props}
    className={cn(
      'flex items-center justify-center text-sm self-stretch py-2 px-4 hover:bg-[#8585A914]',
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
  onPageSizeChange: (page: number) => void
  size: number
}

export const Pagination = ({
  className,
  currentPage,
  totalCount,
  onPageChange,
  size,
  onPageSizeChange,
}: PaginationProperties) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount: 1,
    pageSize: size,
  })

  const onNextPage = () => {
    onPageChange(currentPage + 1)
  }

  const onPreviousPage = () => {
    onPageChange(currentPage - 1)
  }

  // const [opened, { toggle: togglePerPage }] = useDisclosure()

  if (!paginationRange || currentPage === 0) {
    return null
  }
  return (
    <div className={cn('flex h-12 items-center gap-3', className)}>
      <BaseContainer
        className={cn(
          'flex h-full items-center gap-3 overflow-hidden rounded-[0.75rem] w-fit',
        )}
      >
        <div className="flex h-full items-center gap-2">
          <PaginationButton
            className={cn(
              currentPage === 1 && '[&_path]:stroke-gray-50 pointer-events-none',
              'border-r border-stroke-100',
            )}
            aria-label="Previous"
            onClick={onPreviousPage}
          >
            <ChevronLeft className="size-4 shrink-0" />
          </PaginationButton>
          {paginationRange.map((pg, i) => {
            if (pg === '...') {
              return (
                <span
                  key={`${pg}_${i}`}
                  className="flex items-center py-0 text-sm/[1.25rem] leading-[100%]"
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
                  'py-0 size-[2.375rem] self-center text-sm/[1.25rem] leading-[100%] rounded-[0.75rem]',
                  currentPage === pg && 'bg-main-100 hover:bg-main-100 text-white',
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
              'border-l border-stroke-100',
              currentPage === paginationRange.at(-1) &&
                'pointer-events-none [&_path]:stroke-gray-50',
            )}
          >
            <ChevronLeft className="size-4 shrink-0 rotate-180" />
          </PaginationButton>
        </div>
      </BaseContainer>
      <SingleSelect
        className="w-fit"
        classNames={{
          content: 'w-[9.875rem]',
        }}
        options={PER_PAGE_ARRAY}
        value={
          PER_PAGE_ARRAY.find((option) => option.value === size.toString()) as OptionType
        }
        onChange={(value) => onPageSizeChange(Number(value.value))}
      />
    </div>
  )
}

const PER_PAGE_ARRAY: OptionType[] = [
  {
    value: '10',
    label: (
      <p className="text-sm/[1rem]">
        10 <span className="text-text-2100"> / page</span>
      </p>
    ),
  },
  {
    value: '25',
    label: (
      <p className="text-sm/[1rem]">
        25 <span className="text-text-2100"> / page</span>
      </p>
    ),
  },
  {
    value: '50',
    label: (
      <p className="text-sm/[1rem]">
        50 <span className="text-text-2100"> / page</span>
      </p>
    ),
  },
]
