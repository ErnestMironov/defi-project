import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.25rem;
  font-size: 1.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`

export const Table = ({
  children,
  ...rest
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLTableElement>) => {
  return <StyledTable {...rest}>{children}</StyledTable>
}

const TableHead = styled.thead`
  color: ${({ theme }) => theme.text100};

  td {
    background-color: transparent;
  }

  tr {
    cursor: default;
  }
`

const TableBody = styled.tbody`
  background-color: transparent;
  color: ${({ theme }) => theme.text100};
`

const TableRow = styled.tr`
  background: ${({ theme }) => theme.bgGradient};
`

const TableCell = styled.td`
  background-color: ${({ theme }) => theme.white};
  padding: 1.5rem 2.5rem 1.5rem 2rem;
  text-align: right;

  &:first-child {
    text-align: left;
    border-radius: 1.5rem 0 0 1.5rem;
  }

  &:last-child {
    border-radius: 0 1.5rem 1.5rem 0;
  }
`

const TableHeadCell = styled.th`
  padding: 1.5rem 2.5rem 1.5rem 2rem;
  text-align: right;

  &:first-child {
    text-align: left;
    border-radius: 1.5rem 0 0 1.5rem;
  }

  &:last-child {
    border-radius: 0 1.5rem 1.5rem 0;
  }
`

Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell
Table.HeadCell = TableHeadCell
