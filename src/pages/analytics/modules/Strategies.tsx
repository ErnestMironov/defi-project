import { Table } from '@components/table'
import { Button } from '@components/ui/button'
import { Logo } from '@components/ui/logo'
import { cn } from '@utils/cn'
import type { ReactNode } from 'react'

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

export const Strategies: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props} className={cn('flex flex-col gap-[1.5rem]', props.className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-6 text-[2.1875rem] font-normal uppercase not-italic leading-[100%]">
          <Logo />
          Strategies
        </h2>
        <Button>DEPOSIT</Button>
      </div>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell className="w-48">Token</Table.HeadCell>
            <Table.HeadCell className="w-48">Chain</Table.HeadCell>
            <Table.HeadCell>Protocol</Table.HeadCell>
            <Table.HeadCell>Projected APY</Table.HeadCell>
            <Table.HeadCell className="w-48">TVL</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {defaultData.map((strategy, index) => (
            <Table.Row key={index}>
              <Table.Cell>{strategy.Token}</Table.Cell>
              <Table.Cell>{strategy.Chain}</Table.Cell>
              <Table.Cell>{strategy.Protocol}</Table.Cell>
              <Table.Cell>{strategy.ProjectedAPY}</Table.Cell>
              <Table.Cell>{strategy.TVL}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
