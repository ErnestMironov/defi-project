import { USDC_TOKENS_RAW } from '@api/squid-router/postHook/data/USDC'
import { USDT_TOKENS_RAW } from '@api/squid-router/postHook/data/USDT'
import usdc from '@assets/images/usdc-3d.png'
import usdt from '@assets/images/usdt-3d.png'
import { Footer } from '@layouts/footer/Footer'
import { Events } from '@modules/events/Events'
import { Strategies } from '@modules/strategies/Strategies'
import { TokenStatsContainer } from '@modules/token-overview/TokenStatsContainer'
import {
  SELECT_ACTIONS,
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_STATUSES,
} from '@pages/analytics/constants/select-constant'
import { cn } from '@utils/cn'
import { type ComponentProps, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Breadcrumbs } from './Breadcrumbs'
import { TokenAddressByChainPopover } from './TokenAdressesByChainPopover'
import { TokenApyChart } from './TokenApyChart'
import { TokenHeader } from './TokenHeader'
import { TokenTvlChart } from './TokenTvlChart'

interface TokensProperties extends ComponentProps<'div'> {}

export const Tokens = (props: TokensProperties) => {
  const { className, ...rest } = props
  const { symbol } = useParams()

  const tokenAddresses = useMemo(() => {
    return symbol === 'USDT' ? USDT_TOKENS_RAW : USDC_TOKENS_RAW
  }, [symbol])
  const [selectedAddress, setSelectedAddress] = useState(tokenAddresses[0])
  useEffect(() => {
    setSelectedAddress(tokenAddresses[0])
  }, [tokenAddresses])

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
        <div className="text-text-100 flex flex-col justify-between rounded-[1.75rem] bg-cards p-10 text-[1.25rem]/[1.5rem] normal-case [box-shadow:0px_3px_1px_0px_rgba(56,_118,_203,_0.20)]">
          <p>
            USDC is a fully collateralized US dollar stablecoin. USDC is the bridge
            between dollars and trading on cryptocurrency exchanges.
          </p>
          <p className="mt-auto flex w-full items-center justify-between text-lg">
            <span className="text-gray-100">Contract</span>
            <TokenAddressByChainPopover
              data={tokenAddresses}
              value={selectedAddress}
              onChange={(chain) => setSelectedAddress(chain)}
            />
          </p>
        </div>
      </div>
      <Strategies
        className="mt-[6.25rem]"
        filters={{
          search: { value: '', placeholder: 'Name / Address / ID ' },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
          protocol: { items: SELECT_PROTOCOLS, value: SELECT_PROTOCOLS[0] },
        }}
      />
      <Events
        className="mt-[6.25rem] max-lg:mt-14"
        filters={{
          search: { value: '', placeholder: 'tx hash  / Address' },
          action: { items: SELECT_ACTIONS, value: SELECT_ACTIONS[0] },
          status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
        }}
      />
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}
