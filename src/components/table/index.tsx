import { cn } from '@utils/cn'
import React from 'react'

export const Table = ({
  children,
  ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLTableElement>) => {
  return (
    <table
      className="w-full border-separate border-spacing-y-2 pt-2 text-xl font-normal leading-6"
      {...rest}
    >
      {children}
    </table>
  )
}

const TableHead = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead className="-translate-y-2 text-gray-700" {...rest}>
      {children}
    </thead>
  )
}

const TableBody = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <tbody className="bg-transparent text-gray-700" {...rest}>
      {children}
    </tbody>
  )
}

const TableRow = ({ children, ...rest }: React.HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr {...rest} className={cn('bg-cards text-text', rest.className)}>
      {children}
    </tr>
  )
}
const TableCell = ({ children, ...rest }: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td
      {...rest}
      className={cn(
        'bg-transparent px-10 py-6 text-left text-[1.25rem] leading-[140%] first:rounded-l-[2rem] last:rounded-r-[2rem]',
        rest.className,
      )}
    >
      {children}
    </td>
  )
}

const TableHeadCell = ({
  children,
  ...rest
}: React.HTMLAttributes<HTMLTableHeaderCellElement>) => {
  return (
    <th
      {...rest}
      className={cn(
        'px-10 py-6 text-left text-[1.25rem] font-normal leading-[140%] first:rounded-l-3xl last:rounded-r-3xl',
        rest.className,
      )}
    >
      {children}
    </th>
  )
}

Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell
Table.HeadCell = TableHeadCell
