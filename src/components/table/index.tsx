import { cn } from '@utils/cn'
import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react'
import { forwardRef } from 'react'

// Определяем подкомпоненты
const TableHead = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ children, className, ...rest }, reference) => {
  return (
    <thead
      className={cn(
        '[&_tr>th]:text-text-2100 *:border-b *:border-stroke-100 [&>tr>th]:py-4 [&>tr>th]:first:pl-7 [&>tr>th]:last:pr-7',
        className,
      )}
      {...rest}
      ref={reference}
    >
      {children}
    </thead>
  )
})

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ children, className, ...rest }, reference) => {
  return (
    <tbody
      className={cn(
        '[&>tr::after:hover]:rounded-l-[0.5rem] [&>tr::after:hover]:rounded-r-[0.5rem]',
        '[&>tr]:relative [&>tr::after]:pointer-events-none [&>tr::after:hover]:bg-[#8585A914] [&>tr]:after:h-[calc(100%-4px/2)] [&>tr:first-child]:after:h-[calc(100%-4px)] [&>tr:not(:first-child)]:after:top-[calc(8px/4)] [&>tr:first-child]:after:top-[4px] [&>tr]:after:w-[calc(100%-6px)] [&>tr:after]:absolute [&>tr:after]:left-1',
        className,
      )}
      {...rest}
      ref={reference}
    >
      {children}
    </tbody>
  )
})

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ children, className, ...rest }, reference) => {
    return (
      <tr
        {...rest}
        className={cn(
          'group text-text-1100 rounded-l-[0.75rem] rounded-r-[0.75rem]',
          className,
        )}
        ref={reference}
      >
        {children}
      </tr>
    )
  },
)

const TableCell = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement> & { colSpan?: number }
>(({ children, ...rest }, reference) => {
  return (
    <td
      {...rest}
      className={cn('bg-transparent px-7 py-4 text-left transition-all', rest.className)}
      ref={reference}
    >
      {children}
    </td>
  )
})

const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>(({ children, ...rest }, reference) => {
  return (
    <th
      {...rest}
      className={cn('px-4 py-2 text-left font-medium', rest.className)}
      ref={reference}
    >
      {children}
    </th>
  )
})

// Расширяем тип компонента Table, чтобы включить подкомпоненты
interface TableComponent
  extends ForwardRefExoticComponent<
    { children: ReactNode } & HTMLAttributes<HTMLTableElement> &
      RefAttributes<HTMLTableElement>
  > {
  Head: typeof TableHead
  Body: typeof TableBody
  Row: typeof TableRow
  Cell: typeof TableCell
  HeadCell: typeof TableHeadCell
  EmptyState: typeof EmptyState
}

const EmptyState = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ children, ...rest }, reference) => {
    return (
      <Table.Row ref={reference} {...rest}>
        <Table.Cell colSpan={100} className="h-40 text-center text-gray-500">
          {children}
        </Table.Cell>
      </Table.Row>
    )
  },
)

// Определяем компонент Table
export const Table = forwardRef<
  HTMLTableElement,
  { children: ReactNode } & HTMLAttributes<HTMLTableElement>
>(({ className, children, ...rest }, reference) => (
  <table
    ref={reference}
    className={cn('w-full overflow-hidden text-sm/[1.5rem] font-medium', className)}
    {...rest}
  >
    {children}
  </table>
)) as TableComponent

// Присваиваем подкомпоненты компоненту Table
Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell
Table.HeadCell = TableHeadCell
Table.EmptyState = EmptyState
