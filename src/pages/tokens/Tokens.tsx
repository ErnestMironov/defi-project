import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { Footer } from '@layouts/footer/Footer'
import { TokenStatsContainer } from '@modules/token-overview/TokenStatsContainer'
import { cn } from '@utils/cn'
import { type ComponentProps, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from './Breadcrumbs'
import { TokenAddressByChainPopover } from './TokenAdressesByChainPopover'
import { TokenApyChart } from './TokenApyChart'
import { TokenHeader } from './TokenHeader'
import { TokenTvlChart } from './TokenTvlChart'

interface TokensProperties extends ComponentProps<'div'> {}

const POPOVER_CHAIN_LIST = [
  {
    chain: 'Ethereum',
    address: '0x1234567890',
  },
  {
    chain: 'Arbitrum',
    address: '0x1234567890',
  },
  {
    chain: 'Arbitrum',
    address: '0x1234567890',
  },
  {
    chain: 'Optimism',
    address: '0x1234567890',
  },
  {
    chain: 'Polygon',
    address: '0x1234567890',
  },
  {
    chain: 'BSC',
    address: '0x1234567890',
  },
  {
    chain: 'Avalanche',
    address: '0x1234567890',
  },
  {
    chain: 'Base',
    address: '0x1234567890',
  },
]

export const Tokens = (props: TokensProperties) => {
  const { className, ...rest } = props
  const { symbol } = useParams()
  const [selectedChain, setSelectedChain] = useState(POPOVER_CHAIN_LIST[0])
  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <TokenHeader />
      <div className="mt-[4.62rem] grid grid-cols-2 gap-10 *:h-[18.25rem]">
        <TokenApyChart />
        <TokenTvlChart />
      </div>
      <div className="mt-12 grid grid-cols-2 gap-10">
        <TokenStatsContainer
          withLink={false}
          color="#3883EB"
          apy="3.34"
          tvl="567.83"
          rebalancingVolume="4586.74"
          tokenName={symbol ?? ''}
          img={symbol === 'USDC' ? usdc : usdt}
          imageClassName={
            symbol === 'USDC' ? 'rotate-[3.207deg]' : 'rotate-[-5.207deg] right-[-8.1rem]'
          }
        />
        <div className="flex flex-col justify-between rounded-[1.75rem] bg-cards p-10 text-[1.25rem]/[1.5rem] normal-case text-black [box-shadow:0px_3px_1px_0px_rgba(56,_118,_203,_0.20)]">
          <p className="">
            USDC is a fully collateralized US dollar stablecoin. USDC is the bridge
            between dollars and trading on cryptocurrency exchanges.
          </p>
          <p className="mt-auto flex w-full items-center justify-between text-lg">
            <span className="text-gray-100">Contract</span>
            <TokenAddressByChainPopover
              chainAddresses={POPOVER_CHAIN_LIST}
              selectedChain={selectedChain.chain}
              onChange={(chain) =>
                setSelectedChain(
                  POPOVER_CHAIN_LIST.find((item) => item.chain === chain) ??
                    POPOVER_CHAIN_LIST[0],
                )
              }
            />
          </p>
        </div>
      </div>

      {/* <TransactionHistory
        maatFilters={{
          search: '',
          action: { items: SELECT_ACTIONS, value: SELECT_ACTIONS[0] },
          status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
        }}
        incentivesFilters={{
          search: '',
          action: {
            items: SELECT_INCENTIVES_ACTIONS,
            value: SELECT_INCENTIVES_ACTIONS[0],
          },
          from: { items: SELECT_INCENTIVES_FROM, value: SELECT_INCENTIVES_FROM[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
        }}
        className="mt-[6.25rem]"
      /> */}
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}
