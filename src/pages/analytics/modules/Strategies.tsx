import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { cn } from '@utils/cn'
import type { ReactNode } from 'react'
import { useState } from 'react'

type Person = {
  Token: ReactNode
  Chain: ReactNode
  Protocol: ReactNode
  ProjectedAPY: string | number
  TVL: string | number
}

const defaultData: Person[] = [
  {
    Token: 'ETH',
    Chain: 'Ethereum',
    Protocol: 'Compound',
    ProjectedAPY: 5,
    TVL: 100,
  },
  {
    Token: 'BTC',
    Chain: 'Bitcoin',
    Protocol: 'Aave',
    ProjectedAPY: 3,
    TVL: 200,
  },
  {
    Token: 'BNB',
    Chain: 'Binance',
    Protocol: 'Yearn',
    ProjectedAPY: 7,
    TVL: 300,
  },
]

const columnHelper = createColumnHelper<Person>()

const columns = [
  columnHelper.accessor('Token', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Chain', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('Protocol', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('ProjectedAPY', {
    header: 'Projected APY',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('TVL', {
    cell: (info) => info.getValue(),
  }),
]

export const Strategies: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const [data] = useState(() => [...defaultData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div {...props} className={cn('flex flex-col gap-[1.5rem]', props.className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
          <Logo />
          Strategies
        </h2>
        <Button className="mt-4">DEPOSIT</Button>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
