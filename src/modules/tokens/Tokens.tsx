import { SectionTitle } from '@components/section/SectionTitle'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { ApyTokensChartDesktop } from './charts/ApyTokensChartDesktop'
import { TokensChartMobile } from './charts/TokensChartMobile'
import { TvlTokensChartDesktop } from './charts/TvlTokensChartDesktop'

interface TokensProperties extends ComponentProps<'div'> {}

export const TokenCharts = (props: TokensProperties) => {
  const { className, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop) return <TokensChartMobile {...props} />

  return (
    <section className={cn(className, '')} {...rest}>
      <SectionTitle>Tokens</SectionTitle>
      <div className="mt-[4.78rem] grid gap-4 max-lg:mt-4 max-lg:gap-8 lg:grid-cols-2">
        <ApyTokensChartDesktop />
        <TvlTokensChartDesktop />
      </div>
    </section>
  )
}
