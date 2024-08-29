import { SankeyDiagramBasicDemo } from '@components/chart/sankey/SankeyD3'
import { Footer } from '@layouts/footer/Footer'
import { Events } from '@modules/events/Events'
import { TokenOverview } from '@modules/token-overview/TokenOverview'
import { TokenCharts } from '@modules/tokens/Tokens'

import { Strategies } from './Strategies'

export const Analytics = () => {
  return (
    <>
      <TokenCharts className="mt-[5.31rem] max-lg:mt-6" />
      <TokenOverview className="mt-12 max-lg:mt-8" />
      <Strategies className="mt-[6.25rem]" />
      <SankeyDiagramBasicDemo className="mt-[6.25rem]" />
      <Events className="mt-28 max-lg:mt-14" />
      <Footer className="mt-[7.5rem] max-lg:mb-[4.62rem] max-lg:mt-[5.25rem]" />
    </>
  )
}
