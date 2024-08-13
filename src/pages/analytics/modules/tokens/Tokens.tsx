import { ApyChartModule } from '@modules/charts/ApyChartModule'
import { TvlChartModule } from '@modules/charts/TvlChartModule'
import { SectionTitle } from '@pages/analytics/components/SectionTitle'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

interface TokensProperties extends ComponentProps<'div'> {}

export const Tokens = (props: TokensProperties) => {
  const { className, ...rest } = props
  return (
    <section className={cn(className, '')} {...rest}>
      <SectionTitle>Tokens</SectionTitle>
      <div className="mt-[4.78rem] grid gap-4 max-lg:gap-8 lg:grid-cols-2">
        <ApyChartModule />
        <TvlChartModule />
      </div>
    </section>
  )
}
