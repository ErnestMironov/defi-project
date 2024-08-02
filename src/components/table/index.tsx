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
>(({ children, ...rest }, reference) => {
  return (
    <thead className="-translate-y-2 text-gray-700" {...rest} ref={reference}>
      {children}
    </thead>
  )
})

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ children, ...rest }, reference) => {
  return (
    <tbody className="bg-transparent text-gray-700" {...rest} ref={reference}>
      {children}
    </tbody>
  )
})

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ children, ...rest }, reference) => {
    return (
      <tr
        {...rest}
        className={cn(
          'bg-cards text-text [&:hover>td]:[box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)]',
          rest.className,
        )}
        ref={reference}
      >
        {children}
      </tr>
    )
  },
)

const TableCell = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
  ({ children, ...rest }, reference) => {
    return (
      <td
        {...rest}
        className={cn(
          'bg-transparent px-10 py-6 text-left text-[1.25rem] leading-[140%] first:rounded-l-[2rem] last:rounded-r-[2rem] transition-all',
          rest.className,
        )}
        ref={reference}
      >
        {children}
      </td>
    )
  },
)

const TableHeadCell = forwardRef<
  HTMLTableCellElement,
  HTMLAttributes<HTMLTableCellElement>
>(({ children, ...rest }, reference) => {
  return (
    <th
      {...rest}
      className={cn(
        'px-10 py-6 text-left text-[1.25rem] font-normal leading-[140%] first:rounded-l-3xl last:rounded-r-3xl',
        rest.className,
      )}
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
}

// Определяем компонент Table
export const Table = forwardRef<
  HTMLTableElement,
  { children: ReactNode } & HTMLAttributes<HTMLTableElement>
>((props, reference) => (
  <table
    ref={reference}
    className="w-full border-separate border-spacing-y-2 pt-2 text-xl font-normal leading-6"
    {...props}
  >
    {props.children}
  </table>
)) as TableComponent

// Присваиваем подкомпоненты компоненту Table
Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell
Table.HeadCell = TableHeadCell
