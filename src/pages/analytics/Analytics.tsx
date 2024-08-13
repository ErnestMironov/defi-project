import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { MobileFooter } from '@layouts/footer/MobileFooter'

import { DocumentationLinks } from './modules/DocsLinks'
import { Strategies } from './modules/strategies/Strategies'
import { TokenOverview } from './modules/token-overview/TokenOverview'
import { Tokens } from './modules/tokens/Tokens'
import { TransactionsHistory } from './modules/transaction-history/TransactionsHistory'

export const Analytics = () => {
  const { isBelowDesktop } = useDeviceWidth()

  return (
    <div className="max-lg:-mx-4">
      <Tokens className="mt-[5.31rem]" />
      <TokenOverview className="mt-12 max-lg:px-4" />
      <DocumentationLinks className="mt-32 max-lg:mt-12" />
      <SankeyDiagramBasicDemo />
      <Strategies className="mt-[8.75rem] max-lg:mt-14 max-lg:px-4" />
      <TransactionsHistory className="mt-28 max-lg:mt-14" />
      {isBelowDesktop && <MobileFooter className="mb-[4.55rem] mt-[4.5rem]" />}
    </div>
  )
}
