import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import { Footer } from '@layouts/footer/Footer'
import { Strategies } from '@modules/strategies/Strategies'
import { TokenOverview } from '@modules/token-overview/TokenOverview'

import { Events } from '../../modules/events/Events'
import { TokenCharts } from '../../modules/tokens/Tokens'
import {
  SELECT_ACTIONS,
  SELECT_CHAINS,
  SELECT_PROTOCOLS,
  SELECT_STATUSES,
  SELECT_TOKENS,
} from './constants/select-constant'

export const Analytics = () => {
  return (
    <div className="max-lg:-mx-4">
      <TokenCharts className="mt-[5.31rem]" />
      <TokenOverview className="mt-12 max-lg:px-4" />
      <Strategies
        className="mt-[6.25rem]"
        rowType="modal"
        withLink
        filters={{
          search: { value: '', placeholder: 'Name / Address / ID' },
          token: { items: SELECT_TOKENS, value: SELECT_TOKENS[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
          protocol: { items: SELECT_PROTOCOLS, value: SELECT_PROTOCOLS[0] },
        }}
      />
      <SankeyDiagramBasicDemo className="mt-[6.25rem]" />
      <Events
        className="mt-28 max-lg:mt-14"
        filters={{
          search: { value: '', placeholder: 'tx hash  / Address' },
          action: { items: SELECT_ACTIONS, value: SELECT_ACTIONS[0] },
          status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
        }}
      />
      <Footer className="mt-[7.5rem] max-lg:mb-[4.55rem] max-lg:mt-[4.5rem]" />
    </div>
  )
}
