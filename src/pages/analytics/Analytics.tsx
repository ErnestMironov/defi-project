import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import useDeviceWidth from '@hooks/useDeviceWidth'
import { MobileFooter } from '@layouts/footer/MobileFooter'
import { LineChartModule } from '@modules/charts/LineChartModule'

import { DocumentationLinks } from './modules/DocsLinks'
import { Overviews } from './modules/Overviews'
import { Strategies } from './modules/strategies/Strategies'
import { TransactionsHistory } from './modules/tx-history/TransactionsHistory'

export const Analytics = () => {
  const { isBelowDesktop } = useDeviceWidth()
  return (
    <div className="max-lg:-mx-4">
      <Overviews className="mb-8 mt-6 max-lg:px-4 lg:my-20" />
      <div className="mx-4 grid gap-4 max-lg:gap-8 lg:grid-cols-2">
        <LineChartModule title="APY" />
        <LineChartModule title="TVL" />
      </div>
      <DocumentationLinks className="mt-32 max-lg:mt-12" />
      <SankeyDiagramBasicDemo />
      <Strategies className="mt-[8.75rem] max-lg:mt-14 max-lg:px-4" />
      <TransactionsHistory className="mt-28 max-lg:mt-14" />
      {isBelowDesktop && <MobileFooter className="mb-[4.55rem] mt-[4.5rem]" />}
    </div>
  )
}
