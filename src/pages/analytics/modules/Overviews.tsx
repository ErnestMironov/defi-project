import { Logo } from '@components/ui/logo'
import clsx from 'clsx'
import React from 'react'
import type { IOverview } from 'src/lib/types/overview'

interface IOverviewCard {
  title: string
  logoColor: string
  stats: Array<{ [key: string]: string | number }>
}

const mockOverviews: IOverview = {
  userOverview: {
    deposited: 89.02,
    monthlyYield: 12,
    averageAPY: 6,
  },
  maatOverview: {
    tvl: '89.02M',
    cumulativeEarnings: '12M',
    strategies: 6,
  },
}

const Overview: React.FC<{ data: IOverviewCard }> = ({ data }) => {
  return (
    <div className="flex flex-1 flex-col gap-14 rounded-[1.75rem] bg-cards px-12 py-10 [box-shadow:0px_3px_1px_0px_rgba(135,_99,_243,_0.12)]">
      <h3 className="flex gap-4 text-[1.5rem] font-normal uppercase leading-[120%] tracking-[0.015rem]">
        <Logo className="h-[1.5625rem] w-[4.1875rem]" fill={data.logoColor} />
        {data.title}
      </h3>
      <div className="flex gap-[4.5rem]">
        {data.stats.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-col gap-2 text-[1.125rem] font-normal leading-[120%] tracking-[0.015rem]"
          >
            <div className="text-[1.125rem] uppercase leading-[120%] text-gray-100">
              {stat.title}
            </div>
            <div className="text-[2.375rem] font-normal leading-[120%]">
              {stat?.prefix}
              {stat.value}
              {stat?.postfix}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const Overviews: React.FC<React.ComponentProps<'div'>> = (props) => {
  const overviewsData: IOverviewCard[] = [
    {
      title: 'User Overview',
      logoColor: '#79DEC2',
      stats: [
        {
          title: 'Deposited',
          value: mockOverviews.userOverview.deposited,
          prefix: '$',
        },
        {
          title: 'Monthly Yield',
          value: mockOverviews.userOverview.monthlyYield,
          prefix: '$',
        },
        {
          title: 'Average APY',
          value: mockOverviews.userOverview.averageAPY,
          postfix: '%',
        },
      ],
    },
    {
      title: 'MAAT Overview',
      logoColor: 'currentColor',
      stats: [
        {
          title: 'TVL',
          value: mockOverviews.maatOverview.tvl,
          prefix: '$',
        },
        {
          title: 'Cumulative Earnings',
          value: mockOverviews.maatOverview.cumulativeEarnings,
          prefix: '$',
        },
        {
          title: 'Strategies',
          value: mockOverviews.maatOverview.strategies,
        },
      ],
    },
  ]

  return (
    <div className={clsx('flex w-full gap-4', props.className)}>
      {overviewsData.map((overview) => (
        <Overview key={overview.title} data={overview} />
      ))}
    </div>
  )
}
