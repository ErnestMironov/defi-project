import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { Strategies } from '@modules/strategies/Strategies'
import { StrategiesCharts } from '@modules/strategies/strategies-chart/desktop/StrategiesCharts'
import { StrategiesChartMobile } from '@modules/strategies/strategies-chart/mobile/StrategiesChartMobile'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import { Transactions } from './transactions/Transactions'

interface StrategiesProperties extends ComponentProps<'div'> {}

export const StrategiesPage = (props: StrategiesProperties) => {
  const { isBelowDesktop } = useDeviceWidth()

  if (isBelowDesktop) {
    return <StrategiesMobilePage {...props} />
  }

  return <StrategiesDesktop {...props} />
}

const StrategiesDesktop = (props: StrategiesProperties) => {
  const { className, ...rest } = props

  return (
    <div className={cn(className, 'mt-[5.31rem]')} {...rest}>
      <Breadcrumbs className="mb-[2.63rem]" />
      <StrategiesCharts />
      <Strategies className="mt-[6.25rem]" />
      <Transactions className="mt-[6.25rem]" />
      <Footer className="mt-[7.5rem] max-lg:mt-[4.5rem]" />
    </div>
  )
}

const StrategiesMobilePage = (props: StrategiesProperties) => {
  const { className, ...rest } = props

  return (
    <div className={cn(className, 'mt-6')} {...rest}>
      <StrategiesChartMobile />
      <Strategies className="mt-14" />
      <Transactions className="mt-16" />
      <Footer className="mt-[4.5rem]" />
    </div>
  )
}
