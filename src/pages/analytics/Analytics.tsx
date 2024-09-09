import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import { Footer } from '@layouts/footer/Footer'
import { Strategies } from '@modules/strategies/Strategies'
import { TokenOverview } from '@modules/token-overview/TokenOverview'
import { TokenCharts } from '@modules/tokens/Tokens'
import { Transactions } from '@modules/transactions/Transactions'

export const Analytics = () => {
  return (
    <>
      <TokenCharts className="mt-[5.31rem] max-lg:mt-6" />
      <TokenOverview className="mt-12 max-lg:mt-8" />
      <Strategies withLink className="mt-[6.25rem]" />
      <SankeyDiagramBasicDemo className="mt-[6.25rem]" />
      <Transactions
        className="mt-28 max-lg:mt-14"
        // parameters={{ transaction_type: 'trigger' }}
      />
      <Footer className="mt-[7.5rem] max-lg:mt-[5.25rem]" />
    </>
  )
}
