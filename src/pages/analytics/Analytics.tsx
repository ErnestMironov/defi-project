import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import { Footer } from '@layouts/footer/Footer'

import { Strategies } from './modules/strategies/Strategies'
import { TokenOverview } from './modules/token-overview/TokenOverview'
import { TokenCharts } from './modules/tokens/Tokens'
import { TransactionsHistory } from './modules/transaction-history/TransactionsHistory'

export const Analytics = () => {
  return (
    <div className="max-lg:-mx-4">
      <TokenCharts className="mt-[5.31rem]" />
      <TokenOverview className="mt-12 max-lg:px-4" />
      <Strategies className="mt-[6.25rem] max-lg:mt-14 max-lg:px-4" />
      <SankeyDiagramBasicDemo className="mt-[6.25rem]" />
      <TransactionsHistory className="mt-28 max-lg:mt-14" />
      <Footer className="mt-[7.5rem] max-lg:mb-[4.55rem] max-lg:mt-[4.5rem]" />
    </div>
  )
}
