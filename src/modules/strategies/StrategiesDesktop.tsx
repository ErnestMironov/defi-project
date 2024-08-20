import { useStrategies } from '@api/queries/useStrategies'
import Sort from '@assets/icons/sort.svg'
import type { StrategyStats } from '@codegen/graphql'
import { SearchInput } from '@components/input/SearchInput'
import { Pagination } from '@components/pagination/Pagination'
import { SectionTitle } from '@components/section/SectionTitle'
import type { OptionType } from '@components/select/Select'
import { Select } from '@components/select/Select'
import { Table } from '@components/table'
import { Button } from '@components/ui/button'
import { Skeleton } from '@components/ui/skeleton'
import {
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_TOKENS,
} from '@pages/analytics/constants/select-constant'
import { cn } from '@utils/cn'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { StrategyRow } from './StrategiesDsktopRow'

export const StrategiesDesktop: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [selectToken, setSelectToken] = useState(SELECT_TOKENS[0])
  const [selectChains, setSelectChains] = useState(SELECT_CHAINS[0])
  const [selectProtocols, setSelectProtocols] = useState(SELECT_PROTOCOLS[0])
  const { data, loading, error } = useStrategies()

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return <StrategySkeletonDesktop />
      }
      default: {
        return (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeadCell>Strategy ID</Table.HeadCell>
                <Table.HeadCell>Token</Table.HeadCell>
                <Table.HeadCell>Chain</Table.HeadCell>
                <Table.HeadCell>Protocol</Table.HeadCell>
                <Table.HeadCell>
                  <div className="inline-flex items-center gap-[0.79rem]">
                    <span>APY</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
                <Table.HeadCell>
                  <div className="inline-flex items-center gap-[0.79rem]">
                    <span>TVL</span>
                    <Sort className="h-[1.06619rem] w-[0.66175rem] shrink-0" />
                  </div>
                </Table.HeadCell>
                <Table.HeadCell>Address</Table.HeadCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {(data?.strategyStats as StrategyStats[])?.map((strategy, index) => {
                return <StrategyRow key={index} strategy={strategy} />
              })}
            </Table.Body>
          </Table>
        )
      }
    }
  }
  return (
    <section {...props} className={cn('', props.className)}>
      <div className="flex items-center justify-between">
        <SectionTitle>Strategies</SectionTitle>
        <Button onClick={() => navigate('/')}>Go to strategies</Button>
      </div>
      {/* filters/search */}
      <div className="mb-2 mt-8 grid grid-cols-[1fr_repeat(3,0.3fr)] gap-4 rounded-3xl bg-cards p-6">
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Name / Address / ID"
        />
        <Select
          options={SELECT_TOKENS}
          value={selectToken}
          onChange={(option) => setSelectToken(option as OptionType)}
          placeholder="Select an option"
        />
        <Select
          options={SELECT_CHAINS}
          value={selectChains}
          onChange={(option) => setSelectChains(option as OptionType)}
          placeholder="Select a chain"
        />
        <Select
          options={SELECT_PROTOCOLS}
          value={selectProtocols}
          onChange={(option) => setSelectProtocols(option as OptionType)}
          placeholder="Select a protocol"
        />
      </div>
      {renderBody()}
      <Pagination
        className="mt-8"
        currentPage={1}
        totalCount={50}
        onPageChange={() => {}}
        perPage={10}
        onPerPageChange={() => {}}
      />
    </section>
  )
}

const StrategySkeletonDesktop: React.FC<React.HTMLAttributes<HTMLDivElement>> = (
  _props,
) => {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeadCell>Strategy ID</Table.HeadCell>
          <Table.HeadCell>Token</Table.HeadCell>
          <Table.HeadCell>Chain</Table.HeadCell>
          <Table.HeadCell>Protocol</Table.HeadCell>
          <Table.HeadCell>APY</Table.HeadCell>
          <Table.HeadCell>TVL</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Array.from({ length: 6 })?.map((_, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>
                <Skeleton className="h-9 w-[9.9rem]" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-36" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-36" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-20" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton className="h-9 w-[9.9rem]" />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}
